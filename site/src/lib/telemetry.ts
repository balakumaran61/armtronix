/**
 * Telemetry engine (SPEC §7). ONE shared, simulated data source for H1, H4 and the product pages.
 * Seeded and tick-based, so the same seed plus the same user actions always gives the same values.
 * No network calls. Every widget that shows these values must carry a visible "Simulated" tag.
 *
 * ── Reading ──────────────────────────────────────────────────────────────────────────────────────
 *   const ai1 = useTelemetry((s) => s.ai[0], rootRef)
 *   const { relay, fault } = useTelemetry((s) => ({ relay: s.relay, fault: s.fault }), rootRef)
 *     selector  Picks what you need. Results are compared shallowly, so returning a new object of the
 *               same values does not re-render.
 *     rootRef   OPTIONAL. The element that displays the data. While at least one passed element is on
 *               screen (and the tab is visible) the engine ticks at 1 Hz; when none is, it pauses.
 *               Omit it for passive readers (the nav status strip) that must not keep the engine awake.
 *   getState() reads the current snapshot outside React.
 *
 * ── Writing ──────────────────────────────────────────────────────────────────────────────────────
 *   setRelay(i, on)       Relay i (0–3) command. Echoed to the MQTT log; power W follows at once.
 *   toggleRelay(i)
 *   injectFault(type, s)  'estop' (DI3 high, outputs held off) · 'sensor' (AI1 open loop, reads 0 mA)
 *                         · 'comms' (IA015 offline, boards online 3 → 2). Recovers after s ticks (default 8).
 *   clearFault()          Recovers now.
 *   reset(seed?)          Back to the initial state; same seed by default.
 *
 * ── State (TelemetryState) ───────────────────────────────────────────────────────────────────────
 *   t            simulated seconds since reset (advances only while running)
 *   ai[4]        mA, 4–20 (a sensor fault reads 0.0). level[4] is the same mapped to 0–100 %.
 *   di[4]        door · limit · e-stop · machine running (running toggles every 20–40 s)
 *   relay[4]     effective outputs; relayCmd[4] is what the user asked for (they differ during an e-stop)
 *   power        { v: ≈230 ± 4 V, w: standby + each relay's load, kwh: integrates every tick }
 *   log          last 40 MQTT lines, newest last, topics `armtronix/<device>/<io>` ("example format")
 *   fault        { type, since, until } | null
 *   boardsOnline 3, or 2 during a comms fault (nav status strip)
 *   running      false while paused (off-screen or tab hidden): show "Paused while off-screen"
 *
 * ── Debugging ────────────────────────────────────────────────────────────────────────────────────
 *   ?seed=42 in the URL picks the seed. ?telemetry-debug logs every tick and pause/resume.
 *   window.__atxTelemetry exposes { ticks, running, state } in dev and with ?telemetry-debug.
 */
import { useEffect, useRef, useSyncExternalStore, type RefObject } from 'react'

export type FaultType = 'estop' | 'sensor' | 'comms'
export interface LogLine { id: number; t: number; kind: 'cmd' | 'state' | 'alarm'; topic: string; payload: string }
export interface Fault { type: FaultType; since: number; until: number }
export interface Power { v: number; w: number; kwh: number }
export interface TelemetryState {
  seed: number
  t: number
  ai: number[]
  level: number[]
  di: boolean[]
  relay: boolean[]
  relayCmd: boolean[]
  power: Power
  log: LogLine[]
  fault: Fault | null
  boardsOnline: number
  running: boolean
}

export const AI_LABELS = ['AI1 · tank level', 'AI2 · line pressure', 'AI3 · flow', 'AI4 · temperature'] as const
export const DI_LABELS = ['Door', 'Limit', 'E-stop', 'Running'] as const
export const RELAY_LABELS = ['Relay 1', 'Relay 2', 'Relay 3', 'Relay 4'] as const
/** Load on each relay, W. Power W = STANDBY_W + the loads that are on. */
export const RELAY_LOADS_W = [60, 120, 400, 1100] as const
export const STANDBY_W = 14
export const TOTAL_BOARDS = 3
export const DEVICES = { io: 'ia015-001', relay: 'ba011-001', power: 'ba015-001' } as const

const DEFAULT_SEED = 2015
const LOG_SIZE = 40
const TICK_MS = 1000
const AI_INIT = [12.4, 8.1, 15.6, 6.3]

/* ── Seeded PRNG (mulberry32) ─────────────────────────────────────────────────────────────────── */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ── Private simulation state (not part of the snapshot) ──────────────────────────────────────── */
let rand = mulberry32(DEFAULT_SEED)
let ramps: { target: number; left: number }[] = []
let nextRunToggle = 0
let lineId = 0

const round = (n: number, d: number) => Math.round(n * 10 ** d) / 10 ** d
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const toLevel = (mA: number) => (mA < 4 ? 0 : round(((mA - 4) / 16) * 100, 1))
const onOff = (b: boolean) => (b ? 'ON' : 'OFF')
const loadW = (relay: boolean[]) => relay.reduce((w, on, i) => w + (on ? RELAY_LOADS_W[i] : 0), STANDBY_W)

function line(t: number, kind: LogLine['kind'], device: string, io: string, payload: string): LogLine {
  return { id: ++lineId, t, kind, topic: `armtronix/${device}/${io}`, payload }
}
const pushLog = (log: LogLine[], ...lines: LogLine[]) => [...log, ...lines].slice(-LOG_SIZE)

function seedFromUrl(): number {
  if (typeof location === 'undefined') return DEFAULT_SEED
  const n = Number(new URLSearchParams(location.search).get('seed'))
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_SEED
}
const debug = typeof location !== 'undefined' && new URLSearchParams(location.search).has('telemetry-debug')

function initial(seed: number): TelemetryState {
  rand = mulberry32(seed)
  ramps = AI_INIT.map((v) => ({ target: v, left: 0 }))
  nextRunToggle = 20 + Math.floor(rand() * 21)
  lineId = 0
  const relayCmd = [false, true, false, true]
  return {
    seed,
    t: 0,
    ai: [...AI_INIT],
    level: AI_INIT.map(toLevel),
    di: [false, true, false, true],
    relay: [...relayCmd],
    relayCmd,
    power: { v: 230.8, w: loadW(relayCmd), kwh: 4.62 },
    log: [line(0, 'state', DEVICES.io, 'status', 'online'), line(0, 'state', DEVICES.relay, 'status', 'online'), line(0, 'state', DEVICES.power, 'status', 'online')],
    fault: null,
    boardsOnline: TOTAL_BOARDS,
    running: false,
  }
}

let state: TelemetryState = initial(seedFromUrl())
const listeners = new Set<() => void>()
const commit = (next: TelemetryState) => { state = next; listeners.forEach((l) => l()) }

/* ── One simulated second ─────────────────────────────────────────────────────────────────────── */
function tick() {
  const s = state
  const t = s.t + 1
  let log = s.log
  let fault = s.fault
  const fresh: LogLine[] = []

  // Analog: seeded random walk within 4–20 mA, with occasional slow ramps to a new set point
  const ai = s.ai.map((_, i) => {
    const r = ramps[i]
    if (r.left === 0 && rand() < 0.03) { r.target = 5 + rand() * 14; r.left = 15 + Math.floor(rand() * 16) }
    const prev = fault?.type === 'sensor' && i === 0 ? AI_INIT[0] : s.ai[i]
    let v = prev + (rand() - 0.5) * 0.24
    if (r.left > 0) { v += (r.target - v) / r.left; r.left-- }
    return round(clamp(v, 4, 20), 2)
  })
  if (fault?.type === 'sensor') ai[0] = 0

  // Digital: door and limit mostly stable; "machine running" toggles every 20–40 s
  const di = [...s.di]
  if (rand() < 0.008) di[0] = !di[0]
  if (rand() < 0.006) di[1] = !di[1]
  if (t >= nextRunToggle) { di[3] = !di[3]; nextRunToggle = t + 20 + Math.floor(rand() * 21) }
  di[2] = fault?.type === 'estop'

  // Power: V wanders around 230 ± 4; W follows the relays with ±1 % noise; kWh integrates
  const v = round(clamp(s.power.v + (rand() - 0.5) * 0.8 + (230 - s.power.v) * 0.05, 226, 234), 1)
  const w = Math.round(loadW(s.relay) * (1 + (rand() - 0.5) * 0.02))
  const kwh = round(s.power.kwh + w / 3_600_000, 5)

  // Fault recovery
  let relay = s.relay
  if (fault && t >= fault.until) {
    fresh.push(line(t, 'alarm', DEVICES.io, 'alarm', `{"type":"${fault.type}","state":"cleared"}`))
    if (fault.type === 'comms') fresh.push(line(t, 'state', DEVICES.io, 'status', 'online'))
    if (fault.type === 'estop') relay = [...s.relayCmd]
    fault = null
    di[2] = false
  }

  // MQTT lines (IA015 is silent while its link is down)
  const ioOnline = fault?.type !== 'comms'
  if (ioOnline) {
    di.forEach((d, i) => { if (d !== s.di[i]) fresh.push(line(t, 'state', DEVICES.io, `di${i + 1}`, d ? '1' : '0')) })
    if (t % 5 === 0) fresh.push(line(t, 'state', DEVICES.io, 'ai1', `{"mA":${ai[0].toFixed(1)},"pct":${Math.round(toLevel(ai[0]))}}`))
  }
  if (t % 10 === 0) fresh.push(line(t, 'state', DEVICES.power, 'power', `{"V":${v.toFixed(1)},"W":${w},"kWh":${kwh.toFixed(3)}}`))
  if (fresh.length) log = pushLog(log, ...fresh)

  commit({ ...s, t, ai, level: ai.map(toLevel), di, relay, power: { v, w, kwh }, log, fault, boardsOnline: fault?.type === 'comms' ? TOTAL_BOARDS - 1 : TOTAL_BOARDS })
  if (debug) console.debug('[telemetry] tick', t)
}

/* ── Commands ─────────────────────────────────────────────────────────────────────────────────── */
export function setRelay(i: number, on: boolean) {
  const s = state
  if (i < 0 || i > 3 || s.relayCmd[i] === on) return
  const relayCmd = s.relayCmd.map((r, j) => (j === i ? on : r))
  const held = s.fault?.type === 'estop'
  const relay = held ? s.relay : relayCmd
  const io = `relay${i + 1}`
  const lines = [line(s.t, 'cmd', DEVICES.relay, `${io}/set`, onOff(on))]
  lines.push(held ? line(s.t, 'alarm', DEVICES.relay, io, 'OFF (held: e-stop)') : line(s.t, 'state', DEVICES.relay, io, onOff(on)))
  commit({ ...s, relayCmd, relay, power: { ...s.power, w: loadW(relay) }, log: pushLog(s.log, ...lines) })
}

export const toggleRelay = (i: number) => setRelay(i, !state.relayCmd[i])

export function injectFault(type: FaultType, durationS = 8) {
  const s = state
  if (s.fault) return
  const fault: Fault = { type, since: s.t, until: s.t + Math.max(1, durationS) }
  const lines = [line(s.t, 'alarm', DEVICES.io, 'alarm', `{"type":"${type}","state":"active"}`)]
  let { relay, ai, di, power, boardsOnline } = s
  if (type === 'estop') {
    relay = [false, false, false, false]
    di = di.map((d, i) => (i === 2 ? true : d))
    power = { ...power, w: loadW(relay) }
    lines.push(line(s.t, 'state', DEVICES.relay, 'all', 'OFF (held: e-stop)'))
  } else if (type === 'sensor') {
    ai = ai.map((v, i) => (i === 0 ? 0 : v))
  } else {
    boardsOnline = TOTAL_BOARDS - 1
    lines.push(line(s.t, 'state', DEVICES.io, 'status', 'offline'))
  }
  commit({ ...s, fault, relay, ai, level: ai.map(toLevel), di, power, boardsOnline, log: pushLog(s.log, ...lines) })
}

/** Ends the current fault now (the next tick would otherwise end it at fault.until). */
export function clearFault() {
  if (!state.fault) return
  commit({ ...state, fault: { ...state.fault, until: state.t } })
  tick()
}

export function reset(seed = state.seed) {
  commit({ ...initial(seed), running: state.running })
}

export const getState = () => state
export function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

/* ── Scheduler: 1 Hz while a watched element is on screen and the tab is visible ──────────────── */
let timer: ReturnType<typeof setInterval> | null = null
const visible = new Set<Element>()
const watchers = new Map<Element, number>()
let io: IntersectionObserver | null = null

function schedule() {
  const run = visible.size > 0 && document.visibilityState === 'visible'
  if (run === (timer !== null)) return
  if (run) timer = setInterval(tick, TICK_MS)
  else { clearInterval(timer!); timer = null }
  if (debug) console.debug(`[telemetry] ${run ? 'running' : document.visibilityState !== 'visible' ? 'paused (tab hidden)' : 'paused (off-screen)'} at t=${state.t}`)
  commit({ ...state, running: run })
}

/** Keeps the engine awake while `el` is on screen. Returns the unwatch function. useTelemetry calls this. */
export function watch(el: Element): () => void {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      schedule()
    })
    document.addEventListener('visibilitychange', schedule)
  }
  watchers.set(el, (watchers.get(el) ?? 0) + 1)
  io.observe(el)
  return () => {
    const n = (watchers.get(el) ?? 1) - 1
    if (n > 0) { watchers.set(el, n); return }
    watchers.delete(el)
    io?.unobserve(el)
    visible.delete(el)
    schedule()
  }
}

/* ── React ────────────────────────────────────────────────────────────────────────────────────── */
function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false
  const ka = Object.keys(a)
  if (ka.length !== Object.keys(b).length) return false
  return ka.every((k) => Object.is((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]))
}

/** Reads from the engine. See the header for the selector and rootRef contract. */
export function useTelemetry<T>(selector: (s: TelemetryState) => T, rootRef?: RefObject<Element | null>): T {
  const cache = useRef<{ s: TelemetryState | null; v: T | undefined }>({ s: null, v: undefined })
  const select = () => {
    const c = cache.current
    if (c.s === state) return c.v as T
    const v = selector(state)
    if (c.s === null || !shallowEqual(v, c.v)) c.v = v
    c.s = state
    return c.v as T
  }
  const value = useSyncExternalStore(subscribe, select, select)
  useEffect(() => {
    const el = rootRef?.current
    return el ? watch(el) : undefined
  }, [rootRef])
  return value
}

if (typeof window !== 'undefined' && (import.meta.env.DEV || debug)) {
  Object.defineProperty(window, '__atxTelemetry', {
    configurable: true,
    value: { get ticks() { return state.t }, get running() { return state.running }, get state() { return state } },
  })
}

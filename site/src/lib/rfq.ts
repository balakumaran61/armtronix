/**
 * RFQ wizard state (SPEC §8, ARM-21). Front-end only: nothing is ever sent over the network.
 *   openRfq(prefill)      opens the overlay from any CTA, merging the pre-fill into the draft
 *   rfqHref(prefill)      the same pre-fill as a /rfq URL (?who=&need=&product=ia015,ba011&intent=engineer)
 *   rfqLinkProps(prefill) { to, onClick } for a Button: opens the overlay, still a real link for new tabs
 *   useRfq()              { draft, open } live; update(patch), setStep(n), clearDraft(), closeRfq()
 * The draft persists per viewer in localStorage ('atx-rfq-draft', try/catch).
 */
import { useSyncExternalStore, type MouseEvent } from 'react'
import { products, getProduct } from '../data/products'

export const WHO = [
  { id: 'oem', label: 'OEM' },
  { id: 'integrator', label: 'System integrator' },
  { id: 'plant', label: 'Plant or facility' },
  { id: 'engineer', label: 'Engineer' },
  { id: 'developer', label: 'Developer' },
] as const
export const NEED = [
  { id: 'off-the-shelf', label: 'Off-the-shelf product' },
  { id: 'customised', label: 'Customised product' },
  { id: 'custom', label: 'Full custom design' },
  { id: 'retro', label: 'Retro to IIoT assessment' },
] as const
export const INTERFACES = ['Wi-Fi', 'Bluetooth', 'LoRa', 'RS485 / Modbus', 'CAN', 'Ethernet', 'Raspberry Pi'] as const
export const QTY = ['1–10', '10–100', '100–1 000', '1 000+'] as const
export const STEPS = ['Who', 'Need', 'Spec', 'Volume', 'Contact'] as const
export const SALES_EMAIL = 'sales@armtronix.in'

export type Who = (typeof WHO)[number]['id']
export type Need = (typeof NEED)[number]['id']

export interface Draft {
  step: number // 0–4 the steps, 5 review, 6 success
  who: Who | ''
  need: Need | ''
  products: string[] // product codes, e.g. 'IA015'
  interfaces: string[]
  io: { di: string; do: string; ai: string }
  power: '' | '24 V DC' | '230 V AC'
  env: string
  qty: string
  timeline: string
  prototype: '' | 'Yes' | 'No'
  name: string; company: string; email: string; phone: string; city: string; message: string
  sample: boolean
  technical: boolean
  prefilled: boolean
  ref: string
}

export interface Prefill { who?: Who; need?: Need | 'sample'; product?: string | string[]; intent?: 'engineer' }

const KEY = 'atx-rfq-draft'
const EMPTY: Draft = {
  step: 0, who: '', need: '', products: [], interfaces: [], io: { di: '', do: '', ai: '' }, power: '', env: '',
  qty: '', timeline: '', prototype: '', name: '', company: '', email: '', phone: '', city: '', message: '',
  sample: false, technical: false, prefilled: false, ref: '',
}

function load(): Draft {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...EMPTY, ...JSON.parse(raw) }
  } catch { /* storage unavailable or corrupt: start clean */ }
  return EMPTY
}
function save(d: Draft) {
  try { localStorage.setItem(KEY, JSON.stringify(d)) } catch { /* draft lasts this page view */ }
}

let state = { draft: load(), open: false }
const listeners = new Set<() => void>()
const commit = (next: typeof state) => { state = next; save(state.draft); listeners.forEach((l) => l()) }
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb) } }

export const useRfq = () => useSyncExternalStore(subscribe, () => state, () => state)
export const update = (patch: Partial<Draft>) => commit({ ...state, draft: { ...state.draft, ...patch } })
export const setStep = (step: number) => update({ step })
export const clearDraft = () => commit({ ...state, draft: EMPTY })
export const closeRfq = () => commit({ ...state, open: false })

/** Applies a pre-fill to the draft. Finished drafts (success screen) start over. */
export function applyPrefill(p: Prefill) {
  if (!p.who && !p.need && !p.product && !p.intent) return
  const base = state.draft.step === 6 ? EMPTY : state.draft
  const codes = (Array.isArray(p.product) ? p.product : p.product ? p.product.split(',') : [])
    .map((c) => getProduct(c)?.code).filter((c): c is NonNullable<typeof c> => !!c)
  const d: Draft = { ...base, prefilled: true }
  if (p.who) d.who = p.who
  if (p.intent === 'engineer') { d.who = d.who || 'engineer'; d.technical = true }
  if (p.need === 'sample') { d.need = 'off-the-shelf'; d.sample = true }
  else if (p.need) d.need = p.need
  if (codes.length) d.products = [...new Set([...base.products, ...codes])]
  // Start at the first step the pre-fill hasn't answered
  d.step = !d.who ? 0 : !d.need ? 1 : 2
  commit({ ...state, draft: d })
}

export function openRfq(p: Prefill = {}) {
  applyPrefill(p)
  commit({ ...state, open: true })
}

export function parsePrefill(q: URLSearchParams): Prefill {
  const who = q.get('who'), need = q.get('need'), product = q.get('product'), intent = q.get('intent')
  return {
    who: WHO.some((w) => w.id === who) ? (who as Who) : undefined,
    need: need === 'sample' || NEED.some((n) => n.id === need) ? (need as Need | 'sample') : undefined,
    product: product ?? undefined,
    intent: intent === 'engineer' ? 'engineer' : undefined,
  }
}

export function rfqHref(p: Prefill = {}) {
  const q = new URLSearchParams()
  if (p.who) q.set('who', p.who)
  if (p.need) q.set('need', p.need)
  if (p.product) q.set('product', ([] as string[]).concat(p.product).map((c) => c.toLowerCase()).join(','))
  if (p.intent) q.set('intent', p.intent)
  const s = q.toString()
  return s ? `/rfq?${s}` : '/rfq'
}

/** Props for a CTA: a real /rfq link (works in a new tab) that opens the overlay on a plain click. */
export function rfqLinkProps(p: Prefill = {}) {
  return {
    to: rfqHref(p),
    onClick: (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      openRfq(p)
    },
  }
}

/* ── Validation (copy: COPY.md · RFQ errors) ──────────────────────────────────────────────────── */
export type Errors = Partial<Record<'who' | 'need' | 'qty' | 'name' | 'email' | 'phone', string>>
const CHOOSE = 'Choose one to continue.'

export function validate(d: Draft, step: number): Errors {
  const e: Errors = {}
  if (step === 0 && !d.who) e.who = CHOOSE
  if (step === 1 && !d.need) e.need = CHOOSE
  if (step === 3 && !d.qty) e.qty = CHOOSE
  if (step === 4) {
    if (!d.name.trim()) e.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Enter a valid email, like name@company.com.'
    if (d.phone.trim() && !/^\d{8,15}$/.test(d.phone.replace(/[\s+()-]/g, ''))) e.phone = 'Enter digits only, 8–15 characters.'
  }
  return e
}

/* ── Submit (front-end only) ──────────────────────────────────────────────────────────────────── */
export function makeRef(d: Draft, now = new Date()) {
  const yymm = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}`
  let h = 0
  for (const ch of `${d.email}|${d.name}|${d.products.join()}|${now.getTime()}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return `ARM-${yymm}-${String(h % 10000).padStart(4, '0')}`
}

const label = <T extends readonly { id: string; label: string }[]>(list: T, id: string) => list.find((x) => x.id === id)?.label ?? '—'

export function summary(d: Draft): [string, string][] {
  const rows: [string, string][] = [
    ['Who', label(WHO, d.who)],
    ['Need', label(NEED, d.need) + (d.sample ? ' (sample)' : '') + (d.technical ? ' · technical question' : '')],
    ['Products', d.products.join(', ') || '—'],
    ['Interfaces', d.interfaces.join(', ') || '—'],
  ]
  if (d.who !== 'developer') {
    rows.push(['I/O', [d.io.di && `${d.io.di} DI`, d.io.do && `${d.io.do} DO`, d.io.ai && `${d.io.ai} AI`].filter(Boolean).join(' · ') || '—'])
    rows.push(['Power', d.power || '—'], ['Environment', d.env || '—'])
  }
  rows.push(['Quantity', d.qty || '—'], ['Timeline', d.timeline || '—'], ['Prototype', d.prototype || '—'])
  rows.push(['Name', d.name], ['Company', d.company || '—'], ['Email', d.email], ['Phone', d.phone || '—'], ['City', d.city || '—'], ['Message', d.message || '—'])
  return rows
}

export const summaryText = (d: Draft) =>
  `Request for quote ${d.ref}\n\n${summary(d).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nSent from the ARMtronix site (front-end demo).`

export function mailtoHref(d: Draft) {
  const subject = `RFQ ${d.ref}${d.products.length ? ` · ${d.products.join(', ')}` : ''}`
  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText(d))}`
}

export function submit() {
  commit({ ...state, draft: { ...state.draft, ref: makeRef(state.draft), step: 6 } })
}

export const productOptions = products.map((p) => ({ code: p.code, name: p.name, line: p.line }))

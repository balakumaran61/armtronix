import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger, useReducedMotion } from '../../lib/motion'
import { useMedia } from '../../lib/media'
import { LineArt } from '../../components/board/InlineSvg'
import { emitPacket } from '../../components/layout/SignalTrace'
import { Button } from '../../components/ui/Button'

const STAGES = [
  { id: 'physical', name: 'Physical', head: 'A machine speaks in volts and milliamps.', body: 'A 4–20 mA loop. A 24 V limit switch. Nothing reads it but the PLC.' },
  { id: 'board', name: 'Board', head: 'An ARMtronix board catches it.', body: 'IA015 reads 4–20 mA, 24 V inputs, CAN and RS485 on a DIN rail.' },
  { id: 'protocol', name: 'Protocol', head: 'It leaves in a standard language.', body: "MQTT, Modbus RTU, Modbus TCP or LoRa, with no gateway you don't own." },
  { id: 'cloud', name: 'Cloud', head: 'A broker catches the packet.', body: 'Your broker, your dashboard, your rules.' },
  { id: 'decision', name: 'Decision', head: 'Someone, or something, acts.', body: 'An alert. A relay that switches. A pump that stops.' },
] as const
const PROTOCOLS = [['proto-mqtt', 'MQTT'], ['proto-modbus', 'Modbus RTU'], ['proto-ethernet', 'Modbus TCP'], ['proto-lora', 'LoRa']] as const
const X = [100, 300, 500, 700, 900]
// 45° and 90° only (SPEC §10 line art)
const PATH = 'M100 110 H160 L190 80 H270 L300 110 H360 L390 140 H470 L500 110 H560 L590 80 H670 L700 110 H760 L790 140 H870 L900 110'

function Stages({ active = -1 }: { active?: number }) {
  return (
    <ol className="stages">
      {STAGES.map((s, i) => (
        <li key={s.id} className="stage" data-on={active < 0 || i <= active} data-current={i === active}>
          <LineArt name={`stage-${s.id}`} className="stage__icon" />
          <div>
            <p className="eyebrow">0{i + 1} · {s.name}</p>
            <h3 className="stage__head">{s.head}</h3>
            <p className="stage__body dim">{s.body}</p>
            {s.id === 'protocol' ? (
              <div className="protos">{PROTOCOLS.map(([art, l]) => <span key={l} className="chip proto"><LineArt name={art} className="proto__icon" />{l}</span>)}</div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** H2 signal path (ARM-17, MO-04): pinned 5-stage scrollytelling at ≥ 1024; a vertical list below or when reduced. */
export function H2() {
  const reduced = useReducedMotion()
  const wide = useMedia('(min-width: 1024px)')
  const pinned = wide && !reduced
  const outer = useRef<HTMLDivElement>(null)
  const fill = useRef<SVGPathElement>(null)
  const packet = useRef<SVGCircleElement>(null)
  const [stage, setStage] = useState(0)
  const [protoLit, setProtoLit] = useState(0)

  useEffect(() => {
    if (!pinned) return
    const path = fill.current!, dot = packet.current!
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    let last = -1
    const st = ScrollTrigger.create({
      trigger: outer.current, start: 'top top+=64', end: 'bottom bottom',
      onUpdate: ({ progress: p }) => {
        path.style.strokeDashoffset = `${len * (1 - p)}`
        const pt = path.getPointAtLength(len * p)
        dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y))
        const s = Math.min(4, Math.floor(p * 5))
        if (s !== last) { if (s > last && last >= 0) emitPacket('signal'); last = s; setStage(s) }
        setProtoLit(Math.max(0, Math.min(4, Math.round((p * 5 - 2) * 4))))
      },
    })
    st.refresh()
    return () => st.kill()
  }, [pinned])

  return (
    <section className="sec sec--path" id="h2" data-section="H2" aria-labelledby="h2-title">
      <div className="wrap">
        <p className="eyebrow">How a machine learns to talk</p>
        <h2 id="h2-title">Physical. Board. Protocol. Cloud. Decision.</h2>
        <p className="lede">One signal, five stops. Follow the copper.</p>
      </div>
      {pinned ? (
        <div ref={outer} className="path" style={{ height: '420vh' }}>
          <div className="path__sticky">
            <div className="wrap">
              <div className="path__diagram">
                <svg viewBox="0 60 1000 100" aria-hidden="true">
                  <path d={PATH} className="path__track" />
                  <path ref={fill} d={PATH} className="path__fill" />
                  {X.map((x, i) => <circle key={x} cx={x} cy={110} r={9} className="path__via" data-on={i <= stage} />)}
                  <circle ref={packet} cx={100} cy={110} r={6} className="path__packet" />
                </svg>
                <div className="path__nodes">
                  {STAGES.map((s, i) => (
                    <div key={s.id} className="path__node" data-on={i <= stage} style={{ left: `${X[i] / 10}%` }}>
                      <LineArt name={`stage-${s.id}`} className="path__icon" />
                      <span className="mono">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="path__card" aria-live="polite">
                <p className="eyebrow">0{stage + 1} · {STAGES[stage].name}</p>
                <h3 className="t-h2 mt-2">{STAGES[stage].head}</h3>
                <p className="mt-3 dim">{STAGES[stage].body}</p>
                {stage === 2 ? (
                  <div className="protos mt-4">{PROTOCOLS.map(([art, l], i) => <span key={l} className="chip proto" data-on={i < protoLit}><LineArt name={art} className="proto__icon" />{l}</span>)}</div>
                ) : null}
              </div>
              <div className="path__end">
                <Button to="/#h3">See it on a real board</Button>
                <span className="mono text-xs dim">Example flow. Values shown are Simulated.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrap">
          {reduced ? <p className="eyebrow mt-6">The five stops</p> : null}
          <Stages />
          <div className="path__end">
            <Button to="/#h3">See it on a real board</Button>
            <span className="mono text-xs dim">Example flow. Values shown are Simulated.</span>
          </div>
        </div>
      )}
    </section>
  )
}

import { useRef, useState } from 'react'
import { useTelemetry } from '../../lib/telemetry'
import { rfqLinkProps } from '../../lib/rfq'
import { Button } from '../../components/ui/Button'
import { Img } from '../../components/ui/Img'
import { SimTag } from '../../components/ui/SimTag'

const STATS = ['Works with Siemens and Beckhoff PLCs', 'DIN rail · 24 V DC', 'Wi-Fi · BT · RS485 · CAN · Ethernet']

/** H5 Retro to IIoT before/after (ARM-17): a role="slider" over a legacy cabinet; the Talking side shows live overlays. */
export function H5() {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const s = useTelemetry((x) => ({ ai: x.ai[0], lvl: x.level[0], run: x.di[3], v: x.power.v, w: x.power.w }), root)

  const fromPointer = (clientX: number) => {
    const r = frame.current!.getBoundingClientRect()
    setPos(Math.round(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))))
  }
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100, PageDown: pos - 20, PageUp: pos + 20 }
    if (e.key in map) { e.preventDefault(); setPos(Math.min(100, Math.max(0, map[e.key]))) }
  }

  return (
    <section className="sec" id="h5" data-section="H5" aria-labelledby="h5-title">
      <div className="wrap">
        <p className="eyebrow">Retro to IIoT · IA015</p>
        <h2 id="h5-title">Don't replace the machine. Connect it.</h2>
        <p className="lede">Drag to turn a silent cabinet into one that reports.</p>
        <div className="retro">
          <div
            ref={(el) => { frame.current = el; root.current = el }} className="ba"
            onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); fromPointer(e.clientX) }}
            onPointerMove={(e) => { if (e.buttons) fromPointer(e.clientX) }}
          >
            <Img id="IMG-20" className="ba__img ba__img--silent" sizes="(min-width: 1024px) 760px, 100vw" />
            <div className="ba__talk" style={{ clipPath: `inset(0 0 0 ${100 - pos}%)` }}>
              <Img id="IMG-20" className="ba__img" sizes="(min-width: 1024px) 760px, 100vw" alt="" />
              <div className="ba__overlay mono" aria-hidden="true">
                <span className="tag" style={{ right: '5%', top: '14%' }}>AI1 {s.ai.toFixed(1)} mA · {Math.round(s.lvl)} %</span>
                <span className="tag" style={{ right: '5%', top: '40%' }}>DI4 running · {s.run ? 'ON' : 'OFF'}</span>
                <span className="tag" style={{ right: '5%', top: '66%' }}>{s.v.toFixed(1)} V · {s.w} W</span>
                <span className="tag tag--sim" style={{ right: '5%', top: '86%' }}>Simulated</span>
              </div>
            </div>
            <span className="ba__label ba__label--l mono">Silent</span>
            <span className="ba__label ba__label--r mono">Talking</span>
            <div
              className="ba__handle" style={{ left: `${100 - pos}%` }} role="slider" tabIndex={0}
              aria-label="Before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pos}
              aria-valuetext={`${pos} per cent talking`} onKeyDown={onKey}
            ><span aria-hidden="true">⇆</span></div>
          </div>
          <div className="retro__side">
            <div className="retro__notes">
              <p><span className="mono eyebrow">Silent</span><br />No data. No alerts. A walk to the panel.</p>
              <p><span className="mono eyebrow">Talking</span><br />Inputs, outputs and 4–20 mA, visible from anywhere on your network. <SimTag /></p>
            </div>
            <ul className="retro__stats">
              {STATS.map((t, i) => <li key={t} data-on={pos >= 20 + i * 25}>{t}</li>)}
            </ul>
            <Button {...rfqLinkProps({ need: 'retro', who: 'plant', product: 'IA015' })} variant="primary">Assess my machines</Button>
            <p className="mt-3 text-xs dim">Capabilities from the IA015 catalogue.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

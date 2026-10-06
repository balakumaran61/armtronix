import { useEffect, useRef, useState } from 'react'
import { useTelemetry } from '../../lib/telemetry'
import { gsap, scrollToTarget, useReducedMotion } from '../../lib/motion'
import { rfqLinkProps } from '../../lib/rfq'
import { BoardRender } from '../../components/board/BoardRender'
import { emitPacket } from '../../components/layout/SignalTrace'
import { Button } from '../../components/ui/Button'
import { SimTag } from '../../components/ui/SimTag'
import { Ticker } from '../../components/ui/Ticker'
import type { Lens } from '../../components/board/svgs'

/** H1 hero (ARM-17): IA015 render with pointer tilt (MO-03), telemetry-lit LEDs, a Photo/X-ray preview, live readout. */
export function H1() {
  const root = useRef<HTMLElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const [lens, setLens] = useState<Lens>('photo')
  const reduced = useReducedMotion()
  const s = useTelemetry((x) => ({ ai: x.ai[0], di1: x.di[0], di: x.di, relay: x.relay, v: x.power.v, t: x.t }), root)
  const blink = s.t % 2 === 0
  const leds = { power: true, wifi: blink, di1: s.di[0], di2: s.di[1], di3: s.di[2], do1: s.relay[0], do2: s.relay[1], do3: s.relay[2] }

  // Pointer tilt, max about 6°, eased like a spring. Off for touch and reduced motion.
  useEffect(() => {
    const el = tilt.current
    if (!el || reduced || matchMedia('(pointer: coarse)').matches) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * 12)
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12)
    }
    const leave = () => { rx(0); ry(0) }
    const host = el.parentElement!
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave) }
  }, [reduced])

  // A packet leaves the board's antenna and starts the trace
  useEffect(() => {
    const id = setTimeout(() => emitPacket('signal'), 1600)
    return () => clearTimeout(id)
  }, [])

  return (
    <section ref={root} className="sec hero" id="h1" data-section="H1" aria-labelledby="h1-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Industrial IoT hardware · Hubballi, India</p>
          <h1 id="h1-title" className="hero__title">Make every machine talk.</h1>
          <p className="hero__sub">Industrial IoT hardware, engineered in Hubballi, India: from 24 V DC DIN-rail controllers to Wi-Fi relay boards.</p>
          <div className="hero__ctas">
            <Button variant="primary" to="/#h3" onClick={(e) => { e.preventDefault(); scrollToTarget('#h3') }}>Explore hardware</Button>
            <Button {...rfqLinkProps()}>Request a quote</Button>
          </div>
          <p className="hero__micro mono">24 V DC · Wi-Fi · BT · CAN · RS485 · Ethernet</p>
        </div>
        <figure className="hero__board">
          <div className="hero__tiltwrap">
            <div ref={tilt} className="hero__tilt">
              <BoardRender code="IA015" lens={lens} ledStates={leds} />
            </div>
          </div>
          <figcaption className="hero__cap">
            <span className="mono">IA015 · Retro to IIoT · top-down render</span>
            <span className="seg seg--sm" role="group" aria-label="Lens preview">
              {(['photo', 'xray'] as const).map((l) => (
                <button key={l} type="button" className="seg__btn" aria-pressed={lens === l} onClick={() => setLens(l)}>{l === 'photo' ? 'Photo' : 'X-ray'}</button>
              ))}
            </span>
          </figcaption>
          <dl className="readout mono" aria-label="Simulated values from an IA015 and a BA015">
            <div><dt>AI1</dt><dd><Ticker value={s.ai} /> mA</dd></div>
            <div><dt>DI1</dt><dd>{s.di1 ? 'ON' : 'OFF'}</dd></div>
            <div><dt>Mains</dt><dd><Ticker value={s.v} /> V</dd></div>
            <div className="readout__tag"><dt className="sr-only">Source</dt><dd><SimTag /></dd></div>
          </dl>
        </figure>
      </div>
    </section>
  )
}

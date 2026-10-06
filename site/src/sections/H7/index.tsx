import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../lib/motion'
import { rfqLinkProps } from '../../lib/rfq'
import { LineArt } from '../../components/board/InlineSvg'
import { Button } from '../../components/ui/Button'

const STEPS = [
  { name: 'Requirement', stage: 'pcb-1-bare-fr4', stageName: 'Bare FR4', body: 'The I/O, the protocol, the power and the panel it lives in.' },
  { name: 'Schematic', stage: 'pcb-2-copper', stageName: 'Copper', body: 'Inputs, isolation, radios and the MCU, drawn and reviewed.' },
  { name: 'Layout', stage: 'pcb-3-solder-mask', stageName: 'Solder mask', body: 'Traces routed for the enclosure and the terminals.' },
  { name: 'Firmware', stage: 'pcb-4-silkscreen', stageName: 'Silkscreen', body: 'Arduino-based firmware with MQTT or HTTP modes.' },
  { name: 'Prototype and validation', stage: 'pcb-5-assembled', stageName: 'Assembled', body: 'Boards built and tested against the requirement.' },
  { name: 'Production', stage: 'pcb-6-boxed', stageName: 'Boxed', body: 'A production run, boxed for the rail or the wall.' },
] as const
const CAPS = ['Custom I/O boards', 'Protocol gateways (Modbus ⇄ MQTT ⇄ LoRa)', 'Raspberry Pi industrial HATs', 'Firmware: Arduino, Tasmota-compatible, MQTT']

/** H7 engineering services (ARM-19, MO-14): scrolling the six steps builds the PCB up stage by stage. */
export function H7() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (reduced) return
    const items = [...list.current!.querySelectorAll('li')]
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLLIElement)) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [reduced])

  return (
    <section className="sec" id="h7" data-section="H7" aria-labelledby="h7-title">
      <div className="wrap">
        <p className="eyebrow">Custom hardware design</p>
        <h2 id="h7-title">From schematic to shipment.</h2>
        <p className="lede">One team takes a board from idea to a production run.</p>

        {reduced ? (
          <ol className="fab-row">{STEPS.map((s, i) => <li key={s.name}><LineArt name={s.stage} /><span className="mono">{i + 1} · {s.name}</span></li>)}</ol>
        ) : null}

        <div className="fab">
          {!reduced ? (
            <div className="fab__board" aria-hidden="true">
              {STEPS.map((s, i) => <div key={s.stage} className="fab__stage" data-on={i <= active} data-current={i === active}><LineArt name={s.stage} /></div>)}
              <p className="fab__label mono">{active + 1} / 6 · {STEPS[active].stageName}</p>
            </div>
          ) : null}
          <ol ref={list} className="fab__steps">
            {STEPS.map((s, i) => (
              <li key={s.name} data-on={reduced || i === active}>
                <span className="fab__n mono">0{i + 1}</span>
                <div><h3 className="t-h3">{s.name}</h3><p className="dim mt-1">{s.body}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="caps">
          <div>
            <h3 className="eyebrow">Capabilities</h3>
            <ul>
              {CAPS.map((c) => <li key={c}>{c}</li>)}
              <li>Enclosures and DIN mounting</li>
            </ul>
          </div>
          <div>
            <p>Our catalogue boards started as customer problems. Tell us the I/O, the protocol and the power. We reply with a schematic plan. Scope and lead times on request.</p>
            <div className="mt-6"><Button {...rfqLinkProps({ need: 'custom', who: 'oem' })} variant="primary">Start a custom design</Button></div>
            <p className="mt-3 text-xs dim">Capabilities shown follow the catalogue and public repos.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

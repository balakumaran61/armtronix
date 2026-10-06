import { useEffect, useRef, useState } from 'react'
import { AI_LABELS, DI_LABELS, RELAY_LABELS, injectFault, toggleRelay, useTelemetry } from '../../lib/telemetry'
import { rfqLinkProps } from '../../lib/rfq'
import { BoardRender } from '../../components/board/BoardRender'
import { emitPacket } from '../../components/layout/SignalTrace'
import { DiLed } from '../../components/telemetry/DiLed'
import { Gauge } from '../../components/telemetry/Gauge'
import { MqttLog } from '../../components/telemetry/MqttLog'
import { PowerMeter } from '../../components/telemetry/PowerMeter'
import { RelaySwitch, playClick } from '../../components/telemetry/RelaySwitch'
import { Button } from '../../components/ui/Button'
import { SimTag } from '../../components/ui/SimTag'

/** H4 live telemetry console (ARM-18, SPEC §6/§7): a control panel wired to lib/telemetry.ts. */
export function H4() {
  const root = useRef<HTMLDivElement>(null)
  const s = useTelemetry((x) => x, root)
  const [sound, setSound] = useState(false)
  const [recovered, setRecovered] = useState(false)
  const [toast, setToast] = useState(false)
  const wasFault = useRef(false)

  // Fault lifecycle (MO-10): alarm → recovery banner for 4 s
  useEffect(() => {
    if (s.fault) { wasFault.current = true; return }
    if (!wasFault.current) return
    wasFault.current = false
    setRecovered(true)
    const id = setTimeout(() => setRecovered(false), 4000)
    return () => clearTimeout(id)
  }, [s.fault])

  const flip = (i: number) => {
    if (sound) playClick(!s.relayCmd[i])
    toggleRelay(i)
    emitPacket('signal')
  }
  const estop = () => {
    injectFault('estop')
    emitPacket('fault')
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }
  const leds = Object.fromEntries([...s.relay.map((on, i) => [`relay${i + 1}`, on]), ['status', s.running]])
  const held = s.fault?.type === 'estop'

  return (
    <section className="sec sec--console" id="h4" data-section="H4" aria-labelledby="h4-title">
      <div className="wrap">
        <p className="eyebrow">Live console · Simulated</p>
        <h2 id="h4-title">Flip a relay. Watch the board answer.</h2>
        <p className="lede">A control panel running on simulated data. No network is touched.</p>

        <div ref={root} className="console" data-alarm={held}>
          <div className="console__head mono">
            <span>Simulated telemetry · no live connection</span>
            <span className="dim">{s.running ? `T+${s.t}s · seed ${s.seed}` : 'Paused while off-screen'}</span>
            <label className="console__sound"><input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} /> Relay click: {sound ? 'on' : 'off'}</label>
          </div>
          {held ? <p className="banner banner--alarm" role="alert">ALARM · E-stop pressed · outputs held off</p> : null}
          {recovered ? <p className="banner banner--ok" role="status">Recovered · E-stop released · outputs restored</p> : null}

          <div className="console__grid">
            <div className="panel panel--ai">
              <h3 className="panel__h">Analog in</h3>
              <Gauge mA={s.ai[0]} level={s.level[0]} label={`${AI_LABELS[0]} · 4–20 mA`} fault={s.fault?.type === 'sensor'} />
              <p className="panel__cap mono">AI1 · tank level · 4–20 mA</p>
            </div>
            <div className="panel panel--di">
              <h3 className="panel__h">Digital in</h3>
              {DI_LABELS.map((l, i) => <DiLed key={l} label={l} on={s.di[i]} alarm={i === 2} />)}
              <SimTag />
            </div>
            <div className="panel panel--relay">
              <h3 className="panel__h">Relay out</h3>
              <div className="relays">
                {RELAY_LABELS.map((l, i) => <RelaySwitch key={l} label={l} on={s.relayCmd[i]} held={held && s.relayCmd[i]} onToggle={() => flip(i)} />)}
              </div>
            </div>
            <div className="panel panel--board">
              <h3 className="panel__h">BA011 · relay board</h3>
              <BoardRender code="BA011" lens="photo" ledStates={leds} />
              <p className="panel__cap mono">LEDs follow the relays <SimTag /></p>
            </div>
            <div className="panel panel--power">
              <h3 className="panel__h">Power</h3>
              <PowerMeter power={s.power} t={s.t} />
            </div>
            <div className="panel panel--log">
              <MqttLog log={s.log} />
            </div>
          </div>

          <div className="console__foot">
            <Button onClick={estop} disabled={!!s.fault} className="btn--fault">Simulate e-stop</Button>
            <Button {...rfqLinkProps({ need: 'retro', who: 'plant' })} variant="primary">Monitor my own machines</Button>
            <span className="mono text-xs dim">Simulated. Seeded, 1 Hz, no network.</span>
          </div>
          {toast ? <p className="toast mono" role="status">Notification sent (simulated)</p> : null}
        </div>
      </div>
    </section>
  )
}

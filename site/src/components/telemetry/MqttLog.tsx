import { useEffect, useRef, useState } from 'react'
import type { LogLine } from '../../lib/telemetry'
import { SimTag } from '../ui/SimTag'

/** MQTT log (MO-09): newest at the bottom, lines type in. Screen readers hear commands and alarms, at most every 3 s. */
export function MqttLog({ log, rows = 9 }: { log: LogLine[]; rows?: number }) {
  const lines = log.slice(-rows)
  const [said, setSaid] = useState('')
  const last = useRef(0)
  const latest = [...log].reverse().find((l) => l.kind !== 'state')
  useEffect(() => {
    if (!latest) return
    const now = Date.now()
    if (now - last.current < 3000) return
    last.current = now
    setSaid(`${latest.topic} ${latest.payload}`)
  }, [latest])
  return (
    <div className="mqtt">
      <div className="mqtt__head"><span className="eyebrow">MQTT log</span><SimTag variant="example" /></div>
      <ol className="mqtt__lines mono">
        {lines.map((l) => (
          <li key={l.id} data-kind={l.kind}>
            <span className="mqtt__t">T+{String(l.t).padStart(3, '0')}</span>
            <span className="mqtt__topic">{l.topic}</span>
            <span className="mqtt__payload">{l.payload}</span>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">{said}</p>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { useTelemetry } from '../../lib/telemetry'
import { StatusLed } from '../ui/StatusLed'

/** "● 3 boards online · Simulated", linking to the H4 console. A passive telemetry reader: it never keeps the engine awake. */
export function StatusStrip() {
  const { online, fault } = useTelemetry((s) => ({ online: s.boardsOnline, fault: s.fault !== null }))
  return (
    <Link to="/#h4" className="status" aria-label={`${online} boards online, simulated. Open the live console`}>
      <StatusLed state={fault ? 'warn' : 'on'} label={`${online} boards online`} pulse={!fault} />
      <span aria-hidden="true">· <span className="sim">Simulated</span></span>
    </Link>
  )
}

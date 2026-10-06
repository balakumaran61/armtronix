import { StatusLed } from '../ui/StatusLed'

/** A digital input LED with its name and state in text (SPEC §12). E-stop lights red when active. */
export function DiLed({ label, on, alarm = false }: { label: string; on: boolean; alarm?: boolean }) {
  return (
    <div className="di">
      <StatusLed state={on ? (alarm ? 'fault' : 'on') : 'off'} label={label} />
      <span className="mono di__state" aria-hidden="true">{on ? 'ON' : 'OFF'}</span>
    </div>
  )
}

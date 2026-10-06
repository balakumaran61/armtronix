export type LedState = 'on' | 'off' | 'warn' | 'fault'
const STATE_TEXT: Record<LedState, string> = { on: 'on', off: 'off', warn: 'warning', fault: 'fault' }

interface Props { state: LedState; label: string; showLabel?: boolean; pulse?: boolean; className?: string }

/** A status LED with a text equivalent (SPEC §12): the label is visible or screen-reader only. */
export function StatusLed({ state, label, showLabel = true, pulse = false, className = '' }: Props) {
  return (
    <span className={`led ${className}`.trim()} data-state={state} data-pulse={pulse}>
      <span className="led__dot" aria-hidden="true" />
      {showLabel ? <span>{label}</span> : null}
      <span className="sr-only">{showLabel ? `: ${STATE_TEXT[state]}` : `${label}: ${STATE_TEXT[state]}`}</span>
    </span>
  )
}

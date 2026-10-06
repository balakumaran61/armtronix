import { THEME_LABEL, toggleTheme, useTheme } from '../../lib/theme'

/** MO-12: a physical toggle. Datasheet = lever right. The new theme spreads out from the switch. */
export function ThemeSwitch({ showLabel = true }: { showLabel?: boolean }) {
  const theme = useTheme()
  const dark = theme === 'control-room'
  return (
    <button
      type="button" role="switch" className="tswitch" aria-checked={!dark}
      aria-label={`Switch theme. Now: ${THEME_LABEL[theme]} (${dark ? 'dark' : 'light'})`}
      onClick={(e) => {
        const r = e.currentTarget.querySelector('.tswitch__body')!.getBoundingClientRect()
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
      }}
    >
      <span className="tswitch__body" aria-hidden="true"><span className="tswitch__lever" /></span>
      {showLabel ? <span className="tswitch__label" aria-hidden="true">{THEME_LABEL[theme]}</span> : null}
    </button>
  )
}

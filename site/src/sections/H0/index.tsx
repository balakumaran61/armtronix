import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

const LINES = ['init esp32 … ok', 'wifi 802.11 b/g/n … ok', 'can 2.0 … ok', 'rs485 modbus … ok', 'mqtt connect … ok', '▶ ARMtronix online']
const KEY = 'atx-booted'

function seen() {
  try { return sessionStorage.getItem(KEY) === '1' } catch { return false }
}

/** H0 boot sequence (MO-02): about 1.2 s, once per session, skippable (Esc), skipped under reduced motion. Decorative. */
export function H0() {
  const [on] = useState(() => !seen() && !prefersReducedMotion())
  const [n, setN] = useState(0)
  const [done, setDone] = useState(!on)

  useEffect(() => {
    if (!on) return
    try { sessionStorage.setItem(KEY, '1') } catch { /* fine: it may replay */ }
    const tick = setInterval(() => setN((x) => Math.min(LINES.length, x + 1)), 170)
    const end = setTimeout(() => setDone(true), 1250)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDone(true) }
    document.addEventListener('keydown', onKey)
    return () => { clearInterval(tick); clearTimeout(end); document.removeEventListener('keydown', onKey) }
  }, [on])

  if (!on) return null
  return (
    <div className="boot" data-done={done} aria-hidden="true">
      <pre className="boot__log mono">{LINES.slice(0, n).join('\n')}<span className="boot__cursor">_</span></pre>
      <button type="button" className="boot__skip mono" tabIndex={-1} onClick={() => setDone(true)}>Skip boot (Esc)</button>
      <p className="boot__note mono">Boot log is decorative.</p>
    </div>
  )
}

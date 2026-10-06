import { useEffect, useRef } from 'react'
import { ScrollTrigger, prefersReducedMotion, useReducedMotion } from '../../lib/motion'

/** The storyline (SPEC §3): Physical → Board → Protocol → Cloud → Decision. Vias sit at the stage midpoints. */
export const STAGES = ['Physical', 'Board', 'Protocol', 'Cloud', 'Decision'] as const
const VIA_AT = STAGES.map((_, i) => (i + 0.5) / STAGES.length)

let firePulse: ((tone: PacketTone) => void) | null = null
export type PacketTone = 'signal' | 'copper' | 'fault'

/**
 * Fires a pulse down the trace, from the start to the current fill head (about 700 ms).
 * For sections marking a moment: a relay flip, a stage reached, an RFQ step. No-op under reduced motion.
 */
export function emitPacket(tone: PacketTone = 'signal') {
  if (!prefersReducedMotion()) firePulse?.(tone)
}

/**
 * MO-01: a copper trace on the left edge (≥ 768) or along the top (mobile), filled by page scroll,
 * with a packet riding the fill head. Reduced motion: a static, fully filled trace.
 */
export function SignalTrace() {
  const root = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = root.current!
    const vias = [...el.querySelectorAll<HTMLElement>('.trace__via')]
    let stage = -1
    const update = (p: number) => {
      el.style.setProperty('--p', (reduced ? 1 : p).toFixed(4))
      vias.forEach((v, i) => { v.dataset.lit = String(reduced || p >= VIA_AT[i] - 0.001) })
      const s = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))
      if (s !== stage) {
        stage = s
        el.setAttribute('aria-valuenow', String(s + 1))
        el.setAttribute('aria-valuetext', `Page progress: stage ${s + 1} of 5, ${STAGES[s]}`)
        if (label.current) label.current.textContent = `0${s + 1} ${STAGES[s]}`
      }
    }
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => update(self.progress), onRefresh: (self) => update(self.progress) })
    update(st.progress)

    firePulse = (tone) => {
      const h = head.current
      if (!h) return
      const dot = document.createElement('span')
      dot.className = 'trace__pulse'
      if (tone !== 'signal') dot.style.background = `var(--${tone})`
      h.parentElement!.appendChild(dot)
      const vertical = matchMedia('(min-width: 768px)').matches
      const box = el.getBoundingClientRect()
      const end = Number(el.style.getPropertyValue('--p') || 0) * (vertical ? box.height : box.width)
      const axis = vertical ? 'translateY' : 'translateX'
      dot.animate(
        [{ transform: `${axis}(0px)`, opacity: 0 }, { opacity: 1, offset: 0.15 }, { transform: `${axis}(${end}px)`, opacity: 0.9 }],
        { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' },
      ).finished.then(() => dot.remove(), () => dot.remove())
    }
    return () => { st.kill(); firePulse = null }
  }, [reduced])

  return (
    <div
      ref={root} className="trace" role="progressbar" aria-label="Page progress"
      aria-valuemin={1} aria-valuemax={5} aria-valuenow={1} aria-valuetext="Page progress: stage 1 of 5, Physical"
    >
      <span className="trace__track" />
      <span className="trace__fill" />
      {VIA_AT.map((at, i) => (
        <span key={STAGES[i]} className="trace__via" style={{ top: `${at * 100}%` }} title={STAGES[i]} />
      ))}
      <div ref={head} className="trace__head">
        {reduced ? null : <span className="trace__packet" />}
        {reduced ? null : <span ref={label} className="trace__stage" aria-hidden="true" />}
      </div>
    </div>
  )
}

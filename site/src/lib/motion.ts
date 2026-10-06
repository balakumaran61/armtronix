import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const QUERY = '(prefers-reduced-motion: reduce)'

/** Synchronous check, for code outside React (e.g. emitPacket). */
export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches

/** True when the user asks for reduced motion. Live: re-renders when the setting changes. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

let lenis: Lenis | null = null

/** The single Lenis instance, or null when motion is reduced. */
export const getLenis = () => lenis

/** Starts Lenis synced with ScrollTrigger. Returns a cleanup. One call, from <MotionRoot/>. */
export function startSmoothScroll(): () => void {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  const tick = (t: number) => lenis?.raf(t * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to an element or y offset, using Lenis when on and a jump when reduced. */
export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  if (lenis) lenis.scrollTo(target, { duration: 1.2, immediate, offset: typeof target === 'number' ? 0 : -72 })
  else if (typeof target === 'number') window.scrollTo(0, target)
  else {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    el?.scrollIntoView()
  }
}

/** SPEC §11 easing and durations (ms), mirrored from tokens.css for GSAP. */
export const EASE = 'cubic-bezier(.2,.8,.2,1)'
export const DUR = { fast: 150, ui: 250, theme: 450, story: 600, slow: 800 } as const

/**
 * Convention for every section: run all GSAP work inside gsap.context so it can be reverted.
 *   useEffect(() => { const ctx = gsap.context(() => {...}, rootRef); return () => ctx.revert() }, [])
 * and skip decorative tweens when useReducedMotion() is true.
 */
export { gsap, ScrollTrigger }

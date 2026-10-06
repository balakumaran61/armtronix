import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger, scrollToTarget, startSmoothScroll, useReducedMotion } from '../../lib/motion'

/** Lenis smooth scroll (off under reduced motion) and route-change scrolling: top, or the #hash section. */
export function MotionRoot({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const { pathname, hash } = useLocation()

  useEffect(() => (reduced ? undefined : startSmoothScroll()), [reduced])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const el = hash ? document.getElementById(hash.slice(1)) : null
      if (el) scrollToTarget(el)
      else scrollToTarget(0, true)
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return <>{children}</>
}

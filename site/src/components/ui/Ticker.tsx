import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

/** MO-13: a mono number that counts to its new value (400 ms). Reduced motion: the final value. */
export function Ticker({ value, digits = 1, className = '' }: { value: number; digits?: number; className?: string }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    if (prefersReducedMotion()) { from.current = value; setShown(value); return }
    const start = performance.now(), a = from.current
    let id = 0
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 400)
      const v = a + (value - a) * (1 - (1 - k) ** 3)
      setShown(v)
      if (k < 1) id = requestAnimationFrame(step)
      else from.current = value
    }
    id = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(id); from.current = value }
  }, [value])
  return <span className={`mono ${className}`.trim()}>{shown.toFixed(digits)}</span>
}

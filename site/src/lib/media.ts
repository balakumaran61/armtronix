import { useSyncExternalStore } from 'react'

/** Live media query match (layout switches such as H2 pinning at ≥ 1024). */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia(query).matches,
    () => false,
  )
}

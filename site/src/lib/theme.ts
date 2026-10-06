/**
 * Themes (SPEC §3, §12; ARM-13 tokens.css).
 *   'control-room' (dark, default) · 'datasheet' (light)
 * Mechanics: with no data-theme on <html>, tokens.css follows prefers-color-scheme (first visit).
 * A toggle writes data-theme and persists it in localStorage ('atx-theme'); index.html re-applies it
 * before first paint. MO-12: the new theme cross-fades outward from the switch (View Transitions),
 * instant under reduced motion or where unsupported.
 */
import { useSyncExternalStore } from 'react'
import { prefersReducedMotion } from './motion'

export type Theme = 'control-room' | 'datasheet'
export const THEME_LABEL: Record<Theme, string> = { 'control-room': 'Control Room', datasheet: 'Datasheet' }

const KEY = 'atx-theme'
const LIGHT = '(prefers-color-scheme: light)'
const listeners = new Set<() => void>()

/** The theme in effect: the explicit choice, else the OS preference. */
export function getTheme(): Theme {
  const t = document.documentElement.dataset.theme
  if (t === 'control-room' || t === 'datasheet') return t
  return window.matchMedia(LIGHT).matches ? 'datasheet' : 'control-room'
}

function apply(t: Theme) {
  document.documentElement.dataset.theme = t
  try { localStorage.setItem(KEY, t) } catch { /* storage unavailable: the choice lasts this page view */ }
  listeners.forEach((l) => l())
}

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }

/** Sets the theme. `origin` (viewport px) is where the cross-fade starts, usually the switch. */
export function setTheme(t: Theme, origin?: { x: number; y: number }) {
  const doc = document as ViewTransitionDoc
  if (!doc.startViewTransition || prefersReducedMotion() || !origin) return apply(t)
  const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y))
  const vt = doc.startViewTransition(() => apply(t))
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' },
    )
  }).catch(() => {})
}

export const toggleTheme = (origin?: { x: number; y: number }) =>
  setTheme(getTheme() === 'control-room' ? 'datasheet' : 'control-room', origin)

function subscribe(cb: () => void) {
  listeners.add(cb)
  const mq = window.matchMedia(LIGHT)
  mq.addEventListener('change', cb) // follows the OS while nothing is saved
  return () => { listeners.delete(cb); mq.removeEventListener('change', cb) }
}

/** The current theme; re-renders on toggle and on OS changes. */
export const useTheme = (): Theme => useSyncExternalStore(subscribe, getTheme, () => 'control-room')

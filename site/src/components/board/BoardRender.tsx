import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { anchors, loadLens, namespace, viewBoxRatio, LENSES, type Anchor, type HeroCode, type Lens } from './svgs'

interface Props {
  code: HeroCode
  lens: Lens
  /** 0 (stacked) to 1 (fully exploded), Layers lens only */
  explode?: number
  /** LED id (from PRODUCTS.json leds, e.g. 'relay1') → lit */
  ledStates?: Record<string, boolean>
  activeHotspot?: string | null
  onAnchors?: (a: Anchor[]) => void
  className?: string
}

/**
 * A board's three ARM-14 lens SVGs, inlined and namespaced so parts are addressable.
 * Lens changes wipe left to right (MO-05; instant under reduced motion). LEDs light from ledStates.
 */
export function BoardRender({ code, lens, explode = 0, ledStates, activeHotspot, onAnchors, className = '' }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [svgs, setSvgs] = useState<Partial<Record<Lens, string>>>({})
  const [loaded, setLoaded] = useState<string | null>(null)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let live = true
    Promise.all(LENSES.map((l) => loadLens(code, l.id).then((s) => [l.id, s] as const))).then((all) => {
      if (!live) return
      setSvgs(Object.fromEntries(all))
      setLoaded(code)
    }, () => {})
    return () => { live = false }
  }, [code])

  const ready = loaded === code
  const html = useMemo(
    () => Object.fromEntries(LENSES.map((l) => [l.id, namespace(svgs[l.id] ?? '', `${uid}-${code}-${l.id}`)])) as Record<Lens, string>,
    [svgs, uid, code],
  )
  const photo = ready ? svgs.photo : undefined
  useEffect(() => { if (photo) onAnchors?.(anchors(photo)) }, [photo, onAnchors])

  // LEDs and the active hotspot ring, applied to the inlined DOM
  useEffect(() => {
    const el = root.current
    if (!el || !ready) return
    el.querySelectorAll<SVGElement>('.led').forEach((led) => {
      const id = led.id.split('-led-')[1]
      led.dataset.on = String(!!(id && ledStates?.[id]))
    })
    el.querySelectorAll<SVGGElement>('g[id*="-hs-"]').forEach((g) => {
      g.dataset.active = String(g.id.endsWith(`-hs-${activeHotspot}`))
    })
  }, [ledStates, activeHotspot, ready])

  return (
    <div
      ref={root} className={`board ${className}`.trim()} data-lens={lens}
      style={{ aspectRatio: photo ? viewBoxRatio(photo) : '828 / 468', ['--explode' as string]: explode }}
      aria-busy={!ready}
    >
      {ready ? LENSES.map((l) => (
        <div
          key={l.id} className="board__lens" data-on={lens === l.id} aria-hidden={lens !== l.id}
          dangerouslySetInnerHTML={{ __html: html[l.id] }}
        />
      )) : <div className="board__loading mono dim">Loading {code} render…</div>}
    </div>
  )
}

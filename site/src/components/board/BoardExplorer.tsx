import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProduct } from '../../data/products'
import { gsap, useReducedMotion } from '../../lib/motion'
import { rfqLinkProps } from '../../lib/rfq'
import { Button } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { BoardRender } from './BoardRender'
import { HERO_CODES, LENSES, type Anchor, type HeroCode, type Lens } from './svgs'

interface Props {
  /** Boards offered in the selector. One code = no selector (product pages). */
  codes?: readonly HeroCode[]
  initial?: HeroCode
  /** LED states pushed into the render (e.g. from telemetry) */
  ledStates?: Record<string, boolean>
  /** Show the datasheet strip and CTAs under the hotspot list (home H3) */
  showCtas?: boolean
  headingLevel?: 'h3' | 'h4'
}

/**
 * Board explorer (SPEC §6 H3; reused by /products/:code). Lens tabs with a wipe (MO-05), hotspots with a
 * pulse and leader line (MO-06), the Layers lens explodes via a slider (drag / keys) and a tween on entry.
 */
export function BoardExplorer({ codes = HERO_CODES, initial, ledStates, showCtas = true, headingLevel = 'h3' }: Props) {
  const [code, setCode] = useState<HeroCode>(initial ?? codes[0])
  const [lens, setLens] = useState<Lens>('photo')
  const [explode, setExplode] = useState(0)
  const [active, setActive] = useState<string | null>(null)
  const [pts, setPts] = useState<Anchor[]>([])
  const reduced = useReducedMotion()
  const tween = useRef<gsap.core.Tween | null>(null)
  const p = getProduct(code)!
  const H = headingLevel

  const onAnchors = useCallback((a: Anchor[]) => setPts(a), [])
  const pick = (c: HeroCode) => { setCode(c); setActive(null) }

  const chooseLens = (l: Lens) => {
    setLens(l)
    tween.current?.kill()
    if (l !== 'layers') { setExplode(0); return }
    if (reduced) { setExplode(1); return }
    const o = { v: 0 }
    tween.current = gsap.to(o, { v: 1, duration: 0.8, ease: 'power2.out', onUpdate: () => setExplode(o.v) })
  }
  useEffect(() => () => { tween.current?.kill() }, [])

  const hotspots = p.hotspots.map((h, i) => ({ ...h, n: i + 1, at: pts.find((a) => a.id === h.id) }))
  const current = hotspots.find((h) => h.id === active)
  const showPins = lens !== 'layers'

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    const next = LENSES[(i + dir + LENSES.length) % LENSES.length]
    chooseLens(next.id)
    ;(e.currentTarget.parentElement?.children[(i + dir + LENSES.length) % LENSES.length] as HTMLElement)?.focus()
  }

  return (
    <div className="explorer">
      <div className="explorer__bar">
        {codes.length > 1 ? (
          <div className="seg" role="group" aria-label="Board">
            {codes.map((c) => <button key={c} type="button" className="seg__btn" aria-pressed={c === code} onClick={() => pick(c)}>{c}</button>)}
          </div>
        ) : null}
        <div className="seg" role="tablist" aria-label="Lens">
          {LENSES.map((l, i) => (
            <button
              key={l.id} type="button" role="tab" className="seg__btn" aria-selected={lens === l.id} tabIndex={lens === l.id ? 0 : -1}
              onClick={() => chooseLens(l.id)} onKeyDown={(e) => onTabKey(e, i)}
            >{l.label}</button>
          ))}
        </div>
      </div>

      <div className="explorer__grid">
        <div className="explorer__stage" role="tabpanel" aria-label={`${code} ${LENSES.find((l) => l.id === lens)!.label} lens`}>
          <div className="explorer__render">
            <BoardRender code={code} lens={lens} explode={explode} ledStates={ledStates} activeHotspot={active} onAnchors={onAnchors} />
            {showPins ? hotspots.map((h) => h.at ? (
              <button
                key={h.id} type="button" className="pin" style={{ left: `${h.at.x * 100}%`, top: `${h.at.y * 100}%` }}
                aria-expanded={active === h.id} aria-controls="hs-card" aria-label={`${h.n}. ${h.label}`}
                onClick={() => setActive(active === h.id ? null : h.id)}
                onMouseEnter={() => setActive(h.id)}
              >
                <span aria-hidden="true">{h.n}</span>
              </button>
            ) : null) : null}
            {showPins && current?.at ? (
              <div className="callout" style={{ left: `${current.at.x * 100}%`, top: `${current.at.y * 100}%` }} data-flip={current.at.x > 0.6} aria-hidden="true">
                <span className="callout__line" />
                <span className="callout__box mono">{current.label}</span>
              </div>
            ) : null}
          </div>
          {lens === 'layers' ? (
            <label className="explode">
              <span className="eyebrow">Separate layers</span>
              <input type="range" min={0} max={100} value={Math.round(explode * 100)} onChange={(e) => { tween.current?.kill(); setExplode(Number(e.target.value) / 100) }} aria-valuetext={`${Math.round(explode * 100)} per cent separated`} />
            </label>
          ) : (
            <p className="explorer__hint dim"><span className="hide-mobile">Hover a part. </span>Tap a number for its spec.</p>
          )}
        </div>

        <aside className="explorer__side">
          <p className="eyebrow">{p.line === 'IA' ? 'Industrial Automation' : 'Building Automation'} · {p.code}</p>
          <H className="t-h3 mt-2">{p.name}</H>
          <div id="hs-card" className="hs-card" aria-live="polite">
            {current ? (
              <>
                <p className="hs-card__label">{current.n}. {current.label}</p>
                <p className="mono text-sm mt-1">{current.spec}</p>
              </>
            ) : <p className="dim text-sm">Pick a part to read its spec.</p>}
          </div>
          <ol className="hs-list">
            {hotspots.map((h) => (
              <li key={h.id}>
                <button type="button" aria-pressed={active === h.id} onClick={() => setActive(active === h.id ? null : h.id)}>
                  <span className="hs-list__n mono" aria-hidden="true">{h.n}</span>{h.label}
                </button>
              </li>
            ))}
          </ol>
          {showCtas ? (
            <>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip tone="copper">{p.power}</Chip>
                {p.interfaces.slice(0, 4).map((i) => <Chip key={i}>{i}</Chip>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to={`/products/${p.slug}`} variant="primary">Open the full datasheet page</Button>
                <Button {...rfqLinkProps({ product: p.code, need: 'sample' })}>Request a sample of this board</Button>
              </div>
            </>
          ) : null}
          <p className="mt-4 text-xs dim">Renders are drawn from the datasheets. Not photographs. <Link to="/credits">Credits</Link></p>
        </aside>
      </div>
    </div>
  )
}

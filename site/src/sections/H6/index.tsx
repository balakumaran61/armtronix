import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { IFACES, POWERS, hasIface, hasPower, keyChips } from '../../lib/catalogue'
import { MiniRender } from '../../components/board/InlineSvg'
import { Button } from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'

const DRAWERS = [
  { line: 'IA', name: 'Industrial Automation' },
  { line: 'BA', name: 'Building Automation' },
] as const

/** H6 parts drawer (ARM-19, MO-15): two drawers slide open on rails; bins filter by interface and power. */
export function H6() {
  const [open, setOpen] = useState<Record<string, boolean>>({ IA: true, BA: false })
  const [iface, setIface] = useState<string[]>([])
  const [power, setPower] = useState<string[]>([])
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v])
  const shown = products.filter((p) => (!iface.length || iface.some((f) => hasIface(p, f))) && (!power.length || power.some((f) => hasPower(p, f))))

  return (
    <section className="sec" id="h6" data-section="H6" aria-labelledby="h6-title">
      <div className="wrap">
        <p className="eyebrow">Parts drawer</p>
        <h2 id="h6-title">Seventeen boards. Two drawers.</h2>
        <p className="lede">Industrial Automation and Building Automation, each with real specs.</p>

        <div className="filters" role="group" aria-label="Filter boards">
          {IFACES.filter((f) => f !== 'USB').map((f) => <Chip key={f} pressed={iface.includes(f)} onClick={() => toggle(iface, setIface, f)}>{f}</Chip>)}
          {POWERS.filter((f) => f !== '5 V DC').map((f) => <Chip key={f} tone="copper" pressed={power.includes(f)} onClick={() => toggle(power, setPower, f)}>{f}</Chip>)}
          {iface.length || power.length ? <button type="button" className="linkish" onClick={() => { setIface([]); setPower([]) }}>Clear filters</button> : null}
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} boards match</p>

        <div className="drawers">
          {DRAWERS.map((d) => {
            const bins = shown.filter((p) => p.line === d.line)
            const total = products.filter((p) => p.line === d.line).length
            const isOpen = open[d.line]
            return (
              <div key={d.line} className="drawer" data-open={isOpen}>
                <button type="button" className="drawer__front" aria-expanded={isOpen} aria-controls={`drawer-${d.line}`} onClick={() => setOpen({ ...open, [d.line]: !isOpen })}>
                  <span className="drawer__label mono">{d.line}</span>
                  <span className="drawer__name">{d.name} · {d.line} · {total} boards</span>
                  <span className="drawer__count mono">{bins.length} shown</span>
                  <span className="drawer__pull" aria-hidden="true" />
                </button>
                <div id={`drawer-${d.line}`} className="drawer__body">
                  <div className="drawer__inner">
                    {bins.length ? (
                      <ul className="bins">
                        {bins.map((p) => (
                          <li key={p.code}>
                            <Link to={`/products/${p.slug}`} className="bin">
                              <MiniRender code={p.code} className="bin__mini" />
                              <span className="bin__code mono">{p.code}</span>
                              <span className="bin__name">{p.name}</span>
                              <span className="bin__chips">{keyChips(p).map((c) => <span key={c} className="chip">{c}</span>)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : <p className="dim p-4">No board matches those filters. Clear a filter.</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button to="/products" variant="primary">See the full catalogue</Button>
          <span className="text-xs dim">Availability: confirm with sales.</span>
        </div>
      </div>
    </section>
  )
}

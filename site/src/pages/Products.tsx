import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, type Product } from '../data/products'
import { IFACES, IOS, LINES, MOUNTS, POWERS, filterProducts, hasIface, hasIo, hasPower, ioCount, ioText, keyChips, mountOf, powerOf, type Filters } from '../lib/catalogue'
import { rfqLinkProps } from '../lib/rfq'
import { useMeta } from '../lib/meta'
import { MiniRender } from '../components/board/InlineSvg'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { SpecTable } from '../components/ui/SpecTable'

const FACETS: { key: keyof Filters; label: string; options: readonly string[]; test: (p: Product, v: string) => boolean; name?: (v: string) => string }[] = [
  { key: 'line', label: 'Line', options: LINES, test: (p, v) => p.line === v, name: (v) => (v === 'IA' ? 'Industrial (IA)' : 'Building (BA)') },
  { key: 'iface', label: 'Interface', options: IFACES, test: hasIface },
  { key: 'power', label: 'Power', options: POWERS, test: hasPower },
  { key: 'mount', label: 'Mounting', options: MOUNTS, test: (p, v) => mountOf(p) === v },
  { key: 'io', label: 'I/O type', options: IOS, test: hasIo },
]
const CAT_IA = 'https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/ARMtronix_IA_ProdcutCatalogue.pdf'
const CAT_REPO = 'https://github.com/armtronix/ARMtronix_Product_Documents'

/** /products catalogue (ARM-20, SPEC §9): URL-synced filters with counts, sortable table or bins, compare up to 3. */
export function Products() {
  useMeta('Catalogue', 'Every ARMtronix Industrial and Building Automation board in one engineering table: interfaces, power, I/O and mounting.')
  const [q, setQ] = useSearchParams()
  const filters: Filters = { line: q.getAll('line'), iface: q.getAll('iface'), power: q.getAll('power'), mount: q.getAll('mount'), io: q.getAll('io') }
  const view = q.get('view') === 'bins' ? 'bins' : 'table'
  const sort = q.get('sort') ?? 'code'
  const [compare, setCompare] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [sheet, setSheet] = useState(false)

  const setParam = (mut: (n: URLSearchParams) => void) => { const n = new URLSearchParams(q); mut(n); setQ(n, { replace: true }) }
  const toggle = (key: keyof Filters, v: string) => setParam((n) => {
    const cur = n.getAll(key)
    n.delete(key)
    ;(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]).forEach((x) => n.append(key, x))
  })
  const clear = () => setParam((n) => FACETS.forEach((f) => n.delete(f.key)))

  const list = useMemo(() => {
    const l = filterProducts(filters)
    const by: Record<string, (a: Product, b: Product) => number> = {
      code: (a, b) => a.code.localeCompare(b.code), io: (a, b) => ioCount(b) - ioCount(a), name: (a, b) => a.name.localeCompare(b.name),
    }
    return [...l].sort(by[sort] ?? by.code)
  }, [q]) // eslint-disable-line react-hooks/exhaustive-deps

  // Count per option: how many boards it would show given the other facets
  const count = (key: keyof Filters, v: string, test: (p: Product, v: string) => boolean) =>
    filterProducts({ ...filters, [key]: [] }).filter((p) => test(p, v)).length

  const addCompare = (code: string) => {
    if (compare.includes(code)) { setCompare(compare.filter((c) => c !== code)); setNote(''); return }
    if (compare.length >= 3) { setNote('Compare holds three boards. Remove one first.'); return }
    setCompare([...compare, code]); setNote('')
  }
  const active = FACETS.reduce((n, f) => n + filters[f.key].length, 0)
  const compared = compare.map((c) => products.find((p) => p.code === c)!)

  const rail = (
    <div className="rail">
      {FACETS.map((f) => (
        <fieldset key={f.key} className="rail__group">
          <legend className="eyebrow">{f.label}</legend>
          {f.options.map((o) => {
            const n = count(f.key, o, f.test)
            return (
              <label key={o} className="check" data-empty={n === 0}>
                <input type="checkbox" checked={filters[f.key].includes(o)} onChange={() => toggle(f.key, o)} />
                <span>{f.name ? f.name(o) : o}</span><span className="mono dim ml-auto">{n}</span>
              </label>
            )
          })}
        </fieldset>
      ))}
      {active ? <button type="button" className="linkish" onClick={clear}>Clear all filters</button> : null}
    </div>
  )

  return (
    <main id="main" className="wrap catalogue">
      <header className="page-head">
        <p className="eyebrow">Catalogue</p>
        <h1>Every board, in one table.</h1>
        <p className="mt-4 dim">Filter by interface, power, mounting and I/O. Compare up to three.</p>
        <p className="mt-3 text-sm">
          <a className="linkish" href={CAT_IA} target="_blank" rel="noopener">Download IA catalogue (PDF) ↗</a> · <a className="linkish" href={CAT_REPO} target="_blank" rel="noopener">BA catalogue and datasheets (GitHub) ↗</a>
        </p>
      </header>

      <div className="catalogue__grid">
        <aside className="catalogue__rail" aria-label="Filters">{rail}</aside>
        <div>
          <div className="catalogue__bar">
            <Button size="sm" className="catalogue__filters-btn" aria-expanded={sheet} onClick={() => setSheet(true)}>Filters{active ? ` (${active})` : ''}</Button>
            <p className="mono text-sm" aria-live="polite">{list.length} of {products.length} boards</p>
            <div className="seg seg--sm" role="group" aria-label="View">
              {(['table', 'bins'] as const).map((v) => <button key={v} type="button" className="seg__btn" aria-pressed={view === v} onClick={() => setParam((n) => (v === 'table' ? n.delete('view') : n.set('view', v)))}>{v === 'table' ? 'Table' : 'Bins'}</button>)}
            </div>
            <label className="text-sm">Sort <select className="input input--sm" value={sort} onChange={(e) => setParam((n) => n.set('sort', e.target.value))}>
              <option value="code">Code</option><option value="io">I/O count</option><option value="name">Name</option>
            </select></label>
          </div>

          {!list.length ? <p className="stub">No boards match. <button type="button" className="linkish" onClick={clear}>Clear a filter.</button></p> : view === 'table' ? (
            <table className="ptable">
              <thead><tr><th scope="col">Code</th><th scope="col">Name</th><th scope="col">Interfaces</th><th scope="col">Power</th><th scope="col">I/O</th><th scope="col">Mounting</th><th scope="col"><span className="sr-only">Compare</span></th></tr></thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.code}>
                    <th scope="row" data-l="Code"><Link to={`/products/${p.slug}`} className="mono">{p.code}</Link></th>
                    <td data-l="Name"><Link to={`/products/${p.slug}`}>{p.name}</Link></td>
                    <td data-l="Interfaces">{p.interfaces.join(' · ')}</td>
                    <td data-l="Power" className="mono">{powerOf(p)}</td>
                    <td data-l="I/O" className="mono">{ioText(p)}</td>
                    <td data-l="Mounting">{p.mounting}</td>
                    <td><Chip pressed={compare.includes(p.code)} onClick={() => addCompare(p.code)}>{compare.includes(p.code) ? 'In compare' : 'Add to compare'}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="bins bins--page">
              {list.map((p) => (
                <li key={p.code}>
                  <Link to={`/products/${p.slug}`} className="bin">
                    <MiniRender code={p.code} className="bin__mini" />
                    <span className="bin__code mono">{p.code}</span>
                    <span className="bin__name">{p.name}</span>
                    <span className="bin__chips">{keyChips(p).map((c) => <span key={c} className="chip">{c}</span>)}</span>
                  </Link>
                  <Chip pressed={compare.includes(p.code)} onClick={() => addCompare(p.code)}>{compare.includes(p.code) ? 'In compare' : 'Add to compare'}</Chip>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8"><Button {...rfqLinkProps()} variant="primary">Request a quote</Button></div>
        </div>
      </div>

      {sheet ? (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Filters" onKeyDown={(e) => e.key === 'Escape' && setSheet(false)}>
          <div className="sheet__panel">
            <div className="flex items-center justify-between"><p className="eyebrow">Filters · {list.length} boards</p><Button size="sm" variant="primary" autoFocus onClick={() => setSheet(false)}>Done</Button></div>
            {rail}
          </div>
        </div>
      ) : null}

      {compare.length ? (
        <div className="compare" role="region" aria-label="Compare boards">
          <div className="compare__bar">
            <span className="mono text-sm">Compare ({compare.length})</span>
            {note ? <span className="text-sm" role="alert">{note}</span> : null}
            <button type="button" className="linkish" onClick={() => { setCompare([]); setNote('') }}>Clear</button>
          </div>
          <div className="compare__cols" style={{ gridTemplateColumns: `repeat(${compared.length}, minmax(0, 1fr))` }}>
            {compared.map((p) => (
              <div key={p.code}>
                <p className="mono"><Link to={`/products/${p.slug}`}>{p.code}</Link> · {p.name}</p>
                <SpecTable specs={[
                  { label: 'Power', value: p.power, unit: '—', source: '' },
                  { label: 'Interfaces', value: p.interfaces.join(', '), unit: '—', source: '' },
                  { label: 'I/O', value: ioText(p), unit: '—', source: '' },
                  { label: 'Mounting', value: p.mounting, unit: '—', source: '' },
                  { label: 'MCU', value: p.mcu ?? '—', unit: '—', source: '' },
                ]} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  )
}

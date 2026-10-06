import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { Button } from '../components/ui/Button'

/** 404 · No signal. With `search`, a quick catalogue search (unknown product codes). */
export function NotFound({ what = "This page doesn't exist.", search = false }: { what?: string; search?: boolean }) {
  const [q, setQ] = useState('')
  const s = q.trim().toLowerCase()
  const hits = s ? products.filter((p) => p.code.toLowerCase().includes(s) || p.name.toLowerCase().includes(s)).slice(0, 6) : []
  return (
    <main id="main" className="wrap">
      <header className="page-head">
        <p className="eyebrow">404 · No signal</p>
        <h1>{what}</h1>
        {search ? (
          <div className="mt-6 max-w-md">
            <label className="eyebrow" htmlFor="nf-q">Search the catalogue</label>
            <input id="nf-q" className="input mt-2" type="search" placeholder="IA015, relay, LoRa…" value={q} onChange={(e) => setQ(e.target.value)} />
            <ul className="mt-3 grid gap-1 mono text-sm" aria-live="polite">{hits.map((p) => <li key={p.code}><Link to={`/products/${p.slug}`}>{p.code} · {p.name}</Link></li>)}</ul>
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/products" variant="primary">Back to the catalogue</Button>
          <Button to="/">Home</Button>
        </div>
      </header>
    </main>
  )
}

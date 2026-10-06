import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, products, type Product } from '../data/products'
import { keyChips, ioText } from '../lib/catalogue'
import { rfqLinkProps } from '../lib/rfq'
import { useMeta } from '../lib/meta'
import { BoardExplorer } from '../components/board/BoardExplorer'
import { BoardRender } from '../components/board/BoardRender'
import { MiniRender } from '../components/board/InlineSvg'
import { isHero } from '../components/board/svgs'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { SimTag } from '../components/ui/SimTag'
import { SpecTable } from '../components/ui/SpecTable'
import { NotFound } from './NotFound'

/** IA015's commands come from its datasheet rev B; the others use the site's generic example format. */
function snippet(p: Product): { code: string; note: string } {
  if (p.code === 'IA015') return {
    code: '/O/001  _100      # turns on output 1\n/I/001            # publishes input changes\nstatus_an         # reads the analog inputs',
    note: 'From the IA015 datasheet rev B. The console on the home page uses a generic example format.',
  }
  const dev = `armtronix/${p.slug}-001`
  const lines = [`mosquitto_sub -t '${dev}/#' -v`]
  if (p.io.do) lines.push(`mosquitto_pub -t '${dev}/relay1/set' -m 'ON'`)
  if (p.io.di) lines.push(`# ${dev}/di1  1`)
  if (p.io.ai) lines.push(`# ${dev}/ai1  {"value":2.41}`)
  return { code: lines.join('\n'), note: 'Example format. Check the datasheet for this board\'s exact topics and firmware mode.' }
}

function CopyBlock({ code }: { code: string }) {
  const [msg, setMsg] = useState('')
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setMsg('Copied') } catch { setMsg('Copy failed. Select the text instead.') }
    setTimeout(() => setMsg(''), 2500)
  }
  return (
    <div className="codeblock">
      <pre className="mono"><code>{code}</code></pre>
      <div className="codeblock__bar">
        <Button size="sm" onClick={copy}>{msg === 'Copied' ? 'Copied' : 'Copy'}</Button>
        <span role="status" aria-live="polite" className="sr-only">{msg}</span>
      </div>
    </div>
  )
}

/** /products/:code (ARM-20, SPEC §9): header, explorer, datasheet, pinout, MQTT snippet, downloads, related, RFQ. */
export function ProductDetail() {
  const p = getProduct(useParams().code)
  useMeta(p ? `${p.code} ${p.name}` : 'Board not found', p ? `${p.code} ${p.name}: ${p.tagline} ${p.power}. ${p.interfaces.join(', ')}.` : undefined)
  if (!p) return <NotFound what="No board with that code." search />

  const hero = isHero(p.code) ? p.code : null
  const related = products
    .filter((x) => x.code !== p.code && x.line === p.line)
    .sort((a, b) => b.interfaces.filter((i) => p.interfaces.includes(i)).length - a.interfaces.filter((i) => p.interfaces.includes(i)).length)
    .slice(0, 3)
  const s = snippet(p)

  return (
    <main id="main" className="wrap pdp">
      <nav className="crumbs mono text-sm" aria-label="Breadcrumb"><Link to="/products">Catalogue</Link> / {p.code}</nav>
      <header className="pdp__head">
        <div>
          <p className="eyebrow">{p.line === 'IA' ? 'Industrial Automation' : 'Building Automation'} · {p.code}</p>
          <h1 className="mt-2">{p.code} · {p.name}</h1>
          <p className="mt-4 lede">{p.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {keyChips(p).map((c) => <Chip key={c} tone="copper">{c}</Chip>)}
            {p.tasmota ? <Chip tone="signal">Tasmota compatible (per catalogue)</Chip> : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button {...rfqLinkProps({ product: p.code, need: 'off-the-shelf' })} variant="primary">Request quote</Button>
            <Button {...rfqLinkProps({ product: p.code, need: 'sample' })}>Request sample</Button>
            <Button {...rfqLinkProps({ product: p.code, need: 'customised' })} variant="ghost">Ask about customisation</Button>
          </div>
        </div>
        {!hero ? <div className="pdp__mini"><MiniRender code={p.code} decorative={false} /><p className="mono text-xs dim mt-2">{p.code} · icon render</p></div> : null}
      </header>

      {hero ? (
        <section className="pdp__sec" aria-labelledby="exp-h">
          <h2 id="exp-h" className="t-h3">Explore the board</h2>
          <div className="mt-4"><BoardExplorer codes={[hero]} showCtas={false} headingLevel="h3" /></div>
        </section>
      ) : null}

      <section className="pdp__sec pdp__cols" aria-labelledby="ds-h">
        <div>
          <h2 id="ds-h" className="t-h3">Datasheet</h2>
          <SpecTable specs={p.specs} className="mt-4" />
        </div>
        <div>
          <h2 className="t-h3">Connections</h2>
          {hero ? (
            <figure className="mt-4">
              <BoardRender code={hero} lens="xray" />
              <figcaption className="mono text-xs dim mt-2">{p.code === 'IA015' ? 'Terminals: VDC_IN, DI1–DI3, DO1–DO3, AI, CANH / CANL, A / B. Programming via the ESP32.' : `${p.code} · X-ray lens`}</figcaption>
            </figure>
          ) : <p className="mt-4 mono text-sm">{ioText(p)} · {p.power} · {p.mounting}</p>}

          <h2 className="t-h3 mt-8">Integration</h2>
          <p className="mt-2 text-sm dim">Example MQTT snippet <SimTag variant="example" /></p>
          <CopyBlock code={s.code} />
          <p className="mt-2 text-xs dim">{s.note}</p>

          <h2 className="t-h3 mt-8">Downloads</h2>
          <p className="mt-2"><a className="linkish" href={p.datasheetUrl} target="_blank" rel="noopener">{p.code} {p.datasheetKind === 'datasheet' ? 'design description' : p.datasheetKind} (GitHub PDF) ↗</a> <span className="text-xs dim">Opens in a new tab</span></p>
        </div>
      </section>

      <section className="pdp__sec" aria-labelledby="rel-h">
        <h2 id="rel-h" className="t-h3">Related boards</h2>
        <ul className="bins bins--page mt-4">
          {related.map((r) => (
            <li key={r.code}><Link to={`/products/${r.slug}`} className="bin">
              <MiniRender code={r.code} className="bin__mini" />
              <span className="bin__code mono">{r.code}</span><span className="bin__name">{r.name}</span>
            </Link></li>
          ))}
        </ul>
      </section>

      <section className="pdp__rfq">
        <h2 className="t-h2">Need {p.code}? Tell us the quantity{p.code === 'IA015' ? ' and the PLC' : ''}.</h2>
        <Button {...rfqLinkProps({ product: p.code, need: 'off-the-shelf' })} variant="primary">Request quote</Button>
      </section>
    </main>
  )
}

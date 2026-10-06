import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  INTERFACES, NEED, QTY, STEPS, WHO, SALES_EMAIL, clearDraft, mailtoHref, productOptions, setStep, submit, summary,
  summaryText, update, useRfq, validate, type Draft, type Errors,
} from '../../lib/rfq'
import { emitPacket } from '../layout/SignalTrace'
import { Button } from '../ui/Button'
import { Chip } from '../ui/Chip'

/** MO-16: five vias along a copper trace; passed vias light up. Static step counter under reduced motion. */
function ViaProgress({ step }: { step: number }) {
  const at = Math.min(step, STEPS.length)
  return (
    <div className="vias" aria-hidden="true">
      <span className="vias__track"><span className="vias__fill" style={{ transform: `scaleX(${at / (STEPS.length - 1 || 1)})` }} /></span>
      {STEPS.map((s, i) => (
        <span key={s} className="vias__via" data-lit={i <= at} style={{ left: `${(i / (STEPS.length - 1)) * 100}%` }}>
          <span className="vias__label">{s}</span>
        </span>
      ))}
    </div>
  )
}

function Tiles<T extends string>({ name, options, value, onChange, error }: {
  name: string; options: readonly { id: T; label: string }[]; value: string; onChange: (v: T) => void; error?: string
}) {
  const errId = useId()
  return (
    <div role="radiogroup" aria-label={name} aria-describedby={error ? errId : undefined} aria-invalid={!!error}>
      <div className="tiles">
        {options.map((o) => (
          <button
            key={o.id} type="button" role="radio" aria-checked={value === o.id} className="tile"
            onClick={() => onChange(o.id)}
          >
            <span className="tile__led" aria-hidden="true" />
            {o.label}
          </button>
        ))}
      </div>
      {error ? <p id={errId} className="field__err" role="alert">{error}</p> : null}
    </div>
  )
}

function Field({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: (id: string, describedBy?: string) => ReactNode }) {
  const id = useId()
  const errId = `${id}-err`
  return (
    <div className="field">
      <label htmlFor={id}>{label}{hint ? <span className="dim"> · {hint}</span> : null}</label>
      {children(id, error ? errId : undefined)}
      {error ? <p id={errId} className="field__err" role="alert">{error}</p> : null}
    </div>
  )
}

function ProductPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return productOptions.filter((p) => !s || p.code.toLowerCase().includes(s) || p.name.toLowerCase().includes(s))
  }, [q])
  const toggle = (c: string) => onChange(value.includes(c) ? value.filter((x) => x !== c) : [...value, c])
  return (
    <div className="picker">
      <Field label="Product codes" hint="search and pick any">
        {(id) => <input id={id} type="search" className="input" placeholder="IA015, relay, LoRa…" value={q} onChange={(e) => setQ(e.target.value)} />}
      </Field>
      <div className="picker__selected" aria-live="polite">
        {value.length ? value.map((c) => <Chip key={c} tone="copper" onClick={() => toggle(c)} pressed>{c} ✕</Chip>) : <span className="dim">No product selected yet. You can add codes later.</span>}
      </div>
      <ul className="picker__list" aria-label="Catalogue">
        {list.map((p) => (
          <li key={p.code}>
            <label className="check">
              <input type="checkbox" checked={value.includes(p.code)} onChange={() => toggle(p.code)} />
              <span className="mono">{p.code}</span> <span>{p.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Step({ d, errors }: { d: Draft; errors: Errors }) {
  const dev = d.who === 'developer'
  switch (d.step) {
    case 0:
      return (
        <>
          <h3 className="wiz__h" tabIndex={-1}>Who are you?</h3>
          <Tiles name="Who are you?" options={WHO} value={d.who} onChange={(who) => update({ who })} error={errors.who} />
          <p className="wiz__micro">Changes the questions that follow.</p>
        </>
      )
    case 1:
      return (
        <>
          <h3 className="wiz__h" tabIndex={-1}>What do you need?</h3>
          <Tiles name="What do you need?" options={NEED} value={d.need} onChange={(need) => update({ need })} error={errors.need} />
          <label className="check mt-4"><input type="checkbox" checked={d.sample} onChange={(e) => update({ sample: e.target.checked })} /> I'd like a sample first</label>
        </>
      )
    case 2:
      return (
        <>
          <h3 className="wiz__h" tabIndex={-1}>{dev ? 'What are you building?' : 'What must it connect?'}</h3>
          <ProductPicker value={d.products} onChange={(products) => update({ products })} />
          <fieldset className="field">
            <legend>Interfaces</legend>
            <div className="flex flex-wrap gap-2">
              {INTERFACES.map((i) => (
                <Chip key={i} pressed={d.interfaces.includes(i)} onClick={() => update({ interfaces: d.interfaces.includes(i) ? d.interfaces.filter((x) => x !== i) : [...d.interfaces, i] })}>{i}</Chip>
              ))}
            </div>
          </fieldset>
          {dev ? (
            <Field label="Notes">{(id) => <textarea id={id} className="input" rows={3} value={d.env} onChange={(e) => update({ env: e.target.value })} />}</Field>
          ) : (
            <>
              <fieldset className="field">
                <legend>I/O counts</legend>
                <div className="grid grid-cols-3 gap-3">
                  {(['di', 'do', 'ai'] as const).map((k) => (
                    <label key={k} className="mono text-sm">{k.toUpperCase()}
                      <input className="input mt-1" inputMode="numeric" value={d.io[k]} onChange={(e) => update({ io: { ...d.io, [k]: e.target.value.replace(/\D/g, '').slice(0, 4) } })} />
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="field">
                <legend>Power</legend>
                <div className="flex flex-wrap gap-2">
                  {(['24 V DC', '230 V AC'] as const).map((p) => <Chip key={p} pressed={d.power === p} onClick={() => update({ power: d.power === p ? '' : p })}>{p}</Chip>)}
                </div>
              </fieldset>
              <Field label="Environment notes" hint="optional">{(id) => <textarea id={id} className="input" rows={2} placeholder="Panel temperature, dust, mounting…" value={d.env} onChange={(e) => update({ env: e.target.value })} />}</Field>
            </>
          )}
        </>
      )
    case 3:
      return (
        <>
          <h3 className="wiz__h" tabIndex={-1}>How many, and by when?</h3>
          <Tiles name="Quantity" options={QTY.map((q) => ({ id: q, label: q }))} value={d.qty} onChange={(qty) => update({ qty })} error={errors.qty} />
          <Field label="Timeline" hint="optional">{(id) => <input id={id} className="input" placeholder="e.g. pilot in 6 weeks" value={d.timeline} onChange={(e) => update({ timeline: e.target.value })} />}</Field>
          <fieldset className="field">
            <legend>Prototype needed?</legend>
            <div className="flex gap-2">
              {(['Yes', 'No'] as const).map((p) => <Chip key={p} pressed={d.prototype === p} onClick={() => update({ prototype: p })}>{p}</Chip>)}
            </div>
          </fieldset>
        </>
      )
    case 4:
      return (
        <>
          <h3 className="wiz__h" tabIndex={-1}>Where do we reply?</h3>
          <div className="grid gap-x-4 md:grid-cols-2">
            <Field label="Name" error={errors.name}>{(id, db) => <input id={id} className="input" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={db} value={d.name} onChange={(e) => update({ name: e.target.value })} />}</Field>
            <Field label="Company" hint="optional">{(id) => <input id={id} className="input" autoComplete="organization" value={d.company} onChange={(e) => update({ company: e.target.value })} />}</Field>
            <Field label="Email" error={errors.email}>{(id, db) => <input id={id} type="email" className="input" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={db} value={d.email} onChange={(e) => update({ email: e.target.value })} />}</Field>
            <Field label="Phone" hint="optional" error={errors.phone}>{(id, db) => <input id={id} type="tel" className="input" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={db} value={d.phone} onChange={(e) => update({ phone: e.target.value })} />}</Field>
            <Field label="City" hint="optional">{(id) => <input id={id} className="input" autoComplete="address-level2" value={d.city} onChange={(e) => update({ city: e.target.value })} />}</Field>
          </div>
          <Field label="Message" hint="optional">{(id) => <textarea id={id} className="input" rows={3} value={d.message} onChange={(e) => update({ message: e.target.value })} />}</Field>
        </>
      )
    case 5:
      return (
        <>
          <h3 className="wiz__h" tabIndex={-1}>Check and send.</h3>
          <dl className="review">
            {summary(d).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="flex flex-wrap gap-2">
            {STEPS.map((s, i) => <Button key={s} size="sm" variant="ghost" onClick={() => setStep(i)}>Edit {s.toLowerCase()}</Button>)}
          </div>
          <p className="wiz__micro">This is a front-end demo. Nothing leaves your browser.</p>
        </>
      )
    default:
      return <Success d={d} />
  }
}

function Success({ d }: { d: Draft }) {
  const download = () => {
    const url = URL.createObjectURL(new Blob([summaryText(d)], { type: 'text/plain' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: `${d.ref}.txt` })
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <div className="success" role="status">
      <p className="eyebrow">Signal received</p>
      <h3 className="wiz__h" tabIndex={-1}>Request noted.</h3>
      <p>Reference <strong className="mono">{d.ref}</strong>. Email it to {SALES_EMAIL} to reach the team.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={mailtoHref(d)} variant="primary">Open email</Button>
        <Button onClick={download}>Download summary</Button>
        <Button variant="ghost" onClick={clearDraft}>New request</Button>
      </div>
    </div>
  )
}

/** The RFQ wizard (SPEC §8). Same component on /rfq and in the overlay. */
export function Wizard({ autoFocus = false }: { autoFocus?: boolean }) {
  const { draft: d } = useRfq()
  const [errors, setErrors] = useState<Errors>({})
  const body = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  // Move focus to the step heading on step change so screen readers and keyboards follow
  useEffect(() => {
    if (first.current && !autoFocus) { first.current = false; return }
    first.current = false
    body.current?.querySelector<HTMLElement>('.wiz__h')?.focus()
  }, [d.step, autoFocus])

  const next = () => {
    const e = validate(d, d.step)
    setErrors(e)
    if (Object.keys(e).length) {
      body.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    emitPacket('copper')
    setStep(d.step + 1)
  }
  const back = () => { setErrors({}); setStep(Math.max(0, d.step - 1)) }
  const inSteps = d.step < 5

  return (
    <div className="wiz">
      {d.step < 6 ? (
        <>
          <ViaProgress step={d.step} />
          <p className="eyebrow mt-6">{inSteps ? `Step ${d.step + 1} of 5 · ${STEPS[d.step]}` : 'Review'}</p>
          {d.prefilled && d.step < 2 ? <p className="wiz__micro">Pre-filled from the page you came from.</p> : null}
        </>
      ) : null}
      <div ref={body} className="wiz__body" onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT' && inSteps) { e.preventDefault(); next() } }}>
        <Step d={d} errors={errors} />
      </div>
      {d.step < 6 ? (
        <div className="wiz__nav">
          {d.step > 0 ? <Button onClick={back}>Back</Button> : <span />}
          <span className="wiz__draft dim">Draft saved on this device. <button type="button" className="linkish" onClick={() => { clearDraft(); setErrors({}) }}>Clear draft</button></span>
          {inSteps ? <Button variant="primary" onClick={next}>{d.step === 4 ? 'Review' : 'Next'}</Button> : <Button variant="primary" onClick={submit}>Send</Button>}
        </div>
      ) : null}
    </div>
  )
}

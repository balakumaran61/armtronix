import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { applyPrefill, parsePrefill } from '../lib/rfq'
import { Wizard } from '../components/rfq/Wizard'

/** /rfq: the wizard full-page. Reads ?who, ?need, ?product and ?intent for pre-fill (SPEC §8). */
export function Rfq() {
  const [q] = useSearchParams()
  useEffect(() => {
    applyPrefill(parsePrefill(q))
    document.title = 'Request a quote · ARMtronix'
    return () => { document.title = 'ARMtronix · Make Every Machine Talk' }
  }, [q])
  return (
    <main id="main" className="wrap rfq-page">
      <header className="page-head">
        <p className="eyebrow">Request a quote</p>
        <h1>Tell us what to connect.</h1>
        <p className="mt-4 dim">Five short steps. No account. Or write to <a href="mailto:sales@armtronix.in">sales@armtronix.in</a>.</p>
      </header>
      <div className="rfq-page__card"><Wizard /></div>
    </main>
  )
}

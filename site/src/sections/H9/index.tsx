import { WHO, openRfq } from '../../lib/rfq'

const CATALOGUE = 'https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/ARMtronix_IA_ProdcutCatalogue.pdf'

/** H9 RFQ entry (ARM-21): step 1 inline; picking a tile continues in the overlay at step 2. */
export function H9() {
  return (
    <section className="sec sec--rfq" id="h9" data-section="H9" aria-labelledby="h9-title">
      <div className="wrap rfq-entry">
        <div>
          <p className="eyebrow">Request a quote</p>
          <h2 id="h9-title">Tell us what to connect.</h2>
          <p className="lede">Five short steps. No account.</p>
          <p className="mono eyebrow mt-6">Step 1 of 5 · I am an…</p>
          <div className="tiles mt-3">
            {WHO.map((w) => (
              <button key={w.id} type="button" className="tile" onClick={() => openRfq({ who: w.id })}>
                <span className="tile__led" aria-hidden="true" />{w.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs dim">Nothing is sent until you review it.</p>
        </div>
        <aside className="rfq-entry__side">
          <h3 className="eyebrow">Direct</h3>
          <p className="mt-3"><a href="mailto:sales@armtronix.in">sales@armtronix.in</a></p>
          <p className="mt-1"><a href="tel:+919449567368">+91 94495 67368</a></p>
          <p className="mt-6"><a className="linkish" href={CATALOGUE} target="_blank" rel="noopener">Download the catalogue (PDF) ↗</a></p>
        </aside>
      </div>
    </section>
  )
}

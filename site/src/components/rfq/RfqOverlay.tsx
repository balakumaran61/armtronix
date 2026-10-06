import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { closeRfq, useRfq } from '../../lib/rfq'
import { Wizard } from './Wizard'

/** The RFQ overlay: a native modal <dialog> (focus trap, Esc, aria-modal) holding the same Wizard as /rfq. */
export function RfqOverlay() {
  const { open } = useRfq()
  const ref = useRef<HTMLDialogElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const dlg = ref.current!
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  // Leaving the page closes it; /rfq already shows the wizard full-page
  useEffect(() => { if (pathname === '/rfq') closeRfq() }, [pathname])

  return (
    <dialog ref={ref} className="rfq-dlg" aria-labelledby="rfq-dlg-title" onClose={closeRfq} onCancel={closeRfq}
      onClick={(e) => { if (e.target === e.currentTarget) closeRfq() }}>
      {open ? (
        <div className="rfq-dlg__panel">
          <header className="rfq-dlg__head">
            <h2 id="rfq-dlg-title" className="t-h3">Request a quote</h2>
            <button type="button" className="btn btn--ghost btn--sm" onClick={closeRfq} aria-label="Close request a quote">Close ✕</button>
          </header>
          <Wizard autoFocus />
        </div>
      ) : null}
    </dialog>
  )
}

import { Button } from '../ui/Button'
import { rfqLinkProps } from '../../lib/rfq'

export const PHONE = { display: '+91 94495 67368', tel: 'tel:+919449567368' }

/** Sticky bottom bar at ≤ 767 (BR-08): the primary CTA is always one tap away. */
export function MobileBar() {
  return (
    <div className="mbar" role="region" aria-label="Quick actions">
      <Button {...rfqLinkProps()} variant="primary">Request quote</Button>
      <Button href={PHONE.tel} aria-label={`Call ARMtronix sales, ${PHONE.display}`}>Call</Button>
    </div>
  )
}

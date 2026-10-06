import type { ReactNode } from 'react'
import type { Spec } from '../../data/products'

/** PRODUCTS.json values usually carry their unit already ("24 V DC @ 1 A", unit "V DC / A"); print it only when missing. */
const unitMissing = (s: Spec) => s.unit !== '—' && s.unit.split('/').some((u) => !s.value.includes(u.trim()))

interface Props { specs: Spec[]; caption?: ReactNode; className?: string }

/** Engineering datasheet table (BR-10: never a SaaS tick table). Stacks to label/value rows at ≤ 767. */
export function SpecTable({ specs, caption, className = '' }: Props) {
  return (
    <table className={`spec ${className}`.trim()}>
      {caption ? <caption>{caption}</caption> : null}
      <tbody>
        {specs.map((s) => (
          <tr key={s.label}>
            <th scope="row">{s.label}</th>
            <td>
              {s.value}
              {unitMissing(s) ? <span className="unit">{s.unit}</span> : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

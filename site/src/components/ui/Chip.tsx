import type { ReactNode } from 'react'

interface Props { children: ReactNode; tone?: 'default' | 'copper' | 'signal'; pressed?: boolean; onClick?: () => void; className?: string }

/** Mono label chip (interfaces, specs). With onClick it becomes a toggle button (filters, RFQ interfaces). */
export function Chip({ children, tone = 'default', pressed, onClick, className = '' }: Props) {
  const cls = `chip${tone === 'default' ? '' : ` chip--${tone}`} ${className}`.trim()
  if (onClick) return <button type="button" className={cls} aria-pressed={pressed} onClick={onClick}>{children}</button>
  return <span className={cls}>{children}</span>
}

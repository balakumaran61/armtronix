import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'
interface Common { variant?: Variant; size?: 'md' | 'sm'; className?: string; children: ReactNode }
type AsButton = Common & Omit<ComponentPropsWithoutRef<'button'>, keyof Common> & { to?: never; href?: never }
type AsLink = Common & Omit<ComponentPropsWithoutRef<typeof Link>, keyof Common> & { to: string; href?: never }
type AsAnchor = Common & Omit<ComponentPropsWithoutRef<'a'>, keyof Common> & { href: string; to?: never }

/** MO-11 tactile button. `to` renders a router Link, `href` an anchor, otherwise a <button>. */
export function Button(props: AsButton | AsLink | AsAnchor) {
  const { variant = 'secondary', size = 'md', className = '', ...rest } = props
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''} ${className}`.trim()
  if ('to' in rest && rest.to !== undefined) return <Link {...(rest as AsLink)} className={cls} />
  if ('href' in rest && rest.href !== undefined) return <a {...(rest as AsAnchor)} className={cls} />
  return <button type="button" {...(rest as AsButton)} className={cls} />
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Brand } from './Brand'
import { ThemeSwitch } from './ThemeSwitch'
import { StatusStrip } from './StatusStrip'
import { Button } from '../ui/Button'
import { rfqLinkProps } from '../../lib/rfq'

export const NAV_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/#h5', label: 'Solutions' },
  { to: '/#h7', label: 'Engineering' },
  { to: '/#h8', label: 'Proof' },
] as const

/** Desktop: wordmark · links · status strip · theme switch · Request a quote. Below 1024: a menu panel. */
export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Close the menu on navigation (render-time reset avoids a cascading effect)
  const [lastLoc, setLastLoc] = useState(pathname + hash)
  if (lastLoc !== pathname + hash) { setLastLoc(pathname + hash); setOpen(false) }

  return (
    <>
      <header className="nav">
        <nav className="wrap nav__inner" aria-label="Main">
          <Brand />
          <ul className="nav__links">
            {NAV_LINKS.map((l) => (
              // Only real routes get an active state; the /#hash links all live on "/"
              <li key={l.to}>{l.to.includes('#') ? <Link to={l.to}>{l.label}</Link> : <NavLink to={l.to}>{l.label}</NavLink>}</li>
            ))}
          </ul>
          <div className="nav__end">
            <span className="nav__status-wrap"><StatusStrip /></span>
            <ThemeSwitch showLabel={false} />
            <Button {...rfqLinkProps()} variant="primary" size="sm" className="nav__cta">Request a quote</Button>
            <Button
              variant="ghost" size="sm" className="nav__menu-btn"
              aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}
            >
              {open ? 'Close' : 'Menu'}
            </Button>
          </div>
        </nav>
      </header>
      {open ? (
        <div id="site-menu" className="menu">
          <div className="wrap">
            <ul>
              {NAV_LINKS.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              <li><Link to="/rfq">Request a quote</Link></li>
            </ul>
            <div className="menu__foot">
              <StatusStrip />
              <ThemeSwitch />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

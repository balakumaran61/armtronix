import { Link } from 'react-router-dom'

/** Wordmark: a QFP chip with copper pins and a signal LED, "ARMtronix", "Hubballi · India". */
export function Brand() {
  return (
    <Link to="/" className="brand">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="8" y="8" width="16" height="16" rx="2" fill="var(--surface-2)" stroke="var(--copper)" strokeWidth="1.5" />
        <path d="M3 12h5M3 16h5M3 20h5M24 12h5M24 16h5M24 20h5M12 3v5M16 3v5M20 3v5M12 24v5M16 24v5M20 24v5" stroke="var(--copper)" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.5" fill="var(--signal)" />
      </svg>
      <span>
        <span className="brand__word">ARMtronix</span>
        <span className="brand__sub">Hubballi · India</span>
      </span>
    </Link>
  )
}

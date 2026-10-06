import { Link } from 'react-router-dom'
import { Brand } from './Brand'
import { ThemeSwitch } from './ThemeSwitch'
import { SimTag } from '../ui/SimTag'

/** H10 footer (copy: COPY.md · H10). The one source note below covers every single-source fact on the site. */
export function Footer() {
  return (
    <footer className="footer" id="h10">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Brand />
            <p className="mt-4">Engineered in Hubballi, India.</p>
            <address className="mt-3 not-italic dim">
              CTS No. 2650, Ankush Arcade, 2nd Floor, Station Road, Hubballi, Karnataka 580020
            </address>
            <p className="mt-2 dim">ARMtronix Technologies LLP</p>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href="mailto:sales@armtronix.in">sales@armtronix.in</a></li>
              <li><a href="mailto:contactus@armtronix.in">contactus@armtronix.in</a></li>
              <li><a href="tel:+919449567368">+91 94495 67368</a></li>
              <li><a href="tel:+918364265368">+91 836 4265368</a></li>
            </ul>
          </div>
          <div>
            <h2>Site</h2>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/#h7">Engineering</Link></li>
              <li><Link to="/#h8">Proof</Link></li>
              <li><a href="https://github.com/armtronix" rel="noopener" target="_blank">GitHub ↗</a></li>
              <li><Link to="/credits">Credits</Link></li>
            </ul>
          </div>
        </div>
        <p className="footer__note">Contact details, specs and figures come from ARMtronix's published catalogues, datasheets and public pages (read Oct 2026). Availability, lead times and current contacts: please confirm with ARMtronix.</p>
        <div className="footer__base">
          <span>uptime 99.98 % · decorative <SimTag /></span>
          <span>Photos and renders: see <Link to="/credits">credits</Link>.</span>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}

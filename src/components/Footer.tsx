import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../config/contact'
import { COMPANY_LOGO, COMPANY_LOGO_ALT } from '../config/brandAssets'

export function Footer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons()
    }
    const sf = document.querySelector('.sf')
    if (!sf) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sf.classList.add('in')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(sf)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="sf">
      <svg className="sf-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path className="w1" d="M0 40 C240 90 480 0 720 40 S1200 80 1440 30 V80 H0Z" />
        <path className="w2" d="M0 55 C260 10 500 90 760 50 S1220 20 1440 55 V80 H0Z" />
      </svg>

      <div className="sf-cta relative overflow-hidden" data-surface="dark">
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.45) 1px, transparent 0), radial-gradient(circle at 85% 30%, rgba(255,90,82,.18), transparent 22%)',backgroundSize:'20px 20px, auto'}} />
        <div className="sf-wrap sf-cta-in">
          <div>
            <h3>Need fire detection, fire protection or utility products for your facility?</h3>
            <p>Talk to our engineers for a site assessment and quotation.</p>
          </div>
          <div className="sf-btns">
            <Link to="/contact" className="sf-btn">Request a Quote</Link>
            <a className="sf-btn sf-wa" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${CONTACT.company}`}>WhatsApp</a>
          </div>
        </div>
      </div>

      <svg className="sf-pipe" viewBox="0 0 1200 16" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="8" x2="1200" y2="8" stroke="#014EB6" strokeWidth="8" />
        <line className="flow" x1="0" y1="8" x2="1200" y2="8" stroke="#0868D8" strokeWidth="3" strokeDasharray="14 18" />
      </svg>

      <div className="sf-wrap sf-grid">
        <div className="sf-about sf-r">
          <div className="sf-brand">
            <span className="sf-shield" style={{background:'#fff',padding:'4px'}}><img src={COMPANY_LOGO} alt={COMPANY_LOGO_ALT} style={{width:'40px',height:'40px',objectFit:'contain',display:'block'}} /></span>
            <span className="sf-name">HEAT SHIELD ENGINEERING<small>Fire Detection | Fire Protection | Utility Products</small></span>
          </div>
          <p>Fire detection, fire protection, electrical safety and industrial engineering across Bangladesh.</p>
        </div>

        <div className="sf-r" style={{ '--d': '.1s' } as React.CSSProperties}>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="sf-r" style={{ '--d': '.2s' } as React.CSSProperties}>
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Fire Protection Design</Link></li>
            <li><Link to="/services">Fire Detection &amp; Alarm</Link></li>
            <li><Link to="/services">Fire Suppression Systems</Link></li>
            <li><Link to="/services">Fire Pump &amp; Hydrant</Link></li>
            <li><Link to="/services">Electrical &amp; Lightning Safety</Link></li>
            <li><Link to="/services">Maintenance (AMC)</Link></li>
          </ul>
        </div>

        <div className="sf-r" style={{ '--d': '.3s' } as React.CSSProperties}>
          <h4>Contact</h4>
          <ul className="sf-contact">
            {CONTACT.phones.map((p) => (
              <li key={p.tel}><i data-lucide="phone" /><a href={`tel:${p.tel}`} style={{whiteSpace:'nowrap'}} aria-label={`Call ${CONTACT.company} ${p.label} ${p.display}`}><span style={{fontWeight:600}}>{p.label}:</span> {p.display}</a></li>
            ))}
            <li><i data-lucide="mail" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><i data-lucide="map-pin" /><a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">{CONTACT.addressLine}</a></li>
          </ul>
        </div>
      </div>

      <div className="sf-bottom">
        <div className="sf-wrap sf-bottom-in">
          <span>© 2026 HEAT SHIELD ENGINEERING. All rights reserved.</span>
          <span>Sales | Installation | Maintenance</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

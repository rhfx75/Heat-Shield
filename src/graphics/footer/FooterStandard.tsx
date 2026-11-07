import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT } from '../../config/contact'
import { company, isOpenNow, mailHref, whatsappLink } from '../../data/company'
import { services } from '../../data/services'
import { FacebookIcon, LinkedInIcon, MailIcon, WhatsAppIcon, YouTubeIcon } from '../icons/SocialIcons'
import { COMPANY_LOGO, COMPANY_LOGO_ALT } from '../../config/brandAssets'
import './footer.css'

const COMPANY_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/brands', label: 'Brands' },
  { to: '/contact', label: 'Contact' },
]

const SERVICE_LINKS = [
  services.find((s) => s.id === 'fire-protection-system-design'),
  services.find((s) => s.id === 'fire-detection-alarm-installation'),
  services.find((s) => s.id === 'fire-suppression-extinguishing'),
  services.find((s) => s.id === 'fire-pump-hydrant'),
  services.find((s) => s.id === 'electrical-lightning-safety'),
  services.find((s) => s.id === 'inspection-testing-commissioning') ?? services.find((s) => s.id.includes('maintenance')),
].filter(Boolean).map((s) => ({ to: `/services/${s!.id}`, label: s!.title }))

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="hse-ft__heading">
      {children}
      <span className="hse-ft__underline" aria-hidden="true" />
    </h4>
  )
}

function LinkList({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  const [open, setOpen] = useState(true)
  return (
    <nav className="hse-ft__col" aria-label={title}>
      <button type="button" className="hse-ft__toggle hse-ft__heading" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{title}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="hidden sm:block"><FooterHeading>{title}</FooterHeading></div>
      <ul className="hse-ft__links" data-collapsed={open ? 'false' : 'true'}>
        {items.map((item) => (
          <li key={item.to + item.label}>
            <Link to={item.to} className="hse-ft__link"><span>{item.label}</span></Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MapModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const root = document.querySelector<HTMLElement>('[data-hse-ft-modal="true"]')
        const focusables = root?.querySelectorAll<HTMLElement>('button,[href],iframe') ?? []
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    window.setTimeout(() => document.querySelector<HTMLElement>('[data-hse-ft-close="true"]')?.focus(), 0)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [onClose])

  return createPortal(
    <div className="hse-ft-modal" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="hse-ft-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="hse-ft-map-title" data-hse-ft-modal="true">
        <div className="hse-ft-modal__head">
          <h3 id="hse-ft-map-title">Heat Shield Engineering location</h3>
          <button type="button" className="hse-ft-modal__close" data-hse-ft-close="true" onClick={onClose} aria-label="Close map">Close</button>
        </div>
        <div className="hse-ft-modal__body">
          <iframe title={`${company.name} map`} src={company.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="hse-ft-modal__foot">
          <a className="hse-ft-modal__dir" href={company.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function FooterStandard() {
  const [mapOpen, setMapOpen] = useState(false)
  const [open, setOpen] = useState(() => isOpenNow())
  const year = new Date().getFullYear()
  useEffect(() => { const id = window.setInterval(() => setOpen(isOpenNow()), 60_000); return () => window.clearInterval(id) }, [])

  const socials = [
    company.socials.facebook ? { key: 'facebook', href: company.socials.facebook, label: 'Facebook', Icon: FacebookIcon, external: true } : null,
    company.socials.linkedin ? { key: 'linkedin', href: company.socials.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true } : null,
    company.socials.youtube ? { key: 'youtube', href: company.socials.youtube, label: 'YouTube', Icon: YouTubeIcon, external: true } : null,
    { key: 'whatsapp', href: whatsappLink(`Hello ${company.name}, I would like to discuss fire safety solutions.`), label: 'WhatsApp', Icon: WhatsAppIcon, external: true },
    company.emails[0] ? { key: 'mail', href: mailHref(company.emails[0].address), label: 'Email', Icon: MailIcon, external: false } : null,
  ].filter(Boolean) as { key: string; href: string; label: string; Icon: typeof MailIcon; external: boolean }[]

  return (
    <>
      <section className="hse-ft-cta" aria-labelledby="hse-ft-cta-title" data-surface="dark">
        <div className="hse-ft-cta__inner">
          <div className="hse-ft-cta__copy">
            <h3 id="hse-ft-cta-title">Need fire detection, fire protection or utility products for your facility?</h3>
            <p>Talk to our engineers for a site assessment and quotation.</p>
          </div>
          <div className="hse-ft-cta__actions">
            <Link to="/contact" className="hse-ft-btn hse-ft-btn--quote">Request a quote</Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hse-ft-btn hse-ft-btn--wa" aria-label={`WhatsApp ${CONTACT.company}`}>WhatsApp</a>
            {CONTACT.phones[0] ? <a href={`tel:${CONTACT.phones[0].tel}`} className="hse-ft-cta__phone" style={{whiteSpace:'nowrap'}} aria-label={`Call ${CONTACT.company} ${CONTACT.phones[0].display}`}>{CONTACT.phones[0].display}</a> : null}
          </div>
        </div>
      </section>

      <footer className="hse-ft" data-surface="dark">
        <div className="hse-ft__wrap">
          <div className="hse-ft__grid">
            <div className="hse-ft__col hse-ft__brand">
              <img src={COMPANY_LOGO} alt={COMPANY_LOGO_ALT} width="220" height="56" loading="lazy" />
              <p className="hse-ft__desc">Fire detection, fire protection, electrical safety and industrial engineering across Bangladesh.</p>
              <div className="hse-ft__social" aria-label="Social links">
                {socials.map(({ key, href, label, Icon, external }) => (
                  <a key={key} href={href} data-net={key} aria-label={label} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}><Icon width={18} height={18} /></a>
                ))}
              </div>
            </div>

            <LinkList title="Company" items={COMPANY_LINKS} />
            <LinkList title="Services" items={SERVICE_LINKS} />

            <section className="hse-ft__col" aria-label="Contact">
              <FooterHeading>Contact</FooterHeading>
              <ul className="hse-ft__contact">
                {CONTACT.phones.map((p) => (
                  <li key={p.tel}><Phone className="hse-ft__icon" size={16} aria-hidden="true" /><a href={`tel:${p.tel}`} style={{whiteSpace:'nowrap'}} aria-label={`Call ${CONTACT.company} ${p.label} ${p.display}`}><span style={{fontWeight:600}}>{p.label}:</span> {p.display}</a></li>
                ))}
                <li><Mail className="hse-ft__icon" size={16} aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="hse-ft__contact-text"><span>{CONTACT.email.split('@')[0]}@</span><wbr /><span>{CONTACT.email.split('@')[1] || ''}</span></a></li>
                <li><MapPin className="hse-ft__icon" size={16} aria-hidden="true" /><a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hse-ft__contact-text">{CONTACT.addressLine}</a></li>
                <li>
                  <Clock className="hse-ft__icon" size={16} aria-hidden="true" />
                  <div>
                    <div><span>Sat-Thu: 09:00 AM - 6:00 PM</span></div>
                    <div className={`hse-ft__status${open ? '' : ' is-closed'}`}><span className="hse-ft__status-dot" aria-hidden="true" /><span className="hse-ft__status-text" data-open="Open now" data-closed="Closed" aria-label={open ? 'Open now' : 'Closed'} /></div>
                    <button type="button" className="hse-ft__maplink" onClick={() => setMapOpen(true)}>View on map</button>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <div className="hse-ft__bottom">
            <span>© {year} {company.name}. All rights reserved.</span>
            <span className="hse-ft__taglines"><span>{company.taglines[0]}</span><span aria-hidden="true">|</span><span>{company.taglines[1]}</span></span>
            <button type="button" className="hse-ft__top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Back to top</button>
          </div>
        </div>
      </footer>
      {mapOpen ? <MapModal onClose={() => setMapOpen(false)} /> : null}
    </>
  )
}

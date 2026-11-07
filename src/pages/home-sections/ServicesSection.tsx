import { Link } from 'react-router-dom'
import { SectionHeader } from './SectionHeader'
import { useReveal } from './useReveal'

const items = [
  { title: 'Sales', to: '/services', text: 'Panels, detectors, pumps and suppression systems from established brands, matched to your building.', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M6 7l1.5 12h9L18 7"/><path d="M9 11h6"/></svg> },
  { title: 'Installation', to: '/services', text: 'Fitting and commissioning by trained technicians, tested before handover.', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3-8 8H6v-3z"/><path d="M16 5l3 3M4 20h16"/></svg> },
  { title: 'Maintenance', to: '/services', text: 'Scheduled inspection and servicing to keep systems ready and compliant.', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3"/><circle cx="12" cy="12" r="3.5"/></svg> },
  { title: '24/7 support', to: '/services', text: 'A phone and WhatsApp line for faults and urgent questions.', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5a3 3 0 0 1 3-3h1l2 5-2 1a14 14 0 0 0 6 6l1-2 5 2v1a3 3 0 0 1-3 3A16 16 0 0 1 5 5z"/><path d="M15 3a6 6 0 0 1 6 6"/></svg> },
]

export function ServicesSection() {
  const { ref, shown } = useReveal<HTMLElement>()
  return (
    <section ref={ref} className="hs-section hs-section--alt" aria-labelledby="hs-services-title">
      <div className="hs-container">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`}><SectionHeader id="hs-services-title" title="What we do" intro="From choosing the right equipment to keeping it working." /></div>
        <div className="hs-grid4">
          {items.map((it, i) => (
            <Link key={it.title} to={it.to} className={`hs-card hs-focus hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: i + 1 }}>
              <div className="hs-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <span className="hs-card__link">Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { services } from '../data/services'
import { whatsappLink } from '../data/company'
import { ServiceCard } from '../components/ServiceCard'
import '../graphics/services/services.css'

type FilterKey = 'all' | 'Fire Protection' | 'Detection & Alarm' | 'Electrical Safety' | 'Maintenance'

const FILTERS: { key: FilterKey; label: string; hash: string }[] = [
  { key: 'all', label: 'All', hash: '' },
  { key: 'Fire Protection', label: 'Fire Protection', hash: 'fire-protection' },
  { key: 'Detection & Alarm', label: 'Detection & Alarm', hash: 'detection-alarm' },
  { key: 'Electrical Safety', label: 'Electrical Safety', hash: 'electrical-safety' },
  { key: 'Maintenance', label: 'Maintenance', hash: 'maintenance' },
]

function filterFromHash(hash: string): FilterKey {
  const h = hash.replace(/^#/, '')
  const found = FILTERS.find((f) => f.hash === h)
  return found ? found.key : 'all'
}

export function Services() {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState<FilterKey>(() => filterFromHash(location.hash))

  useEffect(() => {
    setActive(filterFromHash(location.hash))
  }, [location.hash])

  const counts = useMemo(() => {
    const base = { all: services.length } as Record<string, number>
    for (const f of FILTERS) if (f.key !== 'all') base[f.key] = services.filter((s) => s.category === f.key).length
    return base
  }, [])

  const visible = useMemo(() => active === 'all' ? services : services.filter((s) => s.category === active), [active])

  const select = (key: FilterKey) => {
    const f = FILTERS.find((x) => x.key === key)
    setActive(key)
    navigate({ pathname: '/services', hash: f?.hash ? `#${f.hash}` : '' }, { replace: true })
  }

  return (
    <div className="hse-sv-page" data-custom-cursor>
      <section className="hse-sv-hero" data-surface="brand" aria-labelledby="services-hero-title">
        <div className="hse-sv-hero__scrim" aria-hidden="true" />
        <div className="container hse-sv-hero__inner">
          <div className="hse-sv-hero__copy">
            <nav className="hse-sv-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span>
            </nav>
            <h1 id="services-hero-title"><span className="hse-sv-line">Our Services</span></h1>
            <p className="hse-sv-hero__subtitle">Comprehensive fire safety and engineering solutions tailored to your facility.</p>
            <div className="hse-sv-hero__actions">
              <Link to="/contact" className="hse-sv-btn hse-sv-btn--quote">Get a Quote</Link>
              <a href={whatsappLink('Hello, I would like to inquire about Heat Shield Engineering services.')} target="_blank" rel="noopener noreferrer" className="hse-sv-btn hse-sv-btn--wa" data-surface="dark">WhatsApp</a>
            </div>
          </div>
          <div className="hse-sv-hero__visual" aria-hidden="true">
            <div className="hse-sv-layers">
              <svg viewBox="0 0 520 520" fill="none">
                <g opacity=".9">
                  {[0,1,2,3,4,5].map((i) => (
                    <g key={i} transform={`translate(${260 - (120 - i * 4)} ${330 - i * 38})`}>
                      <path d={`M0 ${24 - i} L${120 - i * 4} ${-8} L${240 - i * 8} ${24 - i} L${120 - i * 4} ${56 - i * 2} Z`} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.38)" />
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="hse-sv-filters-wrap" data-surface="light">
        <div className="container">
          <div className="hse-sv-filters" role="group" aria-label="Filter services">
            {FILTERS.map((f) => (
              <button key={f.key} type="button" className="hse-sv-chip" aria-pressed={active === f.key} onClick={() => select(f.key)}>
                <span>{f.label}</span><span className="hse-sv-chip__count">{counts[f.key] ?? 0}</span>
              </button>
            ))}
          </div>
          <div className="hse-sv-live" aria-live="polite">Showing {visible.length} services</div>
        </div>
      </div>

      <section className="hse-sv-grid-section" data-surface="light" aria-label="Services">
        <div className="container">
          {visible.length ? (
            <div className="hse-sv-grid">
              {visible.map((s, i) => (
                <ServiceCard key={s.id} {...s} index={i} />
              ))}
            </div>
          ) : (
            <div className="hse-sv-empty">
              <p>No services match this filter.</p>
              <button type="button" className="hse-sv-chip" aria-pressed="true" onClick={() => select('all')}>Show all services</button>
            </div>
          )}
          {/* TODO(confirm): no verified company counters in src/data/company.ts; counter strip omitted. */}
          {/* TODO(confirm): finder/lifecycle/marquee matching and process details require business confirmation in later phases. */}
        </div>
      </section>
      
    </div>
  )
}



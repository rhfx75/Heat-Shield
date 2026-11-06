import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../data/services'
import { whatsappLink } from '../data/company'
import { ServiceCard } from '../components/ServiceCard'
import { LayersGraphic } from '../graphics/services/LayersGraphic'
import { ServiceFilters, FILTERS, type FilterKey } from '../graphics/services/ServiceFilters'
import { ServiceFinder } from '../graphics/services/ServiceFinder'
import { ServiceLifecycle } from '../graphics/services/ServiceLifecycle'
import { ServiceMarquee } from '../graphics/services/ServiceMarquee'
import { gsap, ScrollTrigger } from '../components/ui/use-gsap'
import '../graphics/services/services.css'

function filterFromHash(hash: string): FilterKey {
  const h = hash.replace(/^#/, '')
  const found = FILTERS.find((f) => f.hash === h)
  return found ? found.key : 'all'
}

export function Services() {
  const location = useLocation()
  const navigate = useNavigate()
  const heroRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<FilterKey>(() => filterFromHash(location.hash))

  useEffect(() => { setActive(filterFromHash(location.hash)) }, [location.hash])

  useEffect(() => {
    const root = heroRef.current
    if (!root || typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = Array.from(root.querySelectorAll<HTMLElement>('.hse-sv-reveal'))
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo(lines, { opacity: 1, y: 18 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: 'expo.out', immediateRender: false, clearProps: 'opacity,transform' })
    }, root)
    const t = window.setTimeout(() => lines.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' }), 1500)
    return () => { window.clearTimeout(t); ctx.revert() }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const bar = document.querySelector<HTMLElement>('.hse-sv-progressbar span')
      if (!bar) return
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => { ScrollTrigger.getAll().forEach((t: any) => t.kill()) }, [])

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
    window.requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  return (
    <div className="hse-sv-page">
      <div className="hse-sv-progressbar" aria-hidden="true"><span /></div>
      <section ref={heroRef} className="hse-sv-hero" data-surface="brand" aria-labelledby="services-hero-title">
        <div className="hse-sv-hero__grid" aria-hidden="true" />
        <div className="hse-sv-hero__scrim" aria-hidden="true" />
        <div className="container hse-sv-hero__inner">
          <div className="hse-sv-hero__copy">
            <nav className="hse-sv-breadcrumb hse-sv-reveal" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span>
            </nav>
            <h1 id="services-hero-title"><span className="hse-sv-line hse-sv-reveal">Our Services</span></h1>
            <p className="hse-sv-hero__subtitle hse-sv-reveal">Comprehensive fire safety and engineering solutions tailored to your facility.</p>
            <div className="hse-sv-hero__actions hse-sv-reveal">
              <Link to="/contact" className="hse-sv-btn hse-sv-btn--quote" data-surface="dark">Get a Quote</Link>
              <a href={whatsappLink('Hello, I would like to inquire about Heat Shield Engineering services.')} target="_blank" rel="noopener noreferrer" className="hse-sv-btn hse-sv-btn--wa" data-surface="dark">WhatsApp</a>
            </div>
          </div>
          <div className="hse-sv-hero__visual hse-sv-reveal">
            <LayersGraphic activeCategory={active === 'all' ? null : active} />
          </div>
        </div>
      </section>

      <div className="hse-sv-filters-wrap" data-surface="light">
        <div className="container">
          <ServiceFilters active={active} counts={counts} onSelect={select} />
          <div className="hse-sv-live" aria-live="polite">Showing {visible.length} services</div>
        </div>
      </div>

      <section className="hse-sv-grid-section" data-surface="light" aria-label="Services">
        <div className="container">
          {visible.length ? (
            <motion.div id="hse-sv-grid" className="hse-sv-grid" layout>
              <AnimatePresence mode="popLayout">
                {visible.map((s, i) => (
                  <motion.div key={s.id} layout initial={{ opacity: 1, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0.001, scale: 0.98 }} transition={{ duration: 0.22 }}>
                    <ServiceCard {...s} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="hse-sv-empty">
              <p>No services match this filter.</p>
              <button type="button" className="hse-sv-chip hse-sv-chip--solid" aria-pressed="true" onClick={() => select('all')}>Show all services</button>
            </div>
          )}
          {/* TODO(confirm): no verified company counters in src/data/company.ts; counter strip omitted. */}
        </div>
      </section>

      <ServiceFinder />
      <ServiceLifecycle />
      <ServiceMarquee />
    </div>
  )
}

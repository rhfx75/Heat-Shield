import { useEffect, useRef, useState } from 'react'
import { rsc } from '../../data/rsc'
import FASDiagram from './FASDiagram'
import FPSDiagram from './FPSDiagram'
import ElectricalDiagram from './ElectricalDiagram'

export default function AboutServiceSection({ index }: { index: number }) {
  const service = rsc.services[index]
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      const node = e.target as HTMLElement
      node.style.opacity = '1'; node.style.transform = 'none'
      io.unobserve(node)
    }), { threshold: 0.12 })
    items.forEach((item, i) => { item.style.transition = `opacity .45s ease ${Math.min(i * 35, 240)}ms, transform .45s ease ${Math.min(i * 35, 240)}ms`; io.observe(item) })
    const vis = window.setTimeout(() => items.forEach((i) => { i.style.opacity = '1'; i.style.transform = 'none' }), 1500)
    return () => { window.clearTimeout(vis); io.disconnect() }
  }, [index])
  if (!service) return null
  const surface = index === 1 ? 'light' : 'pale'
  const sectionIds = ['fire-alarm-detection', 'fire-protection', 'electrical-safety']
  return (
    <section id={sectionIds[index]} className="hse-ab-section" data-surface={surface} ref={root} aria-labelledby={`${service.id}-title`}>
      <div className="hse-ab-container">
        <div data-reveal style={{ marginBottom: 22 }}>
          <p className="hse-ab-kicker">{service.number}</p>
          <h2 id={`${service.id}-title`} className="hse-ab-h2">{service.title}</h2>
          <p className="hse-ab-lead" style={{ marginBottom: 10 }}>{service.subtitle}</p>
          {service.intro.map((p, i) => <p key={i} className="hse-ab-body" style={{ marginTop: i ? 10 : 0, maxWidth: 960 }}>{p}</p>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18, alignItems: 'start' }}>
          <article data-reveal style={{ background: '#fff', border: '1px solid var(--ab-border)', borderRadius: 18, padding: 20 }}>
            <h3 className="hse-ab-h3" style={{ marginBottom: 12 }}>Our Scope of Services</h3>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
              {service.scope.map((item) => <li key={item} className="hse-ab-body" style={{ color: 'var(--ab-body)' }}>{item}</li>)}
            </ul>
          </article>
          <article data-reveal style={{ background: '#fff', border: '1px solid var(--ab-border)', borderRadius: 18, padding: 20 }}>
            <h3 className="hse-ab-h3" style={{ marginBottom: 12 }}>{service.documentationTitle}</h3>
            <button type="button" className="hse-ab-btn hse-ab-btn--ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={`${service.id}-docs`} style={{ color: 'var(--ab-blue)', borderColor: 'var(--ab-border)', background: 'var(--ab-blue-50)', marginBottom: 12, width: '100%', justifyContent: 'space-between' }}>
              <span>Documentation list ({service.documentation.length})</span><span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            <ol id={`${service.id}-docs`} hidden={!open} style={{ margin: 0, paddingLeft: 22, display: open ? 'grid' : 'none', gap: 8 }}>
              {service.documentation.map((item) => <li key={item} className="hse-ab-body">{item}</li>)}
            </ol>
            {!open && <p className="hse-ab-body" style={{ fontSize: '.92rem' }}>Open to view all required technical documentation categories.</p>}
          </article>
        </div>
        <div data-reveal className="hse-ab-standards" style={{ marginTop: 18, background: 'var(--ab-blue)', color: '#fff', borderRadius: 18, padding: 20 }}>
          <h3 className="hse-ab-h3" style={{ color: '#fff', marginBottom: 10 }}>{service.standardsTitle}</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6, color: '#fff' }}>
            {service.standards.map((item) => <li key={item} style={{ font: '400 .98rem/1.65 Inter,system-ui,sans-serif', color: '#fff' }}>{item}</li>)}
          </ul>
        </div>
        <div data-reveal style={{ marginTop: 18 }}>
          <h3 className="hse-ab-h3" style={{ marginBottom: 12 }}>Service Deliverables</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
            {service.deliverables.map((item) => (
              <div key={item} style={{ background: '#fff', border: '1px solid var(--ab-border)', borderRadius: 14, padding: '14px 14px 14px 42px', position: 'relative' }}>
                <span aria-hidden="true" style={{ position: 'absolute', left: 14, top: 14, width: 18, height: 18, borderRadius: 999, background: 'var(--ab-blue-pale)', color: 'var(--ab-blue)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>✓</span>
                <p className="hse-ab-body" style={{ margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal style={{ marginTop: 24 }}>
          <div style={{ background: '#fff', border: '1px solid var(--ab-border)', borderRadius: 20, padding: 24, overflow: 'hidden' }}>
            {index === 0 && <FASDiagram />}
            {index === 1 && <FPSDiagram />}
            {index === 2 && <ElectricalDiagram />}
          </div>
        </div>
      </div>
    </section>
  )
}

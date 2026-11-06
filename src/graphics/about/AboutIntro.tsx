import { useEffect, useRef, type ReactNode } from 'react'
import { rsc } from '../../data/rsc'

function highlight(text: string): ReactNode[] {
  const terms = ['RMG Sustainability Council (RSC)', 'NFPA', 'audit-ready']
  let out: ReactNode[] = [text]
  terms.forEach((term, ti) => {
    const next: ReactNode[] = []
    out.forEach((part, pi) => {
      if (typeof part !== 'string') { next.push(part); return }
      const idx = part.indexOf(term)
      if (idx < 0) { next.push(part); return }
      next.push(part.slice(0, idx), <mark key={`${ti}-${pi}`} className="hse-ab-marker" data-marker>{term}</mark>, part.slice(idx + term.length))
    })
    out = next
  })
  return out
}

const links = [
  { href: '#fire-alarm-detection', label: '01 — Fire Alarm & Detection' },
  { href: '#fire-protection', label: '02 — Fire Protection' },
  { href: '#electrical-safety', label: '03 — Electrical Safety' },
  { href: '#about-process', label: 'Process' },
  { href: '#why-heat-shield', label: 'Why Us' },
]

export default function AboutIntro() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const marks = Array.from(el.querySelectorAll<HTMLElement>('[data-marker]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { marks.forEach((m) => m.classList.add('is-on')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('is-on') }), { threshold: 0.5 })
    marks.forEach((m) => io.observe(m))
    return () => io.disconnect()
  }, [])
  return (
    <section id="about-intro" className="hse-ab-section" data-surface="light" ref={root} aria-labelledby="about-intro-title">
      <div className="hse-ab-container">
        <nav className="hse-ab-sticky-nav" aria-label="About page sections">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28, alignItems: 'start' }}>
          <div style={{ maxWidth: 760 }}>
            <h2 id="about-intro-title" className="hse-ab-h2">{rsc.intro.title}</h2>
            <p className="hse-ab-lead" style={{ marginBottom: 16 }}>{rsc.intro.subtitle}</p>
            {rsc.intro.paragraphs.map((p, i) => <p key={i} className="hse-ab-body" style={{ marginTop: i ? 14 : 0 }}>{highlight(p)}</p>)}
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {links.slice(0, 3).map((l) => (
              <a key={l.href} href={l.href} className="hse-ab-intro-card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, background: 'var(--ab-blue-50)', border: '1px solid var(--ab-border)', color: 'var(--ab-blue)' }}>
                <span aria-hidden="true" style={{ width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center', background: '#fff', border: '1px solid var(--ab-border)', flex: '0 0 auto' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V7l8-4z"/></svg>
                </span>
                <span style={{ font: '600 1rem/1.3 Montserrat,Inter,sans-serif' }}>{l.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

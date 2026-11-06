import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { rsc } from '../../data/rsc'
import './about-why.css'

export default function AboutWhy() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const ctx = gsap.context(() => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('.hse-ab-why-card'))
      const checks = Array.from(el.querySelectorAll<SVGPathElement>('[data-why-check]'))

      if (!reduce) {
        checks.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            const p = e.target as SVGPathElement
            gsap.to(p, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out', immediateRender: false, clearProps: 'strokeDasharray,strokeDashoffset' })
            io.unobserve(e.target)
          })
        }, { threshold: 0.3 })
        checks.forEach((p) => io.observe(p))
      }

      if (!reduce && fine) {
        cards.forEach((card) => {
          let rx = 0, ry = 0
          const onMove = (e: PointerEvent) => {
            const r = card.getBoundingClientRect()
            const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
            const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
            rx = Math.max(-6, Math.min(6, dy * 6))
            ry = Math.max(-6, Math.min(6, -dx * 6))
            gsap.to(card, { rotationX: rx, rotationY: ry, duration: 0.5, ease: 'power2.out', transformPerspective: 600, transformOrigin: '50% 50%' })
            const shine = card.querySelector('.hse-ab-why-shine') as HTMLElement | null
            if (shine) gsap.to(shine, { x: dx * 100, y: dy * 100, duration: 0.4, ease: 'power2.out' })
          }
          const onLeave = () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' })
            const shine = card.querySelector('.hse-ab-why-shine') as HTMLElement | null
            if (shine) gsap.to(shine, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
          }
          card.addEventListener('pointermove', onMove)
          card.addEventListener('pointerleave', onLeave)
          return () => { card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerleave', onLeave) }
        })
      }

      const vis = window.setTimeout(() => {
        checks.forEach((p) => { p.style.strokeDashoffset = '0' })
        cards.forEach((c) => { c.style.transform = 'none'; c.style.opacity = '1'; c.style.visibility = 'visible' })
      }, 1500)
      return () => { window.clearTimeout(vis); ctx.revert() }
    }, el)
    return () => { ctx.revert() }
  }, [])

  return (
    <section id="why-safron" className="hse-ab-section" data-surface="light" ref={root} aria-labelledby="about-why-title">
      <div className="hse-ab-container">
        <h2 id="about-why-title" className="hse-ab-h2">{rsc.whyChoose.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginTop: 18 }}>
          {rsc.whyChoose.points.map((point) => (
            <article
              key={point}
              className="hse-ab-why-card"
              style={{
                background: 'var(--ab-blue-50)',
                border: '1px solid var(--ab-border)',
                borderRadius: 18,
                padding: '20px 20px 20px 52px',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              <span aria-hidden="true" style={{ position: 'absolute', left: 20, top: 20, width: 20, height: 20, borderRadius: 999, background: 'rgba(255,255,255,.7)', border: '2px solid var(--ab-blue)', color: 'var(--ab-blue)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, boxShadow: '0 2px 8px rgba(1,78,182,.25)' }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-why-check>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="hse-ab-why-shine" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: 'linear-gradient(120deg,transparent 0%,rgba(255,255,255,.4) 40%,transparent 80%)', opacity: 0, pointerEvents: 'none', transform: 'translateX(-120%)' }} />
              <p className="hse-ab-body" style={{ margin: 0 }}>{point}</p>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: 26, borderRadius: 22, background: 'linear-gradient(135deg,var(--ab-blue),var(--ab-blue-light))', color: '#fff', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
          <span aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 140, height: 140, border: '2px dashed rgba(255,255,255,.35)', borderRadius: 999, transform: 'translate(-50%,-50%)', animation: 'hse-ab-why-ring 12s linear infinite', pointerEvents: 'none' }} />
          <img src="/images/safron-logo.png" alt="Safron Technology logo" width="72" height="72" style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 999, background: 'rgba(255,255,255,.12)', padding: 8, position: 'relative', zIndex: 1 }} />
          <div>
            <p style={{ margin: 0, font: '700 1.25rem/1.2 Montserrat,Inter,sans-serif', color: '#fff' }}>{rsc.whyChoose.signature}</p>
            <p id="why-tagline" style={{ margin: '10px 0 0', font: '500 1.05rem/1.5 Inter,system-ui,sans-serif', color: 'rgba(255,255,255,.92)' }}>{rsc.whyChoose.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

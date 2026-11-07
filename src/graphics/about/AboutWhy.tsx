import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { rsc } from '../../data/rsc'
import { COMPANY_LOGO, COMPANY_LOGO_ALT, COMPANY_NAME } from '../../config/brandAssets'
import './about-why.css'

export default function AboutWhy() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let io: IntersectionObserver | undefined
    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('.hse-ab-why-card'))
      const checks = Array.from(el.querySelectorAll<SVGGeometryElement>('[data-why-check]'))

      if (!reduce) {
        checks.forEach((p) => {
          if (typeof p.getTotalLength !== 'function') return
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })
        io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            const p = e.target as SVGGeometryElement
            gsap.to(p, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out', immediateRender: false, clearProps: 'strokeDasharray,strokeDashoffset' })
            io?.unobserve(e.target)
          })
        }, { threshold: 0.3 })
        checks.forEach((p) => io?.observe(p))
      }

      if (!reduce && fine) {
        cards.forEach((card) => {
          const onMove = (e: PointerEvent) => {
            const r = card.getBoundingClientRect()
            const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
            const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
            const rx = Math.max(-6, Math.min(6, dy * 6))
            const ry = Math.max(-6, Math.min(6, -dx * 6))
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
          cleanups.push(() => { card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerleave', onLeave) })
        })
      }
    }, el)

    const vis = window.setTimeout(() => {
      if (!el.isConnected) return
      el.querySelectorAll<SVGGeometryElement>('[data-why-check]').forEach((p) => { p.style.strokeDashoffset = '0' })
      el.querySelectorAll<HTMLElement>('.hse-ab-why-card').forEach((c) => { c.style.transform = 'none'; c.style.opacity = '1'; c.style.visibility = 'visible' })
    }, 1500)

    return () => {
      window.clearTimeout(vis)
      io?.disconnect()
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
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
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" data-why-check />
                </svg>
              </span>
              <div className="hse-ab-why-shine" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: 'linear-gradient(120deg,transparent 0%,rgba(255,255,255,.4) 40%,transparent 80%)', opacity: 0, pointerEvents: 'none', transform: 'translateX(-120%)' }} />
              <p className="hse-ab-body" style={{ margin: 0 }}>{point}</p>
            </article>
          ))}
        </div>
        <div className="hse-ab-signature" aria-labelledby="why-tagline">
          <span className="hse-ab-signature__ring" aria-hidden="true" />
          <div className="hse-ab-signature__logo"><img src={COMPANY_LOGO} alt={COMPANY_LOGO_ALT} width="72" height="72" loading="lazy" decoding="async" /></div>
          <div className="hse-ab-signature__text">
            <p className="hse-ab-signature__title">{COMPANY_NAME}</p>
            <p id="why-tagline" className="hse-ab-signature__tag">{rsc.whyChoose.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { company, whatsappLink } from '../../data/company'

export default function AboutHero() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const parts = Array.from(el.querySelectorAll<SVGGeometryElement>('[data-draw]'))
    const ctx = gsap.context(() => {
      parts.forEach((p) => {
        try {
          const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 240
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(p, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', immediateRender: false, clearProps: 'strokeDasharray,strokeDashoffset' })
        } catch {}
      })
      gsap.fromTo(el.querySelectorAll('[data-hero-fade]'), { y: 14, opacity: 1 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out', immediateRender: false, clearProps: 'transform' })
      const ring = el.querySelector('[data-ring]')
      if (ring) gsap.fromTo(ring, { scale: 0.6, opacity: 0.55 }, { scale: 1.35, opacity: 0, duration: 2.4, repeat: -1, ease: 'power1.out', immediateRender: false, transformOrigin: '50% 50%' })
      const shield = el.querySelector('[data-shield-float]')
      if (shield) gsap.to(shield, { y: -8, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }, el)
    const vis = window.setTimeout(() => parts.forEach((p) => { p.style.strokeDashoffset = '0' }), 1500)
    return () => { window.clearTimeout(vis); ctx.revert() }
  }, [])

  return (
    <section id="about-hero" className="hse-ab-section" data-surface="brand" ref={root} aria-labelledby="about-hero-title">
      <div className="hse-ab-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28, alignItems: 'center', minHeight: 'min(70vh,680px)' }}>
        <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(90deg,rgba(1,78,182,.92),rgba(1,78,182,.55) 70%,rgba(1,78,182,0))', padding: '24px 24px 24px 0', borderRadius: 20 }}>
          <p className="hse-ab-kicker" data-hero-fade><a href="/" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>Home</a> / About Us</p>
          <h1 id="about-hero-title" className="hse-ab-h1" data-hero-fade>About Us</h1>
          <p className="hse-ab-lead" data-hero-fade style={{ color: '#fff', fontWeight: 600 }}>Engineering Safer Facilities. Supporting Sustainable Compliance.</p>
          <p className="hse-ab-body" data-hero-fade style={{ color: 'rgba(255,255,255,.88)', marginTop: 10 }}>RSC Compliance &amp; Technical Engineering Services</p>
          <div data-hero-fade style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <a className="hse-ab-btn hse-ab-btn--red" href="/contact">Get a Quote</a>
            <a className="hse-ab-btn hse-ab-btn--wa" href={whatsappLink(`Hello ${company.name}, I would like to discuss RSC compliance services.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', minHeight: 280 }}>
          <svg viewBox="0 0 420 420" style={{ width: 'min(100%,420px)', height: 'auto', overflow: 'visible' }}>
            <defs>
              <radialGradient id="hse-ab-glow" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="#ffffff" stopOpacity=".18"/><stop offset="100%" stopColor="#0868d8" stopOpacity="0"/></radialGradient>
            </defs>
            <circle cx="210" cy="210" r="150" fill="url(#hse-ab-glow)" />
            <circle data-ring cx="210" cy="215" r="88" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
            <g data-shield-float>
              <path data-draw d="M210 52 L330 102 V212 C330 292 276 348 210 378 C144 348 90 292 90 212 V102 Z" fill="rgba(255,255,255,.08)" stroke="#fff" strokeWidth="4" />
              <path data-draw d="M210 132 C194 158 170 174 170 204 C170 232 188 252 210 264 C232 252 250 232 250 204 C250 174 226 158 210 132 Z" fill="#ff5a52" stroke="#fff" strokeWidth="2" />
              <path data-draw d="M210 170 C202 186 192 196 192 210 C192 224 200 234 210 240 C220 234 228 224 228 210 C228 196 218 186 210 170 Z" fill="#ffd7d6" />
              <g transform="translate(118,286)">
                <rect x="0" y="0" width="58" height="46" rx="8" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.55)" />
                <text x="29" y="20" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Montserrat,Arial">01</text>
                <text x="29" y="34" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="Inter,Arial">FIRE ALARM</text>
              </g>
              <g transform="translate(181,304)">
                <rect x="0" y="0" width="58" height="46" rx="8" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.55)" />
                <text x="29" y="20" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Montserrat,Arial">02</text>
                <text x="29" y="34" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="Inter,Arial">FIRE PROT.</text>
              </g>
              <g transform="translate(244,286)">
                <rect x="0" y="0" width="58" height="46" rx="8" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.55)" />
                <text x="29" y="20" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Montserrat,Arial">03</text>
                <text x="29" y="34" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="Inter,Arial">ELECTRICAL</text>
              </g>
              <circle cx="292" cy="136" r="22" fill="#128c7e" stroke="#fff" strokeWidth="2" />
              <path data-draw d="M282 136 L289 143 L303 128" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

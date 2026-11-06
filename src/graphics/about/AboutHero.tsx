import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { company, whatsappLink } from '../../data/company'

const HERO_IMG = '/images/heatshield-rsc-hero.png'

export default function AboutHero() {
  const root = useRef<HTMLElement>(null)
  const sparks = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    i, x: 8 + (i * 47) % 84, y: 12 + (i * 31) % 76, s: 2 + (i % 4), d: 2.8 + (i % 7) * 0.55, delay: (i % 9) * 0.23,
  })), [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const hide = () => { if (document.hidden) gsap.globalTimeline.pause(); else if (!reduce) gsap.globalTimeline.resume() }
    document.addEventListener('visibilitychange', hide)
    if (reduce) { el.querySelectorAll<HTMLElement>('[data-ab-show]').forEach((n) => { n.style.opacity = '1'; n.style.transform = 'none' }); return () => document.removeEventListener('visibilitychange', hide) }
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('[data-hero-fade]'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out', immediateRender: false, clearProps: 'transform,opacity,visibility' })
      gsap.fromTo('[data-ab-logo]', { scale: 0.84, autoAlpha: 0, y: 24, filter: 'blur(8px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', immediateRender: false, clearProps: 'filter' })
      gsap.to('[data-ab-float]', { y: -12, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('[data-ab-orbit-a]', { rotation: 360, duration: 26, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('[data-ab-orbit-b]', { rotation: -360, duration: 34, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('[data-ab-orbit-c]', { rotation: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.fromTo('[data-ab-pulse]', { scale: 0.72, autoAlpha: 0.55 }, { scale: 1.45, autoAlpha: 0, duration: 2.6, stagger: 0.85, repeat: -1, ease: 'power1.out', immediateRender: false, transformOrigin: '50% 50%' })
      gsap.to('[data-ab-scan]', { rotation: 360, duration: 8, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('[data-ab-glow]', { opacity: 0.95, scale: 1.06, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' })
      gsap.to('[data-ab-ember]', { y: -90, x: 'random(-18,18)', autoAlpha: 0, scale: 'random(0.3,1)', duration: 'random(2.8,5.4)', stagger: { each: 0.18, repeat: -1 }, ease: 'none' })
    }, el)
    let mx = 0, my = 0
    const onMove = (e: PointerEvent) => {
      if (!fine) return
      const r = el.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * 14
      my = ((e.clientY - r.top) / r.height - 0.5) * 10
      gsap.to('[data-ab-parallax]', { x: mx, y: my, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
      gsap.to('[data-ab-parallax-r]', { x: -mx * 0.5, y: -my * 0.5, duration: 1, ease: 'power2.out', overwrite: 'auto' })
    }
    if (fine) el.addEventListener('pointermove', onMove)
    const vis = window.setTimeout(() => el.querySelectorAll<HTMLElement>('[data-ab-show],[data-hero-fade],[data-ab-logo]').forEach((n) => { n.style.opacity = '1'; n.style.transform = 'none'; n.style.visibility = 'visible'; n.style.filter = 'none' }), 1500)
    return () => { window.clearTimeout(vis); document.removeEventListener('visibilitychange', hide); if (fine) el.removeEventListener('pointermove', onMove); ctx.revert() }
  }, [])

  return (
    <section id="about-hero" className="hse-ab-section hse-ab-hero" data-surface="brand" ref={root} aria-labelledby="about-hero-title">
      <div className="hse-ab-hero-bg" aria-hidden="true">
        <div className="hse-ab-hero-grid" />
        <div className="hse-ab-hero-vignette" />
      </div>
      <div className="hse-ab-container hse-ab-hero-gridwrap">
        <div className="hse-ab-hero-copy" data-ab-show>
          <p className="hse-ab-kicker" data-hero-fade><a href="/">Home</a> / About Us</p>
          <h1 id="about-hero-title" className="hse-ab-h1" data-hero-fade>About Us</h1>
          <p className="hse-ab-lead hse-ab-hero-lead" data-hero-fade>Engineering Safer Facilities. Supporting Sustainable Compliance.</p>
          <p className="hse-ab-body hse-ab-hero-sub" data-hero-fade>RSC Compliance &amp; Technical Engineering Services</p>
          <div className="hse-ab-hero-ctas" data-hero-fade>
            <a className="hse-ab-btn hse-ab-btn--red" href="/contact">Get a Quote</a>
            <a className="hse-ab-btn hse-ab-btn--wa" href={whatsappLink(`Hello ${company.name}, I would like to discuss RSC compliance services.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="hse-ab-hero-visual" aria-hidden="true">
          <div data-ab-parallax-r className="hse-ab-hero-light hse-ab-hero-light--blue" />
          <div data-ab-parallax-r className="hse-ab-hero-light hse-ab-hero-light--fire" />
          <div data-ab-glow className="hse-ab-hero-light hse-ab-hero-light--core" />
          <svg className="hse-ab-hero-fx" viewBox="0 0 800 800" fill="none">
            <circle data-ab-pulse cx="400" cy="400" r="150" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
            <circle data-ab-pulse cx="400" cy="400" r="150" stroke="rgba(255,138,76,.22)" strokeWidth="2" />
            <circle data-ab-pulse cx="400" cy="400" r="150" stroke="rgba(8,104,216,.22)" strokeWidth="2" />
            <g data-ab-orbit-a>
              <circle cx="400" cy="400" r="250" stroke="rgba(255,255,255,.16)" strokeWidth="1.5" strokeDasharray="10 14" />
              <circle cx="400" cy="150" r="7" fill="#fff" /><circle cx="650" cy="400" r="5" fill="#ff8a4c" /><circle cx="400" cy="650" r="6" fill="#60a5fa" />
            </g>
            <g data-ab-orbit-b>
              <ellipse cx="400" cy="400" rx="310" ry="180" stroke="rgba(255,255,255,.12)" strokeWidth="1.2" strokeDasharray="4 18" transform="rotate(18 400 400)" />
              <circle cx="705" cy="430" r="5" fill="#ffd7d6" /><circle cx="95" cy="370" r="4" fill="#93c5fd" />
            </g>
            <g data-ab-orbit-c>
              <circle cx="400" cy="400" r="200" stroke="rgba(255,90,82,.18)" strokeWidth="1.2" strokeDasharray="22 10 2 10" />
            </g>
            <g data-ab-scan opacity=".55">
              <path d="M400 400 L400 120 A280 280 0 0 1 640 250 Z" fill="url(#abScan)" />
            </g>
            <defs>
              <linearGradient id="abScan" x1="400" y1="400" x2="520" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(255,255,255,.22)" /><stop offset="1" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
          </svg>
          <div data-ab-float data-ab-parallax className="hse-ab-hero-logo-wrap" data-ab-show data-ab-logo>
            <div className="hse-ab-hero-floor" />
            <img src={HERO_IMG} alt="Safron Technology" className="hse-ab-hero-logo" width="720" height="720" decoding="async" fetchPriority="high" />
            <div className="hse-ab-hero-rim" />
          </div>
          <div className="hse-ab-hero-sparks">
            {sparks.map((s) => (
              <span key={s.i} data-ab-ember className="hse-ab-hero-spark" style={{ left: `${s.x}%`, bottom: `${s.y * 0.3}%`, width: s.s, height: s.s, animationDelay: `${s.delay}s`, ['--sd' as string]: `${s.d}s` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { useVisibilityFallback } from './useVisibilityFallback'

gsap.registerPlugin(DrawSVGPlugin)

export default function HeroShieldAssemble() {
  const wrap = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const root = wrap.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const ctx = gsap.context(() => {
      const plates = gsap.utils.toArray<SVGGElement>('.hse-ab-plate')
      const outline = root.querySelector('.hse-ab-outline') as SVGPathElement | null
      const flame = root.querySelector('.hse-ab-flame') as SVGGElement | null
      const ring = root.querySelector('.hse-ab-shock') as SVGCircleElement | null
      gsap.set([plates, outline, flame, ring].flat().filter(Boolean), { opacity: 1 })
      if (reduce) return
      started.current = true
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo(plates, { x: (i) => [ -180, 160, -120, 140, -90, 110, 0, 60 ][i] || 0, y: (i) => [ -140, -120, 150, 130, -60, 170, -170, 90 ][i] || 0, rotation: (i) => (i % 2 ? 35 : -35), opacity: 0.001, scale: 0.72 }, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.05, stagger: 0.07, ease: 'elastic.out(1,0.72)', immediateRender: false, clearProps: 'transform' }, 0.05)
      if (outline) tl.fromTo(outline, { drawSVG: '0%', opacity: 0.001 }, { drawSVG: '100%', opacity: 1, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, 0.55)
      if (flame) {
        tl.fromTo(flame, { scaleY: 0, opacity: 0.001, transformOrigin: '50% 100%' }, { scaleY: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, 1.05)
        gsap.to(flame, { scaleY: 1.06, skewX: 1.5, transformOrigin: '50% 100%', duration: 0.22, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 })
      }
      if (ring) tl.fromTo(ring, { attr: { r: 36 }, opacity: 0.001, strokeWidth: 8 }, { attr: { r: 165 }, opacity: 0, strokeWidth: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, 1.2)
      if (!coarse) {
        const xTo = plates.map((p, i) => gsap.quickTo(p, 'x', { duration: 0.45 + i * 0.03, ease: 'power3' }))
        const yTo = plates.map((p, i) => gsap.quickTo(p, 'y', { duration: 0.45 + i * 0.03, ease: 'power3' }))
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect(); const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2); const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          plates.forEach((_, i) => { const d = 6 + (i % 4) * 3; xTo[i](Math.max(-18, Math.min(18, dx * d))); yTo[i](Math.max(-18, Math.min(18, dy * d))) })
        }
        const onLeave = () => plates.forEach((_, i) => { xTo[i](0); yTo[i](0) })
        root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave)
        return () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave) }
      }
    }, root)
    return () => ctx.revert()
  }, [])

  useVisibilityFallback(wrap, started)

  const plate = (pts: string, i: number) => <g key={i} className="hse-ab-plate" data-ab-animate><polygon points={pts} fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" /></g>
  return (
    <div ref={wrap} className="hse-ab-shield-wrap">
      <svg className="hse-ab-shield-svg" viewBox="0 0 360 420" role="img" aria-label="Heat Shield Engineering shield graphic">
        <defs>
          <clipPath id="hse-ab-shield-clip"><path d="M180 18 60 68v118c0 86 51 143 120 176 69-33 120-90 120-176V68L180 18Z" /></clipPath>
          <linearGradient id="hse-ab-flame-g" x1="180" y1="290" x2="180" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#E53935"/><stop offset="1" stopColor="#FF5A52"/></linearGradient>
        </defs>
        <circle className="hse-ab-shock" cx="180" cy="210" r="36" fill="none" stroke="rgba(255,255,255,.55)" />
        <g clipPath="url(#hse-ab-shield-clip)">
          {plate('90,78 135,58 160,92 138,132 94,122',0)}
          {plate('135,58 180,40 205,72 185,108 160,92',1)}
          {plate('180,40 225,58 246,92 220,108 205,72',2)}
          {plate('225,58 270,78 266,122 222,132 220,108 246,92',3)}
          {plate('94,122 138,132 148,188 116,214 82,178',4)}
          {plate('138,132 185,108 220,108 222,132 210,188 148,188',5)}
          {plate('222,132 266,122 278,178 244,214 210,188',6)}
          {plate('116,214 148,188 210,188 244,214 180,308',7)}
        </g>
        <path className="hse-ab-outline" data-ab-animate d="M180 18 60 68v118c0 86 51 143 120 176 69-33 120-90 120-176V68L180 18Z" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="4" strokeLinejoin="round" />
        <g className="hse-ab-flame" data-ab-animate>
          <path d="M180 154c18 28 40 44 40 74a40 40 0 1 1-80 0c0-18 7-32 19-46 4 14 9 22 21 30-2-21 1-39 0-58Z" fill="url(#hse-ab-flame-g)" />
          <path d="M180 198c10 14 20 22 20 38a20 20 0 1 1-40 0c0-9 4-16 9-23 2 7 5 11 11 15-1-10 0-20 0-30Z" fill="#fff" opacity=".55" />
        </g>
      </svg>
    </div>
  )
}

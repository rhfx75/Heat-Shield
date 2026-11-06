import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useVisibilityFallback } from './useVisibilityFallback'

export default function HeroShieldAssemble() {
  const wrap = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const root = wrap.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const ctx = gsap.context(() => {
      const logo = root.querySelector('.hse-ab-shield-logo') as HTMLElement | null
      const ring = root.querySelector('.hse-ab-shock') as SVGCircleElement | null
      gsap.set([logo, ring].filter(Boolean), { opacity: 1 })
      if (reduce) return
      started.current = true
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      if (logo) tl.fromTo(logo, { scale: 0.72, y: 24, opacity: 0.001, transformOrigin: '50% 55%' }, { scale: 1, y: 0, opacity: 1, duration: 1.05, ease: 'elastic.out(1,0.72)', immediateRender: false, clearProps: 'transform' }, 0.05)
      if (ring) tl.fromTo(ring, { attr: { r: 36 }, opacity: 0.001, strokeWidth: 8 }, { attr: { r: 165 }, opacity: 0, strokeWidth: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, 0.65)
      if (!coarse && logo) {
        const xTo = gsap.quickTo(logo, 'x', { duration: 0.45, ease: 'power3' })
        const yTo = gsap.quickTo(logo, 'y', { duration: 0.45, ease: 'power3' })
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect(); const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2); const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          xTo(Math.max(-18, Math.min(18, dx * 14))); yTo(Math.max(-18, Math.min(18, dy * 14)))
        }
        const onLeave = () => { xTo(0); yTo(0) }
        root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave)
        return () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave) }
      }
    }, root)
    return () => ctx.revert()
  }, [])

  useVisibilityFallback(wrap, started)

  return (
    <div ref={wrap} className="hse-ab-shield-wrap hse-ab-shield-wrap--large">
      <div className="hse-ab-shield-motion" aria-hidden="true">
        <span className="hse-ab-shield-ring hse-ab-shield-ring--a" />
        <span className="hse-ab-shield-ring hse-ab-shield-ring--b" />
        <span className="hse-ab-shield-ring hse-ab-shield-ring--c" />
        <span className="hse-ab-shield-orbit hse-ab-shield-orbit--a"><span className="hse-ab-shield-node" /></span>
        <span className="hse-ab-shield-orbit hse-ab-shield-orbit--b"><span className="hse-ab-shield-node hse-ab-shield-node--alt" /></span>
        <span className="hse-ab-shield-spark hse-ab-shield-spark--a" />
        <span className="hse-ab-shield-spark hse-ab-shield-spark--b" />
        <span className="hse-ab-shield-spark hse-ab-shield-spark--c" />
      </div>
      <span className="hse-ab-shield-glow" aria-hidden="true" />
      <span className="hse-ab-shield-glow hse-ab-shield-glow--outer" aria-hidden="true" />
      <img src="/images/heatshield-logo.png" alt="Safron Technology logo" className="hse-ab-shield-logo" data-ab-animate width="520" height="520" loading="eager" decoding="async" />
      <svg className="hse-ab-shield-fx" viewBox="0 0 360 420" aria-hidden="true" focusable="false">
        <circle className="hse-ab-shock" cx="180" cy="210" r="36" fill="none" stroke="rgba(255,255,255,.55)" />
      </svg>
    </div>
  )
}

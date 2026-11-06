import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { useVisibilityFallback } from './useVisibilityFallback'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const WHO_TEXT = 'SAFRON TECHNOLOGY is a Bangladesh-based engineering solutions provider specializing in fire safety, fire protection, electrical safety, and industrial technology services.'
const MARKS = ['fire safety', 'fire protection', 'electrical safety']

function marked(text: string) {
  let out = text
  MARKS.forEach((m) => { out = out.replace(m, `@@${m}@@`) })
  return out.split('@@').map((part, i) => MARKS.includes(part) ? <mark key={i} className="hse-ab-mark"><span data-ab-animate>{part}</span></mark> : <span key={i}>{part}</span>)
}

export default function AboutWho() {
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const marks = root.querySelectorAll('.hse-ab-mark span')
      const lines = root.querySelectorAll('.hse-ab-blue-line')
      const icons = root.querySelectorAll('.hse-ab-blue-icon')
      gsap.set([marks, lines, icons].flatMap((n) => Array.from(n)), { opacity: 1 })
      if (reduce) return
      started.current = true
      gsap.fromTo(marks, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: 0.8, stagger: 0.12, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      gsap.fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, stagger: 0.08, ease: 'power1.inOut', immediateRender: false, scrollTrigger: { trigger: root.querySelector('.hse-ab-blueprint'), start: 'top 75%', end: 'bottom 55%', scrub: 0.6 } })
      gsap.fromTo(icons, { scale: 0.4, opacity: 0.001, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2)', immediateRender: false, clearProps: 'transform', scrollTrigger: { trigger: root.querySelector('.hse-ab-blueprint'), start: 'top 70%', once: true } })
      const scan = root.querySelector('.hse-ab-scan')
      if (scan) gsap.to(scan, { y: 240, duration: 3.2, repeat: -1, repeatDelay: 2.8, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } })
    }, root)
    return () => ctx.revert()
  }, [])
  useVisibilityFallback(ref, started)

  return (
    <section ref={ref} className="hse-ab-section hse-ab-wipe-inv" data-surface="light" aria-labelledby="ab-who-title">
      <div className="hse-ab-container hse-ab-who">
        <div className="hse-ab-who__copy">
          <p className="hse-ab-eyebrow">WHO WE ARE</p>
          <h2 id="ab-who-title">Who We Are</h2>
          <p className="hse-ab-lead">{marked(WHO_TEXT)}</p>
        </div>
        <div className="hse-ab-blueprint" aria-hidden="true">
          <svg viewBox="0 0 420 280" className="hse-ab-blue-svg">
            <rect x="12" y="12" width="396" height="256" rx="10" fill="rgba(234,242,255,.6)" stroke="rgba(1,78,182,.18)" />
            <path className="hse-ab-blue-line" d="M24 140H396M160 24V268M280 24V268M24 84H160M280 196H396" stroke="rgba(1,78,182,.45)" strokeWidth="2" fill="none" />
            <path className="hse-ab-blue-line" d="M32 32h120v100H32ZM168 32h104v100H168ZM288 32h100v152H288ZM32 148h120v112H32ZM168 148h104v112H168Z" stroke="rgba(1,78,182,.28)" strokeWidth="1.5" fill="none" />
            <rect className="hse-ab-scan" x="24" y="18" width="372" height="14" fill="rgba(43,127,230,.12)" />
            {[{x:92,y:82,t:'D'},{x:220,y:82,t:'D'},{x:338,y:108,t:'D'}].map((n,i)=>(<g key={i} className="hse-ab-blue-icon" data-ab-animate><circle cx={n.x} cy={n.y} r="12" fill="rgba(229,57,53,.14)" stroke="rgba(229,57,53,.5)" /><text x={n.x} y={n.y+4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#014EB6">{n.t}</text></g>))}
            {[{x:92,y:204},{x:220,y:204},{x:338,y:228}].map((n,i)=>(<g key={'s'+i} className="hse-ab-blue-icon" data-ab-animate><circle cx={n.x} cy={n.y} r="10" fill="rgba(1,78,182,.12)" stroke="rgba(1,78,182,.55)" /><path d={`M${n.x-5} ${n.y}h10M${n.x} ${n.y-5}v10`} stroke="#014EB6" /></g>))}
            {[{x:58,y:170},{x:186,y:170}].map((n,i)=>(<g key={'e'+i} className="hse-ab-blue-icon" data-ab-animate><rect x={n.x-8} y={n.y-11} width="16" height="22" rx="3" fill="rgba(229,57,53,.14)" stroke="rgba(229,57,53,.55)" /><text x={n.x} y={n.y+4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#014EB6">E</text></g>))}
          </svg>
        </div>
      </div>
      <style>{`.hse-ab-who{display:grid;grid-template-columns:1fr 1.05fr;gap:40px;align-items:center;padding:96px 0}.hse-ab-eyebrow{font-family:var(--font-heading);font-size:14px;font-weight:700;letter-spacing:.14em;margin:0 0 12px}.hse-ab-who h2{font-family:var(--font-heading);font-size:clamp(2.15rem,3.6vw,3.15rem);margin:0 0 16px;line-height:1.08}.hse-ab-lead{font-size:clamp(1.1rem,1.35vw,1.3rem);line-height:1.85;margin:0;max-width:62ch}.hse-ab-mark{background:none;color:inherit;padding:0}.hse-ab-mark span{background-image:linear-gradient(transparent 62%,rgba(229,57,53,.35) 62%);background-repeat:no-repeat;background-size:100% 100%;padding:0 2px}.hse-ab-blue-svg{width:100%;height:auto;display:block;border-radius:16px;box-shadow:var(--hse-shadow-card)}@media (max-width:900px){.hse-ab-who{grid-template-columns:1fr;padding:68px 0}}`}</style>
    </section>
  )
}

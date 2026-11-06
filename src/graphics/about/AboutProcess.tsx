import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { useVisibilityFallback } from './useVisibilityFallback'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin)

// TODO(confirm): Confirm that these five stages accurately represent the company's actual project execution process.
const STEPS = [
  { title: 'Site Survey', text: 'Site risk assessment and requirement review based on service scope.' },
  { title: 'System Design', text: 'Engineering design and consultancy aligned to project needs.' },
  { title: 'Supply & Installation', text: 'Supply, installation, and integration of specified systems.' },
  { title: 'Testing & Commissioning', text: 'Inspection, testing, and commissioning before handover.' },
  { title: 'Maintenance (AMC)', text: 'Preventive maintenance and annual service support.' },
]

export default function AboutProcess() {
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const line = root.querySelector('.hse-ab-proc__line') as SVGPathElement | null
      const token = root.querySelector('.hse-ab-proc__token')
      const nodes = root.querySelectorAll('.hse-ab-proc__node')
      gsap.set(nodes, { opacity: 1 })
      if (reduce) return
      started.current = true
      if (line) gsap.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', immediateRender: false, scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 45%', scrub: 0.7 } })
      if (line && token) gsap.to(token, { motionPath: { path: line, align: line, alignOrigin: [0.5, 0.5] }, ease: 'none', scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 45%', scrub: 0.7 } })
      nodes.forEach((node) => { const icon = node.querySelectorAll('.hse-ab-draw'); gsap.fromTo(icon, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, stagger: 0.06, immediateRender: false, scrollTrigger: { trigger: node, start: 'top 82%', once: true } }) })
    }, root)
    return () => ctx.revert()
  }, [])
  useVisibilityFallback(ref, started)

  return (
    <section ref={ref} className="hse-ab-section hse-ab-proc" data-surface="light" aria-labelledby="ab-proc-title">
      <div className="hse-ab-container">
        <h2 id="ab-proc-title">How We Work</h2>
        <div className="hse-ab-proc__track">
          <svg className="hse-ab-proc__svg" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 40 60 H 960" stroke="rgba(1,78,182,.15)" strokeWidth="4" fill="none" />
            <path className="hse-ab-proc__line" d="M 40 60 H 960" stroke="url(#ab-flame-line)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <defs><linearGradient id="ab-flame-line" x1="0" x2="1"><stop stopColor="#E53935"/><stop offset="1" stopColor="#FF5A52"/></linearGradient></defs>
            <circle className="hse-ab-proc__token" cx="40" cy="60" r="7" fill="#FF5A52" stroke="#fff" strokeWidth="2" />
          </svg>
          <div className="hse-ab-proc__nodes">
            {STEPS.map((s, i) => (
              <article key={s.title} className="hse-ab-proc__node" data-ab-animate>
                <span className="hse-ab-proc__dot" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <style>{`.hse-ab-proc{padding:88px 0}.hse-ab-proc h2{font-family:var(--font-heading);font-size:clamp(1.8rem,3vw,2.5rem);margin:0 0 28px;text-align:center}.hse-ab-proc__track{position:relative}.hse-ab-proc__svg{width:100%;height:120px;display:block}.hse-ab-proc__nodes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:-18px}.hse-ab-proc__node{background:#fff;border:1px solid rgba(1,78,182,.12);border-radius:14px;padding:16px;box-shadow:var(--hse-shadow-card)}.hse-ab-proc__dot{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:999px;background:linear-gradient(135deg,#E53935,#FF5A52);color:#fff;-webkit-text-fill-color:#fff;font:700 13px var(--font-heading);margin-bottom:8px}.hse-ab-proc__node h3{margin:0 0 6px;font-family:var(--font-heading);font-size:1rem;color:var(--ab-brand);-webkit-text-fill-color:var(--ab-brand)}.hse-ab-proc__node p{margin:0;font-size:.94rem;line-height:1.55;color:var(--hse-text-secondary);-webkit-text-fill-color:var(--hse-text-secondary)}@media (max-width:980px){.hse-ab-proc__svg{display:none}.hse-ab-proc__nodes{grid-template-columns:1fr;margin-top:0;border-left:3px solid rgba(229,57,53,.35);padding-left:16px}.hse-ab-proc{padding:64px 0}}`}</style>
    </section>
  )
}

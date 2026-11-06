import { useEffect, useRef } from 'react'
import { gsap } from '../../components/ui/use-gsap'

// TODO(confirm): stages must match the real project process.
const STAGES = [
  { title: 'Survey', text: 'Assess site risks, layout, and protection needs.' },
  { title: 'Design', text: 'Plan compliant systems with technical specifications.' },
  { title: 'Supply and Installation', text: 'Deliver and install approved fire safety systems.' },
  { title: 'Testing and Commissioning', text: 'Verify performance before handover.' },
  { title: 'Maintenance (AMC)', text: 'Keep systems reliable through scheduled service.' },
]

export function ServiceLifecycle() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const path = root.querySelector<SVGPathElement>('#hse-sv-life-path')
    const token = root.querySelector<SVGCircleElement>('#hse-sv-life-token')
    const nodes = Array.from(root.querySelectorAll('.hse-sv-life__node'))
    const ctx = gsap.context(() => {
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 } })
      }
      if (token) gsap.fromTo(token, { opacity: 1 }, { opacity: 1, motionPath: { path: '#hse-sv-life-path', align: '#hse-sv-life-path', alignOrigin: [0.5, 0.5] }, ease: 'none', scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 } })
      nodes.forEach((n) => gsap.fromTo(n, { opacity: 1, y: 14 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false, clearProps: 'opacity,transform', scrollTrigger: { trigger: n, start: 'top 85%' } }))
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="hse-sv-life" data-surface="brand" aria-labelledby="hse-sv-life-title">
      <div className="container">
        <div className="hse-sv-section-head hse-sv-section-head--brand">
          <p className="hse-sv-kicker">Process</p>
          <h2 id="hse-sv-life-title">How a Project Runs</h2>
          {/* TODO(confirm): confirm stage names and descriptions match real delivery process. */}
        </div>
        <div className="hse-sv-life__viz">
          <svg viewBox="0 0 1100 220" className="hse-sv-life__svg" aria-hidden="true">
            <defs><linearGradient id="hse-sv-flame" x1="0" x2="1"><stop offset="0" stopColor="rgba(255,255,255,.55)"/><stop offset=".55" stopColor="rgba(255,156,96,.95)"/><stop offset="1" stopColor="rgba(229,57,53,.95)"/></linearGradient></defs>
            <path id="hse-sv-life-path" d="M40,150 L250,70 L460,150 L670,70 L880,150 L1060,110" stroke="url(#hse-sv-flame)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle id="hse-sv-life-token" r="7" fill="rgba(255,156,96,1)" />
          </svg>
          <div className="hse-sv-life__nodes">
            {STAGES.map((s, i) => (
              <article key={s.title} className="hse-sv-life__node" style={{ ['--i' as any]: i }}>
                <span className="hse-sv-life__dot" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


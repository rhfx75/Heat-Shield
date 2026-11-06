import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { rsc } from '../../data/rsc'

gsap.registerPlugin(ScrollTrigger)

export default function AboutProcess() {
  const root = useRef<HTMLElement>(null)
  const markerRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>('.hse-ab-process-line')
      const marker = markerRef.current

      if (!reduce && path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        })
      }

      rsc.process.steps.forEach((step) => {
        const node = el.querySelector(`[data-step="${step.number}"]`)
        if (!node) return
        gsap.fromTo(node, { y: 20, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          immediateRender: false,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      if (!reduce && fine && path && marker) {
        try {
          gsap.to(marker, {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 4,
            repeat: -1,
            ease: 'none',
            immediateRender: false,
          })
        } catch {}
      }
    }, el)

    return () => { ctx.revert() }
  }, [])

  if (!rsc.process) return null

  return (
    <section id="about-process" className="hse-ab-section" data-surface="brand" ref={root} aria-labelledby="about-process-title">
      <div className="hse-ab-container">
        <h2 id="about-process-title" className="hse-ab-h2">{rsc.process.title}</h2>
        <p className="hse-ab-lead" style={{ maxWidth: 860, marginBottom: 32 }}>{rsc.process.intro}</p>

        <div style={{ position: 'relative', display: 'grid', gap: 32 }}>
          <svg
            className="hse-ab-process-path"
            viewBox="0 0 600 560"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto', maxHeight: '560px', pointerEvents: 'none', display: 'block' }}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <marker id="hse-ab-flame" markerWidth="24" markerHeight="24" refX="12" refY="12" orient="auto">
                <path d="M12 2 Q6 2 4 4 Q2 6 2 12 Q2 18 6 20 Q12 22 18 20 Q22 18 22 12 Q22 6 20 4 Q18 2 12 2 Z" fill="#ffb300" stroke="#ff3d00" strokeWidth="1.5" />
              </marker>
            </defs>
            <path className="hse-ab-process-line" d="M100 100 L500 100 L100 260 L500 260 L100 420 L500 420" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="3" strokeLinecap="round" />
            <circle ref={markerRef} cx="100" cy="100" r="9" fill="#ffb300" stroke="#ff3d00" strokeWidth="2" />
          </svg>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {rsc.process.steps.map((step, i) => {
              const col = i % 2 === 0 ? 'left' : 'right'
              return (
                <li
                  key={step.number}
                  data-step={step.number}
                  style={{
                    listStyle: 'none',
                    background: 'rgba(255,255,255,.10)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,.25)',
                    borderRadius: 18,
                    padding: 20,
                    position: 'relative',
                    color: '#fff',
                  }}
                >
                  <div style={{ position: 'absolute', top: -14, left: col === 'left' ? '20px' : 'auto', right: col === 'right' ? '20px' : 'auto' }}>
                    <span style={{ background: 'var(--color-hse-red)', color: '#fff', borderRadius: 999, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 1rem/1 Montserrat,Inter,sans-serif', boxShadow: '0 4px 12px rgba(229,57,53,.4)' }}>{step.number}</span>
                  </div>
                  <h3 className="hse-ab-h3" style={{ color: '#fff', margin: '10px 0 6px', marginTop: 18 }}>{step.title}</h3>
                  <p className="hse-ab-body" style={{ color: 'rgba(255,255,255,.92)', margin: 0 }}>{step.text}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVisibilityFallback } from './useVisibilityFallback'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { title: 'Site-Specific Design', text: 'Solutions tailored to your facility layout, risk profile, and applicable fire safety codes.', key: 'design' },
  { title: 'Qualified Professionals', text: 'Engineers and technicians trained in modern fire protection and electrical safety practices.', key: 'team' },
  { title: 'Responsive Support', text: 'After-sales maintenance and rapid response to keep your systems operational year-round.', key: 'support' },
]

function Graphic({ active }: { active: string }) {
  const common = 'hse-ab-commit-graphic__state'
  return (
    <svg viewBox="0 0 360 300" className="hse-ab-commit-graphic" aria-hidden="true">
      <rect x="10" y="10" width="340" height="280" rx="16" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)" />
      <g className={common} style={{ opacity: active === 'design' ? 1 : 0.08 }}>
        <path d="M40 50h280v200H40Z M40 120h280 M140 50v200 M240 120v130" fill="none" stroke="rgba(255,255,255,.5)" />
        <rect x="52" y="62" width="76" height="46" fill="rgba(255,90,82,.28)" /><rect x="152" y="132" width="76" height="46" fill="rgba(255,90,82,.22)" /><rect x="252" y="132" width="56" height="106" fill="rgba(43,127,230,.22)" />
      </g>
      <g className={common} style={{ opacity: active === 'team' ? 1 : 0.08 }}>
        <path d="M180 58 118 84v58c0 42 26 70 62 86 36-16 62-44 62-86V84l-62-26Z" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.65)" strokeWidth="2" />
        <circle cx="180" cy="150" r="56" fill="none" stroke="rgba(255,255,255,.2)" strokeDasharray="4 8" />
        {[0,60,120,180,240,300].map((a)=><circle key={a} cx={180 + Math.cos(a*Math.PI/180)*56} cy={150 + Math.sin(a*Math.PI/180)*56} r="5" fill="#FF5A52" />)}
      </g>
      <g className={common} style={{ opacity: active === 'support' ? 1 : 0.08 }}>
        <circle cx="180" cy="150" r="78" fill="none" stroke="rgba(255,255,255,.35)" /><circle cx="180" cy="150" r="42" fill="none" stroke="rgba(255,255,255,.2)" />
        <path d="M180 150 180 88" stroke="#fff" strokeWidth="3" /><path d="M180 150 224 166" stroke="#FF5A52" strokeWidth="3" />
        <path d="M180 150 236 150 A56 56 0 0 0 180 94Z" fill="rgba(255,90,82,.18)" />
        {[ [210,110],[145,190],[228,186] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#fff" opacity={0.9-i*0.2} />)}
      </g>
    </svg>
  )
}

export default function AboutCommitment() {
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  const [active, setActive] = useState(ITEMS[0].key)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.hse-ab-glass')
      gsap.set(cards, { opacity: 1 })
      if (reduce) return
      started.current = true
      cards.forEach((card) => {
        ScrollTrigger.create({ trigger: card, start: 'top 62%', end: 'bottom 38%', onEnter: () => { setActive(card.dataset.key || ITEMS[0].key); card.classList.add('is-active') }, onEnterBack: () => { setActive(card.dataset.key || ITEMS[0].key); card.classList.add('is-active') }, onLeave: () => card.classList.remove('is-active'), onLeaveBack: () => card.classList.remove('is-active') })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  useVisibilityFallback(ref, started)

  return (
    <section ref={ref} className="hse-ab-section hse-ab-commit" data-surface="brand" aria-labelledby="ab-commit-title">
      <div className="hse-ab-container hse-ab-commit__grid">
        <div className="hse-ab-commit__sticky">
          <h2 id="ab-commit-title">Commitment to Safety & Quality</h2>
          <p>Every project is executed with uncompromising attention to safety standards and quality workmanship.</p>
          <Graphic active={active} />
          {/* TODO(real photo): Replace stock Unsplash image with an approved genuine company/project photograph when supplied. */}
        </div>
        <div className="hse-ab-commit__list">
          {ITEMS.map((item) => (
            <article key={item.key} data-key={item.key} className="hse-ab-glass" data-ab-animate>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`.hse-ab-commit{padding:96px 0}.hse-ab-commit__grid{display:grid;grid-template-columns:minmax(280px,.95fr) 1fr;gap:34px;align-items:start}.hse-ab-commit__sticky{position:sticky;top:120px}.hse-ab-commit h2{font-family:var(--font-heading);font-size:clamp(1.8rem,3vw,2.5rem);margin:0 0 12px}.hse-ab-commit__sticky p{margin:0 0 18px;color:rgba(255,255,255,.9);-webkit-text-fill-color:rgba(255,255,255,.9);line-height:1.7}.hse-ab-commit-graphic{width:100%;max-width:420px;height:auto;display:block}.hse-ab-commit-graphic__state{transition:opacity .35s ease}.hse-ab-commit__list{display:grid;gap:16px}.hse-ab-glass{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(12px);border-radius:18px;padding:24px;transition:border-color .25s ease,box-shadow .25s ease}.hse-ab-glass.is-active{border-color:rgba(255,90,82,.85);box-shadow:0 0 0 1px rgba(255,90,82,.25) inset}.hse-ab-glass h3{margin:0 0 8px;font-family:var(--font-heading);font-size:1.2rem;color:#fff;-webkit-text-fill-color:#fff}.hse-ab-glass p{margin:0;color:rgba(255,255,255,.88);-webkit-text-fill-color:rgba(255,255,255,.88);line-height:1.7}@media (max-width:900px){.hse-ab-commit{padding:64px 0}.hse-ab-commit__grid{grid-template-columns:1fr}.hse-ab-commit__sticky{position:relative;top:auto}}@media (prefers-reduced-motion: reduce){.hse-ab-commit-graphic__state,.hse-ab-glass{transition:none}}`}</style>
    </section>
  )
}

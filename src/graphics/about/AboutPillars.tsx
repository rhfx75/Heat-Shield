import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { useVisibilityFallback } from './useVisibilityFallback'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const PILLARS = [
  { n: '01', title: 'Our Mission', text: 'To deliver reliable, code-compliant fire safety and engineering solutions that protect lives, property, and critical infrastructure across Bangladesh.', icon: 'bolt' },
  { n: '02', title: 'Our Vision', text: 'To be the most trusted engineering partner for fire protection and safety systems, recognized for technical excellence and customer commitment.', icon: 'shield' },
  { n: '03', title: 'Our Approach', text: 'We combine professional engineering design, quality installation, and responsive after-sales support to ensure every system performs when it matters most.', icon: 'gear' },
]

function Icon({ kind }: { kind: string }) {
  if (kind === 'bolt') return <path className="hse-ab-draw" d="M28 6 12 30h12l-4 18 16-24H24l4-18Z" />
  if (kind === 'shield') return <><path className="hse-ab-draw" d="M24 6 9 12v13c0 11 6 18 15 23 9-5 15-12 15-23V12L24 6Z" /><path className="hse-ab-draw" d="m17 25 5 5 9-11" /></>
  return <><circle className="hse-ab-draw" cx="24" cy="24" r="8" /><path className="hse-ab-draw" d="M24 8v4m0 24v4M8 24h4m24 0h4m-6.3-13.7-2.8 2.8M15.1 32.9l-2.8 2.8m23.4 0-2.8-2.8M15.1 15.1l-2.8-2.8" /><path className="hse-ab-draw" d="m18 24 4 4 8-8" /></>
}

export default function AboutPillars() {
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.hse-ab-pillar')
      const dots = gsap.utils.toArray<HTMLElement>('.hse-ab-rail__dot')
      const fill = root.querySelector('.hse-ab-rail__fill') as HTMLElement | null
      const draws = root.querySelectorAll('.hse-ab-draw')
      gsap.set([cards, draws].flatMap((n: any) => n.length ? Array.from(n) : [n]), { opacity: 1 })
      if (reduce) return
      started.current = true
      if (!desktop) {
        gsap.fromTo(cards, { y: 24, opacity: 0.001 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out', immediateRender: false, clearProps: 'transform', scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
        return
      }
      gsap.set(cards.slice(1), { yPercent: 100 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: `+=${cards.length * 100}%`, pin: true, scrub: 0.8, anticipatePin: 1 } })
      cards.forEach((card, i) => {
        const at = i
        if (i > 0) tl.to(cards[i - 1], { scale: 0.94, yPercent: -4, opacity: 0.55, duration: 1 }, at).to(card, { yPercent: 0, duration: 1 }, at)
        tl.to(fill, { scaleY: (i + 1) / cards.length, duration: 1 }, at)
        tl.call(() => dots.forEach((d, j) => d.classList.toggle('is-active', j <= i)), [], at + 0.01)
      })
      cards.forEach((card, i) => {
        const paths = card.querySelectorAll('.hse-ab-draw')
        gsap.fromTo(paths, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, stagger: 0.08, immediateRender: false, scrollTrigger: { trigger: root, start: `top+=${i * window.innerHeight * 0.9} top`, once: true } })
        if (!coarse) {
          const onMove = (e: PointerEvent) => { const r = card.getBoundingClientRect(); const dx = (e.clientX - (r.left + r.width / 2)) / r.width; const dy = (e.clientY - (r.top + r.height / 2)) / r.height; gsap.to(card, { rotateY: dx * 6, rotateX: -dy * 6, duration: 0.35, overwrite: 'auto', transformPerspective: 900 }) }
          const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 })
          card.addEventListener('pointermove', onMove); card.addEventListener('pointerleave', onLeave)
        }
      })
    }, root)
    return () => ctx.revert()
  }, [])
  useVisibilityFallback(ref, started)

  return (
    <section ref={ref} className="hse-ab-section hse-ab-pillars" data-surface="light" aria-labelledby="ab-pillars-title">
      <div className="hse-ab-container hse-ab-pillars__inner">
        <div className="hse-ab-rail" aria-hidden="true"><span className="hse-ab-rail__line" /><span className="hse-ab-rail__fill" />{PILLARS.map((p, i) => <span key={p.n} className={`hse-ab-rail__dot${i === 0 ? ' is-active' : ''}`} />)}</div>
        <div className="hse-ab-stack-wrap">
          <h2 id="ab-pillars-title" className="hse-ab-sr">Mission, Vision and Approach</h2>
          <div className="hse-ab-stack">
            {PILLARS.map((p) => (
              <article key={p.title} className="hse-ab-pillar" data-ab-animate>
                <span className="hse-ab-pillar__num" aria-hidden="true">{p.n}</span>
                <svg className="hse-ab-pillar__icon" viewBox="0 0 48 48" fill="none" stroke="var(--ab-brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><Icon kind={p.icon} /></svg>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <style>{`.hse-ab-pillars{padding:96px 0}.hse-ab-pillars__inner{display:grid;grid-template-columns:54px 1fr;gap:24px;align-items:start}.hse-ab-rail{position:sticky;top:140px;height:220px;display:flex;flex-direction:column;align-items:center;justify-content:space-between}.hse-ab-rail__line,.hse-ab-rail__fill{position:absolute;left:50%;top:10px;bottom:10px;width:3px;transform:translateX(-50%);border-radius:999px}.hse-ab-rail__line{background:rgba(1,78,182,.15)}.hse-ab-rail__fill{background:linear-gradient(180deg,var(--ab-red),var(--ab-red-light));transform-origin:top;transform:translateX(-50%) scaleY(.333)}.hse-ab-rail__dot{width:12px;height:12px;border-radius:999px;background:#fff;border:2px solid rgba(1,78,182,.35);position:relative;z-index:1}.hse-ab-rail__dot.is-active{background:var(--ab-red);border-color:var(--ab-red)}.hse-ab-stack{position:relative;min-height:420px}.hse-ab-pillar{position:relative;background:#fff;color:var(--ab-brand);border-radius:20px;padding:34px;box-shadow:0 16px 40px rgba(1,78,182,.1);overflow:hidden}.hse-ab-pillar h3{margin:12px 0 10px;font-family:var(--font-heading);font-size:clamp(1.4rem,2.2vw,2rem);color:var(--ab-brand);-webkit-text-fill-color:var(--ab-brand)}.hse-ab-pillar p{margin:0;line-height:1.75;color:var(--hse-text-secondary);-webkit-text-fill-color:var(--hse-text-secondary)}.hse-ab-pillar__icon{width:54px;height:54px}.hse-ab-pillar__num{position:absolute;right:18px;top:8px;font-family:var(--font-heading);font-size:clamp(3.5rem,8vw,6rem);font-weight:800;color:rgba(1,78,182,.06);-webkit-text-fill-color:rgba(1,78,182,.06);line-height:1}.hse-ab-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}@media (min-width:1024px){.hse-ab-pillar{position:absolute;inset:0;height:420px}}@media (max-width:1023px){.hse-ab-pillars__inner{grid-template-columns:1fr}.hse-ab-rail{display:none}.hse-ab-stack{display:grid;gap:18px;min-height:0}.hse-ab-pillar{position:relative}}`}</style>
    </section>
  )
}

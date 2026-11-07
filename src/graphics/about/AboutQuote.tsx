import { COMPANY_LOGO, COMPANY_NAME } from '../../config/brandAssets'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVisibilityFallback } from './useVisibilityFallback'

gsap.registerPlugin(ScrollTrigger)

const QUOTE = 'Protecting lives and property through engineering excellence — one facility at a time.'
const MARQUEE = 'Fire Detection | Fire Protection | Utility Products | Sales | Installation | Maintenance'

export default function AboutQuote() {
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const words = root.querySelectorAll('.hse-ab-word')
      gsap.set(words, { opacity: 1, y: 0, clearProps: 'transform' })
      if (reduce) return
      started.current = true
      gsap.fromTo(words, { y: 6 }, { y: 0, stagger: 0.03, ease: 'none', immediateRender: false, clearProps: 'transform', scrollTrigger: { trigger: root, start: 'top 78%', end: 'bottom 58%', scrub: 0.5 } })
    }, root)
    return () => ctx.revert()
  }, [])
  useVisibilityFallback(ref, started)

  return (
    <section ref={ref} className="hse-ab-section hse-ab-quote" data-surface="dark" aria-labelledby="ab-quote-title">
      <div className="hse-ab-container hse-ab-quote__inner">
        <h2 id="ab-quote-title" className="hse-ab-sr">Quote</h2>
        <blockquote className="hse-ab-quote__text" data-ab-animate>
          {QUOTE.split(' ').map((w, i) => <span key={i} className="hse-ab-word">{w} </span>)}
        </blockquote>
        <div className="hse-ab-quote__badge" aria-hidden="true">
          <span className="hse-ab-quote__ring" />
          <img src={COMPANY_LOGO} alt="" width="88" height="88" loading="lazy" />
        </div>
        <p className="hse-ab-quote__loc">{COMPANY_NAME} — Dhaka, Bangladesh</p>
      </div>
      <div className="hse-ab-marquee" aria-label={MARQUEE}>
        <div className="hse-ab-marquee__track" aria-hidden="true">
          {[0, 1].map((k) => <span key={k} className="hse-ab-marquee__item">{MARQUEE.split('|').map((t, i) => <span key={i}>{t.trim()}<span className="hse-ab-marquee__flame"> </span></span>)}</span>)}
        </div>
      </div>
      <style>{`.hse-ab-quote{padding:104px 0 0}.hse-ab-quote__inner{text-align:center;max-width:1100px;margin:0 auto;padding-bottom:60px}.hse-ab-quote__text{margin:0;font-family:var(--font-heading);font-size:clamp(1.85rem,3.6vw,3.15rem);line-height:1.28;font-weight:700;color:#fff;-webkit-text-fill-color:#fff}.hse-ab-word{display:inline-block;opacity:1}.hse-ab-quote__badge{position:relative;width:136px;height:136px;margin:28px auto 12px;display:grid;place-items:center;border-radius:999px;background:rgba(255,255,255,.1)}.hse-ab-quote__ring{position:absolute;inset:6px;border:2px dashed rgba(255,255,255,.45);border-radius:999px;animation:hse-ab-ring 16s linear infinite}.hse-ab-quote__badge img{position:relative;width:94px;height:94px;object-fit:contain}.hse-ab-quote__loc{margin:0;color:rgba(255,255,255,.84);-webkit-text-fill-color:rgba(255,255,255,.84);font-size:clamp(1rem,1.15vw,1.12rem)}.hse-ab-marquee{overflow:hidden;border-top:1px solid rgba(255,255,255,.12);padding:16px 0;background:rgba(0,0,0,.12)}.hse-ab-marquee__track{display:flex;width:max-content;animation:hse-ab-marquee 28s linear infinite}.hse-ab-marquee:hover .hse-ab-marquee__track{animation-play-state:paused}.hse-ab-marquee__item{display:flex;gap:18px;padding-right:18px;font-family:var(--font-heading);font-weight:700;font-size:14px;letter-spacing:.05em;text-transform:uppercase;color:#fff;-webkit-text-fill-color:#fff}.hse-ab-marquee__flame::after{content:'•';color:#FF5A52;margin-left:18px}@keyframes hse-ab-marquee{to{transform:translateX(-50%)}}@keyframes hse-ab-ring{to{transform:rotate(360deg)}}@media (prefers-reduced-motion: reduce){.hse-ab-quote__ring,.hse-ab-marquee__track{animation:none}.hse-ab-word{opacity:1 !important;transform:none !important}}`}</style>
    </section>
  )
}

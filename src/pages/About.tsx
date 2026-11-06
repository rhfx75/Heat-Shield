import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../graphics/about/about-base.css'

const AboutHero = lazy(() => import('../graphics/about/AboutHero'))
const AboutIntro = lazy(() => import('../graphics/about/AboutIntro'))
const AboutServiceSection = lazy(() => import('../graphics/about/AboutServiceSection'))
const AboutProcess = lazy(() => import('../graphics/about/AboutProcess'))
const AboutWhy = lazy(() => import('../graphics/about/AboutWhy'))
const AboutDisclaimer = lazy(() => import('../graphics/about/AboutDisclaimer'))

gsap.registerPlugin(ScrollTrigger)

function Progress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = bar.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { el.style.transform = 'scaleX(1)'; return }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', immediateRender: false, scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.2 } })
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh).catch(() => {})
    const vis = window.setTimeout(() => { if (getComputedStyle(el).transform === 'none') el.style.transform = 'scaleX(1)' }, 1500)
    return () => { window.clearTimeout(vis); window.removeEventListener('load', refresh); ctx.revert() }
  }, [])
  return <div ref={bar} className="hse-ab-progress" aria-hidden="true" />
}

function SectionFallback() { return <div style={{ minHeight: 160 }} aria-hidden="true" /> }

export function About() {
  useEffect(() => {
    const prevTitle = document.title
    const desc = 'RSC Compliance & Technical Engineering Services. Heat Shield Engineering provides fire protection, fire detection and electrical safety engineering services to support Ready-Made Garment (RMG) factories in Bangladesh in meeting applicable RMG Sustainability Council (RSC) safety requirements.'
    document.title = 'About Us | Heat Shield Engineering'
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prevDesc = meta?.getAttribute('content') ?? null
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.setAttribute('content', desc)
    return () => { document.title = prevTitle; if (prevDesc !== null) meta?.setAttribute('content', prevDesc) }
  }, [])
  return (
    <div className="hse-ab-page">
      <Progress />
      <Suspense fallback={<SectionFallback />}><AboutHero /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutIntro /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutServiceSection index={0} /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutServiceSection index={1} /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutServiceSection index={2} /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutProcess /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutWhy /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutDisclaimer /></Suspense>
    </div>
  )
}

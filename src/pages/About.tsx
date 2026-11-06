import { Suspense, lazy, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../graphics/about/about-base.css'

const AboutHero = lazy(() => import('../graphics/about/AboutHero'))
const AboutWho = lazy(() => import('../graphics/about/AboutWho'))
const AboutPillars = lazy(() => import('../graphics/about/AboutPillars'))
const AboutCommitment = lazy(() => import('../graphics/about/AboutCommitment'))
const AboutProcess = lazy(() => import('../graphics/about/AboutProcess'))
const AboutQuote = lazy(() => import('../graphics/about/AboutQuote'))

gsap.registerPlugin(ScrollTrigger)

function Progress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = bar.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to(el, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.2 } })
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh).catch(() => {})
    return () => { window.removeEventListener('load', refresh); ctx.revert() }
  }, [])
  return <div ref={bar} className="hse-ab-progress" aria-hidden="true" />
}

function SectionFallback() {
  return <div style={{ minHeight: 220 }} aria-hidden="true" />
}

export function About() {
  return (
    <div className="hse-ab-page">
      <Progress />
      <Suspense fallback={<SectionFallback />}><AboutHero /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutWho /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutPillars /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutCommitment /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutProcess /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutQuote /></Suspense>
    </div>
  )
}

import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import HeroShieldAssemble from './HeroShieldAssemble'
import './about-base.css'
import './about-hero.css'

const HeatHaze = lazy(() => import('./HeatHaze'))
const HeroEmbers = lazy(() => import('./HeroEmbers'))

export default function AboutHero() {
  return (
    <section className="hse-ab-hero hse-ab-section" data-surface="brand" aria-labelledby="about-hero-title">
      <Suspense fallback={null}><HeatHaze /></Suspense>
      <div className="hse-ab-hero__scrim" aria-hidden="true" />
      <Suspense fallback={null}><HeroEmbers className="hse-ab-hero__embers" /></Suspense>
      <div className="hse-ab-container hse-ab-hero__inner">
        <div className="hse-ab-hero__copy">
          <nav className="hse-ab-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About Us</span>
          </nav>
          <h1 id="about-hero-title">About Us</h1>
          <p className="hse-ab-hero__subtitle">Engineering safety solutions built on reliability, innovation, and technical excellence.</p>
          <div className="hse-ab-scrollcue" aria-hidden="true">
            <span className="hse-ab-scrollcue__mouse"><span className="hse-ab-scrollcue__dot" /></span>
            <span>Scroll</span>
          </div>
        </div>
        <div className="hse-ab-hero__visual" aria-hidden="true">
          <HeroShieldAssemble />
        </div>
      </div>
    </section>
  )
}

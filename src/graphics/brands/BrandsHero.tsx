import { Link } from 'react-router-dom'
import './brands-base.css'

export default function BrandsHero({
  brandCount,
  projectCount,
}: {
  brandCount?: number
  projectCount?: number
}) {
  const brandsReady = typeof brandCount === 'number' && brandCount > 0
  const projectsReady = typeof projectCount === 'number' && projectCount >= 0
  return (
    <header className="hse-br-hero" data-surface="brand">
      <div className="hse-br-wrap hse-br-hero-layout">
        <div className="hse-br-hero-copy">
          <nav className="hse-br-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Brands</span>
          </nav>
          <span className="hse-br-pill">Our partners</span>
          <h1>
            Our <span className="hse-br-accent">technology partners</span>
          </h1>
          <p className="hse-br-sub">
            We source and install equipment from{' '}
            {brandsReady ? <strong>{brandCount}</strong> : <span className="hse-br-sub-skel" aria-hidden="true" />}
            {brandsReady ? ' ' : ' '}
            established fire safety and protection brands.
          </p>
          <div className="hse-br-stats" aria-label="Brand and project counts">
            <div className="hse-br-stat">
              <div className="hse-br-stat-value">{brandsReady ? brandCount : <span className="hse-br-sub-skel" aria-hidden="true" style={{ width: '2ch', height: '28px' }} />}</div>
              <div className="hse-br-stat-label">Brands</div>
            </div>
            <div className="hse-br-stat">
              <div className="hse-br-stat-value">{projectsReady ? projectCount : <span className="hse-br-sub-skel" aria-hidden="true" style={{ width: '2ch', height: '28px' }} />}</div>
              <div className="hse-br-stat-label">Projects</div>
            </div>
          </div>
        </div>
      </div>
      <svg className="hse-br-hero-curve" viewBox="0 0 1440 54" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0,0 C240,54 480,54 720,34 C960,14 1200,14 1440,42 L1440,54 L0,54 Z" fill="#f7f9fc" />
      </svg>
    </header>
  )
}

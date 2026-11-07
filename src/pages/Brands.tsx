import { brands } from '../data/brands'
import { products } from '../data/products'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '10+', label: 'Years' },
  { value: '29', label: 'Projects' },
]

export function Brands() {
  const brandCount = new Set(
    products.map((p) => p.brand?.toLowerCase().trim()).filter(Boolean)
  ).size

  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden brands-hero">
        <div className="absolute inset-0 z-[-2] brands-gradient-bg" />
        <svg className="brands-wave absolute bottom-[-1px] left-0 right-0 z-0" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 35 Q 360 0 720 35 T 1440 35 V70 H0 Z" fill="var(--hse-surface,#F7F9FC)" />
        </svg>

        <div className="relative z-10 container section pt-16 pb-24 text-center">
          <div className="brands-stat-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-stats">
            <div className="brands-stat-card">
              <div className="brands-stat-value">{brandCount}</div>
              <div className="brands-stat-label">Brands</div>
            </div>
            <div className="brands-stat-card">
              <div className="brands-stat-value">{STATS[0].value}</div>
              <div className="brands-stat-label">{STATS[0].label}</div>
            </div>
            <div className="brands-stat-card">
              <div className="brands-stat-value">{STATS[1].value}</div>
              <div className="brands-stat-label">{STATS[1].label}</div>
            </div>
          </div>
          <span className="brands-badge">OUR PARTNERS</span>
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">Our Technology Partners</h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Leading fire safety and protection brands we source and install.
          </p>
        </div>
      </section>

      <section className="bg-hse-surface">
        <div className="container section max-w-[1200px]">
          <div className="brands-hero-note">
            <div className="brands-hero-note-box">
              Brand logos shown are for illustrative purposes. HEAT SHIELD ENGINEERING does not claim authorized dealership or partnership unless confirmed.
            </div>
          </div>
          <div className="brands-back-link">
            <Link to="/" className="text-hse-primary font-semibold hover:text-hse-accent-orange transition-colors">
              ← Back to Home
            </Link>
          </div>

          <div className="brand-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((b) => (
              <article
                key={b.id}
                id={b.id}
                className="brand-card scroll-brand"
              >
                <div className="brand-logo-container">
                  <img src={b.image} alt={b.alt} className="brand-logo" loading="lazy" />
                </div>
                <h3 className="brand-name">{b.name}</h3>
                <p className="brand-description">{b.description}</p>
                <Link
                  to={`/products?brand=${b.id}`}
                  className="brand-view-products"
                  aria-label={`View ${b.name} products`}
                >
                  View Products
                  <span className="brand-arrow">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

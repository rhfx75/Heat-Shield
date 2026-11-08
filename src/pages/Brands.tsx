import { brands } from '../data/brands'
import { projects } from '../data/projects'
import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import BrandsHero from '../graphics/brands/BrandsHero'
import '../graphics/brands/brands-base.css'

const DISCLAIMER_TEXT = 'Brand logos shown are for illustrative purposes. HEAT SHIELD ENGINEERING does not claim authorized dealership or partnership unless confirmed.'

export function Brands() {
  return (
    <div className="hse-br-page">
      <BrandsHero brandCount={brands.length} projectCount={projects.length} />
      <section className="hse-br-wrap">
        <div className="hse-br-notice" role="note">
          <Info className="hse-br-notice-icon" size={18} aria-hidden="true" />
          <p>{DISCLAIMER_TEXT}</p>
        </div>
        <div className="hse-br-back">
          <Link to="/">← Back to Home</Link>
        </div>

        <div className="brand-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((b) => (
            <article key={b.id} id={b.id} className="brand-card scroll-brand">
              <div className="brand-logo-container">
                <img src={b.image} alt={b.alt} className="brand-logo" loading="lazy" />
              </div>
              <h3 className="brand-name">{b.name}</h3>
              <p className="brand-description">{b.description}</p>
              <Link to={`/products?brand=${b.id}`} className="brand-view-products" aria-label={`View ${b.name} products`}>
                View Products
                <span className="brand-arrow">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}


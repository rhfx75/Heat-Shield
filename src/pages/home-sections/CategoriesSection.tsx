import { Link } from 'react-router-dom'
import { products, productCategories } from '../../data/products'
import { SectionHeader } from './SectionHeader'
import { useReveal } from './useReveal'

const icons = [
  <svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><rect x="14" y="8" width="44" height="34" rx="4" stroke="#0b4fc4" strokeWidth="2"/><rect x="20" y="14" width="14" height="8" rx="1" fill="#0b4fc4" opacity=".2"/><circle cx="46" cy="18" r="3" fill="#e63a2e" opacity=".7"/><rect x="20" y="28" width="32" height="3" rx="1.5" fill="#0b4fc4" opacity=".25"/><path d="M26 42v6M46 42v6M18 48h36" stroke="#0b4fc4" strokeWidth="2" strokeLinecap="round"/></svg>,
  <svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><circle cx="36" cy="22" r="14" stroke="#0b4fc4" strokeWidth="2"/><path d="M36 14v8l5 4" stroke="#0b4fc4" strokeWidth="2" strokeLinecap="round"/><rect x="22" y="36" width="28" height="10" rx="3" stroke="#0b4fc4" strokeWidth="2"/><path d="M28 46v4M44 46v4" stroke="#0b4fc4" strokeWidth="2" strokeLinecap="round"/></svg>,
  <svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><rect x="26" y="8" width="20" height="34" rx="4" stroke="#0b4fc4" strokeWidth="2"/><path d="M36 14v8" stroke="#e63a2e" strokeWidth="2" strokeLinecap="round"/><circle cx="36" cy="28" r="3" fill="#0b4fc4" opacity=".25"/><rect x="22" y="42" width="28" height="6" rx="2" fill="#0b4fc4" opacity=".2"/></svg>,
  <svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><path d="M18 12h36v28H18z" stroke="#0b4fc4" strokeWidth="2" rx="3"/><path d="M18 20h36M30 12v28M42 12v28" stroke="#0b4fc4" strokeWidth="1.5" opacity=".45"/><path d="M24 44h24" stroke="#0b4fc4" strokeWidth="2" strokeLinecap="round"/></svg>,
  <svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><path d="M36 10l16 28H20z" stroke="#0b4fc4" strokeWidth="2" strokeLinejoin="round"/><path d="M36 22v8M36 34v.01" stroke="#e63a2e" strokeWidth="2.4" strokeLinecap="round"/></svg>,
]

export function CategoriesSection() {
  const { ref, shown } = useReveal<HTMLElement>()
  return (
    <section ref={ref} className="hs-section hs-section--white" aria-labelledby="hs-cat-title">
      <div className="hs-container">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`}><SectionHeader id="hs-cat-title" title="Browse by category" to="/products" linkLabel="View all products" /></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20}}>
          {productCategories.map((c, i) => {
            const count = products.filter(p => p.category === c.slug).length
            return (
              <Link key={c.slug} to={`/products?category=${encodeURIComponent(c.slug)}`} className={`hs-card hs-cat hs-focus hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: i + 1 }}>
                <div className="hs-cat__plate" aria-hidden="true">{icons[i % icons.length]}</div>
                <div className="hs-cat__body">
                  <h3>{c.label}</h3>
                  <p className="hs-cat__count">{count} products</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

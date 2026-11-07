import { products } from '../../data/products'
import { ProductCard } from '../../components/ProductCard'
import { SectionHeader } from './SectionHeader'
import { useReveal } from './useReveal'

export function FeaturedProducts() {
  const { ref, shown } = useReveal<HTMLElement>()
  const featured = products.filter(p => (p as any).featured)
  const list = (featured.length ? featured : products).slice(0, 4)
  return (
    <section ref={ref} className="hs-section hs-section--alt" aria-labelledby="hs-feat-title">
      <div className="hs-container">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`}><SectionHeader id="hs-feat-title" title="Featured products" to="/products" linkLabel="View all products" /></div>
        <div className="hs-grid4">
          {list.map((p, i) => (
            <div key={p.slug} className={`hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: i + 1, minWidth: 0 }}>
              <ProductCard slug={p.slug} name={p.name} category={p.category} brand={p.brand} model={p.model} shortDescription={p.shortDescription} image={p.image} availability={p.availability} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

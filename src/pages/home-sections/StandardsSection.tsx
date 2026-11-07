import { products } from '../../data/products'
import { useReveal } from './useReveal'

export function StandardsSection() {
  const { ref, shown } = useReveal<HTMLElement>()
  const standards = Array.from(new Set(products.flatMap(p => (p as any).certifications || []).filter(Boolean))).slice(0, 8)
  if (!standards.length) return null
  return (
    <section ref={ref} className="hs-section hs-section--white" style={{ padding: '56px 0' }} aria-labelledby="hs-standards-title">
      <div className={`hs-container hs-reveal ${shown ? 'is-shown' : ''}`}>
        <div className="hs-head" style={{ marginBottom: 18 }}>
          <div><div className="hs-head__bar" aria-hidden="true" /><h2 id="hs-standards-title">Standards our products meet</h2></div>
        </div>
        <div className="hs-badges" role="list" aria-label="Product standards found in product data">
          {standards.map(s => <span key={s} className="hs-badge" role="listitem">{s}</span>)}
        </div>
        <p className="hs-standards-note">Certification varies by product. Check each product page for details.</p>
      </div>
    </section>
  )
}

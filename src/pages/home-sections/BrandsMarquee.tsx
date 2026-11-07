import { Link } from 'react-router-dom'
import { brands } from '../../data/brands'
import { SectionHeader } from './SectionHeader'
import { useReveal } from './useReveal'

export function BrandsMarquee() {
  const { ref, shown } = useReveal<HTMLElement>()
  const list = [...brands, ...brands]
  const dur = Math.max(12, brands.length * 3)
  return (
    <section ref={ref} className="hs-section hs-section--white hs-brands" aria-labelledby="hs-brands-title">
      <div className="hs-container">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`}><SectionHeader id="hs-brands-title" title="Brands we supply" /></div>
        <div className={`hs-brands__mask hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: 1 }}>
          <div className="hs-brands__track" style={{ ['--dur' as any]: dur + 's' }}>
            {list.map((b, i) => (
              <Link key={b.id + '-' + i} to={`/brands/${b.id}`} className="hs-brand hs-focus" aria-label={b.name}>
                {b.image ? <img src={b.image} alt={b.name} width="140" height="36" loading="lazy" decoding="async" /> : b.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

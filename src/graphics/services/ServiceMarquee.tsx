import { brands } from '../../data/brands'

const TAGS = ['Fire Detection', 'Fire Protection', 'Utility Products', 'Sales', 'Installation', 'Maintenance']

export function ServiceMarquee() {
  return (
    <section className="hse-sv-marquee" data-surface="light" aria-label="Capabilities and brands">
      <div className="hse-sv-marquee__row">
        <div className="hse-sv-marquee__track" aria-hidden="true">
          {[...TAGS, ...TAGS].map((t, i) => <span key={`${t}-${i}`} className="hse-sv-pill">{t}</span>)}
        </div>
      </div>
      <div className="hse-sv-marquee__row hse-sv-marquee__row--brands">
        <div className="hse-sv-marquee__track hse-sv-marquee__track--reverse" aria-hidden="true">
          {[...brands, ...brands].map((b, i) => <span key={`${b.id}-${i}`} className="hse-sv-brandlogo"><img src={b.image} alt="" width="120" height="48" loading="lazy" /></span>)}
        </div>
        <ul className="hse-sv-marquee__static">
          {brands.map((b) => <li key={b.id}><img src={b.image} alt={b.alt} width="120" height="48" loading="lazy" /></li>)}
        </ul>
      </div>
    </section>
  )
}

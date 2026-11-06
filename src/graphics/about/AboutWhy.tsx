import { rsc } from '../../data/rsc'

export default function AboutWhy() {
  return (
    <section id="why-heat-shield" className="hse-ab-section" data-surface="light" aria-labelledby="about-why-title">
      <div className="hse-ab-container">
        <h2 id="about-why-title" className="hse-ab-h2">{rsc.whyChoose.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, marginTop: 18 }}>
          {rsc.whyChoose.points.map((point) => (
            <article key={point} style={{ background: 'var(--ab-blue-50)', border: '1px solid var(--ab-border)', borderRadius: 16, padding: '16px 16px 16px 44px', position: 'relative' }}>
              <span aria-hidden="true" style={{ position: 'absolute', left: 16, top: 16, width: 18, height: 18, borderRadius: 999, border: '2px solid var(--ab-blue)', color: 'var(--ab-blue)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700 }}>✓</span>
              <p className="hse-ab-body" style={{ margin: 0 }}>{point}</p>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: 22, borderRadius: 20, background: 'linear-gradient(135deg,var(--ab-blue),var(--ab-blue-light))', color: '#fff', display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <img src="/images/heatshield-logo.png" alt="" width="72" height="72" style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 999, background: 'rgba(255,255,255,.12)', padding: 8 }} />
          <div>
            <p style={{ margin: 0, font: '700 1.15rem/1.2 Montserrat,Inter,sans-serif', color: '#fff' }}>{rsc.whyChoose.signature}</p>
            <p style={{ margin: '8px 0 0', font: '500 1rem/1.5 Inter,system-ui,sans-serif', color: 'rgba(255,255,255,.9)' }}>{rsc.whyChoose.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { rsc } from '../../data/rsc'

// TODO(confirm): Confirm that this disclaimer reflects this company's actual legal position.
export default function AboutDisclaimer() {
  return (
    <section id="about-disclaimer" className="hse-ab-section" data-surface="pale" aria-labelledby="about-disclaimer-title" style={{ paddingTop: 28, paddingBottom: 28 }}>
      <div className="hse-ab-container">
        <div style={{ background: '#fff', border: '1px solid var(--ab-border)', borderLeft: '4px solid var(--ab-blue)', borderRadius: 16, padding: '18px 18px 18px 46px', position: 'relative' }}>
          <span aria-hidden="true" style={{ position: 'absolute', left: 16, top: 18, width: 20, height: 20, borderRadius: 999, background: 'var(--ab-blue-pale)', color: 'var(--ab-blue)', display: 'grid', placeItems: 'center', font: '700 12px/1 Inter,sans-serif' }}>i</span>
          <h2 id="about-disclaimer-title" className="hse-ab-sr">Disclaimer</h2>
          <p className="hse-ab-body" style={{ margin: 0 }}>{rsc.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}

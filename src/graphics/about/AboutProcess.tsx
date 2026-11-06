import { rsc } from '../../data/rsc'

export default function AboutProcess() {
  return (
    <section id="about-process" className="hse-ab-section" data-surface="brand" aria-labelledby="about-process-title">
      <div className="hse-ab-container">
        <h2 id="about-process-title" className="hse-ab-h2" style={{ color: '#fff' }}>{rsc.process.title}</h2>
        <p className="hse-ab-lead" style={{ color: 'rgba(255,255,255,.92)', maxWidth: 860, marginBottom: 22 }}>{rsc.process.intro}</p>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {rsc.process.steps.map((step) => (
            <li key={step.number} style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.24)', borderRadius: 18, padding: 18, color: '#fff' }}>
              <p style={{ margin: '0 0 8px', font: '700 1.8rem/1 Montserrat,Inter,sans-serif', color: '#ffd7d6' }}>{step.number}</p>
              <h3 className="hse-ab-h3" style={{ color: '#fff', marginBottom: 8 }}>{step.title}</h3>
              <p className="hse-ab-body" style={{ color: 'rgba(255,255,255,.92)', margin: 0 }}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

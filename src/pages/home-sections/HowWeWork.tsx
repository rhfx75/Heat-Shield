import { SectionHeader } from './SectionHeader'
import { useReveal } from './useReveal'
const steps = [
  { n: '1', title: 'Consult', text: 'We learn about your site and what needs protecting.' },
  { n: '2', title: 'Supply', text: 'We recommend and supply the right equipment.' },
  { n: '3', title: 'Install and commission', text: 'Fitting, testing and handover.' },
  { n: '4', title: 'Maintain', text: 'Regular servicing and support after handover.' },
]
export function HowWeWork() {
  const { ref, shown } = useReveal<HTMLElement>()
  return (
    <section ref={ref} className="hs-section hs-section--alt" aria-labelledby="hs-how-title">
      <div className="hs-container">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`}><SectionHeader id="hs-how-title" title="How we work" /></div>
        <div className="hs-steps">
          {steps.map((s, i) => (
            <div key={s.n} className={`hs-step hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: i + 1 }}>
              <div className="hs-step__top"><span className="hs-step__num" aria-hidden="true">{s.n}</span><span className="hs-step__line" aria-hidden="true" /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

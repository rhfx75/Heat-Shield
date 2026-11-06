import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { whatsappLink } from '../../data/company'

type Facility = 'Factory' | 'Commercial building' | 'Warehouse' | 'Residential / Other'
type Need = 'New system' | 'Upgrade' | 'Inspection or maintenance'

// TODO(confirm): matching rules are simple heuristics; business should verify mappings.
function matchServices(facility: Facility, need: Need) {
  let cats: string[] = ['Fire Protection', 'Detection & Alarm']
  if (need === 'Inspection or maintenance') cats = ['Maintenance']
  if (need === 'Upgrade') cats = ['Fire Protection', 'Detection & Alarm', 'Electrical Safety']
  if (facility === 'Factory' || facility === 'Warehouse') cats = Array.from(new Set([...cats, 'Fire Protection']))
  const ids = services.filter((s) => cats.includes(s.category)).map((s) => s.id)
  return services.filter((s) => ids.includes(s.id)).slice(0, 4)
}

export function ServiceFinder() {
  const [step, setStep] = useState(1)
  const [facility, setFacility] = useState<Facility | ''>('')
  const [need, setNeed] = useState<Need | ''>('')
  const matches = useMemo(() => (facility && need ? matchServices(facility, need) : []), [facility, need])
  const msg = `Hello, I would like to request a quote. Facility: ${facility || 'N/A'}. Need: ${need || 'N/A'}.`

  return (
    <section className="hse-sv-finder" data-surface="light" aria-labelledby="hse-sv-finder-title">
      <div className="container">
        <div className="hse-sv-section-head">
          <p className="hse-sv-kicker">Guide</p>
          <h2 id="hse-sv-finder-title">Find Your Service</h2>
        </div>
        <div className="hse-sv-progress" aria-hidden="true"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
        <div className="hse-sv-finder__panel">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 1, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: -12 }} transition={{ duration: 0.2 }}>
                <h3>1. Facility type</h3>
                <div className="hse-sv-options">{(['Factory','Commercial building','Warehouse','Residential / Other'] as Facility[]).map((o) => (
                  <button key={o} type="button" className="hse-sv-option" aria-pressed={facility===o} onClick={() => { setFacility(o); setStep(2) }}>{o}</button>
                ))}</div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 1, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: -12 }} transition={{ duration: 0.2 }}>
                <h3>2. What you need</h3>
                <div className="hse-sv-options">{(['New system','Upgrade','Inspection or maintenance'] as Need[]).map((o) => (
                  <button key={o} type="button" className="hse-sv-option" aria-pressed={need===o} onClick={() => { setNeed(o); setStep(3) }}>{o}</button>
                ))}</div>
                <button type="button" className="hse-sv-linkbtn" onClick={() => setStep(1)}>Back</button>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 1, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: -12 }} transition={{ duration: 0.2 }}>
                <h3>3. Suggested services</h3>
                <p className="hse-sv-finder__summary">{facility} · {need}</p>
                <div className="hse-sv-matchchips">
                  {matches.map((s) => <Link key={s.id} to={`/services/${s.id}`} className="hse-sv-matchchip">{s.title}</Link>)}
                </div>
                <div className="hse-sv-finder__actions">
                  <Link to="/contact" className="hse-sv-btn hse-sv-btn--quote" data-surface="dark">Request a Quote</Link>
                  <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className="hse-sv-btn hse-sv-btn--wa" data-surface="dark">WhatsApp</a>
                  <button type="button" className="hse-sv-linkbtn" onClick={() => { setStep(1); setFacility(''); setNeed('') }}>Start over</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { SectionHeader } from './SectionHeader'
import { useReveal } from './useReveal'

export function ProjectsPreview() {
  const { ref, shown } = useReveal<HTMLElement>()
  if (!projects.length) return null // TODO: add project tiles when verified project data/media is available
  const list = projects.slice(0, 3)
  return (
    <section ref={ref} className="hs-section hs-section--alt" aria-labelledby="hs-projects-title">
      <div className="hs-container">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`}><SectionHeader id="hs-projects-title" title="Recent projects" to="/projects" linkLabel="View all projects" /></div>
        <div className="hs-grid3">
          {list.map((p, i) => (
            <Link key={p.id} to={`/projects/${p.id}`} className={`hs-card hs-proj hs-focus hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: i + 1 }}>
              <div className="hs-proj__img"><img src={p.image} alt={p.name} width="640" height="400" loading="lazy" decoding="async" /></div>
              <div className="hs-proj__body">
                <h3>{p.name}</h3>
                <p className="hs-proj__meta">{[p.category, p.location].filter(Boolean).join(' · ')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

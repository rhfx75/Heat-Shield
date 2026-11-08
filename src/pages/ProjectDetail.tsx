import { useParams, Link } from 'react-router-dom'
import { useState, type SyntheticEvent } from 'react'
import { Building, CheckCircle, ArrowRight, MapPin, Cog } from 'lucide-react'
import { getProjectById } from '../data/projects'
import { getBrandById } from '../data/brands'
import '../graphics/projects/project-detail-base.css'

const CATEGORY_ICONS: Record<string, string> = {
  'Industrial Facility': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18v7H3zm0-1h18l-2-2H5z"/><path d="M5 8h14v2H5z"/><path d="M5 13h2v4H5zm4 0h2v4H9zm4 0h2v4h-2zm4 0h2v4h-2z"/></svg>`,
  'Commercial Building': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18v14H3z"/><path d="M7 8h2v3H7zM11 8h2v3h-2zM15 8h2v3h-2z"/><path d="M10 14h2v2h-2zM14 14h2v2h-2z"/></svg>`,
  'Healthcare Facility': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 0 6 4v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6c2-4 6-4 6-4z"/><path d="M12 10v6M9 13h6"/></svg>`,
  'Educational Institution': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M6 7v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><path d="M12 3v5"/></svg>`,
  'Manufacturing': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 20v4M4.93 4.93l2.83 2.83M18.24 18.24l2.83 2.83M4.93 19.07l2.83-2.83M18.24 5.76l2.83-2.83"/><path d="M7.34 7.34l2.12 2.12M16.66 16.66l2.12 2.12M7.34 16.66l2.12-2.12M16.66 7.34l2.12-2.12"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c1.5 3 4 5 10 5s8.5-2 10-5c0-4-4.5-7-8-7S5 9 5 13z"/></svg>`,
}

function imgError(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget
  if (t.dataset.broken === '1') return
  t.dataset.broken = '1'
  t.style.display = 'none'
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [heroImageFailed, setHeroImageFailed] = useState(false)
  const [galleryFailed, setGalleryFailed] = useState<Set<number>>(new Set())
  const [relatedFailed, setRelatedFailed] = useState<Set<string>>(new Set())
  const project = getProjectById(id ?? '')

  if (!project) {
    return (
      <div className="hse-pd-page">
        <div className="hse-pd-wrap hse-pd-empty">
          <h1>Project not found</h1>
          <Link to="/projects">Back to projects</Link>
        </div>
      </div>
    )
  }

  const relatedProjects = project.related.map((rid) => getProjectById(rid)).filter((p): p is NonNullable<typeof p> => !!p)
  const fallbackIcon = CATEGORY_ICONS[project.category] || CATEGORY_ICONS.default

  return (
    <div>
      <header className="hse-pd-hero" data-surface="brand">
        <div className="hse-pd-hero-media" aria-hidden="true">
          {heroImageFailed ? (
            <div className="card-img--fallback">
              <div className="card-img--icon" dangerouslySetInnerHTML={{ __html: fallbackIcon }} />
              <div className="card-img--bottom-gradient" />
            </div>
          ) : (
            <img src={project.image} alt="" loading="eager" decoding="async" fetchPriority="high" onError={() => setHeroImageFailed(true)} />
          )}
        </div>
        <div className="hse-pd-hero-scrim" aria-hidden="true" />
        <div className="hse-pd-wrap hse-pd-hero-inner">
          <nav className="hse-pd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span>
            <Link to="/projects">Projects</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{project.name}</span>
          </nav>
          <span className="hse-pd-cat">{project.category}</span>
          <h1>{project.name}</h1>
          <div className="hse-pd-meta">
            <span className="hse-pd-chip"><MapPin size={15} aria-hidden="true" /><strong>Location</strong> {project.location}</span>
            <span className="hse-pd-chip"><Cog size={15} aria-hidden="true" /><strong>System</strong> {project.system}</span>
          </div>
          <p className="hse-pd-lead">{project.overview}</p>
        </div>
        <svg className="hse-pd-hero-curve" viewBox="0 0 1440 54" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0,0 C240,54 480,54 720,34 C960,14 1200,14 1440,42 L1440,54 L0,54 Z" fill="#f7f9fc" />
        </svg>
      </header>

      <section className="hse-pd-page">
        <div className="hse-pd-wrap">
          <div className="hse-pd-layout">
            <div className="hse-pd-main">
              <article className="hse-pd-card">
                <div className="hse-pd-head"><span className="hse-pd-head-bar" aria-hidden="true" /><h2>Project overview</h2></div>
                <p className="hse-pd-prose">{project.overview}</p>
              </article>

              <article className="hse-pd-card">
                <h3>Scope of work</h3>
                <ul className="hse-pd-list">
                  {project.scope.map((s, i) => (
                    <li key={i}><CheckCircle aria-hidden="true" /><span>{s}</span></li>
                  ))}
                </ul>
              </article>

              <article className="hse-pd-card">
                <h3>Systems supplied and installed</h3>
                <div className="hse-pd-tags">
                  {project.systems.map((sys) => <span key={sys} className="hse-pd-tag">{sys}</span>)}
                </div>
              </article>

              {project.brands.length > 0 ? (
                <article className="hse-pd-card">
                  <h3>Brands used in this project</h3>
                  <div className="hse-pd-brands">
                    {project.brands.map((brandId) => {
                      const brand = getBrandById(brandId)
                      if (!brand) return null
                      return (
                        <Link key={brand.id} to={`/brands/${brand.id}`} className="hse-pd-brand">
                          <div className="hse-pd-brand-logo"><img src={brand.image} alt={brand.alt} loading="lazy" decoding="async" onError={imgError} /></div>
                          <h4>{brand.name}</h4>
                          {brand.description ? <p>{brand.description}</p> : null}
                          <span>View brand <ArrowRight size={11} aria-hidden="true" style={{ verticalAlign: 'middle' }} /></span>
                        </Link>
                      )
                    })}
                  </div>
                </article>
              ) : null}

              <article className="hse-pd-card">
                <h3>Project gallery</h3>
                <div className="hse-pd-gallery">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="hse-pd-shot">
                      {galleryFailed.has(i) ? (
                        <div className="card-img--fallback"><div className="card-img--icon" dangerouslySetInnerHTML={{ __html: fallbackIcon }} /></div>
                      ) : (
                        <img src={img} alt={`${project.name} gallery image ${i + 1}`} loading="lazy" decoding="async" width="400" height="400" onError={() => setGalleryFailed((prev) => new Set(prev).add(i))} />
                      )}
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <aside className="hse-pd-side">
              <div className="hse-pd-card">
                <h3><Building size={18} aria-hidden="true" style={{ verticalAlign: 'text-bottom', color: '#e53935', marginRight: 8 }} />Project information</h3>
                <dl className="hse-pd-info">
                  <div><dt>Client / project</dt><dd>{project.name}</dd></div>
                  <div><dt>Location</dt><dd>{project.location}</dd></div>
                  <div><dt>Category</dt><dd>{project.category}</dd></div>
                  <div><dt>System installed</dt><dd>{project.system}</dd></div>
                </dl>
              </div>
              <div className="hse-pd-card hse-pd-cta">
                <h3>Need a similar solution?</h3>
                <p>Discuss your project requirements with our engineering team.</p>
                <Link to="/contact" className="hse-pd-cta-btn">Request a consultation</Link>
              </div>
            </aside>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="hse-pd-related">
              <div className="hse-pd-head"><span className="hse-pd-head-bar" aria-hidden="true" /><h2>Related projects</h2></div>
              <div className="hse-pd-related-grid">
                {relatedProjects.map((p) => (
                  <Link key={p.id} to={`/projects/${p.id}`} className="hse-pd-related-card">
                    <div className="hse-pd-related-shot">
                      {relatedFailed.has(p.id) ? (
                        <div className="card-img--fallback"><div className="card-img--icon" dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[p.category] || CATEGORY_ICONS.default }} /></div>
                      ) : (
                        <img src={p.image} alt="" loading="lazy" decoding="async" width="640" height="320" onError={() => setRelatedFailed((prev) => new Set(prev).add(p.id))} />
                      )}
                    </div>
                    <h4>{p.name}</h4>
                    <p>{p.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

import { type SyntheticEvent, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../../config/contact'
import { projects, type Project } from '../../data/projects'
import './projects-base.css'

export const PROJECT_CATEGORIES = ['All Projects', 'Industrial Facility', 'Commercial Building', 'Healthcare Facility', 'Educational Institution', 'Manufacturing'] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget
  if (t.dataset.broken === '1') return
  t.dataset.broken = '1'
  t.onerror = null
  t.style.visibility = 'hidden'
}

function districtOf(location: string): string {
  const t = location.toLowerCase()
  if (/chattogram|cepz/.test(t)) return 'Chattogram'
  if (/narayanganj|siddhir|fatulla|adamjee epz/.test(t)) return 'Narayanganj'
  if (/dhaka|gulshan/.test(t)) return 'Dhaka'
  if (/gazipur|kashimpur|tong[iy]|kaliakoir|konabari|mogarkhal|sreepur|gilarchala|mawna|gazipura|chandra|national university|ozharpara|nilnagar|ambagh/.test(t)) return 'Gazipur'
  return ''
}

function locationLabel(p: Project): string {
  const d = districtOf(p.location)
  if (d) return d
  const parts = p.location.split(',').map((s) => s.trim()).filter(Boolean)
  return parts[parts.length - 1] || p.location
}

const STACK_IDS = ['fakir-eco-knitwears', 'la-vista-rooftop-restaurant', 'united-hospital-limited']
const YEARS_ACTIVE = '10+' // hard-coded constant (existing Projects hero); not derived from project data

export default function ProjectsHero({
  category,
  onSelectCategory,
  loading,
  error,
  onRetry,
}: {
  category: ProjectCategory
  onSelectCategory: (v: ProjectCategory) => void
  loading?: boolean
  error?: boolean
  onRetry?: () => void
}) {
  const stats = useMemo(() => {
    const districts = new Set(projects.map((p) => districtOf(p.location)).filter(Boolean))
    return { projects: projects.length, districts: districts.size, years: YEARS_ACTIVE }
  }, [])

  const stack = useMemo(() => {
    const byId = new Map(projects.map((p) => [p.id, p]))
    return STACK_IDS.map((id) => byId.get(id)).filter((p): p is Project => !!p && !!p.image).slice(0, 3)
  }, [])

  return (
    <header className="hse-pj-hero" data-surface="brand">
      <div className="hse-pj-wrap hse-pj-hero-layout">
        <div className="hse-pj-hero-copy">
          <nav className="hse-pj-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Projects</span>
          </nav>
          <h1>
            Projects that <span className="hse-pj-hero-accent">keep buildings safe</span>
          </h1>
          {error ? (
            <div className="hse-pj-error" role="alert">
              <p>We couldn&apos;t load the project list. Please try again.</p>
              {onRetry ? <button type="button" className="hse-pj-retry" onClick={onRetry}>Retry</button> : null}
            </div>
          ) : loading ? (
            <div className="hse-pj-sub-skel" aria-hidden="true"><span /><span /></div>
          ) : (
            <p className="hse-pj-hero-sub">
              <strong>{stats.projects}</strong> completed projects across <strong>{stats.districts}</strong> districts in Bangladesh over <strong>{stats.years}</strong>.
            </p>
          )}
          {!error ? (
            <div className="hse-pj-hero-chips" aria-label="Project sectors">
              {loading ? (
                <><span className="hse-pj-chip-skel" /><span className="hse-pj-chip-skel" /><span className="hse-pj-chip-skel" /></>
              ) : (
                PROJECT_CATEGORIES.map((c) => (
                  <button key={c} type="button" className={`hse-pj-hero-chip${category === c ? ' is-on' : ''}`} onClick={() => onSelectCategory(c)}>
                    {c}
                  </button>
                ))
              )}
            </div>
          ) : null}
          <p className="hse-pj-hero-help">
            Looking for a similar project? <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>
          </p>
        </div>

        <div className="hse-pj-hero-art" aria-hidden="true">
          <span className="hse-pj-ripple hse-pj-ripple--1" />
          <span className="hse-pj-ripple hse-pj-ripple--2" />
          <span className="hse-pj-ripple hse-pj-ripple--3" />
          <span className="hse-pj-dash-ring" />
          <div className="hse-pj-stack">
            {stack.map((p, i) => (
              <div key={p.id} className={`hse-pj-card hse-pj-card--${i + 1}`}>
                <img src={p.image} alt="" loading="eager" decoding="async" fetchPriority="low" width="190" height="230" onError={onImgError} />
                <span className="hse-pj-card-label">{p.category} · {locationLabel(p)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg className="hse-pj-hero-curve" viewBox="0 0 1440 54" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0,0 C240,54 480,54 720,34 C960,14 1200,14 1440,42 L1440,54 L0,54 Z" fill="#f7f9fc" />
      </svg>
    </header>
  )
}

import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getProjectById } from '../data/projects'
import { getBrandById } from '../data/brands'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { Building, CheckCircle, ArrowRight, Image } from 'lucide-react'

const CATEGORY_ICONS: Record<string, string> = {
  'Industrial Facility': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18v7H3zm0-1h18l-2-2H5z"/><path d="M5 8h14v2H5z"/><path d="M5 13h2v4H5zm4 0h2v4H9zm4 0h2v4h-2zm4 0h2v4h-2z"/></svg>`,
  'Commercial Building': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18v14H3z"/><path d="M7 8h2v3H7zM11 8h2v3h-2zM15 8h2v3h-2z"/><path d="M10 14h2v2h-2zM14 14h2v2h-2z"/></svg>`,
  'Healthcare Facility': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 0 6 4v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6c2-4 6-4 6-4z"/><path d="M12 10v6M9 13h6"/></svg>`,
  'Educational Institution': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M6 7v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><path d="M12 3v5"/></svg>`,
  'Manufacturing': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 20v4M4.93 4.93l2.83 2.83M18.24 18.24l2.83 2.83M4.93 19.07l2.83-2.83M18.24 5.76l2.83-2.83"/><path d="M7.34 7.34l2.12 2.12M16.66 16.66l2.12 2.12M7.34 16.66l2.12-2.12M16.66 7.34l2.12-2.12"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c1.5 3 4 5 10 5s8.5-2 10-5c0-4-4.5-7-8-7S5 9 5 13z"/></svg>`,
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [heroImageFailed, setHeroImageFailed] = useState(false)
  const [galleryFailed, setGalleryFailed] = useState<Set<number>>(new Set())
  const [relatedFailed, setRelatedFailed] = useState<Set<string>>(new Set())
  const project = getProjectById(id ?? '')

  if (!project) {
    return (
      <div className="container section text-center py-24">
        <h1 className="text-2xl font-bold text-hse-primary mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-hse-red hover:underline">
            Back to Projects
          </Link>
      </div>
    )
  }

  const relatedProjects = project.related.map((rid) => getProjectById(rid)).filter(Boolean)

  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden project-detail-hero hero">
        <div className="absolute inset-0 z-[-2]">
          {heroImageFailed ? (
            <div className="card-img--fallback">
              <div className="card-img--icon" dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[project.category] || CATEGORY_ICONS.default }} />
              <div className="card-img--bottom-gradient" />
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover project-hero-image"
              loading="lazy"
              onError={() => setHeroImageFailed(true)}
            />
          )}
        </div>
        <div className="absolute inset-0 z-[-1] project-detail-overlay" />
        <div className="absolute inset-0 z-[-1] project-detail-grid" />

        <svg className="project-detail-wave absolute bottom-[-1px] left-0 right-0 z-0" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0 30 Q 360 0 720 30 T 1440 30 V60 H0 Z" fill="var(--hse-surface,#F7F9FC)" />
        </svg>

        <div className="relative z-10 container section pt-[calc(var(--header-h)+64px)] pb-24 text-center">
          <Link to="/projects" className="project-back-link">
            ← Back to Projects
          </Link>
          <span className="project-category-badge">{project.category}</span>
          <h1 className="project-detail-title">{project.name}</h1>
          <div className="project-meta-chips">
            <span className="project-meta-chip">
              <span className="project-meta-icon">📍</span>
              {project.location}
            </span>
            <span className="project-meta-chip">
              <span className="project-meta-icon">⚙️</span>
              {project.system}
            </span>
          </div>
          <p className="project-detail-description">{project.overview}</p>
        </div>
      </section>

      <section className="relative bg-hse-surface project-detail-content">
        <div className="absolute inset-0 z-[-1] project-detail-portal-glow" />

        <div className="container section">
          <div className="project-detail-layout grid lg:grid-cols-[2fr_1fr] gap-32">
            <div className="project-detail-main space-y-10">
              <div className="project-overview-section">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[4px] bg-[#E53935] rounded-full" />
                  <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-hse-deep-forest">Project Overview</h2>
                </div>
                <p className="text-hse-muted text-lg leading-relaxed mb-6">{project.overview}</p>

                <div className="project-scope-card p-6 rounded-[20px] border border-hse-blue/20 bg-white shadow-sm">
                  <h3 className="font-bold text-hse-primary mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-hse-red-600" /> Scope of Work
                  </h3>
                  <ul className="space-y-4">
                    {project.scope.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 border-b border-[#EAF3FF] pb-4 last:border-0 last:pb-0">
                        <CheckCircle className="w-4 h-4 text-hse-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-hse-muted leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-systems-card p-6 rounded-[20px] border border-hse-blue/20 bg-white shadow-sm">
                  <h3 className="font-bold text-hse-primary mb-3">Systems Supplied & Installed</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.systems.map((sys) => (
                      <span key={sys} className="px-3 py-1.5 rounded-full border border-hse-border text-sm text-hse-text bg-light/50">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>

                {project.brands.length > 0 && (
                  <div className="project-brands-card p-6 rounded-[20px] border border-hse-blue/20 bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Image className="w-5 h-5 text-hse-red-600" />
                      <h3 className="font-bold text-hse-primary">Brands Used in This Project</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.brands.map((brandId) => {
                        const brand = getBrandById(brandId)
                        if (!brand) return null
                        return (
                          <Link
                            key={brand.id}
                            to={`/brands/${brand.id}`}
                            className="group brand-card flex flex-col items-center p-4 rounded-xl border border-hse-border bg-hse-surface/50 hover:border-hse-primary hover:bg-white transition-all duration-200"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-hse-border bg-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                              <img src={brand.image} alt={brand.alt} className="w-full h-full object-contain p-1" loading="lazy" />
                            </div>
                            <h4 className="font-semibold text-hse-deep-forest text-sm group-hover:text-hse-primary transition-colors">
                              {brand.name}
                            </h4>
                            <p className="text-xs text-hse-muted text-center leading-relaxed line-clamp-2">
                              {brand.description}
                            </p>
                            <span className="mt-2 text-[10px] font-semibold text-hse-primary uppercase tracking-wider flex items-center gap-1">
                              View Brand <ArrowRight className="w-3 h-3" />
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="project-gallery-card p-6 rounded-[20px] border border-hse-blue/20 bg-white shadow-sm">
                  <h3 className="font-bold text-hse-primary mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden border border-hse-border bg-light">
                        {galleryFailed.has(i) ? (
                          <div className="card-img--fallback">
                            <div className="card-img--icon" dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[project.category] || CATEGORY_ICONS.default }} />
                          </div>
                        ) : (
                          <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" onError={() => setGalleryFailed((prev) => new Set(prev).add(i))} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="project-detail-sidebar space-y-6 sticky top-[110px]">
              <div className="project-info-card p-6 rounded-[20px] border border-hse-blue/20 bg-white shadow-sm">
                <h3 className="font-bold text-hse-primary mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-hse-red-600" /> Project Information
                </h3>
                <div className="project-info-grid">
                  <div className="project-info-row border-b border-[#EAF3FF] pb-3 last:border-0">
                    <span className="text-hse-muted-text text-sm font-medium">Client / Project</span>
                    <span className="text-[#014EB6] font-semibold">{project.name}</span>
                  </div>
                  <div className="project-info-row border-b border-[#EAF3FF] pb-3 last:border-0">
                    <span className="text-hse-muted-text text-sm font-medium">Location</span>
                    <span className="text-[#014EB6] font-semibold">{project.location}</span>
                  </div>
                  <div className="project-info-row border-b border-[#EAF3FF] pb-3 last:border-0">
                    <span className="text-hse-muted-text text-sm font-medium">Category</span>
                    <span className="text-[#014EB6] font-semibold">{project.category}</span>
                  </div>
                  <div className="project-info-row">
                    <span className="text-hse-muted-text text-sm font-medium">System Installed</span>
                    <span className="text-[#014EB6] font-semibold">{project.system}</span>
                  </div>
                </div>
              </div>

              <div className="project-cta-card p-6 rounded-[20px] bg-gradient-to-br from-[#014EB6] to-[#0868D8] text-white shadow-lg shadow-[0_5px_16px_rgba(1,78,182,0.16)]">
                <h3 className="font-bold text-white mb-2">Need a Similar Solution?</h3>
                <p className="text-white text-sm mb-6 leading-relaxed">
                  Discuss your project requirements with our engineering team.
                </p>
                <Link to="/contact">
                  <Button variant="primary" className="w-full py-3 bg-[#E53935] text-white hover:brightness-110 transition-colors shadow-lg shadow-[#E53935]/40">
                    Request a Consultation
                  </Button>
                </Link>
              </div>
            </aside>
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-[4px] bg-[#E53935] rounded-full" />
                <h2 className="text-2xl font-bold text-hse-deep-forest">Related Projects</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => {
                  const failed = relatedFailed.has(p!.id)
                  return (
                    <div key={p!.id} className="group project-card-reveal">
                      <div className="h-40 overflow-hidden rounded-lg border border-hse-border">
                        {failed ? (
                          <div className="card-img--fallback">
                            <div className="card-img--icon" dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[p!.category] || CATEGORY_ICONS.default }} />
                          </div>
                        ) : (
                          <img
                            src={p!.image}
                            alt={p!.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={() => setRelatedFailed((prev) => new Set(prev).add(p!.id))}
                          />
                        )}
                      </div>
                      <h4 className="font-bold text-hse-primary mt-3 text-sm">{p!.name}</h4>
                      <p className="text-xs text-hse-muted">{p!.location}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

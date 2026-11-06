import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  id: string
  name: string
  location: string
  category: string
  system: string
  image: string
}

const CATEGORY_ICONS: Record<string, string> = {
  'Industrial Facility': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18v7H3zm0-1h18l-2-2H5z"/><path d="M5 8h14v2H5z"/><path d="M5 13h2v4H5zm4 0h2v4H9zm4 0h2v4h-2zm4 0h2v4h-2z"/></svg>`,
  'Commercial Building': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18v14H3z"/><path d="M7 8h2v3H7zM11 8h2v3h-2zM15 8h2v3h-2z"/><path d="M10 14h2v2h-2zM14 14h2v2h-2z"/></svg>`,
  'Healthcare Facility': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 0 6 4v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6c2-4 6-4 6-4z"/><path d="M12 10v6M9 13h6"/></svg>`,
  'Educational Institution': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M6 7v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><path d="M12 3v5"/></svg>`,
  'Manufacturing': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 20v4M4.93 4.93l2.83 2.83M18.24 18.24l2.83 2.83M4.93 19.07l2.83-2.83M18.24 5.76l2.83-2.83"/><path d="M7.34 7.34l2.12 2.12M16.66 16.66l2.12 2.12M7.34 16.66l2.12-2.12M16.66 7.34l2.12-2.12"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c1.5 3 4 5 10 5s8.5-2 10-5c0-4-4.5-7-8-7S5 9 5 13z"/></svg>`,
}

export function ProjectCard({ id, name, location, category, system, image }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const fallbackIcon = CATEGORY_ICONS[category] || CATEGORY_ICONS.default

  return (
    <article className="rounded-[20px] border border-hse-border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 group project-card">
      <div className="project-card-accent" />
      <div className="relative h-52 overflow-hidden project-card-image-wrap">
        {imageFailed ? (
          <div className="card-img--fallback">
            <div className="card-img--icon" dangerouslySetInnerHTML={{ __html: fallbackIcon }} />
            <div className="card-img--bottom-gradient" />
          </div>
        ) : (
          <>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 project-card-image"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#014EB6]/80 via-[#014EB6]/30 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#014EB6]/90 via-[#014EB6]/30 to-transparent">
          <span className="text-xs font-semibold text-white uppercase tracking-wider bg-[#E53935] px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-hse-primary mb-1">{name}</h3>
        <p className="text-hse-muted text-sm mb-3">{location}</p>
        <div className="flex items-center gap-2 text-sm text-hse-text mb-4">
          <ArrowRight className="w-3 h-3 text-hse-text/40" />
          <span>{system}</span>
        </div>
        <Link to={`/projects/${id}`} className="flex items-center gap-1 text-sm font-semibold text-hse-blue-600 hover:text-hse-blue-700 hover:underline transition-colors">
          View Project <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  )
}

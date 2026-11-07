import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useState, useEffect } from 'react'

const CATEGORIES = [
  'All Projects',
  'Industrial Facility',
  'Commercial Building',
  'Healthcare Facility',
  'Educational Institution',
  'Manufacturing',
] as const

const STATS = [
  { label: 'Projects', value: projects.length.toString() },
  { label: 'Years', value: '10+' },
  { label: 'Districts', value: '8+' },
]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All Projects')
  const [counts, setCounts] = useState<Record<string, string>>({
    Projects: '0',
    Years: '0+',
    Districts: '0+',
  })

  const filteredProjects = activeCategory === 'All Projects'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  useEffect(() => {
    if (document.querySelector('.prefers-reduced-motion')) return
    const targets: Record<string, number> = { Projects: projects.length, Years: 10, Districts: 8 }
    const intervals: Record<string, ReturnType<typeof setInterval>> = {}
    Object.entries(targets).forEach(([key, target]) => {
      let current = 0
      const step = Math.ceil(target / 40)
      intervals[key] = setInterval(() => {
        current += step
        if (current >= target) {
          current = target
          clearInterval(intervals[key])
        }
        const suffix = key === 'Projects' ? '' : '+'
        setCounts((prev) => ({ ...prev, [key]: `${current}${suffix}` }))
      }, 30)
    })
    return () => Object.values(intervals).forEach(clearInterval)
  }, [])

  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden projects-hero">
        <div className="absolute inset-0 z-[-2] projects-gradient-bg" />
        <div className="absolute inset-0 z-[-1] projects-blueprint" />
        <div className="absolute top-0 left-0 z-[-1] projects-circuit projects-circuit-tl" />
        <div className="absolute top-0 right-0 z-[-1] projects-circuit projects-circuit-tr" />
        <div className="absolute bottom-0 left-0 z-[-1] projects-circuit projects-circuit-bl" />
        <div className="absolute bottom-0 right-0 z-[-1] projects-circuit projects-circuit-br" />
        <div className="absolute inset-0 z-[-1]">
          <img
            src="https://images.unsplash.com/photo-1558828659-3f4d618c61cf?w=1920&q=80"
            alt="Engineering projects"
            className="w-full h-[400px] object-cover opacity-50"
            loading="lazy"
          />
        </div>
        <svg className="projects-wave absolute bottom-[-1px] left-0 right-0 z-0" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 35 Q 360 0 720 35 T 1440 35 V70 H0 Z" fill="var(--hse-surface,#F7F9FC)" />
        </svg>

        <div className="relative z-10 container section pt-16 pb-24 text-center">
          <div className="projects-stat-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-stats">
            {STATS.map((s) => (
              <div key={s.label} className="project-stat-card">
                <div className="project-stat-value">{counts[s.label]}</div>
                <div className="project-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <span className="projects-badge">OUR WORK</span>
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4 animate-hero">Featured Projects</h1>
          <p className="text-lg text-white max-w-xl mx-auto animate-hero">Completed engineering projects across industrial, commercial, and institutional facilities.</p>
        </div>
      </section>

      <section className="relative bg-hse-surface projects-portfolio-bg">
        <div className="absolute inset-0 z-[-1] projects-portal-glow" />

        <div className="container section">
          <h2 className="text-3xl md:text-4xl font-bold text-hse-deep-forest mb-2 text-center">Project Portfolio</h2>
          <p className="text-hse-muted-text text-center mb-12 max-w-2xl mx-auto">Explore our completed fire safety and engineering projects across Bangladesh.</p>

          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#014EB6] to-[#0868D8] text-white border-transparent shadow-lg shadow-[0_5px_16px_rgba(1,78,182,0.16)]'
                    : 'border-hse-border text-hse-text hover:bg-hse-blue-600 hover:text-white hover:border-hse-blue-600 bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28">
            {filteredProjects.map((p) => (
              <div key={p.id} className="project-card-reveal">
                <ProjectCard key={p.id} {...p} />
              </div>
            ))}
          </div>

          {filteredProjects.length > 0 && (
            <div className="text-center mt-16">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 text-hse-primary font-semibold hover:text-hse-red-600 transition-colors"
              >
                View All Projects <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

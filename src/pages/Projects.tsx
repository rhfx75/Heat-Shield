import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import ProjectsHero, { PROJECT_CATEGORIES, type ProjectCategory } from '../graphics/projects/ProjectsHero'

function parseCategory(v: string | null): ProjectCategory {
  return (PROJECT_CATEGORIES as readonly string[]).includes(v || '') ? (v as ProjectCategory) : 'All Projects'
}

export function Projects() {
  const [sp, setSp] = useSearchParams()
  const activeCategory = parseCategory(sp.get('category'))
  const setActiveCategory = (cat: ProjectCategory) => {
    const next = new URLSearchParams(sp)
    if (!cat || cat === 'All Projects') next.delete('category')
    else next.set('category', cat)
    setSp(next, { replace: true })
  }

  const filteredProjects = useMemo(
    () => (activeCategory === 'All Projects' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory],
  )

  return (
    <div>
      <ProjectsHero category={activeCategory} onSelectCategory={setActiveCategory} />

      <section className="hse-pj-page">
        <div className="hse-pj-wrap hse-pj-filters" aria-label="Filter projects by sector">
          <div className="hse-pj-filter-row">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`hse-pj-chip${activeCategory === cat ? ' is-on' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="hse-pj-wrap hse-pj-results">
          <h2>Browse by sector</h2>
          {filteredProjects.length ? (
            <div className="hse-pj-grid">
              {filteredProjects.map((p) => (
                <div key={p.id} className="project-card-reveal">
                  <ProjectCard {...p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="hse-pj-empty">
              <p>No projects in this category yet.</p>
              <button type="button" onClick={() => setActiveCategory('All Projects')}>View all projects</button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
}

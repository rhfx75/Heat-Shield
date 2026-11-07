import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { STANDARDS } from '../../config/standards'
import './StandardsPage.css'

type Standard = { id: string; slug: string; short: string; name: string; image: string; alt: string; width: number; height: number; format: string; website: string | null; description: string | null }

function isJpg(s: Standard) {
  return s.format === 'jpg' || s.format === 'jpeg' || (s.image || '').toLowerCase().endsWith('.jpg') || (s.image || '').toLowerCase().endsWith('.jpeg')
}

export default function StandardsPage() {
  const location = useLocation()
  const gridRef = useRef<HTMLDivElement>(null)
  const items = STANDARDS as Standard[]

  useEffect(() => {
    document.title = 'Standards and authorities | Heat Shield Engineering'
    const desc = 'The organizations, codes and regulators that guide our fire safety and compliance work for facilities across Bangladesh.'
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prev = meta?.getAttribute('content') ?? null
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.setAttribute('content', desc)
    return () => { if (prev !== null) meta?.setAttribute('content', prev) }
  }, [])

  useEffect(() => {
    const hash = (location.hash || '').replace(/^#/, '').trim().toLowerCase()
    if (!hash) return
    const grid = gridRef.current
    if (!grid) return
    const target = grid.querySelector<HTMLElement>(`#${CSS.escape(hash)}`)
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t1 = 0
    let t2 = 0
    const go = () => {
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      try { target.focus({ preventScroll: true }) } catch { target.focus() }
      target.classList.add('is-highlight')
      if (reduce) {
        t1 = window.setTimeout(() => target.classList.remove('is-highlight'), 2400)
      } else {
        t1 = window.setTimeout(() => target.classList.add('is-fading'), 2400)
        t2 = window.setTimeout(() => target.classList.remove('is-highlight', 'is-fading'), 2800)
      }
    }
    const imgs = Array.from(target.querySelectorAll('img'))
    const pending = imgs.filter((i) => !(i as HTMLImageElement).complete)
    if (!pending.length) { go() }
    else {
      let left = pending.length
      const done = () => { left -= 1; if (left <= 0) go() }
      pending.forEach((img) => {
        const on = () => { img.removeEventListener('load', on); img.removeEventListener('error', on); done() }
        img.addEventListener('load', on); img.addEventListener('error', on)
      })
      const fallback = window.setTimeout(go, 1800)
      return () => { window.clearTimeout(fallback); window.clearTimeout(t1); window.clearTimeout(t2) }
    }
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [location.hash, location.key])

  return (
    <div className="hse-st" data-surface="light">
      <div className="hse-st__wrap">
        <nav className="hse-st__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Standards</span>
        </nav>
        <header className="hse-st__head">
          <div className="hse-st__bar" aria-hidden="true" />
          <h1>Standards and authorities we work with</h1>
          <p>The organizations, codes and regulators that guide our fire safety and compliance work.</p>
        </header>
        <div ref={gridRef} className="hse-st__grid">
          {items.map((s, i) => (
            <article key={s.id} id={s.slug} className="hse-st__card" tabIndex={-1}>
              <div className="hse-st__plate">
                <img
                  className={isJpg(s) ? 'hse-st__img hse-st__img--jpg' : 'hse-st__img'}
                  src={s.image}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  decoding="async"
                  loading={i < 4 ? undefined : 'lazy'}
                />
              </div>
              <h2 className="hse-st__short">{s.short}</h2>
              <p className="hse-st__full">{s.name}</p>
              {s.description ? <p className="hse-st__desc">{s.description}</p> : null}
              {s.website ? (
                <a className="hse-st__site" href={s.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${s.short} website (opens in a new tab)`}>Visit website</a>
              ) : null}
            </article>
          ))}
        </div>
        <p className="hse-st__note">Certification and compliance requirements vary by project and product. <Link to="/contact">Contact us</Link> to discuss what applies to your facility.</p>
      </div>
    </div>
  )
}

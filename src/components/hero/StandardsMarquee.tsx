import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { STANDARDS } from '../../config/standards'

type Standard = { id: string; slug: string; short: string; name: string; image: string; alt: string; width: number; height: number; format: string; website: string | null; description: string | null }

function isJpg(s: Standard) {
  return s.format === 'jpg' || s.format === 'jpeg' || (s.image || '').toLowerCase().endsWith('.jpg') || (s.image || '').toLowerCase().endsWith('.jpeg')
}

function Card({ s, hidden }: { s: Standard; hidden?: boolean }) {
  return (
    <Link
      to={`/standards#${s.slug}`}
      className="hse-sm__card"
      title={s.name}
      aria-hidden={hidden ? 'true' : undefined}
      aria-label={hidden ? undefined : `${s.name}: view details`}
      tabIndex={hidden ? -1 : undefined}
    >
      <div className="hse-sm__logo">
        <img
          className={`hse-sm__img${isJpg(s) ? ' hse-sm__img--jpg' : ''}`}
          src={s.image}
          alt={hidden ? '' : s.alt}
          width={s.width}
          height={s.height}
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="hse-sm__short">{s.short}</div>
      <div className="hse-sm__name">{s.name}</div>
    </Link>
  )
}

export function StandardsMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setARef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const durRef = useRef(0)
  const items = STANDARDS as Standard[]

  useEffect(() => {
    if (import.meta.env.DEV && items.length <= 6) {
      console.warn('[StandardsMarquee] STANDARDS.length <= largest --visible (6); loop may show gaps.')
    }
  }, [items.length])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const imgs = Array.from(wrap.querySelectorAll('img'))
    if (!imgs.length) { setReady(true); return }
    let done = 0
    const finish = () => { done += 1; if (done >= imgs.length) setReady(true) }
    imgs.forEach((img) => {
      if ((img as HTMLImageElement).complete) { finish(); return }
      const on = () => { img.removeEventListener('load', on); img.removeEventListener('error', on); finish() }
      img.addEventListener('load', on)
      img.addEventListener('error', on)
      ;(img as any).decode?.().then(on).catch(() => {})
    })
    const t = window.setTimeout(() => setReady(true), 2500)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    const setA = setARef.current
    if (!wrap || !track || !setA) return
    const setVars = () => {
      const setWidth = setA.getBoundingClientRect().width
      if (!setWidth) return
      const d = setWidth / 45
      if (Math.abs(d - durRef.current) / Math.max(d, 0.001) > 0.05) {
        durRef.current = d
        wrap.style.setProperty('--duration', `${d.toFixed(3)}s`)
      }
      if (import.meta.env.DEV) {
        const trackW = track.scrollWidth
        if (Math.abs(trackW - setWidth * 2) > 2) console.log('[StandardsMarquee] trackWidth', trackW, '2x set', setWidth * 2, 'duration', d.toFixed(2))
      }
    }
    setVars()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setVars) : null
    ro?.observe(wrap); ro?.observe(setA)
    return () => ro?.disconnect()
  }, [ready])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let off = false
    let hidden = document.visibilityState === 'hidden'
    const apply = () => setPaused(off || hidden)
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((entries) => { off = !entries[0]?.isIntersecting; apply() }, { threshold: 0.05 }) : null
    io?.observe(wrap)
    const onVis = () => { hidden = document.visibilityState === 'hidden'; apply() }
    document.addEventListener('visibilitychange', onVis)
    return () => { io?.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return (
    <div ref={wrapRef} className={`hse-sm${ready ? ' ready' : ''}`} role="region" aria-label="Standards and authorities we work with">
      <p className="hse-sm__cap">Standards and authorities we work with</p>
      <div className="hse-sm__mask">
        <div
          ref={trackRef}
          className="hse-sm__track"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          <div ref={setARef} className="hse-sm__set">{items.map((s) => <Card key={s.id} s={s} />)}</div>
          <div className="hse-sm__set" aria-hidden="true">{items.map((s) => <Card key={`b-${s.id}`} s={s} hidden />)}</div>
        </div>
      </div>
      <div className="hse-sm__static" aria-hidden="true">
        {items.map((s) => <Card key={`st-${s.id}`} s={s} />)}
      </div>
      <Link to="/standards" className="hse-sm__all">View all standards</Link>
    </div>
  )
}

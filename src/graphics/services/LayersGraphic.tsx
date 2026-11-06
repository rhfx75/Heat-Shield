import { useEffect, useRef } from 'react'
import { gsap } from '../../components/ui/use-gsap'

type Cat = 'Fire Protection' | 'Detection & Alarm' | 'Fire Suppression' | 'Pump & Hydrant' | 'Fire Door & Exit' | 'Electrical & Lightning'
const LAYERS: { cat: Cat; label: string; filter?: string }[] = [
  { cat: 'Electrical & Lightning', label: 'Electrical & Lightning', filter: 'Electrical Safety' },
  { cat: 'Fire Door & Exit', label: 'Fire Door & Exit', filter: 'Fire Protection' },
  { cat: 'Pump & Hydrant', label: 'Pump & Hydrant', filter: 'Fire Protection' },
  { cat: 'Fire Suppression', label: 'Fire Suppression', filter: 'Fire Protection' },
  { cat: 'Detection & Alarm', label: 'Detection & Alarm', filter: 'Detection & Alarm' },
  { cat: 'Fire Protection', label: 'Fire Protection', filter: 'Fire Protection' },
]

export function LayersGraphic({ activeCategory }: { activeCategory: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer:fine)').matches
    const slabs = Array.from(root.querySelectorAll<SVGGElement>('[data-slab]'))
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(slabs, { opacity: 1, y: -60 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'elastic.out(1,0.7)', immediateRender: false, clearProps: 'transform' })
        gsap.to(root.querySelector('.hse-sv-layers__stack'), { y: -6, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      }
      if (fine && !reduce) {
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height
          slabs.forEach((s, i) => gsap.to(s, { x: dx * (4 + i * 1.2), y: dy * (2 + i * 0.6), duration: 0.35, overwrite: 'auto' }))
        }
        const onLeave = () => slabs.forEach((s) => gsap.to(s, { x: 0, y: 0, duration: 0.45, overwrite: 'auto' }))
        root.addEventListener('pointermove', onMove)
        root.addEventListener('pointerleave', onLeave)
        return () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave) }
      }
    }, root)
    const t = window.setTimeout(() => slabs.forEach((s) => { s.style.opacity = '1'; s.style.transform = 'none' }), 1500)
    return () => { window.clearTimeout(t); ctx.revert() }
  }, [])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    root.querySelectorAll<SVGGElement>('[data-slab]').forEach((s) => {
      const f = s.getAttribute('data-filter') || ''
      const on = !activeCategory || activeCategory === f
      s.style.opacity = on ? '1' : '0.28'
      s.style.transform = on && activeCategory && activeCategory === f ? 'translateY(-8px)' : ''
    })
  }, [activeCategory])

  return (
    <div ref={ref} className="hse-sv-layers" aria-hidden="true">
      <svg viewBox="0 0 560 560" fill="none" role="img">
        <g className="hse-sv-layers__stack">
          {LAYERS.map((l, i) => {
            const y = 390 - i * 54
            const w = 260 - i * 6
            const x = 280 - w / 2
            return (
              <g key={l.cat} data-slab data-filter={l.filter || ''} style={{ opacity: 1 }}>
                <path d={`M${x} ${y} L${x + w / 2} ${y - 34} L${x + w} ${y} L${x + w / 2} ${y + 34} Z`} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.42)" strokeWidth="1.2" />
                <path d={`M${x} ${y} L${x} ${y + 16} L${x + w / 2} ${y + 50} L${x + w} ${y + 16} L${x + w} ${y}`} fill="rgba(1,78,182,0.16)" stroke="rgba(255,255,255,0.18)" />
                <text x={280} y={y + 5} textAnchor="middle" fill="rgba(255,255,255,0.82)" fontSize="11" fontWeight="700">{l.label}</text>
                <circle cx={280} cy={y - 8} r="4" fill="rgba(255,156,96,0.95)"><animate attributeName="opacity" values=".45;1;.45" dur={`${2.4 + i * 0.2}s`} repeatCount="indefinite" /></circle>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

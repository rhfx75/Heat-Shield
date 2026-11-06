import { useEffect, useRef } from 'react'
import { gsap } from '../../components/ui/use-gsap'

type Cat = 'Fire Protection' | 'Detection & Alarm' | 'Fire Suppression' | 'Pump & Hydrant' | 'Fire Door & Exit' | 'Electrical & Lightning'
type Layer = { cat: Cat; label: string; filter: string; device: 'sprinkler' | 'detector' | 'extinguisher' | 'pump' | 'door' | 'lightning' }
const LAYERS: Layer[] = [
  { cat: 'Electrical & Lightning', label: 'Electrical & Lightning', filter: 'Electrical Safety', device: 'lightning' },
  { cat: 'Fire Door & Exit', label: 'Fire Door & Exit', filter: 'Fire Protection', device: 'door' },
  { cat: 'Pump & Hydrant', label: 'Pump & Hydrant', filter: 'Fire Protection', device: 'pump' },
  { cat: 'Fire Suppression', label: 'Fire Suppression', filter: 'Fire Protection', device: 'extinguisher' },
  { cat: 'Detection & Alarm', label: 'Detection & Alarm', filter: 'Detection & Alarm', device: 'detector' },
  { cat: 'Fire Protection', label: 'Fire Protection', filter: 'Fire Protection', device: 'sprinkler' },
]

const C = {
  top: 'rgba(255,255,255,0.14)',
  topHi: 'rgba(255,255,255,0.22)',
  side: 'rgba(1,78,182,0.28)',
  sideDeep: 'rgba(1,48,136,0.42)',
  edge: 'rgba(255,255,255,0.72)',
  edgeSoft: 'rgba(255,255,255,0.34)',
  line: 'rgba(255,255,255,0.9)',
  text: 'rgba(255,255,255,0.94)',
  accent: 'rgba(255,156,96,0.98)',
  accentSoft: 'rgba(229,57,53,0.55)',
  riser: 'rgba(255,255,255,0.28)',
  riserHi: 'rgba(255,196,140,0.95)',
}

function Device({ kind, x, y }: { kind: Layer['device']; x: number; y: number }) {
  const s = 'hse-sv-dev'
  if (kind === 'sprinkler') return (
    <g className={s} transform={`translate(${x} ${y})`}>
      <line x1="0" y1="-30" x2="0" y2="-8" stroke={C.line} strokeWidth="3" />
      <rect x="-8" y="-8" width="16" height="12" rx="3" fill="none" stroke={C.line} strokeWidth="2.2" />
      <path d="M-14 6 L14 6 L0 14 Z" fill="none" stroke={C.line} strokeWidth="2.2" />
      <circle cx="-10" cy="18" r="2.2" fill={C.accentSoft} /><circle cx="0" cy="22" r="2.4" fill={C.accentSoft} /><circle cx="10" cy="18" r="2.2" fill={C.accentSoft} />
      <circle className="hse-sv-dev__pulse" cx="0" cy="0" r="18" fill="none" stroke={C.accent} strokeWidth="2" opacity="0" />
    </g>
  )
  if (kind === 'detector') return (
    <g className={s} transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="22" ry="10" fill="none" stroke={C.line} strokeWidth="2.4" />
      <ellipse cx="0" cy="-4" rx="16" ry="7" fill="none" stroke={C.line} strokeWidth="1.8" />
      <circle cx="0" cy="-4" r="4" fill={C.accent} className="hse-sv-dev__led" />
      <line x1="-10" y1="2" x2="-6" y2="2" stroke={C.edgeSoft} strokeWidth="1.6" /><line x1="6" y1="2" x2="10" y2="2" stroke={C.edgeSoft} strokeWidth="1.6" />
      <circle className="hse-sv-dev__pulse" cx="0" cy="-4" r="24" fill="none" stroke={C.accent} strokeWidth="2" opacity="0" />
    </g>
  )
  if (kind === 'extinguisher') return (
    <g className={s} transform={`translate(${x} ${y})`}>
      <rect x="-10" y="-24" width="20" height="38" rx="6" fill="none" stroke={C.line} strokeWidth="2.3" />
      <path d="M10 -18 C20 -18 22 -10 16 -4" fill="none" stroke={C.line} strokeWidth="2.2" />
      <path d="M-4 -24 L-4 -32 L10 -32" fill="none" stroke={C.line} strokeWidth="2.1" />
      <circle cx="0" cy="-10" r="5" fill="none" stroke={C.edgeSoft} strokeWidth="1.8" />
      <line x1="0" y1="-10" x2="3" y2="-13" stroke={C.accent} strokeWidth="1.6" />
      <rect x="-10" y="14" width="20" height="4" rx="1.5" fill="none" stroke={C.line} strokeWidth="1.8" />
      <circle className="hse-sv-dev__pulse" cx="0" cy="-4" r="22" fill="none" stroke={C.accent} strokeWidth="2" opacity="0" />
    </g>
  )
  if (kind === 'pump') return (
    <g className={s} transform={`translate(${x} ${y})`}>
      <rect x="-22" y="-12" width="18" height="24" rx="3" fill="none" stroke={C.line} strokeWidth="2.2" />
      <circle cx="10" cy="0" r="16" fill="none" stroke={C.line} strokeWidth="2.3" />
      <circle cx="10" cy="0" r="6" fill="none" stroke={C.edgeSoft} strokeWidth="1.8" className="hse-sv-dev__spin" />
      <line x1="10" y1="-6" x2="10" y2="6" stroke={C.line} strokeWidth="1.6" /><line x1="4" y1="0" x2="16" y2="0" stroke={C.line} strokeWidth="1.6" />
      <path d="M-4 0 L-6 0" stroke={C.line} strokeWidth="2.2" /><path d="M26 0 L30 0 M30 -6 L30 6" stroke={C.line} strokeWidth="2.2" />
      <circle className="hse-sv-dev__pulse" cx="8" cy="0" r="24" fill="none" stroke={C.accent} strokeWidth="2" opacity="0" />
    </g>
  )
  if (kind === 'door') return (
    <g className={s} transform={`translate(${x} ${y})`}>
      <rect x="-14" y="-26" width="28" height="44" rx="2" fill="none" stroke={C.line} strokeWidth="2.2" />
      <rect x="-10" y="-22" width="20" height="36" fill="none" stroke={C.edgeSoft} strokeWidth="1.6" />
      <circle cx="5" cy="-2" r="2" fill={C.line} />
      <rect x="-18" y="-40" width="36" height="10" rx="2" fill="rgba(229,57,53,0.22)" stroke={C.accentSoft} strokeWidth="1.5" />
      <text x="0" y="-33" textAnchor="middle" fill={C.text} fontSize="7" fontWeight="800">EXIT</text>
      <circle className="hse-sv-dev__pulse" cx="0" cy="-8" r="24" fill="none" stroke={C.accent} strokeWidth="2" opacity="0" />
    </g>
  )
  return (
    <g className={s} transform={`translate(${x} ${y})`}>
      <line x1="0" y1="-34" x2="0" y2="18" stroke={C.line} strokeWidth="2.6" />
      <path d="M0 -36 L-6 -22 L6 -22 Z" fill="none" stroke={C.line} strokeWidth="2.1" />
      <path d="M-14 18 L14 18 M-10 24 L10 24 M-6 30 L6 30" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
      <path d="M-10 -10 L-2 -4 L-10 2" fill="none" stroke={C.accent} strokeWidth="1.8" className="hse-sv-dev__spark" />
      <circle className="hse-sv-dev__pulse" cx="0" cy="-8" r="24" fill="none" stroke={C.accent} strokeWidth="2" opacity="0" />
    </g>
  )
}

function slabPath(cx: number, y: number, w: number, h: number) {
  const hw = w / 2
  return `M${cx - hw} ${y} L${cx} ${y - h} L${cx + hw} ${y} L${cx} ${y + h} Z`
}
function sidePath(cx: number, y: number, w: number, h: number, d: number) {
  const hw = w / 2
  return `M${cx - hw} ${y} L${cx - hw} ${y + d} L${cx} ${y + h + d} L${cx + hw} ${y + d} L${cx + hw} ${y} L${cx} ${y + h} Z`
}

export function LayersGraphic({ activeCategory }: { activeCategory: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const mobile = window.matchMedia('(max-width: 639px)').matches
    const slabs = Array.from(root.querySelectorAll<SVGGElement>('[data-slab]'))
    const stack = root.querySelector<SVGGElement>('.hse-sv-layers__stack')
    const edges = Array.from(root.querySelectorAll<SVGPathElement>('.hse-sv-slab__edge'))
    const pulses = Array.from(root.querySelectorAll<SVGCircleElement>('.hse-sv-dev__pulse'))
    const risers = Array.from(root.querySelectorAll<SVGLineElement>('.hse-sv-riser'))
    const tokens = Array.from(root.querySelectorAll<SVGCircleElement>('.hse-sv-riser-token'))
    const ctx = gsap.context(() => {
      gsap.set([stack, ...slabs], { opacity: 1 })
      if (reduce) {
        slabs.forEach((s) => { s.style.opacity = '1'; s.style.transform = 'none' })
        edges.forEach((e) => { e.style.strokeDasharray = 'none'; e.style.strokeDashoffset = '0' })
        return
      }
      const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })
      tl.fromTo(slabs, { opacity: 1, y: -90 }, { opacity: 1, y: 0, duration: 1.7, stagger: 0.09, ease: 'elastic.out(1,0.62)', immediateRender: false, clearProps: 'transform' }, 0)
      edges.forEach((e, i) => {
        const len = typeof e.getTotalLength === 'function' ? e.getTotalLength() : 420
        gsap.set(e, { strokeDasharray: len, strokeDashoffset: len })
        tl.to(e, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, 0.65 + i * 0.08)
      })
      pulses.forEach((p, i) => tl.fromTo(p, { opacity: 0, attr: { r: 8 } }, { opacity: 0.9, attr: { r: 26 }, duration: 0.22, yoyo: true, repeat: 1 }, 1.1 + i * 0.12))
      risers.forEach((r) => {
        const len = typeof r.getTotalLength === 'function' ? r.getTotalLength() : 500
        gsap.set(r, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
        tl.to(r, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, 1.15)
      })
      tokens.forEach((tkn, i) => tl.fromTo(tkn, { opacity: 0 }, { opacity: 0.95, duration: 0.12 }, 1.9 + i * 0.08).to(tkn, { opacity: 0.35, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 2.1 + i * 0.08))
      if (stack) tl.to(stack, { y: -8, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 2.2)
      gsap.to('.hse-sv-ground-glow', { scale: 1.05, opacity: 0.9, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' })

      if (fine && !mobile && !reduce) {
        const xTo: Array<(v: number) => void> = []
        const yTo: Array<(v: number) => void> = []
        slabs.forEach((s, i) => { xTo[i] = gsap.quickTo(s, 'x', { duration: 0.45, ease: 'power3' }); yTo[i] = gsap.quickTo(s, 'y', { duration: 0.45, ease: 'power3' }) })
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          slabs.forEach((s, i) => {
            const d = 0.35 + i * 0.12
            const sel = s.getAttribute('data-selected') === 'true'
            xTo[i](Math.max(-14, Math.min(14, dx * 14 * d)))
            yTo[i](Math.max(-10, Math.min(10, dy * 10 * d)) + (sel ? -10 : 0))
          })
        }
        const onLeave = () => slabs.forEach((s, i) => { xTo[i](0); yTo[i](s.getAttribute('data-selected') === 'true' ? -10 : 0) })
        root.addEventListener('pointermove', onMove)
        root.addEventListener('pointerleave', onLeave)
        return () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave) }
      }
    }, root)
    const vis = window.setTimeout(() => { slabs.forEach((s) => { s.style.opacity = '1'; s.style.transform = 'none' }); edges.forEach((e) => { e.style.strokeDasharray = 'none'; e.style.strokeDashoffset = '0' }) }, 1500)
    return () => { window.clearTimeout(vis); ctx.revert() }
  }, [])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const mobile = window.matchMedia('(max-width: 639px)').matches
    root.querySelectorAll<SVGGElement>('[data-slab]').forEach((s) => {
      const cat = s.getAttribute('data-slab') || ''
      const f = s.getAttribute('data-filter') || ''
      const selected = !!activeCategory && activeCategory === f
      const on = !activeCategory || selected
      const simplifiedHidden = mobile && (cat === 'Electrical & Lightning' || cat === 'Fire Door & Exit' || cat === 'Fire Suppression')
      s.setAttribute('data-selected', selected ? 'true' : 'false')
      s.style.display = simplifiedHidden ? 'none' : ''
      s.style.opacity = simplifiedHidden ? '0' : on ? '1' : '0.28'
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) s.style.filter = selected && !simplifiedHidden ? 'drop-shadow(0 0 10px rgba(255,196,140,0.45))' : 'none'
      if (!window.matchMedia('(pointer:fine)').matches) s.style.transform = selected && !simplifiedHidden ? 'translateY(-10px)' : ''
    })
  }, [activeCategory])

  const cx = 450
  const render = LAYERS

  return (
    <div ref={ref} className="hse-sv-layers" aria-hidden="true">
      <svg viewBox="0 0 900 900" fill="none" role="img">
        <defs>
          <radialGradient id="hse-sv-ground" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,156,96,0.22)" />
            <stop offset="45%" stopColor="rgba(1,78,182,0.18)" />
            <stop offset="100%" stopColor="rgba(1,78,182,0)" />
          </radialGradient>
          <radialGradient id="hse-sv-heat" cx="50%" cy="70%" r="55%">
            <stop offset="0%" stopColor="rgba(229,57,53,0.12)" />
            <stop offset="100%" stopColor="rgba(229,57,53,0)" />
          </radialGradient>
          <filter id="hse-sv-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse className="hse-sv-ground-glow" cx={cx} cy="760" rx="240" ry="54" fill="url(#hse-sv-ground)" filter="url(#hse-sv-glow)" />
        <ellipse cx={cx} cy="730" rx="170" ry="34" fill="url(#hse-sv-heat)" />
        <g className="hse-sv-risers">
          {[cx - 150, cx + 150, cx - 70, cx + 70].map((x, i) => (
            <g key={x}>
              <line className="hse-sv-riser" x1={x} y1="740" x2={x} y2="250" stroke={C.riser} strokeWidth={i < 2 ? 2.2 : 1.5} />
              <circle className="hse-sv-riser-token" cx={x} cy={String(360 + i * 50)} r="3.2" fill={C.riserHi} opacity="0" />
            </g>
          ))}
        </g>
        <g className="hse-sv-layers__stack">
          {render.map((l, i) => {
            const y = 690 - i * 88
            const w = 500 - i * 10
            const h = 62
            const d = 28
            const selected = !!activeCategory && activeCategory === l.filter
            return (
              <g key={l.cat} data-slab={l.cat} data-filter={l.filter} data-selected={selected ? 'true' : 'false'} style={{ opacity: 1 }}>
                <path d={sidePath(cx, y, w, h, d)} fill={C.side} stroke={C.edgeSoft} strokeWidth="1.2" />
                <path d={sidePath(cx, y, w, h, d)} fill={C.sideDeep} opacity="0.45" clipPath="none" />
                <path d={slabPath(cx, y, w, h)} fill={selected ? C.topHi : C.top} />
                <path className="hse-sv-slab__edge" d={slabPath(cx, y, w, h)} fill="none" stroke={C.edge} strokeWidth="2.2" strokeLinejoin="round" />
                <text x={cx} y={y + 8} textAnchor="middle" fill={C.text} fontSize="16" fontWeight="700" fontFamily="var(--font-heading, sans-serif)">{l.label}</text>
                <Device kind={l.device} x={cx} y={y - 4} />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

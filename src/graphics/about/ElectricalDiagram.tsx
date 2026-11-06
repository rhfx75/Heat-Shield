import { useEffect, useRef } from 'react'

export default function ElectricalDiagram() {
  const root = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = root.current
    if (!svg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf: number
    let arcInterval: number
    let paused = false
    const tick = () => { if (!paused) raf = requestAnimationFrame(tick) }
    const hide = () => { paused = true }
    const show = () => { paused = false; tick() }
    document.addEventListener('visibilitychange', hide)
    document.addEventListener('visibilitychange', show)
    if (!reduce) tick()
    const pulses = svg.querySelectorAll<SVGCircleElement>('[data-pulse]')
    let pulseIdx = 0
    const nextPulse = () => {
      if (reduce || paused) return
      pulses.forEach((p, i) => { p.style.opacity = i === pulseIdx ? '1' : '0.3'; p.style.r = i === pulseIdx ? '6' : '3.5' })
      pulseIdx = (pulseIdx + 1) % pulses.length
    }
    const pulseInterval = setInterval(nextPulse, 1100)
    if (!reduce) arcInterval = window.setInterval(() => {
      const arc = svg.querySelector<SVGPathElement>('[data-arc]')
      if (!arc) return
      const len = arc.getTotalLength()
      arc.style.strokeDasharray = `${len} ${len}`
      arc.style.strokeDashoffset = `${len}`
      arc.style.transition = 'none'
      arc.getBBox()
      arc.style.transition = 'stroke-dashoffset 0.7s ease'
      arc.style.strokeDashoffset = '0'
    }, 7000)
    nextPulse()
    return () => {
      clearInterval(pulseInterval)
      if (arcInterval) clearInterval(arcInterval)
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', hide)
      document.removeEventListener('visibilitychange', show)
    }
  }, [])
  return (
    <svg
      ref={root}
      className="hse-ab-electrical"
      viewBox="0 0 560 420"
      aria-hidden="true"
      focusable="false"
      style={{ width: '100%', height: 'auto', maxHeight: '420px', pointerEvents: 'none', display: 'block' }}
    >
      <defs>
        <filter id="hse-ab-arc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="60" y="80" width="120" height="100" fill="#fff" stroke="var(--color-hse-blue)" strokeWidth="2.5" rx="4" />
      <text x="120" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-hse-blue)">MAIN DB</text>
      <line x1="180" y1="130" x2="260" y2="130" stroke="var(--color-hse-blue)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="220" cy="130" r="3" fill="var(--color-hse-blue)" data-pulse />
      <line x1="260" y1="130" x2="340" y2="130" stroke="var(--color-hse-blue)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="300" cy="130" r="3" fill="var(--color-hse-blue)" data-pulse />
      <rect x="340" y="100" width="100" height="80" fill="#fff" stroke="var(--color-hse-blue)" strokeWidth="2.5" rx="4" />
      <text x="390" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-hse-blue)">FEEDER PANEL</text>
      <line x1="390" y1="180" x2="390" y2="240" stroke="var(--color-hse-blue)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="390" cy="210" r="3" fill="var(--color-hse-blue)" data-pulse />
      <line x1="390" y1="240" x2="500" y2="240" stroke="var(--color-hse-blue)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="445" cy="240" r="3" fill="var(--color-hse-blue)" data-pulse />
      <rect x="500" y="220" width="60" height="60" fill="#fff" stroke="var(--color-hse-blue)" strokeWidth="2.5" rx="4" />
      <text x="530" y="250" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-hse-blue)">LOAD</text>
      <path d="M520 80 L580 60 L540 100" data-arc fill="none" stroke="var(--color-hse-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="550" cy="80" r="10" fill="none" stroke="var(--color-hse-red)" strokeWidth="2" />
      <text x="550" y="110" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-hse-red)">LPS</text>
      <line x1="120" y1="150" x2="200" y2="150" stroke="var(--color-hse-blue)" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="340" y1="180" x2="390" y2="240" stroke="var(--color-hse-blue)" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="160" cy="150" r="2.5" fill="var(--color-hse-blue)" data-pulse />
      <circle cx="365" cy="210" r="2.5" fill="var(--color-hse-blue)" data-pulse />
      <text x="40" y="40" fontSize="12" fontWeight="700" fill="var(--color-hse-blue)">Electrical Safety — Single-Line Diagram</text>
      <text x="40" y="62" fontSize="9" fill="var(--color-hse-text-secondary)">Current pulses flow Main DB → Feeder Panel → Load · Lightning arc every 7s (LPS)</text>
    </svg>
  )
}

import { useEffect, useRef } from 'react'

export default function FPSDiagram() {
  const root = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = root.current
    if (!svg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf: number
    let paused = false
    const tick = () => { if (!paused) raf = requestAnimationFrame(tick) }
    const hide = () => { paused = true }
    const show = () => { paused = false; tick() }
    document.addEventListener('visibilitychange', hide)
    document.addEventListener('visibilitychange', show)
    if (!reduce) tick()
    const flows = svg.querySelectorAll<SVGPathElement>('[data-flow]')
    let flowOffset = 0
    const animateFlow = () => {
      if (reduce || paused) return
      flowOffset = (flowOffset + 1) % 100
      flows.forEach((p) => { p.style.strokeDashoffset = `${-flowOffset}` })
      raf = requestAnimationFrame(animateFlow)
    }
    raf = requestAnimationFrame(animateFlow)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', hide)
      document.removeEventListener('visibilitychange', show)
    }
  }, [])
  return (
    <svg
      ref={root}
      className="hse-ab-fps"
      viewBox="0 0 560 420"
      aria-hidden="true"
      focusable="false"
      style={{ width: '100%', height: 'auto', maxHeight: '420px', pointerEvents: 'none', display: 'block' }}
    >
      <defs>
        <linearGradient id="hse-ab-fps-water" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-hse-blue-light)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-hse-blue)" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <rect x="60" y="240" width="200" height="140" fill="none" stroke="var(--color-hse-blue)" strokeWidth="2" rx="6" />
      <rect x="80" y="260" width="160" height="20" fill="#fff" opacity="0.15" stroke="var(--color-hse-blue)" strokeWidth="1" />
      <text x="160" y="232" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-hse-blue)">FIRE PUMP ROOM</text>
      <rect x="90" y="275" width="40" height="70" fill="none" stroke="var(--color-hse-red)" strokeWidth="2" />
      <rect x="170" y="275" width="40" height="70" fill="none" stroke="var(--color-hse-red)" strokeWidth="2" />
      <text x="110" y="355" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">PUMP</text>
      <text x="190" y="355" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">JOCKEY</text>
      <path d="M160 315 L160 360 L260 360" data-flow fill="none" stroke="url(#hse-ab-fps-water)" strokeWidth="6" strokeLinecap="round" strokeDasharray="40 20" />
      <path d="M260 360 L320 360 L320 300" data-flow fill="none" stroke="url(#hse-ab-fps-water)" strokeWidth="6" strokeLinecap="round" strokeDasharray="40 20" />
      <path d="M320 300 L460 300" data-flow fill="none" stroke="url(#hse-ab-fps-water)" strokeWidth="6" strokeLinecap="round" strokeDasharray="40 20" />
      <path d="M460 300 L460 360 L520 360" data-flow fill="none" stroke="url(#hse-ab-fps-water)" strokeWidth="6" strokeLinecap="round" strokeDasharray="40 20" />
      <rect x="360" y="200" width="120" height="100" fill="none" stroke="var(--color-hse-blue)" strokeWidth="2" rx="6" />
      <text x="420" y="192" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-hse-blue)">SPRINKLER LOOP</text>
      <circle cx="390" cy="230" r="6" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="1.5" />
      <circle cx="420" cy="250" r="6" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="1.5" />
      <circle cx="450" cy="230" r="6" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="1.5" />
      <path d="M390 236 L400 246" fill="none" stroke="var(--color-hse-red)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M420 256 L430 246" fill="none" stroke="var(--color-hse-red)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M450 236 L440 246" fill="none" stroke="var(--color-hse-red)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M460 360 L500 360 L500 300 L480 300" data-flow fill="none" stroke="url(#hse-ab-fps-water)" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 15" />
      <rect x="480" y="285" width="40" height="40" fill="none" stroke="var(--color-hse-red)" strokeWidth="2" />
      <text x="500" y="312" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-hse-red)">HYD</text>
      <circle cx="500" cy="305" r="10" fill="none" stroke="var(--color-hse-red)" strokeWidth="2" />
      <text x="40" y="30" fontSize="12" fontWeight="700" fill="var(--color-hse-blue)">Fire Protection — Pump Room &amp; Sprinkler Loop</text>
      <text x="40" y="46" fontSize="9" fill="var(--color-hse-text-secondary)">Water flow: pump → distribution → sprinklers → hydrant (animated flow)</text>
    </svg>
  )
}

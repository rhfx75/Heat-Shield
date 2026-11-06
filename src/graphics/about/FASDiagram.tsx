import { useEffect, useRef } from 'react'

export default function FASDiagram() {
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
    const pulses = svg.querySelectorAll<SVGCircleElement>('[data-pulse]')
    const paths = svg.querySelectorAll<SVGPathElement>('[data-signal]')
    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len} ${len}`
      p.style.strokeDashoffset = `${len}`
      p.style.transition = 'stroke-dashoffset 2.5s ease'
    })
    let pulseIdx = 0
    const nextPulse = () => {
      if (reduce || paused) return
      pulses.forEach((p, i) => { p.style.opacity = i === pulseIdx ? '1' : '0.25'; p.style.r = i === pulseIdx ? '7' : '4' })
      pulseIdx = (pulseIdx + 1) % pulses.length
    }
    const interval = setInterval(nextPulse, 1400)
    nextPulse()
    return () => {
      clearInterval(interval)
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', hide)
      document.removeEventListener('visibilitychange', show)
    }
  }, [])
  return (
    <svg
      ref={root}
      className="hse-ab-fas"
      viewBox="0 0 560 420"
      aria-hidden="true"
      focusable="false"
      style={{ width: '100%', height: 'auto', maxHeight: '420px', pointerEvents: 'none', display: 'block' }}
    >
      <defs>
        <filter id="hse-ab-fas-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="40" y="40" width="480" height="320" fill="none" stroke="var(--color-hse-blue)" strokeWidth="2" opacity="0.45" />
      <rect x="60" y="60" width="440" height="280" fill="none" stroke="var(--color-hse-blue)" strokeWidth="1" strokeDasharray="8 6" opacity="0.35" />
      <rect x="140" y="260" width="100" height="60" fill="#fff" stroke="var(--color-hse-blue)" strokeWidth="2.5" rx="4" />
      <circle cx="190" cy="290" r="14" fill="#fff" stroke="var(--color-hse-blue)" strokeWidth="2" />
      <text x="190" y="294" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-hse-blue)">FACP</text>
      <g data-detectors>
        <circle cx="120" cy="110" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="200" cy="90" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="280" cy="130" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="360" cy="100" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="440" cy="140" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="160" cy="190" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="300" cy="210" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <circle cx="400" cy="180" r="8" fill="#fff" stroke="var(--color-hse-red)" strokeWidth="2" data-pulse />
        <text x="120" y="104" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">SD</text>
        <text x="200" y="84" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">SD</text>
        <text x="280" y="124" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">HD</text>
        <text x="360" y="94" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">SD</text>
        <text x="440" y="134" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">HD</text>
        <text x="160" y="184" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">MCP</text>
        <text x="300" y="204" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">SD</text>
        <text x="400" y="174" textAnchor="middle" fontSize="9" fill="var(--color-hse-red)">SD</text>
      </g>
      <path d="M120 118 L140 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 98 L190 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M280 138 L240 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M360 108 L320 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M440 148 L400 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M160 198 L190 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M300 218 L290 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <path d="M400 188 L390 260" data-signal fill="none" stroke="var(--color-hse-blue-light)" strokeWidth="2" strokeLinecap="round" />
      <text x="40" y="30" fontSize="12" fontWeight="700" fill="var(--color-hse-blue)">Fire Alarm &amp; Detection — Ceiling Plan</text>
      <text x="40" y="46" fontSize="9" fill="var(--color-hse-text-secondary)">SD = Smoke Detector · HD = Heat Detector · MCP = Manual Call Point · FACP = Fire Alarm Control Panel</text>
    </svg>
  )
}

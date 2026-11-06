import { useEffect, useRef } from 'react'

export default function HeroEmbers({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 640px)').matches
    if (reduce || mobile) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, raf = 0, visible = true, paused = document.hidden
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const parts = Array.from({ length: 20 }, () => ({ x: Math.random(), y: Math.random(), s: 0.6 + Math.random() * 1.8, v: 0.018 + Math.random() * 0.03, a: 0.15 + Math.random() * 0.35, d: Math.random() * Math.PI * 2 }))
    const resize = () => { const r = canvas.getBoundingClientRect(); w = r.width; h = r.height; canvas.width = Math.max(1, Math.floor(w * dpr)); canvas.height = Math.max(1, Math.floor(h * dpr)); ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !paused && !raf) raf = requestAnimationFrame(loop) }, { threshold: 0.01 })
    const onVis = () => { paused = document.hidden; if (!paused && visible && !raf) raf = requestAnimationFrame(loop) }
    const loop = (t: number) => {
      if (!visible || paused) { raf = 0; return }
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      parts.forEach((p, i) => {
        p.y -= p.v; p.x += Math.sin(t * 0.0005 + p.d + i) * 0.0006
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
        const x = p.x * w, y = p.y * h
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.s * 5)
        g.addColorStop(0, `rgba(255,150,70,${p.a})`)
        g.addColorStop(1, 'rgba(255,90,30,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, p.s * 5, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(loop)
    }
    resize(); io.observe(canvas); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  return <canvas ref={ref} className={className} aria-hidden="true" />
}

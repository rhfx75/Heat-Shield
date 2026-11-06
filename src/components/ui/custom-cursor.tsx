import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (reduce || !fine.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0
    let hasMoved = false
    let raf = 0

    const updateCursor = () => {
      const distX = mouseX - dotX
      const distY = mouseY - dotY
      dotX += distX * 0.15
      dotY += distY * 0.15

      const ringDistX = mouseX - ringX
      const ringDistY = mouseY - ringY
      ringX += ringDistX * 0.08
      ringY += ringDistY * 0.08

      gsap.set(dot, { x: dotX, y: dotY })
      gsap.set(ring, { x: ringX, y: ringY })
      raf = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!hasMoved) {
        hasMoved = true
        dotX = mouseX
        dotY = mouseY
        ringX = mouseX
        ringY = mouseY
        document.body.classList.add('has-custom-cursor')
        gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: 'auto' })
        gsap.to(ring, { opacity: 1, duration: 0.2, overwrite: 'auto' })
      }
    }

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.15, overwrite: 'auto' })
      gsap.to(ring, { scale: 1.4, duration: 0.15, overwrite: 'auto' })
    }

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15, overwrite: 'auto' })
      gsap.to(ring, { scale: 1, duration: 0.15, overwrite: 'auto' })
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.closest('a, button, [role="button"], input, select, textarea, .nav-link, .view-all-button')) {
        gsap.to(dot, { scale: 2.2, duration: 0.2, backgroundColor: 'rgba(242, 140, 40, 0.25)', overwrite: 'auto' })
        gsap.to(ring, { scale: 1.6, duration: 0.2, borderColor: 'rgba(242, 140, 40, 0.6)', overwrite: 'auto' })
      }
    }

    const handleOut = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.closest('a, button, [role="button"], input, select, textarea, .nav-link, .view-all-button')) {
        gsap.to(dot, { scale: 1, backgroundColor: '#014EB6', duration: 0.2, overwrite: 'auto' })
        gsap.to(ring, { scale: 1, borderColor: '#014EB6', duration: 0.2, overwrite: 'auto' })
      }
    }

    const onFineChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        document.body.classList.remove('has-custom-cursor')
        gsap.set([dot, ring], { opacity: 0 })
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleOver, true)
    document.addEventListener('mouseout', handleOut, true)
    fine.addEventListener?.('change', onFineChange)
    raf = requestAnimationFrame(updateCursor)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleOver, true)
      document.removeEventListener('mouseout', handleOut, true)
      fine.removeEventListener?.('change', onFineChange)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot fixed pointer-events-none z-[9999] w-3 h-3 rounded-full bg-[#014EB6] translate-x-[-50%] translate-y-[-50%] opacity-0" />
      <div ref={ringRef} className="custom-cursor-ring fixed pointer-events-none z-[9999] w-10 h-10 rounded-full border-2 border-[#014EB6]/60 translate-x-[-50%] translate-y-[-50%] opacity-0" />
    </>
  )
}

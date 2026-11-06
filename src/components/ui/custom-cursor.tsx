import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!media.matches) return

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

      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!hasMoved) {
        hasMoved = true
        document.body.classList.add('has-custom-cursor')
        gsap.to(dot, { opacity: 1, duration: 0.3 })
        gsap.to(ring, { opacity: 1, duration: 0.3 })
      }
    }

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.15 })
      gsap.to(ring, { scale: 1.4, duration: 0.15 })
    }

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 })
      gsap.to(ring, { scale: 1, duration: 0.15 })
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as Node | null
      if (!target || !(target instanceof Element)) return
      if (target.closest('a, button, [role="button"], .nav-link, .view-all-button')) {
        gsap.to(dot, { scale: 2.2, duration: 0.2, backgroundColor: 'rgba(242, 140, 40, 0.25)' })
        gsap.to(ring, { scale: 1.6, duration: 0.2, borderColor: 'rgba(242, 140, 40, 0.6)' })
      }
    }

    const handleHoverEnd = () => {
      gsap.to(dot, { scale: 1, backgroundColor: '#014EB6', duration: 0.2 })
      gsap.to(ring, { scale: 1, borderColor: '#014EB6', duration: 0.2 })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleHover, true)
    document.addEventListener('mouseleave', handleHoverEnd, true)

    updateCursor()

    return () => {
      document.body.classList.remove('has-custom-cursor')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleHover, true)
      document.removeEventListener('mouseleave', handleHoverEnd, true)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot fixed pointer-events-none z-[9999] w-3 h-3 rounded-full bg-[#014EB6] translate-x-[-50%] translate-y-[-50%] transition-transform duration-75 ease-out opacity-0" />
      <div ref={ringRef} className="custom-cursor-ring fixed pointer-events-none z-[9999] w-10 h-10 rounded-full border-2 border-[#014EB6]/60 translate-x-[-50%] translate-y-[-50%] transition-transform duration-150 ease-out opacity-0" />
    </>
  )
}

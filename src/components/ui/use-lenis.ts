import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

let lenisInstance: Lenis | null = null

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.destroy()
      lenisInstance = null
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    })

    lenisInstance = lenis
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.scrollTo(0, { immediate: true })

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [location.pathname])

  return lenisRef.current
}

export function getLenis() {
  return lenisInstance
}

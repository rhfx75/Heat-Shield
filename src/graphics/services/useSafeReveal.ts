import { useEffect, useRef } from 'react'
import { gsap } from '../../components/ui/use-gsap'

export function useSafeReveal(scope: React.RefObject<HTMLElement | null>, selector: string, vars: gsap.TweenVars) {
  const started = useRef(false)
  useEffect(() => {
    const root = scope.current
    if (!root) return
    const els = Array.from(root.querySelectorAll(selector)) as HTMLElement[]
    if (!els.length) return
    // Text visible without animation (CSS default). Only animate when safe.
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    started.current = false
    const ctx = gsap.context(() => {
      started.current = true
      gsap.fromTo(els, { opacity: 1, y: 14, ...((vars as any).from || {}) }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'expo.out', immediateRender: false, clearProps: 'opacity,transform', overwrite: 'auto', ...vars })
    }, root)
    const t = window.setTimeout(() => {
      if (!started.current) els.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' })
    }, 1500)
    return () => { window.clearTimeout(t); ctx.revert(); els.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' }) }
  }, [scope, selector])
}

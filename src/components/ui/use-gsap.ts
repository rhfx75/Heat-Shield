import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let scrollTriggers: any[] = []

export function useScrollTrigger(
  effect: () => (() => void) | void,
  deps: unknown[] = []
) {
  const cleanupRef = useRef<(() => void) | void>(undefined)

  useEffect(() => {
    if (cleanupRef.current) cleanupRef.current()
    cleanupRef.current = effect()
    return () => {
      if (cleanupRef.current) cleanupRef.current()
    }
  }, deps)
}

export function createScrollTrigger(
  trigger: string | Element,
  vars: Record<string, unknown>
) {
  const st = gsap.to(trigger, {
    scrollTrigger: {
      trigger,
      ...vars,
    },
  })
  scrollTriggers.push(st.scrollTrigger)
  return st
}

export function killAllScrollTriggers() {
  scrollTriggers.forEach((st: any) => st.kill())
  scrollTriggers = []
}

export { gsap, ScrollTrigger }

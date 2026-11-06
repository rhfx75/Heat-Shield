import { useEffect } from 'react'

export function useVisibilityFallback(scope: React.RefObject<HTMLElement | null>, started: React.MutableRefObject<boolean>) {
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (started.current) return
      const root = scope.current
      if (!root) return
      root.querySelectorAll<HTMLElement>('[data-ab-animate]').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.visibility = 'visible'
      })
    }, 1500)
    return () => window.clearTimeout(id)
  }, [scope, started])
}

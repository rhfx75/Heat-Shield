import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { FooterStandard } from '../graphics/footer/FooterStandard'
import { CustomCursor } from '../components/ui/custom-cursor'
import { ErrorBoundary } from '../components/ErrorBoundary'

export function MainLayout() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) return
    const lenis = (window as Window & { __lenis?: { scrollTo: (v: number, o?: { immediate?: boolean; force?: boolean }) => void } }).__lenis
    if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname, location.search, location.hash])
  return (
    <div className="min-h-screen flex flex-col bg-white text-hse-text">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow" style={{ margin: 0, padding: 0, display: 'flow-root' }}>
        <ErrorBoundary>
          <div key={location.pathname} style={{ margin: 0, padding: 0 }}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
      <FooterStandard />
    </div>
  )
}

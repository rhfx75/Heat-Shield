import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, Mail } from 'lucide-react'
import { company, mailHref, telHref, whatsappLink } from '../data/company'

const LOGO_SRC = '/images/heatshield-logo.png'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'Brands', to: '/brands' },
] as const

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const isHome = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 40 : false))

  const navRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  const activeKey = useMemo(() => {
    if (pathname === '/') return 'Home'
    const match = NAV_ITEMS.find((i) => i.to !== '/' && (pathname === i.to || pathname.startsWith(i.to + '/')))
    return match?.label ?? 'Home'
  }, [pathname])

  const closeDrawer = useCallback(() => setIsOpen(false), [])
  const closeAll = useCallback(() => { closeDrawer() }, [closeDrawer])

  // Scroll-driven header: toggles after 40px per spec; recheck on route changes (SPA scroll restore)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeDrawer])

  const transparent = isHome && !scrolled && !isOpen

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      <div className={`hidden lg:flex h-[36px] items-center justify-between px-6 text-[12px] font-medium text-white relative overflow-hidden transition-colors duration-300 ${transparent ? 'bg-[rgba(1,48,136,0.22)] border-b border-white/10 backdrop-blur-[2px]' : 'bg-[linear-gradient(90deg,#0868D8,#014EB6)]'}`}>
        <span className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.45) 1px, transparent 0)',backgroundSize:'18px 18px'}} />
        <span className="font-heading tracking-[0.04em] uppercase relative">{company.tagline}</span>
        <span className="flex items-center gap-5 relative">
          <a href={telHref()} className="hover:text-hse-red-pale transition">Phone: {company.phones[0]?.display}</a>
          <a href={mailHref()} className="hover:text-hse-red-pale transition">Email: {company.emails[0]?.address}</a>
        </span>
      </div>
      <nav
        className={`w-full border-b transition-all duration-300 ${transparent ? 'h-[80px] bg-transparent border-white/10 shadow-none' : scrolled ? 'h-[68px] bg-white/95 border-hse-border backdrop-blur shadow-[0_4px_16px_rgba(1,78,182,0.08)]' : 'h-[80px] bg-white border-hse-border shadow-none'}`}
        aria-label="Main navigation"
      >
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center flex-shrink-0" onClick={closeAll} aria-label="Heat Shield Engineering home">
            <img ref={logoRef} src={LOGO_SRC} alt="Heat Shield Engineering logo" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-[44px] lg:h-[48px]' : 'h-[44px] lg:h-[56px]'}`} width="168" height="56" loading="eager" />
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-1 min-w-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeKey === item.label
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`group relative inline-flex items-center px-3 py-2 font-heading text-[14px] font-semibold uppercase tracking-[0.05em] transition-colors ${transparent ? (isActive ? 'text-white' : 'text-white/90 hover:text-white') : (isActive ? 'text-hse-blue' : 'text-hse-blue hover:text-hse-red')}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeAll}
                >
                  {item.label}
                  <span className={`absolute left-3 right-3 bottom-0 h-[3px] bg-hse-red transition-transform duration-200 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            <Link to="/contact" className="hidden lg:inline-flex items-center justify-center rounded-lg bg-[linear-gradient(135deg,#E53935,#FF5A52)] px-5 py-2.5 font-heading text-[13px] font-semibold uppercase tracking-[0.05em] text-white shadow-[0_6px_18px_rgba(229,57,53,0.22)] hover:brightness-110 transition">
              Get a Quote
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`hidden sm:inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-heading text-[13px] font-semibold uppercase tracking-[0.04em] transition hover:brightness-110 ${transparent ? 'bg-[#0f766e]/92 border border-white/15' : 'bg-[#0f766e]'}`} aria-label={`Contact ${company.name} on WhatsApp`} data-surface="dark" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' } as React.CSSProperties}>
              <MessageCircle className="h-4 w-4" style={{ color: '#FFFFFF' }} aria-hidden="true" />
              <span style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>WhatsApp</span>
            </a>
            <button
              ref={hamburgerRef}
              type="button"
              className={`lg:hidden inline-flex items-center justify-center rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 ${transparent ? 'text-white hover:bg-white/10 focus-visible:ring-white' : 'text-hse-blue hover:bg-hse-blue-pale focus-visible:ring-hse-blue'}`}
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="hse-mobile-drawer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} className="fixed inset-0 z-[60] bg-hse-blue-dark/60 lg:hidden" onClick={closeDrawer} aria-hidden="true" />
            <motion.div
              ref={drawerRef}
              id="hse-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%', opacity: 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 1 }} transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] flex w-[min(92vw,380px)] flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-hse-border px-5 py-4">
                <img src={LOGO_SRC} alt="Heat Shield Engineering logo" className="h-[44px] w-auto" width="132" height="44" />
                <button type="button" className="rounded-md p-2 text-hse-blue hover:bg-hse-blue-pale" onClick={closeDrawer} aria-label="Close navigation menu"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="border-b border-hse-border/70">
                    <Link to={item.to} className={`block py-3.5 font-heading text-[14px] font-semibold uppercase tracking-[0.05em] ${activeKey === item.label ? 'text-hse-red' : 'text-hse-blue'}`} onClick={closeAll}>{item.label}</Link>
                  </div>
                ))}
              </div>
              <div className="border-t border-hse-border p-4 space-y-3">
                <Link to="/contact" className="flex w-full items-center justify-center rounded-lg bg-[linear-gradient(135deg,#E53935,#FF5A52)] px-4 py-3 font-heading text-[14px] font-semibold uppercase text-white" onClick={closeAll}>Get a Quote</Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 font-heading text-[14px] font-semibold uppercase text-white" onClick={closeAll}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                <div className="pt-1 text-[13px] text-hse-muted space-y-1">
                  <a href={telHref()} className="flex items-center gap-2"><Phone className="h-4 w-4 text-hse-blue" />{company.phones[0]?.display}</a>
                  <a href={mailHref()} className="flex items-center gap-2"><Mail className="h-4 w-4 text-hse-blue" />{company.emails[0]?.address}</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

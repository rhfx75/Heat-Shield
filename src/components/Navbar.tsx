import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, Mail } from 'lucide-react'
import { company, mailHref, telHref, whatsappLink } from '../data/company'
import '../graphics/header/header.css'

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
  const [isOpen, setIsOpen] = useState(false)

  const activeKey = useMemo(() => {
    if (pathname === '/') return 'Home'
    const match = NAV_ITEMS.find((i) => i.to !== '/' && (pathname === i.to || pathname.startsWith(i.to + '/')))
    return match?.label ?? 'Home'
  }, [pathname])

  const closeDrawer = useCallback(() => setIsOpen(false), [])
  const closeAll = useCallback(() => { closeDrawer() }, [closeDrawer])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeDrawer])

  return (
    <header className="hse-header">
      <div className="hse-topbar" aria-label="Company information">
        <div className="hse-header__container hse-topbar__inner">
          <span className="hse-topbar__tagline">FIRE DETECTION | FIRE PROTECTION | UTILITY PRODUCTS</span>
          <span className="hse-topbar__contact">
            <a href={telHref()} className="hse-topbar__link">Phone: {company.phones[0]?.display}</a>
            <a href={mailHref()} className="hse-topbar__link">Email: {company.emails[0]?.address}</a>
          </span>
        </div>
      </div>

      <nav className="hse-navbar" aria-label="Main navigation">
        <div className="hse-header__container hse-navbar__inner">
          <Link to="/" className="hse-navbar__brand" onClick={closeAll} aria-label="Heat Shield Engineering home">
            <img src={LOGO_SRC} alt="Heat Shield Engineering logo" className="hse-navbar__logo" width="168" height="56" loading="eager" />
          </Link>

          <div className="hse-navbar__links" role="menubar" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = activeKey === item.label
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  role="menuitem"
                  className={`hse-navbar__link${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="hse-navbar__actions">
            <Link to="/contact" className="hse-header-btn hse-header-btn--quote" onClick={closeAll}>Get a Quote</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hse-header-btn hse-header-btn--wa" aria-label={`Contact ${company.name} on WhatsApp`}><MessageCircle aria-hidden="true" />WhatsApp</a>
            <button
              type="button"
              className="hse-navbar__hamburger"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="hse-mobile-drawer"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} className="hse-drawer-backdrop" onClick={closeDrawer} aria-hidden="true" />
            <motion.div
              id="hse-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 1, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 1, y: -8 }} transition={{ duration: 0.2, ease: [0.22,1,0.36,1] }}
              className="hse-drawer"
            >
              <div className="hse-drawer__head">
                <span className="hse-drawer__title">Menu</span>
                <button type="button" className="hse-drawer__close" onClick={closeDrawer} aria-label="Close menu"><X aria-hidden="true" /></button>
              </div>
              <div className="hse-drawer__links">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.label} to={item.to} className={`hse-drawer__link${activeKey === item.label ? ' is-active' : ''}`} onClick={closeAll}>{item.label}</Link>
                ))}
              </div>
              <div className="hse-drawer__actions">
                <Link to="/contact" className="hse-header-btn hse-header-btn--quote hse-header-btn--full" onClick={closeAll}>Get a Quote</Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hse-header-btn hse-header-btn--wa hse-header-btn--full" onClick={closeAll}><MessageCircle aria-hidden="true" />WhatsApp</a>
                <div className="hse-drawer__contact">
                  <a href={telHref()}><Phone aria-hidden="true" />{company.phones[0]?.display}</a>
                  <a href={mailHref()}><Mail aria-hidden="true" />{company.emails[0]?.address}</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

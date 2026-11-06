import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingCart, Wrench, Headset, PhoneCall, MessageCircle } from 'lucide-react'
const HeroScene = lazy(() => import('../graphics/HeroScene'))

const TRUST = [
  { label: 'Sales', icon: ShoppingCart },
  { label: 'Installation', icon: Wrench },
  { label: 'Maintenance', icon: Headset },
  { label: '24/7 Support', icon: PhoneCall },
]

const fade = (delay: number, _reduce: boolean | null) => ({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const prefersReduced = useReducedMotion()
  const showScene = !prefersReduced
  const reduce = !!prefersReduced

  return (
    <section
      className="hero hse-hero relative isolate overflow-hidden bg-[linear-gradient(135deg,#0868D8_0%,#014EB6_55%,#2B7FE6_100%)] text-white"
      style={{ minHeight: 'calc(100vh - 116px)' }}
    >
      {/* Graphics layer (WebGL heat field + shield + embers + detection network) */}
      {showScene ? (
        <Suspense fallback={<div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#0868D8_0%,#014EB6_50%,#2B7FE6_100%)]" aria-hidden="true" />}>
          <HeroScene />
        </Suspense>
      ) : (
        <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#0868D8_0%,#014EB6_50%,#2B7FE6_100%)]" aria-hidden="true" />
      )}
      {/* Bright graphics + readability scrim */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(circle at 12% 18%, rgba(255,255,255,.18), transparent 22%), radial-gradient(circle at 82% 22%, rgba(255,90,82,.16), transparent 18%), radial-gradient(circle at 1px 1px, rgba(255,255,255,.18) 1px, transparent 0)', backgroundSize: 'auto, auto, 26px 26px' }} aria-hidden="true" />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(1,78,182,0.52) 0%, rgba(1,78,182,0.28) 42%, rgba(1,78,182,0.08) 100%)' }} aria-hidden="true" />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(1,78,182,0.02) 35%, rgba(1,78,182,0.18) 100%)' }} aria-hidden="true" />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-h,80px)+28px)] pb-14 md:pb-20">
        <div className="max-w-[720px] mx-auto md:mx-0 text-center md:text-left">
          <motion.div {...fade(0, reduce)} className="mb-7 flex justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DCEEFF]/30 bg-[#EAF2FF]/12 px-4 py-1.5 font-heading text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm" style={{ color: '#EAF2FF', WebkitTextFillColor: '#EAF2FF' }}>
              <span className="h-2 w-2 rounded-full bg-[#FF8A80]" aria-hidden="true" />Fire Safety Experts in Bangladesh
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.08, reduce)}
            className="hse-hero-headline font-heading font-extrabold uppercase leading-[1.08] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)', color: '#EAF2FF', WebkitTextFillColor: '#EAF2FF' }}
          >
            <span style={{ color: '#DCEEFF', WebkitTextFillColor: '#DCEEFF' }}>Detect. Protect.</span>
            <br />
            <span style={{ color: '#FF8A80', WebkitTextFillColor: '#FF8A80' }}>Safeguard Every Facility.</span>
          </motion.h1>

          <motion.p {...fade(0.16, reduce)} className="hse-hero-body mt-6 max-w-[640px] mx-auto md:mx-0 text-[17px] md:text-[19px] leading-[1.65]" style={{ color: '#EAF2FF', WebkitTextFillColor: '#EAF2FF' }}>
            Heat Shield Engineering delivers reliable fire detection, fire protection and utility solutions for industrial, commercial and institutional facilities across Bangladesh, with sales, installation and maintenance support.
          </motion.p>

          <motion.div {...fade(0.24, reduce)} className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-4">
            <Link to="/contact" className="w-full sm:w-auto">
              <span className="hse-hero-cta-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-8 py-4 font-heading text-[14px] font-semibold uppercase tracking-[0.06em] bg-[linear-gradient(135deg,#FF8A80,#FFAB91)] shadow-[0_8px_22px_rgba(255,138,128,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#014EB6]" style={{ color: '#014EB6', WebkitTextFillColor: '#014EB6' }}>
                Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link to="/products" className="w-full sm:w-auto">
              <span className="hse-hero-cta-secondary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-2 border-[#DCEEFF] bg-[#EAF2FF]/10 px-8 py-4 font-heading text-[14px] font-semibold uppercase tracking-[0.06em] transition hover:bg-[#EAF2FF] hover:text-[#014EB6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#014EB6]" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>
                Explore Products
              </span>
            </Link>
          </motion.div>

          <motion.div {...fade(0.32, reduce)} className="mt-4 flex justify-center md:justify-start">
            <a href="https://wa.me/8801788585741" target="_blank" rel="noopener noreferrer" className="hse-hero-whatsapp inline-flex items-center gap-2 text-[14px] font-medium transition hover:brightness-110" style={{ color: '#EAF2FF', WebkitTextFillColor: '#EAF2FF' }}>
              <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" /> WhatsApp us for a quick response
            </a>
          </motion.div>

          <motion.div {...fade(0.4, reduce)} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[720px]">
            {TRUST.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center justify-center md:justify-start gap-2.5 rounded-xl border border-[#DCEEFF]/25 bg-[#EAF2FF]/10 px-4 py-3 backdrop-blur-sm">
                <Icon className="h-[18px] w-[18px] shrink-0" style={{ color: '#DCEEFF' }} aria-hidden="true" />
                <span className="font-heading text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.04em]" style={{ color: '#EAF2FF', WebkitTextFillColor: '#EAF2FF' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  )
}

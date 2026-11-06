import { SectionTitle } from '../components/SectionTitle'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { projects } from '../data/projects'
import { brands } from '../data/brands'
import { Link } from 'react-router-dom'
import { ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Wrench } from 'lucide-react'

const SERVICE_CARDS = [
  { id: 'fire-detection-alarm-installation', title: 'Fire Detection', description: 'Addressable and conventional alarm solutions for early warning and dependable notification.', icon: 'bell-ring', category: 'Detection & Alarm', image: '/images/fire-detection-alarm.jpg', features: [], detailTitle: '', detailContent: [], detailSystems: [] },
  { id: 'fire-suppression-extinguishing', title: 'Fire Protection', description: 'Suppression, extinguishing, pumps, hydrants, and protection equipment for critical areas.', icon: 'flame-kindling', category: 'Fire Protection', image: '/images/fire-suppression-extinguishing.png', features: [], detailTitle: '', detailContent: [], detailSystems: [] },
  { id: 'electrical-lightning-safety', title: 'Utility Products', description: 'Electrical and lightning safety products that support safer facility operations.', icon: 'zap', category: 'Electrical Safety', image: '/images/electrical-lightning-safety.jpg', features: [], detailTitle: '', detailContent: [], detailSystems: [] },
  { id: 'maintenance-amc', title: 'Installation & Maintenance', description: 'Supply, installation, inspection, and maintenance support for fire safety systems.', icon: 'wrench', category: 'Maintenance', image: '/images/maintenance-amc.jpg', features: [], detailTitle: '', detailContent: [], detailSystems: [] },
]

const WHY_CHOOSE = [
  { title: 'Professional Engineering Approach', description: 'Solutions planned around site requirements, practical risk considerations, and reliable system performance.', icon: ShieldCheck },
  { title: 'Quality-Focused Installation', description: 'Careful installation practices with attention to equipment suitability, workmanship, and safety.', icon: CheckCircle2 },
  { title: 'Responsive After-Sales Support', description: 'Clear communication for maintenance needs, service follow-up, and operational support.', icon: MessageCircle },
  { title: 'Practical Safety Solutions', description: 'Fire detection, fire protection, and utility products selected to match each facility’s needs.', icon: Wrench },
]

export function Home() {
  return (
    <div>
      <Hero />
      <AboutIntro />
      <ServicesSection />
      <FeaturedProducts />
      <WhyChoose />
      <ProjectsBrands />
      <FinalCTA />
    </div>
  )
}

function AboutIntro() {
  return (
    <section className="bg-hse-white">
      <div className="container section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="font-heading text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-hse-red mb-3">About Heat Shield Engineering</p>
            <h2 className="font-heading text-[28px] md:text-[40px] font-bold uppercase text-hse-blue-dark leading-[1.15] mb-4">Trusted Fire Safety & Utility Solutions</h2>
            <div className="h-1 w-12 rounded-full bg-[linear-gradient(135deg,#E53935,#FF5A52)] mb-6" aria-hidden="true" />
            <p className="text-[16px] md:text-[18px] text-hse-text leading-[1.65] mb-6 max-w-xl">
              Heat Shield Engineering provides fire detection, fire protection, and utility product solutions for industrial, commercial, and institutional facilities across Bangladesh.
            </p>
            <ul className="space-y-3 mb-8">
              {['Fire detection and alarm systems', 'Fire protection equipment and suppression support', 'Sales, installation, and maintenance services'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-hse-text"><CheckCircle2 className="mt-0.5 h-5 w-5 text-hse-red shrink-0" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center justify-center rounded-lg border border-[#0868D8] bg-[#EAF2FF] px-6 py-3 font-heading text-[14px] font-semibold uppercase tracking-[0.06em] transition hover:bg-[#DCEEFF]" style={{ color: '#014EB6', WebkitTextFillColor: '#014EB6' }}>Learn More</Link>
          </div>
          <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden border border-hse-border bg-[linear-gradient(135deg,#EAF2FF,#F7F9FC)] min-h-[320px] shadow-[0_4px_16px_rgba(1,78,182,0.08)]" aria-hidden="true">
            <img src="/images/hero/2.webp" alt="Fire safety equipment and engineering solutions" className="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" width="800" height="600" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(1,78,182,0.18),rgba(255,255,255,0.15))]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/40 bg-white/85 backdrop-blur p-4">
              <div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-hse-blue" /><div><div className="font-heading font-bold uppercase text-hse-blue-dark">Heat Shield Engineering</div><div className="text-[13px] text-hse-muted">Fire Detection | Fire Protection | Utility Products</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="bg-hse-surface">
      <div className="container section">
        <SectionTitle title="Our Services" subtitle="Professional fire detection, fire protection, utility products, and maintenance support." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_CARDS.map((s, i) => (
            <ServiceCard key={s.id} {...s} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-hse-blue font-heading font-semibold uppercase tracking-[0.05em] text-[14px] hover:text-hse-red transition-colors">Learn More <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  return (
    <section className="bg-hse-white">
      <div className="container section">
        <SectionTitle title="Featured Products" subtitle="Explore fire safety equipment and utility products from our catalog." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} slug={p.slug} name={p.name} category={p.category} brand={p.brand} model={p.model} shortDescription={p.shortDescription} image={p.image} availability={p.availability} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-hse-blue font-heading font-semibold uppercase tracking-[0.05em] text-[14px] hover:text-hse-red transition-colors">View All Products <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function WhyChoose() {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-[linear-gradient(135deg,#0868D8,#014EB6)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.4) 1px, transparent 0), linear-gradient(135deg, rgba(255,255,255,.08), transparent 55%)',backgroundSize:'22px 22px, auto'}} />
      <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      <div className="container section relative">
        <div className="mb-12 text-center">
          <p className="font-heading text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>Why Choose Us</p>
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold uppercase leading-[1.15] mb-3" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>Why Heat Shield Engineering</h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#D00000]" aria-hidden="true" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="rounded-xl backdrop-blur p-6" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}><item.icon className="h-5 w-5" style={{ color: '#FFFFFF' }} aria-hidden="true" /></div>
              <h3 className="font-heading text-[18px] font-bold uppercase mb-2" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>{item.title}</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.65]" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF', opacity: 1 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsBrands() {
  const displayProjects = projects.slice(0, 3)
  return (
    <section className="bg-hse-surface">
      <div className="container section">
        <SectionTitle title="Projects & Brands" subtitle="Selected project work and product brands we supply and support." />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {displayProjects.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="group rounded-xl border border-hse-border bg-white overflow-hidden shadow-[0_4px_16px_rgba(1,78,182,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(1,78,182,0.16)] hover:border-hse-blue/30 transition-all">
              <div className="relative h-44 bg-hse-blue-pale">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" width="640" height="360" />
                <div className="absolute inset-0 bg-gradient-to-t from-hse-blue-dark/55 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.04em] text-hse-blue">{p.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-[18px] md:text-[20px] font-bold uppercase text-hse-blue-dark group-hover:text-hse-blue transition-colors">{p.name}</h3>
                <p className="mt-1 text-[14px] text-hse-muted">{p.location}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="rounded-xl border border-hse-border bg-white p-6 md:p-8">
          <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-hse-red mb-4 text-center">Brands We Work With</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {brands.slice(0, 10).map((b) => (
              <Link key={b.id} to={`/brands/${b.id}`} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" aria-label={b.name}>
                <img src={b.image} alt={b.alt} className="h-10 md:h-12 w-auto object-contain" loading="lazy" width="120" height="48" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return null
}

export default Home

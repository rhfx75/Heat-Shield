import { useParams } from 'react-router-dom'
import { getServiceById } from '../data/services'
import { SectionTitle } from '../components/SectionTitle'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { ShieldCheck, Wrench, Shield, CheckCircle } from 'lucide-react'

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const service = getServiceById(id ?? '')

  if (!service) {
    return (
      <div className="container section text-center py-24">
        <h1 className="text-2xl font-bold text-hse-primary mb-4">Service Not Found</h1>
          <Link to="/services" className="text-hse-red hover:underline">
            Back to Services
          </Link>
      </div>
    )
  }
  return (
    <div>
      <section className="relative overflow-hidden hero">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-hse-primary/70" />
        </div>
        <div className="relative z-10 container section pt-20 pb-16 text-center">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 mb-6 inline-block">
            Engineering Service
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{service.title}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{service.description}</p>
        </div>
      </section>

      <section>
        <div className="container section">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <SectionTitle title="Overview" className="text-left mb-0" />
              <div className="space-y-6">
                {service.detailContent.map((paragraph, i) => (
                  <p key={i} className="text-hse-muted leading-relaxed text-base">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-hse-border bg-white">
                <h3 className="font-bold text-hse-primary mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-hse-red-600" /> Systems Covered
                </h3>
                <ul className="space-y-3">
                  {service.detailSystems.map((sys, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-hse-muted">
                      <CheckCircle className="w-4 h-4 text-hse-red-600 mt-0.5 flex-shrink-0" />
                      {sys}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-hse-border bg-white">
                <h3 className="font-bold text-hse-primary mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-hse-red-600" /> Key Features
                </h3>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-hse-muted">
                      <Wrench className="w-4 h-4 text-hse-red-600 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/contact">
              <Button variant="primary" className="w-auto px-8">
                Get a Quote for This Service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getServiceById } from '../data/services'
import { rsc } from '../data/rsc'
import { Shield, ShieldCheck, CheckCircle, Wrench } from 'lucide-react'
import { ServiceDetailGraphic } from '../graphics/service-detail/ServiceDetailGraphic'
import '../graphics/service-detail/service-detail.css'

const RSC_BY_SERVICE: Record<string, (typeof rsc.services)[number]> = {
  'fire-detection-alarm-installation': rsc.services[0],
  'fire-pump-hydrant': rsc.services[1],
  'electrical-lightning-safety': rsc.services[2],
}

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const service = getServiceById(id ?? '')
  const serviceRsc = service ? RSC_BY_SERVICE[service.id] : undefined
  const [docsOpen, setDocsOpen] = useState(false)

  if (!service) {
    return (
      <div className="container hse-sd-empty">
        <h1>Service Not Found</h1>
        <Link to="/services">Back to Services</Link>
      </div>
    )
  }

  return (
    <div className="hse-sd-page">
      <section className="hse-sd-hero" data-surface="brand" aria-labelledby="service-detail-title">
        <div className="hse-sd-hero__media" aria-hidden="true">
          <img src={service.image} alt="" loading="lazy" />
          <div className="hse-sd-hero__scrim" />
          <div className="hse-sd-hero__grid" />
        </div>
        <div className="container hse-sd-hero__inner">
          <nav className="hse-sd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.category}</span>
          </nav>
          <p className="hse-sd-kicker">Engineering Service</p>
          <h1 id="service-detail-title">{service.title}</h1>
          <p className="hse-sd-hero__desc">{service.description}</p>
        </div>
      </section>

      <section className="hse-sd-main" data-surface="light">
        <div className="container hse-sd-layout">
          <article className="hse-sd-card">
            <h2>Overview</h2>
            <div className="hse-sd-prose">
              {service.detailContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <ServiceDetailGraphic serviceId={service.id} title={service.title} />
            <div className="hse-sd-actions">
              <Link to="/contact" className="hse-sd-btn hse-sd-btn--primary" data-surface="dark">Get a Quote for This Service</Link>
              <Link to="/services" className="hse-sd-btn hse-sd-btn--ghost">Back to Services</Link>
            </div>

            {serviceRsc ? (
              <section className="hse-sd-rsc" aria-labelledby="hse-sd-rsc-title">
                <p className="hse-sd-rsc__kicker">{serviceRsc.number} · RSC Compliance</p>
                <h2 id="hse-sd-rsc-title">RSC / Accord Technical Compliance</h2>
                <p className="hse-sd-rsc__sub">{serviceRsc.subtitle}</p>
                {serviceRsc.intro.map((p, i) => <p key={i} className="hse-sd-rsc__body">{p}</p>)}
                <div className="hse-sd-rsc__block">
                  <h3>Our scope of services</h3>
                  <ul className="hse-sd-rsc__list">{serviceRsc.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="hse-sd-rsc__block">
                  <h3>{serviceRsc.documentationTitle}</h3>
                  <button type="button" className="hse-sd-rsc__toggle" aria-expanded={docsOpen} onClick={() => setDocsOpen(v => !v)}>
                    <span>Documentation list ({serviceRsc.documentation.length})</span><span aria-hidden="true">{docsOpen ? '−' : '+'}</span>
                  </button>
                  {docsOpen ? <ol className="hse-sd-rsc__docs">{serviceRsc.documentation.map((item) => <li key={item}>{item}</li>)}</ol> : <p className="hse-sd-rsc__muted">Open to view all required technical documentation categories.</p>}
                </div>
                <div className="hse-sd-rsc__standards" data-surface="brand">
                  <h3>{serviceRsc.standardsTitle}</h3>
                  <ul>{serviceRsc.standards.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="hse-sd-rsc__block">
                  <h3>Service deliverables</h3>
                  <div className="hse-sd-rsc__deliver">{serviceRsc.deliverables.map((item) => <div key={item} className="hse-sd-rsc__deliver-item"><CheckCircle aria-hidden="true" /><span>{item}</span></div>)}</div>
                </div>
                <p className="hse-sd-rsc__disclaimer"><strong>Note:</strong> {rsc.disclaimer}</p>
              </section>
            ) : null}
          </article>

          <aside className="hse-sd-side" aria-label="Service details">
            <section className="hse-sd-panel">
              <h3><span className="hse-sd-icon" aria-hidden="true"><Shield className="w-5 h-5" /></span>Systems Covered</h3>
              <ul className="hse-sd-list">
                {service.detailSystems.map((sys, i) => (
                  <li key={i}><CheckCircle aria-hidden="true" />{sys}</li>
                ))}
              </ul>
            </section>
            <section className="hse-sd-panel">
              <h3><span className="hse-sd-icon" aria-hidden="true"><ShieldCheck className="w-5 h-5" /></span>Key Features</h3>
              <ul className="hse-sd-list">
                {service.features.map((f, i) => (
                  <li key={i}><Wrench aria-hidden="true" />{f}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </div>
  )
}


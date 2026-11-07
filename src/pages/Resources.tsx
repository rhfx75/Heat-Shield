import { SectionTitle } from '../components/SectionTitle'
import { Mail, Phone, MessageCircle, FileText } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { CONTACT } from '../config/contact'

export function Resources() {
  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden hero">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="" className="w-full h-[400px] object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-hse-primary/80" />
        </div>
        <div className="relative z-10 container section pt-16 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Downloads &amp; Resources</h1>
          <p className="text-lg text-white max-w-xl mx-auto">Documentation and resources are available on request.</p>
        </div>
      </section>

      <section>
        <div className="container section max-w-3xl">
          <SectionTitle title="Request Documentation" subtitle="Select the resource you need and submit your request." />
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-hse-border bg-white">
              <div className="flex items-start gap-3 mb-4"><FileText className="w-5 h-5 text-hse-red-600 mt-0.5" /><h3 className="font-bold text-hse-primary">Company Profile</h3></div>
              <p className="text-hse-muted text-sm mb-4">Request our company profile with capabilities, certifications, and service overview.</p>
            </div>
            <div className="p-6 rounded-xl border border-hse-border bg-white">
              <div className="flex items-start gap-3 mb-4"><FileText className="w-5 h-5 text-hse-red-600 mt-0.5" /><h3 className="font-bold text-hse-primary">Technical Datasheets</h3></div>
              <p className="text-hse-muted text-sm mb-4">Request datasheets for specific products or system configurations.</p>
            </div>
            <div className="p-6 rounded-xl border border-hse-border bg-white">
              <div className="flex items-start gap-3 mb-4"><FileText className="w-5 h-5 text-hse-red-600 mt-0.5" /><h3 className="font-bold text-hse-primary">Compliance &amp; Certification Documents</h3></div>
              <p className="text-hse-muted text-sm mb-4">Request project-specific compliance documentation and certificates.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container section">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle title="Submit a Resource Request" subtitle="Tell us what you need and we'll send it to you." />
              <ContactForm />
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-hse-primary">Or contact us directly</h3>
              {CONTACT.phones.map((p) => (
                <div key={p.tel} className="p-5 rounded-xl border border-hse-border bg-white">
                  <div className="flex items-center gap-3 mb-2"><Phone className="w-5 h-5 text-hse-red-600" /><h4 className="font-semibold text-hse-primary">{p.label}</h4></div>
                  <a href={`tel:${p.tel}`} className="text-hse-muted text-sm" style={{whiteSpace:'nowrap'}}>{p.display}</a>
                </div>
              ))}
              <div className="p-5 rounded-xl border border-hse-border bg-white">
                <div className="flex items-center gap-3 mb-2"><Mail className="w-5 h-5 text-hse-red-600" /><h4 className="font-semibold text-hse-primary">Email</h4></div>
                <a href={`mailto:${CONTACT.email}`} className="text-hse-muted text-sm">{CONTACT.email}</a>
              </div>
              <div className="p-5 rounded-xl border border-[#12805c]/30 bg-[#12805c]/10">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#12805c]" />
                  <span className="font-semibold text-hse-primary">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

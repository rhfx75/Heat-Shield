import { SectionTitle } from '../components/SectionTitle'
import { ContactForm } from '../components/ContactForm'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { CONTACT } from '../config/contact'

export function Contact() {
  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden hero">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="" className="w-full h-[400px] object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-hse-primary/80" />
        </div>
        <div className="relative z-10 container section pt-[calc(var(--header-h)+64px)] pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-white max-w-xl mx-auto">Ready to discuss your fire safety and engineering requirements? Get in touch with our team.</p>
        </div>
      </section>

      <section>
        <div className="container section">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionTitle title="Send Us a Message" subtitle="Fill out the form below and our team will get back to you as soon as possible." />
              <ContactForm />
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-hse-border bg-white">
                <div className="flex items-start gap-3 mb-3"><MapPin className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" /><h4 className="font-bold text-hse-primary">Address</h4></div>
                <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-hse-muted text-sm hover:text-hse-red-600 transition-colors">{CONTACT.addressLine}</a>
              </div>
              {CONTACT.phones.map((p) => (
                <div key={p.tel} className="p-6 rounded-xl border border-hse-border bg-white">
                  <div className="flex items-start gap-3 mb-3"><Phone className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" /><h4 className="font-bold text-hse-primary">{p.label}</h4></div>
                  <a href={`tel:${p.tel}`} className="text-hse-muted text-sm hover:text-hse-red-600 transition-colors" style={{whiteSpace:'nowrap'}} aria-label={`Call ${CONTACT.company} ${p.display}`}>{p.display}</a>
                </div>
              ))}
              <div className="p-6 rounded-xl border border-hse-border bg-white">
                <div className="flex items-start gap-3 mb-3"><Mail className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" /><h4 className="font-bold text-hse-primary">Email</h4></div>
                <a href={`mailto:${CONTACT.email}`} className="text-hse-muted text-sm hover:text-hse-red-600 transition-colors break-all">{CONTACT.email}</a>
              </div>
              <div className="p-6 rounded-xl border border-hse-border bg-[#12805c]/10 border-[#12805c]/30">
                <div className="flex items-start gap-3 mb-3"><MessageCircle className="w-5 h-5 text-[#12805c] mt-0.5 flex-shrink-0" /><h4 className="font-bold text-hse-primary">WhatsApp</h4></div>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-[#12805c] text-white text-sm font-semibold" aria-label={`WhatsApp ${CONTACT.company}`}>Message on WhatsApp</a>
              </div>
              <div className="rounded-xl border border-hse-border overflow-hidden bg-white">
                <iframe title="Heat Shield Engineering location" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.addressLine)}&output=embed`} style={{width:'100%',height:260,border:0,display:'block'}} referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

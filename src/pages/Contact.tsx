import { SectionTitle } from '../components/SectionTitle'
import { ContactForm } from '../components/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

const CONTACT_INFO = [
  { icon: Phone, label: '01788585741', href: 'tel:+8801788585741', title: 'Phone' },
  { icon: Mail, label: 'heatshieldengineering01@gmail.com', href: 'mailto:heatshieldengineering01@gmail.com', title: 'Email' },
  { icon: MapPin, label: 'House-12, Road-04, Block-C, Banani, Dhaka-1213, Bangladesh', href: '#', title: 'Address' },
]

export function Contact() {
  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden hero">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="Contact us"
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-hse-primary/80" />
        </div>
        <div className="relative z-10 container section pt-[calc(var(--header-h)+64px)] pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-white max-w-xl mx-auto">
            Ready to discuss your fire safety and engineering requirements? Get in touch with our team.
          </p>
        </div>
      </section>

      <section>
        <div className="container section">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionTitle
                title="Send Us a Message"
                subtitle="Fill out the form below and our team will get back to you as soon as possible."
              />
              <ContactForm />
            </div>
            <div className="space-y-8">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon
                return (
                  <div key={info.title} className="p-6 rounded-xl border border-hse-border bg-white">
                    <div className="flex items-start gap-3 mb-4">
                      <Icon className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-hse-primary">{info.title}</h4>
                    </div>
                  </div>
                    <a href={info.href} className="text-hse-muted text-sm hover:text-hse-red-600 transition-colors">
                    {info.label}
                  </a>
                </div>
               )})}
              <div className="p-6 rounded-xl border border-hse-border bg-[#25D366] bg-opacity-10 border-[#25D366]/30">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-sm">WA</span>
                  <div>
                    <h4 className="font-bold text-hse-primary">WhatsApp</h4>
                  </div>
                </div>
<a href="https://wa.me/8801788585741" target="_blank" rel="noopener noreferrer" className="text-[#25D366] text-sm font-semibold hover:underline">
  01788585741
</a>
                <p className="text-xs text-hse-muted mt-2">Click to start a WhatsApp conversation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container section py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-hse-primary mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-left">
              <div className="p-4 rounded-lg border border-hse-border bg-white">
                <h4 className="font-bold text-hse-primary mb-2">Do you provide services across Bangladesh?</h4>
                <p className="text-sm text-hse-muted">Yes, we serve industrial, commercial, and institutional facilities across Dhaka, Chittagong, Gazipur, Narayanganj, and other major cities.</p>
              </div>
              <div className="p-4 rounded-lg border border-hse-border bg-white">
                <h4 className="font-bold text-hse-primary mb-2">Do you offer annual maintenance contracts?</h4>
                <p className="text-sm text-hse-muted">Yes, we offer AMC plans that include scheduled inspections, testing, and emergency support to keep your systems operational.</p>
              </div>
              <div className="p-4 rounded-lg border border-hse-border bg-white">
                <h4 className="font-bold text-hse-primary mb-2">Can I request a price quote for products?</h4>
                <p className="text-sm text-hse-muted">Yes, use the Request Price button on any product page or fill out our contact form for a quotation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

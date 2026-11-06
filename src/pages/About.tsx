import { SectionTitle } from '../components/SectionTitle'
import { Building, Shield, Users, Zap, AlarmClock } from 'lucide-react'
import { motion } from 'framer-motion'

export function About() {
  return (
    <div>
      <section className="relative isolate z-1 overflow-hidden hero">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581579258858-82d7880a4192?w=1920&q=80"
            alt="Engineering facility"
            className="w-full h-[500px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-hse-primary/85" />
        </div>
        <div className="relative z-10 container section pt-[calc(var(--header-h)+64px)] pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg text-white max-w-xl mx-auto">
            Engineering safety solutions built on reliability, innovation, and technical excellence.
          </p>
        </div>
      </section>

      <section className="bg-light">
        <div className="container section">
          <SectionTitle
            title="Who We Are"
            subtitle="HEAT SHIELD ENGINEERING is a Bangladesh-based engineering solutions provider specializing in fire safety, fire protection, electrical safety, and industrial technology services."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            {[{
              title: 'Our Mission',
              text: 'To deliver reliable, code-compliant fire safety and engineering solutions that protect lives, property, and critical infrastructure across Bangladesh.',
              icon: <Zap className="w-6 h-6 text-hse-red-600" />,
            }, {
              title: 'Our Vision',
              text: 'To be the most trusted engineering partner for fire protection and safety systems, recognized for technical excellence and customer commitment.',
              icon: <Shield className="w-6 h-6 text-hse-red-600" />,
            }, {
              title: 'Our Approach',
              text: 'We combine professional engineering design, quality installation, and responsive after-sales support to ensure every system performs when it matters most.',
              icon: <Shield className="w-6 h-6 text-hse-red-600" />,
            }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} className="p-8 rounded-xl border border-hse-border bg-white card-hover text-center">
                <div className="w-12 h-12 rounded-lg bg-hse-blue-50 flex items-center justify-center text-hse-red-600 mx-auto mb-4">{item.icon}</div>
                <h3 className="font-bold text-hse-heading-dark mb-3">{item.title}</h3>
                <p className="text-hse-body-text text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container section">
          <SectionTitle
            title="Commitment to Safety & Quality"
            subtitle="Every project is executed with uncompromising attention to safety standards and quality workmanship."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-hse-heading-dark">Site-Specific Design</h4>
                  <p className="text-hse-body-text text-base">Solutions tailored to your facility layout, risk profile, and applicable fire safety codes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-hse-heading-dark">Qualified Professionals</h4>
                  <p className="text-hse-body-text text-base">Engineers and technicians trained in modern fire protection and electrical safety practices.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlarmClock className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-hse-heading-dark">Responsive Support</h4>
                  <p className="text-hse-body-text text-base">After-sales maintenance and rapid response to keep your systems operational year-round.</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-hse-border bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1558488887-d9ad34e72142?w=800&q=80"
                alt="Technical team at work"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container section text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-2xl text-hse-body-text font-medium mb-6 italic">
              "Protecting lives and property through engineering excellence — one facility at a time."
            </p>
            <div className="flex justify-center">
              <span className="w-12 h-12 rounded-full bg-hse-red-600 flex items-center justify-center text-white font-bold text-sm mx-auto" aria-label="Heat Shield Engineering">HSE</span>
            </div>
            <p className="mt-4 text-base text-hse-body-text/80">HEAT SHIELD ENGINEERING — Dhaka, Bangladesh</p>
          </div>
        </div>
      </section>
    </div>
  )
}

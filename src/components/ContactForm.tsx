'use client'

import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { Mail, Phone, Send } from 'lucide-react'
import { CONTACT, QUOTE_WHATSAPP_TEXT } from '../config/contact'

interface ContactFormValues {
  fullName: string
  companyName: string
  email: string
  phone: string
  service: string
  location: string
  message: string
}

const SERVICE_OPTIONS = [
  'Fire Protection System Design',
  'Fire Detection & Alarm Installation',
  'Fire Suppression & Extinguishing',
  'Fire Pump & Hydrant System',
  'Fire Door & Emergency Exit',
  'Electrical & Lightning Safety',
  'Inspection, Testing & Commissioning',
  'Maintenance (AMC)',
  'Fire Safety Equipment Supply',
  'Fire Safety Audit & Compliance',
]

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ defaultValues: { service: '' } })

  const onSubmit = (data: ContactFormValues) => {
    console.log('Inquiry submitted:', data)
    alert('Thank you for your inquiry. We have received your details and will get back to you shortly.')
  }

  const field = 'w-full px-4 py-3 rounded-md border text-base focus:outline-none focus:ring-2 focus:ring-hse-blue-600 focus:border-hse-blue-600 focus-visible:ring-hse-blue-600 focus:border-transparent transition-colors min-h-[48px]'
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <label htmlFor="cf-fullName" className="block text-sm font-medium text-hse-text">Full Name</label>
          <input
            id="cf-fullName"
            autoComplete="name"
            {...register('fullName', { required: 'Full name is required' })}
            type="text"
            placeholder="Enter your full name"
            className={`${field} ${errors.fullName ? 'border-hse-red-600' : 'border-hse-border'}`}
          />
          {errors.fullName && <p className="text-sm text-hse-red-600">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="cf-company" className="block text-sm font-medium text-hse-text">Company Name</label>
          <input id="cf-company" autoComplete="organization" {...register('companyName')} type="text" placeholder="Company or organization" className={`${field} border-hse-border`} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <label htmlFor="cf-email" className="block text-sm font-medium text-hse-text">Email Address</label>
          <input
            id="cf-email"
            autoComplete="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
            type="email"
            placeholder="you@company.com"
            className={`${field} ${errors.email ? 'border-hse-red-600' : 'border-hse-border'}`}
          />
          {errors.email && <p className="text-sm text-hse-red-600">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="cf-phone" className="block text-sm font-medium text-hse-text">Phone Number</label>
          <input
            id="cf-phone"
            autoComplete="tel"
            inputMode="tel"
            {...register('phone', { required: 'Phone number is required' })}
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
            className={`${field} ${errors.phone ? 'border-hse-red-600' : 'border-hse-border'}`}
          />
          {errors.phone && <p className="text-sm text-hse-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <label htmlFor="cf-service" className="block text-sm font-medium text-hse-text">Service Required</label>
          <select id="cf-service" {...register('service')} className={`${field} border-hse-border`}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="cf-location" className="block text-sm font-medium text-hse-text">Project Location</label>
          <input id="cf-location" autoComplete="street-address" {...register('location')} type="text" placeholder="City or site address" className={`${field} border-hse-border`} />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="cf-message" className="block text-sm font-medium text-hse-text">Message</label>
        <textarea
          id="cf-message"
          {...register('message', { required: 'Message is required' })}
          rows={4}
          placeholder="Tell us about your project requirements..."
          className={`w-full px-4 py-3 rounded-md border text-base focus:outline-none focus:ring-2 focus:ring-hse-blue-600 focus:border-hse-blue-600 focus-visible:ring-hse-blue-600 focus:border-transparent transition-colors min-h-[120px] ${errors.message ? 'border-hse-red-600' : 'border-hse-border'}`}
        />
        {errors.message && <p className="text-sm text-hse-red-600">{errors.message.message}</p>}
      </div>
      <div className="pt-2">
        <Button type="submit" variant="primary" className="w-full min-h-[48px] py-3 text-base font-semibold normal-case tracking-normal shadow-[0_4px_12px_rgba(230,58,46,.25)] hover:shadow-[0_6px_16px_rgba(230,58,46,.35)] hover:brightness-100 hover:translate-y-0 focus-visible:ring-[#0b4fc4] focus-visible:ring-offset-2" style={{ background: '#e63a2e', textTransform: 'none', letterSpacing: 'normal' }} disabled={isSubmitting}>
          <Send className="w-4 h-4 mr-2" aria-hidden="true" />Send inquiry
        </Button>
      </div>
      <div className="mt-8 border-t border-hse-border pt-6">
        <h3 className="text-sm font-bold text-hse-blue-900 mb-6">Or reach us directly</h3>
        <div className="space-y-4">
          <a href={`${CONTACT.whatsapp}?text=${encodeURIComponent(QUOTE_WHATSAPP_TEXT)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full" aria-label={`Contact ${CONTACT.company} on WhatsApp for a quote`}>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white"><span className="text-sm">WA</span></div>
            <div>
              <div className="text-sm font-semibold text-hse-blue-900">WhatsApp (get a quote)</div>
              <div className="text-xs text-hse-muted" style={{whiteSpace:'nowrap'}}>+880 9658-586140</div>
            </div>
          </a>
          {CONTACT.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 w-full" aria-label={`Call ${CONTACT.company} ${p.label} ${p.display}`}>
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-hse-blue-50 flex items-center justify-center text-hse-blue-600"><Phone className="w-5 h-5" /></div>
              <div>
                <div className="text-sm font-semibold text-hse-blue-900">{p.label}</div>
                <div className="text-xs text-hse-muted" style={{whiteSpace:'nowrap'}}>{p.display}</div>
              </div>
            </a>
          ))}
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-hse-blue-50 flex items-center justify-center text-hse-blue-600"><Mail className="w-5 h-5" /></div>
            <div>
              <div className="text-sm font-semibold text-hse-blue-900">Email Us</div>
              <div className="text-xs text-hse-muted">{CONTACT.email}</div>
            </div>
          </a>
        </div>
      </div>
    </form>
  )
}

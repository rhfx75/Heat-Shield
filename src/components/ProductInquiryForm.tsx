import { useId, useState } from 'react'
import { Button } from '../components/ui/Button'

interface InquiryFormProps { initialProductName?: string; initialProductModel?: string; onSubmit?: (data: InquiryFormData) => Promise<void> | void }
export interface InquiryFormData { fullName: string; companyName: string; email: string; phone: string; productName: string; modelNumber: string; projectLocation: string; quantity: string; inquiryType: string; message: string }
const INQUIRY_TYPES = ['Request Pricing','Technical Information','Product Availability','Project Consultation','Bulk Purchase'] as const

export function ProductInquiryForm({ initialProductName = '', initialProductModel = '', onSubmit }: InquiryFormProps) {
  const uid = useId().replace(/:/g, '')
  const [form, setForm] = useState<InquiryFormData>({ fullName:'', companyName:'', email:'', phone:'', productName: initialProductName, modelNumber: initialProductModel, projectLocation:'', quantity:'', inquiryType: INQUIRY_TYPES[0], message:'' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email format'
    if (!form.phone.trim()) next.phone = 'Phone number is required'
    if (!form.productName.trim()) next.productName = 'Product name is required'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next); return Object.keys(next).length === 0
  }
  const set = (k: keyof InquiryFormData, v: string) => { setForm((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((p) => { const { [k]: _, ...r } = p; return r }) }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!validate()) return; setStatus('submitting'); setServerError('')
    try { if (onSubmit) await onSubmit(form); setStatus('success') } catch { setStatus('error'); setServerError('Unable to submit inquiry. Please try again later.') }
  }
  if (status === 'success') return <div className="inquiry-success" role="status"><div className="inquiry-success-icon">✓</div><h3 className="inquiry-success-title">Inquiry submitted</h3><p className="inquiry-success-message">Thank you for your quotation request for {form.productName}. Our team will contact you shortly.</p></div>

  const F = ({ id, label, k, req, type='text', ph, ac, im, full }: { id:string; label:string; k:keyof InquiryFormData; req?:boolean; type?:string; ph?:string; ac?:string; im?:React.HTMLAttributes<HTMLInputElement>['inputMode']; full?:boolean }) => (
    <div className={`inquiry-field${full ? ' inquiry-field-full' : ''}`}>
      <label className="inquiry-label" htmlFor={id}>{label} {req ? <span className="inquiry-required">*</span> : null}</label>
      <input id={id} type={type} autoComplete={ac} inputMode={im} className={`inquiry-input ${errors[k] ? 'inquiry-input-error' : ''}`} style={{ fontSize:16, minHeight:48 }} value={form[k]} onChange={(e)=>set(k,e.target.value)} placeholder={ph} aria-invalid={!!errors[k]} />
      {errors[k] ? <span className="inquiry-error-text">{errors[k]}</span> : null}
    </div>
  )
  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <h2 className="inquiry-title" style={{fontSize:'1.2rem'}}>Request a quotation</h2>
      <p className="inquiry-subtitle">Please provide your details for {form.productName || 'this product'}.</p>
      {serverError ? <div className="inquiry-error" role="alert">{serverError}</div> : null}
      <div className="inquiry-grid">
        <F id={`${uid}-n`} label="Full Name" k="fullName" req ph="Your name" ac="name" />
        <F id={`${uid}-c`} label="Company Name" k="companyName" ph="Company or organization" ac="organization" />
        <F id={`${uid}-e`} label="Email Address" k="email" req type="email" ph="you@example.com" ac="email" />
        <F id={`${uid}-p`} label="Phone Number" k="phone" req type="tel" ph="+880 1XXX-XXXXXX" ac="tel" im="tel" />
        <F id={`${uid}-pr`} label="Product Name" k="productName" req ph="Product name" full />
        <F id={`${uid}-m`} label="Model Number" k="modelNumber" ph="If known" />
        <F id={`${uid}-l`} label="Project Location" k="projectLocation" ph="City or site address" ac="street-address" />
        <F id={`${uid}-q`} label="Quantity" k="quantity" ph="e.g. 10 units" im="numeric" />
        <div className="inquiry-field inquiry-field-full"><label className="inquiry-label" htmlFor={`${uid}-t`}>Inquiry Type</label><select id={`${uid}-t`} className="inquiry-select" style={{fontSize:16,minHeight:48}} value={form.inquiryType} onChange={(e)=>set('inquiryType',e.target.value)}>{INQUIRY_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
        <div className="inquiry-field inquiry-field-full"><label className="inquiry-label" htmlFor={`${uid}-msg`}>Message <span className="inquiry-required">*</span></label><textarea id={`${uid}-msg`} className={`inquiry-textarea ${errors.message ? 'inquiry-input-error' : ''}`} style={{fontSize:16,minHeight:120}} value={form.message} onChange={(e)=>set('message',e.target.value)} rows={4} placeholder="Please share your project requirements..." aria-invalid={!!errors.message} />{errors.message ? <span className="inquiry-error-text">{errors.message}</span> : null}</div>
      </div>
      <div className="inquiry-actions"><Button type="submit" variant="primary" className="w-full min-h-[48px] normal-case tracking-normal text-base font-semibold" disabled={status==='submitting'}>{status==='submitting' ? 'Submitting…' : 'Submit inquiry'}</Button></div>
    </form>
  )
}

import { useState } from 'react'
import { Button } from '../components/ui/Button'

interface InquiryFormProps {
  initialProductName?: string
  initialProductModel?: string
  onSubmit?: (data: InquiryFormData) => Promise<void> | void
}

export interface InquiryFormData {
  fullName: string
  companyName: string
  email: string
  phone: string
  productName: string
  modelNumber: string
  projectLocation: string
  quantity: string
  inquiryType: string
  message: string
}

const INQUIRY_TYPES = [
  'Request Pricing',
  'Technical Information',
  'Product Availability',
  'Project Consultation',
  'Bulk Purchase',
] as const

export function ProductInquiryForm({
  initialProductName = '',
  initialProductModel = '',
  onSubmit,
}: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productName: initialProductName,
    modelNumber: initialProductModel,
    projectLocation: '',
    quantity: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email format'
    if (!form.phone.trim()) next.phone = 'Phone number is required'
    if (!form.productName.trim()) next.productName = 'Product name is required'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (key: keyof InquiryFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => { const { [key]: _, ...rest } = prev; return rest })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setServerError('')
    try {
      if (onSubmit) {
        await onSubmit(form)
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setServerError('Unable to submit inquiry. Please try again later.')
    }
  }

  if (status === 'success') {
    return (
      <div className="inquiry-success">
        <div className="inquiry-success-icon">✓</div>
        <h3 className="inquiry-success-title">Inquiry Submitted</h3>
        <p className="inquiry-success-message">
          Thank you for your quotation request for {form.productName}. Our team will contact you shortly.
        </p>
      </div>
    )
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <h2 className="inquiry-title">Request a Quotation</h2>
      <p className="inquiry-subtitle">
        Please provide your details for {form.productName}.
      </p>

      {serverError && (
        <div className="inquiry-error">{serverError}</div>
      )}

      <div className="inquiry-grid">
        <div className="inquiry-field">
          <label className="inquiry-label">Full Name <span className="inquiry-required">*</span></label>
          <input
            type="text"
            className={`inquiry-input ${errors.fullName ? 'inquiry-input-error' : ''}`}
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
          {errors.fullName && <span className="inquiry-error-text">{errors.fullName}</span>}
        </div>

        <div className="inquiry-field">
          <label className="inquiry-label">Company Name</label>
          <input
            type="text"
            className={`inquiry-input ${errors.companyName ? 'inquiry-input-error' : ''}`}
            value={form.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            placeholder="ABC Engineering Ltd."
          />
          {errors.companyName && <span className="inquiry-error-text">{errors.companyName}</span>}
        </div>

        <div className="inquiry-field">
          <label className="inquiry-label">Email Address <span className="inquiry-required">*</span></label>
          <input
            type="email"
            className={`inquiry-input ${errors.email ? 'inquiry-input-error' : ''}`}
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
          />
          {errors.email && <span className="inquiry-error-text">{errors.email}</span>}
        </div>

        <div className="inquiry-field">
          <label className="inquiry-label">Phone Number <span className="inquiry-required">*</span></label>
          <input
            type="tel"
            className={`inquiry-input ${errors.phone ? 'inquiry-input-error' : ''}`}
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+880 1788 585741"
          />
          {errors.phone && <span className="inquiry-error-text">{errors.phone}</span>}
        </div>

        <div className="inquiry-field inquiry-field-full">
          <label className="inquiry-label">Product Name <span className="inquiry-required">*</span></label>
          <input
            type="text"
            className={`inquiry-input ${errors.productName ? 'inquiry-input-error' : ''}`}
            value={form.productName}
            onChange={(e) => handleChange('productName', e.target.value)}
            placeholder="e.g. FM-200 Clean Agent Suppression System"
          />
          {errors.productName && <span className="inquiry-error-text">{errors.productName}</span>}
        </div>

        <div className="inquiry-field">
          <label className="inquiry-label">Model Number</label>
          <input
            type="text"
            className={`inquiry-input ${errors.modelNumber ? 'inquiry-input-error' : ''}`}
            value={form.modelNumber}
            onChange={(e) => handleChange('modelNumber', e.target.value)}
            placeholder="e.g. FM-200"
          />
          {errors.modelNumber && <span className="inquiry-error-text">{errors.modelNumber}</span>}
        </div>

        <div className="inquiry-field">
          <label className="inquiry-label">Project Location</label>
          <input
            type="text"
            className={`inquiry-input ${errors.projectLocation ? 'inquiry-input-error' : ''}`}
            value={form.projectLocation}
            onChange={(e) => handleChange('projectLocation', e.target.value)}
            placeholder="Dhaka, Bangladesh"
          />
          {errors.projectLocation && <span className="inquiry-error-text">{errors.projectLocation}</span>}
        </div>

        <div className="inquiry-field">
          <label className="inquiry-label">Quantity</label>
          <input
            type="text"
            className={`inquiry-input ${errors.quantity ? 'inquiry-input-error' : ''}`}
            value={form.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            placeholder="e.g. 10 units"
          />
          {errors.quantity && <span className="inquiry-error-text">{errors.quantity}</span>}
        </div>

        <div className="inquiry-field inquiry-field-full">
          <label className="inquiry-label">Inquiry Type</label>
          <select
            className="inquiry-select"
            value={form.inquiryType}
            onChange={(e) => handleChange('inquiryType', e.target.value as any)}
          >
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="inquiry-field inquiry-field-full">
          <label className="inquiry-label">Message <span className="inquiry-required">*</span></label>
          <textarea
            className={`inquiry-textarea ${errors.message ? 'inquiry-input-error' : ''}`}
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            placeholder="Please share your project requirements..."
          />
          {errors.message && <span className="inquiry-error-text">{errors.message}</span>}
        </div>
      </div>

      <div className="inquiry-actions">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </div>

      <p className="inquiry-note">
        Backend integration required: connect the onSubmit handler to your inquiry API or email service.
      </p>
    </form>
  )
}

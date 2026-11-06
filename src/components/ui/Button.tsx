import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'orange' | 'accent' | 'whatsapp' | 'whatsapp-sm' | 'ghost'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => {
  const base = 'inline-flex items-center justify-center font-heading font-semibold uppercase tracking-[0.06em] text-[14px] md:text-[15px] rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hse-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none px-6 py-3'
  const variants: Record<string, string> = {
    primary: 'text-white border-0 bg-[linear-gradient(135deg,#E53935_0%,#FF5A52_100%)] shadow-[0_6px_18px_rgba(229,57,53,0.35)] hover:brightness-110 hover:-translate-y-px active:bg-[#C62828] active:translate-y-0',
    secondary: 'bg-hse-blue-600 text-white border border-hse-blue-600 hover:bg-hse-blue-700',
    outline: 'border-2 border-hse-blue-600 text-hse-blue-600 bg-transparent hover:bg-hse-blue-600 hover:text-white',
    accent: 'text-white border-0 bg-[linear-gradient(135deg,#E53935_0%,#FF5A52_100%)] shadow-[0_6px_18px_rgba(229,57,53,0.35)] hover:brightness-110',
    orange: 'text-white border-0 bg-[linear-gradient(135deg,#E53935_0%,#FF5A52_100%)] shadow-[0_6px_18px_rgba(229,57,53,0.35)] hover:brightness-110',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20ad5a] focus:ring-[#25D366] px-5 py-2.5 gap-2 normal-case tracking-normal',
    'whatsapp-sm': 'bg-[#25D366] text-white hover:bg-[#20ad5a] focus:ring-[#25D366] px-4 py-2 gap-1.5 text-xs normal-case tracking-normal',
    ghost: 'text-hse-text hover:bg-hse-surface normal-case tracking-normal',
  }
  return (
    <button ref={ref} className={`${base} ${variants[variant] ?? variants.primary} ${className ?? ''}`} {...props} />
  )
})

Button.displayName = 'Button'

export { Button }

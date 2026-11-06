import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={`mb-12 text-center ${className ?? ''}`}>
      <motion.h2
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-[28px] md:text-[40px] font-bold uppercase text-hse-blue-900 mb-3 tracking-tight leading-[1.15]"
      >
        {title}
      </motion.h2>
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[linear-gradient(135deg,#E53935_0%,#FF5A52_100%)]" aria-hidden="true" />
      {subtitle && (
        <motion.p
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-hse-muted max-w-2xl mx-auto leading-[1.65]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

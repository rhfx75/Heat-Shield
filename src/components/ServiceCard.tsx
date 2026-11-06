import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, BellRing, Flame, Waves, DoorOpen, Zap, ClipboardCheck, Wrench, ShieldCheck } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  'drafting-compass': Compass,
  'bell-ring': BellRing,
  'flame-kindling': Flame,
  waves: Waves,
  'door-open': DoorOpen,
  zap: Zap,
  'clipboard-check': ClipboardCheck,
  wrench: Wrench,
}

const FILTER_ICONS: Record<string, React.ElementType> = {
  'Fire Protection': ShieldCheck,
  'Detection & Alarm': BellRing,
  'Electrical Safety': Zap,
  Maintenance: Wrench,
}

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon: string
  image: string
  category: string
  index?: number
  visible?: boolean
  className?: string
}

export function ServiceCard({ id, title, description, icon, image, category, visible = true, className }: ServiceCardProps) {
  const Icon = ICON_MAP[icon]
  const FilterIcon = FILTER_ICONS[category]

  return (
    <AnimatePresence>
      {visible && (
        <motion.article
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0, delay: 0 }}
          className={`group relative flex flex-col h-full rounded-[14px] border border-hse-blue/20 bg-white overflow-hidden hover:border-hse-red-600 transition-all duration-300 cursor-pointer ${className || ''}`}
        >
          <div className="relative h-[190px] overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-b from-hse-blue-900/0 to-hse-blue-900/55"
            />
            <img
              src={image}
              alt={title}
              className="w-full h-[190px] object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
              width="400"
              height="190"
              loading="lazy"
            />
            <div className="absolute inset-0 z-10 bg-white/0 group-hover:bg-white/10 transition-colors duration-300">
              <div className="absolute -left-3 -bottom-3 z-20 w-12 h-12 rounded-full bg-hse-blue-pale border border-hse-border flex items-center justify-center shadow-sm">
                {Icon && <Icon className={`w-6 h-6 ${['flame-kindling','bell-ring'].includes(icon) ? 'text-hse-red' : 'text-hse-blue'}`} />}
              </div>
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute -top-3 left-[20%] w-3 h-[200px] bg-white rotate-12 blur-[12px] group-hover:animate-[sweep_1.5s_ease-out]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-hse-red-600 group-hover:w-full transition-all duration-300 ease-out" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3">
              {FilterIcon && (
                <div className="w-10 h-10 rounded-xl bg-hse-blue-pale flex items-center justify-center shrink-0"><FilterIcon className="w-5 h-5 text-hse-blue" />
                </div>
              )}
              <h3 className="font-bold text-[19px] text-hse-heading-dark leading-tight group-hover:text-hse-blue-600 transition-colors">
                {title}
              </h3>
            </div>
            <p className="text-[15px] text-hse-body-text leading-relaxed mb-6 flex-1">
              {description}
            </p>
            <Link
              to={`/services/${id}`}
              className="flex items-center gap-1 text-[14px] font-bold text-hse-red-600 transition-colors hover:text-hse-red-600 group-hover:text-hse-blue-600"
              onMouseEnter={(e: React.MouseEvent) => {
                const arrow = e.currentTarget.querySelector('[data-learn-arrow]')
                if (arrow) arrow.classList.add('translate-x-1')
              }}
              onMouseLeave={(e: React.MouseEvent) => {
                const arrow = e.currentTarget.querySelector('[data-learn-arrow]')
                if (arrow) arrow.classList.remove('translate-x-1')
              }}
            >
              Learn More <ArrowRight data-learn-arrow className="w-3 h-3 transition-transform duration-200" />
            </Link>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  )
}

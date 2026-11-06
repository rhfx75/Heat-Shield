import type { ComponentType } from 'react'
import { ArrowRight, BellRing, ClipboardCheck, Compass, DoorOpen, Flame, HardHat, ShieldCheck, Waves, Wrench, Zap } from 'lucide-react'

const icons: Record<string, ComponentType<{ className?: string }>> = {
  ArrowRight, BellRing, ClipboardCheck, Compass, DoorOpen, Flame, HardHat, ShieldCheck, Waves, Wrench, Zap,
  DraftingCompass: Compass, BellRingIcon: BellRing, FlameKindling: Flame, DoorOpenIcon: DoorOpen, ClipboardCheckIcon: ClipboardCheck,
}

function toPascal(key: string) {
  return key.replace(/(^|[-_\s]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase())
}

export function getServiceIcon(icon?: string): ComponentType<{ className?: string }> {
  if (!icon) return ShieldCheck
  return icons[icon] || icons[toPascal(icon)] || icons[icon.replace(/-icon$/i, '')] || ShieldCheck
}

export { ArrowRight, BellRing, ClipboardCheck, Compass, DoorOpen, Flame, HardHat, ShieldCheck, Waves, Wrench, Zap }
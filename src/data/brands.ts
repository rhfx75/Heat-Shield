export interface Brand {
  id: string
  name: string
  image: string
  alt: string
  description: string
}

export const brands: Brand[] = [
  { id: 'naffco', name: 'NAFFCO', image: '/images/brands/naffco.webp', alt: 'NAFFCO brand', description: 'Firefighting equipment and integrated fire protection systems.' },
  { id: 'simplex', name: 'SIMPLEX', image: '/images/brands/simplex.png', alt: 'SIMPLEX brand', description: 'Fire detection and alarm panels.' },
  { id: 'bosch', name: 'BOSCH', image: '/images/brands/bosch.png', alt: 'BOSCH brand', description: 'Fire alarm and security systems.' },
  { id: 'hochiki', name: 'HOCHIKI', image: '/images/brands/hochiki.webp', alt: 'HOCHIKI brand', description: 'Fire detection devices and intelligent alarm systems.' },
  { id: 'sffco', name: 'SFFECO', image: '/images/brands/sffco.png', alt: 'SFFECO brand', description: 'Fire pumps, fire suppression and protection equipment.' },
  { id: 'siemens', name: 'SIEMENS', image: '/images/brands/siemens.png', alt: 'SIEMENS brand', description: 'Intelligent fire detection and building safety solutions.' },
  { id: 'patterson', name: 'PATTERSON', image: '/images/brands/patterson.png', alt: 'PATTERSON brand', description: 'Fire pump systems and water-based fire protection solutions.' },
  { id: 'notifier', name: 'NOTIFIER', image: '/images/brands/notifier.png', alt: 'NOTIFIER brand', description: 'Intelligent fire alarm and life safety systems.' },
]

export const brandCategories = ['Fire Alarm', 'Suppression', 'Detection', 'Extinguishing', 'Valves', 'Lighting']

export function getBrandById(id: string) {
  return brands.find((b) => b.id === id)
}

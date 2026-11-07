import {
  ShieldCheck,
  ShowerHead,
  Droplets,
  DoorClosed,
  Wind,
  Radar,
  LayoutDashboard,
  Cloud,
  Thermometer,
  BellRing,
  FireExtinguisher,
  Gauge,
  Fuel,
  Zap,
  Activity,
  Lightbulb,
  PlugZap,
  Shield,
  Loader,
} from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  ShowerHead,
  Droplets,
  DoorClosed,
  Wind,
  Radar,
  LayoutDashboard,
  Cloud,
  Thermometer,
  BellRing,
  FireExtinguisher,
  Gauge,
  Fuel,
  Zap,
  Activity,
  Lightbulb,
  PlugZap,
  Shield,
  Loader,
}

export interface Specification {
  label: string
  value: string
}

export interface ProductDocument {
  label: string
  url: string | null
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  subcategory: string
  brand?: string
  model?: string
  shortDescription: string
  description: string
  image: string | null
  gallery?: string[]
  specifications?: Specification[]
  features?: string[]
  applications?: string[]
  compatibility?: string[]
  certifications?: string[]
  documents?: ProductDocument[]
  availability?: 'available' | 'inquiry-required' | 'not-specified'
  featured?: boolean
  keywords?: string[]
  starterTypes?: { name: string; description: string }[]
  enclosureOptions?: { label: string; description: string }[]
  ledIndicators?: string[]
  operationalControls?: string[]
}

export interface ProductSubCategory {
  key: string
  slug: string
  label: string
  icon: string
}

export interface ProductCategory {
  key: string
  slug: string
  label: string
  icon: string
  image: string | null
  description: string
  subCategories: ProductSubCategory[]
}

export interface WhatsAppConfig {
  number: string
  messageTemplate: (productName: string) => string
}

export interface CatalogueDocument {
  id: string
  title: string
  manufacturer: string
  type: 'datasheet' | 'catalogue' | 'manual' | 'certificate'
  url: string | null
  fileSize?: string
  lastUpdated?: string
}

export const whatsAppConfig: WhatsAppConfig = {
  number: '8801954823265', // keep in sync with src/config/contact.ts
  messageTemplate: (productName: string) =>
    `Hello HEAT SHIELD ENGINEERING, I would like to request a quotation for ${productName}. Please share the price, specifications, availability, and delivery details.`,
}

export const productCategories: ProductCategory[] = [
  {
    key: 'fire-protection-system',
    slug: 'fire-protection',
    label: 'Fire Protection System',
    icon: 'ShieldCheck',
    image: null,
    description:
      'Complete fire protection systems including pumps, sprinklers, valves, hydrants, extinguishers, and suppression for commercial, industrial, and institutional buildings.',
    subCategories: [
      { key: 'fire-fighting-pumps', slug: 'fire-fighting-pumps', label: 'Fire Fighting Pumps', icon: 'Gauge' },
      { key: 'fire-sprinkler-systems', slug: 'fire-sprinkler-systems', label: 'Fire Sprinkler Systems', icon: 'ShowerHead' },
      { key: 'fire-protection-valves', slug: 'fire-protection-valves', label: 'Fire Protection Valves', icon: 'Valve' },
      { key: 'fire-hydrant-accessories', slug: 'fire-hydrant-accessories', label: 'Fire Hydrant & Standpipe Accessories', icon: 'Droplets' },
      { key: 'pipes-fittings-accessories', slug: 'pipes-fittings-accessories', label: 'Pipes, Fittings & Accessories', icon: 'PlugZap' },
      { key: 'fire-extinguishers', slug: 'fire-extinguishers', label: 'Fire Extinguishers', icon: 'FireExtinguisher' },
      { key: 'fire-suppression-systems', slug: 'fire-suppression-systems', label: 'Fire Suppression Systems', icon: 'Wind' },
    ],
  },
  {
    key: 'fire-detection-system',
    slug: 'fire-detection',
    label: 'Fire Detection & Alarm System',
    icon: 'Radar',
    image: null,
    description:
      'Fire alarm panels, smoke detectors, heat detectors, multi-sensor detectors, manual call points, sounders, interface modules, and alarm cables for early fire detection.',
    subCategories: [
      { key: 'fire-alarm-panels', slug: 'fire-alarm-panels', label: 'Fire Alarm Control Panels', icon: 'LayoutDashboard' },
      { key: 'smoke-detectors', slug: 'smoke-detectors', label: 'Smoke Detectors', icon: 'Cloud' },
      { key: 'heat-detectors', slug: 'heat-detectors', label: 'Heat Detectors', icon: 'Thermometer' },
      { key: 'multi-sensor-detectors', slug: 'multi-sensor-detectors', label: 'Multi-Sensor Detectors', icon: 'Shield' },
      { key: 'manual-call-points', slug: 'manual-call-points', label: 'Manual Call Points', icon: 'BellRing' },
      { key: 'sounders-notification', slug: 'sounders-notification', label: 'Sounders & Notification Appliances', icon: 'Zap' },
      { key: 'input-output-modules', slug: 'input-output-modules', label: 'Input, Output & Interface Modules', icon: 'Activity' },
      { key: 'fire-alarm-cables', slug: 'fire-alarm-cables', label: 'Fire Alarm Cables & Accessories', icon: 'PlugZap' },
    ],
  },
  {
    key: 'fire-rated-doors',
    slug: 'fire-rated-doors',
    label: 'Fire-Rated Doors & Emergency Exit Solutions',
    icon: 'DoorClosed',
    image: null,
    description:
      'Steel and timber fire-rated doors, glazed doors, acoustic doors, fire curtains, rolling shutters, hardware, frames, and emergency exit solutions.',
    subCategories: [
      { key: 'steel-fire-doors', slug: 'steel-fire-doors', label: 'Steel Fire-Rated Doors', icon: 'DoorClosed' },
      { key: 'single-double-leaf-fire-doors', slug: 'single-double-leaf-fire-doors', label: 'Single-Leaf & Double-Leaf Fire Doors', icon: 'DoorClosed' },
      { key: 'glazed-fire-doors', slug: 'glazed-fire-doors', label: 'Glazed Fire-Rated Doors', icon: 'DoorClosed' },
      { key: 'acoustic-fire-doors', slug: 'acoustic-fire-doors', label: 'Acoustic Fire Doors', icon: 'DoorClosed' },
      { key: 'fire-smoke-curtains', slug: 'fire-smoke-curtains', label: 'Fire & Smoke Curtains', icon: 'Wind' },
      { key: 'fire-rolling-shutters', slug: 'fire-rolling-shutters', label: 'Fire-Rated Rolling Shutters', icon: 'DoorClosed' },
      { key: 'fire-door-hardware', slug: 'fire-door-hardware', label: 'Fire Door Hardware', icon: 'Shield' },
      { key: 'fire-door-frames', slug: 'fire-door-frames', label: 'Fire Door Frames & Accessories', icon: 'DoorClosed' },
    ],
  },
  {
    key: 'passive-fire-protection',
    slug: 'passive-fire-protection',
    label: 'Passive Fire Protection System',
    icon: 'Shield',
    image: null,
    description:
      'Intumescent paint, cementitious fireproofing, fire-rated wall systems, firestop sealants, mortars, collars, building panels, sandwich panels, dampers, and volume control dampers.',
    subCategories: [
      { key: 'intumescent-paint', slug: 'intumescent-paint', label: 'Intumescent Fire-Retardant Paint', icon: 'Shield' },
      { key: 'cementitious-fireproofing', slug: 'cementitious-fireproofing', label: 'Cementitious Fireproofing', icon: 'Shield' },
      { key: 'fire-rated-wall-systems', slug: 'fire-rated-wall-systems', label: 'Fire-Rated Wall Systems', icon: 'Shield' },
      { key: 'firestop-sealants-mortars-collars', slug: 'firestop-sealants-mortars-collars', label: 'Firestop Sealants, Mortars & Collars', icon: 'Shield' },
      { key: 'fire-rated-building-panels', slug: 'fire-rated-building-panels', label: 'Fire-Rated Building Panels', icon: 'Shield' },
      { key: 'fire-rated-sandwich-panels', slug: 'fire-rated-sandwich-panels', label: 'Fire-Rated Sandwich Panels', icon: 'Shield' },
      { key: 'fire-smoke-dampers', slug: 'fire-smoke-dampers', label: 'Fire & Smoke Dampers', icon: 'Wind' },
      { key: 'volume-control-dampers', slug: 'volume-control-dampers', label: 'Volume Control Dampers', icon: 'Wind' },
    ],
  },
  {
    key: 'electrical-safety',
    slug: 'electrical-safety',
    label: 'Electrical & Lightning Safety System',
    icon: 'PlugZap',
    image: null,
    description:
      'Lightning protection systems, air terminals, conductors, down conductors, earth electrodes, earthing accessories, surge protection devices, and electrical protection accessories.',
    subCategories: [
      { key: 'lightning-protection-systems', slug: 'lightning-protection-systems', label: 'Lightning Protection Systems', icon: 'Zap' },
      { key: 'air-terminals', slug: 'air-terminals', label: 'Air Terminals', icon: 'Zap' },
      { key: 'lightning-conductors', slug: 'lightning-conductors', label: 'Lightning Protection Conductors', icon: 'Zap' },
      { key: 'down-conductors', slug: 'down-conductors', label: 'Down Conductors', icon: 'Zap' },
      { key: 'earth-electrodes', slug: 'earth-electrodes', label: 'Earth Electrodes', icon: 'Activity' },
      { key: 'earthing-accessories', slug: 'earthing-accessories', label: 'Earthing Accessories', icon: 'Activity' },
      { key: 'surge-protection-devices', slug: 'surge-protection-devices', label: 'Surge Protection Devices', icon: 'Zap' },
      { key: 'electrical-protection-accessories', slug: 'electrical-protection-accessories', label: 'Electrical Protection Accessories', icon: 'PlugZap' },
      { key: 'mcb-mccb', slug: 'mcb-mccb', label: 'MCB & MCCB', icon: 'Zap' },
      { key: 'rcbo-rccb', slug: 'rcbo-rccb', label: 'RCBO & RCCB', icon: 'Zap' },
    ],
  },
  {
    key: 'electrical-system',
    slug: 'electrical-system',
    label: 'Electrical System',
    icon: 'PlugZap',
    image: null,
    description:
      'Electrical power and building systems including busbar trunking, switchgear, panels, transformers, generators, compressors, solar equipment, boilers, lifts, and related electrical components. Product suitability, ratings, and approvals must be confirmed per project.',
    subCategories: [
      { key: 'busbar-trunking', slug: 'busbar-trunking', label: 'Busbar Trunking System', icon: 'PlugZap' },
      { key: 'switchgear-panels', slug: 'switchgear-panels', label: 'Switchgear & Panels', icon: 'LayoutDashboard' },
      { key: 'transformers', slug: 'transformers', label: 'Transformers', icon: 'Zap' },
      { key: 'generators-power', slug: 'generators-power', label: 'Generators & Power Equipment', icon: 'Gauge' },
      { key: 'solar-equipment', slug: 'solar-equipment', label: 'Solar Equipment', icon: 'Lightbulb' },
      { key: 'building-equipment', slug: 'building-equipment', label: 'Building & Utility Equipment', icon: 'Shield' },
    ],
  },
  {
    key: 'industrial-safety-equipment',
    slug: 'industrial-safety-equipment',
    label: 'Industrial Safety Equipment',
    icon: 'Shield',
    image: null,
    description:
      'Industrial and fire safety equipment including PPE, emergency tools, signage, fire extinguishers, and rescue/safety accessories. Suitability, standards, and approvals must be confirmed per project.',
    subCategories: [
      { key: 'ppe-safety-wear', slug: 'ppe-safety-wear', label: 'PPE & Safety Wear', icon: 'Shield' },
      { key: 'fire-safety-tools', slug: 'fire-safety-tools', label: 'Fire Safety Tools & Accessories', icon: 'FireExtinguisher' },
      { key: 'emergency-signage-lighting', slug: 'emergency-signage-lighting', label: 'Emergency Signage & Lighting', icon: 'Lightbulb' },
      { key: 'rescue-safety-equipment', slug: 'rescue-safety-equipment', label: 'Rescue & Safety Equipment', icon: 'ShieldCheck' },
    ],
  },
  {
    key: 'industrial-automation',
    slug: 'industrial-automation',
    label: 'Industrial Automation',
    icon: 'Activity',
    image: null,
    description:
      'Industrial automation and control equipment including PLC/HMI, drives, controllers, sensors, transmitters, and instrumentation. Specifications and suitability must be confirmed per project.',
    subCategories: [
      { key: 'plc-hmi-controllers', slug: 'plc-hmi-controllers', label: 'PLC, HMI & Controllers', icon: 'LayoutDashboard' },
      { key: 'variable-frequency-drives', slug: 'variable-frequency-drives', label: 'Variable Frequency Drives', icon: 'Zap' },
      { key: 'sensors-transmitters', slug: 'sensors-transmitters', label: 'Sensors & Transmitters', icon: 'Activity' },
      { key: 'instrumentation-controls', slug: 'instrumentation-controls', label: 'Instrumentation & Controls', icon: 'Gauge' },
    ],
  },
]

/* placeholderImage removed: products without real images are excluded from the catalog. */
export const products: Product[] = [
  // ---- Fire Protection System - Fire Fighting Pumps ----
  {
    id: 'diesel-engine-fire-pump-set',
    slug: 'diesel-engine-fire-pump-set',
    name: 'Diesel Engine Fire Pump Set',
    category: 'fire-protection-system',
    subcategory: 'fire-fighting-pumps',
    brand: 'Patterson',
    model: 'VDF-150',
    shortDescription: 'High-pressure diesel fire pump with controller.',
    description:
      'High-pressure diesel fire pump with controller for reliable water supply during power failure. Compliant with NFPA 20 standards.',
    image: '/images/products/fire-protection/patterson-vdf-150.png',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'VDF-150' },
      { label: 'Type', value: 'Diesel engine driven' },
      { label: 'Flow Rate', value: 'Up to 1,500 GPM' },
      { label: 'Certification', value: 'NFPA 20, UL listed' },
    ],
    features: ['Diesel engine', 'Controller included', 'NFPA 20 compliant'],
    applications: ['Fire pump rooms', 'Industrial facilities', 'Commercial buildings'],
    documents: [{ label: 'Operation Manual', url: null }],
  },
  {
    id: 'electric-motor-driven-fire-pump',
    slug: 'electric-motor-driven-fire-pump',
    name: 'Electric Motor Driven Fire Pump',
    category: 'fire-protection-system',
    subcategory: 'fire-fighting-pumps',
    brand: 'Patterson',
    model: 'VEF-200',
    shortDescription: 'Electric fire pump with UL-listed motor and controller.',
    description:
      'Electric fire pump with UL-listed motor and controller for reliable water supply in fire protection systems.',
    image: '/images/products/fire-protection/patterson-vef-200.webp',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'VEF-200' },
      { label: 'Type', value: 'Electric motor driven' },
      { label: 'Flow Rate', value: 'Up to 2,000 GPM' },
      { label: 'Certification', value: 'NFPA 20, UL listed' },
    ],
    features: ['Electric motor', 'UL-listed controller', 'NFPA 20 compliant'],
    applications: ['Fire pump rooms', 'Commercial buildings', 'Industrial facilities'],
    documents: [{ label: 'Installation Guide', url: null }],
  },

  // ---- Fire Protection System - Fire Sprinkler Systems ----
  {
    id: 'wet-pipe-sprinkler-system',
    slug: 'wet-pipe-sprinkler-system',
    name: 'Wet Pipe Sprinkler System',
    category: 'fire-protection-system',
    subcategory: 'fire-sprinkler-systems',
    brand: 'Tyco',
    model: 'TP-100',
    shortDescription: 'Closed-head wet pipe sprinkler system with automatic activation.',
    description: 'Closed-head wet pipe sprinkler system with automatic activation for fire protection.',
    image: '/images/products/fire-protection/tyco-tp-100.jpg',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'TP-100' },
      { label: 'System Type', value: 'Wet pipe' },
      { label: 'Operating Pressure', value: 'Up to 175 psi' },
      { label: 'Certification', value: 'UL 199, NFPA 13' },
    ],
    features: ['Closed-head sprinklers', 'Automatic activation', 'Water-filled piping'],
    applications: ['Commercial buildings', 'Residential complexes', 'Hotels'],
    documents: [{ label: 'Design Guide', url: null }],
  },
  {
    id: 'butterfly-valve',
    slug: 'butterfly-valve',
    name: 'Butterfly Valve',
    category: 'fire-protection-system',
    subcategory: 'fire-protection-valves',
    brand: 'Viking',
    model: 'BFV-200',
    shortDescription: 'Butterfly valve for fire protection flow control.',
    description: 'Butterfly valve for flow control in fire protection piping systems.',
    image: '/images/products/fire-protection/viking-bfv-200.webp',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'BFV-200' },
      { label: 'Type', value: 'Butterfly Valve' },
      { label: 'Certification', value: 'UL listed' },
    ],
    features: ['Quarter-turn operation', 'Fire protection rated', 'Low pressure drop'],
    applications: ['Fire protection piping', 'Flow control', 'Isolation'],
  },

  // ---- Fire Protection System - Fire Extinguishers ----
  {
    id: 'abc-dry-powder-extinguisher-6kg',
    slug: 'abc-dry-powder-fire-extinguisher-6kg',
    name: 'ABC Dry Powder Fire Extinguisher 6kg',
    category: 'fire-protection-system',
    subcategory: 'fire-extinguishers',
    brand: 'NAFFCO',
    model: 'FHE-6',
    shortDescription: '6kg ABC dry powder extinguisher suitable for Class A, B, and C fires.',
    description: '6kg ABC dry powder extinguisher suitable for Class A, B, and C fires.',
    image: '/images/products/fire-protection/naffco-fhe-6.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FHE-6' },
      { label: 'Capacity', value: '6 kg' },
      { label: 'Fire Class', value: 'A, B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['6kg capacity', 'ABC class', 'Refillable'],
    applications: ['General use', 'Commercial buildings', 'Workshops'],
    documents: [{ label: 'Datasheet', url: null }],
  },
  {
    id: 'abc-dry-powder-extinguisher-9kg',
    slug: 'abc-dry-powder-fire-extinguisher-9kg',
    name: 'ABC Dry Powder Fire Extinguisher 9kg',
    category: 'fire-protection-system',
    subcategory: 'fire-extinguishers',
    brand: 'NAFFCO',
    model: 'FHE-9',
    shortDescription: '9kg ABC dry powder extinguisher for industrial risk areas.',
    description: '9kg ABC dry powder extinguisher for industrial risk areas.',
    image: '/images/products/fire-protection/naffco-fhe-9.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FHE-9' },
      { label: 'Capacity', value: '9 kg' },
      { label: 'Fire Class', value: 'A, B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['9kg capacity', 'ABC class', 'Industrial grade'],
    applications: ['Industrial areas', 'Warehouses', 'Factories'],
  },
  {
    id: 'co2-extinguisher-2kg',
    slug: 'co2-fire-extinguisher-2kg',
    name: 'CO2 Fire Extinguisher 2kg',
    category: 'fire-protection-system',
    subcategory: 'fire-extinguishers',
    brand: 'NAFFCO',
    model: 'FCE-2',
    shortDescription: '2kg CO2 extinguisher for electrical fires (Class B & C).',
    description: '2kg CO2 extinguisher for electrical fires (Class B & C).',
    image: '/images/products/fire-protection/naffco-fce-2.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FCE-2' },
      { label: 'Capacity', value: '2 kg' },
      { label: 'Fire Class', value: 'B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['CO2 agent', 'Electrical fires', 'No residue'],
    applications: ['Electrical rooms', 'Switchgear rooms', 'Server rooms'],
  },
  {
    id: 'co2-extinguisher-5kg',
    slug: 'co2-fire-extinguisher-5kg',
    name: 'CO2 Fire Extinguisher 5kg',
    category: 'fire-protection-system',
    subcategory: 'fire-extinguishers',
    brand: 'NAFFCO',
    model: 'FCE-5',
    shortDescription: '5kg CO2 extinguisher for electrical switchgear rooms.',
    description: '5kg CO2 extinguisher for electrical switchgear rooms.',
    image: '/images/products/fire-protection/naffco-fce-5.webp',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FCE-5' },
      { label: 'Capacity', value: '5 kg' },
      { label: 'Fire Class', value: 'B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['5kg capacity', 'CO2 agent', 'No residue'],
    applications: ['Switchgear rooms', 'Electrical panels', 'Control rooms'],
  },
  {
    id: 'afff-foam-extinguisher-6ltr',
    slug: 'afff-foam-fire-extinguisher-6ltr',
    name: 'AFFF Foam Fire Extinguisher 6ltr',
    category: 'fire-protection-system',
    subcategory: 'fire-extinguishers',
    brand: 'NAFFCO',
    model: 'FF-6',
    shortDescription: '6 litre AFFF foam extinguisher for Class A and B fires.',
    description: '6 litre AFFF foam extinguisher for Class A and B fires.',
    image: '/images/products/fire-protection/naffco-ff-6.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FF-6' },
      { label: 'Capacity', value: '6 litre' },
      { label: 'Fire Class', value: 'A, B' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['AFFF foam', '6 litre capacity', 'Class A & B'],
    applications: ['Flammable liquid storage', 'Workshops', 'Garages'],
  },

  // ---- Fire Protection System - Fire Suppression Systems ----
  {
    id: 'fm200-clean-agent-suppression-system',
    slug: 'fm200-clean-agent-suppression-system',
    name: 'FM-200 Clean Agent Suppression System',
    category: 'fire-protection-system',
    subcategory: 'fire-suppression-systems',
    brand: '3M',
    model: 'FM-200',
    shortDescription: 'Gaseous fire suppression system for server rooms and critical electrical enclosures.',
    description: 'Gaseous fire suppression system for server rooms and critical electrical enclosures.',
    image: '/images/products/fire-protection/3m-fm-200.webp',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FM-200' },
      { label: 'Agent Type', value: 'Clean agent (HFC-227ea)' },
      { label: 'Application', value: 'Server rooms, electrical enclosures' },
      { label: 'Certification', value: 'NFPA 2001, UL listed' },
    ],
    features: ['Clean agent', 'Electrically non-conductive', 'No residue'],
    applications: ['Server rooms', 'Data centers', 'Electrical enclosures'],
    documents: [{ label: 'Design Manual', url: null }],
  },

  // ---- Fire Detection & Alarm System - Fire Alarm Control Panels ----
  {
    id: 'addressable-fire-alarm-control-panel',
    slug: 'addressable-fire-alarm-control-panel',
    name: 'Addressable Fire Alarm Control Panel',
    category: 'fire-detection-system',
    subcategory: 'fire-alarm-panels',
    brand: 'Notifier',
    model: 'NFS2-3030',
    shortDescription: 'Intelligent fire alarm control panel with loop-based device management.',
    description: 'Intelligent fire alarm control panel with loop-based device management and real-time event monitoring.',
    image: '/images/products/fire-detection/notifier-nfs2-3030.jpg',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'NFS2-3030' },
      { label: 'Capacity', value: 'Up to 3,030 points' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Communication', value: 'SLC loop' },
      { label: 'Certification', value: 'UL 864, ULC S527' },
    ],
    features: ['Loop-based device management', 'Real-time event monitoring', 'Networkable'],
    applications: ['Commercial buildings', 'Industrial facilities', 'Healthcare facilities'],
    documents: [
      { label: 'Product Page (Honeywell)', url: 'https://buildings.honeywell.com/us/en/products/by-category/fire-life-safety/control-panels/fire-alarm-control-panels/nfs2-3030-intelligent-fire-alarm-control-panel' },
      { label: 'Installation Manual', url: null },
      { label: 'Programming Guide', url: null },
    ],
  },
  {
    id: 'conventional-fire-alarm-panel',
    slug: 'conventional-fire-alarm-panel',
    name: 'Conventional Fire Alarm Panel',
    category: 'fire-detection-system',
    subcategory: 'fire-alarm-panels',
    brand: 'Hochiki',
    model: 'CHQ-ZC',
    shortDescription: 'Conventional zone-based fire alarm panel for small to medium installations.',
    description: 'Conventional zone-based fire alarm panel for small to medium installations.',
    image: '/images/products/fire-detection/hochiki-chq-zc.png',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'CHQ-ZC' },
      { label: 'Capacity', value: 'Up to 8 zones' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 864' },
    ],
    features: ['Zone-based detection', 'Simple wiring', 'Cost-effective'],
    applications: ['Small offices', 'Retail stores', 'Warehouses'],
    documents: [{ label: 'Installation Manual', url: null }],
  },
  {
    id: 'analog-addressable-fire-panel',
    slug: 'analog-addressable-fire-panel',
    name: 'Analog Addressable Fire Panel',
    category: 'fire-detection-system',
    subcategory: 'fire-alarm-panels',
    brand: 'Hochiki',
    model: 'ESP',
    shortDescription: 'Analog addressable panel with per-device sensitivity and drift compensation.',
    description: 'Analog addressable panel with per-device sensitivity and drift compensation.',
    image: '/images/products/fire-detection/hochiki-esp.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'ESP' },
      { label: 'Capacity', value: 'Up to 250 devices per loop' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 864, ULC S527' },
    ],
    features: ['Per-device sensitivity', 'Drift compensation', 'Analog addressable'],
    applications: ['Commercial buildings', 'Educational institutions'],
    documents: [],
  },
  // ---- NESBD Fire Protection System (source: nesbd.com category, added factual listing) ----
  {
    "id": "nesbd-open-drip-proof-motor-6",
    "slug": "open-drip-proof-motor",
    "name": "Open Drip Proof Motor",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "National Motors",
    "model": "NM",
    "shortDescription": "Open drip proof motor for fire pump applications.",
    "description": "Three-phase horizontal low-voltage squirrel-cage induction motor for fire pump applications, described for use in accordance with NFPA 20 requirements. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/open_drip_proof_motor_cec17df5f7a2f0f644c514af42f7d437.jpg",
    "availability": "inquiry-required",
    "features": [
      "Open drip proof enclosure",
      "Designed for fire pump applications",
      "NEMA energy efficient design (as listed)",
      "3 phase"
    ],
    "applications": [
      "Fire pump drivers",
      "Electric motor driven fire pump sets"
    ],
    "keywords": [
      "open drip proof motor",
      "fire pump motor",
      "ODP motor",
      "NM"
    ]
  },
  {
    "id": "nesbd-heat-exchanger-engine-21",
    "slug": "heat-exchanger-engine",
    "name": "Heat Exchanger Engine",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Heat exchanger engine for diesel fire pump applications.",
    "description": "Heat exchanger engine component used in diesel-driven fire pump systems. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/heat_exchanger_engine_04c7d40bc894e087047ff8eb1822790b.jpg",
    "availability": "inquiry-required",
    "features": [
      "Heat exchanger engine",
      "Diesel fire pump application"
    ],
    "applications": [
      "Diesel fire pump sets",
      "Fire pump rooms"
    ],
    "keywords": [
      "heat exchanger engine",
      "diesel fire pump engine"
    ]
  },
  {
    "id": "nesbd-vertical-multistage-pumps-38",
    "slug": "vertical-multistage-pumps",
    "name": "Vertical Multistage Pump",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Vertical multistage pump for fire/water applications.",
    "description": "Vertical multistage pump suitable for pressure boosting and water supply applications as specified by project requirements. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/vertical_multistage_pumps_b98203342d5ec0437f65ba3bfaf0d15d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Vertical multistage design",
      "Compact footprint"
    ],
    "applications": [
      "Pressure boosting",
      "Water supply systems"
    ],
    "keywords": [
      "vertical multistage pump"
    ]
  },
  {
    "id": "nesbd-flow-meter-198",
    "slug": "flow-meter-fire-pump",
    "name": "Flow Meter",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Flow meter for fire pump/test line applications.",
    "description": "Flow meter used for measuring flow in fire pump and test line applications, subject to project specification. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/flow_meter_881070c849650ad998e22e3dca085780.jpg",
    "availability": "inquiry-required",
    "features": [
      "Flow measurement",
      "Fire pump/test application"
    ],
    "applications": [
      "Fire pump test lines",
      "Pump rooms"
    ],
    "keywords": [
      "flow meter",
      "fire pump flow meter"
    ]
  },
  {
    "id": "nesbd-naffco-battery-charger-197",
    "slug": "naffco-battery-charger",
    "name": "NAFFCO Battery Charger",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "NAFFCO",
    "model": "",
    "shortDescription": "Battery charger for fire pump controller/engine starting systems.",
    "description": "Battery charger for fire pump diesel engine/controller starting and charging applications. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/naffco_battery_charger_525a3c5f3303fd977ef744ecf52b574d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Battery charging",
      "Fire pump system accessory"
    ],
    "applications": [
      "Diesel fire pump controllers",
      "Engine starting systems"
    ],
    "keywords": [
      "battery charger",
      "NAFFCO",
      "fire pump"
    ]
  },
  {
    "id": "nesbd-co2-fire-suppression-125",
    "slug": "co2-fire-suppression-system",
    "name": "CO2 Fire Suppression System",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "CO2",
    "shortDescription": "CO2 fire suppression for special hazard protection.",
    "description": "CO2 fire suppression system for special hazard applications where a non-conductive agent with no post-discharge residue is required. System design, occupancy safety, and approvals must be confirmed per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/co2_fire_protection_effective_clean_sustainable_f3b209b5d3cb3b6a647e39c9ed28e147.jpg",
    "availability": "inquiry-required",
    "features": [
      "Non-conductive agent",
      "No residue (as described)",
      "Special hazard protection"
    ],
    "applications": [
      "Electrical/sensitive equipment hazards (as applicable)",
      "Special hazard areas"
    ],
    "specifications": [
      {
        "label": "Agent",
        "value": "CO2"
      },
      {
        "label": "Approvals (as listed by source)",
        "value": "UL Listed, LPCB, VDS Approved (confirm per model/project)"
      }
    ],
    "keywords": [
      "CO2 suppression",
      "fire suppression",
      "special hazard"
    ]
  },
  {
    "id": "nesbd-fk-5-1-12-clean-agent-126",
    "slug": "clean-agent-fire-suppression-fk-5-1-12",
    "name": "Clean Agent Fire Suppression System FK-5-1-12",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "Honeywell",
    "model": "FK-5-1-12",
    "shortDescription": "FK-5-1-12 clean agent fire suppression system.",
    "description": "FK-5-1-12 (Novec 1230 type) clean agent fire suppression system for critical installations, as described by source. Complies with NFPA 2001 clean agent requirements as stated by source; confirm project design and approvals. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/clean_agent_fire_suppression_system_fk_5_1_12_77c739595b81f4fc37f195f6c8950da6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Clean agent suppression",
      "For critical installations (as listed)",
      "No residue (typical for clean agent)"
    ],
    "applications": [
      "Data centers",
      "Control rooms",
      "Telecom/critical facilities"
    ],
    "specifications": [
      {
        "label": "Agent",
        "value": "FK-5-1-12"
      },
      {
        "label": "Listing (as listed by source)",
        "value": "UL Listed (confirm per system)"
      }
    ],
    "keywords": [
      "FK-5-1-12",
      "Novec 1230",
      "clean agent",
      "fire suppression"
    ]
  },
  {
    "id": "nesbd-hfc-227ea-clean-agent-127",
    "slug": "clean-agent-fire-suppression-hfc-227ea",
    "name": "Clean Agent Fire Suppression System HFC-227ea",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "Honeywell",
    "model": "HFC-227ea",
    "shortDescription": "HFC-227ea clean agent fire suppression system.",
    "description": "HFC-227ea (FM-200 type) clean agent fire suppression system for critical installations, as described by source. Confirm applicable standards, environmental requirements, and project approvals. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/clean_agent_fire_suppression_system_5f3dd4c9e5a6838b32dbc4b51131984a.jpg",
    "availability": "inquiry-required",
    "features": [
      "Clean agent suppression",
      "For critical installations (as listed)"
    ],
    "applications": [
      "Data centers",
      "Control rooms",
      "Telecom/critical facilities"
    ],
    "specifications": [
      {
        "label": "Agent",
        "value": "HFC-227ea"
      },
      {
        "label": "Listing (as listed by source)",
        "value": "UL Listed (confirm per system)"
      }
    ],
    "keywords": [
      "HFC-227ea",
      "FM-200",
      "clean agent",
      "fire suppression"
    ]
  },
  {
    "id": "nesbd-inert-gas-system-201",
    "slug": "inert-gas-fire-suppression-system",
    "name": "Inert Gas Fire Suppression System",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "Inert gas fire suppression system for protected enclosures.",
    "description": "Inert gas fire suppression system for total flooding applications, subject to enclosure integrity and project design. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/inert_gas_system_500fbd0a6cfca874645e94c0405091be.jpg",
    "availability": "inquiry-required",
    "features": [
      "Inert gas suppression",
      "Total flooding application (as applicable)"
    ],
    "applications": [
      "Protected enclosures",
      "Critical rooms (project-specific)"
    ],
    "keywords": [
      "inert gas",
      "fire suppression"
    ]
  },
  {
    "id": "nesbd-fire-hose-rack-128",
    "slug": "fire-hose-rack-assembly-ul-fm",
    "name": "Fire Hose Rack Assembly (UL/FM Approved)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "NAFFCO",
    "model": "NHR 38V/NHR 64V",
    "shortDescription": "Fire hose rack assembly for Class II service.",
    "description": "Fire hose rack assembly designed for controlling incipient fire by building occupant use, described to conform to NFPA 14 Class II service. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_hose_rack_assembly_ul_fm_approved_40d171936bf3d0c2d6a75dd725b1f270.jpg",
    "availability": "inquiry-required",
    "features": [
      "Hose rack assembly",
      "UL/FM approved (as listed by source)",
      "Class II service (as described)"
    ],
    "applications": [
      "Building hose stations",
      "Standpipe systems"
    ],
    "specifications": [
      {
        "label": "Model (as listed)",
        "value": "NHR 38V / NHR 64V"
      }
    ],
    "keywords": [
      "fire hose rack",
      "hose rack assembly",
      "UL FM"
    ]
  },
  {
    "id": "nesbd-double-jacket-fire-hose-129",
    "slug": "double-jacket-fire-hose-ul-listed",
    "name": "Double Jacket Fire Hose (UL Listed)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "UL listed double jacket fire hose.",
    "description": "Double jacket fire hose, UL listed as stated by source. Confirm diameter, length, coupling, and listing for the project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/double_jacket_fire_hose_ul_listed_1774ab9ffa1b26d93d022bc657359641.jpg",
    "availability": "inquiry-required",
    "features": [
      "Double jacket construction",
      "UL listed (as listed by source)"
    ],
    "applications": [
      "Fire hose cabinets",
      "Hydrant/standpipe use"
    ],
    "keywords": [
      "double jacket fire hose",
      "UL listed hose"
    ]
  },
  {
    "id": "nesbd-single-jacket-fire-hose-132",
    "slug": "single-jacket-fire-hose-ul-listed",
    "name": "Single Jacket Fire Hose (UL Listed)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "UL listed single jacket fire hose.",
    "description": "Single jacket fire hose, UL listed as stated by source. Confirm diameter, length, coupling, and listing for the project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/single_jacket_fire_hose_ul_listed_64ab91c1ca01c4a8a47a8b08383c5ea2.jpg",
    "availability": "inquiry-required",
    "features": [
      "Single jacket construction",
      "UL listed (as listed by source)"
    ],
    "applications": [
      "Fire hose cabinets",
      "Standpipe use"
    ],
    "keywords": [
      "single jacket fire hose",
      "UL listed hose"
    ]
  },
  {
    "id": "nesbd-british-standard-couplings-130",
    "slug": "british-standard-couplings-kitemark-lpcb",
    "name": "British Standard Couplings (Kitemark/LPCB Approved)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "British standard fire hose couplings.",
    "description": "British Standard couplings, Kitemark/LPCB approved as stated by source. Confirm size and compatibility. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/british_standard_couplings_kitemark_lpcb_approved_d62f021ba700630f9d6c8d0bb7cb6cae.jpg",
    "availability": "inquiry-required",
    "features": [
      "British Standard couplings",
      "Kitemark/LPCB approved (as listed)"
    ],
    "applications": [
      "Fire hose connections",
      "Hydrant accessories"
    ],
    "keywords": [
      "British Standard coupling",
      "Kitemark",
      "LPCB"
    ]
  },
  {
    "id": "nesbd-hand-held-branch-pipe-131",
    "slug": "hand-held-branch-pipe-kitemark-lpcb",
    "name": "Hand Held Branch Pipe (Kitemark/LPCB Approved)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Hand held branch pipe for fire hose lines.",
    "description": "Hand held branch pipe/nozzle, Kitemark/LPCB approved as stated by source. Confirm inlet/jet type for the project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/hand_held_branch_pipe_kitemark_lpcb_approved_7a37f99ca0c896b9a6786fe99fb8e9b6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Hand held branch pipe",
      "Kitemark/LPCB approved (as listed)"
    ],
    "applications": [
      "Fire hose lines",
      "Hydrant cabinets"
    ],
    "keywords": [
      "branch pipe",
      "nozzle",
      "Kitemark",
      "LPCB"
    ]
  },
  {
    "id": "nesbd-oblique-landing-valve-flanged-133",
    "slug": "oblique-landing-valve-flanged-inlet",
    "name": "Oblique Landing Valve (Flanged Inlet)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Oblique landing valve with flanged inlet.",
    "description": "Oblique landing valve with flanged inlet for fire hydrant/standpipe systems. Confirm size, standard, and approval. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/oblique_landing_valve_flanged_inlet_494c04dee8ab1e5194fecd43e0e39de4.jpg",
    "availability": "inquiry-required",
    "features": [
      "Oblique landing valve",
      "Flanged inlet"
    ],
    "applications": [
      "Landing valves",
      "Standpipe systems"
    ],
    "keywords": [
      "oblique landing valve",
      "flanged inlet"
    ]
  },
  {
    "id": "nesbd-oblique-landing-valve-threaded-134",
    "slug": "oblique-landing-valve-threaded-inlet",
    "name": "Oblique Landing Valve (Threaded Inlet)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Oblique landing valve with threaded inlet.",
    "description": "Oblique landing valve with threaded inlet for fire hydrant/standpipe systems. Confirm size, standard, and approval. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/oblique_landing_valve_threaded_inlet_dd59aaa004b3b0e7ce2a3890ed9a09d8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Oblique landing valve",
      "Threaded inlet"
    ],
    "applications": [
      "Landing valves",
      "Standpipe systems"
    ],
    "keywords": [
      "oblique landing valve",
      "threaded inlet"
    ]
  },
  {
    "id": "nesbd-6x4-breeching-inlet-200",
    "slug": "6x4-way-breeching-inlet",
    "name": "6\" x 4-Way Breeching Inlet",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "6\" x 4-way breeching inlet for fire brigade connection.",
    "description": "6 inch x 4-way breeching inlet for fire department connection to dry/wet riser or hydrant systems, subject to local authority requirements. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/6_x_4_way_breeching_inlet_5b6fd6d1e83330d8eddd4af0d38dcad6.jpg",
    "availability": "inquiry-required",
    "features": [
      "4-way breeching inlet",
      "Fire brigade connection"
    ],
    "applications": [
      "Fire department connections",
      "Riser systems"
    ],
    "keywords": [
      "breeching inlet",
      "fire brigade inlet",
      "4-way"
    ]
  },
  {
    "id": "nesbd-pressure-reducing-valve-135",
    "slug": "pressure-reducing-valve-flanged",
    "name": "Pressure Reducing Valve (Flanged)",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Flanged pressure reducing valve for fire protection.",
    "description": "Flanged pressure reducing valve for controlling pressure in fire protection/hydrant systems. Confirm pressure rating and listing. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/pressure_reducing_valve_flanged_fd0645dbadf5db71c3cdc8221b994e94.jpg",
    "availability": "inquiry-required",
    "features": [
      "Pressure reducing",
      "Flanged connection"
    ],
    "applications": [
      "Hydrant/standpipe pressure control",
      "Fire protection systems"
    ],
    "keywords": [
      "pressure reducing valve",
      "PRV",
      "flanged"
    ]
  },
  {
    "id": "nesbd-angle-hose-valve-136",
    "slug": "angle-hose-valve-ul-listed",
    "name": "Angle Hose Valve (UL Listed)",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "UL listed angle hose valve.",
    "description": "Angle hose valve, UL listed as stated by source. Confirm size and connection type for the project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/angle_hose_valve_ul_listed_c14c292f863754603d1b640a41e4cc4a.jpg",
    "availability": "inquiry-required",
    "features": [
      "Angle hose valve",
      "UL listed (as listed by source)"
    ],
    "applications": [
      "Hose stations",
      "Standpipe systems"
    ],
    "keywords": [
      "angle hose valve",
      "UL listed"
    ]
  },
  {
    "id": "nesbd-non-return-valve-137",
    "slug": "non-return-valve-sd-nrv200cv",
    "name": "Non Return Valve (Shield SD-NRV200CV)",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "Shield",
    "model": "SD-NRV200CV",
    "shortDescription": "UL/FM approved non return (swing check) valve.",
    "description": "Shield non return valve model SD-NRV200CV, UL listed/FM approved as stated by source. Working pressure 200 psi; flange to ASME B16.1 Class 125; bolted bonnet; horizontal swing; renewable seat and disc. Confirm suitability for project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/non_return_valve_46d4509832d1f686e2ba9cb9a8902150.jpg",
    "availability": "inquiry-required",
    "features": [
      "Non return / swing check valve",
      "UL listed and FM approved (as listed)",
      "Working pressure 200 psi (as listed)"
    ],
    "applications": [
      "Fire protection piping",
      "Pump discharge/check service"
    ],
    "specifications": [
      {
        "label": "Model",
        "value": "SD-NRV200CV"
      },
      {
        "label": "Working pressure (as listed)",
        "value": "200 psi"
      },
      {
        "label": "Connection",
        "value": "Flange to ASME B16.1 Class 125"
      }
    ],
    "keywords": [
      "non return valve",
      "check valve",
      "NRV",
      "Shield",
      "SD-NRV200CV"
    ]
  },
  // ---- NESBD Fire Detection System (source: nesbd.com category, added factual listing) ----
  {
    "id": "nesbd-nfs-320e-142",
    "slug": "notifier-nfs-320e",
    "name": "NOTIFIER NFS-320E",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "NOTIFIER",
    "model": "NFS-320E",
    "shortDescription": "NOTIFIER NFS-320E fire alarm control panel.",
    "description": "NOTIFIER NFS-320E fire alarm control panel as listed by source. Confirm loop/device capacity, approvals, and configuration per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/notifier_nfs_320e_1b83c543231b6403865bed7a9434a1a4.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire alarm control panel",
      "NOTIFIER NFS-320E series (as listed)"
    ],
    "applications": [
      "Addressable fire alarm systems",
      "Commercial/industrial facilities"
    ],
    "keywords": [
      "NOTIFIER",
      "NFS-320E",
      "fire alarm control panel"
    ]
  },
  {
    "id": "nesbd-nfs2-640e-143",
    "slug": "notifier-nfs2-640e",
    "name": "NOTIFIER NFS2-640E",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "NOTIFIER",
    "model": "NFS2-640E",
    "shortDescription": "NOTIFIER NFS2-640E fire alarm control panel.",
    "description": "NOTIFIER NFS2-640E fire alarm control panel as listed by source. Confirm loop/device capacity, approvals, and configuration per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/notifier_nfs2_640e_2208f9879f8ca5fe6733db29ad521eb8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire alarm control panel",
      "NOTIFIER NFS2-640E series (as listed)"
    ],
    "applications": [
      "Addressable fire alarm systems",
      "Commercial/industrial facilities"
    ],
    "keywords": [
      "NOTIFIER",
      "NFS2-640E",
      "fire alarm control panel"
    ]
  },
  {
    "id": "nesbd-cpu2-3030d-140",
    "slug": "notifier-cpu2-3030d",
    "name": "Notifier CPU2-3030D",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "NOTIFIER",
    "model": "CPU2-3030D",
    "shortDescription": "Notifier CPU2-3030D control module.",
    "description": "Notifier CPU2-3030D central processing unit/module for compatible NOTIFIER systems as listed by source. Confirm compatibility and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/notifier_cpu2_3030d_7fd3c8c591533d837be5afdded40abc3.jpg",
    "availability": "inquiry-required",
    "features": [
      "NOTIFIER CPU/module",
      "For compatible NFS2-3030 systems (confirm)"
    ],
    "applications": [
      "Fire alarm control panels",
      "System upgrades/spares (project-specific)"
    ],
    "keywords": [
      "NOTIFIER",
      "CPU2-3030D"
    ]
  },
  {
    "id": "nesbd-fsp-951-144",
    "slug": "notifier-fsp-951-smoke-detector",
    "name": "FSP-951 Series Intelligent Photoelectric Smoke Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "NOTIFIER",
    "model": "FSP-951",
    "shortDescription": "Intelligent plug-in photoelectric smoke detector.",
    "description": "NOTIFIER FSP-951 series intelligent plug-in photoelectric smoke detector as listed by source. Confirm base, protocol, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fsp_951_series_intelligent_plug_in_photoelectric_smoke_detectors_96d7f0ce95805407ce8012681bb67ce6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Intelligent photoelectric smoke detection",
      "Plug-in detector (as listed)"
    ],
    "applications": [
      "Addressable fire alarm systems"
    ],
    "keywords": [
      "NOTIFIER",
      "FSP-951",
      "smoke detector"
    ]
  },
  {
    "id": "nesbd-maple-fw106-139",
    "slug": "maple-armor-fw106-addressable-panel",
    "name": "Addressable Fire Alarm System (Maple Armor FW106)",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "Maple Armor",
    "model": "FW106",
    "shortDescription": "Maple Armor FW106 addressable fire alarm panel.",
    "description": "Maple Armor FireWatcher FW106 addressable fire alarm control panel as listed by source. Source text indicates support for addressable signaling line circuits/devices; confirm exact capacity, voltage, approvals, and configuration per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/maple_armor_firewatcher_panel_106_supports_up_to_4_addressable_signaling_line_circuits_of_252_addressable_devicespoints_per_loop_wall_mount_red_color_120240v_df2cd2e399cb42bfded0e84609333799.jpg",
    "availability": "inquiry-required",
    "features": [
      "Addressable fire alarm control panel",
      "Maple Armor FW106 (as listed)"
    ],
    "applications": [
      "Addressable fire alarm systems"
    ],
    "specifications": [
      {
        "label": "Brand",
        "value": "Maple Armor"
      },
      {
        "label": "Model",
        "value": "FW106"
      }
    ],
    "keywords": [
      "Maple Armor",
      "FW106",
      "addressable fire alarm panel"
    ]
  },
  {
    "id": "nesbd-maple-addressable-panel-222",
    "slug": "maple-armor-addressable-fire-alarm-panel",
    "name": "Maple Armor Addressable Fire Alarm Control Panel",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "Maple Armor",
    "model": "",
    "shortDescription": "Maple Armor addressable fire alarm control panel.",
    "description": "Maple Armor addressable fire alarm control panel as listed by source. Confirm model, capacity, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/maple_armor_addressable_fire_alarm_control_panel_74c8e54bf0c06f611dd2d1471d29aa96.jpg",
    "availability": "inquiry-required",
    "features": [
      "Addressable fire alarm control panel"
    ],
    "applications": [
      "Addressable fire alarm systems"
    ],
    "keywords": [
      "Maple Armor",
      "addressable panel"
    ]
  },
  {
    "id": "nesbd-maple-agent-release-panel-223",
    "slug": "maple-armor-agent-release-fire-alarm-panel",
    "name": "Maple Armor Agent Release & Fire Alarm Control Panel",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "Maple Armor",
    "model": "",
    "shortDescription": "Agent release and fire alarm control panel.",
    "description": "Maple Armor agent release and fire alarm control panel as listed by source. Confirm releasing/service application, approvals, and configuration per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/maple_armor_agent_release_fire_alarm_control_panel_2acdce686e8d9ccaaf15a13aa45984a8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Agent release and fire alarm functions (as listed)"
    ],
    "applications": [
      "Suppression releasing systems (project-specific)",
      "Fire alarm systems"
    ],
    "keywords": [
      "Maple Armor",
      "agent release panel"
    ]
  },
  {
    "id": "nesbd-potter-explosion-proof-pull-211",
    "slug": "potter-explosion-proof-pull-station",
    "name": "Potter Explosion Proof Pull Station",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Potter",
    "model": "",
    "shortDescription": "Explosion proof manual pull station.",
    "description": "Potter explosion proof pull station as listed by source. Confirm hazardous area rating, approvals, and compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/potter_explosion_proof_pull_station_5900b38a64a5283952d7ff97335ac666.jpg",
    "availability": "inquiry-required",
    "features": [
      "Manual pull station",
      "Explosion proof (as listed)"
    ],
    "applications": [
      "Hazardous/special areas (project-specific)"
    ],
    "keywords": [
      "Potter",
      "explosion proof pull station"
    ]
  },
  {
    "id": "nesbd-potter-smoke-heat-combo-220",
    "slug": "potter-photoelectric-smoke-heat-detector",
    "name": "Potter Photoelectric Smoke/Heat Detector Combination",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Potter",
    "model": "",
    "shortDescription": "Photoelectric smoke and heat combination detector.",
    "description": "Potter photoelectric smoke/heat combination detector as listed by source. Confirm compatibility, protocol, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/potter_photoelectric_smokeheat_detector_combination_55f7ae2bc2cc36cc2c3490b2c7783ddf.jpg",
    "availability": "inquiry-required",
    "features": [
      "Smoke and heat detection combination",
      "Photoelectric technology (as listed)"
    ],
    "applications": [
      "Fire detection systems"
    ],
    "keywords": [
      "Potter",
      "smoke heat detector"
    ]
  },
  {
    "id": "nesbd-conventional-beam-detector-122",
    "slug": "optical-smoke-beam-detector-conventional",
    "name": "Optical Smoke Beam Detector (Conventional)",
    "category": "fire-detection-system",
    "subcategory": "beam-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "Optical smoke beam detector for conventional fire systems.",
    "description": "Optical smoke beam detector for conventional fire systems as listed by source. Confirm range, mounting, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/optical_smoke_beam_detector_for_conventional_fire_systems_ab3aa87c45c27d73ba35cb98fb58845b.jpg",
    "availability": "inquiry-required",
    "features": [
      "Beam smoke detection",
      "For conventional fire systems (as listed)"
    ],
    "applications": [
      "Large open areas",
      "Warehouses/atria (project-specific)"
    ],
    "keywords": [
      "beam detector",
      "optical smoke beam",
      "conventional"
    ]
  },
  {
    "id": "nesbd-aw-cfp2166-173",
    "slug": "aw-cfp2166-conventional-fire-alarm-panel",
    "name": "AW-CFP2166 Conventional Fire Alarm Control Panel",
    "category": "fire-detection-system",
    "subcategory": "control-panels",
    "brand": "",
    "model": "AW-CFP2166",
    "shortDescription": "Conventional fire alarm control panel.",
    "description": "AW-CFP2166 conventional fire alarm control panel as listed by source. Confirm zones, outputs, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/aw_cfp2166_conventional_fire_alarm_control_panel_7273e39011f68aa50c3d782a7aeb5b30.jpg",
    "availability": "inquiry-required",
    "features": [
      "Conventional fire alarm control panel"
    ],
    "applications": [
      "Conventional fire alarm systems"
    ],
    "keywords": [
      "AW-CFP2166",
      "conventional fire alarm panel"
    ]
  },
  {
    "id": "nesbd-l-series-horn-strobe-146",
    "slug": "l-series-led-horn-strobe",
    "name": "L-Series LED 2-Wire Wall-Mount Indoor Horn Strobe",
    "category": "fire-detection-system",
    "subcategory": "notification-devices",
    "brand": "",
    "model": "L-Series",
    "shortDescription": "LED 2-wire wall-mount indoor horn strobe.",
    "description": "L-Series LED 2-wire wall-mount indoor horn strobe as listed by source. Confirm voltage, candela settings, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/l_series_led_2_wire_wall_mount_indoor_horn_strobe_2f8753052ca5e818f647d0aab2c57421.jpg",
    "availability": "inquiry-required",
    "features": [
      "Horn and strobe notification",
      "LED 2-wire wall-mount (as listed)"
    ],
    "applications": [
      "Fire alarm notification"
    ],
    "keywords": [
      "horn strobe",
      "L-Series",
      "notification"
    ]
  },
  {
    "id": "nesbd-addressable-repeater-166",
    "slug": "addressable-repeater-nesbd",
    "name": "Addressable Repeater",
    "category": "fire-detection-system",
    "subcategory": "addressable-modules",
    "brand": "",
    "model": "",
    "shortDescription": "Addressable repeater panel/module.",
    "description": "Addressable repeater as listed by source. Confirm compatibility, display, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/addressable_repeater_20f2f52f3b23af5ecbfec717eddf17b5.jpg",
    "availability": "inquiry-required",
    "features": [
      "Addressable repeater"
    ],
    "applications": [
      "Remote fire alarm indication",
      "Addressable systems"
    ],
    "keywords": [
      "addressable repeater"
    ]
  },
  // ---- NESBD Passive Fire Protection / Doors & Hardware (source: nesbd.com category, added factual listing) ----
  {
    "id": "nesbd-automatic-fire-curtain-33",
    "slug": "automatic-fire-curtain",
    "name": "Automatic Fire Curtain",
    "category": "fire-rated-doors",
    "subcategory": "fire-smoke-curtains",
    "brand": "",
    "model": "",
    "shortDescription": "Automatic fire curtain for compartmentation/openings.",
    "description": "Automatic fire curtain as listed by source. Confirm fire rating, size, controls, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/automatic_fire_curtain_c0ffcc3534bfdea411ad62d95b4e4d05.jpg",
    "availability": "inquiry-required",
    "features": [
      "Automatic fire curtain",
      "For opening/compartment protection (project-specific)"
    ],
    "applications": [
      "Large openings",
      "Fire/smoke compartmentation"
    ],
    "keywords": [
      "automatic fire curtain",
      "fire curtain"
    ]
  },
  {
    "id": "nesbd-single-push-rod-lock-34",
    "slug": "single-push-rod-lock-gate-horizontal-push-bar",
    "name": "Single Push Rod Lock Gate Horizontal Push Bar",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "",
    "model": "",
    "shortDescription": "Horizontal push bar / push rod lock hardware.",
    "description": "Single push rod lock gate horizontal push bar as listed by source. Confirm door compatibility, rating, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/single_push_rod_lock_gate_horizontal_push_bar_e836e60ed732af2413886a308b4678eb.jpg",
    "availability": "inquiry-required",
    "features": [
      "Horizontal push bar",
      "Exit hardware (as applicable)"
    ],
    "applications": [
      "Exit doors",
      "Fire door hardware (project-specific)"
    ],
    "keywords": [
      "push bar",
      "panic hardware",
      "exit device"
    ]
  },
  {
    "id": "nesbd-security-doors-35",
    "slug": "security-doors-passive",
    "name": "Security Doors",
    "category": "fire-rated-doors",
    "subcategory": "steel-fire-doors",
    "brand": "",
    "model": "",
    "shortDescription": "Security doors as listed by source.",
    "description": "Security doors as listed by source. Confirm fire rating, construction, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/security_doors_cd9c20be640208f55487dfa6dca7753f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Security door"
    ],
    "applications": [
      "Access control/openings (project-specific)"
    ],
    "keywords": [
      "security door"
    ]
  },
  {
    "id": "nesbd-naffco-door-closer-40",
    "slug": "naffco-door-closer",
    "name": "Naffco Door Closer",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "NAFFCO",
    "model": "",
    "shortDescription": "Door closer for fire-rated doors.",
    "description": "NAFFCO door closer as listed by source. Confirm size, mounting, and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/door_closer_4d167bcf83a7d72bb888b58d30ba39c6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Door closer",
      "NAFFCO brand (as listed)"
    ],
    "applications": [
      "Fire-rated doors"
    ],
    "keywords": [
      "NAFFCO",
      "door closer"
    ]
  },
  {
    "id": "nesbd-naffco-em-door-holder-147",
    "slug": "naffco-electro-magnetic-door-holder",
    "name": "Naffco Electro-Magnetic Door Holder",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "NAFFCO",
    "model": "",
    "shortDescription": "Electro-magnetic door holder for fire doors.",
    "description": "NAFFCO electro-magnetic door holder as listed by source. Confirm voltage, holding force, and fire alarm interface per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/electro_magnetic_door_holder_d24ade6331b9d32f03c924184ba8b460.jpg",
    "availability": "inquiry-required",
    "features": [
      "Electro-magnetic door holder"
    ],
    "applications": [
      "Fire doors",
      "Hold-open/release interfaces"
    ],
    "keywords": [
      "NAFFCO",
      "magnetic door holder"
    ]
  },
  {
    "id": "nesbd-kunshan-em-door-holder-148",
    "slug": "kunshan-electro-magnetic-door-holder",
    "name": "Kunshan Electro-Magnetic Door Holder",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "Kunshan",
    "model": "",
    "shortDescription": "Electro-magnetic door holder for fire doors.",
    "description": "Kunshan electro-magnetic door holder as listed by source. Confirm voltage, holding force, and fire alarm interface per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/electro_magnetic_door_holder_4ceec7e709a47cda331b814d11109912.jpg",
    "availability": "inquiry-required",
    "features": [
      "Electro-magnetic door holder"
    ],
    "applications": [
      "Fire doors",
      "Hold-open/release interfaces"
    ],
    "keywords": [
      "Kunshan",
      "magnetic door holder"
    ]
  },
  {
    "id": "nesbd-naffco-handle-lock-149",
    "slug": "naffco-handle-lock",
    "name": "Naffco Handle Lock",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "NAFFCO",
    "model": "",
    "shortDescription": "Handle lock for fire-rated doors.",
    "description": "NAFFCO handle lock as listed by source. Confirm door compatibility and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/naffco_handle_lock_3a9eed4fdcf57e206fe5eec1dc8b7819.jpg",
    "availability": "inquiry-required",
    "features": [
      "Handle lock"
    ],
    "applications": [
      "Fire-rated doors"
    ],
    "keywords": [
      "NAFFCO",
      "handle lock"
    ]
  },
  {
    "id": "nesbd-strong-chung-handle-lock-150",
    "slug": "strong-chung-handle-lock",
    "name": "Strong Chung Handle Lock",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "Strong Chung",
    "model": "",
    "shortDescription": "Handle lock for doors.",
    "description": "Strong Chung handle lock as listed by source. Confirm door compatibility and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/strong_chung_handle_lock_3276827f7623cc791abbf1c41d5784f6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Handle lock"
    ],
    "applications": [
      "Doors (project-specific)"
    ],
    "keywords": [
      "Strong Chung",
      "handle lock"
    ]
  },
  {
    "id": "nesbd-door-co-ordinator-151",
    "slug": "door-co-ordinator",
    "name": "Door Co-Ordinator",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "",
    "model": "",
    "shortDescription": "Door coordinator for paired fire doors.",
    "description": "Door coordinator as listed by source. Confirm compatibility with paired leaf doors and fire door listing per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/door_co_ordinator_b555f27fa4dae082fb7e07e4134dde5a.jpg",
    "availability": "inquiry-required",
    "features": [
      "Door coordinator"
    ],
    "applications": [
      "Double-leaf fire doors"
    ],
    "keywords": [
      "door coordinator"
    ]
  },
  {
    "id": "nesbd-hinges-screw-152",
    "slug": "hinges-screw-fire-door",
    "name": "Hinges & Screw",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "",
    "model": "",
    "shortDescription": "Hinges and screws for fire door assemblies.",
    "description": "Hinges and screws as listed by source. Confirm size, material, and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/hinges_screw_00ff604e81fa9f692caad32750e0477b.jpg",
    "availability": "inquiry-required",
    "features": [
      "Hinges and screws"
    ],
    "applications": [
      "Fire door assemblies"
    ],
    "keywords": [
      "hinges",
      "screw",
      "fire door hardware"
    ]
  },
  {
    "id": "nesbd-royal-bolt-153",
    "slug": "royal-bolt",
    "name": "Royal Bolt",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "",
    "model": "",
    "shortDescription": "Bolt hardware as listed by source.",
    "description": "Royal bolt as listed by source. Confirm door compatibility and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/royal_bolt_2f92c4767484c1b880201493453b92fa.jpg",
    "availability": "inquiry-required",
    "features": [
      "Bolt hardware"
    ],
    "applications": [
      "Door hardware (project-specific)"
    ],
    "keywords": [
      "royal bolt",
      "door bolt"
    ]
  },
  {
    "id": "nesbd-vision-panel-154",
    "slug": "vision-panel-fire-door",
    "name": "Vision Panel",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-frames",
    "brand": "",
    "model": "",
    "shortDescription": "Vision panel for fire-rated doors.",
    "description": "Vision panel as listed by source. Confirm glazing rating, size, and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/vision_panel_47129e8775e46442bd61e08d039cf15d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Vision panel/glazing opening (as applicable)"
    ],
    "applications": [
      "Fire-rated doors"
    ],
    "keywords": [
      "vision panel",
      "fire door glazing"
    ]
  },
  {
    "id": "nesbd-naffco-fire-door-panic-bar-155",
    "slug": "naffco-fire-door-panic-bar",
    "name": "Naffco Fire Door Panic Bar",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "NAFFCO",
    "model": "",
    "shortDescription": "Panic bar for fire doors.",
    "description": "NAFFCO fire door panic bar as listed by source. Confirm door type, rating, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/naffco_fire_door_panic_bar_ead7772c48c3015c0b5e7b1d0f333ab1.jpg",
    "availability": "inquiry-required",
    "features": [
      "Panic bar / exit device"
    ],
    "applications": [
      "Emergency exit/fire doors"
    ],
    "keywords": [
      "NAFFCO",
      "panic bar",
      "exit device"
    ]
  },
  {
    "id": "nesbd-surface-vertical-rod-panic-156",
    "slug": "surface-vertical-rod-panic-bar-exit-device",
    "name": "Surface Vertical Rod Panic Bar Exit Device",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "",
    "model": "",
    "shortDescription": "Surface vertical rod panic bar exit device.",
    "description": "Surface vertical rod panic bar exit device as listed by source. Confirm door configuration and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/surface_vertical_rod_panic_bar_exit_device_b2600f1071b99b9b1213bf05c6b20297.jpg",
    "availability": "inquiry-required",
    "features": [
      "Surface vertical rod",
      "Panic/exit device"
    ],
    "applications": [
      "Double-leaf/exit doors (project-specific)"
    ],
    "keywords": [
      "vertical rod panic bar",
      "exit device"
    ]
  },
  {
    "id": "nesbd-double-panic-bar-naffco-157",
    "slug": "fire-rated-double-panic-bar-naffco-door",
    "name": "Fire Rated Double Panic Bar For Naffco Door",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "NAFFCO",
    "model": "",
    "shortDescription": "Double panic bar for fire-rated NAFFCO doors.",
    "description": "Fire rated double panic bar for NAFFCO door as listed by source. Confirm door compatibility, rating, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_rated_double_panic_bar_for_naffco_door_bb1420de1179ab88d24239dfa29bfd7d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Double panic bar",
      "For fire-rated doors (as listed)"
    ],
    "applications": [
      "Double-leaf fire/exit doors"
    ],
    "keywords": [
      "NAFFCO",
      "double panic bar"
    ]
  },
  {
    "id": "nesbd-intumescent-firestop-sealant-207",
    "slug": "intumescent-firestop-sealant",
    "name": "Intumescent Firestop Sealant",
    "category": "passive-fire-protection",
    "subcategory": "firestop-sealants-mortars-collars",
    "brand": "",
    "model": "",
    "shortDescription": "Intumescent firestop sealant for penetration/joint sealing.",
    "description": "Intumescent firestop sealant as listed by source. Confirm tested system, fire rating, and application details per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/intumescent_firestop_sealant_cbf31c7c7d51f8535bd33f639ec38fd6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Intumescent firestop sealant"
    ],
    "applications": [
      "Service penetrations",
      "Firestop joints (tested systems)"
    ],
    "keywords": [
      "intumescent sealant",
      "firestop"
    ]
  },
  {
    "id": "nesbd-fire-barrier-caulk-208",
    "slug": "fire-barrier-caulk",
    "name": "Fire Barrier Caulk",
    "category": "passive-fire-protection",
    "subcategory": "firestop-sealants-mortars-collars",
    "brand": "",
    "model": "",
    "shortDescription": "Fire barrier caulk for firestop applications.",
    "description": "Fire barrier caulk as listed by source. Confirm tested system and fire rating per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_barrier_caulk_410e9e4cb8e50b34ff3078de273b0049.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire barrier caulk"
    ],
    "applications": [
      "Firestop joints/penetrations (tested systems)"
    ],
    "keywords": [
      "fire barrier caulk",
      "firestop"
    ]
  },
  {
    "id": "nesbd-metacaulk-pipe-collars-209",
    "slug": "metacaulk-intumescent-pipe-collars",
    "name": "Metacaulk Intumescent Pipe Collars",
    "category": "passive-fire-protection",
    "subcategory": "firestop-sealants-mortars-collars",
    "brand": "Metacaulk",
    "model": "",
    "shortDescription": "Intumescent pipe collars for plastic pipe penetrations.",
    "description": "Metacaulk intumescent pipe collars as listed by source. Confirm pipe size, substrate, and tested system per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/metacaulk_intumescent_pipe_collars_f0e95b76b62179816f2cc8f3c00b2705.jpg",
    "availability": "inquiry-required",
    "features": [
      "Intumescent pipe collars"
    ],
    "applications": [
      "Plastic pipe penetrations",
      "Firestop systems"
    ],
    "keywords": [
      "Metacaulk",
      "pipe collar",
      "intumescent"
    ]
  },
  {
    "id": "nesbd-frd-door-closer-ul-233",
    "slug": "frd-door-closer-ul-listed",
    "name": "FRD Door Closer (UL Listed)",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "FRD",
    "model": "",
    "shortDescription": "UL listed door closer for fire-rated doors.",
    "description": "FRD door closer, UL listed as stated by source. Confirm size, mounting, and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/frd_door_closer_ul_listed_561b5395b2c9b5c463a5acbe565e99de.jpg",
    "availability": "inquiry-required",
    "features": [
      "Door closer",
      "UL listed (as listed by source)"
    ],
    "applications": [
      "Fire-rated doors"
    ],
    "keywords": [
      "FRD",
      "door closer",
      "UL listed"
    ]
  },
  {
    "id": "nesbd-smoke-seal-kilargo-243",
    "slug": "smoke-seal-kilargo-ul-certified",
    "name": "Smoke Seal (Kilargo, UL Certified)",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "Kilargo",
    "model": "",
    "shortDescription": "Smoke seal for fire/smoke doors.",
    "description": "Smoke seal, brand Kilargo, UL certified as stated by source. Confirm profile, door type, and tested listing per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/smoke_seal_brand_kilargo_ul_certified_7ad988d3a562b98fd3bbc9c8f9577e48.jpg",
    "availability": "inquiry-required",
    "features": [
      "Smoke seal",
      "Kilargo brand (as listed)",
      "UL certified (as listed)"
    ],
    "applications": [
      "Fire/smoke doors"
    ],
    "keywords": [
      "Kilargo",
      "smoke seal",
      "UL certified"
    ]
  },
  {
    "id": "nesbd-door-hinges-dd-244",
    "slug": "door-hinges-dd",
    "name": "Door Hinges (D&D)",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "D&D",
    "model": "",
    "shortDescription": "Door hinges for fire door assemblies.",
    "description": "Door hinges, brand D&D as listed by source. Confirm size, load, and fire door approval per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/door_hinges_brand_dd_53f010f860c68e0b5b4b544e8676c51d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Door hinges",
      "D&D brand (as listed)"
    ],
    "applications": [
      "Fire door assemblies"
    ],
    "keywords": [
      "D&D",
      "door hinges"
    ]
  },
  {
    "id": "nesbd-likcoo-hinges-245",
    "slug": "likcoo-hinges",
    "name": "Likcoo Hinges",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "Likcoo",
    "model": "",
    "shortDescription": "Hinges for door assemblies.",
    "description": "Likcoo hinges as listed by source. Confirm size, load, and suitability for fire-rated doors per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/likcoo_hinges_db498c185edb60f6838469d5b479af50.jpg",
    "availability": "inquiry-required",
    "features": [
      "Hinges",
      "Likcoo brand (as listed)"
    ],
    "applications": [
      "Door assemblies (project-specific)"
    ],
    "keywords": [
      "Likcoo",
      "hinges"
    ]
  },
  {
    "id": "nesbd-door-magnet-zilly-246",
    "slug": "door-magnet-zilly",
    "name": "Door Magnet (Zilly)",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "Zilly",
    "model": "",
    "shortDescription": "Door magnet hardware.",
    "description": "Door magnet, brand Zilly as listed by source. Confirm application and fire alarm interface suitability per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/door_magnet_brand_zilly_9c32536160854ba8c3d1a91870c6227f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Door magnet"
    ],
    "applications": [
      "Door hold/release (project-specific)"
    ],
    "keywords": [
      "Zilly",
      "door magnet"
    ]
  },
  {
    "id": "nesbd-fire-door-pushbar-prowell-247",
    "slug": "fire-door-pushbar-prowell",
    "name": "Fire Door Pushbar (Prowell)",
    "category": "fire-rated-doors",
    "subcategory": "fire-door-hardware",
    "brand": "Prowell",
    "model": "",
    "shortDescription": "Pushbar/exit device for fire doors.",
    "description": "Fire door pushbar, brand Prowell as listed by source. Confirm door compatibility, rating, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_door_pushbar_brand_prowell_b7a63be724f2c19266fceb9552c3894d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Pushbar / exit device"
    ],
    "applications": [
      "Fire/exit doors"
    ],
    "keywords": [
      "Prowell",
      "pushbar",
      "exit device"
    ]
  },
  {
    "id": "nesbd-local-made-fire-rated-door-248",
    "slug": "local-made-fire-rated-door",
    "name": "Locally Made Fire Rated Door",
    "category": "fire-rated-doors",
    "subcategory": "steel-fire-doors",
    "brand": "",
    "model": "",
    "shortDescription": "Fire rated door (locally made, as listed by source).",
    "description": "Locally made fire rated door as listed by source. Fire rating, construction, hardware, and approvals must be confirmed per project and applicable authority requirements. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/local_made_fire_rated_door_2944615e33873aa606be594b47d54b96.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire rated door (as listed)",
      "Confirm rating and approvals per project"
    ],
    "applications": [
      "Fire-rated openings (project-specific)"
    ],
    "keywords": [
      "fire rated door",
      "local made"
    ]
  },
  // ---- NESBD Electrical Safety (source: nesbd.com electrical system category, added factual fit-only listing) ----
  {
    "id": "nesbd-lightning-protection-system-lps-242",
    "slug": "lightning-protection-system-lps",
    "name": "Lightning Protection System (LPS)",
    "category": "electrical-safety",
    "subcategory": "lightning-protection-systems",
    "brand": "",
    "model": "LPS",
    "shortDescription": "Lightning protection system components/solution (as listed).",
    "description": "Lightning Protection System (LPS) as listed by source. Confirm components, standard (e.g., IEC/NFPA as applicable), earthing design, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/lightning_protection_system_lps_a87832eb2e695c2e34513d154020f6a1.jpg",
    "availability": "inquiry-required",
    "features": [
      "Lightning protection system (as listed)"
    ],
    "applications": [
      "Building lightning protection",
      "Electrical safety systems (project-specific)"
    ],
    "keywords": [
      "lightning protection system",
      "LPS"
    ]
  },
  // ---- NESBD Electrical System (source: nesbd.com electrical system category, added factual listing) ----
  {
    "id": "nesbd-air-compressor-001-15",
    "slug": "air-compressor-001",
    "name": "Air Compressor 001",
    "category": "electrical-system",
    "subcategory": "building-equipment",
    "brand": "",
    "model": "001",
    "shortDescription": "Air compressor equipment (as listed by source).",
    "description": "Air compressor as listed by source. Confirm capacity, pressure, motor, and application suitability per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/air_compressor_001_7194624fe6cbbfe17adcec36c716b981.jpg",
    "availability": "inquiry-required",
    "features": [
      "Air compressor (as listed)"
    ],
    "applications": [
      "Compressed air systems (project-specific)"
    ],
    "keywords": [
      "air compressor"
    ]
  },
  {
    "id": "nesbd-diesel-generator-17",
    "slug": "diesel-generator",
    "name": "Diesel Generator",
    "category": "electrical-system",
    "subcategory": "generators-power",
    "brand": "",
    "model": "",
    "shortDescription": "Diesel generator set (as listed by source).",
    "description": "Diesel generator as listed by source. Confirm kVA/kW rating, voltage, phase, enclosure, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/diesel_generator_cc19ae96d4dc154c0f2ac1fb1d27016c.jpg",
    "availability": "inquiry-required",
    "features": [
      "Diesel generator (as listed)"
    ],
    "applications": [
      "Backup/prime power (project-specific)"
    ],
    "keywords": [
      "diesel generator"
    ]
  },
  {
    "id": "nesbd-busbar-trunking-system-29",
    "slug": "busbar-trunking-system",
    "name": "Busbar Trunking System",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "",
    "model": "",
    "shortDescription": "Busbar trunking system (as listed by source).",
    "description": "Busbar trunking system as listed by source. Confirm current rating, IP class, configuration, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/busbar_trunking_system_e2401a41733ae4b1b2e7964d222a79d2.jpg",
    "availability": "inquiry-required",
    "features": [
      "Busbar trunking system"
    ],
    "applications": [
      "Power distribution"
    ],
    "keywords": [
      "busbar trunking"
    ]
  },
  {
    "id": "nesbd-circuit-breaker-30",
    "slug": "circuit-breaker",
    "name": "Circuit Breaker",
    "category": "electrical-system",
    "subcategory": "switchgear-panels",
    "brand": "",
    "model": "",
    "shortDescription": "Circuit breaker (as listed by source).",
    "description": "Circuit breaker as listed by source. Confirm type, rating, breaking capacity, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/circuit_breaker_c47758834f3c172ceec129756572dd64.jpg",
    "availability": "inquiry-required",
    "features": [
      "Circuit breaker"
    ],
    "applications": [
      "Electrical protection/distribution"
    ],
    "keywords": [
      "circuit breaker"
    ]
  },
  {
    "id": "nesbd-transformer-36",
    "slug": "transformer",
    "name": "Transformer",
    "category": "electrical-system",
    "subcategory": "transformers",
    "brand": "",
    "model": "",
    "shortDescription": "Electrical transformer (as listed by source).",
    "description": "Transformer as listed by source. Confirm kVA rating, voltage, vector group, cooling, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/sprinklers_ebc1699da70480b5fffa6e6c74c5eeca.jpg",
    "availability": "inquiry-required",
    "features": [
      "Transformer"
    ],
    "applications": [
      "Power distribution"
    ],
    "keywords": [
      "transformer"
    ]
  },
  {
    "id": "nesbd-magnetic-contactor-37",
    "slug": "magnetic-contactor",
    "name": "Magnetic Contactor",
    "category": "electrical-system",
    "subcategory": "switchgear-panels",
    "brand": "",
    "model": "",
    "shortDescription": "Magnetic contactor (as listed by source).",
    "description": "Magnetic contactor as listed by source. Confirm current rating, coil voltage, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/magnetic_contract_59504983343a17359b8eefb2bb39ec27.jpg",
    "availability": "inquiry-required",
    "features": [
      "Magnetic contactor"
    ],
    "applications": [
      "Motor/control circuits (project-specific)"
    ],
    "keywords": [
      "magnetic contactor"
    ]
  },
  {
    "id": "nesbd-mdb-board-44",
    "slug": "mdb-board",
    "name": "MDB Board",
    "category": "electrical-system",
    "subcategory": "switchgear-panels",
    "brand": "",
    "model": "MDB",
    "shortDescription": "Main distribution board (as listed by source).",
    "description": "MDB (Main Distribution Board) as listed by source. Confirm incomer/outgoing configuration, busbar rating, IP class, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/mdb_board_29c56b8a213c1b88d6b00c196943ed85.jpg",
    "availability": "inquiry-required",
    "features": [
      "Main distribution board"
    ],
    "applications": [
      "Electrical power distribution"
    ],
    "keywords": [
      "MDB",
      "main distribution board"
    ]
  },
  {
    "id": "nesbd-ht-switchgear-49",
    "slug": "ht-switchgear",
    "name": "HT Switchgear",
    "category": "electrical-system",
    "subcategory": "switchgear-panels",
    "brand": "",
    "model": "",
    "shortDescription": "High tension switchgear (as listed by source).",
    "description": "HT switchgear as listed by source. Confirm voltage class, configuration, protection, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/ht_switchgear_b93fc45d02c53f0945484ca009e3b55d.jpg",
    "availability": "inquiry-required",
    "features": [
      "HT switchgear"
    ],
    "applications": [
      "Medium/high voltage distribution (project-specific)"
    ],
    "keywords": [
      "HT switchgear",
      "switchgear"
    ]
  },
  {
    "id": "nesbd-steam-boiler-54",
    "slug": "steam-boiler",
    "name": "Steam Boiler",
    "category": "electrical-system",
    "subcategory": "building-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Steam boiler (as listed by source).",
    "description": "Steam boiler as listed by source. Confirm capacity, pressure, fuel, and safety approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/steam_boiler_8b49eb75d68d641ec2d99da931614cb8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Steam boiler"
    ],
    "applications": [
      "Industrial/process steam (project-specific)"
    ],
    "keywords": [
      "steam boiler"
    ]
  },
  {
    "id": "nesbd-tap-off-boxes-busbar-114",
    "slug": "tap-off-boxes-busbar-trunking-system",
    "name": "Tap-off Boxes Busbar Trunking System",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "",
    "model": "",
    "shortDescription": "Tap-off boxes for busbar trunking systems.",
    "description": "Tap-off boxes for busbar trunking system as listed by source. Confirm rating, compatibility, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/tap_off_boxes_busbar_trunking_system_b35b2ea69f71fc3755c2fccf0e78e9b8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Tap-off boxes",
      "Busbar trunking accessory"
    ],
    "applications": [
      "Busbar power distribution"
    ],
    "keywords": [
      "tap-off box",
      "busbar trunking"
    ]
  },
  {
    "id": "nesbd-eae-lighting-busbar-115",
    "slug": "eae-lighting-busbar-trunking-system",
    "name": "EAE Lighting Busbar Trunking System",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "EAE",
    "model": "",
    "shortDescription": "EAE lighting busbar trunking system.",
    "description": "EAE lighting busbar trunking system as listed by source. Confirm rating, configuration, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/eae_lighting_busbar_trunking_system_e5211fbd34626ff1905c2fbe9dfbf10b.jpg",
    "availability": "inquiry-required",
    "features": [
      "Lighting busbar trunking",
      "EAE brand (as listed)"
    ],
    "applications": [
      "Lighting power distribution"
    ],
    "keywords": [
      "EAE",
      "lighting busbar"
    ]
  },
  {
    "id": "nesbd-eae-power-busbar-systems-116",
    "slug": "eae-power-busbar-trunking-systems",
    "name": "EAE Power Busbar Trunking Systems",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "EAE",
    "model": "",
    "shortDescription": "EAE power busbar trunking systems.",
    "description": "EAE power busbar trunking systems as listed by source. Confirm rating, configuration, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/eae_power_busbar_trunking_systems_efb584fad7b03e9092d3054b8c58529f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Power busbar trunking",
      "EAE brand (as listed)"
    ],
    "applications": [
      "Power distribution"
    ],
    "keywords": [
      "EAE",
      "power busbar trunking"
    ]
  },
  {
    "id": "nesbd-eae-power-busbar-system-117",
    "slug": "eae-power-busbar-trunking-system",
    "name": "EAE Power Busbar Trunking System",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "EAE",
    "model": "",
    "shortDescription": "EAE power busbar trunking system.",
    "description": "EAE power busbar trunking system as listed by source. Confirm rating, configuration, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/eae_power_busbar_trunking_system_c3d1f84655fda07b680ac5f78cdc8c1c.jpg",
    "availability": "inquiry-required",
    "features": [
      "Power busbar trunking",
      "EAE brand (as listed)"
    ],
    "applications": [
      "Power distribution"
    ],
    "keywords": [
      "EAE",
      "power busbar trunking"
    ]
  },
  {
    "id": "nesbd-eae-bbt-flexible-joint-118",
    "slug": "eae-bbt-flexible-joint",
    "name": "EAE BBT Flexible Joint",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "EAE",
    "model": "BBT",
    "shortDescription": "Flexible joint for busbar trunking.",
    "description": "EAE BBT flexible joint as listed by source. Confirm compatibility and rating per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/eae_bbt_flexible_joint_46fa6345efe577d95630760a7a26be20.jpg",
    "availability": "inquiry-required",
    "features": [
      "Flexible joint",
      "Busbar trunking accessory"
    ],
    "applications": [
      "Busbar trunking systems"
    ],
    "keywords": [
      "EAE",
      "BBT",
      "flexible joint"
    ]
  },
  {
    "id": "nesbd-eae-busbar-elbow-119",
    "slug": "eae-busbar-trunking-system-elbow",
    "name": "EAE Busbar Trunking System Elbow",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "EAE",
    "model": "",
    "shortDescription": "Elbow component for busbar trunking systems.",
    "description": "EAE busbar trunking system elbow as listed by source. Confirm angle, rating, and compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/eae_busbar_trunking_system_elbow_9e7d85a1be047168f3b66ed107531d21.jpg",
    "availability": "inquiry-required",
    "features": [
      "Elbow component",
      "Busbar trunking accessory"
    ],
    "applications": [
      "Busbar trunking systems"
    ],
    "keywords": [
      "EAE",
      "busbar elbow"
    ]
  },
  {
    "id": "nesbd-eae-feeder-units-120",
    "slug": "eae-busbar-trunking-system-feeder-units",
    "name": "EAE Busbar Trunking System Feeder Units",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "EAE",
    "model": "",
    "shortDescription": "Feeder units for busbar trunking systems.",
    "description": "EAE busbar trunking system feeder units as listed by source. Confirm rating and compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/eae_busbar_trunking_system_feeder_units_0bf9be67d741d385d4d8e2c483ab6852.jpg",
    "availability": "inquiry-required",
    "features": [
      "Feeder units",
      "Busbar trunking accessory"
    ],
    "applications": [
      "Busbar trunking systems"
    ],
    "keywords": [
      "EAE",
      "feeder unit",
      "busbar"
    ]
  },
  {
    "id": "nesbd-trolley-busbar-121",
    "slug": "busbar-trunking-system-trolley-busbar",
    "name": "Busbar Trunking System Trolley Busbar",
    "category": "electrical-system",
    "subcategory": "busbar-trunking",
    "brand": "",
    "model": "",
    "shortDescription": "Trolley busbar for busbar trunking systems.",
    "description": "Trolley busbar for busbar trunking systems as listed by source. Confirm rating and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/busbar_trunking_system_trolley_busbar_9c489c19121cde37a1f67840b260b704.jpg",
    "availability": "inquiry-required",
    "features": [
      "Trolley busbar"
    ],
    "applications": [
      "Busbar trunking systems"
    ],
    "keywords": [
      "trolley busbar"
    ]
  },
  {
    "id": "nesbd-solar-panel-202",
    "slug": "solar-panel",
    "name": "Solar Panel",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Solar photovoltaic panel (as listed by source).",
    "description": "Solar panel as listed by source. Confirm wattage, cell type, dimensions, and certifications per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/solar_panel_31f8d40aa3487d03be4f4c7c0719cd9b.jpg",
    "availability": "inquiry-required",
    "features": [
      "Solar PV panel"
    ],
    "applications": [
      "Solar power systems"
    ],
    "keywords": [
      "solar panel",
      "PV module"
    ]
  },
  {
    "id": "nesbd-solar-inverter-203",
    "slug": "solar-inverter",
    "name": "Solar Inverter",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Solar inverter (as listed by source).",
    "description": "Solar inverter as listed by source. Confirm capacity, phase, MPPT, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/solar_inverter_f37e1c982f2f0522d8baaaac733fd49c.jpg",
    "availability": "inquiry-required",
    "features": [
      "Solar inverter"
    ],
    "applications": [
      "Solar power systems"
    ],
    "keywords": [
      "solar inverter"
    ]
  },
  {
    "id": "nesbd-solar-storage-204",
    "slug": "solar-storage",
    "name": "Solar Storage",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Solar energy storage (as listed by source).",
    "description": "Solar storage as listed by source. Confirm capacity, chemistry, voltage, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/solar_storage_1cdca1cd2f5fcdd8d39162ab8469592d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Energy storage"
    ],
    "applications": [
      "Solar power systems"
    ],
    "keywords": [
      "solar storage",
      "battery storage"
    ]
  },
  {
    "id": "nesbd-terrastreamer-205",
    "slug": "terrastreamer-nesbd",
    "name": "TerraStreamer",
    "category": "electrical-system",
    "subcategory": "generators-power",
    "brand": "",
    "model": "TerraStreamer",
    "shortDescription": "TerraStreamer equipment (as listed by source).",
    "description": "TerraStreamer as listed by source. Confirm product type, ratings, and application suitability per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/terrastreamer_b8f10541bcf4107682690eb2176994c1.jpg",
    "availability": "inquiry-required",
    "features": [
      "TerraStreamer (as listed)"
    ],
    "applications": [
      "Power/electrical systems (project-specific)"
    ],
    "keywords": [
      "TerraStreamer"
    ]
  },
  {
    "id": "nesbd-lift-206",
    "slug": "lift",
    "name": "Lift",
    "category": "electrical-system",
    "subcategory": "building-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Lift/elevator equipment (as listed by source).",
    "description": "Lift as listed by source. Confirm capacity, speed, configuration, and safety approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/lift_f953231ca160d0a1d5a8267f10bb9934.jpg",
    "availability": "inquiry-required",
    "features": [
      "Lift/elevator (as listed)"
    ],
    "applications": [
      "Building vertical transportation"
    ],
    "keywords": [
      "lift",
      "elevator"
    ]
  },
  {
    "id": "nesbd-three-phase-on-grid-solar-inverter-234",
    "slug": "three-phase-on-grid-solar-inverter",
    "name": "Three Phase On-Grid Solar Inverter",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Three phase on-grid solar inverter.",
    "description": "Three phase on-grid solar inverter as listed by source. Confirm capacity, MPPT, grid code, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/three_phase_on_grid_solar_inverter_74757b7165007b8b93270970e83c510f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Three phase",
      "On-grid solar inverter"
    ],
    "applications": [
      "Grid-tied solar systems"
    ],
    "keywords": [
      "on-grid inverter",
      "three phase solar inverter"
    ]
  },
  {
    "id": "nesbd-crown-xavier-235",
    "slug": "crown-xavier-15kw-3kw",
    "name": "Crown Xavier 1.5KW – 3KW",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "Crown",
    "model": "Xavier 1.5KW–3KW",
    "shortDescription": "Crown Xavier 1.5KW–3KW solar/inverter equipment (as listed).",
    "description": "Crown Xavier 1.5KW–3KW as listed by source. Confirm exact model, capacity, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/crown_xavier_15kw_3kw_7762fc81070bdff2b91884d313b2430e.jpg",
    "availability": "inquiry-required",
    "features": [
      "Crown Xavier series (as listed)",
      "1.5KW–3KW range (as listed)"
    ],
    "applications": [
      "Solar/power systems (project-specific)"
    ],
    "keywords": [
      "Crown Xavier",
      "solar inverter"
    ]
  },
  {
    "id": "nesbd-hybrid-solar-inverter-236",
    "slug": "hybrid-solar-inverter",
    "name": "Hybrid Solar Inverter",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Hybrid solar inverter (as listed by source).",
    "description": "Hybrid solar inverter as listed by source. Confirm capacity, battery compatibility, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/hybrid_solar_inverter_4226c708c3f2afab79e95f4c2015704c.jpg",
    "availability": "inquiry-required",
    "features": [
      "Hybrid solar inverter"
    ],
    "applications": [
      "Solar + storage systems"
    ],
    "keywords": [
      "hybrid solar inverter"
    ]
  },
  {
    "id": "nesbd-solar-charge-controller-239",
    "slug": "solar-charge-controller-10a-12v-lcd",
    "name": "Solar Charge Controller 10A 12V Panel LCD Display",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "10A 12V",
    "shortDescription": "Solar charge controller with LCD display (as listed).",
    "description": "Solar charge controller 10A 12V panel LCD display as listed by source. Confirm ratings and compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/solar_charge_controller_10a_12v_panel_lcd_display_23983ce32597080d7deaa92261fd0154.jpg",
    "availability": "inquiry-required",
    "features": [
      "10A 12V (as listed)",
      "LCD display (as listed)"
    ],
    "applications": [
      "Small solar systems"
    ],
    "keywords": [
      "solar charge controller",
      "10A 12V"
    ]
  },
  {
    "id": "nesbd-lithium-battery-240",
    "slug": "lithium-battery-12v-24v-48v",
    "name": "Lithium Battery 12V/24V/48V",
    "category": "electrical-system",
    "subcategory": "solar-equipment",
    "brand": "",
    "model": "12V/24V/48V",
    "shortDescription": "Lithium battery (12V/24V/48V, as listed).",
    "description": "Lithium battery 12V/24V/48V as listed by source. Confirm capacity (Ah/kWh), chemistry, BMS, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/lithium_battery_12v24v48v_0d2ff968c0e769428ed7b0602390b300.jpg",
    "availability": "inquiry-required",
    "features": [
      "Lithium battery",
      "12V/24V/48V options (as listed)"
    ],
    "applications": [
      "Solar/storage systems (project-specific)"
    ],
    "keywords": [
      "lithium battery",
      "12V 24V 48V"
    ]
  },
  // ---- NESBD Industrial Safety Equipment (source: nesbd.com category, ALL items added, factual listing) ----
  {
    "id": "nesbd-fire-safety-hand-gloves-14",
    "slug": "fire-safety-hand-gloves",
    "name": "Fire Safety Hand Gloves",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Fire safety hand gloves (as listed).",
    "description": "Fire safety hand gloves as listed by source. Confirm material, rating, size, and applicable safety standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_safety_hand_gloves_a2c9dd7a1ad029d3fe525528d46c50b5.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire safety gloves"
    ],
    "applications": [
      "Industrial/fire safety PPE"
    ],
    "keywords": [
      "fire safety gloves"
    ]
  },
  {
    "id": "nesbd-fire-retardant-uniform-52",
    "slug": "fire-retardant-uniform",
    "name": "Fire-Retardant Uniform",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Fire-retardant uniform (as listed).",
    "description": "Fire-retardant uniform as listed by source. Confirm fabric, rating, sizing, and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_retardant_unifrom_3adc0c38d73f8611e69eba88e82aa30f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire-retardant uniform"
    ],
    "applications": [
      "Industrial/fire safety PPE"
    ],
    "keywords": [
      "fire retardant uniform",
      "FR clothing"
    ]
  },
  {
    "id": "nesbd-fire-safety-suit-53",
    "slug": "fire-safety-suit",
    "name": "Fire Safety Suit",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Fire safety suit (as listed).",
    "description": "Fire safety suit as listed by source. Confirm protection level, materials, and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_safety_suit_6f86f27899621146b0042c6961653cd8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire safety suit"
    ],
    "applications": [
      "Firefighting/industrial safety (project-specific)"
    ],
    "keywords": [
      "fire safety suit"
    ]
  },
  {
    "id": "nesbd-safety-helmet-67",
    "slug": "safety-helmet",
    "name": "Safety Helmet",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Safety helmet (as listed).",
    "description": "Safety helmet as listed by source. Confirm impact rating, color/options, and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/safety_helmet_b4cb8bc5302871b73416725ccb4cb304.jpg",
    "availability": "inquiry-required",
    "features": [
      "Safety helmet"
    ],
    "applications": [
      "Industrial/site safety PPE"
    ],
    "keywords": [
      "safety helmet"
    ]
  },
  {
    "id": "nesbd-safety-goggles-68",
    "slug": "safety-goggles",
    "name": "Safety Goggles",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Safety goggles (as listed).",
    "description": "Safety goggles as listed by source. Confirm lens/protection type and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/safety_goggles_f403a70cdf3b710667700329d69097a6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Safety goggles"
    ],
    "applications": [
      "Eye protection PPE"
    ],
    "keywords": [
      "safety goggles"
    ]
  },
  {
    "id": "nesbd-safety-shoes-69",
    "slug": "safety-shoes",
    "name": "Safety Shoes",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Safety shoes (as listed).",
    "description": "Safety shoes as listed by source. Confirm toe protection, sole type, size, and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/safety_shoes_c8179ed1fc6f0b676e2f435c13de2ca8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Safety shoes"
    ],
    "applications": [
      "Industrial/site safety PPE"
    ],
    "keywords": [
      "safety shoes"
    ]
  },
  {
    "id": "nesbd-fire-extinguisher-safety-70",
    "slug": "fire-extinguisher-industrial-safety",
    "name": "Fire Extinguisher",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire extinguisher (as listed).",
    "description": "Fire extinguisher as listed by source. Confirm agent type, capacity, rating, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_extinguisher_8bf2f2f150caf6d11f8eb1c8b39cd333.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire extinguisher"
    ],
    "applications": [
      "First-aid firefighting"
    ],
    "keywords": [
      "fire extinguisher"
    ]
  },
  {
    "id": "nesbd-fire-emergency-escape-mask-71",
    "slug": "fire-emergency-escape-mask",
    "name": "Fire Emergency Escape Mask",
    "category": "industrial-safety-equipment",
    "subcategory": "rescue-safety-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Fire emergency escape mask (as listed).",
    "description": "Fire emergency escape mask as listed by source. Confirm duration, filtration/protection, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_emergency_escape_mask_e0eab2bd6335b09e4c1f92e4bbef83ae.jpg",
    "availability": "inquiry-required",
    "features": [
      "Emergency escape mask"
    ],
    "applications": [
      "Emergency evacuation/smoke escape"
    ],
    "keywords": [
      "escape mask",
      "fire emergency mask"
    ]
  },
  {
    "id": "nesbd-fire-beater-72",
    "slug": "fire-beater",
    "name": "Fire Beater",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire beater (as listed).",
    "description": "Fire beater as listed by source. Confirm material and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_beater_da85fcaf1e188e4190eb782f42980d9a.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire beater tool"
    ],
    "applications": [
      "Grass/incipient fire response (as applicable)"
    ],
    "keywords": [
      "fire beater"
    ]
  },
  {
    "id": "nesbd-fire-bucket-73",
    "slug": "fire-bucket",
    "name": "Fire Bucket",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire bucket (as listed).",
    "description": "Fire bucket as listed by source. Confirm size, material, and mounting/use per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_bucket_215c518b8e7a13cf0c01401af743c0ad.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire bucket"
    ],
    "applications": [
      "Fire point equipment"
    ],
    "keywords": [
      "fire bucket"
    ]
  },
  {
    "id": "nesbd-fire-axe-74",
    "slug": "fire-axe",
    "name": "Fire Axe",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire axe (as listed).",
    "description": "Fire axe as listed by source. Confirm size/material and use requirements per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_axe_47fb2ba312b6b00ae7e52bf5927f43c8.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire axe"
    ],
    "applications": [
      "Fire/rescue equipment points"
    ],
    "keywords": [
      "fire axe"
    ]
  },
  {
    "id": "nesbd-exit-sign-75",
    "slug": "exit-sign",
    "name": "Exit Sign",
    "category": "industrial-safety-equipment",
    "subcategory": "emergency-signage-lighting",
    "brand": "",
    "model": "",
    "shortDescription": "Exit sign (as listed).",
    "description": "Exit sign as listed by source. Confirm legend, illumination type, power source, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/exit_sign_94b553ec064c5d6acffa328bcc447f7d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Exit sign"
    ],
    "applications": [
      "Emergency egress signage"
    ],
    "keywords": [
      "exit sign"
    ]
  },
  {
    "id": "nesbd-breathing-apparatus-181",
    "slug": "breathing-apparatus-ship-baking",
    "name": "Breathing Apparatus (Ship Baking)",
    "category": "industrial-safety-equipment",
    "subcategory": "rescue-safety-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Breathing apparatus (as listed).",
    "description": "Breathing apparatus as listed by source. Confirm type, cylinder duration, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/breathing_apparatus_ship_baking_fc6cf5dd6d91eb9dfead8b946f8b2a50.jpg",
    "availability": "inquiry-required",
    "features": [
      "Breathing apparatus"
    ],
    "applications": [
      "Rescue/confined or hazardous atmosphere (project-specific)"
    ],
    "keywords": [
      "breathing apparatus",
      "SCBA"
    ]
  },
  {
    "id": "nesbd-fire-equipment-box-182",
    "slug": "fire-equipment-box-42x63",
    "name": "Fire Equipment Box (42\"x63\")",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "42\"x63\"",
    "shortDescription": "Fire equipment box (as listed).",
    "description": "Fire equipment box 42\"x63\" as listed by source. Confirm construction, mounting, and contents per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_equipment_box_42x63_266a3c6c6c512c4dd4ada153a1222dc6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire equipment box"
    ],
    "applications": [
      "Fire point storage"
    ],
    "keywords": [
      "fire equipment box"
    ]
  },
  {
    "id": "nesbd-fire-hook-183",
    "slug": "fire-hook",
    "name": "Fire Hook",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire hook (as listed).",
    "description": "Fire hook as listed by source. Confirm size and material per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_hook_b9767fd327f7dedaef3daebbcc3746ce.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire hook"
    ],
    "applications": [
      "Fire/rescue tools"
    ],
    "keywords": [
      "fire hook"
    ]
  },
  {
    "id": "nesbd-fire-belcha-184",
    "slug": "fire-belcha",
    "name": "Fire Belcha",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire belcha/shovel tool (as listed).",
    "description": "Fire belcha as listed by source. Confirm size and material per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_belcha_b64bf3d715bc779bc58b8c9f5e4cc422.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire belcha/shovel"
    ],
    "applications": [
      "Fire/rescue tools"
    ],
    "keywords": [
      "fire belcha",
      "fire shovel"
    ]
  },
  {
    "id": "nesbd-lock-cutter-185",
    "slug": "lock-cutter",
    "name": "Lock Cutter",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Lock cutter (as listed).",
    "description": "Lock cutter as listed by source. Confirm size and cutting capacity per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/lock_cutter_7b5e73d69829fb43f66c33b14bd41efb.jpg",
    "availability": "inquiry-required",
    "features": [
      "Lock cutter"
    ],
    "applications": [
      "Rescue/emergency access tools"
    ],
    "keywords": [
      "lock cutter"
    ]
  },
  {
    "id": "nesbd-fire-blanket-186",
    "slug": "fire-blanket",
    "name": "Fire Blanket",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire blanket (as listed).",
    "description": "Fire blanket as listed by source. Confirm size, material, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_blanket_518dd3ee3ba95950517242f602e41003.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire blanket"
    ],
    "applications": [
      "Kitchen/small fire response"
    ],
    "keywords": [
      "fire blanket"
    ]
  },
  {
    "id": "nesbd-fire-stretcher-187",
    "slug": "fire-stretcher-100-kg",
    "name": "Fire Stretcher (100 Kg)",
    "category": "industrial-safety-equipment",
    "subcategory": "rescue-safety-equipment",
    "brand": "",
    "model": "100 Kg",
    "shortDescription": "Fire stretcher, 100 kg capacity (as listed).",
    "description": "Fire stretcher (100 kg) as listed by source. Confirm construction and capacity per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_stretcher_100_kg_1b4a31957b78edb4a3add414624bd18e.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire stretcher",
      "100 kg capacity (as listed)"
    ],
    "applications": [
      "Rescue/evacuation"
    ],
    "keywords": [
      "fire stretcher"
    ]
  },
  {
    "id": "nesbd-direction-exit-light-188",
    "slug": "direction-exit-light",
    "name": "Direction Exit Light",
    "category": "industrial-safety-equipment",
    "subcategory": "emergency-signage-lighting",
    "brand": "",
    "model": "",
    "shortDescription": "Directional exit light (as listed).",
    "description": "Direction exit light as listed by source. Confirm legend, illumination, power source, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/direction_exit_light_6038884d0a95af38af194a659cd9d8d6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Directional exit light"
    ],
    "applications": [
      "Emergency egress lighting/signage"
    ],
    "keywords": [
      "direction exit light",
      "exit light"
    ]
  },
  {
    "id": "nesbd-fire-stop-189",
    "slug": "fire-stop",
    "name": "Fire Stop",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Fire stop product (as listed).",
    "description": "Fire stop as listed by source. Confirm product type, tested system, and fire rating per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_stop_3de32bcd3abdd4208efcf1b1e1e1f722.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire stop (as listed)"
    ],
    "applications": [
      "Fire stopping (project-specific, confirm tested system)"
    ],
    "keywords": [
      "fire stop"
    ]
  },
  {
    "id": "nesbd-runner-super-safety-shoe-190",
    "slug": "runner-super-safety-shoe",
    "name": "Runner Super Safety Shoe",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "Runner",
    "model": "Super",
    "shortDescription": "Safety shoe (as listed).",
    "description": "Runner Super safety shoe as listed by source. Confirm size, protection, and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/runner_super_safety_shoe_b3b1a0cb2490c0dc75915a4551417257.jpg",
    "availability": "inquiry-required",
    "features": [
      "Safety shoe",
      "Runner brand (as listed)"
    ],
    "applications": [
      "Industrial/site PPE"
    ],
    "keywords": [
      "Runner",
      "safety shoe"
    ]
  },
  {
    "id": "nesbd-fire-proof-gum-boot-191",
    "slug": "fire-proof-safety-gum-boot",
    "name": "Fire Proof Safety Gum Boot (High Temperature Resistant, Waterproof)",
    "category": "industrial-safety-equipment",
    "subcategory": "ppe-safety-wear",
    "brand": "",
    "model": "",
    "shortDescription": "Fire proof safety gum boot (as listed).",
    "description": "Fire proof safety gum boot, high temperature resistant and waterproof as listed by source. Confirm temperature rating, size, and applicable standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_proof_safety_gum_boot_rubber_high_temperature_resistant_waterproof_shoes_194cfb321f488200886c6d47a8de9386.jpg",
    "availability": "inquiry-required",
    "features": [
      "Gum boot",
      "High temperature resistant/waterproof (as listed)"
    ],
    "applications": [
      "Industrial/fire safety PPE"
    ],
    "keywords": [
      "fire proof gum boot",
      "safety boot"
    ]
  },
  {
    "id": "nesbd-manila-rope-192",
    "slug": "manila-rope",
    "name": "Manila Rope",
    "category": "industrial-safety-equipment",
    "subcategory": "rescue-safety-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Manila rope (as listed).",
    "description": "Manila rope as listed by source. Confirm diameter, length, and load/use suitability per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/manila_rope_a448fb60f7eb0f00d4d025fa0caa2721.jpg",
    "availability": "inquiry-required",
    "features": [
      "Manila rope"
    ],
    "applications": [
      "Rescue/general safety use (project-specific)"
    ],
    "keywords": [
      "manila rope"
    ]
  },
  {
    "id": "nesbd-emergency-fog-light-193",
    "slug": "emergency-fog-light",
    "name": "Emergency Fog Light",
    "category": "industrial-safety-equipment",
    "subcategory": "emergency-signage-lighting",
    "brand": "",
    "model": "",
    "shortDescription": "Emergency fog light (as listed).",
    "description": "Emergency fog light as listed by source. Confirm power, mounting, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/emergency_fog_light_dafb0ff4657654ca8439ca8b88fccf8d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Emergency fog light"
    ],
    "applications": [
      "Emergency lighting (project-specific)"
    ],
    "keywords": [
      "emergency fog light"
    ]
  },
  {
    "id": "nesbd-auto-fire-extinguisher-6kg-194",
    "slug": "auto-fire-extinguisher-6kg",
    "name": "Auto Fire Extinguisher 6kg",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "6kg",
    "shortDescription": "Automatic fire extinguisher, 6kg (as listed).",
    "description": "Auto fire extinguisher 6kg as listed by source. Confirm agent type, activation method, rating, and approvals per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/auto_fire_extinguisher_6kg_f56e5ac714169a4303cc0c5f52b8d59a.jpg",
    "availability": "inquiry-required",
    "features": [
      "Automatic fire extinguisher",
      "6kg (as listed)"
    ],
    "applications": [
      "Local automatic fire suppression (project-specific)"
    ],
    "keywords": [
      "auto fire extinguisher",
      "6kg"
    ]
  },
  {
    "id": "nesbd-fire-extinguisher-trolley-195",
    "slug": "fire-extinguisher-trolley-stand-with-wheels",
    "name": "Fire Extinguisher Trolley Stand with Wheels",
    "category": "industrial-safety-equipment",
    "subcategory": "fire-safety-tools",
    "brand": "",
    "model": "",
    "shortDescription": "Trolley stand with wheels for fire extinguishers.",
    "description": "Fire extinguisher trolley stand with wheels as listed by source. Confirm capacity and compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/fire_extinguisher_trolley_stand_with_wheels_85e1daac9caeb846f84204fab88128df.jpg",
    "availability": "inquiry-required",
    "features": [
      "Trolley stand with wheels"
    ],
    "applications": [
      "Fire extinguisher handling/storage"
    ],
    "keywords": [
      "extinguisher trolley"
    ]
  },
  {
    "id": "nesbd-emergency-eye-wash-station-241",
    "slug": "emergency-eye-wash-station",
    "name": "Emergency Eye Wash Station",
    "category": "industrial-safety-equipment",
    "subcategory": "rescue-safety-equipment",
    "brand": "",
    "model": "",
    "shortDescription": "Emergency eye wash station (as listed).",
    "description": "Emergency eye wash station as listed by source. Confirm flow, installation type, and applicable safety standards per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/emergency_eye_wash_station_protect_vision_save_lives_dbca71fd708f4d93773c7590b02a6bc5.jpg",
    "availability": "inquiry-required",
    "features": [
      "Emergency eye wash station"
    ],
    "applications": [
      "Chemical/industrial safety areas"
    ],
    "keywords": [
      "eye wash station",
      "emergency eyewash"
    ]
  },
  // ---- NESBD Industrial Automation (source: nesbd.com category, ALL 22 items added, factual listing) ----
  {
    "id": "nesbd-plc-system-16",
    "slug": "plc-system",
    "name": "PLC System",
    "category": "industrial-automation",
    "subcategory": "plc-hmi-controllers",
    "brand": "",
    "model": "",
    "shortDescription": "PLC system (as listed by source).",
    "description": "PLC system as listed by source. Confirm CPU, I/O, communication, and application requirements per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/electronics_system_ab2d31c6e7936a6eaf808cb931ea22f8.jpg",
    "availability": "inquiry-required",
    "features": [
      "PLC system"
    ],
    "applications": [
      "Industrial automation/control"
    ],
    "keywords": [
      "PLC system"
    ]
  },
  {
    "id": "nesbd-setex-controller-55",
    "slug": "setex-controller",
    "name": "SETEX Controller",
    "category": "industrial-automation",
    "subcategory": "plc-hmi-controllers",
    "brand": "SETEX",
    "model": "",
    "shortDescription": "SETEX controller (as listed).",
    "description": "SETEX controller as listed by source. Confirm model, inputs/outputs, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/electronics_system_39705a0edb8e49437471cee8d38f1acf.jpg",
    "availability": "inquiry-required",
    "features": [
      "SETEX controller"
    ],
    "applications": [
      "Process/textile automation (project-specific)"
    ],
    "keywords": [
      "SETEX",
      "controller"
    ]
  },
  {
    "id": "nesbd-frequency-drive-abb-56",
    "slug": "frequency-drive-abb",
    "name": "Frequency Drive ABB",
    "category": "industrial-automation",
    "subcategory": "variable-frequency-drives",
    "brand": "ABB",
    "model": "",
    "shortDescription": "ABB variable frequency drive (as listed).",
    "description": "ABB frequency drive as listed by source. Confirm power rating, voltage, and motor/application compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/frequency_drive_abb_1795c9174bfd81f4cbf7d5a67ed03178.jpg",
    "availability": "inquiry-required",
    "features": [
      "Variable frequency drive",
      "ABB brand (as listed)"
    ],
    "applications": [
      "Motor speed control"
    ],
    "keywords": [
      "ABB",
      "VFD",
      "frequency drive"
    ]
  },
  {
    "id": "nesbd-frequency-drive-yaskawa-57",
    "slug": "frequency-drive-yaskawa",
    "name": "Frequency Drive Yaskawa",
    "category": "industrial-automation",
    "subcategory": "variable-frequency-drives",
    "brand": "Yaskawa",
    "model": "",
    "shortDescription": "Yaskawa variable frequency drive (as listed).",
    "description": "Yaskawa frequency drive as listed by source. Confirm power rating, voltage, and motor/application compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/frequency_drive_yaskawa_bb1eaaedae54d8ba6a20b5d08046b231.jpg",
    "availability": "inquiry-required",
    "features": [
      "Variable frequency drive",
      "Yaskawa brand (as listed)"
    ],
    "applications": [
      "Motor speed control"
    ],
    "keywords": [
      "Yaskawa",
      "VFD",
      "frequency drive"
    ]
  },
  {
    "id": "nesbd-ls-frequency-drive-58",
    "slug": "ls-frequency-drive",
    "name": "LS Frequency Drive",
    "category": "industrial-automation",
    "subcategory": "variable-frequency-drives",
    "brand": "LS",
    "model": "",
    "shortDescription": "LS variable frequency drive (as listed).",
    "description": "LS frequency drive as listed by source. Confirm power rating, voltage, and motor/application compatibility per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/single_two_stage_reciprocating_air_compressor_3d46fa51fbd250bfc20c1cf37a0db020.jpg",
    "availability": "inquiry-required",
    "features": [
      "Variable frequency drive",
      "LS brand (as listed)"
    ],
    "applications": [
      "Motor speed control"
    ],
    "keywords": [
      "LS",
      "VFD",
      "frequency drive"
    ]
  },
  {
    "id": "nesbd-weishaupt-stepping-motor-62",
    "slug": "weishaupt-gas-air-stepping-motor",
    "name": "Weishaupt Gas & Air Stepping Motor",
    "category": "industrial-automation",
    "subcategory": "instrumentation-controls",
    "brand": "Weishaupt",
    "model": "",
    "shortDescription": "Weishaupt gas & air stepping motor (as listed).",
    "description": "Weishaupt gas & air stepping motor as listed by source. Confirm compatibility with burner/controller and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/weishaupt_gas_air_stepping_motor_2119d8ff52212d547d064c89e7eb858f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Gas & air stepping motor",
      "Weishaupt brand (as listed)"
    ],
    "applications": [
      "Burner control systems (project-specific)"
    ],
    "keywords": [
      "Weishaupt",
      "stepping motor"
    ]
  },
  {
    "id": "nesbd-allen-bradley-plc-63",
    "slug": "allen-bradley-plc",
    "name": "Allen-Bradley PLC",
    "category": "industrial-automation",
    "subcategory": "plc-hmi-controllers",
    "brand": "Allen-Bradley",
    "model": "",
    "shortDescription": "Allen-Bradley PLC (as listed).",
    "description": "Allen-Bradley PLC as listed by source. Confirm family/model, I/O, and communication requirements per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/allen_bradley_plc_11441e5b5b1f6c77036ec36069ec3733.jpg",
    "availability": "inquiry-required",
    "features": [
      "PLC",
      "Allen-Bradley brand (as listed)"
    ],
    "applications": [
      "Industrial automation/control"
    ],
    "keywords": [
      "Allen-Bradley",
      "PLC"
    ]
  },
  {
    "id": "nesbd-weishaupt-wfm-25-64",
    "slug": "weishaupt-burner-controller-wfm-25",
    "name": "Weishaupt Burner Controller WFM 25",
    "category": "industrial-automation",
    "subcategory": "instrumentation-controls",
    "brand": "Weishaupt",
    "model": "WFM 25",
    "shortDescription": "Weishaupt burner controller WFM 25 (as listed).",
    "description": "Weishaupt burner controller WFM 25 as listed by source. Confirm compatibility and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/weishaupt_burner_controller_wfm_25_1a775535250e84c33d67dd4f96419346.jpg",
    "availability": "inquiry-required",
    "features": [
      "Burner controller",
      "WFM 25 (as listed)"
    ],
    "applications": [
      "Burner control systems"
    ],
    "keywords": [
      "Weishaupt",
      "WFM 25",
      "burner controller"
    ]
  },
  {
    "id": "nesbd-sisen-flow-meter-65",
    "slug": "sisen-electromagnetic-flow-meter",
    "name": "SISEN Electromagnetic Flow Meter",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "SISEN",
    "model": "",
    "shortDescription": "Electromagnetic flow meter (as listed).",
    "description": "SISEN electromagnetic flow meter as listed by source. Confirm line size, accuracy, output, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/electromagnetic_flow_meter_a0bad65f3a0d45a545b29e58915e5927.jpg",
    "availability": "inquiry-required",
    "features": [
      "Electromagnetic flow meter"
    ],
    "applications": [
      "Flow measurement (project-specific)"
    ],
    "keywords": [
      "SISEN",
      "electromagnetic flow meter"
    ]
  },
  {
    "id": "nesbd-ls-plc-66",
    "slug": "ls-plc",
    "name": "LS PLC",
    "category": "industrial-automation",
    "subcategory": "plc-hmi-controllers",
    "brand": "LS",
    "model": "",
    "shortDescription": "LS PLC (as listed).",
    "description": "LS PLC as listed by source. Confirm model, I/O, and communication requirements per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/ls_plc_6672535b3bbd3efe17a90cbfe522dad6.jpg",
    "availability": "inquiry-required",
    "features": [
      "PLC",
      "LS brand (as listed)"
    ],
    "applications": [
      "Industrial automation/control"
    ],
    "keywords": [
      "LS",
      "PLC"
    ]
  },
  {
    "id": "nesbd-ls-hmi-85",
    "slug": "ls-hmi",
    "name": "LS HMI",
    "category": "industrial-automation",
    "subcategory": "plc-hmi-controllers",
    "brand": "LS",
    "model": "",
    "shortDescription": "LS HMI (as listed).",
    "description": "LS HMI as listed by source. Confirm screen size, communication, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/ls_hmi_49e7bcd82086a497bcd56974f0360abf.jpg",
    "availability": "inquiry-required",
    "features": [
      "HMI",
      "LS brand (as listed)"
    ],
    "applications": [
      "Operator interface/automation"
    ],
    "keywords": [
      "LS",
      "HMI"
    ]
  },
  {
    "id": "nesbd-centering-sensors-101",
    "slug": "centering-sensors",
    "name": "Centering Sensors",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Centering sensors (as listed).",
    "description": "Centering sensors as listed by source. Confirm sensing type, range, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/centering_sensors_b34632eea43f275dea3fab7286ba9217.jpg",
    "availability": "inquiry-required",
    "features": [
      "Centering sensors"
    ],
    "applications": [
      "Machine/web guiding (project-specific)"
    ],
    "keywords": [
      "centering sensors"
    ]
  },
  {
    "id": "nesbd-photocell-stenter-edge-guider-102",
    "slug": "photocell-stenter-edge-guider",
    "name": "Photocell Stenter Edge Guider",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Photocell stenter edge guider (as listed).",
    "description": "Photocell stenter edge guider as listed by source. Confirm compatibility and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/photocell_stenter_edge_guider_ba74ab3a87e3d0bf9d3c0443629b795f.jpg",
    "availability": "inquiry-required",
    "features": [
      "Photocell edge guider"
    ],
    "applications": [
      "Stenter/edge guiding (project-specific)"
    ],
    "keywords": [
      "photocell",
      "edge guider",
      "stenter"
    ]
  },
  {
    "id": "nesbd-proximity-sensors-103",
    "slug": "proximity-sensors-103",
    "name": "Proximity Sensors",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Proximity sensors (as listed).",
    "description": "Proximity sensors as listed by source. Confirm sensing type, range, output, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/proximity_sensors_815cf2e6475025e3392e776f8148ab5e.jpg",
    "availability": "inquiry-required",
    "features": [
      "Proximity sensors"
    ],
    "applications": [
      "Industrial sensing/automation"
    ],
    "keywords": [
      "proximity sensors"
    ]
  },
  {
    "id": "nesbd-proximity-sensors-104",
    "slug": "proximity-sensors-104",
    "name": "Proximity Sensors",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Proximity sensors (as listed).",
    "description": "Proximity sensors as listed by source. Confirm sensing type, range, output, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/proximity_sensors_54e2238adb21a4850a61b50402362143.jpg",
    "availability": "inquiry-required",
    "features": [
      "Proximity sensors"
    ],
    "applications": [
      "Industrial sensing/automation"
    ],
    "keywords": [
      "proximity sensors"
    ]
  },
  {
    "id": "nesbd-pressure-transmitter-106",
    "slug": "pressure-transmitter-transducer",
    "name": "Pressure Transmitter Transducer",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Pressure transmitter/transducer (as listed).",
    "description": "Pressure transmitter transducer as listed by source. Confirm range, output signal, process connection, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/pressure_transmitter_transducer_174f5ffb0ebe2dd0b620620b2e0a478d.jpg",
    "availability": "inquiry-required",
    "features": [
      "Pressure transmitter/transducer"
    ],
    "applications": [
      "Pressure measurement/control"
    ],
    "keywords": [
      "pressure transmitter",
      "transducer"
    ]
  },
  {
    "id": "nesbd-integrative-temperature-transmitter-107",
    "slug": "integrative-temperature-transmitter",
    "name": "Integrative Temperature Transmitter",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Integrative temperature transmitter (as listed).",
    "description": "Integrative temperature transmitter as listed by source. Confirm range, sensor type, output, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/integrative_temperature_transmitter_8b9a0f4ab0a20f8b441434b8033043ca.jpg",
    "availability": "inquiry-required",
    "features": [
      "Temperature transmitter"
    ],
    "applications": [
      "Temperature measurement/control"
    ],
    "keywords": [
      "temperature transmitter"
    ]
  },
  {
    "id": "nesbd-water-level-sensor-108",
    "slug": "water-level-sensor",
    "name": "Water Level Sensor",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Water level sensor (as listed).",
    "description": "Water level sensor as listed by source. Confirm sensing method, range, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/water_level_sensor_b8b180167c2f28d2c253011768d6d3a2.jpg",
    "availability": "inquiry-required",
    "features": [
      "Water level sensor"
    ],
    "applications": [
      "Level monitoring/control"
    ],
    "keywords": [
      "water level sensor"
    ]
  },
  {
    "id": "nesbd-magnetic-level-sensor-stainless-109",
    "slug": "magnetic-level-sensor-stainless",
    "name": "Magnetic Level Sensor Stainless",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "",
    "model": "",
    "shortDescription": "Stainless magnetic level sensor (as listed).",
    "description": "Magnetic level sensor (stainless) as listed by source. Confirm range, material, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/magnetic_level_sensor_stainless_acd4a908ed1e3a345006c1d0c12865b3.jpg",
    "availability": "inquiry-required",
    "features": [
      "Magnetic level sensor",
      "Stainless (as listed)"
    ],
    "applications": [
      "Level monitoring/control"
    ],
    "keywords": [
      "magnetic level sensor",
      "stainless"
    ]
  },
  {
    "id": "nesbd-electro-pneumatic-positioner-110",
    "slug": "electro-pneumatic-positioner",
    "name": "Electro Pneumatic Positioner",
    "category": "industrial-automation",
    "subcategory": "instrumentation-controls",
    "brand": "",
    "model": "",
    "shortDescription": "Electro-pneumatic positioner (as listed).",
    "description": "Electro pneumatic positioner as listed by source. Confirm valve compatibility, signal, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/electro_pneumatic_positioner_b9959883c8459ef6a5bd4b2de9efbbe6.jpg",
    "availability": "inquiry-required",
    "features": [
      "Electro-pneumatic positioner"
    ],
    "applications": [
      "Control valve positioning"
    ],
    "keywords": [
      "electro pneumatic positioner",
      "valve positioner"
    ]
  },
  {
    "id": "nesbd-vaisala-temp-humidity-111",
    "slug": "vaisala-temperature-humidity-sensors",
    "name": "Vaisala Temperature and Humidity Sensors",
    "category": "industrial-automation",
    "subcategory": "sensors-transmitters",
    "brand": "Vaisala",
    "model": "",
    "shortDescription": "Vaisala temperature and humidity sensors (as listed).",
    "description": "Vaisala temperature and humidity sensors as listed by source. Confirm model, range, output, and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/vaisala_temperature_and_humidity_sensors_2785b4db89c0e2f10f20cf6454cbad31.jpg",
    "availability": "inquiry-required",
    "features": [
      "Temperature and humidity sensors",
      "Vaisala brand (as listed)"
    ],
    "applications": [
      "Environmental monitoring/control"
    ],
    "keywords": [
      "Vaisala",
      "temperature humidity sensor"
    ]
  },
  {
    "id": "nesbd-weishaupt-wg-display-231",
    "slug": "weishaupt-wg-display-with-keypad-660300",
    "name": "Weishaupt WG Display with Keypad 660300",
    "category": "industrial-automation",
    "subcategory": "instrumentation-controls",
    "brand": "Weishaupt",
    "model": "660300",
    "shortDescription": "Weishaupt WG display with keypad (as listed).",
    "description": "Weishaupt WG display with keypad 660300 as listed by source. Confirm compatibility and application per project. (Source: nesbd.com)",
    "image": "https://www.nesbd.com/images/products/weishaupt_wg_display_with_keypad_660300_3775e6fee882f31f25255bb050b54a47.jpg",
    "availability": "inquiry-required",
    "features": [
      "WG display with keypad",
      "Model 660300 (as listed)"
    ],
    "applications": [
      "Burner/control interface (project-specific)"
    ],
    "keywords": [
      "Weishaupt",
      "WG display",
      "660300"
    ]
  },
  // ---- PTEL Fire Detection System (source: ptel.com.bd category, factual listing) ----
  {
    "id": "ptel-triga-series",
    "slug": "triga-series",
    "name": "TRIGA Series",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "TRIGA Series (as listed by source).",
    "description": "TRIGA Series as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/triga-series.png",
    "availability": "inquiry-required",
    "features": [
      "TRIGA Series"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "triga",
      "series"
    ]
  },
  {
    "id": "ptel-neo-series-fire-protection-panels",
    "slug": "neo-series-fire-protection-panels",
    "name": "NEO Series Fire Protection Panels",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "NEO Series Fire Protection Panels (as listed by source).",
    "description": "NEO Series Fire Protection Panels as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/neo-series.png",
    "availability": "inquiry-required",
    "features": [
      "NEO Series Fire Protection Panels"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "neo",
      "series",
      "fire",
      "protection",
      "panels"
    ]
  },
  {
    "id": "ptel-omega-series-fire-protection-panels",
    "slug": "omega-series-fire-protection-panels",
    "name": "OMEGA Series Fire Protection Panels",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "OMEGA Series Fire Protection Panels (as listed by source).",
    "description": "OMEGA Series Fire Protection Panels as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/omega-series-panels.png",
    "availability": "inquiry-required",
    "features": [
      "OMEGA Series Fire Protection Panels"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "omega",
      "series",
      "fire",
      "protection",
      "panels"
    ]
  },
  {
    "id": "ptel-aura-series-fire-protection-panels",
    "slug": "aura-series-fire-protection-panels",
    "name": "AURA Series Fire Protection Panels",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "AURA Series Fire Protection Panels (as listed by source).",
    "description": "AURA Series Fire Protection Panels as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/aura-series-fire-protection-panels.png",
    "availability": "inquiry-required",
    "features": [
      "AURA Series Fire Protection Panels"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "aura",
      "series",
      "fire",
      "protection",
      "panels"
    ]
  },
  {
    "id": "ptel-simplex-johnson-controls",
    "slug": "simplex-johnson-controls",
    "name": "SIMPLEX (Johnson Controls)",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "SIMPLEX (Johnson Controls) (as listed by source).",
    "description": "SIMPLEX (Johnson Controls) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-johnson-controls.png",
    "availability": "inquiry-required",
    "features": [
      "SIMPLEX (Johnson Controls)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "johnson",
      "controls"
    ]
  },
  {
    "id": "ptel-gas-extinguishing-control-panel",
    "slug": "gas-extinguishing-control-panel",
    "name": "Gas Extinguishing Control Panel",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "Gas Extinguishing Control Panel (as listed by source).",
    "description": "Gas Extinguishing Control Panel as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/gas-extinguishing-control-panel.png",
    "availability": "inquiry-required",
    "features": [
      "Gas Extinguishing Control Panel"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "gas",
      "extinguishing",
      "control",
      "panel"
    ]
  },
  {
    "id": "ptel-tr-photo-w-triga",
    "slug": "tr-photo-w-triga",
    "name": "TR-PHOTO-W-TRIGA",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "TR-PHOTO-W-TRIGA (as listed by source).",
    "description": "TR-PHOTO-W-TRIGA as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-photo-w-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-PHOTO-W-TRIGA"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "photo",
      "w",
      "triga"
    ]
  },
  {
    "id": "ptel-s-a-shield",
    "slug": "s-a-shield",
    "name": "S-A4011 (SHIELD)",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4011 (SHIELD) (as listed by source).",
    "description": "S-A4011 (SHIELD) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-a4011-shield.png",
    "availability": "inquiry-required",
    "features": [
      "S-A4011 (SHIELD)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4011",
      "shield"
    ]
  },
  {
    "id": "ptel-simplex-simplex",
    "slug": "simplex-simplex",
    "name": "Simplex 4098-9714 (SIMPLEX)",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex 4098-9714 (SIMPLEX) (as listed by source).",
    "description": "Simplex 4098-9714 (SIMPLEX) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-4098-9714-simplex.png",
    "availability": "inquiry-required",
    "features": [
      "Simplex 4098-9714 (SIMPLEX)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4098",
      "9714",
      "simplex"
    ]
  },
  {
    "id": "ptel-tr-heat-ror-w-triga",
    "slug": "tr-heat-ror-w-triga",
    "name": "TR-HEAT-ROR-W - TRIGA",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "TR-HEAT-ROR-W - TRIGA (as listed by source).",
    "description": "TR-HEAT-ROR-W - TRIGA as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-heat-ror-w-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-HEAT-ROR-W - TRIGA"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "heat",
      "ror",
      "w",
      "triga"
    ]
  },
  {
    "id": "ptel-s-a-shield-heat-detectors",
    "slug": "s-a-shield-heat-detectors",
    "name": "S-A4013 (SHIELD) Heat Detectors",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4013 (SHIELD) Heat Detectors (as listed by source).",
    "description": "S-A4013 (SHIELD) Heat Detectors as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-a4013-shield.png",
    "availability": "inquiry-required",
    "features": [
      "S-A4013 (SHIELD) Heat Detectors"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4013",
      "shield",
      "heat",
      "detectors"
    ]
  },
  {
    "id": "ptel-simplex-simplex-heat-detector",
    "slug": "simplex-simplex-heat-detector",
    "name": "Simplex 4098-9733 (SIMPLEX) Heat Detector",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex 4098-9733 (SIMPLEX) Heat Detector (as listed by source).",
    "description": "Simplex 4098-9733 (SIMPLEX) Heat Detector as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-4098-9733-simplex.png",
    "availability": "inquiry-required",
    "features": [
      "Simplex 4098-9733 (SIMPLEX) Heat Detector"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4098",
      "9733",
      "simplex",
      "heat",
      "detector"
    ]
  },
  {
    "id": "ptel-tr-photo-t-w-triga-triga",
    "slug": "tr-photo-t-w-triga-triga",
    "name": "TR-PHOTO-T-W - TRIGA (TRIGA)",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "TR-PHOTO-T-W - TRIGA (TRIGA) (as listed by source).",
    "description": "TR-PHOTO-T-W - TRIGA (TRIGA) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-photo-t-w-triga-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-PHOTO-T-W - TRIGA (TRIGA)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "photo",
      "t",
      "w",
      "triga",
      "triga"
    ]
  },
  {
    "id": "ptel-s-a-shield-multi-detector",
    "slug": "s-a-shield-multi-detector",
    "name": "S-A4012 (SHIELD) Multi Detector",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4012 (SHIELD) Multi Detector (as listed by source).",
    "description": "S-A4012 (SHIELD) Multi Detector as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-a4012-shield.png",
    "availability": "inquiry-required",
    "features": [
      "S-A4012 (SHIELD) Multi Detector"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4012",
      "shield",
      "multi",
      "detector"
    ]
  },
  {
    "id": "ptel-tr-pull-sa-triga-triga",
    "slug": "tr-pull-sa-triga-triga",
    "name": "TR-PULL-SA-TRIGA (TRIGA)",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "TR-PULL-SA-TRIGA (TRIGA) (as listed by source).",
    "description": "TR-PULL-SA-TRIGA (TRIGA) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-pull-sa-triga-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-PULL-SA-TRIGA (TRIGA)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "pull",
      "sa",
      "triga",
      "triga"
    ]
  },
  {
    "id": "ptel-s-a-shield-manual-call-point",
    "slug": "s-a-shield-manual-call-point",
    "name": "S-A4061 (SHIELD) Manual Call Point",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4061 (SHIELD) Manual Call Point (as listed by source).",
    "description": "S-A4061 (SHIELD) Manual Call Point as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-a4061-shield.png",
    "availability": "inquiry-required",
    "features": [
      "S-A4061 (SHIELD) Manual Call Point"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4061",
      "shield",
      "manual",
      "call",
      "point"
    ]
  },
  {
    "id": "ptel-simplex-simplex-manual-call-point",
    "slug": "simplex-simplex-manual-call-point",
    "name": "Simplex 4099-9006 (SIMPLEX) Manual Call Point",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex 4099-9006 (SIMPLEX) Manual Call Point (as listed by source).",
    "description": "Simplex 4099-9006 (SIMPLEX) Manual Call Point as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/1759726478-simplex-4099-9006-simplex-breakglass.png",
    "availability": "inquiry-required",
    "features": [
      "Simplex 4099-9006 (SIMPLEX) Manual Call Point"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4099",
      "9006",
      "simplex",
      "manual",
      "call",
      "point"
    ]
  },
  {
    "id": "ptel-tr-hrl-triga",
    "slug": "tr-hrl-triga",
    "name": "TR-HRL-TRIGA",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "TR-HRL-TRIGA (as listed by source).",
    "description": "TR-HRL-TRIGA as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-hrl-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-HRL-TRIGA"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "hrl",
      "triga"
    ]
  },
  {
    "id": "ptel-s-c-shield-sounder",
    "slug": "s-c-shield-sounder",
    "name": "S-C8055 (SHIELD) Sounder",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "S-C8055 (SHIELD) Sounder (as listed by source).",
    "description": "S-C8055 (SHIELD) Sounder as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-c8055-shield.png",
    "availability": "inquiry-required",
    "features": [
      "S-C8055 (SHIELD) Sounder"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "c8055",
      "shield",
      "sounder"
    ]
  },
  {
    "id": "ptel-sounder-simplex",
    "slug": "sounder-simplex",
    "name": "SOUNDER (SIMPLEX)",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "SOUNDER (SIMPLEX) (as listed by source).",
    "description": "SOUNDER (SIMPLEX) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sounder-simplex.png",
    "availability": "inquiry-required",
    "features": [
      "SOUNDER (SIMPLEX)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "sounder",
      "simplex"
    ]
  },
  {
    "id": "ptel-tr-prl-triga-sounder-with-flasher",
    "slug": "tr-prl-triga-sounder-with-flasher",
    "name": "TR-P2RL - TRIGA SOUNDER WITH FLASHER",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "TR-P2RL - TRIGA SOUNDER WITH FLASHER (as listed by source).",
    "description": "TR-P2RL - TRIGA SOUNDER WITH FLASHER as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-p2rl-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-P2RL - TRIGA SOUNDER WITH FLASHER"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "p2rl",
      "triga",
      "sounder",
      "with",
      "flasher"
    ]
  },
  {
    "id": "ptel-wall-mounted-outdoor-triga",
    "slug": "wall-mounted-outdoor-triga",
    "name": "WALL MOUNTED-OUTDOOR (TRIGA)",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "WALL MOUNTED-OUTDOOR (TRIGA) (as listed by source).",
    "description": "WALL MOUNTED-OUTDOOR (TRIGA) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/wall-mounted-outdoor-triga.png",
    "availability": "inquiry-required",
    "features": [
      "WALL MOUNTED-OUTDOOR (TRIGA)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "wall",
      "mounted",
      "outdoor",
      "triga"
    ]
  },
  {
    "id": "ptel-triga-ceiling-mounted-fire-alarm",
    "slug": "triga-ceiling-mounted-fire-alarm",
    "name": "TRIGA Ceiling Mounted Fire Alarm",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "TRIGA Ceiling Mounted Fire Alarm (as listed by source).",
    "description": "TRIGA Ceiling Mounted Fire Alarm as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/ceiling-mounted-triga-1.png",
    "availability": "inquiry-required",
    "features": [
      "TRIGA Ceiling Mounted Fire Alarm"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "triga",
      "ceiling",
      "mounted",
      "fire",
      "alarm"
    ]
  },
  {
    "id": "ptel-simplex-wall-horn-strobe",
    "slug": "simplex-wall-horn-strobe",
    "name": "Simplex 4906-9127 Wall Horn Strobe",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex 4906-9127 Wall Horn Strobe (as listed by source).",
    "description": "Simplex 4906-9127 Wall Horn Strobe as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-4906-9127-wall-horn-strobe.png",
    "availability": "inquiry-required",
    "features": [
      "Simplex 4906-9127 Wall Horn Strobe"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4906",
      "9127",
      "wall",
      "horn",
      "strobe"
    ]
  },
  {
    "id": "ptel-shield-sounder-flasher",
    "slug": "shield-sounder-flasher",
    "name": "SHIELD Sounder & Flasher",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "SHIELD Sounder & Flasher (as listed by source).",
    "description": "SHIELD Sounder & Flasher as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/shield-sounder-flasher.png",
    "availability": "inquiry-required",
    "features": [
      "SHIELD Sounder & Flasher"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "shield",
      "sounder",
      "flasher"
    ]
  },
  {
    "id": "ptel-tr-relay-triga",
    "slug": "tr-relay-triga",
    "name": "TR-RELAY-TRIGA",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "TR-RELAY-TRIGA (as listed by source).",
    "description": "TR-RELAY-TRIGA as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-relay-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-RELAY-TRIGA"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "relay",
      "triga"
    ]
  },
  {
    "id": "ptel-tr-monitor-triga",
    "slug": "tr-monitor-triga",
    "name": "TR-MONITOR-TRIGA",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "TR-MONITOR-TRIGA (as listed by source).",
    "description": "TR-MONITOR-TRIGA as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tr-monitor-triga.png",
    "availability": "inquiry-required",
    "features": [
      "TR-MONITOR-TRIGA"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "tr",
      "monitor",
      "triga"
    ]
  },
  {
    "id": "ptel-s-a-shield-inputoutput-module",
    "slug": "s-a-shield-inputoutput-module",
    "name": "S-A4045 (SHIELD) Input/Output Module",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4045 (SHIELD) Input/Output Module (as listed by source).",
    "description": "S-A4045 (SHIELD) Input/Output Module as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/inputoutput-module.png",
    "availability": "inquiry-required",
    "features": [
      "S-A4045 (SHIELD) Input/Output Module"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4045",
      "shield",
      "input",
      "output",
      "module"
    ]
  },
  {
    "id": "ptel-simplex",
    "slug": "simplex",
    "name": "Simplex-4090-9002",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex-4090-9002 (as listed by source).",
    "description": "Simplex-4090-9002 as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-4090-9002-simplex-1.png",
    "availability": "inquiry-required",
    "features": [
      "Simplex-4090-9002"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4090",
      "9002"
    ]
  },
  {
    "id": "ptel-s-a-shield-control-output-module",
    "slug": "s-a-shield-control-output-module",
    "name": "S-A4042 (SHIELD) Control Output Module",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4042 (SHIELD) Control Output Module (as listed by source).",
    "description": "S-A4042 (SHIELD) Control Output Module as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-a4042-shield.png",
    "availability": "inquiry-required",
    "features": [
      "S-A4042 (SHIELD) Control Output Module"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4042",
      "shield",
      "control",
      "output",
      "module"
    ]
  },
  {
    "id": "ptel-control-panel",
    "slug": "control-panel",
    "name": "CONTROL PANEL",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "CONTROL PANEL (as listed by source).",
    "description": "CONTROL PANEL as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/control-panel.png",
    "availability": "inquiry-required",
    "features": [
      "CONTROL PANEL"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "control",
      "panel"
    ]
  },
  {
    "id": "ptel-neo-series-control-panel",
    "slug": "neo-series-control-panel",
    "name": "NEO SERIES-CONTROL PANEL",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "NEO SERIES-CONTROL PANEL (as listed by source).",
    "description": "NEO SERIES-CONTROL PANEL as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/neo-series-control-panel.png",
    "availability": "inquiry-required",
    "features": [
      "NEO SERIES-CONTROL PANEL"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "neo",
      "series",
      "control",
      "panel"
    ]
  },
  {
    "id": "ptel-omega-series-control-panel",
    "slug": "omega-series-control-panel",
    "name": "OMEGA SERIES-CONTROL PANEL",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "OMEGA SERIES-CONTROL PANEL (as listed by source).",
    "description": "OMEGA SERIES-CONTROL PANEL as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/omega-series-control-panel.png",
    "availability": "inquiry-required",
    "features": [
      "OMEGA SERIES-CONTROL PANEL"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "omega",
      "series",
      "control",
      "panel"
    ]
  },
  {
    "id": "ptel-aura-sereis-control-panel",
    "slug": "aura-sereis-control-panel",
    "name": "AURA SEREIS-CONTROL PANEL",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "AURA SEREIS-CONTROL PANEL (as listed by source).",
    "description": "AURA SEREIS-CONTROL PANEL as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/aura-sereis-control-panel.png",
    "availability": "inquiry-required",
    "features": [
      "AURA SEREIS-CONTROL PANEL"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "aura",
      "sereis",
      "control",
      "panel"
    ]
  },
  {
    "id": "ptel-lpcb-cfds",
    "slug": "lpcb-cfds",
    "name": "LPCB CFDS",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "LPCB CFDS (as listed by source).",
    "description": "LPCB CFDS as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/lpcb-cfds.jpg",
    "availability": "inquiry-required",
    "features": [
      "LPCB CFDS"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "lpcb",
      "cfds"
    ]
  },
  {
    "id": "ptel-control-panel-second",
    "slug": "control-panel-second",
    "name": "CONTROL PANEL Second",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "CONTROL PANEL Second (as listed by source).",
    "description": "CONTROL PANEL Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/control-panel-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "CONTROL PANEL Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "control",
      "panel",
      "second"
    ]
  },
  {
    "id": "ptel-smoke-detector",
    "slug": "smoke-detector",
    "name": "SMOKE DETECTOR",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "SMOKE DETECTOR (as listed by source).",
    "description": "SMOKE DETECTOR as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/smoke-detector.jpg",
    "availability": "inquiry-required",
    "features": [
      "SMOKE DETECTOR"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "smoke",
      "detector"
    ]
  },
  {
    "id": "ptel-smoke-detector-second",
    "slug": "smoke-detector-second",
    "name": "SMOKE DETECTOR Second",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "SMOKE DETECTOR Second (as listed by source).",
    "description": "SMOKE DETECTOR Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/smoke-detector-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "SMOKE DETECTOR Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "smoke",
      "detector",
      "second"
    ]
  },
  {
    "id": "ptel-heat-detector",
    "slug": "heat-detector",
    "name": "HEAT DETECTOR",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "HEAT DETECTOR (as listed by source).",
    "description": "HEAT DETECTOR as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/heat-detector.jpg",
    "availability": "inquiry-required",
    "features": [
      "HEAT DETECTOR"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "heat",
      "detector"
    ]
  },
  {
    "id": "ptel-smoke-detector-third",
    "slug": "smoke-detector-third",
    "name": "SMOKE DETECTOR Third",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "SMOKE DETECTOR Third (as listed by source).",
    "description": "SMOKE DETECTOR Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/smoke-detector-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "SMOKE DETECTOR Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "smoke",
      "detector",
      "third"
    ]
  },
  {
    "id": "ptel-heat-detector-third",
    "slug": "heat-detector-third",
    "name": "HEAT DETECTOR Third",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "HEAT DETECTOR Third (as listed by source).",
    "description": "HEAT DETECTOR Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/heat-detector-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "HEAT DETECTOR Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "heat",
      "detector",
      "third"
    ]
  },
  {
    "id": "ptel-multi-detector",
    "slug": "multi-detector",
    "name": "MULTI DETECTOR",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "MULTI DETECTOR (as listed by source).",
    "description": "MULTI DETECTOR as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/multi-detector.jpg",
    "availability": "inquiry-required",
    "features": [
      "MULTI DETECTOR"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "multi",
      "detector"
    ]
  },
  {
    "id": "ptel-beam-detector",
    "slug": "beam-detector",
    "name": "BEAM DETECTOR",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "BEAM DETECTOR (as listed by source).",
    "description": "BEAM DETECTOR as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/beam-detector.jpg",
    "availability": "inquiry-required",
    "features": [
      "BEAM DETECTOR"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "beam",
      "detector"
    ]
  },
  {
    "id": "ptel-heat-detector-second",
    "slug": "heat-detector-second",
    "name": "HEAT DETECTOR Second",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "HEAT DETECTOR Second (as listed by source).",
    "description": "HEAT DETECTOR Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/heat-detector-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "HEAT DETECTOR Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "heat",
      "detector",
      "second"
    ]
  },
  {
    "id": "ptel-manual-call-point",
    "slug": "manual-call-point",
    "name": "MANUAL CALL POINT",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "MANUAL CALL POINT (as listed by source).",
    "description": "MANUAL CALL POINT as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/manual-call-point.jpg",
    "availability": "inquiry-required",
    "features": [
      "MANUAL CALL POINT"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "manual",
      "call",
      "point"
    ]
  },
  {
    "id": "ptel-battery-operatedoptical-smoke-detector",
    "slug": "battery-operatedoptical-smoke-detector",
    "name": "BATTERY OPERATED/OPTICAL SMOKE DETECTOR",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "BATTERY OPERATED/OPTICAL SMOKE DETECTOR (as listed by source).",
    "description": "BATTERY OPERATED/OPTICAL SMOKE DETECTOR as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/battery-operatedoptical-smoke-detector.jpg",
    "availability": "inquiry-required",
    "features": [
      "BATTERY OPERATED/OPTICAL SMOKE DETECTOR"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "battery",
      "operated",
      "optical",
      "smoke",
      "detector"
    ]
  },
  {
    "id": "ptel-multi-detector-second",
    "slug": "multi-detector-second",
    "name": "MULTI DETECTOR Second",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "MULTI DETECTOR Second (as listed by source).",
    "description": "MULTI DETECTOR Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/multi-detector-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "MULTI DETECTOR Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "multi",
      "detector",
      "second"
    ]
  },
  {
    "id": "ptel-manual-call-point-second",
    "slug": "manual-call-point-second",
    "name": "MANUAL CALL POINT Second",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "MANUAL CALL POINT Second (as listed by source).",
    "description": "MANUAL CALL POINT Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/manual-call-point-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "MANUAL CALL POINT Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "manual",
      "call",
      "point",
      "second"
    ]
  },
  {
    "id": "ptel-multi-detector-third",
    "slug": "multi-detector-third",
    "name": "MULTI DETECTOR Third",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "MULTI DETECTOR Third (as listed by source).",
    "description": "MULTI DETECTOR Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/multi-detector-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "MULTI DETECTOR Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "multi",
      "detector",
      "third"
    ]
  },
  {
    "id": "ptel-horn-with-strobe",
    "slug": "horn-with-strobe",
    "name": "HORN WITH STROBE",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "HORN WITH STROBE (as listed by source).",
    "description": "HORN WITH STROBE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/horn-with-strobe.jpg",
    "availability": "inquiry-required",
    "features": [
      "HORN WITH STROBE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "horn",
      "with",
      "strobe"
    ]
  },
  {
    "id": "ptel-sounder",
    "slug": "sounder",
    "name": "SOUNDER",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "SOUNDER (as listed by source).",
    "description": "SOUNDER as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sounder.jpg",
    "availability": "inquiry-required",
    "features": [
      "SOUNDER"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "sounder"
    ]
  },
  {
    "id": "ptel-inputmodule",
    "slug": "inputmodule",
    "name": "INPUT/MODULE",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "INPUT/MODULE (as listed by source).",
    "description": "INPUT/MODULE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/inputmodule.jpg",
    "availability": "inquiry-required",
    "features": [
      "INPUT/MODULE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "input",
      "module"
    ]
  },
  {
    "id": "ptel-output-module",
    "slug": "output-module",
    "name": "OUTPUT MODULE",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "OUTPUT MODULE (as listed by source).",
    "description": "OUTPUT MODULE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/output-module.jpg",
    "availability": "inquiry-required",
    "features": [
      "OUTPUT MODULE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "output",
      "module"
    ]
  },
  {
    "id": "ptel-manual-call-point-third",
    "slug": "manual-call-point-third",
    "name": "MANUAL CALL POINT Third",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "MANUAL CALL POINT Third (as listed by source).",
    "description": "MANUAL CALL POINT Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/manual-call-point-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "MANUAL CALL POINT Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "manual",
      "call",
      "point",
      "third"
    ]
  },
  {
    "id": "ptel-isolator-module-second",
    "slug": "isolator-module-second",
    "name": "ISOLATOR MODULE Second",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "ISOLATOR MODULE Second (as listed by source).",
    "description": "ISOLATOR MODULE Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/isolator-module-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "ISOLATOR MODULE Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "isolator",
      "module",
      "second"
    ]
  },
  {
    "id": "ptel-horn-with-strobe-second",
    "slug": "horn-with-strobe-second",
    "name": "HORN WITH STROBE Second",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "HORN WITH STROBE Second (as listed by source).",
    "description": "HORN WITH STROBE Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/horn-with-strobe-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "HORN WITH STROBE Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "horn",
      "with",
      "strobe",
      "second"
    ]
  },
  {
    "id": "ptel-sounder-second",
    "slug": "sounder-second",
    "name": "SOUNDER Second",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "SOUNDER Second (as listed by source).",
    "description": "SOUNDER Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sounder-second.png",
    "availability": "inquiry-required",
    "features": [
      "SOUNDER Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "sounder",
      "second"
    ]
  },
  {
    "id": "ptel-horn-with-strobe-third",
    "slug": "horn-with-strobe-third",
    "name": "HORN WITH STROBE Third",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "HORN WITH STROBE Third (as listed by source).",
    "description": "HORN WITH STROBE Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/horn-with-strobe-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "HORN WITH STROBE Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "horn",
      "with",
      "strobe",
      "third"
    ]
  },
  {
    "id": "ptel-fire-alarm-cable",
    "slug": "fire-alarm-cable",
    "name": "FIRE ALARM CABLE",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-cables",
    "brand": "",
    "model": "",
    "shortDescription": "FIRE ALARM CABLE (as listed by source).",
    "description": "FIRE ALARM CABLE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/fire-alarm-cable.jpg",
    "availability": "inquiry-required",
    "features": [
      "FIRE ALARM CABLE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "fire",
      "alarm",
      "cable"
    ]
  },
  {
    "id": "ptel-output-module-second",
    "slug": "output-module-second",
    "name": "OUTPUT MODULE Second",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "OUTPUT MODULE Second (as listed by source).",
    "description": "OUTPUT MODULE Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/output-module-second.png",
    "availability": "inquiry-required",
    "features": [
      "OUTPUT MODULE Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "output",
      "module",
      "second"
    ]
  },
  {
    "id": "ptel-horn-with-strobe-wall",
    "slug": "horn-with-strobe-wall",
    "name": "HORN WITH STROBE(WALL)",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "HORN WITH STROBE(WALL) (as listed by source).",
    "description": "HORN WITH STROBE(WALL) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/horn-with-strobe-wall.jpg",
    "availability": "inquiry-required",
    "features": [
      "HORN WITH STROBE(WALL)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "horn",
      "with",
      "strobe",
      "wall"
    ]
  },
  {
    "id": "ptel-sounder-third",
    "slug": "sounder-third",
    "name": "SOUNDER Third",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "",
    "model": "",
    "shortDescription": "SOUNDER Third (as listed by source).",
    "description": "SOUNDER Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sounder-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "SOUNDER Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "sounder",
      "third"
    ]
  },
  {
    "id": "ptel-simplex-4099-9006-simplex-breakglass",
    "slug": "simplex-4099-9006-simplex-breakglass",
    "name": "Simplex 4099-9006 (SIMPLEX)-BREAKGLASS",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex 4099-9006 (SIMPLEX)-BREAKGLASS (as listed by source).",
    "description": "Simplex 4099-9006 (SIMPLEX)-BREAKGLASS as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-4099-9006-simplex-breakglass.png",
    "availability": "inquiry-required",
    "features": [
      "Simplex 4099-9006 (SIMPLEX)-BREAKGLASS"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4099",
      "9006",
      "simplex",
      "breakglass"
    ]
  },
  {
    "id": "ptel-alpha-5000-shield",
    "slug": "alpha-5000-shield",
    "name": "ALPHA 5000 (SHIELD)",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "ALPHA 5000 (SHIELD) (as listed by source).",
    "description": "ALPHA 5000 (SHIELD) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/alpha-5000-shield.jpg",
    "availability": "inquiry-required",
    "features": [
      "ALPHA 5000 (SHIELD)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "alpha",
      "5000",
      "shield"
    ]
  },
  {
    "id": "ptel-output-module-third",
    "slug": "output-module-third",
    "name": "OUTPUT MODULE Third",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "OUTPUT MODULE Third (as listed by source).",
    "description": "OUTPUT MODULE Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/output-module-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "OUTPUT MODULE Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "output",
      "module",
      "third"
    ]
  },
  {
    "id": "ptel-s-a4045-shield",
    "slug": "s-a4045-shield",
    "name": "S-A4045 (SHIELD)",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "S-A4045 (SHIELD) (as listed by source).",
    "description": "S-A4045 (SHIELD) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/s-a4045-shield.jpg",
    "availability": "inquiry-required",
    "features": [
      "S-A4045 (SHIELD)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "s",
      "a4045",
      "shield"
    ]
  },
  {
    "id": "ptel-simplex-4090-9002-simplex",
    "slug": "simplex-4090-9002-simplex",
    "name": "Simplex-4090-9002 (SIMPLEX)",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "Simplex-4090-9002 (SIMPLEX) (as listed by source).",
    "description": "Simplex-4090-9002 (SIMPLEX) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/simplex-4090-9002-simplex.jpg",
    "availability": "inquiry-required",
    "features": [
      "Simplex-4090-9002 (SIMPLEX)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "simplex",
      "4090",
      "9002",
      "simplex"
    ]
  },
  {
    "id": "ptel-alpha-1000-shield",
    "slug": "alpha-1000-shield",
    "name": "ALPHA 1000 (SHIELD)",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "ALPHA 1000 (SHIELD) (as listed by source).",
    "description": "ALPHA 1000 (SHIELD) as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/alpha-1000-shield.jpg",
    "availability": "inquiry-required",
    "features": [
      "ALPHA 1000 (SHIELD)"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "alpha",
      "1000",
      "shield"
    ]
  },
  {
    "id": "ptel-digital-lhd-cable",
    "slug": "digital-lhd-cable",
    "name": "DIGITAL LHD CABLE",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-cables",
    "brand": "",
    "model": "",
    "shortDescription": "DIGITAL LHD CABLE (as listed by source).",
    "description": "DIGITAL LHD CABLE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/digital-lhd-cable.jpg",
    "availability": "inquiry-required",
    "features": [
      "DIGITAL LHD CABLE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "digital",
      "lhd",
      "cable"
    ]
  },
  {
    "id": "ptel-chinese-brand",
    "slug": "chinese-brand",
    "name": "CHINESE BRAND",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "CHINESE BRAND (as listed by source).",
    "description": "CHINESE BRAND as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/chinese-brand.jpg",
    "availability": "inquiry-required",
    "features": [
      "CHINESE BRAND"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "chinese",
      "brand"
    ]
  },
  {
    "id": "ptel-isolator-module",
    "slug": "isolator-module",
    "name": "ISOLATOR MODULE",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "ISOLATOR MODULE (as listed by source).",
    "description": "ISOLATOR MODULE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/isolator-module.jpg",
    "availability": "inquiry-required",
    "features": [
      "ISOLATOR MODULE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "isolator",
      "module"
    ]
  },
  {
    "id": "ptel-input-module",
    "slug": "input-module",
    "name": "INPUT MODULE",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "INPUT MODULE (as listed by source).",
    "description": "INPUT MODULE as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/input-module.jpg",
    "availability": "inquiry-required",
    "features": [
      "INPUT MODULE"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "input",
      "module"
    ]
  },
  {
    "id": "ptel-extinguishing-control-panel",
    "slug": "extinguishing-control-panel",
    "name": "EXTINGUISHING CONTROL PANEL",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "EXTINGUISHING CONTROL PANEL (as listed by source).",
    "description": "EXTINGUISHING CONTROL PANEL as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/extinguishing-control-panel.jpg",
    "availability": "inquiry-required",
    "features": [
      "EXTINGUISHING CONTROL PANEL"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "extinguishing",
      "control",
      "panel"
    ]
  },
  {
    "id": "ptel-isolator-module-third",
    "slug": "isolator-module-third",
    "name": "ISOLATOR MODULE Third",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "ISOLATOR MODULE Third (as listed by source).",
    "description": "ISOLATOR MODULE Third as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/isolator-module-third.jpg",
    "availability": "inquiry-required",
    "features": [
      "ISOLATOR MODULE Third"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "isolator",
      "module",
      "third"
    ]
  },
  {
    "id": "ptel-duct-detector",
    "slug": "duct-detector",
    "name": "DUCT DETECTOR",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "",
    "model": "",
    "shortDescription": "Duct smoke detector for HVAC/fire alarm duct applications (confirm model and approvals).",
    "description": "DUCT DETECTOR as listed by source (ptel.com.bd). The public product page provides limited technical detail; confirm detector model, sampling tube/duct size compatibility, approvals/listings, and fire alarm interface requirements per project. (Source: ptel.com.bd/product/duct-detector)",
    "image": "https://ptel.com.bd/storage/product/676291ab1910f_product_5984.png",
    "availability": "inquiry-required",
    "features": [
      "Duct smoke detection (as listed by source)",
      "Confirm model, duct compatibility, approvals, and interface per project"
    ],
    "applications": [
      "HVAC duct smoke detection (project-specific)",
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "duct",
      "detector",
      "smoke detector",
      "HVAC",
      "fire alarm"
    ]
  },
  {
    "id": "ptel-input-module-second",
    "slug": "input-module-second",
    "name": "INPUT MODULE Second",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "",
    "model": "",
    "shortDescription": "INPUT MODULE Second (as listed by source).",
    "description": "INPUT MODULE Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/input-module-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "INPUT MODULE Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "input",
      "module",
      "second"
    ]
  },
  {
    "id": "ptel-repeater-panel",
    "slug": "repeater-panel",
    "name": "REPEATER PANEL",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "REPEATER PANEL (as listed by source).",
    "description": "REPEATER PANEL as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/repeater-panel.png",
    "availability": "inquiry-required",
    "features": [
      "REPEATER PANEL"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "repeater",
      "panel"
    ]
  },
  {
    "id": "ptel-repeater-panel-second",
    "slug": "repeater-panel-second",
    "name": "Repeater Panel Second",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "",
    "model": "",
    "shortDescription": "Repeater Panel Second (as listed by source).",
    "description": "Repeater Panel Second as listed by source (ptel.com.bd fire detection category). Confirm specifications, model details, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/repeater-panel-second.jpg",
    "availability": "inquiry-required",
    "features": [
      "Repeater Panel Second"
    ],
    "applications": [
      "Fire detection and alarm systems (project-specific)"
    ],
    "keywords": [
      "repeater",
      "panel",
      "second"
    ]
  },
  // ---- PTEL Fire Protection System (source: ptel.com.bd category, factual listing) ----
  {
    "id": "ptel-3gk-abc-dry-powder-kg-fire-extinguisher",
    "slug": "3gk-abc-dry-powder-kg-fire-extinguisher",
    "name": "ABC Dry Powder (3 KG) Fire Extinguisher",
    "category": "fire-protection-system",
    "subcategory": "fire-extinguishers",
    "brand": "",
    "model": "",
    "shortDescription": "ABC Dry Powder (3 KG) Fire Extinguisher (as listed by source).",
    "description": "ABC Dry Powder (3 KG) Fire Extinguisher as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/1758434933-abc-dry-powder-fire-extinguisher-5kg-ptel.png",
    "availability": "inquiry-required",
    "features": [
      "ABC Dry Powder (3 KG) Fire Extinguisher"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "abc",
      "dry",
      "powder",
      "3",
      "kg",
      "fire",
      "extinguisher"
    ]
  },
  {
    "id": "ptel-5-kg-abcd-dry-powder-fire-extinguisher",
    "slug": "5-kg-abcd-dry-powder-fire-extinguisher",
    "name": "ABCD Dry Powder (5 KG) Fire Extinguisher",
    "category": "fire-protection-system",
    "subcategory": "fire-extinguishers",
    "brand": "",
    "model": "",
    "shortDescription": "ABCD Dry Powder (5 KG) Fire Extinguisher (as listed by source).",
    "description": "ABCD Dry Powder (5 KG) Fire Extinguisher as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/abc-dry-powder-fire-extinguisher-5kg-ptel.png",
    "availability": "inquiry-required",
    "features": [
      "ABCD Dry Powder (5 KG) Fire Extinguisher"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "abcd",
      "dry",
      "powder",
      "5",
      "kg",
      "fire",
      "extinguisher"
    ]
  },
  {
    "id": "ptel-10-kg-abc-dry-powder-fire-extinguisher",
    "slug": "10-kg-abc-dry-powder-fire-extinguisher",
    "name": "ABC Dry Powder (10KG) Fire Extinguisher",
    "category": "fire-protection-system",
    "subcategory": "fire-extinguishers",
    "brand": "",
    "model": "",
    "shortDescription": "ABC Dry Powder (10KG) Fire Extinguisher (as listed by source).",
    "description": "ABC Dry Powder (10KG) Fire Extinguisher as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/1758434711-abc-dry-powder-fire-extinguisher-5kg-ptel.png",
    "availability": "inquiry-required",
    "features": [
      "ABC Dry Powder (10KG) Fire Extinguisher"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "abc",
      "dry",
      "powder",
      "10kg",
      "fire",
      "extinguisher"
    ]
  },
  {
    "id": "ptel-25-kg-abc-dry-powder-fire-extinguisher-trolley-type",
    "slug": "25-kg-abc-dry-powder-fire-extinguisher-trolley-type",
    "name": "25 KG ABC Dry Powder Fire Extinguisher (Trolley Type)",
    "category": "fire-protection-system",
    "subcategory": "fire-extinguishers",
    "brand": "",
    "model": "",
    "shortDescription": "25 KG ABC Dry Powder Fire Extinguisher (Trolley Type) (as listed by source).",
    "description": "25 KG ABC Dry Powder Fire Extinguisher (Trolley Type) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/abc-dry-powder-25-kg-fire-extinguisher.png",
    "availability": "inquiry-required",
    "features": [
      "25 KG ABC Dry Powder Fire Extinguisher (Trolley Type)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "25",
      "kg",
      "abc",
      "dry",
      "powder",
      "fire",
      "extinguisher",
      "trolley"
    ]
  },
  {
    "id": "ptel-50-kg-abcd-kg-fire-extinguisher",
    "slug": "50-kg-abcd-kg-fire-extinguisher",
    "name": "ABCD 50 KG Fire Extinguisher",
    "category": "fire-protection-system",
    "subcategory": "fire-extinguishers",
    "brand": "",
    "model": "",
    "shortDescription": "ABCD 50 KG Fire Extinguisher (as listed by source).",
    "description": "ABCD 50 KG Fire Extinguisher as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/1758456235-abc-dry-powder-25-kg-fire-extinguisher.png",
    "availability": "inquiry-required",
    "features": [
      "ABCD 50 KG Fire Extinguisher"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "abcd",
      "50",
      "kg",
      "fire",
      "extinguisher"
    ]
  },
  {
    "id": "ptel-horizontal-split-case-fire-pumps",
    "slug": "horizontal-split-case-fire-pumps",
    "name": "Horizontal Split Case Fire Pumps",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Horizontal Split Case Fire Pumps (as listed by source).",
    "description": "Horizontal Split Case Fire Pumps as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/horizontal-split-case-fire-pump.png",
    "availability": "inquiry-required",
    "features": [
      "Horizontal Split Case Fire Pumps"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "horizontal",
      "split",
      "case",
      "fire",
      "pumps"
    ]
  },
  {
    "id": "ptel-kitchen-hood-fire-protection",
    "slug": "kitchen-hood-fire-protection",
    "name": "Kitchen Hood Fire Protection",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "Kitchen Hood Fire Protection (as listed by source).",
    "description": "Kitchen Hood Fire Protection as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/kitchenwhood-fire-protection.jfif",
    "availability": "inquiry-required",
    "features": [
      "Kitchen Hood Fire Protection"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "kitchen",
      "hood",
      "fire",
      "protection"
    ]
  },
  {
    "id": "ptel-fire-smoke-damper",
    "slug": "fire-smoke-damper",
    "name": "Fire & Smoke Damper",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Fire & Smoke Damper (as listed by source).",
    "description": "Fire & Smoke Damper as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/fire-smoke-dampers.png",
    "availability": "inquiry-required",
    "features": [
      "Fire & Smoke Damper"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "fire",
      "smoke",
      "damper"
    ]
  },
  {
    "id": "ptel-volume-control-damper",
    "slug": "volume-control-damper",
    "name": "Volume Control Damper",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Volume Control Damper (as listed by source).",
    "description": "Volume Control Damper as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/1759635061-fire-smoke-dampers.png",
    "availability": "inquiry-required",
    "features": [
      "Volume Control Damper"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "volume",
      "control",
      "damper"
    ]
  },
  {
    "id": "ptel-building-safety-tuf-panel",
    "slug": "building-safety-tuf-panel",
    "name": "Building Safety Tuf Panel",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Building Safety Tuf Panel (as listed by source).",
    "description": "Building Safety Tuf Panel as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/building-safety-tuf-panel-systems-in-bangladesh.png",
    "availability": "inquiry-required",
    "features": [
      "Building Safety Tuf Panel"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "building",
      "safety",
      "tuf",
      "panel"
    ]
  },
  {
    "id": "ptel-trimoterm-fireproof-panels",
    "slug": "trimoterm-fireproof-panels",
    "name": "Trimoterm Fireproof Panels",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Trimoterm Fireproof Panels (as listed by source).",
    "description": "Trimoterm Fireproof Panels as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/trimoterm-fireproof-panels.png",
    "availability": "inquiry-required",
    "features": [
      "Trimoterm Fireproof Panels"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "trimoterm",
      "fireproof",
      "panels"
    ]
  },
  {
    "id": "ptel-fire-hose-reels-kitemark-lpcb-approved",
    "slug": "fire-hose-reels-kitemark-lpcb-approved",
    "name": "Fire Hose Reels (Kitemark LPCB Approved)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Fire Hose Reels (Kitemark LPCB Approved) (as listed by source).",
    "description": "Fire Hose Reels (Kitemark LPCB Approved) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/fire-hose-reels-kitemark-lpcb-approved.jfif",
    "availability": "inquiry-required",
    "features": [
      "Fire Hose Reels (Kitemark LPCB Approved)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "fire",
      "hose",
      "reels",
      "kitemark",
      "lpcb",
      "approved"
    ]
  },
  {
    "id": "ptel-naffco-mm-hose-pipe-nozzle-ul-listed",
    "slug": "naffco-mm-hose-pipe-nozzle-ul-listed",
    "name": "NAFFCO 65mm Hose Pipe & Nozzle UL Listed",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "NAFFCO 65mm Hose Pipe & Nozzle UL Listed (as listed by source).",
    "description": "NAFFCO 65mm Hose Pipe & Nozzle UL Listed as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/naffco-65mm-hose-pipe-nozzle-model-nf-fh65sd-fn65.jfif",
    "availability": "inquiry-required",
    "features": [
      "NAFFCO 65mm Hose Pipe & Nozzle UL Listed"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "naffco",
      "65mm",
      "hose",
      "pipe",
      "nozzle",
      "ul",
      "listed"
    ]
  },
  {
    "id": "ptel-shield-y-strainer-sd-ysff-d-sd-ysgg-d",
    "slug": "shield-y-strainer-sd-ysff-d-sd-ysgg-d",
    "name": "SHIELD Y Strainer - SD-YS300FF-D / SD-YS300GG-D",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "SHIELD Y Strainer - SD-YS300FF-D / SD-YS300GG-D (as listed by source).",
    "description": "SHIELD Y Strainer - SD-YS300FF-D / SD-YS300GG-D as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/shield-y-strainer-sd-ys300ff-d-sd-ys300gg-d.png",
    "availability": "inquiry-required",
    "features": [
      "SHIELD Y Strainer - SD-YS300FF-D / SD-YS300GG-D"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "shield",
      "y",
      "strainer",
      "sd",
      "ys300ff",
      "d",
      "sd",
      "ys300gg"
    ]
  },
  {
    "id": "ptel-l-pump-casing-relief-valve-ul-listed-fm-approved",
    "slug": "l-pump-casing-relief-valve-ul-listed-fm-approved",
    "name": "55L-60 Pump Casing Relief Valve UL Listed & FM Approved",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "55L-60 Pump Casing Relief Valve UL Listed & FM Approved (as listed by source).",
    "description": "55L-60 Pump Casing Relief Valve UL Listed & FM Approved as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/55l-60-pump-casing-relief-valve-ul-listed-fm-approved.png",
    "availability": "inquiry-required",
    "features": [
      "55L-60 Pump Casing Relief Valve UL Listed & FM Approved"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "55l",
      "60",
      "pump",
      "casing",
      "relief",
      "valve",
      "ul",
      "listed"
    ]
  },
  {
    "id": "ptel-cla-val-pressure-reducing-valve-g-globe-a-angle",
    "slug": "cla-val-pressure-reducing-valve-g-globe-a-angle",
    "name": "Cla-Val Pressure Reducing Valve - 90G-21 Globe & 90A-21 Angle",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Cla-Val Pressure Reducing Valve - 90G-21 Globe & 90A-21 Angle (as listed by source).",
    "description": "Cla-Val Pressure Reducing Valve - 90G-21 Globe & 90A-21 Angle as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/cla-val-pressure-reducing-valve-90g-21-globe-90a-21-angle.png",
    "availability": "inquiry-required",
    "features": [
      "Cla-Val Pressure Reducing Valve - 90G-21 Globe & 90A-21 Angle"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "cla",
      "val",
      "pressure",
      "reducing",
      "valve",
      "90g",
      "21",
      "globe"
    ]
  },
  {
    "id": "ptel-cla-val-pressure-relief-valve-model-b-kg-b-kg",
    "slug": "cla-val-pressure-relief-valve-model-b-kg-b-kg",
    "name": "Cla-Val Pressure Relief Valve - Model 50B-4KG1 & 2050B-4KG1",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Cla-Val Pressure Relief Valve - Model 50B-4KG1 & 2050B-4KG1 (as listed by source).",
    "description": "Cla-Val Pressure Relief Valve - Model 50B-4KG1 & 2050B-4KG1 as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/cla-val-pressure-relief-valve-model-50b-4kg1-2050b-4kg1.png",
    "availability": "inquiry-required",
    "features": [
      "Cla-Val Pressure Relief Valve - Model 50B-4KG1 & 2050B-4KG1"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "cla",
      "val",
      "pressure",
      "relief",
      "valve",
      "model",
      "50b",
      "4kg1"
    ]
  },
  {
    "id": "ptel-end-suction-fire-pump",
    "slug": "end-suction-fire-pump",
    "name": "End Suction Fire Pump",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "NAFFCO (authorized distributor stated by source)",
    "model": "",
    "shortDescription": "End suction fire pump for NFPA 20 fire pump applications (confirm duty point).",
    "description": "End Suction Fire Pump as listed by source (PTEL). The source states performance characteristics as per NFPA 20, operation run test as per NFPA 20, horizontal end suction pumps for capacities up to 750 USGPM (as listed), and electric motor or diesel engine drive options. Confirm flow, pressure, speed, driver, controller, and approvals per project. (Source: ptel.com.bd/product/end-suction-fire-pump)",
    "image": "https://ptel.com.bd/storage/product/end-suction-fire-pump.png",
    "availability": "inquiry-required",
    "features": [
      "Performance characteristics as per NFPA 20 (as stated by source)",
      "Operation run test as per NFPA 20 (as stated by source)",
      "Horizontal end suction pumps for capacities up to 750 USGPM (as listed)",
      "Electric motor drive or diesel engine drive options (as listed)"
    ],
    "specifications": [
      { "label": "Flow rate (source range)", "value": "50 – 2500 US GPM** (as listed; confirm duty point)" },
      { "label": "Pressure ratings (source range)", "value": "3.4 – 15.4 BAR** (as listed; confirm)" },
      { "label": "Speed ratings (source range)", "value": "2900 – 3550 RPM** (as listed; confirm)" }
    ],
    "applications": [
      "Fire pump systems (project-specific)",
      "Commercial and industrial fire protection (NFPA 20 confirmation required)"
    ],
    "keywords": [
      "end suction",
      "fire pump",
      "NFPA 20",
      "NAFFCO"
    ]
  },
  {
    "id": "ptel-vertical-turbine-fire-pump",
    "slug": "vertical-turbine-fire-pump",
    "name": "Vertical Turbine Fire Pump",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Vertical Turbine Fire Pump (as listed by source).",
    "description": "Vertical Turbine Fire Pump as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/certified-vertical-turbine-fire-pump.png",
    "availability": "inquiry-required",
    "features": [
      "Vertical Turbine Fire Pump"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "vertical",
      "turbine",
      "fire",
      "pump"
    ]
  },
  {
    "id": "ptel-ms-pipe-shield",
    "slug": "ms-pipe-shield",
    "name": "MS PIPE (SHIELD)",
    "category": "fire-protection-system",
    "subcategory": "pipes-fittings-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "MS PIPE (SHIELD) (as listed by source).",
    "description": "MS PIPE (SHIELD) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/ms-pipe-shield.jpg",
    "availability": "inquiry-required",
    "features": [
      "MS PIPE (SHIELD)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "ms",
      "pipe",
      "shield"
    ]
  },
  {
    "id": "ptel-threaded-fittings",
    "slug": "threaded-fittings",
    "name": "THREADED FITTINGS",
    "category": "fire-protection-system",
    "subcategory": "pipes-fittings-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "THREADED FITTINGS (as listed by source).",
    "description": "THREADED FITTINGS as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/threaded-fittings.png",
    "availability": "inquiry-required",
    "features": [
      "THREADED FITTINGS"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "threaded",
      "fittings"
    ]
  },
  {
    "id": "ptel-grooved-fittings",
    "slug": "grooved-fittings",
    "name": "GROOVED FITTINGS",
    "category": "fire-protection-system",
    "subcategory": "pipes-fittings-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "GROOVED FITTINGS (as listed by source).",
    "description": "GROOVED FITTINGS as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/grooved-fittings.jpg",
    "availability": "inquiry-required",
    "features": [
      "GROOVED FITTINGS"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "grooved",
      "fittings"
    ]
  },
  {
    "id": "ptel-welded-fittings-flanges",
    "slug": "welded-fittings-flanges",
    "name": "WELDED FITTINGS & FLANGES",
    "category": "fire-protection-system",
    "subcategory": "pipes-fittings-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "WELDED FITTINGS & FLANGES (as listed by source).",
    "description": "WELDED FITTINGS & FLANGES as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/welded-fittings-flanges.jpg",
    "availability": "inquiry-required",
    "features": [
      "WELDED FITTINGS & FLANGES"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "welded",
      "fittings",
      "flanges"
    ]
  },
  {
    "id": "ptel-pipe-support-accessories",
    "slug": "pipe-support-accessories",
    "name": "PIPE SUPPORT & ACCESSORIES",
    "category": "fire-protection-system",
    "subcategory": "pipes-fittings-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "PIPE SUPPORT & ACCESSORIES (as listed by source).",
    "description": "PIPE SUPPORT & ACCESSORIES as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/pipe-support-accessories.png",
    "availability": "inquiry-required",
    "features": [
      "PIPE SUPPORT & ACCESSORIES"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "pipe",
      "support",
      "accessories"
    ]
  },
  {
    "id": "ptel-flexible-expansion-joints",
    "slug": "flexible-expansion-joints",
    "name": "FLEXIBLE EXPANSION JOINTS",
    "category": "fire-protection-system",
    "subcategory": "pipes-fittings-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "FLEXIBLE EXPANSION JOINTS (as listed by source).",
    "description": "FLEXIBLE EXPANSION JOINTS as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/flexible-expansion-joints.png",
    "availability": "inquiry-required",
    "features": [
      "FLEXIBLE EXPANSION JOINTS"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "flexible",
      "expansion",
      "joints"
    ]
  },
  {
    "id": "ptel-sprinkler-drop",
    "slug": "sprinkler-drop",
    "name": "SPRINKLER DROP",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "SPRINKLER DROP (as listed by source).",
    "description": "SPRINKLER DROP as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sprinkler-drop.png",
    "availability": "inquiry-required",
    "features": [
      "SPRINKLER DROP"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "sprinkler",
      "drop"
    ]
  },
  {
    "id": "ptel-fm200",
    "slug": "fm200",
    "name": "FM200",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "FM200 (as listed by source).",
    "description": "FM200 as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/fm200.jpg",
    "availability": "inquiry-required",
    "features": [
      "FM200"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "fm200"
    ]
  },
  {
    "id": "ptel-novec1230",
    "slug": "novec1230",
    "name": "NOVEC1230",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "NOVEC1230 (as listed by source).",
    "description": "NOVEC1230 as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/novec1230.png",
    "availability": "inquiry-required",
    "features": [
      "NOVEC1230"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "novec1230"
    ]
  },
  {
    "id": "ptel-inert-gas",
    "slug": "inert-gas",
    "name": "INERT GAS",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "INERT GAS (as listed by source).",
    "description": "INERT GAS as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/inert-gas.jpg",
    "availability": "inquiry-required",
    "features": [
      "INERT GAS"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "inert",
      "gas"
    ]
  },
  {
    "id": "ptel-foam-suppression-system",
    "slug": "foam-suppression-system",
    "name": "FOAM SUPPRESSION SYSTEM",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "FOAM SUPPRESSION SYSTEM (as listed by source).",
    "description": "FOAM SUPPRESSION SYSTEM as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/foam-suppression-system.png",
    "availability": "inquiry-required",
    "features": [
      "FOAM SUPPRESSION SYSTEM"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "foam",
      "suppression",
      "system"
    ]
  },
  {
    "id": "ptel-powder-based-ext",
    "slug": "powder-based-ext",
    "name": "POWDER BASED EXT.",
    "category": "fire-protection-system",
    "subcategory": "fire-extinguishers",
    "brand": "",
    "model": "",
    "shortDescription": "POWDER BASED EXT. (as listed by source).",
    "description": "POWDER BASED EXT. as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/powder-based-ext.png",
    "availability": "inquiry-required",
    "features": [
      "POWDER BASED EXT."
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "powder",
      "based",
      "ext"
    ]
  },
  {
    "id": "ptel-wet-chemical-fire-suppression",
    "slug": "wet-chemical-fire-suppression",
    "name": "WET CHEMICAL FIRE SUPPRESSION",
    "category": "fire-protection-system",
    "subcategory": "fire-suppression-systems",
    "brand": "",
    "model": "",
    "shortDescription": "WET CHEMICAL FIRE SUPPRESSION (as listed by source).",
    "description": "WET CHEMICAL FIRE SUPPRESSION as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/wet-chemical-fire-suppression.jpg",
    "availability": "inquiry-required",
    "features": [
      "WET CHEMICAL FIRE SUPPRESSION"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "wet",
      "chemical",
      "fire",
      "suppression"
    ]
  },
  {
    "id": "ptel-kf-56-upright-pendent-recessed-pendent",
    "slug": "kf-56-upright-pendent-recessed-pendent",
    "name": "KF 5.6 - UPRIGHT, PENDENT & RECESSED PENDENT",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "KF 5.6 - UPRIGHT, PENDENT & RECESSED PENDENT (as listed by source).",
    "description": "KF 5.6 - UPRIGHT, PENDENT & RECESSED PENDENT as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/kf-56-upright-pendent-recessed-pendent.jpg",
    "availability": "inquiry-required",
    "features": [
      "KF 5.6 - UPRIGHT, PENDENT & RECESSED PENDENT"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "kf",
      "5",
      "6",
      "upright",
      "pendent",
      "recessed",
      "pendent"
    ]
  },
  {
    "id": "ptel-kf-8-upright-pendent-recessed-pendent",
    "slug": "kf-8-upright-pendent-recessed-pendent",
    "name": "KF 8 - UPRIGHT, PENDENT & RECESSED PENDENT",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "KF 8 - UPRIGHT, PENDENT & RECESSED PENDENT (as listed by source).",
    "description": "KF 8 - UPRIGHT, PENDENT & RECESSED PENDENT as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/kf-8-upright-pendent-recessed-pendent.jpg",
    "availability": "inquiry-required",
    "features": [
      "KF 8 - UPRIGHT, PENDENT & RECESSED PENDENT"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "kf",
      "8",
      "upright",
      "pendent",
      "recessed",
      "pendent"
    ]
  },
  {
    "id": "ptel-quick-response-sprinklers",
    "slug": "quick-response-sprinklers",
    "name": "QUICK RESPONSE SPRINKLERS",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "QUICK RESPONSE SPRINKLERS (as listed by source).",
    "description": "QUICK RESPONSE SPRINKLERS as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/quick-response-sprinklers.jpg",
    "availability": "inquiry-required",
    "features": [
      "QUICK RESPONSE SPRINKLERS"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "quick",
      "response",
      "sprinklers"
    ]
  },
  {
    "id": "ptel-sidewall-sprinkler-kf-56",
    "slug": "sidewall-sprinkler-kf-56",
    "name": "SIDEWALL SPRINKLER (KF 5.6)",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "SIDEWALL SPRINKLER (KF 5.6) (as listed by source).",
    "description": "SIDEWALL SPRINKLER (KF 5.6) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sidewall-sprinkler-kf-56.jpg",
    "availability": "inquiry-required",
    "features": [
      "SIDEWALL SPRINKLER (KF 5.6)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "sidewall",
      "sprinkler",
      "kf",
      "5",
      "6"
    ]
  },
  {
    "id": "ptel-sidewall-sprinkler-kf-8",
    "slug": "sidewall-sprinkler-kf-8",
    "name": "SIDEWALL SPRINKLER (KF 8)",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "SIDEWALL SPRINKLER (KF 8) (as listed by source).",
    "description": "SIDEWALL SPRINKLER (KF 8) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sidewall-sprinkler-kf-8.jpg",
    "availability": "inquiry-required",
    "features": [
      "SIDEWALL SPRINKLER (KF 8)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "sidewall",
      "sprinkler",
      "kf",
      "8"
    ]
  },
  {
    "id": "ptel-sidewall-sprinkler-extended-coverage",
    "slug": "sidewall-sprinkler-extended-coverage",
    "name": "SIDEWALL SPRINKLER EXTENDED COVERAGE",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "SIDEWALL SPRINKLER EXTENDED COVERAGE (as listed by source).",
    "description": "SIDEWALL SPRINKLER EXTENDED COVERAGE as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sidewall-sprinkler-extended-coverage.jpg",
    "availability": "inquiry-required",
    "features": [
      "SIDEWALL SPRINKLER EXTENDED COVERAGE"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "sidewall",
      "sprinkler",
      "extended",
      "coverage"
    ]
  },
  {
    "id": "ptel-vertical-sidewall-sprinkler",
    "slug": "vertical-sidewall-sprinkler",
    "name": "VERTICAL SIDEWALL SPRINKLER",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "VERTICAL SIDEWALL SPRINKLER (as listed by source).",
    "description": "VERTICAL SIDEWALL SPRINKLER as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/vertical-sidewall-sprinkler.jpg",
    "availability": "inquiry-required",
    "features": [
      "VERTICAL SIDEWALL SPRINKLER"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "vertical",
      "sidewall",
      "sprinkler"
    ]
  },
  {
    "id": "ptel-concealed-sprinkler",
    "slug": "concealed-sprinkler",
    "name": "CONCEALED SPRINKLER",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "CONCEALED SPRINKLER (as listed by source).",
    "description": "CONCEALED SPRINKLER as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/concealed-sprinkler.jpg",
    "availability": "inquiry-required",
    "features": [
      "CONCEALED SPRINKLER"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "concealed",
      "sprinkler"
    ]
  },
  {
    "id": "ptel-flat-spray-sprinkler",
    "slug": "flat-spray-sprinkler",
    "name": "FLAT SPRAY SPRINKLER",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "FLAT SPRAY SPRINKLER (as listed by source).",
    "description": "FLAT SPRAY SPRINKLER as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/flat-spray-sprinkler.jpg",
    "availability": "inquiry-required",
    "features": [
      "FLAT SPRAY SPRINKLER"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "flat",
      "spray",
      "sprinkler"
    ]
  },
  {
    "id": "ptel-elo-spray-sprinkler",
    "slug": "elo-spray-sprinkler",
    "name": "ELO-SPRAY SPRINKLER",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "SD-5160 / SD-5165 (as listed)",
    "shortDescription": "ELO upright spray sprinkler, brass finish, K-160 (confirm temperature rating).",
    "description": "ELO-SPRAY SPRINKLER as listed by source (PTEL). Source page shows ELO upright style, brass finish, K-factor 160, nominal thread size 3/4\" (20 mm), minimum operation pressure 7 PSI (48 kPa), and temperature ratings 68°C and 79°C for models SD-5160 / SD-5165. Confirm exact model, response, approvals, and project suitability. (Source: ptel.com.bd/product/elo-spray-sprinkler)",
    "image": "https://ptel.com.bd/storage/product/elo-spray-sprinkler.jpg",
    "availability": "inquiry-required",
    "features": [
      "ELO upright style (as listed by source)",
      "Brass finish (as listed by source)",
      "K-factor K-160 (as listed by source)",
      "Standard response shown on source page — confirm listing details"
    ],
    "specifications": [
      { "label": "Model", "value": "SD-5160, SD-5165 (as listed)" },
      { "label": "Style", "value": "ELO Upright" },
      { "label": "Finish", "value": "Brass" },
      { "label": "K factor", "value": "K-160" },
      { "label": "Temperature rating", "value": "68°C and 79°C (as listed)" },
      { "label": "Nominal thread size", "value": "3/4\" NPT (20 mm)" },
      { "label": "Min. operation pressure", "value": "7 PSI (48 kPa)" }
    ],
    "applications": [
      "Fire sprinkler systems (project-specific)",
      "Spray sprinkler applications — confirm coverage/listing per design"
    ],
    "keywords": [
      "elo spray sprinkler",
      "SD-5160",
      "SD-5165",
      "K160",
      "upright sprinkler"
    ]
  },
  {
    "id": "ptel-elo-spray-sprinkler-k115",
    "slug": "elo-spray-sprinkler-k115",
    "name": "ELO-SPRAY SPRINKLER- K115",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "SD-5115 / SD-5125, K-115 (as listed)",
    "shortDescription": "ELO upright spray sprinkler, brass finish, K-115 (confirm temperature rating).",
    "description": "ELO-SPRAY SPRINKLER K115 as listed by source (PTEL). Source page shows upright style, brass finish, K-factor 115, nominal thread size 1/2\" NPT (15 mm), minimum operation pressure 7 PSI (48 kPa), and temperature ratings 68°C and 79°C for models SD-5115 / SD-5125. Confirm exact model, response, approvals, and project suitability. (Source: ptel.com.bd/product/elo-spray-sprinkler-k115)",
    "image": "https://ptel.com.bd/storage/product/elo-spray-sprinkler-k115.jpg",
    "availability": "inquiry-required",
    "features": [
      "Upright style (as listed by source)",
      "Brass finish (as listed by source)",
      "K-factor K-115 (as listed by source)",
      "Standard response shown on source page — confirm listing details"
    ],
    "specifications": [
      { "label": "Model", "value": "SD-5115, SD-5125 (as listed)" },
      { "label": "Style", "value": "Upright" },
      { "label": "Finish", "value": "Brass" },
      { "label": "K factor", "value": "K-115" },
      { "label": "Temperature rating", "value": "68°C and 79°C (as listed)" },
      { "label": "Nominal thread size", "value": "1/2\" NPT (15 mm)" },
      { "label": "Min. operation pressure", "value": "7 PSI (48 kPa)" }
    ],
    "applications": [
      "Fire sprinkler systems (project-specific)",
      "Spray sprinkler applications — confirm coverage/listing per design"
    ],
    "keywords": [
      "elo spray sprinkler",
      "K115",
      "SD-5115",
      "SD-5125",
      "upright sprinkler"
    ]
  },
  {
    "id": "ptel-sprinkler-cover-plate-recessed",
    "slug": "sprinkler-cover-plate-recessed",
    "name": "SPRINKLER COVER PLATE RECESSED",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "SPRINKLER COVER PLATE RECESSED (as listed by source).",
    "description": "SPRINKLER COVER PLATE RECESSED as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/sprinkler-cover-plate-recessed.jpg",
    "availability": "inquiry-required",
    "features": [
      "SPRINKLER COVER PLATE RECESSED"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "sprinkler",
      "cover",
      "plate",
      "recessed"
    ]
  },
  {
    "id": "ptel-k-factor-112gxlo-series",
    "slug": "k-factor-112gxlo-series",
    "name": "K FACTOR 11.2(GXLO Series)",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "K FACTOR 11.2(GXLO Series) (as listed by source).",
    "description": "K FACTOR 11.2(GXLO Series) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/k-factor-112gxlo-series.png",
    "availability": "inquiry-required",
    "features": [
      "K FACTOR 11.2(GXLO Series)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "k",
      "factor",
      "11",
      "2",
      "gxlo",
      "series"
    ]
  },
  {
    "id": "ptel-conventional-sprinkler",
    "slug": "conventional-sprinkler",
    "name": "CONVENTIONAL SPRINKLER",
    "category": "fire-protection-system",
    "subcategory": "fire-sprinkler-systems",
    "brand": "",
    "model": "",
    "shortDescription": "CONVENTIONAL SPRINKLER (as listed by source).",
    "description": "CONVENTIONAL SPRINKLER as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/conventional-sprinkler.jpg",
    "availability": "inquiry-required",
    "features": [
      "CONVENTIONAL SPRINKLER"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "conventional",
      "sprinkler"
    ]
  },
  {
    "id": "ptel-y-strainer",
    "slug": "y-strainer",
    "name": "Y-STRAINER",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Y-STRAINER (as listed by source).",
    "description": "Y-STRAINER as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/y-strainer.png",
    "availability": "inquiry-required",
    "features": [
      "Y-STRAINER"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "y",
      "strainer"
    ]
  },
  {
    "id": "ptel-os-y-gate-valve",
    "slug": "os-y-gate-valve",
    "name": "OS & Y GATE VALVE",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "OS & Y GATE VALVE (as listed by source).",
    "description": "OS & Y GATE VALVE as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/os-y-gate-valve.png",
    "availability": "inquiry-required",
    "features": [
      "OS & Y GATE VALVE"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "os",
      "y",
      "gate",
      "valve"
    ]
  },
  {
    "id": "ptel-check-valve-nrv",
    "slug": "check-valve-nrv",
    "name": "Check Valve (NRV)",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Check Valve (NRV) (as listed by source).",
    "description": "Check Valve (NRV) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/check-valve-nrv.png",
    "availability": "inquiry-required",
    "features": [
      "Check Valve (NRV)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "check",
      "valve",
      "nrv"
    ]
  },
  {
    "id": "ptel-flexible-rubber-expansion-joint",
    "slug": "flexible-rubber-expansion-joint",
    "name": "Flexible Rubber Expansion Joint",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Flexible Rubber Expansion Joint (as listed by source).",
    "description": "Flexible Rubber Expansion Joint as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/flexible-rubber-expansion-joint.png",
    "availability": "inquiry-required",
    "features": [
      "Flexible Rubber Expansion Joint"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "flexible",
      "rubber",
      "expansion",
      "joint"
    ]
  },
  {
    "id": "ptel-waste-cone",
    "slug": "waste-cone",
    "name": "Waste Cone",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Waste Cone (as listed by source).",
    "description": "Waste Cone as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/waste-cone.jpg",
    "availability": "inquiry-required",
    "features": [
      "Waste Cone"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "waste",
      "cone"
    ]
  },
  {
    "id": "ptel-pressure-relief-valve",
    "slug": "pressure-relief-valve",
    "name": "Pressure Relief Valve",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Pressure Relief Valve (as listed by source).",
    "description": "Pressure Relief Valve as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/prv-pressure-relief-valve.jpg",
    "availability": "inquiry-required",
    "features": [
      "Pressure Relief Valve"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "pressure",
      "relief",
      "valve"
    ]
  },
  {
    "id": "ptel-flow-meter",
    "slug": "flow-meter",
    "name": "Flow Meter",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Flow Meter (as listed by source).",
    "description": "Flow Meter as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/flow-meter.jpg",
    "availability": "inquiry-required",
    "features": [
      "Flow Meter"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "flow",
      "meter"
    ]
  },
  {
    "id": "ptel-tamper-supervisory-switch",
    "slug": "tamper-supervisory-switch",
    "name": "Tamper Supervisory Switch",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Tamper Supervisory Switch (as listed by source).",
    "description": "Tamper Supervisory Switch as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/tamper-supervisory-switch.jpg",
    "availability": "inquiry-required",
    "features": [
      "Tamper Supervisory Switch"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "tamper",
      "supervisory",
      "switch"
    ]
  },
  {
    "id": "ptel-water-flow-switch",
    "slug": "water-flow-switch",
    "name": "Water Flow Switch",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Water Flow Switch (as listed by source).",
    "description": "Water Flow Switch as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/water-flow-switch.jpg",
    "availability": "inquiry-required",
    "features": [
      "Water Flow Switch"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "water",
      "flow",
      "switch"
    ]
  },
  {
    "id": "ptel-zone-control-valve",
    "slug": "zone-control-valve",
    "name": "ZONE CONTROL VALVE",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "ZONE CONTROL VALVE (as listed by source).",
    "description": "ZONE CONTROL VALVE as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/zone-control-valve.jpg",
    "availability": "inquiry-required",
    "features": [
      "ZONE CONTROL VALVE"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "zone",
      "control",
      "valve"
    ]
  },
  {
    "id": "ptel-alarm-check-valve-assembly",
    "slug": "alarm-check-valve-assembly",
    "name": "ALARM CHECK VALVE ASSEMBLY",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "ALARM CHECK VALVE ASSEMBLY (as listed by source).",
    "description": "ALARM CHECK VALVE ASSEMBLY as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/alarm-check-valve-assembly.jpg",
    "availability": "inquiry-required",
    "features": [
      "ALARM CHECK VALVE ASSEMBLY"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "alarm",
      "check",
      "valve",
      "assembly"
    ]
  },
  {
    "id": "ptel-pressure-gauge",
    "slug": "pressure-gauge",
    "name": "Pressure Gauge",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Pressure Gauge (as listed by source).",
    "description": "Pressure Gauge as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/pressure-gauge.png",
    "availability": "inquiry-required",
    "features": [
      "Pressure Gauge"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "pressure",
      "gauge"
    ]
  },
  {
    "id": "ptel-auto-air-vent",
    "slug": "auto-air-vent",
    "name": "Auto Air Vent",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Auto Air Vent (as listed by source).",
    "description": "Auto Air Vent as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/auto-air-vent.png",
    "availability": "inquiry-required",
    "features": [
      "Auto Air Vent"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "auto",
      "air",
      "vent"
    ]
  },
  {
    "id": "ptel-ball-valve",
    "slug": "ball-valve",
    "name": "Ball Valve",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Ball Valve (as listed by source).",
    "description": "Ball Valve as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/ball-valve.png",
    "availability": "inquiry-required",
    "features": [
      "Ball Valve"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "ball",
      "valve"
    ]
  },
  {
    "id": "ptel-landing-valve",
    "slug": "landing-valve",
    "name": "Landing Valve",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Landing Valve (as listed by source).",
    "description": "Landing Valve as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/landing-valve.jpg",
    "availability": "inquiry-required",
    "features": [
      "Landing Valve"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "landing",
      "valve"
    ]
  },
  {
    "id": "ptel-hose-pipe-assembly",
    "slug": "hose-pipe-assembly",
    "name": "Hose Pipe Assembly",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Hose Pipe Assembly (as listed by source).",
    "description": "Hose Pipe Assembly as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/hose-pipe-assembly-40-mm.jpg",
    "availability": "inquiry-required",
    "features": [
      "Hose Pipe Assembly"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "hose",
      "pipe",
      "assembly"
    ]
  },
  {
    "id": "ptel-fire-hose-cabinet",
    "slug": "fire-hose-cabinet",
    "name": "Fire Hose Cabinet",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "Fire Hose Cabinet (as listed by source).",
    "description": "Fire Hose Cabinet as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/fire-hose-cabinet.jpg",
    "availability": "inquiry-required",
    "features": [
      "Fire Hose Cabinet"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "fire",
      "hose",
      "cabinet"
    ]
  },
  {
    "id": "ptel-2-way-breaching-inlet-fire-brigade-connection",
    "slug": "2-way-breaching-inlet-fire-brigade-connection",
    "name": "2 WAY BREACHING INLET (FIRE BRIGADE CONNECTION)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "2 WAY BREACHING INLET (FIRE BRIGADE CONNECTION) (as listed by source).",
    "description": "2 WAY BREACHING INLET (FIRE BRIGADE CONNECTION) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/2-way-breaching-inlet-fire-brigade-connection.png",
    "availability": "inquiry-required",
    "features": [
      "2 WAY BREACHING INLET (FIRE BRIGADE CONNECTION)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "2",
      "way",
      "breaching",
      "inlet",
      "fire",
      "brigade",
      "connection"
    ]
  },
  {
    "id": "ptel-4-way-breaching-inlet",
    "slug": "4-way-breaching-inlet",
    "name": "4 WAY BREACHING INLET",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "4 WAY BREACHING INLET (as listed by source).",
    "description": "4 WAY BREACHING INLET as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/4-way-breaching-inlet.png",
    "availability": "inquiry-required",
    "features": [
      "4 WAY BREACHING INLET"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "4",
      "way",
      "breaching",
      "inlet"
    ]
  },
  {
    "id": "ptel-pillar-hydrant-wet-type",
    "slug": "pillar-hydrant-wet-type",
    "name": "PILLAR HYDRANT (WET TYPE)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "PILLAR HYDRANT (WET TYPE) (as listed by source).",
    "description": "PILLAR HYDRANT (WET TYPE) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/pillar-hydrant-wet-type.jpg",
    "availability": "inquiry-required",
    "features": [
      "PILLAR HYDRANT (WET TYPE)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "pillar",
      "hydrant",
      "wet",
      "type"
    ]
  },
  {
    "id": "ptel-hose-pipe-assembly-65mm",
    "slug": "hose-pipe-assembly-65mm",
    "name": "HOSE PIPE ASSEMBLY (65MM)",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "HOSE PIPE ASSEMBLY (65MM) (as listed by source).",
    "description": "HOSE PIPE ASSEMBLY (65MM) as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/hose-pipe-assembly-65mm.png",
    "availability": "inquiry-required",
    "features": [
      "HOSE PIPE ASSEMBLY (65MM)"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "hose",
      "pipe",
      "assembly",
      "65mm"
    ]
  },
  {
    "id": "ptel-self-standing-hose-cabinet",
    "slug": "self-standing-hose-cabinet",
    "name": "SELF STANDING HOSE CABINET",
    "category": "fire-protection-system",
    "subcategory": "fire-hydrant-accessories",
    "brand": "",
    "model": "",
    "shortDescription": "SELF STANDING HOSE CABINET (as listed by source).",
    "description": "SELF STANDING HOSE CABINET as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/self-standing-hose-cabinet.jpg",
    "availability": "inquiry-required",
    "features": [
      "SELF STANDING HOSE CABINET"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "self",
      "standing",
      "hose",
      "cabinet"
    ]
  },
  {
    "id": "ptel-pressure-switch",
    "slug": "pressure-switch",
    "name": "PRESSURE SWITCH",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "PRESSURE SWITCH (as listed by source).",
    "description": "PRESSURE SWITCH as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/pressure-switch.jpg",
    "availability": "inquiry-required",
    "features": [
      "PRESSURE SWITCH"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "pressure",
      "switch"
    ]
  },
  {
    "id": "ptel-diesel-engine",
    "slug": "diesel-engine",
    "name": "Diesel Engine",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Diesel Engine (as listed by source).",
    "description": "Diesel Engine as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/diesel-engine.png",
    "availability": "inquiry-required",
    "features": [
      "Diesel Engine"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "diesel",
      "engine"
    ]
  },
  {
    "id": "ptel-electrical-motor",
    "slug": "electrical-motor",
    "name": "Electrical Motor",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Electrical motor for fire pump applications (confirm HP, voltage, and speed).",
    "description": "Electrical Motor for fire pump applications as listed by source (PTEL). The source states reliable, NFPA-compliant fire pump motors with 50/60 Hz options, 1.15 service factor, 50°C ambient rating, IP55 protection, and UL file reference as shown on the source page. Confirm exact frame, output, voltage, speed, mounting, and certification for the pump package per project. (Source: ptel.com.bd/product/electrical-motor)",
    "image": "https://ptel.com.bd/storage/product/electrical-motor.jpg",
    "availability": "inquiry-required",
    "features": [
      "50 & 60 Hz (as listed by source)",
      "1.15 service factor (as listed by source)",
      "50°C ambient temperature rating (as listed by source)",
      "IP55 degree of protection (as listed by source)",
      "UL file reference shown on source page — confirm exact certification"
    ],
    "specifications": [
      { "label": "Rated output (source range)", "value": "10 HP – 500 HP (as listed; confirm selection)" },
      { "label": "Frequency", "value": "50 & 60 Hz (as listed)" },
      { "label": "Example voltages", "value": "380–415 V (50 Hz) / 208–575 V options shown (60 Hz) — confirm per project" },
      { "label": "Example speeds", "value": "2923–2980 RPM (50 Hz) & 3506–3575 RPM (60 Hz) shown for one range; 1460–1780 RPM range also shown — confirm" }
    ],
    "applications": [
      "Fire pump motor drive (project-specific)",
      "Industrial and commercial fire protection pump packages"
    ],
    "keywords": [
      "electrical motor",
      "fire pump motor",
      "NFPA",
      "IP55"
    ]
  },
  {
    "id": "ptel-diesel-fire-pump-controllers",
    "slug": "diesel-fire-pump-controllers",
    "name": "Diesel Fire Pump Controllers",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Diesel Fire Pump Controllers (as listed by source).",
    "description": "Diesel Fire Pump Controllers as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/diesel-fire-pump-controllers.jpg",
    "availability": "inquiry-required",
    "features": [
      "Diesel Fire Pump Controllers"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "diesel",
      "fire",
      "pump",
      "controllers"
    ]
  },
  {
    "id": "ptel-auto-air-vent-second",
    "slug": "auto-air-vent-second",
    "name": "AUTO AIR VENT Second",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "AUTO AIR VENT Second (as listed by source).",
    "description": "AUTO AIR VENT Second as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/auto-air-vent-second.png",
    "availability": "inquiry-required",
    "features": [
      "AUTO AIR VENT Second"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "auto",
      "air",
      "vent",
      "second"
    ]
  },
  {
    "id": "ptel-electric-fire-pump-controllers",
    "slug": "electric-fire-pump-controllers",
    "name": "Electric Fire Pump Controllers",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "NFY-DOM1 (as listed)",
    "shortDescription": "NFPA-compliant electric fire pump controllers (select by HP/voltage per project).",
    "description": "Electric Fire Pump Controllers as listed by source (PTEL). The source states NFPA-compliant controllers for industrial and commercial fire safety systems and shows NFY-DOM1 Direct On Line ratings by motor power, voltage, frequency, and circuit rating. Confirm exact controller type, enclosure, approvals, and pump package requirements per project. (Source: ptel.com.bd/product/electric-fire-pump-controllers)",
    "image": "https://ptel.com.bd/storage/product/electric-fire-pump-controllers.jpg",
    "availability": "inquiry-required",
    "features": [
      "NFPA-compliant (as stated by source)",
      "NFY-DOM1 Direct On Line type shown by source",
      "Industrial and commercial fire safety application (as stated by source)"
    ],
    "specifications": [
      { "label": "Source type", "value": "NFY-DOM1 - Direct On Line (as listed)" },
      { "label": "Rated voltage", "value": "380–415 V (as listed)" },
      { "label": "Frequency", "value": "50 / 60 Hz (as listed)" },
      { "label": "Example ratings (source table)", "value": "15 HP / 27 A / 100 kA; 20 HP / 34 A / 100 kA; 25 HP / 44 A / 100 kA; 30 HP / 51 A / 100 kA; 40 HP / 66 A / 100 kA; 50 HP / 83 A / 100 kA; 75 HP / 128 A / 100 kA; 100 HP / 165 A / 100 kA — confirm exact selection" }
    ],
    "applications": [
      "Electric fire pump control (project-specific)",
      "Industrial and commercial fire protection systems"
    ],
    "keywords": [
      "electric",
      "fire pump",
      "controller",
      "NFPA",
      "NFY-DOM1"
    ]
  },
  {
    "id": "ptel-jockey-pump-controllers",
    "slug": "jockey-pump-controllers",
    "name": "Jockey Pump Controllers",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Jockey Pump Controllers (as listed by source).",
    "description": "Jockey Pump Controllers as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/jockey-pump-controllers.jpg",
    "availability": "inquiry-required",
    "features": [
      "Jockey Pump Controllers"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "jockey",
      "pump",
      "controllers"
    ]
  },
  {
    "id": "ptel-fuel-tank",
    "slug": "fuel-tank",
    "name": "FUEL TANK",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "FUEL TANK (as listed by source).",
    "description": "FUEL TANK as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/fuel-tank.jpg",
    "availability": "inquiry-required",
    "features": [
      "FUEL TANK"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "fuel",
      "tank"
    ]
  },
  {
    "id": "ptel-pressure-reducing-valve",
    "slug": "pressure-reducing-valve",
    "name": "Pressure Reducing Valve",
    "category": "fire-protection-system",
    "subcategory": "fire-protection-valves",
    "brand": "",
    "model": "",
    "shortDescription": "Pressure Reducing Valve (as listed by source).",
    "description": "Pressure Reducing Valve as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/pressure-reducing-valve.jpg",
    "availability": "inquiry-required",
    "features": [
      "Pressure Reducing Valve"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "pressure",
      "reducing",
      "valve"
    ]
  },
  {
    "id": "ptel-casing-relief-valve",
    "slug": "casing-relief-valve",
    "name": "Casing Relief Valve",
    "category": "fire-protection-system",
    "subcategory": "fire-fighting-pumps",
    "brand": "",
    "model": "",
    "shortDescription": "Casing Relief Valve (as listed by source).",
    "description": "Casing Relief Valve as listed by source (ptel.com.bd fire protection category). Confirm specifications, ratings, approvals, and suitability per project.",
    "image": "https://ptel.com.bd/storage/product/casing-relief-valve.jpg",
    "availability": "inquiry-required",
    "features": [
      "Casing Relief Valve"
    ],
    "applications": [
      "Fire protection systems (project-specific)"
    ],
    "keywords": [
      "casing",
      "relief",
      "valve"
    ]
  }
,
  // ---- Siemens / Cerberus PRO (source: ARC Group arcgroup-bd.com, factual listing) ----
  {
    "id": "arc-siemens-ooh941-fdoot441-multi-sensor-detector",
    "slug": "siemens-ooh941-fdoot441-multi-sensor-detector",
    "name": "Multi-Sensor Detector",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Siemens",
    "model": "OOH941 / FDOOT441",
    "shortDescription": "Siemens addressable multi-sensor detector listed by ARC Group for fire detection systems.",
    "description": "Siemens multi-sensor detector (model OOH941 / FDOOT441) as listed by ARC Group. Source page describes a two-wire, addressable multi-purpose detector with smoke-and-heat detection and built-in ISOtechnology features. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1785534466432990.webp",
    "availability": "inquiry-required",
    "features": [
      "Addressable multi-sensor detector",
      "Model OOH941 / FDOOT441"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-oh921-fdot421-multi-criteria-detector",
    "slug": "siemens-oh921-fdot421-multi-criteria-detector",
    "name": "Multi Criteria Detector",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Siemens",
    "model": "OH921 / FDOT421",
    "shortDescription": "Siemens addressable multi-criteria detector listed by ARC Group.",
    "description": "Siemens multi-criteria detector (model OH921 / FDOT421) as listed by ARC Group. Source page describes an intelligent, addressable detector incorporating optical and thermal sensors. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786893419788762.jpg",
    "availability": "inquiry-required",
    "features": [
      "Addressable multi-criteria detector",
      "Model OH921 / FDOT421"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-op921-fdo421-smoke-detector",
    "slug": "siemens-op921-fdo421-smoke-detector",
    "name": "Smoke Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "Siemens",
    "model": "OP921 / FDO421",
    "shortDescription": "Siemens photoelectric smoke detector listed by ARC Group.",
    "description": "Siemens smoke detector (model OP921 / FDO421) as listed by ARC Group. Source page describes a wide-spectrum, photoelectric smoke detector. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1785534819479958.jpg",
    "availability": "inquiry-required",
    "features": [
      "Photoelectric smoke detector",
      "Model OP921 / FDO421"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-hi921-fdt421-thermal-heat-detector",
    "slug": "siemens-hi921-fdt421-thermal-heat-detector",
    "name": "Thermal (Heat) Detector",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "Siemens",
    "model": "HI921 / FDT421",
    "shortDescription": "Siemens intelligent thermal (heat) detector listed by ARC Group.",
    "description": "Siemens thermal (heat) detector (model HI921 / FDT421) as listed by ARC Group. Source page describes an intelligent thermal detector with configurable temperature settings. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786074118493793.jpg",
    "availability": "inquiry-required",
    "features": [
      "Intelligent thermal/heat detector",
      "Model HI921 / FDT421"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-xms-s-manual-pull-station",
    "slug": "siemens-xms-s-manual-pull-station",
    "name": "Manual Pull Stations",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Siemens",
    "model": "XMS-S",
    "shortDescription": "Siemens XMS-S addressable manual pull station listed by ARC Group.",
    "description": "Siemens manual pull station (model XMS-S) as listed by ARC Group. Source page describes a single-action, addressable pull station for fire alarm systems. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786074459781214.jpg",
    "availability": "inquiry-required",
    "features": [
      "Addressable manual pull station",
      "Model XMS-S"
    ],
    "applications": [
      "Fire alarm manual initiation"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-xtri-r-interface-module",
    "slug": "siemens-xtri-r-interface-module",
    "name": "Interface Module",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Siemens",
    "model": "XTRI-R",
    "shortDescription": "Siemens XTRI-R intelligent interface module listed by ARC Group.",
    "description": "Siemens interface module (model XTRI-R) as listed by ARC Group. Source page describes an XTRI-series interface module with configurable isolator functionality and relay/contact input capability. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786075233904271.png",
    "availability": "inquiry-required",
    "features": [
      "Intelligent interface module",
      "Model XTRI-R"
    ],
    "applications": [
      "Fire alarm system interface and control"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-xtri-s-interface-module",
    "slug": "siemens-xtri-s-interface-module",
    "name": "Interface Module",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Siemens",
    "model": "XTRI-S",
    "shortDescription": "Siemens XTRI-S interface module listed by ARC Group.",
    "description": "Siemens interface module (model XTRI-S) as listed by ARC Group. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786075443195691.png",
    "availability": "inquiry-required",
    "features": [
      "Interface module",
      "Model XTRI-S"
    ],
    "applications": [
      "Fire alarm system interface and control"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-cerberus-pro-modular",
    "slug": "siemens-cerberus-pro-modular",
    "name": "Cerberus PRO Modular",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Siemens",
    "model": "Cerberus PRO Modular",
    "shortDescription": "Siemens Cerberus PRO Modular fire alarm system listed by ARC Group.",
    "description": "Siemens Cerberus PRO Modular as listed by ARC Group. Source page describes a versatile system for large or complex buildings and campuses. Confirm exact specifications, approvals, capacity, and configuration for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786076077536885.jpg",
    "availability": "inquiry-required",
    "features": [
      "Cerberus PRO Modular fire alarm system"
    ],
    "applications": [
      "Fire detection and alarm control for large or complex facilities"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-cerberus-pro-compact-fc922-fc924",
    "slug": "siemens-cerberus-pro-compact-fc922-fc924",
    "name": "Cerberus PRO Compact",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Siemens",
    "model": "FC922 / FC924",
    "shortDescription": "Siemens Cerberus PRO Compact fire alarm control panel listed by ARC Group.",
    "description": "Siemens Cerberus PRO Compact (models FC922 / FC924) as listed by ARC Group. Source page describes an intelligent, scalable fire alarm control panel for mid-to-large facilities. Confirm exact specifications, approvals, capacity, and configuration for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786076393980760.jpg",
    "availability": "inquiry-required",
    "features": [
      "Cerberus PRO Compact fire alarm control panel",
      "Models FC922 / FC924"
    ],
    "applications": [
      "Fire detection and alarm control for mid-to-large facilities"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-ssd-system-status-display",
    "slug": "siemens-ssd-system-status-display",
    "name": "System-Status Display Series",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Siemens",
    "model": "SSD / SSD-C",
    "shortDescription": "Siemens SSD series system-status display listed by ARC Group.",
    "description": "Siemens System-Status Display Series (models SSD / SSD-C) as listed by ARC Group. Source page describes LEDs/LCD status display for Cerberus PRO Modular system events. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786141418763194.webp",
    "availability": "inquiry-required",
    "features": [
      "System-status display",
      "Models SSD / SSD-C"
    ],
    "applications": [
      "Fire alarm system status indication"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-slhr-n-notification-appliance",
    "slug": "siemens-slhr-n-notification-appliance",
    "name": "Notification Appliances",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Siemens",
    "model": "SLHR-N",
    "shortDescription": "Siemens SL-series notification appliance (horn) listed by ARC Group.",
    "description": "Siemens notification appliance (model SLHR-N) as listed by ARC Group. Source page describes SL-series horn notification appliances. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786142160720864.jpeg",
    "availability": "inquiry-required",
    "features": [
      "Notification appliance (horn)",
      "Model SLHR-N"
    ],
    "applications": [
      "Fire alarm audible notification"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  {
    "id": "arc-siemens-slhswr-f-notification-appliance",
    "slug": "siemens-slhswr-f-notification-appliance",
    "name": "Notification Appliances",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Siemens",
    "model": "SLHSWR-F",
    "shortDescription": "Siemens SL-series notification appliance listed by ARC Group.",
    "description": "Siemens notification appliance (model SLHSWR-F) as listed by ARC Group. Confirm exact specifications, approvals, and compatibility for the project. (Source: arcgroup-bd.com)",
    "image": "https://arcgroup-bd.com/upload/product_page/1786142278697938.jpeg",
    "availability": "inquiry-required",
    "features": [
      "Notification appliance",
      "Model SLHSWR-F"
    ],
    "applications": [
      "Fire alarm notification"
    ],
    "certifications": [],
    "dataSource": "ARC Group (arcgroup-bd.com)"
  },
  // ---- Verified web imports: Hochiki (hochikiamerica.com), Finder (safetag.ae), Simplex (simplex-fire.com). No prices shown. ----
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Multi-criteria smoke/duct detector head",
      "Model ALO-V"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-alo-v-multi-criteria-detector",
    "slug": "hochiki-alo-v-multi-criteria-smoke-duct-detector-head",
    "name": "ALO-V Multi-Criteria Smoke Detector and Duct Detector Head",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Hochiki",
    "model": "ALO-V",
    "shortDescription": "Hochiki ALO-V multi-criteria smoke detector and duct detector head (addressable).",
    "description": "ALO-V Multi-Criteria Smoke Detector and Duct Detector Head as listed by Hochiki America (code shown as 0200-11250 on source page). Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0200-11250-4.jpg?fv=8FCC8F161EB9737EB20106411C79DC48",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Multi-criteria smoke/heat detector head",
      "Model ACE-V"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-ace-v-multi-criteria-detector",
    "slug": "hochiki-ace-v-multi-criteria-smoke-heat-detector-head",
    "name": "ACE-V Multi-Criteria Smoke/Heat Detector Head",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Hochiki",
    "model": "ACE-V",
    "shortDescription": "Hochiki ACE-V multi-criteria smoke/heat detector head (addressable).",
    "description": "ACE-V Multi-Criteria Smoke/Heat Detector Head as listed by Hochiki America (code shown as 0200-11260 on source page). Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0200-11260.jpg?fv=2E874FBA90D69B2A5F00828A70F2B000",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Fixed temperature/rate-of-rise heat sensor",
      "Model ATJ-EA"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-atj-ea-fixed-temp-ror-heat-sensor",
    "slug": "hochiki-atj-ea-fixed-temp-rate-of-rise-heat-sensor",
    "name": "ATJ-EA Fixed Temp/Rate of Rise Heat Sensor",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "Hochiki",
    "model": "ATJ-EA",
    "shortDescription": "Hochiki ATJ-EA fixed temperature/rate-of-rise heat sensor (addressable).",
    "description": "ATJ-EA Fixed Temp/Rate of Rise Heat Sensor as listed by Hochiki America (code shown as 0200-06148 on source page). Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0200-06148.jpg?fv=54CAD99609B518E48D08818A8C7EDC2D",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Analog sounder base",
      "Model ASBL7"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-asbl7-analog-sounder-base",
    "slug": "hochiki-asbl7-analog-sounder-base",
    "name": "ASBL7 Analog Sounder Base, Low Frequency, 24V",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Hochiki",
    "model": "ASBL7",
    "shortDescription": "Hochiki ASBL7 analog sounder base (addressable).",
    "description": "ASBL7 Analog Sounder Base, Low Frequency, 24V as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0300-06840.jpg?fv=CF48F746D86DAE15F6AACEE18C9BDDC8",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Analog sensor base",
      "Model HSB-NSA-67"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-hsb-nsa-67-analog-sensor-base",
    "slug": "hochiki-hsb-nsa-67-analog-sensor-base",
    "name": "HSB-NSA-67 Analog Sensor Base, 6\"",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "HSB-NSA-67",
    "shortDescription": "Hochiki HSB-NSA-67 analog sensor base (addressable).",
    "description": "HSB-NSA-67 Analog Sensor Base, 6\" as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0300-06820.jpg?fv=6C93BC9D0366BA41B7EDC0DF1170C3F1",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Analog sounder base",
      "Model ASB7"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-asb7-analog-sounder-base",
    "slug": "hochiki-asb7-analog-sounder-base",
    "name": "ASB7 Analog Sounder Base, 24V",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Hochiki",
    "model": "ASB7",
    "shortDescription": "Hochiki ASB7 analog sounder base (addressable).",
    "description": "ASB7 Analog Sounder Base, 24V as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0300-06810.jpg?fv=1440BC0BADB1E698CFCC5AA374098109",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Analog sensor base",
      "Model YBN-NSA-47"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-ybn-nsa-47-analog-sensor-base",
    "slug": "hochiki-ybn-nsa-47-analog-sensor-base",
    "name": "YBN-NSA-47 Analog Sensor Base, 4\"",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "YBN-NSA-47",
    "shortDescription": "Hochiki YBN-NSA-47 analog sensor base (addressable).",
    "description": "YBN-NSA-47 Analog Sensor Base, 4\" as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0300-06830.jpg?fv=9BE544C862A708C9193417E0886DE8F6",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Short circuit isolator base",
      "Model SCI-B47"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-sci-b47-short-circuit-isolator-base",
    "slug": "hochiki-sci-b47-short-circuit-isolator-base",
    "name": "SCI-B47 Short Circuit Isolator Base, 4\"",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "SCI-B47",
    "shortDescription": "Hochiki SCI-B47 short circuit isolator base (addressable).",
    "description": "SCI-B47 Short Circuit Isolator Base, 4\" as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0300-06850.jpg?fv=586E940B17F0C9E42F479D748108D6C3",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Short circuit isolator base",
      "Model SCI-B67"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-sci-b67-short-circuit-isolator-base",
    "slug": "hochiki-sci-b67-short-circuit-isolator-base",
    "name": "SCI-B67 Analog Short Circuit Isolator Base, 6\"",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "SCI-B67",
    "shortDescription": "Hochiki SCI-B67 short circuit isolator base (addressable).",
    "description": "SCI-B67 Analog Short Circuit Isolator Base, 6\" as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0300-06860.jpg?fv=1BA9D4BD15308EA7135B7865414F1756",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Sensor base with isolator",
      "Model SCI-B4"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-sci-b4-sensor-base-isolator",
    "slug": "hochiki-sci-b4-sensor-base-isolator",
    "name": "SCI-B4 - 4\" Sensor Base, Bone Color with Isolator",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "SCI-B4",
    "shortDescription": "Hochiki SCI-B4 sensor base with isolator (addressable).",
    "description": "SCI-B4 4\" Sensor Base, Bone Color with Isolator as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0300-04790_1.jpg?fv=436D3323472182D3AD648E1462EF51DF",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable manual pull station",
      "Dual action",
      "Model DCP-AMS-KL-LP"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-dcp-ams-kl-lp-addressable-manual-pull-station",
    "slug": "hochiki-dcp-ams-kl-lp-addressable-manual-pull-station",
    "name": "DCP-AMS-KL-LP Addressable Manual Pull Station, Dual Action, CAT30 Key",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Hochiki",
    "model": "DCP-AMS-KL-LP",
    "shortDescription": "Hochiki addressable dual-action manual pull station.",
    "description": "DCP-AMS-KL-LP Addressable Manual Pull Station, Dual Action, CAT30 Key as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/kl-lp.jpg?fv=D7C6B9C31BA0D7027D696C916AEE416A",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable manual pull station",
      "Single action",
      "Model DCP-AMS"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-dcp-ams-single-action-addressable-manual-pull-station",
    "slug": "hochiki-dcp-ams-single-action-addressable-manual-pull-station",
    "name": "DCP-AMS Single Action Addressable Manual Pull Station",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Hochiki",
    "model": "DCP-AMS",
    "shortDescription": "Hochiki single-action addressable manual pull station.",
    "description": "DCP-AMS Single Action Addressable Manual Pull Station as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0600-01490_1.jpg?fv=464FD64D7465CED0B5B2B4F7A75EF489",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable manual pull station",
      "Key lock",
      "Model DCP-AMS-KL"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-dcp-ams-kl-addressable-manual-pull-station",
    "slug": "hochiki-dcp-ams-kl-addressable-manual-pull-station",
    "name": "DCP-AMS-KL Addressable Manual Pull Station with Key Lock",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Hochiki",
    "model": "DCP-AMS-KL",
    "shortDescription": "Hochiki addressable manual pull station with key lock.",
    "description": "DCP-AMS-KL Addressable Manual Pull Station with Key Lock as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0600-01510_1.jpg?fv=BC8F914C0CFC67C2BCD6020E5BADE5BA",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Backbox for manual pull station",
      "Model HPS-BB"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-hps-bb-backbox-manual-pull-station",
    "slug": "hochiki-hps-bb-backbox-manual-pull-station",
    "name": "HPS-BB Backbox, Red for HPS & AMS Series Manual Pull Station",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Hochiki",
    "model": "HPS-BB",
    "shortDescription": "Hochiki red backbox for HPS & AMS series manual pull stations.",
    "description": "HPS-BB Backbox, Red for HPS & AMS Series Manual Pull Station as listed by Hochiki America. Confirm exact specifications and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0600-01430.jpg?fv=5690BA1C55B3287E21C457DEE3D7A2E1",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable duct detector",
      "Model DH-101-A"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-dh-101-a-duct-detector",
    "slug": "hochiki-dh-101-a-duct-detector",
    "name": "DH-101-A Duct Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "Hochiki",
    "model": "DH-101-A",
    "shortDescription": "Hochiki DH-101-A intelligent addressable duct detector.",
    "description": "DH-101-A Duct Detector as listed by Hochiki America (Intelligent Addressable Duct Detectors). Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-2.azureedge.net/img/product/DH-101-A-B.jpg?fv=CFB33CBDC0C0B6204C0A1F98871FB90A",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Fire alarm control panel family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-firenet-latitude",
    "slug": "hochiki-firenet-latitude-fire-alarm-control-panel",
    "name": "FireNET L@titude",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Hochiki",
    "model": "FireNET L@titude",
    "shortDescription": "Hochiki FireNET L@titude fire alarm control panel family.",
    "description": "FireNET L@titude as listed by Hochiki America. Source page states it is a UL Listed fire alarm panel. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: hochikiamerica.com) No price shown on web.",
    "image": "https://hochikiamerica-1.azureedge.net/img/product/new_red_L@titude.jpg?fv=0EF6A4071556EC3C3B84016BB874C537",
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable manual call point",
      "Model FF CP500"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "finder-ff-cp500-intelligent-addressable-manual-call-point",
    "slug": "finder-ff-cp500-intelligent-addressable-fire-alarm-call-point",
    "name": "Finder FF CP500 Intelligent Addressable Fire Alarm Call Point",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Finder",
    "model": "FF CP500",
    "shortDescription": "Finder FF CP500 intelligent addressable fire alarm call point.",
    "description": "Finder FF CP500 Intelligent Addressable Fire Alarm Call Point as listed by Safetag. Confirm exact specifications, approvals, and compatibility for the project. (Source: safetag.ae) No price shown on web.",
    "image": "https://safetag.ae/wp-content/uploads/2024/06/Finder-FF-CP500-Intelligent-Addressable-Fire-Alarm-Call-Point.jpg",
    "dataSource": "Safetag (safetag.ae)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable fire control panel",
      "1 loop",
      "Model FF FCP500-1L"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "finder-ff-fcp500-1l-addressable-fire-control-panel",
    "slug": "finder-ff-fcp500-1l-intelligent-addressable-fire-control-panel",
    "name": "Finder FF FCP500-1L 1 Loop Intelligent Addressable Fire Control Panel",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Finder",
    "model": "FF FCP500-1L",
    "shortDescription": "Finder FF FCP500-1L 1-loop intelligent addressable fire control panel.",
    "description": "Finder FF FCP500-1L 1 Loop Intelligent Addressable Fire Control Panel as listed by Safetag. Confirm exact specifications, approvals, and compatibility for the project. (Source: safetag.ae) No price shown on web.",
    "image": "https://safetag.ae/wp-content/uploads/2024/06/Finder-FF-FCP500-1L-1-Loop-Intelligent-Addressable-Fire-Control-Panel.jpg",
    "dataSource": "Safetag (safetag.ae)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable sounder strobe",
      "Model FF LSB550"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "finder-ff-lsb550-intelligent-addressable-sounder-strobe",
    "slug": "finder-ff-lsb550-intelligent-addressable-fire-alarm-sounder-strobe",
    "name": "Finder FF LSB550 Intelligent Addressable Fire Alarm Sounder Strobe",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Finder",
    "model": "FF LSB550",
    "shortDescription": "Finder FF LSB550 intelligent addressable sounder strobe.",
    "description": "Finder FF LSB550 Intelligent Addressable Fire Alarm Sounder Strobe as listed by Safetag. Confirm exact specifications, approvals, and compatibility for the project. (Source: safetag.ae) No price shown on web.",
    "image": "https://safetag.ae/wp-content/uploads/2024/06/Finder-FF-LSB550-Intelligent-Addressable-Fire-Alarm-Sounder-Strobe.jpg",
    "dataSource": "Safetag (safetag.ae)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable I/O module",
      "Model FF MIC500"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "finder-ff-mic500-intelligent-addressable-io-module",
    "slug": "finder-ff-mic500-intelligent-addressable-fire-alarm-io-module",
    "name": "Finder FF MIC500 Intelligent Addressable Fire Alarm I/O Module",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Finder",
    "model": "FF MIC500",
    "shortDescription": "Finder FF MIC500 intelligent addressable fire alarm I/O module.",
    "description": "Finder FF MIC500 Intelligent Addressable Fire Alarm I/O Module as listed by Safetag. Confirm exact specifications, approvals, and compatibility for the project. (Source: safetag.ae) No price shown on web.",
    "image": "https://safetag.ae/wp-content/uploads/2024/06/Finder-FF-MIC500-Intelligent-Addressable-Fire-Alarm-IO-Module.jpg",
    "dataSource": "Safetag (safetag.ae)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable optical smoke detector",
      "Model FF O500"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "finder-ff-o500-intelligent-addressable-optical-smoke-detector",
    "slug": "finder-ff-o500-intelligent-addressable-optical-smoke-detector",
    "name": "Finder FF O500 Intelligent Addressable Fire Alarm Optical Smoke Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "Finder",
    "model": "FF O500",
    "shortDescription": "Finder FF O500 intelligent addressable optical smoke detector.",
    "description": "Finder FF O500 Intelligent Addressable Fire Alarm Optical Smoke Detector as listed by Safetag. Confirm exact specifications, approvals, and compatibility for the project. (Source: safetag.ae) No price shown on web.",
    "image": "https://safetag.ae/wp-content/uploads/2024/06/Finder-FF-O500-Intelligent-Addressable-Fire-Alarm-Optical-Smoke-Detector.jpg",
    "dataSource": "Safetag (safetag.ae)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Intelligent addressable heat detector",
      "Model FF T500"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "finder-ff-t500-intelligent-addressable-heat-detector",
    "slug": "finder-ff-t500-intelligent-addressable-heat-detector",
    "name": "Finder FF T500 Intelligent Addressable Fire Alarm Heat Detector",
    "category": "fire-detection-system",
    "subcategory": "heat-detectors",
    "brand": "Finder",
    "model": "FF T500",
    "shortDescription": "Finder FF T500 intelligent addressable heat detector.",
    "description": "Finder FF T500 Intelligent Addressable Fire Alarm Heat Detector as listed by Safetag. Confirm exact specifications, approvals, and compatibility for the project. (Source: safetag.ae) No price shown on web.",
    "image": "https://safetag.ae/wp-content/uploads/2024/06/Finder-FF-T500-Intelligent-Addressable-Fire-Alarm-Heat-Detector.jpg",
    "dataSource": "Safetag (safetag.ae)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable fire alarm control unit family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-foundation-series-addressable-fire-alarm-control-units",
    "slug": "simplex-foundation-series-addressable-fire-alarm-control-units",
    "name": "Foundation Series Addressable Fire Alarm Control Units",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Simplex",
    "model": "Foundation Series",
    "shortDescription": "Simplex Foundation Series addressable fire alarm control units (product family).",
    "description": "Foundation Series Addressable Fire Alarm Control Units as listed on Simplex Addressable Systems. Confirm exact model, specifications, approvals, and configuration for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable fire alarm control system",
      "Model 4100ES"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-4100es-fire-alarm-control-system",
    "slug": "simplex-4100es-fire-alarm-control-system",
    "name": "4100ES Fire Alarm Control System",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Simplex",
    "model": "4100ES",
    "shortDescription": "Simplex 4100ES addressable fire alarm control system.",
    "description": "4100ES Fire Alarm Control System as listed on Simplex Addressable Systems. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable fire alarm control system",
      "Model 4007ES"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-4007es-fire-alarm-control-system",
    "slug": "simplex-4007es-fire-alarm-control-system",
    "name": "4007ES Fire Alarm Control System",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Simplex",
    "model": "4007ES",
    "shortDescription": "Simplex 4007ES addressable fire alarm control system.",
    "description": "4007ES Fire Alarm Control System as listed on Simplex Addressable Systems. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable fire alarm control system",
      "Model 4010ES"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-4010es-fire-alarm-control-system",
    "slug": "simplex-4010es-fire-alarm-control-system",
    "name": "4010ES Fire Alarm Control System",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Simplex",
    "model": "4010ES",
    "shortDescription": "Simplex 4010ES addressable fire alarm control system.",
    "description": "4010ES Fire Alarm Control System as listed on Simplex Addressable Systems. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable fire alarm control system",
      "Model 4017ES"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-4017es-fire-alarm-control-system",
    "slug": "simplex-4017es-fire-alarm-control-system",
    "name": "4017ES Fire Alarm Control System",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Simplex",
    "model": "4017ES",
    "shortDescription": "Simplex 4017ES addressable fire alarm control system.",
    "description": "4017ES Fire Alarm Control System as listed on Simplex Addressable Systems. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable sensors and bases family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-truealarm-addressable-sensors-bases",
    "slug": "simplex-truealarm-addressable-sensors-bases",
    "name": "TrueAlarm Addressable Sensors and Bases",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Simplex",
    "model": "TrueAlarm",
    "shortDescription": "Simplex TrueAlarm addressable sensors and bases (product family).",
    "description": "TrueAlarm Addressable Sensors and Bases as listed on Simplex addressable sensors. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable sensors and bases family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-mx-addressable-sensors-bases",
    "slug": "simplex-mx-addressable-sensors-bases",
    "name": "MX Addressable Sensors and Bases",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Simplex",
    "model": "MX",
    "shortDescription": "Simplex MX addressable sensors and bases (product family).",
    "description": "MX Addressable Sensors and Bases as listed on Simplex addressable sensors. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable callpoints family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-mx-addressable-callpoints",
    "slug": "simplex-mx-addressable-callpoints",
    "name": "MX Addressable Callpoints",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Simplex",
    "model": "MX",
    "shortDescription": "Simplex MX addressable callpoints (product family).",
    "description": "MX Addressable Callpoints as listed on Simplex addressable pull stations/callpoints. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable pull stations family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-truealarm-addressable-pull-stations",
    "slug": "simplex-truealarm-addressable-pull-stations",
    "name": "TrueAlarm Addressable Pull Stations",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Simplex",
    "model": "TrueAlarm",
    "shortDescription": "Simplex TrueAlarm addressable pull stations (product family).",
    "description": "TrueAlarm Addressable Pull Stations as listed on Simplex addressable pull stations/callpoints. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable I/O modules and peripherals family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-mx-io-modules-peripherals",
    "slug": "simplex-mx-io-modules-peripherals",
    "name": "MX I/O Modules and Peripherals",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Simplex",
    "model": "MX",
    "shortDescription": "Simplex MX I/O modules and peripherals (product family).",
    "description": "MX I/O Modules and Peripherals as listed on Simplex addressable peripheral devices. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable I/O modules and peripherals family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-truealarm-io-modules-peripherals",
    "slug": "simplex-truealarm-io-modules-peripherals",
    "name": "TrueAlarm I/O Modules and Peripherals",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Simplex",
    "model": "TrueAlarm",
    "shortDescription": "Simplex TrueAlarm I/O modules and peripherals (product family).",
    "description": "TrueAlarm I/O Modules and Peripherals as listed on Simplex addressable peripheral devices. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Addressable notification appliances and speakers family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-truealert-es-addressable-notification-appliances-speakers",
    "slug": "simplex-truealert-es-addressable-notification-appliances-speakers",
    "name": "TrueAlert ES Addressable Notification Appliances & Speakers",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Simplex",
    "model": "TrueAlert ES",
    "shortDescription": "Simplex TrueAlert ES addressable notification appliances and speakers (product family).",
    "description": "TrueAlert ES Addressable Notification Appliances & Speakers as listed on Simplex addressable notification. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "features": [
      "Visual messaging solutions family"
    ],
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-truealert-visual-messaging-solutions",
    "slug": "simplex-truealert-visual-messaging-solutions",
    "name": "TrueAlert Visual Messaging Solutions",
    "category": "fire-detection-system",
    "subcategory": "sounders-notification",
    "brand": "Simplex",
    "model": "TrueAlert",
    "shortDescription": "Simplex TrueAlert visual messaging solutions (product family).",
    "description": "TrueAlert Visual Messaging Solutions as listed on Simplex addressable notification. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "image": "/images/products/placeholder-product.svg",
    "dataSource": "Simplex (simplex-fire.com)"
  },
  // ---- Additional verified web imports: Hochiki/Bosch/Simplex families/models (no prices shown) ----
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": null,
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-firenet-plus-intelligent-addressable-panel",
    "slug": "hochiki-firenet-plus-intelligent-addressable-panel",
    "name": "FireNET Plus Intelligent Addressable Fire Alarm Panel",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Hochiki",
    "model": "FireNET Plus",
    "shortDescription": "Hochiki FireNET Plus intelligent addressable fire alarm panel family.",
    "description": "FireNET Plus Intelligent Addressable panel family as listed on Hochiki America FireNET L@titude pages. Confirm exact variant, loop/dialer/expandability, specifications, approvals, and configuration for the project. (Source: hochikiamerica.com) No price shown on web.",
    "features": [
      "Intelligent addressable fire alarm panel family"
    ],
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0100-16340_1.jpg?fv=BF97417CBDF31B35318B067B65D0C5A7",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-fnlcdsus00r024-serial-annunciator",
    "slug": "hochiki-fnlcdsus00r024-serial-annunciator",
    "name": "FNLCDSUS00R024 Serial Annunciator, Red",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "FNLCDSUS00R024",
    "shortDescription": "Hochiki serial annunciator for FireNET/FireNET Plus.",
    "description": "FNLCDSUS00R024 2015 Ed. Serial Annunciator, Red for FireNET and FireNET Plus FACP as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "features": [
      "Serial annunciator",
      "Compatible with FireNET/FireNET Plus FACP (as listed)"
    ],
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0100-16260_1.jpg?fv=55D21F945D7916F88216772786CE2FA5",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-fn-4127-nic-network-interface-card",
    "slug": "hochiki-fn-4127-nic-network-interface-card",
    "name": "FN-4127-NIC Network Interface Card",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "FN-4127-NIC",
    "shortDescription": "Hochiki network interface card for FireNET/FireNET Plus.",
    "description": "FN-4127-NIC Network Interface Card for FireNET and FireNET Plus as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "features": [
      "Network interface card"
    ],
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0100-16360_1.jpg?fv=602A6BB6DD17F3EEF5E53B8584528648",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-fnp-1127-slc-single-loop-expander-card",
    "slug": "hochiki-fnp-1127-slc-single-loop-expander-card",
    "name": "FNP-1127-SLC Single Loop Expander Card",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "FNP-1127-SLC",
    "shortDescription": "Hochiki single loop expander card for FireNET Plus.",
    "description": "FNP-1127-SLC Single Loop Expander Card for FireNET Plus as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "features": [
      "Single loop expander card"
    ],
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "https://hochikiamerica-2.azureedge.net/img/product/0100-27230.jpg?fv=EAB793BB6F94B0DFC3C5ECD431C877DC",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "hochiki-fn-4127-io-16-channel-input-output-board",
    "slug": "hochiki-fn-4127-io-16-channel-input-output-board",
    "name": "FN-4127-IO 16 Channel Input/Output Board",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Hochiki",
    "model": "FN-4127-IO",
    "shortDescription": "Hochiki 16-channel input/output board.",
    "description": "FN-4127-IO 16 Channel Input/Output Board as listed by Hochiki America. Confirm exact specifications, approvals, and compatibility for the project. (Source: hochikiamerica.com) No price shown on web.",
    "features": [
      "16 channel input/output board"
    ],
    "dataSource": "Hochiki America (hochikiamerica.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "https://hochikiamerica-1.azureedge.net/img/product/0100-15670.jpg?fv=70DCF4379D142742E751669B522CB736",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-avenar-panel-2000",
    "slug": "bosch-avenar-panel-2000",
    "name": "AVENAR Panel 2000",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Bosch",
    "model": "AVENAR panel 2000",
    "shortDescription": "Bosch AVENAR panel 2000 fire alarm control panel.",
    "description": "AVENAR panel 2000 as referenced in Bosch AVENAR panel documentation/results. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Fire alarm control panel"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-avenar-panel-8000",
    "slug": "bosch-avenar-panel-8000",
    "name": "AVENAR Panel 8000",
    "category": "fire-detection-system",
    "subcategory": "fire-alarm-panels",
    "brand": "Bosch",
    "model": "AVENAR panel 8000",
    "shortDescription": "Bosch AVENAR panel 8000 fire alarm control panel.",
    "description": "AVENAR panel 8000 as referenced in Bosch AVENAR panel documentation/results. Confirm exact model variant, specifications, approvals, and configuration for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Fire alarm control panel"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-avenar-keypad-8000",
    "slug": "bosch-avenar-keypad-8000",
    "name": "AVENAR Keypad 8000",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Bosch",
    "model": "AVENAR keypad 8000",
    "shortDescription": "Bosch AVENAR keypad 8000 for AVENAR panel systems.",
    "description": "AVENAR keypad 8000 as referenced in Bosch AVENAR panel documentation/results. Confirm exact specifications, approvals, and compatibility for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Panel keypad/accessory"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-avenar-detector-4000-series",
    "slug": "bosch-avenar-detector-4000-series",
    "name": "AVENAR Detector 4000 Series",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Bosch",
    "model": "AVENAR detector 4000",
    "shortDescription": "Bosch AVENAR detector 4000 series (product family).",
    "description": "AVENAR detector 4000 series as referenced in Bosch AVENAR documentation/results. Confirm exact detector model, specifications, approvals, and compatibility for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Fire detector family"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-fap-425-detector",
    "slug": "bosch-fap-425-detector",
    "name": "FAP-425 Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "Bosch",
    "model": "FAP-425",
    "shortDescription": "Bosch FAP-425 detector (AVENAR/LSN context).",
    "description": "FAP-425 detector as referenced in Bosch AVENAR/LSN documentation excerpts. Confirm exact variant, specifications, approvals, and compatibility for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Fire detector",
      "Model FAP-425"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-fap-520-detector",
    "slug": "bosch-fap-520-detector",
    "name": "FAP-520 Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "Bosch",
    "model": "FAP-520",
    "shortDescription": "Bosch FAP-520 detector (AVENAR/LSN context).",
    "description": "FAP-520 detector as referenced in Bosch AVENAR/LSN documentation excerpts. Confirm exact variant, specifications, approvals, and compatibility for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Fire detector",
      "Model FAP-520"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-fcp-500-detector",
    "slug": "bosch-fcp-500-detector",
    "name": "FCP-500 Detector",
    "category": "fire-detection-system",
    "subcategory": "smoke-detectors",
    "brand": "Bosch",
    "model": "FCP-500",
    "shortDescription": "Bosch FCP-500 detector (conventional/interface context).",
    "description": "FCP-500 detector as referenced in Bosch AVENAR panel wiring/system documentation excerpts. Confirm exact variant, specifications, approvals, and compatibility for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Fire detector",
      "Model FCP-500"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "bosch-fmc-420rw-manual-call-point",
    "slug": "bosch-fmc-420rw-manual-call-point",
    "name": "FMC-420RW Manual Call Point",
    "category": "fire-detection-system",
    "subcategory": "manual-call-points",
    "brand": "Bosch",
    "model": "FMC-420RW",
    "shortDescription": "Bosch FMC-420RW manual call point.",
    "description": "FMC-420RW manual call point as referenced in Bosch AVENAR panel system documentation excerpts. Confirm exact variant, specifications, approvals, and compatibility for the project. (Source: boschsecurity.com) No price shown on web.",
    "features": [
      "Manual call point",
      "Model FMC-420RW"
    ],
    "dataSource": "Bosch Security (boschsecurity.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-specialty-addressable-sensing-solutions",
    "slug": "simplex-specialty-addressable-sensing-solutions",
    "name": "Specialty Addressable Sensing Solutions",
    "category": "fire-detection-system",
    "subcategory": "multi-sensor-detectors",
    "brand": "Simplex",
    "model": "Specialty Addressable Sensing",
    "shortDescription": "Simplex specialty addressable sensing solutions (product family).",
    "description": "Specialty Addressable Sensing Solutions as listed on Simplex addressable sensors. Confirm exact models, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "features": [
      "Specialty addressable sensing family"
    ],
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-truesite-workstation-management-solutions",
    "slug": "simplex-truesite-workstation-management-solutions",
    "name": "TrueSite Workstation Management Solutions",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Simplex",
    "model": "TrueSite Workstation",
    "shortDescription": "Simplex TrueSite workstation management solutions (product family).",
    "description": "TrueSite Workstation Management Solutions as listed on Simplex networks and workstations. Confirm exact model, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "features": [
      "Workstation/management solution family"
    ],
    "dataSource": "Simplex (simplex-fire.com)"
  },
  {
    "availability": "inquiry-required",
    "certifications": [],
    "image": "/images/products/placeholder-product.svg",
    "applications": [
      "Fire detection and alarm systems"
    ],
    "id": "simplex-es-net-high-speed-networks",
    "slug": "simplex-es-net-high-speed-networks",
    "name": "ES Net High Speed Networks",
    "category": "fire-detection-system",
    "subcategory": "input-output-modules",
    "brand": "Simplex",
    "model": "ES Net",
    "shortDescription": "Simplex ES Net high speed networks (product family).",
    "description": "ES Net High Speed Networks as listed on Simplex networks and workstations. Confirm exact model, specifications, approvals, and compatibility for the project. (Source: simplex-fire.com) No price shown on web.",
    "features": [
      "Fire alarm network family"
    ],
    "dataSource": "Simplex (simplex-fire.com)"
  }]

/*  Helper functions                                                  */
/* ------------------------------------------------------------------ */

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductIcon(iconName: string) {
  return ICON_MAP[iconName] || Shield
}

export function getProductsByCategory(categoryKey: string) {
  if (categoryKey === 'all') return products
  return products.filter((p) => p.category === categoryKey)
}

export function getProductsBySubCategory(categoryKey: string, subCategory: string) {
  return products.filter(
    (p) => p.category === categoryKey && p.subcategory === subCategory
  )
}

export function findCategory(keyOrSlug: string) {
  return productCategories.find(
    (c) => c.key === keyOrSlug || c.slug === keyOrSlug
  )
}

export function findCategoryBySlug(slug: string) {
  return productCategories.find((c) => c.slug === slug)
}

export function findSubCategory(categoryKey: string, subKey: string) {
  const cat = findCategory(categoryKey)
  return cat?.subCategories.find((s) => s.key === subKey || s.slug === subKey)
}

export function getProductCount(categoryKey?: string, subCategory?: string) {
  if (!categoryKey || categoryKey === 'all') {
    return subCategory
      ? products.filter((p) => p.subcategory === subCategory).length
      : products.length
  }
  return subCategory
    ? getProductsBySubCategory(categoryKey, subCategory).length
    : getProductsByCategory(categoryKey).length
}

export function getCategoryProductCount(keyOrSlug: string) {
  return products.filter((p) => p.category === keyOrSlug).length
}

export function getTotalProductCount() {
  return products.length
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* ------------------------------------------------------------------ */
/*  Catalogue documents (placeholder structure for future PDFs)       */
/* ------------------------------------------------------------------ */

export const catalogueDocuments: CatalogueDocument[] = [
  {
    id: 'company-product-catalogue',
    title: 'Company Product Catalogue',
    manufacturer: 'HEAT SHIELD ENGINEERING',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-pump-catalogue',
    title: 'Fire Pump Catalogue',
    manufacturer: 'HEAT SHIELD ENGINEERING',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-alarm-catalogue',
    title: 'Fire Alarm Catalogue',
    manufacturer: 'HEAT SHIELD ENGINEERING',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-door-catalogue',
    title: 'Fire Door Catalogue',
    manufacturer: 'HEAT SHIELD ENGINEERING',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-suppression-catalogue',
    title: 'Fire Suppression Catalogue',
    manufacturer: 'HEAT SHIELD ENGINEERING',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-protection-accessories',
    title: 'Fire Protection Accessories',
    manufacturer: 'HEAT SHIELD ENGINEERING',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'technical-datasheets',
    title: 'Technical Datasheets',
    manufacturer: 'Various',
    type: 'datasheet',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'installation-manuals',
    title: 'Installation Manuals',
    manufacturer: 'Various',
    type: 'manual',
    url: null,
    lastUpdated: 'To Be Specified',
  },
]

// ------------------------------------------------------------------
// Validate subcategory references at module load
// ------------------------------------------------------------------
const subCategoryKeysByCategory = new Map<string, Set<string>>()
productCategories.forEach((cat) => {
  const keys = new Set(cat.subCategories.map((sc) => sc.key))
  subCategoryKeysByCategory.set(cat.key, keys)
})

products.forEach((p) => {
  if (!p.subcategory || p.subcategory.trim() === '') {
    console.warn(
      `[Product validation] Missing subcategory: ${p.id} (${p.name}) in category ${p.category}`
    )
    return
  }
  const validKeys = subCategoryKeysByCategory.get(p.category)
  if (!validKeys || !validKeys.has(p.subcategory)) {
    console.warn(
      `[Product validation] Unknown subcategory "${p.subcategory}" for product ${p.id} (${p.name}) in category ${p.category}`
    )
  }
})


// -- image helper (additive; preserves existing product records/wording) --
export type ProductImageSize = 480 | 960;
const PRODUCT_PLACEHOLDER = '/images/products/placeholder-product.svg';
function isUsableSrc(img: string | null | undefined): img is string {
  return typeof img === 'string' && img.trim().length > 0;
}
export function productImage(product: Pick<Product, 'image'> | { image?: string | null } | null | undefined, size: ProductImageSize = 960): string {
  const img = product?.image ?? null;
  if (!isUsableSrc(img)) return PRODUCT_PLACEHOLDER;
  const s = img.trim();
  if (s.startsWith('data:') || s.startsWith('blob:') || /^https?:\/\//i.test(s)) return s;
  const rel = s.replace(/^\/+/, '');
  if (!rel.startsWith('images/products/')) return s.startsWith('/') ? s : `/${s}`;
  const base = rel.replace(/^images\/products\/?/i, '').replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-').replace(/\.(png|jpe?g|webp|avif)$/i, '');
  return `/images/products/thumbs/${base}-${size}.webp`;
}
export function productImageSrcSet(product: Pick<Product, 'image'> | { image?: string | null } | null | undefined): string | undefined {
  const img = product?.image ?? null;
  if (!isUsableSrc(img)) return undefined;
  const s = img.trim();
  if (s.startsWith('data:') || s.startsWith('blob:') || /^https?:\/\//i.test(s)) return undefined;
  const rel = s.replace(/^\/+/, '');
  if (!rel.startsWith('images/products/')) return undefined;
  return `${productImage(product, 480)} 480w, ${productImage(product, 960)} 960w`;
}
export function productImageOriginal(product: Pick<Product, 'image'> | { image?: string | null } | null | undefined): string {
  const img = product?.image ?? null;
  if (!isUsableSrc(img)) return PRODUCT_PLACEHOLDER;
  const s = img.trim();
  if (s.startsWith('data:') || s.startsWith('blob:') || /^https?:\/\//i.test(s)) return s;
  return s.startsWith('/') ? s : `/${s}`;
}

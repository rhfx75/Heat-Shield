import { Activity, Building, Phone, HardHat, ShieldCheck, Wrench, Truck, Users, Compass, BellRing, Flame, DoorOpen, Zap, ClipboardCheck, Clock } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  Activity,
  Building,
  Phone,
  HardHat,
  ShieldCheck,
  Wrench,
  Truck,
  Users,
  Compass,
  BellRing,
  Flame,
  DoorOpen,
  Zap,
  ClipboardCheck,
  Clock,
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  category: string
  image: string
  features: string[]
  detailTitle: string
  detailContent: string[]
  detailSystems: string[]
}

export const services: Service[] = [
  {
    id: 'fire-protection-system-design',
    title: 'Fire Protection System Design & Consultancy',
    icon: 'drafting-compass',
    category: 'Fire Protection',
    image: '/images/fire-protection-system-design.jpg',
    description: 'Custom fire protection system design tailored to your facility layout, risk profile, and local safety codes.',
    features: [
      'Site risk assessment & survey',
      'Custom system design & engineering',
      'Code compliance review',
      'BOQ & technical specifications',
    ],
    detailTitle: 'Fire Protection System Design & Consultancy',
    detailContent: [
      'We provide end-to-end fire protection system design and consultancy services for industrial, commercial, and institutional facilities across Bangladesh. Our engineers conduct detailed site surveys to assess fire risks and develop customized protection strategies.',
      'Every design follows national fire safety codes and international best practices, ensuring your facility is protected while remaining fully compliant. We deliver complete technical drawings, bill of quantities, and specification documents.',
    ],
    detailSystems: ['Fire Hydrant Systems', 'Fire Sprinkler Systems', 'Fire Alarm & Detection', 'Fire Suppression Systems'],
  },
  {
    id: 'fire-detection-alarm-installation',
    title: 'Fire Detection & Alarm System Installation',
    icon: 'bell-ring',
    category: 'Detection & Alarm',
    image: '/images/fire-detection-alarm.jpg',
    description: 'Advanced fire detection & alarm systems for early warning and safe evacuation.',
    features: [
      'Smoke & heat detectors',
      'Manual call points',
      'Fire alarm control panels',
      'Notification appliances',
    ],
    detailTitle: 'Fire Detection & Alarm System Installation',
    detailContent: [
      'Early detection saves lives. We install addressable and conventional fire alarm systems that detect smoke, heat, and flame at the earliest stage, triggering immediate alerts.',
      'Our installations include control panels, detectors, manual call points, sounders, strobes, and monitoring interfaces, all tested and commissioned before handover.',
    ],
    detailSystems: ['Addressable Fire Alarm Systems', 'Conventional Fire Alarm Systems', 'Gas Detection Systems', 'Emergency Voice Communication'],
  },
  {
    id: 'fire-suppression-extinguishing',
    title: 'Fire Suppression & Extinguishing Systems',
    icon: 'flame-kindling',
    category: 'Fire Protection',
    image: '/images/fire-suppression-extinguishing.png',
    description: 'Automatic fire suppression and gas-based extinguishing systems for high-value and critical areas.',
    features: [
      'Clean agent suppression',
      'CO2 suppression systems',
      'Kitchen hood suppression',
      'Water mist systems',
    ],
    detailTitle: 'Fire Suppression & Extinguishing Systems',
    detailContent: [
      'For areas where water damage must be avoided—server rooms, control panels, archives—we install clean agent and gas-based suppression systems that extinguish fires without collateral damage.',
      'We also provide kitchen hood suppression and portable extinguisher placement for complete coverage.',
    ],
    detailSystems: ['FM-200 Clean Agent', 'NOVEC 1230', 'CO2 Suppression', 'Water Mist', 'Kitchen Hood Suppression'],
  },
  {
    id: 'fire-pump-hydrant',
    title: 'Fire Pump & Hydrant System Solutions',
    icon: 'waves',
    category: 'Fire Protection',
    image: '/images/fire-pump-hydrant.webp',
    description: 'High-capacity fire pumps and hydrant networks delivering reliable water pressure for firefighting.',
    features: [
      'Electric & diesel fire pumps',
      'Hydrant valve networks',
      'Pump control panels',
      'Pressure maintenance',
    ],
    detailTitle: 'Fire Pump & Hydrant System Solutions',
    detailContent: [
      'A reliable water supply is the backbone of fire protection. We design and install fire pump sets and external hydrant systems that deliver consistent pressure and flow during emergencies.',
      'Systems include electric and diesel-driven pumps, jockey pumps, hydrant valves, landing valves, and complete piping networks.',
    ],
    detailSystems: ['Electric Fire Pump Sets', 'Diesel Engine Fire Pumps', 'External Hydrant Systems', 'Fire Water Tanks'],
  },
  {
    id: 'fire-door-emergency-exit',
    title: 'Fire Door & Emergency Exit Solutions',
    icon: 'door-open',
    category: 'Fire Protection',
    image: '/images/fire-door-emergency-exit.jpg',
    description: 'Fire-rated doors and emergency exit systems that contain fire and enable safe evacuation.',
    features: [
      'Fire-rated door installation',
      'Emergency exit devices',
      'Panic hardware',
      'Exit signage',
    ],
    detailTitle: 'Fire Door & Emergency Exit Solutions',
    detailContent: [
      'Fire-rated doors compartmentalize fire and smoke, giving occupants critical time to evacuate. We supply and install certified fire doors, exit devices, panic hardware, and illuminated exit signage.',
      'All doors are rated and tested to meet required fire-resistance standards.',
    ],
    detailSystems: ['Fire Rated Doors', 'Panic Exit Devices', 'Emergency Exit Signage', 'Door Closers & Seals'],
  },
  {
    id: 'electrical-lightning-safety',
    title: 'Electrical & Lightning Safety',
    icon: 'zap',
    category: 'Electrical Safety',
    image: '/images/electrical-lightning-safety.jpg',
    description: 'Electrical safety systems and lightning protection to prevent fire hazards from electrical faults.',
    features: [
      'Lightning protection systems',
      'Earthing & grounding',
      'Surge protection devices',
      'Electrical safety audits',
    ],
    detailTitle: 'Electrical & Lightning Safety',
    detailContent: [
      'Electrical faults are a leading cause of fire. We provide lightning protection, earthing, grounding, and surge protection systems to eliminate ignition risks from electrical installations.',
      'Our electrical safety solutions protect both people and equipment across industrial and commercial facilities.',
    ],
    detailSystems: ['Lightning Protection (LPS)', 'Earthing & Grounding', 'Surge Protection (SPD)', 'Electrical Safety Audit'],
  },
  {
    id: 'inspection-testing-commissioning',
    title: 'Inspection, Testing & Commissioning',
    icon: 'clipboard-check',
    category: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    description: 'Rigorous inspection, testing, and commissioning to verify system performance and compliance.',
    features: [
      'System acceptance testing',
      'Performance verification',
      'Compliance certification',
      'Defect snagging',
    ],
    detailTitle: 'Inspection, Testing & Commissioning',
    detailContent: [
      'Before any system goes live, we conduct thorough inspection, testing, and commissioning to verify it performs as designed and complies with applicable codes.',
      'We provide documented test reports and commissioning certificates for client records and authority submissions.',
    ],
    detailSystems: ['Fire Alarm Acceptance Testing', 'Pump Flow Testing', 'Hydrant Flow Testing', 'System Commissioning'],
  },
  {
    id: 'maintenance-amc',
    title: 'Maintenance & Annual Service Contracts (AMC)',
    icon: 'wrench',
    category: 'Maintenance',
    image: '/images/maintenance-amc.jpg',
    description: 'Preventive maintenance and annual service contracts to keep your fire safety systems reliable year-round.',
    features: [
      'Scheduled preventive maintenance',
      '24/7 emergency support',
      'System testing & certification',
      'Spare parts supply',
    ],
    detailTitle: 'Maintenance & Annual Service Contracts',
    detailContent: [
      'Fire safety systems require regular upkeep to remain dependable. Our AMC plans include scheduled inspections, testing, battery replacement, and emergency response to keep systems operational.',
      'We maintain detailed service logs and provide renewal reminders so your facility stays compliant.',
    ],
    detailSystems: ['AMC Fire Alarm Systems', 'AMC Fire Pump Systems', 'AMC Suppression Systems', 'AMC Extinguishers'],
  },
]

export function getServiceById(id: string) {
  return services.find((s) => s.id === id)
}

export function getServiceIcon(iconName: string) {
  return ICON_MAP[iconName] || ShieldCheck
}

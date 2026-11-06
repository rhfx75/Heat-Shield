// TODO(confirm): content originates from another company's brief; business must confirm each service, standard, and document list applies to HEAT SHIELD ENGINEERING.
export type RscService = {
  number: '01' | '02' | '03'
  id: string
  title: string
  subtitle: string
  intro: string[]
  scope: string[]
  documentationTitle: string
  documentation: string[]
  standardsTitle: string
  standards: string[]
  deliverables: string[]
}

export type RscProcessStep = { number: string; title: string; text: string }

export const rsc = {
  intro: {
    title: 'RSC COMPLIANCE & TECHNICAL ENGINEERING SERVICES',
    subtitle: 'Supporting RMG Factories in Meeting RSC Safety Requirements',
    paragraphs: [
      'HEAT SHIELD ENGINEERING provides comprehensive fire protection, fire detection and electrical safety engineering services to support Ready-Made Garment (RMG) factories in Bangladesh in meeting applicable RMG Sustainability Council (RSC) safety requirements.',
      'Our services cover technical assessment, engineering design, system installation, compliance documentation, inspection, testing and commissioning, and corrective action support.',
      'We focus on developing technically sound, properly documented and audit-ready safety systems in accordance with applicable RSC requirements, relevant NFPA standards, approved engineering designs and applicable Bangladesh regulations.',
    ],
  },
  services: [
    {
      number: '01',
      id: 'fas-fads',
      title: 'FIRE ALARM & DETECTION SYSTEM (FAS / FADS)',
      subtitle: 'Intelligent Fire Detection, Alarm Engineering & Compliance Documentation',
      intro: [
        'HEAT SHIELD ENGINEERING provides comprehensive Fire Alarm and Detection System engineering solutions to support RSC fire safety compliance requirements in RMG factories.',
        'Our services cover system design, device selection, installation supervision, configuration, programming, testing, commissioning and preparation of technical documentation in accordance with applicable NFPA 72 requirements and approved fire safety designs.',
      ],
      scope: [
        'Fire alarm and detection system design and engineering.',
        'Addressable and conventional fire alarm system solutions.',
        'Smoke detector, heat detector and manual call point installation.',
        'Audible and visual notification appliance installation.',
        'Fire Alarm Control Panel (FACP) configuration and programming.',
        'Loop configuration, device addressing and system integration.',
        'Cable routing, conduit installation and wiring verification.',
        'System testing, troubleshooting and commissioning.',
        'Existing system inspection and technical assessment.',
        'Corrective action and compliance documentation support.',
      ],
      documentationTitle: 'RSC / Accord Technical Documentation',
      documentation: [
        "01. Accord / RSC FADS & SUPS Form",
        "02. Contractor's Installation Certificate",
        '03. System Record of Completion (NFPA 72)',
        '04. Device List with Corresponding Locations',
        "05. Manufacturer's Installation Instructions",
        '06. As-Built Fire Alarm System Drawings',
        '07. Proposed Fire Alarm System Drawings',
        '08. Voltage Drop Calculation',
        '09. Battery Calculation',
        '10. Conduit Calculation',
        '11. Product Certificates for All Listed Equipment',
        '12. Product Datasheets for All Equipment',
        '13. Accord Checklist',
        '14. Fire Alarm Control Panel Reports',
      ],
      standardsTitle: 'Applicable Technical Standard',
      standards: [
        'NFPA 72 â€“ National Fire Alarm and Signaling Code.',
        'Applicable RSC technical requirements.',
        'Approved fire alarm system design and manufacturer requirements.',
      ],
      deliverables: [
        'Engineering design and technical drawings.',
        'Device layout and addressing documentation.',
        'System installation and configuration records.',
        'Technical calculations and equipment documentation.',
        'Testing and commissioning reports.',
        'Final as-built documentation.',
        'RSC audit and verification documentation support.',
      ],
    },
    {
      number: '02',
      id: 'fps-sups',
      title: 'FIRE PROTECTION SYSTEM (FPS / SUPS)',
      subtitle: 'Fire Pump, Hydrant, Standpipe & Sprinkler Engineering Solutions',
      intro: [
        'HEAT SHIELD ENGINEERING delivers integrated Fire Protection System engineering services to support industrial and commercial facilities in meeting applicable RSC fire safety requirements.',
        'Our services include fire protection system assessment, hydraulic design, equipment selection, installation, inspection, performance testing, acceptance testing and technical documentation.',
      ],
      scope: [
        'Fire protection system design and engineering.',
        'Fire pump system design and installation.',
        'Main, standby and jockey pump system assessment.',
        'Fire pump room layout and equipment installation.',
        'Fire hydrant and standpipe system installation.',
        'Automatic sprinkler system design and installation.',
        'Fire water piping network and distribution.',
        'Pipe sizing, routing and hydraulic assessment.',
        'Fire hose reel and landing valve installation.',
        'Fire protection equipment inspection.',
        'Fire pump performance testing.',
        'System acceptance testing and commissioning.',
        'Existing system assessment and corrective action support.',
      ],
      documentationTitle: 'RSC / Accord Technical Documentation',
      documentation: [
        '01. Accord / RSC SUPS Form',
        "02. Contractor's Installation Certificate",
        '03. Hydraulic Calculation',
        '04. Accord Checklist',
        "05. Manufacturer's Installation Instructions",
        '06. As-Built Fire SUPS Drawings',
        '07. Proposed Fire SUPS Drawings',
        '08. Contractor Material and Test Certificate',
        '09. NFPA 20 Acceptance Test Report',
        '10. Product Certificates',
        '11. Product Datasheets',
      ],
      standardsTitle: 'Applicable Technical Standards',
      standards: [
        'NFPA 20 â€“ Installation of Stationary Pumps for Fire Protection.',
        'NFPA 13 â€“ Installation of Sprinkler Systems, where applicable.',
        'NFPA 14 â€“ Installation of Standpipe and Hose Systems, where applicable.',
        'Applicable RSC technical requirements.',
        'Approved fire protection system design.',
      ],
      deliverables: [
        'Fire protection engineering drawings.',
        'Fire pump and piping system documentation.',
        'Hydraulic calculation reports.',
        'Material and installation certificates.',
        'Fire pump acceptance test documentation.',
        'System testing and commissioning reports.',
        'Final as-built drawings.',
        'RSC audit and verification documentation support.',
      ],
    },
    {
      number: '03',
      id: 'electrical-safety',
      title: 'ELECTRICAL SAFETY ENGINEERING',
      subtitle: 'Electrical Design, Inspection, Testing & Compliance Documentation',
      intro: [
        'HEAT SHIELD ENGINEERING provides electrical safety engineering services to help RMG factories identify electrical hazards, improve electrical system reliability and address applicable RSC electrical safety requirements.',
        'Our services cover electrical system design review, technical assessment, inspection, testing, preventive maintenance planning and compliance documentation.',
      ],
      scope: [
        'Electrical Single Line Diagram (SLD) preparation and updating.',
        'Electrical load calculation and load assessment.',
        'Electrical layout drawing (ELD) preparation.',
        'Lightning Protection System (LPS) design and assessment.',
        'Electrical thermography survey.',
        'Earth pit resistance testing.',
        'Insulation resistance testing.',
        'Transformer oil testing, where applicable.',
        'Electrical distribution system inspection.',
        'Electrical panel and switchgear inspection.',
        'Electrical safety risk identification.',
        'Preventive electrical maintenance planning.',
        'Electrical safety training and awareness documentation.',
        'Technical corrective action and compliance support.',
      ],
      documentationTitle: 'RSC / Accord Electrical Safety Documentation',
      documentation: [
        '01. Electrical Single Line Diagram (SLD)',
        '02. Electrical Load Calculation',
        '03. Electrical Layout Drawing (ELD)',
        '04. Lightning Protection System (LPS) Design',
        '05. Thermography Survey Report',
        '06. Earth Pit Resistance Test Report',
        '07. Insulation Resistance Test Report',
        '08. Transformer Oil Test Report (Where Applicable)',
        '09. Preventive Maintenance Program and Schedule',
        '10. Electrical Safety Training Initiation Documents',
      ],
      standardsTitle: 'Applicable Technical References',
      standards: [
        'Applicable RSC electrical safety requirements.',
        'Bangladesh National Building Code (BNBC), where applicable.',
        'Relevant IEC standards.',
        'Applicable electrical installation and testing standards.',
        'Approved electrical engineering designs.',
      ],
      deliverables: [
        'Electrical engineering drawings.',
        'Electrical load calculation reports.',
        'Lightning protection design documentation.',
        'Thermography survey reports.',
        'Earth resistance and insulation resistance test reports.',
        'Transformer oil test reports, where applicable.',
        'Preventive maintenance documentation.',
        'Electrical safety training records.',
        'RSC audit and verification documentation support.',
      ],
    },
  ] as RscService[],
  process: {
    title: 'OUR RSC COMPLIANCE SUPPORT PROCESS',
    intro: 'HEAT SHIELD ENGINEERING follows a structured engineering approach to support factory safety improvement and technical compliance.',
    steps: [
      { number: '01', title: 'Initial Assessment', text: 'Review existing safety systems, drawings and available technical documents.' },
      { number: '02', title: 'Gap Identification', text: 'Identify technical deficiencies and documentation gaps against applicable requirements.' },
      { number: '03', title: 'Engineering Design', text: 'Prepare or update the required engineering drawings, calculations and technical specifications.' },
      { number: '04', title: 'Installation & Remediation', text: 'Support system installation, modification and corrective action implementation.' },
      { number: '05', title: 'Inspection & Testing', text: 'Conduct applicable inspections, functional testing and performance verification.' },
      { number: '06', title: 'Documentation & Verification', text: 'Compile technical records, test reports, certificates and as-built drawings for review and verification.' },
      { number: '07', title: 'Audit & T&C Support', text: 'Provide technical assistance during applicable RSC audits, Pre-T&C and Testing & Commissioning activities.' },
    ] as RscProcessStep[],
  },
  whyChoose: {
    title: 'WHY CHOOSE HEAT SHIELD ENGINEERING?',
    points: [
      'Integrated fire and electrical safety engineering services.',
      'Technical documentation and engineering drawing support.',
      'NFPA-based engineering approach.',
      'System installation and commissioning support.',
      'Technical inspection and testing services.',
      'Compliance gap identification and corrective action support.',
      'Organized technical documentation and audit preparation.',
    ],
    signature: 'HEAT SHIELD ENGINEERING',
    tagline: 'Engineering Safer Facilities. Supporting Sustainable Compliance.',
  },
  disclaimer:
    'Note: All RSC/Accord document lists represent the technical documentation categories identified for these services. Final submission requirements, applicable standards and approval criteria are subject to the latest RSC requirements, project scope and authorized technical review.',
} as const

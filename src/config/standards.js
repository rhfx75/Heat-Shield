// TODO: Confirm full names against each organization's official branding.
/** @typedef {{id:string,slug:string,short:string,name:string,image:string,alt:string,width:number,height:number,format:string,website:string|null,description:string|null}} Standard */
/** @type {Standard[]} */
export const STANDARDS = [
  { id: 'nirapan', slug: 'nirapan', short: 'NIRAPAN', name: 'NIRAPAN', image: '/standards/nirapan.jpg', alt: 'NIRAPAN logo', width: 400, height: 217, format: 'jpg', website: null, description: null },
  { id: 'rsc', slug: 'rsc', short: 'RSC', name: 'RMG Sustainability Council', image: '/standards/rsc.jpg', alt: 'RMG Sustainability Council logo', width: 1149, height: 556, format: 'jpg', website: null, description: null },
  { id: 'leed', slug: 'leed', short: 'LEED', name: 'Leadership in Energy and Environmental Design (LEED)', image: '/standards/leed.jpg', alt: 'Leadership in Energy and Environmental Design (LEED) logo', width: 1279, height: 1280, format: 'jpg', website: null, description: null },
  { id: 'bfscd', slug: 'bfscd', short: 'BFSCD', name: 'Bangladesh Fire Service and Civil Defence', image: '/standards/bfscd.png', alt: 'Bangladesh Fire Service and Civil Defence logo', width: 600, height: 600, format: 'png', website: null, description: null },
  { id: 'dife', slug: 'dife', short: 'DIFE', name: 'Department of Inspection for Factories and Establishments', image: '/standards/dife.jpg', alt: 'Department of Inspection for Factories and Establishments logo', width: 413, height: 357, format: 'jpg', website: null, description: null },
  { id: 'buet', slug: 'buet', short: 'BUET', name: 'Bangladesh University of Engineering and Technology', image: '/standards/buet.jpg', alt: 'Bangladesh University of Engineering and Technology logo', width: 700, height: 700, format: 'jpg', website: null, description: null },
  { id: 'nfpa', slug: 'nfpa', short: 'NFPA', name: 'National Fire Protection Association', image: '/standards/nfpa.png', alt: 'National Fire Protection Association logo', width: 500, height: 539, format: 'png', website: null, description: null },
  { id: 'ilo', slug: 'ilo', short: 'ILO', name: 'International Labour Organization', image: '/standards/ilo.webp', alt: 'International Labour Organization logo', width: 1024, height: 880, format: 'webp', website: null, description: null },
  // TODO: website: official URL per organization (render link only when not null)
  // TODO: description: one factual sentence per organization (render only when not null)
];

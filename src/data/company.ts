import { CONTACT } from '../config/contact';

export type CompanyHours = { days: string; open: string; close: string; tz: string; openDays: number[] };

export const company = {
  name: CONTACT.company,
  shortName: 'HSE',
  tagline: 'Fire Detection | Fire Protection | Utility Products',
  taglines: [
    'Fire Detection | Fire Protection | Utility Products',
    'Sales | Installation | Maintenance',
  ],
  phones: CONTACT.phones.map((p) => ({ label: p.label, display: p.display, tel: p.tel })),
  whatsapp: {
    digits: '8801954823265',
    display: CONTACT.phones[0].display,
    url: CONTACT.whatsapp,
  },
  emails: [{ label: 'Email', address: CONTACT.email }],
  address: {
    lines: [CONTACT.address.street, `${CONTACT.address.city} ${CONTACT.address.postalCode}`],
    oneLine: CONTACT.addressLine,
    country: CONTACT.address.country,
  },
  mapUrl: CONTACT.mapsUrl,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.addressLine)}&output=embed`,
  hours: {
    days: 'Sat–Thu',
    open: '09:00',
    close: '18:00',
    tz: 'Asia/Dhaka',
    openDays: [6, 0, 1, 2, 3, 4],
  } as CompanyHours,
  socials: {
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  },
  foundedYear: undefined as number | undefined,
  domain: '',
} as const;

export function whatsappLink(message?: string) {
  return message ? `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}` : CONTACT.whatsapp;
}

export function telHref(tel: string = CONTACT.phones[0]?.tel || '') {
  return `tel:${tel.replace(/\s+/g, '')}`;
}

export function mailHref(email: string = CONTACT.email) {
  return `mailto:${email}`;
}

export function isOpenNow(now = new Date(), hours = company.hours) {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: hours.tz,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value || '';
    const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const day = dayMap[get('weekday')] ?? -1;
    if (!hours.openDays.includes(day)) return false;
    const [oh, om] = hours.open.split(':').map(Number);
    const [ch, cm] = hours.close.split(':').map(Number);
    const mins = Number(get('hour')) * 60 + Number(get('minute'));
    return mins >= oh * 60 + om && mins < ch * 60 + cm;
  } catch {
    return false;
  }
}

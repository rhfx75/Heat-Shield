export type CompanyHours = { days: string; open: string; close: string; tz: string; openDays: number[] };

export const company = {
  name: 'Heat Shield Engineering',
  shortName: 'HSE',
  tagline: 'Fire Detection | Fire Protection | Utility Products',
  taglines: [
    'Fire Detection | Fire Protection | Utility Products',
    'Sales | Installation | Maintenance',
  ],
  phones: [
    { label: 'Phone', display: '01788585741', tel: '+8801788585741' },
  ],
  whatsapp: {
    digits: '8801788585741',
    display: '+880 1788-585741',
  },
  emails: [
    { label: 'Email', address: 'heatshieldengineering01@gmail.com' },
  ],
  address: {
    lines: ['House-12, Road-04, Block-C', 'Banani, Dhaka-1213'],
    oneLine: 'House-12, Road-04, Block-C, Banani, Dhaka-1213',
    country: 'Bangladesh',
  },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=House-12%2C+Road-04%2C+Block-C%2C+Banani%2C+Dhaka-1213',
  mapEmbedUrl:
    'https://www.google.com/maps?q=House-12%2C+Road-04%2C+Block-C%2C+Banani%2C+Dhaka-1213&output=embed',
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
  const base = `https://wa.me/${company.whatsapp.digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telHref(tel = company.phones[0]?.tel || '') {
  return `tel:${tel.replace(/\s+/g, '')}`;
}

export function mailHref(email = company.emails[0]?.address || '') {
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

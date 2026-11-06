import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { company, isOpenNow, mailHref, telHref, whatsappLink } from '../../data/company';
import { services } from '../../data/services';
import { BlueprintSheet } from '../hub/BlueprintSheet';
import { hubIcons } from '../icons/hub-icons';
import '../hub/hub.css';

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return p;
}

export function FooterHub() {
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const [mapOn, setMapOn] = useState(false);
  const year = new Date().getFullYear();
  const quick = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Projects' },
    { to: '/brands', label: 'Brands' },
    { to: '/contact', label: 'Contact' },
  ];
  const serviceLinks = useMemo(() => services.slice(0, 6).map((s) => ({ to: `/services/${s.id}`, label: s.title })), []);
  const socialEntries = [
    { key: 'facebook', href: company.socials.facebook, label: 'Facebook' },
    { key: 'linkedin', href: company.socials.linkedin, label: 'LinkedIn' },
    { key: 'youtube', href: company.socials.youtube, label: 'YouTube' },
    { key: 'whatsapp', href: whatsappLink(), label: 'WhatsApp' },
    { key: 'mail', href: mailHref(), label: 'Email' },
  ].filter((s) => s.href);

  const ring = 138;
  const dash = ring * progress;

  return (
    <footer className="hse-hub-footer" data-surface="light">
      <BlueprintSheet />
      <div className="hse-hub-footer__wrap">
        <div className="hse-hub-bento">
          <article className="hse-hub-card hse-hub-span-5">
            <img src="/images/heatshield-logo.png" alt={`${company.name} logo`} width="180" height="60" loading="lazy" style={{ maxWidth: 180, height: 'auto', display: 'block' }} />
            <p style={{ margin: '14px 0 0', color: 'var(--hse-text-secondary)' }}>
              {company.name} delivers fire detection, fire protection, electrical safety and industrial utility solutions across Bangladesh.
            </p>
            <div className="hse-hub-social" aria-label="Social links">
              {socialEntries.map((s) => {
                const Icon = hubIcons[s.key as keyof typeof hubIcons];
                return (
                  <a key={s.key} href={s.href} data-net={s.key} aria-label={s.label} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    <Icon width={20} height={20} />
                  </a>
                );
              })}
            </div>
          </article>

          <article className="hse-hub-card hse-hub-span-3">
            <h4>Quick Links</h4>
            <ul className="hse-hub-links">
              {quick.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </article>

          <article className="hse-hub-card hse-hub-span-4">
            <h4>Services</h4>
            <ul className="hse-hub-links">
              {serviceLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </article>

          <article className="hse-hub-card hse-hub-card--blue hse-hub-span-4" data-surface="dark">
            <h4>Contact</h4>
            <p style={{ margin: '0 0 10px' }}>
              <span className="hse-hub-badge"><span className={`hse-hub-dot${open ? '' : ' is-closed'}`} aria-hidden="true" />{open ? 'Open now' : 'Closed'}</span>
            </p>
            <ul className="hse-hub-links" style={{ gap: 8 }}>
              {company.phones[0] && <li><a href={telHref(company.phones[0].tel)}>{company.phones[0].display}</a></li>}
              {company.emails[0] && <li><a href={mailHref(company.emails[0].address)}>{company.emails[0].address}</a></li>}
              <li><a href={company.mapUrl} target="_blank" rel="noopener noreferrer">{company.address.oneLine}</a></li>
              <li><span>{company.hours.days}: {company.hours.open} AM – {company.hours.close === '18:00' ? '6:00' : company.hours.close} PM</span></li>
            </ul>
            <button type="button" className="hse-hub-btn hse-hub-btn--red" style={{ marginTop: 14 }} onClick={() => setOpen(isOpenNow())}>Refresh status</button>
          </article>

          <article className={`hse-hub-card hse-hub-span-4 hse-hub-map${mapOn ? ' is-open' : ''}`}>
            <h4>Find Us</h4>
            <button type="button" className="hse-hub-btn hse-hub-btn--red hse-hub-map__toggle" onClick={() => setMapOn((v) => !v)}>{mapOn ? 'Hide map' : 'Show map'}</button>
            <div className="hse-hub-map__frame">
              <iframe title={`${company.name} location`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={company.mapEmbedUrl} />
            </div>
            <div style={{ marginTop: 12 }}>
              <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="hse-hub-btn hse-hub-btn--red">Get Directions</a>
            </div>
          </article>

          <article className="hse-hub-card hse-hub-card--wa hse-hub-span-4" data-surface="dark">
            <h4>WhatsApp</h4>
            <p style={{ margin: '0 0 14px' }}>Chat with an engineer for product guidance, site assessment, or a quotation.</p>
            <a href={whatsappLink(`Hello ${company.name}, I would like to chat with an engineer.`)} target="_blank" rel="noopener noreferrer" className="hse-hub-btn" style={{ background: '#fff', color: '#128C7E' }}>Chat on WhatsApp</a>
          </article>
        </div>

        <div className="hse-hub-bottom">
          <span>© {year} {company.name}. All rights reserved.</span>
          <button type="button" className="hse-hub-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>
            <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(1,78,182,.18)" strokeWidth="3" />
              <circle cx="24" cy="24" r="22" fill="none" stroke="var(--hse-red)" strokeWidth="3" strokeDasharray={`${dash} ${ring}`} strokeLinecap="round" />
            </svg>
            <span className="hse-hub-top__shield" aria-hidden="true">
              <svg viewBox="0 0 24 28" width="18" height="20" fill="none"><path d="M12 2 4 5.5v6.2c0 5 3.4 8.8 8 10.8 4.6-2 8-5.8 8-10.8V5.5L12 2Z" fill="var(--hse-blue)"/><path d="M12 7v11M7.5 12.5h9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </button>
          <span>{company.taglines[1]}</span>
        </div>
      </div>
      <span aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }} data-open={String(open)} />
    </footer>
  );
}

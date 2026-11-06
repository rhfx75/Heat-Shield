import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { company, whatsappLink } from '../../data/company';
import { HubShield3D } from './HubShield3D';

export function PullStation() {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `perspective(700px) rotateY(${Math.max(-8, Math.min(8, x * 8))}deg) rotateX(${Math.max(-8, Math.min(8, -y * 8))}deg)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); el.style.transform = ''; };
  }, []);

  const trigger = () => {
    setAlarm(true);
    setOpen(true);
    setAnnounce('Alarm activated. Quote options are available.');
    window.setTimeout(() => setAlarm(false), 1600);
  };

  return (
    <div className="hse-hub-cta__visual">
      <HubShield3D />
      <div className="hse-hub-rings" aria-hidden="true">
        <span className="hse-hub-ring" /><span className="hse-hub-ring" /><span className="hse-hub-ring" />
      </div>
      <button
        ref={ref}
        type="button"
        className={`hse-hub-pull${alarm ? ' hse-hub-pull--alarm' : ''}`}
        onClick={trigger}
        aria-label="Fire alarm pull station. Activate to request a free quote."
        aria-expanded={open}
      >
        <svg viewBox="0 0 320 420" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="hub-box" x1="60" y1="50" x2="260" y2="360"><stop stopColor="#FF5A52"/><stop offset="1" stopColor="#C62828"/></linearGradient>
            <linearGradient id="hub-gloss" x1="80" y1="70" x2="160" y2="180"><stop stopColor="rgba(255,255,255,.55)"/><stop offset="1" stopColor="rgba(255,255,255,0)"/></linearGradient>
          </defs>
          <rect x="55" y="45" width="210" height="330" rx="20" fill="#1f2937"/>
          <rect x="72" y="62" width="176" height="296" rx="16" fill="url(#hub-box)" stroke="rgba(255,255,255,.28)"/>
          <rect x="88" y="78" width="72" height="110" rx="12" fill="url(#hub-gloss)"/>
          <rect x="96" y="92" width="128" height="54" rx="8" fill="#fff"/>
          <text x="160" y="128" textAnchor="middle" fontFamily="Montserrat,Arial,sans-serif" fontSize="34" fontWeight="800" fill="#C62828">FIRE</text>
          <circle className="hse-hub-led" cx="230" cy="119" r="8" fill="#7f1d1d" stroke="#fff" strokeWidth="2"/>
          <g className="hse-hub-handle">
            <rect x="108" y="196" width="104" height="132" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
            <path d="M126 214h68M126 238h68M126 262h68M126 286h68" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
            <rect x="118" y="304" width="84" height="18" rx="6" fill="#e2e8f0"/>
          </g>
          <rect x="90" y="332" width="140" height="24" rx="6" fill="rgba(255,255,255,.18)"/>
          <text x="160" y="349" textAnchor="middle" fontFamily="Montserrat,Arial,sans-serif" fontSize="14" fontWeight="800" fill="#fff" letterSpacing="1.4">PULL DOWN</text>
        </svg>
      </button>
      <div className="hse-hub-chips" aria-hidden="true">
        {['Sales','Installation','Maintenance','24/7 Support'].map((c)=><span key={c} className="hse-hub-chip">{c}</span>)}
      </div>
      <div className={`hse-hub-glass${open ? ' is-open' : ''}`}>
        <h4>Request a free quote</h4>
        <div className="hse-hub-cta__actions">
          <Link to="/contact" className="hse-hub-btn hse-hub-btn--red">Request a Quote</Link>
          <a href={whatsappLink(`Hello ${company.name}, I would like a free quote.`)} target="_blank" rel="noopener noreferrer" className="hse-hub-btn hse-hub-btn--wa">WhatsApp</a>
        </div>
      </div>
      <div aria-live="polite" className="sr-only">{announce}</div>
    </div>
  );
}

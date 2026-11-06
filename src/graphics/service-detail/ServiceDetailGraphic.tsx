export function ServiceDetailGraphic({ serviceId, title }: { serviceId: string; title: string }) {
  const isAmc = serviceId === 'maintenance-amc'
  if (isAmc) {
    return (
      <div className="hse-sd-graphic" aria-hidden="true">
        <svg viewBox="0 0 920 280" fill="none" role="img" aria-label={`${title} maintenance cycle graphic`}>
          <defs>
            <linearGradient id="hse-sd-g" x1="0" x2="1"><stop offset="0" stopColor="rgba(1,78,182,.18)"/><stop offset="1" stopColor="rgba(1,78,182,.04)"/></linearGradient>
          </defs>
          <rect x="18" y="22" width="884" height="236" rx="18" fill="url(#hse-sd-g)" stroke="rgba(1,78,182,.16)" />
          <path d="M120 170a95 95 0 1 1 40 78" stroke="#014EB6" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".88"/>
          <path d="M120 170l-18-2 12 18" stroke="#014EB6" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="160" cy="140" r="8" fill="#C62828"/>
          <g transform="translate(330 62)">
            {[
              ['Scheduled', 'Inspection & testing'],
              ['Response', '24/7 emergency support'],
              ['Compliance', 'Records & certification'],
            ].map(([h, t], i) => (
              <g key={h} transform={`translate(0 ${i * 66})`}>
                <rect width="250" height="52" rx="14" fill="#fff" stroke="rgba(1,78,182,.16)" />
                <circle cx="28" cy="26" r="14" fill="rgba(1,78,182,.08)" />
                <path d="M22 26l4 4 8-9" stroke="#014EB6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="52" y="23" fill="#0B1F44" fontSize="15" fontWeight="700">{h}</text>
                <text x="52" y="39" fill="#334155" fontSize="12.5">{t}</text>
              </g>
            ))}
          </g>
          <g transform="translate(620 62)">
            {['Fire Alarm', 'Fire Pump', 'Suppression', 'Extinguishers'].map((s, i) => (
              <g key={s} transform={`translate(${(i % 2) * 138} ${Math.floor(i / 2) * 66})`}>
                <rect width="124" height="52" rx="14" fill="#fff" stroke="rgba(1,78,182,.14)" />
                <rect x="14" y="15" width="22" height="22" rx="7" fill="rgba(198,40,40,.1)" />
                <path d="M25 20v12M19 26h12" stroke="#C62828" strokeWidth="2.2" strokeLinecap="round" />
                <text x="44" y="31" fill="#0B1F44" fontSize="12.5" fontWeight="700">{s}</text>
              </g>
            ))}
            <text x="0" y="164" fill="#334155" fontSize="12.5">AMC coverage at a glance</text>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div className="hse-sd-graphic" aria-hidden="true">
      <svg viewBox="0 0 920 180" fill="none">
        <rect x="18" y="16" width="884" height="148" rx="18" fill="rgba(1,78,182,.04)" stroke="rgba(1,78,182,.14)" />
        <path d="M80 118H840" stroke="rgba(1,78,182,.18)" strokeWidth="3" />
        {[0,1,2,3].map((i) => (
          <g key={i} transform={`translate(${120 + i * 205} 58)`}>
            <circle cx="20" cy="60" r="18" fill="#014EB6" opacity={i === 3 ? 1 : 0.16 + i * 0.18} />
            <path d="M14 60l4 4 8-9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity={i === 3 ? 1 : .95} />
            <rect x="0" y="0" width="120" height="34" rx="10" fill="#fff" stroke="rgba(1,78,182,.14)" />
            <text x="12" y="22" fill="#0B1F44" fontSize="12.5" fontWeight="700">{['Assess','Plan','Deliver','Support'][i]}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

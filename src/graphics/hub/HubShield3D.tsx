export function HubShield3D() {
  return (
    <svg className="hse-hub-shield" viewBox="0 0 220 260" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hub-shield-fill" x1="110" y1="18" x2="110" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2B7FE6" />
          <stop offset="1" stopColor="#014EB6" />
        </linearGradient>
        <linearGradient id="hub-flame" x1="110" y1="120" x2="110" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB300" />
          <stop offset=".55" stopColor="#FF5A52" />
          <stop offset="1" stopColor="#E53935" />
        </linearGradient>
      </defs>
      <path d="M110 18 34 50v72c0 52 32 92 76 120 44-28 76-68 76-120V50L110 18Z" fill="url(#hub-shield-fill)" stroke="rgba(255,255,255,.65)" strokeWidth="3" />
      <path d="M110 30 46 56v64c0 45 27 80 64 104 37-24 64-59 64-104V56l-64-26Z" fill="rgba(255,255,255,.08)" />
      <path d="M110 92c16 22 30 34 30 58a30 30 0 1 1-60 0c0-14 6-24 14-36 4 10 8 16 16 22-2-16 0-30 0-44Z" fill="url(#hub-flame)" />
      <circle cx="110" cy="148" r="10" fill="#FFF3F3" opacity=".7" />
    </svg>
  );
}

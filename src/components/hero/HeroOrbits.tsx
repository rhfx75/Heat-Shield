export function HeroOrbits() {
  return (
    <svg className="hse-ho" viewBox="0 0 1000 1000" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="hse-ho-halo" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff" stopOpacity="1"/><stop offset="1" stopColor="#7ec8ff" stopOpacity="0"/></radialGradient>
        <radialGradient id="hse-ho-red" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#e63a2e"/><stop offset="1" stopColor="#e63a2e" stopOpacity="0"/></radialGradient>
      </defs>
      <g className="hse-ho__ripples">
        <circle cx="500" cy="500" r="110" />
        <circle cx="500" cy="500" r="110" />
        <circle cx="500" cy="500" r="110" />
      </g>
      <g className="hse-ho__ring hse-ho__ring--a"><circle cx="500" cy="500" r="300" /><g className="hse-ho__ticks"><path d="M500 188a312 312 0 0 1 40 4"/><path d="M812 500a312 312 0 0 1-4 40"/><path d="M500 812a312 312 0 0 1-40-4"/><path d="M188 500a312 312 0 0 1 4-40"/></g><g transform="translate(800 500)"><circle r="18" fill="url(#hse-ho-halo)" opacity=".55"/><circle r="4.5" fill="#fff"/></g><g transform="translate(200 500)"><circle r="22" fill="url(#hse-ho-red)" opacity=".5" className="hse-ho__pulse"/><circle r="4.5" fill="#e63a2e"/></g></g>
      <g className="hse-ho__ring hse-ho__ring--b"><circle cx="500" cy="500" r="380" /><g transform="translate(500 120)"><circle r="18" fill="url(#hse-ho-halo)" opacity=".5"/><circle r="4.5" fill="#fff"/></g><g transform="translate(500 880)"><circle r="18" fill="url(#hse-ho-halo)" opacity=".5"/><circle r="4.5" fill="#fff"/></g></g>
      <g className="hse-ho__ring hse-ho__ring--c"><circle cx="500" cy="500" r="460" /><g transform="translate(960 500)"><circle r="18" fill="url(#hse-ho-halo)" opacity=".45"/><circle r="4.5" fill="#fff"/></g><g transform="translate(40 500)"><circle r="22" fill="url(#hse-ho-red)" opacity=".45" className="hse-ho__pulse"/><circle r="4.5" fill="#e63a2e"/></g></g>
      <path className="hse-ho__shield" d="M500 255 360 310v132c0 106 61 184 140 232 79-48 140-126 140-232V310L500 255Z" />
    </svg>
  )
}

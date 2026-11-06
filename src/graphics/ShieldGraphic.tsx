import { useEffect, useRef } from 'react';

export default function ShieldGraphic({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0; let visible = true; let paused = document.hidden;
    const scan = svg.querySelector<SVGRectElement>('#hse-scan');
    const glow = svg.querySelector<SVGEllipseElement>('#hse-glow');
    const flame = svg.querySelector<SVGPathElement>('#hse-flame');
    const mx = { x: 0, tx: 0, y: 0, ty: 0 };
    const onMove = (e: PointerEvent) => { mx.tx = (e.clientX / window.innerWidth - 0.5) * 14; mx.ty = (e.clientY / window.innerHeight - 0.5) * 10; };
    window.addEventListener('pointermove', onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !paused && !raf && !reduce) raf = requestAnimationFrame(loop); }, { threshold: 0.01 });
    io.observe(svg);
    const onVis = () => { paused = document.hidden; if (!paused && visible && !raf && !reduce) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    const loop = (now: number) => {
      if (!visible || paused || reduce) { raf = 0; return; }
      mx.x += (mx.tx - mx.x) * 0.06; mx.y += (mx.ty - mx.y) * 0.06;
      svg.style.transform = `translate(calc(-50% + ${mx.x}px), calc(-50% + ${mx.y}px))`;
      const t = now * 0.001;
      if (scan) { const y = ((t % 6) / 6) * 360 - 20; scan.setAttribute('y', String(y)); scan.setAttribute('opacity', y > 0 && y < 320 ? '0.55' : '0'); }
      if (glow) { const s = 1 + Math.sin(t * (Math.PI * 2 / 5)) * 0.03; glow.setAttribute('rx', String(120 * s)); glow.setAttribute('ry', String(140 * s)); }
      if (flame) { const sy = 1 + Math.sin(t * 1.8) * 0.045; const sk = Math.sin(t * 1.2) * 2.2; flame.setAttribute('transform', `translate(160 175) scale(1 ${sy}) skewX(${sk}) translate(-160 -175)`); }
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);
    // draw outline
    const outline = svg.querySelector<SVGPathElement>('#hse-outline');
    if (outline) { const len = outline.getTotalLength(); outline.style.strokeDasharray = `${len}`; outline.style.strokeDashoffset = reduce ? '0' : `${len}`; if (!reduce) outline.getBoundingClientRect(), outline.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)', outline.style.strokeDashoffset = '0'; }
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', onVis); };
  }, []);
  return (
    <svg ref={ref} className={className} viewBox="0 0 320 380" fill="none" role="img" aria-label="">
      <defs>
        <linearGradient id="hse-shield-fill" x1="160" y1="30" x2="160" y2="340" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2B7FE6" stopOpacity=".18"/><stop offset="1" stopColor="#0868D8" stopOpacity=".08"/></linearGradient>
        <linearGradient id="hse-scan-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0"/><stop offset=".5" stopColor="#9FE8FF" stopOpacity=".9"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
        <clipPath id="hse-clip"><path d="M160 34 62 74v98c0 72 42 126 98 160 56-34 98-88 98-160V74L160 34Z"/></clipPath>
      </defs>
      <ellipse id="hse-glow" cx="160" cy="185" rx="120" ry="140" fill="#2B7FE6" opacity=".18" style={{filter:'blur(18px)'}} />
      <path id="hse-outline" d="M160 34 62 74v98c0 72 42 126 98 160 56-34 98-88 98-160V74L160 34Z" stroke="#7BB6FF" strokeWidth="2.2" fill="url(#hse-shield-fill)" />
      <g clipPath="url(#hse-clip)">
        <path id="hse-flame" d="M160 120c18 24 38 40 38 74 0 24-17 44-38 44s-38-20-38-44c0-34 20-50 38-74Z" fill="url(#hse-flame-g)"/>
        <path d="M160 145c10 14 20 24 20 45 0 14-9 25-20 25s-20-11-20-25c0-21 10-31 20-45Z" fill="#FFB300" opacity=".7"/>
        <rect id="hse-scan" x="40" y="-20" width="240" height="18" fill="url(#hse-scan-g)" opacity="0"/>
      </g>
      <defs><linearGradient id="hse-flame-g" x1="160" y1="120" x2="160" y2="238" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFB300"/><stop offset=".55" stopColor="#FF3D00"/><stop offset="1" stopColor="#E53935"/></linearGradient></defs>
    </svg>
  );
}

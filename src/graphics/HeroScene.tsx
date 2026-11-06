import { lazy, Suspense, useEffect, useRef } from 'react';
import './hero-scene.css';
import DetectionNetwork from './DetectionNetwork';
import ShieldGraphic from './ShieldGraphic';
const HeatField = lazy(() => import('./HeatField'));
const EmberField = lazy(() => import('./EmberField'));

export default function HeroScene() {
  const scrollRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rootRef.current?.parentElement;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.85)));
      scrollRef.current = p;
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div ref={rootRef} className="hse-hero-scene" aria-hidden="true">
      <div className="hse-hero-scene__base" />
      <Suspense fallback={null}><HeatField className="hse-hero-scene__layer" scrollRef={scrollRef} /></Suspense>
      <ShieldGraphic className="hse-hero-scene__shield" />
      <DetectionNetwork className="hse-hero-scene__network" />
      <Suspense fallback={null}><EmberField className="hse-hero-scene__layer hse-hero-scene__embers" /></Suspense>
      <div className="hse-hero-scene__grid" />
      <div className="hse-hero-scene__vignette" />
      <div className="hse-hero-scene__noise" />
      {import.meta.env.DEV && <div className="hse-hero-scene__dev">gfx</div>}
    </div>
  );
}

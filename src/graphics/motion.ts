import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function fadeUp(els: gsap.TweenTarget, opts: { delay?: number; y?: number; st?: ScrollTrigger.Vars } = {}) {
  if (prefersReduced()) return;
  return gsap.from(els, { y: opts.y ?? 20, opacity: 1, duration: 0.8, ease: 'expo.out', delay: opts.delay ?? 0, clearProps: 'transform,opacity', scrollTrigger: opts.st });
}

export function staggerChildren(parent: Element | null, child: string, opts: { y?: number; st?: ScrollTrigger.Vars } = {}) {
  if (!parent || prefersReduced()) return;
  return gsap.from(parent.querySelectorAll(child), { y: opts.y ?? 16, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: opts.st ?? { trigger: parent, start: 'top 82%', once: true } });
}

export function countUp(el: HTMLElement, end: number, suffix = '') {
  if (prefersReduced()) { el.textContent = `${end}${suffix}`; return; }
  const obj = { v: 0 };
  gsap.to(obj, { v: end, duration: 1.8, ease: 'power2.out', snap: { v: 1 }, scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onUpdate: () => { el.textContent = `${Math.round(obj.v)}${suffix}`; } });
}

export function magnetic(el: HTMLElement, strength = 18) {
  if (prefersReduced() || window.matchMedia('(pointer: coarse)').matches) return () => {};
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
  const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); xTo((e.clientX - (r.left + r.width / 2)) * (strength / 60)); yTo((e.clientY - (r.top + r.height / 2)) * (strength / 60)); };
  const leave = () => { xTo(0); yTo(0); };
  el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
  return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); xTo(0); yTo(0); };
}

export function initLenisGSAP() {
  if (prefersReduced() || window.matchMedia('(pointer: coarse)').matches) return null;
  return import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }).catch(() => null);
}

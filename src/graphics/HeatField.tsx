import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { heatFieldFrag, heatFieldVert } from './shaders/heatField';

type Props = { className?: string; active?: boolean; scrollRef?: React.MutableRefObject<number> };

export default function HeatField({ className, active = true, scrollRef }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 768;
    let webglOk = true;
    let renderer: Renderer | null = null;
    let gl: any = null;
    try { renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5) }); gl = renderer.gl; }
    catch { webglOk = false; }
    if (!webglOk || !renderer || !gl || reduce) {
      host.classList.add('hse-gfx-heat-fallback');
      return;
    }
    host.appendChild(gl.canvas);
    gl.canvas.style.width = '100%'; gl.canvas.style.height = '100%'; gl.canvas.style.display = 'block';
    let octaves = 5; let dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: heatFieldVert, fragment: heatFieldFrag,
      uniforms: {
        u_time: { value: 0 }, u_resolution: { value: [1, 1] }, u_mouse: { value: [0.5, 0.5] },
        u_scroll: { value: 0 }, u_intensity: { value: 1 }, u_octaves: { value: octaves },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height; };
    const onLeave = () => { mouse.tx = 0.5; mouse.ty = 0.5; };
    window.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    const resize = () => { const w = host.clientWidth, h = host.clientHeight; renderer!.setSize(w, h); program.uniforms.u_resolution.value = [w, h]; };
    resize(); window.addEventListener('resize', resize);
    let raf = 0; let frames = 0; let acc = 0; let last = performance.now(); let visible = active; let paused = document.hidden;
    const setVisible = (v: boolean) => { visible = v; if (visible && !paused && !raf) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(host);
    const onVis = () => { paused = document.hidden; if (!paused && visible && !raf) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    const loop = (now: number) => {
      if (!visible || paused) { raf = 0; return; }
      const dt = Math.min(0.05, (now - last) / 1000); last = now; frames++; acc += dt;
      if (frames <= 60 && frames % 10 === 0 && acc / frames > 0.024) { octaves = 3; dpr = Math.max(0.75, dpr * 0.65); renderer!.dpr = dpr; program.uniforms.u_octaves.value = 3; resize(); }
      mouse.x += (mouse.tx - mouse.x) * 0.045; mouse.y += (mouse.ty - mouse.y) * 0.045;
      program.uniforms.u_time.value += dt; program.uniforms.u_mouse.value = [mouse.x, mouse.y];
      program.uniforms.u_scroll.value = scrollRef?.current ?? 0;
      renderer!.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave);
      try { gl.canvas.remove(); } catch {}
      try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
    };
  }, [active, scrollRef]);
  return <div ref={ref} className={className} aria-hidden="true" />;
}

import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const vert = /* glsl */ `attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,0.,1.); }`;
const frag = /* glsl */ `precision highp float; varying vec2 vUv; uniform float uTime; uniform vec2 uRes;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y; }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.02+vec2(17.3,9.2); a*=.52; } return v; }
void main(){ vec2 uv=vUv; vec2 p=uv*vec2(1.8,1.2); float t=uTime*.045; float w=fbm(p+vec2(0.,t))+fbm(p*1.4-vec2(t*.7,t*.2))*.5; vec2 q=p+vec2(w*.22, w*.12); float n=fbm(q);
  vec3 deep=vec3(0.004,0.16,0.46); vec3 mid=vec3(0.043,0.38,0.78); vec3 glow=vec3(0.17,0.5,0.9);
  vec3 col=mix(deep,mid,smoothstep(.15,.85,n)); col=mix(col,glow,smoothstep(.55,.95,n)*.25);
  float bottom=smoothstep(.55,-.05,uv.y); col+=vec3(.9,.28,.12)*bottom*(.08+.06*sin(t*4.+uv.x*6.));
  col*=.92+.08*sin(uv.y*3.14159);
  gl_FragColor=vec4(col,1.); }`;

export default function HeatHaze() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches
    if (reduce || mobile) { host.style.background = 'linear-gradient(135deg,var(--ab-brand-light),var(--ab-brand))'; return }
    let renderer: Renderer | null = null
    try { renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) }) } catch { host.style.background = 'linear-gradient(135deg,var(--ab-brand-light),var(--ab-brand))'; return }
    const gl = renderer.gl
    host.appendChild(gl.canvas)
    gl.canvas.style.cssText = 'width:100%;height:100%;display:block'
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] } } })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    let raf = 0, visible = true, paused = document.hidden
    const resize = () => { const w = host.clientWidth, h = host.clientHeight; renderer!.setSize(w, h); program.uniforms.uRes.value = [w, h] }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !paused && !raf) raf = requestAnimationFrame(loop) }, { threshold: 0.01 })
    const onVis = () => { paused = document.hidden; if (!paused && visible && !raf) raf = requestAnimationFrame(loop) }
    const loop = (t: number) => { if (!visible || paused) { raf = 0; return } program.uniforms.uTime.value = t * 0.001; renderer!.render({ scene: mesh }); raf = requestAnimationFrame(loop) }
    resize(); io.observe(host); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', onVis); raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis); try { gl.canvas.remove() } catch {}; try { gl.getExtension('WEBGL_lose_context')?.loseContext() } catch {} }
  }, [])
  return <div ref={ref} className="hse-ab-hero__bg" aria-hidden="true" style={{ background: 'linear-gradient(135deg,var(--ab-brand-light),var(--ab-brand))' }} />
}

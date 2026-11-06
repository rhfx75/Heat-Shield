import { useEffect, useRef } from 'react';

type Ember = { x:number;y:number;vx:number;vy:number;life:number;max:number;r:number;h:number };
export default function EmberField({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const mobile = window.innerWidth < 768;
    const count = Math.round((mobile ? 24 : 72) * density);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w=0,h=0, raf=0, visible=true, paused=document.hidden;
    const mouse = { x:-9999,y:-9999 };
    // sprite
    const sp = document.createElement('canvas'); sp.width=sp.height=32; const sx=sp.getContext('2d')!;
    const g=sx.createRadialGradient(16,16,0,16,16,16); g.addColorStop(0,'rgba(255,230,170,1)'); g.addColorStop(.25,'rgba(255,179,0,.95)'); g.addColorStop(.55,'rgba(255,61,0,.5)'); g.addColorStop(1,'rgba(255,61,0,0)');
    sx.fillStyle=g; sx.fillRect(0,0,32,32);
    const embers: Ember[] = [];
    const spawn = (e?: Ember): Ember => {
      const em = e || ({} as Ember);
      em.x = Math.random()*w; em.y = h + Math.random()*h*0.2; em.vx = -6 + Math.random()*10; em.vy = -(18 + Math.random()*38);
      em.max = em.life = 3 + Math.random()*4; em.r = 1 + Math.random()*3; em.h = 20 + Math.random()*28; return em;
    };
    const resize = () => { w=c.clientWidth; h=c.clientHeight; c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); if(!embers.length) for(let i=0;i<count;i++){ const e=spawn(); e.y=Math.random()*h; embers.push(e);} };
    resize(); window.addEventListener('resize', resize);
    const onMove=(e:PointerEvent)=>{ const r=c.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; };
    const onLeave=()=>{ mouse.x=mouse.y=-9999; };
    window.addEventListener('pointermove', onMove, {passive:true}); c.addEventListener('pointerleave', onLeave);
    const io=new IntersectionObserver(([e])=>{ visible=e.isIntersecting; if(visible&&!paused&&!raf) raf=requestAnimationFrame(loop); },{threshold:.01}); io.observe(c);
    const onVis=()=>{ paused=document.hidden; if(!paused&&visible&&!raf) raf=requestAnimationFrame(loop); }; document.addEventListener('visibilitychange',onVis);
    let last=performance.now();
    const loop=(now:number)=>{
      if(!visible||paused){ raf=0; return; }
      const dt=Math.min(.033,(now-last)/1000); last=now;
      ctx.clearRect(0,0,w,h); ctx.globalCompositeOperation='lighter';
      for(const e of embers){
        e.life -= dt; if(e.life<=0||e.y<-20){ spawn(e); continue; }
        const dx=e.x-mouse.x, dy=e.y-mouse.y, d2=dx*dx+dy*dy; if(d2<14400){ const d=Math.sqrt(d2)||1; e.vx += (dx/d)*18*dt; e.vy += (dy/d)*10*dt; }
        e.vx += Math.sin(now*0.001 + e.h)*4*dt - 2*dt; e.x += e.vx*dt; e.y += e.vy*dt;
        const a = Math.max(0, Math.min(1, (e.life/e.max)*1.1));
        const s = e.r*(0.7+0.6*(e.life/e.max))*6;
        ctx.globalAlpha = a*0.85; ctx.drawImage(sp, e.x-s/2, e.y-s/2, s, s);
      }
      ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return ()=>{ cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener('visibilitychange',onVis); window.removeEventListener('resize',resize); window.removeEventListener('pointermove',onMove); c.removeEventListener('pointerleave',onLeave); };
  }, [density]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

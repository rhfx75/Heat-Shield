import { useEffect, useRef } from 'react'
export function HeroEmbers() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let w=0,h=0,dpr=1,raf=0,dead=false,paused=false
    type P={x:number;y:number;r:number;vy:number;vx:number;a:number;life:number;max:number;warm:boolean}
    let parts:P[]=[]
    const make=(yRand:boolean):P=>({x:Math.random()*w,y:yRand?Math.random()*h:h+6,r:1+Math.random()*2,vy:-(0.18+Math.random()*0.45),vx:(Math.random()-.5)*0.28,a:.25+Math.random()*.55,life:0,max:260+Math.random()*220,warm:Math.random()>.35})
    const resize=()=>{ dpr=Math.min(window.devicePixelRatio||1,2); const r=c.getBoundingClientRect(); w=r.width; h=r.height; c.width=Math.max(1,Math.floor(w*dpr)); c.height=Math.max(1,Math.floor(h*dpr)); ctx.setTransform(dpr,0,0,dpr,0,0); const n=window.innerWidth<768?30:50; parts=Array.from({length:n},()=>make(true)) }
    const onVis=()=>{ paused=document.hidden; if(!paused&&!raf&&!dead) raf=requestAnimationFrame(loop) }
    const loop=()=>{
      if(dead||paused){ raf=0; return }
      ctx.clearRect(0,0,w,h)
      for(let i=0;i<parts.length;i++){ const p=parts[i]; p.life++; p.y+=p.vy; p.x+=Math.sin(p.life*0.018)*0.35+p.vx; const k=p.life/p.max; const alpha=p.a*(k<.15?k/.15:k>.75?(1-k)/.25:1); ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.warm?'rgba(255,176,120,'+alpha+')':'rgba(255,255,255,'+(alpha*.85)+')'; ctx.fill(); if(p.y<-8||p.life>=p.max) parts[i]=make(false) }
      raf=requestAnimationFrame(loop)
    }
    resize(); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', onVis); raf=requestAnimationFrame(loop)
    return ()=>{ dead=true; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  return <canvas ref={ref} className="hse-he" aria-hidden="true" />
}

import { useEffect, useRef } from 'react';

type Node = { x:number;y:number };
type Pulse = { a:number;b:number;t:number;speed:number };
export default function DetectionNetwork({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const nodes: Node[] = [{x:8,y:18},{x:18,y:72},{x:88,y:14},{x:92,y:68},{x:78,y:38},{x:28,y:38},{x:50,y:86},{x:72,y:82}];
    const edges: [number,number][] = [[0,5],[5,1],[1,6],[6,7],[7,3],[3,2],[2,4],[4,5],[4,7]];
    const ns = 'http://www.w3.org/2000/svg';
    const g = svg.querySelector('#hse-net')!; g.innerHTML='';
    for (const [a,b] of edges){ const l=document.createElementNS(ns,'line'); l.setAttribute('x1',`${nodes[a].x}%`); l.setAttribute('y1',`${nodes[a].y}%`); l.setAttribute('x2',`${nodes[b].x}%`); l.setAttribute('y2',`${nodes[b].y}%`); l.setAttribute('stroke','#7BB6FF'); l.setAttribute('stroke-width','1'); l.setAttribute('opacity','.35'); g.appendChild(l); }
    const rings: {el:SVGCircleElement;t:number}[] = [];
    for (const n of nodes){ const c=document.createElementNS(ns,'circle'); c.setAttribute('cx',`${n.x}%`); c.setAttribute('cy',`${n.y}%`); c.setAttribute('r','4'); c.setAttribute('fill','#2B7FE6'); c.setAttribute('stroke','#DCEEFF'); c.setAttribute('stroke-width','1'); g.appendChild(c); }
    const pulseDot = document.createElementNS(ns,'circle'); pulseDot.setAttribute('r','3.2'); pulseDot.setAttribute('fill','#FF3D00'); pulseDot.setAttribute('opacity','0'); g.appendChild(pulseDot);
    let pulse: Pulse = { a:0,b:5,t:0,speed:.35 }; let raf=0,last=performance.now(),visible=true,paused=document.hidden;
    const pick=()=>{ const e=edges[Math.floor(Math.random()*edges.length)]; pulse={a:e[0],b:e[1],t:0,speed:.28+Math.random()*.25}; pulseDot.setAttribute('opacity','.95'); };
    const ring=(i:number)=>{ const r=document.createElementNS(ns,'circle'); r.setAttribute('cx',`${nodes[i].x}%`); r.setAttribute('cy',`${nodes[i].y}%`); r.setAttribute('r','4'); r.setAttribute('fill','none'); r.setAttribute('stroke','#FF3D00'); r.setAttribute('stroke-width','1.2'); g.appendChild(r); rings.push({el:r,t:0}); };
    const io=new IntersectionObserver(([e])=>{ visible=e.isIntersecting; if(visible&&!paused&&!raf) raf=requestAnimationFrame(loop); },{threshold:.01}); io.observe(svg);
    const onVis=()=>{ paused=document.hidden; if(!paused&&visible&&!raf) raf=requestAnimationFrame(loop); }; document.addEventListener('visibilitychange',onVis);
    const loop=(now:number)=>{
      if(!visible||paused){ raf=0; return; }
      const dt=Math.min(.04,(now-last)/1000); last=now;
      pulse.t += dt*pulse.speed; const tt=Math.min(1,pulse.t);
      const x=nodes[pulse.a].x+(nodes[pulse.b].x-nodes[pulse.a].x)*tt; const y=nodes[pulse.a].y+(nodes[pulse.b].y-nodes[pulse.a].y)*tt;
      pulseDot.setAttribute('cx',`${x}%`); pulseDot.setAttribute('cy',`${y}%`);
      if(pulse.t>=1){ ring(pulse.b); pulseDot.setAttribute('opacity','0'); if(Math.random()<.85) setTimeout(pick, 700+Math.random()*1200); else pick(); }
      for(let i=rings.length-1;i>=0;i--){ const R=rings[i]; R.t+=dt; R.el.setAttribute('r', String(4+R.t*42)); R.el.setAttribute('opacity', String(Math.max(0, .8-R.t*1.4))); if(R.t>0.7){ R.el.remove(); rings.splice(i,1);} }
      raf=requestAnimationFrame(loop);
    };
    pick(); raf=requestAnimationFrame(loop);
    return ()=>{ cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener('visibilitychange',onVis); };
  }, []);
  return <svg ref={ref} className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g id="hse-net"/></svg>;
}

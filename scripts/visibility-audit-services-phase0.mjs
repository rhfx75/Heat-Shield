import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const base='http://localhost:5174';
const routes=['/services'];
const widths=[375,768,1440];
const outDir=path.resolve('audit');
await fs.mkdir(outDir,{recursive:true});
function parseColor(c){ if(!c) return null; const m=c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(',').map(v=>parseFloat(v.trim())); return {r:p[0]??0,g:p[1]??0,b:p[2]??0,a:p[3]??1}; }
function srgb(x){ x/=255; return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4); }
function lum(c){ return 0.2126*srgb(c.r)+0.7152*srgb(c.g)+0.0722*srgb(c.b); }
function contrast(fg,bg){ if(!fg||!bg) return null; const L1=Math.max(lum(fg),lum(bg)), L2=Math.min(lum(fg),lum(bg)); return (L1+0.05)/(L2+0.05); }
const browser = await chromium.launch({headless:true});
const report=[];
for(const width of widths){
  const c=await browser.newContext({viewport:{width,height:900}});
  const p=await c.newPage();
  for(const route of routes){
    await p.goto(base+route,{waitUntil:'domcontentloaded',timeout:45000});
    await p.waitForTimeout(2200);
    const rows=await p.evaluate(()=>{
      const vw=document.documentElement.clientWidth,vh=document.documentElement.clientHeight;
      function effOpacity(el){let o=1,n=el;while(n&&n.nodeType===1){o*=parseFloat(getComputedStyle(n).opacity||'1');n=n.parentElement;}return o;}
      function effBg(el){let n=el;while(n&&n.nodeType===1){const cs=getComputedStyle(n),bg=cs.backgroundColor,m=bg&&bg.match(/rgba?\(([^)]+)\)/); if(m){const p=m[1].split(',').map(v=>parseFloat(v.trim())); if((p[3]??1)>0.001) return {bg,hasImage:(cs.backgroundImage||'none')!=='none'};} if((cs.backgroundImage||'none')!=='none') return {bg:'rgba(0,0,0,0)',hasImage:true,unknown:true}; n=n.parentElement;} return {bg:'rgba(255,255,255,1)',hasImage:false};}
      function sel(el){const parts=[];let n=el;for(let i=0;n&&i<4&&n.nodeType===1;i++){let s=n.tagName.toLowerCase(); if(n.id)s+='#'+n.id; else if(n.classList&&n.classList.length)s+='.'+[...n.classList].slice(0,2).join('.'); parts.unshift(s); n=n.parentElement;} return parts.join(' > ');}
      const out=[],walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),seen=new WeakSet(); let t;
      while((t=walker.nextNode())){ const text=(t.textContent||'').replace(/\s+/g,' ').trim(); if(!text) continue; const el=t.parentElement; if(!el||seen.has(el)) continue; seen.add(el); const cs=getComputedStyle(el); if(cs.display==='none') continue; const r=el.getBoundingClientRect(); if(r.width<=0||r.height<=0) continue; const bg=effBg(el); out.push({text:text.slice(0,50),color:cs.color,fill:cs.webkitTextFillColor,opacity:cs.opacity,effectiveOpacity:Number(effOpacity(el).toFixed(4)),visibility:cs.visibility,bg:bg.bg,bgImage:bg.hasImage,bgUnknown:!!bg.unknown,fontSize:cs.fontSize,fontWeight:cs.fontWeight,rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)],selector:sel(el)});} return out;
    });
    for(const row of rows){
      const fg=parseColor(row.fill && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(row.fill) && row.fill!=='currentcolor'?row.fill:row.color);
      const bg=parseColor(row.bg);
      const cr=row.bgUnknown||row.bgImage?null:contrast(fg,bg);
      const large=parseFloat(row.fontSize)>=24||(parseFloat(row.fontSize)>=18.66&&parseInt(row.fontWeight||'400',10)>=700);
      const threshold=large?3:4.5; const fails=[];
      if(row.effectiveOpacity<0.95) fails.push(`opacity ${row.effectiveOpacity}`);
      if(row.fill&&/rgba\(0,\s*0,\s*0,\s*0\)/.test(row.fill)) fails.push('text-fill transparent');
      if(row.visibility==='hidden') fails.push('visibility hidden');
      if(row.rect[2]===0||row.rect[3]===0) fails.push('zero box');
      if(cr!==null&&cr<threshold) fails.push(`contrast ${cr.toFixed(2)} < ${threshold}`);
      if(fails.length) report.push({route,width,contrast:cr?Number(cr.toFixed(2)):null,threshold,fails,...row});
    }
    console.log('services',width,'fails',report.filter(r=>r.width===width).length);
  }
  await c.close();
}
await browser.close();
await fs.writeFile(path.join(outDir,'services-phase0-audit.json'),JSON.stringify(report,null,2));
console.log('FAILS',report.length);

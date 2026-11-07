import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = 'http://localhost:5174';
const routes = ['/about'];
const widths = [375, 768, 1440];
const outDir = path.resolve('audit');
await fs.mkdir(outDir, { recursive: true });

function parseColor(c){ if(!c) return null; const m=c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(',').map(v=>parseFloat(v.trim())); return {r:p[0]??0,g:p[1]??0,b:p[2]??0,a:p[3]??1}; }
function srgb(x){ x/=255; return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4); }
function lum(c){ return 0.2126*srgb(c.r)+0.7152*srgb(c.g)+0.0722*srgb(c.b); }
function contrast(fg,bg){ if(!fg||!bg) return null; const L1=Math.max(lum(fg),lum(bg)), L2=Math.min(lum(fg),lum(bg)); return (L1+0.05)/(L2+0.05); }

const browser = await chromium.launch({ headless: true });
const report = [];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  for (const route of routes) {
    const name = `about-only-${width}`;
    await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2200);
    await page.evaluate(async()=>{ const h=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight); const step=Math.max(280,window.innerHeight*0.7); for(let y=0;y<=h;y+=step){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,180)); } window.scrollTo(0,0); await new Promise(r=>setTimeout(r,300)); });
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true }).catch(()=>{});
    const rows = await page.evaluate(()=>{
      function effOpacity(el){ let o=1, n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n); o*=parseFloat(cs.opacity||'1'); n=n.parentElement; } return o; }
      function p(c){ const m=c&&c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const a=m[1].split(',').map(v=>parseFloat(v.trim())); return {r:a[0]??0,g:a[1]??0,b:a[2]??0,a:a[3]??1}; }
      function over(f,b){ const a=f.a+(b.a||1)*(1-f.a); if(a<=0) return {r:255,g:255,b:255,a:1}; return {r:(f.r*f.a+b.r*(b.a||1)*(1-f.a))/a,g:(f.g*f.a+b.g*(b.a||1)*(1-f.a))/a,b:(f.b*f.a+b.b*(b.a||1)*(1-f.a))/a,a}; }
      function effBg(el){ const layers=[]; let hasImage=false, n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n); if((cs.backgroundImage||'none')!=='none') hasImage=true; const c=p(cs.backgroundColor); if(c && c.a>0.001) layers.push(c); n=n.parentElement; } let bg={r:255,g:255,b:255,a:1}; for(let i=layers.length-1;i>=0;i--) bg=over(layers[i],bg); return {bg:`rgba(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)}, 1)`, hasImage, unknown:hasImage}; }
      function sel(el){ const parts=[]; let n=el; for(let i=0;n&&i<4&&n.nodeType===1;i++){ let s=n.tagName.toLowerCase(); if(n.classList&&n.classList.length) s+='.'+[...n.classList].slice(0,2).join('.'); parts.unshift(s); n=n.parentElement; } return parts.join(' > '); }
      const out=[]; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let t; const seen=new WeakSet();
      while((t=walker.nextNode())){ const text=(t.textContent||'').replace(/\s+/g,' ').trim(); if(!text) continue; const el=t.parentElement; if(!el||seen.has(el)) continue; seen.add(el); const cs=getComputedStyle(el); if(cs.display==='none') continue; const r=el.getBoundingClientRect(); if(r.width<=0||r.height<=0) continue; const bg=effBg(el); out.push({text:text.slice(0,60), color:cs.color, fill:cs.webkitTextFillColor, opacity:cs.opacity, effectiveOpacity:Number(effOpacity(el).toFixed(4)), visibility:cs.visibility, bg:bg.bg, bgImage:bg.hasImage, bgUnknown:!!bg.unknown, fontSize:cs.fontSize, fontWeight:cs.fontWeight, selector:sel(el)}); }
      return out;
    });
    for (const row of rows) {
      const fg=parseColor(row.fill && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(row.fill) && row.fill!=='currentcolor' ? row.fill : row.color);
      const bg=parseColor(row.bg); const cr = row.bgUnknown || row.bgImage ? null : contrast(fg,bg);
      const large = parseFloat(row.fontSize)>=24 || (parseFloat(row.fontSize)>=18.66 && parseInt(row.fontWeight||'400',10)>=700);
      const threshold = large ? 3 : 4.5; const fails=[];
      if (row.effectiveOpacity < 0.95) fails.push(`opacity ${row.effectiveOpacity}`);
      if (row.visibility==='hidden') fails.push('visibility hidden');
      if (cr!==null && cr < threshold) fails.push(`contrast ${cr.toFixed(2)} < ${threshold}`);
      if (fails.length) report.push({route,width,contrast:cr?Number(cr.toFixed(2)):null,threshold,fails,...row});
    }
    console.log('about', width, 'fails', report.filter(r=>r.width===width).length);
  }
  await context.close();
}
await browser.close();
await fs.writeFile(path.join(outDir,'about-audit.json'), JSON.stringify(report,null,2));
const md = [`# About audit`, `Fails: ${report.length}`,'', ...report.slice(0,120).map(r=>`- [${r.width}] ${r.fails.join('; ')} | "${r.text}" | ${r.selector}`)].join('\n');
await fs.writeFile(path.join(outDir,'about-audit.md'), md);
console.log('FAILS', report.length);

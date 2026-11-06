import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = 'http://localhost:5174';
const routes = [
  '/', '/about', '/services', '/services/fire-protection-system-design',
  '/products', '/products/fire-protection', '/products/diesel-engine-fire-pump-set',
  '/brands', '/brands/naffco', '/projects', '/projects/fakir-eco-knitwears',
  '/contact', '/resources', '/product-catalogues'
];
const widths = [375, 768, 1440];
const outDir = path.resolve('audit');
await fs.mkdir(outDir, { recursive: true });

function parseColor(c){ if(!c) return null; const m=c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(',').map(v=>parseFloat(v.trim())); return {r:p[0]??0,g:p[1]??0,b:p[2]??0,a:p[3]??1}; }
function srgb(x){ x/=255; return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4); }
function lum(c){ return 0.2126*srgb(c.r)+0.7152*srgb(c.g)+0.0722*srgb(c.b); }
function contrast(fg,bg){ if(!fg||!bg) return null; const L1=Math.max(lum(fg),lum(bg)), L2=Math.min(lum(fg),lum(bg)); return (L1+0.05)/(L2+0.05); }

const exec = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const browser = await chromium.launch({ headless: true, executablePath: exec || undefined });
const report = [];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  for (const route of routes) {
    const name = (route === '/' ? 'home' : route.replace(/^\//,'').replace(/[\/?#]+/g,'_')) + '-' + width;
    let navOk = true, navErr = '';
    try { await page.goto(base + route, { waitUntil: 'networkidle', timeout: 45000 }); }
    catch(e){ navOk=false; navErr=String(e.message||e); try{ await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:45000}); }catch{} }
    try {
      await page.evaluate(async()=>{ const h=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight); const step=Math.max(300,window.innerHeight*0.8); for(let y=0;y<=h;y+=step){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); } window.scrollTo(0,0); });
    } catch {}
    await page.waitForTimeout(1500);
    const shot = path.join(outDir, `${name}.png`);
    await page.screenshot({ path: shot, fullPage: true }).catch(()=>{});
    const rows = await page.evaluate(()=>{
      const vw=document.documentElement.clientWidth, vh=document.documentElement.clientHeight;
      function effOpacity(el){ let o=1, n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n); o*=parseFloat(cs.opacity||'1'); n=n.parentElement; } return o; }
      function effBg(el){ let n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n); const bg=cs.backgroundColor; const m=bg&&bg.match(/rgba?\(([^)]+)\)/); if(m){ const p=m[1].split(',').map(v=>parseFloat(v.trim())); if((p[3]??1)>0.001) return {bg, hasImage:(cs.backgroundImage||'none')!=='none'}; } if((cs.backgroundImage||'none')!=='none') return {bg:'rgba(0,0,0,0)', hasImage:true, unknown:true}; n=n.parentElement; } return {bg:'rgba(255,255,255,1)',hasImage:false}; }
      function sel(el){ const parts=[]; let n=el; for(let i=0;n&&i<4&&n.nodeType===1;i++){ let s=n.tagName.toLower(); if(n.id) s+='#'+n.id; else if(n.classList&&n.classList.length) s+='.'+[...n.classList].slice(0,2).join('.'); parts.unshift(s); n=n.parentElement; } return parts.join(' > '); }
      const out=[]; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      let t; const seen=new WeakSet();
      while((t=walker.nextNode())){
        const text=(t.textContent||'').replace(/\s+/g,' ').trim(); if(!text) continue;
        const el=t.parentElement; if(!el||seen.has(el)) continue; seen.add(el);
        const cs=getComputedStyle(el); if(cs.display==='none') continue;
        const r=el.getBoundingClientRect(); if(r.width<=0||r.height<=0) continue;
        const eo=effOpacity(el); const bg=effBg(el);
        out.push({text:text.slice(0,40), color:cs.color, fill:cs.webkitTextFillColor, strokeW:cs.webkitTextStrokeWidth, stroke:cs.webkitTextStrokeColor, opacity:cs.opacity, effectiveOpacity:Number(eo.toFixed(4)), visibility:cs.visibility, bg:bg.bg, bgImage:bg.hasImage, bgUnknown:!!bg.unknown, display:cs.display, zIndex:cs.zIndex, position:cs.position, fontSize:cs.fontSize, fontWeight:cs.fontWeight, inViewport:(r.bottom>=0&&r.right>=0&&r.top<=vh&&r.left<=vw), rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)], selector:sel(el)});
      }
      return out;
    }).catch(e=>([{error:String(e.message||e)}]));
    for (const row of rows) {
      if (row.error) { report.push({route,width,fail:['eval-error'],...row}); continue; }
      const fg=parseColor(row.fill && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(row.fill) && row.fill!=='currentcolor' ? row.fill : row.color);
      const bg=parseColor(row.bg);
      const cr = row.bgUnknown || row.bgImage ? null : contrast(fg,bg);
      const large = parseFloat(row.fontSize)>=24 || (parseFloat(row.fontSize)>=18.66 && parseInt(row.fontWeight||'400',10)>=700);
      const threshold = large ? 3 : 4.5;
      const fails=[];
      if (row.effectiveOpacity < 0.95) fails.push(`opacity ${row.effectiveOpacity}`);
      if (row.fill && /rgba\(0,\s*0,\s*0,\s*0\)/.test(row.fill)) fails.push('text-fill transparent');
      if (row.visibility==='hidden') fails.push('visibility hidden');
      if (row.rect[2]===0||row.rect[3]===0) fails.push('zero box');
      if (cr!==null && cr < threshold) fails.push(`contrast ${cr.toFixed(2)} < ${threshold}`);
      if (fails.length) report.push({route,width,contrast:cr?Number(cr.toFixed(2)):null,threshold,fails,screenshot:path.basename(shot),...row});
    }
    console.log('done', route, width, 'fails', report.filter(r=>r.route===route&&r.width===width).length, navOk?'':'NAV:'+navErr);
  }
  await context.close();
}
await browser.close();
await fs.writeFile(path.join(outDir,'report.json'), JSON.stringify(report,null,2));
const byCause = {};
for (const r of report) for (const f of r.fails||[]) { (byCause[f.split(' ')[0]] ||= []).push(r); }
let md = `# Visibility audit\n\nRoutes: ${routes.length}, widths: ${widths.join(',')}, total fails: ${report.length}\n\n## By cause\n`;
for (const [k,v] of Object.entries(byCause).sort((a,b)=>b[1].length-a[1].length)) md += `- ${k}: ${v.length}\n`;
md += `\n## Home failures (key sections)\n`;
for (const r of report.filter(r=>r.route==='/' && /Why|Choose|Engineering|Quality|Responsive|Practical|Fire Safety|facility|Request|Quote|WhatsApp/i.test(r.text)).slice(0,80)) md += `- [${r.width}] ${r.fails.join('; ')} | "${r.text}" | fg ${r.fill||r.color} | bg ${r.bg} ${r.bgUnknown?'(unknown image)':''} | ${r.selector}\n`;
md += `\n## Sample other failures\n`;
for (const r of report.filter(r=>r.route!=='/').slice(0,120)) md += `- [${r.route} ${r.width}] ${r.fails.join('; ')} | "${r.text}" | fg ${r.fill||r.color} | bg ${r.bg} ${r.bgUnknown?'(unknown image)':''} | ${r.selector}\n`;
await fs.writeFile(path.join(outDir,'report.md'), md);
console.log('FAILS', report.length, 'report', path.join(outDir,'report.md'));

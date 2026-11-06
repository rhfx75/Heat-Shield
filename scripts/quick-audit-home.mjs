import { chromium } from 'playwright';
const base='http://localhost:5174';
const exec=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const browser=await chromium.launch({headless:true, executablePath: exec||undefined});
const targets=/Why Choose Us|Why Heat Shield Engineering|Professional Engineering Approach|Quality-Focused Installation|Responsive After-Sales Support|Practical Safety Solutions|Need a Fire Safety Solution\?|Need fire detection, fire protection or utility products for your facility\?|Talk to our engineers|Request a Quote|Get a Free Quote|WhatsApp/i;
for(const width of [375,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForTimeout(2000);
  await page.screenshot({path:`audit/home-focus-${width}.png`,fullPage:true});
  const rows=await page.evaluate((reSrc)=>{
    const re=new RegExp(reSrc,'i');
    function effOpacity(el){ let o=1,n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n); o*=parseFloat(cs.opacity||'1'); n=n.parentElement;} return o; }
    function effBg(el){ let n=el; while(n&&n.nodeType===1){ const cs=getComputedStyle(n); const bg=cs.backgroundColor; const m=bg&&bg.match(/rgba?\(([^)]+)\)/); if(m){ const p=m[1].split(',').map(v=>parseFloat(v.trim())); if((p[3]??1)>0.001) return bg; } if((cs.backgroundImage||'none')!=='none') return 'IMAGE:'+cs.backgroundImage.slice(0,80); n=n.parentElement;} return 'rgba(255,255,255,1)'; }
    function pathOf(el){ const a=[]; let n=el; for(let i=0;n&&i<5&&n.nodeType===1;i++){ let s=n.tagName.toLowerCase(); if(n.id) s+='#'+n.id; else if(n.className&&typeof n.className==='string') s+='.'+n.className.trim().split(/\s+/).slice(0,2).join('.'); a.unshift(s); n=n.parentElement;} return a.join(' > '); }
    const out=[]; const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let t;
    while((t=w.nextNode())){ const text=(t.textContent||'').replace(/\s+/g,' ').trim(); if(!text||!re.test(text)) continue; const el=t.parentElement; if(!el) continue; const cs=getComputedStyle(el); const r=el.getBoundingClientRect(); out.push({text:text.slice(0,80), color:cs.color, fill:cs.webkitTextFillColor, stroke:cs.webkitTextStrokeWidth, opacity:cs.opacity, effectiveOpacity:Number(effOpacity(el).toFixed(4)), visibility:cs.visibility, display:cs.display, bg:effBg(el), font:cs.fontSize+'/'+cs.fontWeight, rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)], path:pathOf(el)}); }
    return out;
  }, targets.source);
  console.log('\n===', width, '===');
  for(const r of rows) console.log(JSON.stringify(r));
  await page.close();
}
await browser.close();

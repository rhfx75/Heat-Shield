import { chromium } from 'playwright';
import fs from 'fs';
const base = 'http://127.0.0.1:5174';
const routes = [{p:'/',n:'home'},{p:'/about',n:'about'},{p:'/services',n:'services'},{p:'/products',n:'products'},{p:'/projects',n:'projects'},{p:'/brands',n:'brands'},{p:'/contact',n:'contact'},{p:'/services/fire-detection-alarm-installation',n:'service_detail'},{p:'/products/addressable-fire-alarm-control-panel',n:'product_detail'}];
const viewports = [[360,800],[390,844],[430,932],[768,1024],[1280,800],[1440,900],[1920,1080]];
(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const [w,h] of viewports) {
    const page = await browser.newPage({ viewport: { width:w, height:h } });
    for (const r of routes) {
      await page.goto(base + r.p, { waitUntil: 'networkidle', timeout: 45000 }).catch(()=>{});
      await page.waitForTimeout(500);
      const m = await page.evaluate(() => {
        const sw = document.documentElement.scrollWidth, cw = document.documentElement.clientWidth;
        const bad = []; document.querySelectorAll('body *').forEach(el=>{ const r=el.getBoundingClientRect(); if(r.width>0 && (r.right>cw+2 || r.left<-2)) bad.push({t:el.tagName,id:el.id,cl:(el.className||'').toString().slice(0,60),right:Math.round(r.right),w:Math.round(r.width)}); });
        return { overflow: sw>cw+1, sw, cw, offenders: bad.slice(0,5) };
      });
      results.push({vp:`${w}x${h}`, route:r.n, ...m});
    }
    await page.close();
  }
  fs.mkdirSync('audit/responsive-before', {recursive:true});
  fs.writeFileSync('audit/responsive-before/overflow.json', JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.filter(r=>r.overflow).slice(0,40),null,2));
  console.log('total routes:', results.length, 'overflow:', results.filter(r=>r.overflow).length);
  await browser.close();
})();

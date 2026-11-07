import { chromium } from 'playwright';
import fs from 'fs';
const base = 'http://127.0.0.1:5174';
const routes = [{p:'/',n:'home'},{p:'/services',n:'services'},{p:'/about',n:'about'},{p:'/products',n:'products'},{p:'/contact',n:'contact'},{p:'/services/fire-detection-alarm-installation',n:'svc_detail'},{p:'/products/addressable-fire-alarm-control-panel',n:'prod_detail'}];
const vps = [[360,800],[390,844],[768,1024],[1440,900]];
(async () => {
  const browser = await chromium.launch();
  const rows=[];
  for (const [w,h] of vps) {
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
    const page = await ctx.newPage();
    for (const r of routes) {
      await page.goto(base+r.p,{waitUntil:'networkidle',timeout:45000}).catch(()=>{});
      await page.waitForTimeout(500);
      const m = await page.evaluate(()=>{ const sw=document.documentElement.scrollWidth,cw=document.documentElement.clientWidth; const off=[...document.querySelectorAll('body *')].filter(el=>{const b=el.getBoundingClientRect();return b.width>8&&(b.right>cw+2||b.left<-2)}).slice(0,4).map(el=>({t:el.tagName,id:el.id,cl:(el.className||'').toString().slice(0,70),r:Math.round(el.getBoundingClientRect().right),cw})); return {overflow:sw>cw+1,sw,cw,off}; });
      rows.push({vp:w+'x'+h,route:r.n,...m});
      fs.mkdirSync(`audit/responsive-before/${w}x${h}`,{recursive:true});
      await page.screenshot({path:`audit/responsive-before/${w}x${h}/${r.n}.png`,fullPage:false}).catch(()=>{});
    }
    await ctx.close();
  }
  fs.writeFileSync('audit/responsive-before/summary.json',JSON.stringify(rows,null,2));
  console.log(JSON.stringify(rows.filter(r=>r.overflow),null,2));
  console.log('checked',rows.length,'overflow',rows.filter(r=>r.overflow).length);
  await browser.close();
})();

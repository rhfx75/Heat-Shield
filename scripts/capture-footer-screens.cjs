const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const [w,h,name] of [[1440,900,'footer-std-1440'],[375,812,'footer-std-375'],[768,1024,'footer-std-768']]) {
    const page = await browser.newPage({ viewport:{width:w,height:h} });
    await page.goto('http://localhost:5174/', { waitUntil:'domcontentloaded', timeout:60000 });
    await page.waitForTimeout(1500);
    await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
    await page.waitForTimeout(900);
    await page.screenshot({ path:`audit/${name}.png`, fullPage:false });
    await page.close();
  }
  await browser.close();
  console.log('screenshots ok');
})().catch(e=>{ console.error(e); process.exit(1); });

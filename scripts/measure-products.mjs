import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = 'http://localhost:5174';
const outDir = path.resolve('audit');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(base + '/products', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(async () => {
  const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 360) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 350));
});

const data = await page.evaluate(() => {
  function rect(el) { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }
  function rel(el, card) { if (!el || !card) return null; const r = el.getBoundingClientRect(); const c = card.getBoundingClientRect(); return Math.round(r.y - c.y); }
  function clipped(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    const scrollClip = (el.scrollHeight - el.clientHeight > 2 || el.scrollWidth - el.clientWidth > 2) && (s.overflow !== 'visible' || s.overflowY !== 'visible' || s.overflowX !== 'visible');
    return scrollClip && r.height > 0;
  }
  const cards = [...document.querySelectorAll('article[id^="product-"]')];
  const rows = cards.map(card => {
    const slug = card.id.replace('product-', '');
    const imgWrap = card.querySelector('a[href^="/products/"] div, a[href^="/products/"]')?.closest('div[style*="aspect-ratio"], div[style*="aspectRatio"]') || card.querySelector('div[style*="aspect-ratio"]');
    const img = card.querySelector('img');
    const chipsRow = card.querySelector('div[style*="flex-wrap"]');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const btnRow = [...card.querySelectorAll('div')].find(d => d.querySelector('a[href*="/products/"]') && d.querySelector('button'));
    return {
      slug,
      cardRect: rect(card),
      imageStageRect: rect(imgWrap),
      renderedImageRect: rect(img),
      natural: img ? { w: img.naturalWidth, h: img.naturalHeight, src: (img.currentSrc || img.src).slice(0, 120), complete: img.complete } : null,
      y: {
        chips: rel(chipsRow, card),
        title: rel(title, card),
        description: rel(desc, card),
        buttons: rel(btnRow, card),
      },
      clipped: { title: clipped(title), description: clipped(desc), chips: clipped(chipsRow) },
    };
  });

  const heading = document.querySelector('#hse-pr-title');
  const pill = [...document.querySelectorAll('span')].find(s => (s.textContent || '').trim() === 'OUR PRODUCTS');
  function cause(el) {
    if (!el) return null;
    const parts = [];
    let n = el;
    for (let i = 0; i < 5 && n && n.nodeType === 1; i++) {
      const cs = getComputedStyle(n);
      parts.push({ tag: n.tagName.toLowerCase(), class: n.className || '', bg: cs.backgroundColor, bgImage: cs.backgroundImage, border: cs.border, boxShadow: cs.boxShadow, rect: rect(n) });
      n = n.parentElement;
    }
    return parts;
  }
  const stray = [...document.querySelectorAll('button,span,div')].filter(el => {
    const t = (el.textContent || '').trim();
    return t === 'Compare' || t === 'Added';
  }).slice(0, 3).map(el => {
    const r = el.getBoundingClientRect();
    const near = [...document.querySelectorAll('*')].filter(n => {
      if (n === el || el.contains(n) || n.contains(el)) return false;
      const cs = getComputedStyle(n);
      const nr = n.getBoundingClientRect();
      return Math.abs(nr.x - (r.right + 6)) < 24 && Math.abs(nr.y - r.y) < 18 && nr.width < 60 && nr.height < 4;
    }).map(n => ({ tag: n.tagName.toLowerCase(), class: n.className, rect: rect(n), bg: getComputedStyle(n).background, border: getComputedStyle(n).border }));
    return { text: (el.textContent||'').trim(), rect, cause: cause(el), near };
  });

  return { count: cards.length, rows, hero: { headingBg: cause(heading), pillBg: cause(pill) }, strayCompare: stray };
});

await page.screenshot({ path: path.join(outDir, 'products-before-1440.png'), fullPage: true }).catch(() => {});
await browser.close();
await fs.writeFile(path.join(outDir, 'products-before.json'), JSON.stringify(data, null, 2));
console.log(JSON.stringify({ count: data.count, stages: data.rows.slice(0,3).map(r=>r.imageStageRect), heroHeading: data.hero?.headingBg?.[0], heroPill: data.hero?.pillBg?.[0], stray: data.strayCompare }, null, 2));

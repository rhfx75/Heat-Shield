import fs from 'fs'
import path from 'path'

const root = process.cwd()
const productsPath = path.join(root, 'src', 'data', 'products.ts')
const src = fs.readFileSync(productsPath, 'utf8')

// --- extract products array text by bracket matching (string-aware) ---
const startKey = 'export const products'
const endKey = 'export const catalogueDocuments'
const a = src.indexOf(startKey)
const b = src.indexOf(endKey)
if (a < 0 || b < 0 || b <= a) throw new Error('cannot locate products array boundaries')
const chunk = src.slice(a, b)
const eq = chunk.indexOf('=')
const open = chunk.indexOf('[', eq >= 0 ? eq : 0)
let depth = 0, endRel = -1
for (let i = open; i < chunk.length; i++) {
  const c = chunk[i]
  if (c === '[') depth++
  else if (c === ']') { depth--; if (depth === 0) { endRel = i; break } }
  else if (c === "'" || c === '"' || c === '`') {
    const q = c; i++
    while (i < chunk.length) {
      if (chunk[i] === '\\') i += 2
      else if (chunk[i] === q) break
      else i++
    }
  }
}
if (endRel < 0) throw new Error('cannot find products array end')
const arrText = chunk.slice(open, endRel + 1)

// Evaluate in a tiny sandbox by providing referenced identifiers used as values in data.
const sandbox = {
  company: { name: 'Heat Shield Engineering' },
  whatsAppConfig: { baseUrl: 'https://wa.me/8801954823265', getMessage: (n) => n },
}
const products = Function('company', 'whatsAppConfig', `"use strict"; return (${arrText});`)(sandbox.company, sandbox.whatsAppConfig)
if (!Array.isArray(products)) throw new Error('products did not evaluate to array')

// --- category facets from product data (authoritative for counts) + declared categories from source text ---
const categoryCounts = {}
const subCounts = {}
const brandCounts = {}
const availabilityCounts = {}
const imgLocal = []
const imgExternal = []
const imgMissing = []
const certTokens = new Set()
const dupNames = {}
for (const p of products) {
  const cat = p.category || '(missing)'
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  const sub = p.subcategory || '(none)'
  subCounts[`${cat} :: ${sub}`] = (subCounts[`${cat} :: ${sub}`] || 0) + 1
  const brand = (p.brand && String(p.brand).trim()) || '(missing)'
  brandCounts[brand] = (brandCounts[brand] || 0) + 1
  const avail = p.availability || '(missing)'
  availabilityCounts[avail] = (availabilityCounts[avail] || 0) + 1
  const img = p.image
  if (img == null || img === '') imgMissing.push(p.slug || p.id)
  else if (/^https?:\/\//i.test(String(img))) imgExternal.push({ slug: p.slug, host: (()=>{try{return new URL(img).host}catch{return 'invalid'}})(), image: img })
  else imgLocal.push({ slug: p.slug, image: img })
  const keyName = String(p.name || '').trim().toLowerCase()
  if (keyName) dupNames[keyName] = (dupNames[keyName] || 0) + 1
  for (const f of [p.shortDescription, p.description, p.name]) {
    const t = String(f || '')
    for (const m of t.match(/\b(UL|FM|NFPA|LPCB|BS|EN|ISO|CE)\b[^\s,;)]{0,18}/g) || []) certTokens.add(m)
  }
  for (const s of p.specifications || []) {
    const t = `${s?.label||''} ${s?.value||''}`
    for (const m of t.match(/\b(UL|FM|NFPA|LPCB|BS|EN|ISO|CE)\b[^\s,;)]{0,18}/g) || []) certTokens.add(m)
  }
  for (const c of p.certifications || []) for (const m of String(c).match(/\b(UL|FM|NFPA|LPCB|BS|EN|ISO|CE)\b[^\s,;)]{0,18}/g) || []) certTokens.add(m)
}

const topCats = [...src.slice(0, a).matchAll(/key:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*label:\s*'([^']+)'/g)].map(m=>({key:m[1],slug:m[2],label:m[3]}))
const declaredCategories = topCats.filter((c,i,a)=>a.findIndex(x=>x.key===c.key)===i)

const idSeen = new Map(), slugSeen = new Map()
for (const p of products) {
  if (p.id) idSeen.set(p.id, (idSeen.get(p.id)||0)+1)
  if (p.slug) slugSeen.set(p.slug, (slugSeen.get(p.slug)||0)+1)
}
const duplicateIds = [...idSeen].filter(([,n])=>n>1).map(([k,n])=>({id:k,count:n}))
const duplicateSlugs = [...slugSeen].filter(([,n])=>n>1).map(([k,n])=>({slug:k,count:n}))
const duplicateNameList = Object.entries(dupNames).filter(([,n])=>n>1).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name))

const sampleSlugs = new Set(['diesel-engine-fire-pump-set','conventional-fire-alarm-panel','hochiki-chq-zc'])
for (const cat of Object.keys(categoryCounts)) { const f = products.find(p=>p.category===cat); if (f) sampleSlugs.add(f.slug) }
for (const p of products.filter(p=>/^https?:\/\//.test(String(p.image||''))).slice(0,2)) sampleSlugs.add(p.slug)
for (const p of products.filter(p=>p.image && !/^https?:\/\//.test(String(p.image))).slice(0,2)) sampleSlugs.add(p.slug)
const samples = [...sampleSlugs].map(slug=>products.find(p=>p.slug===slug)).filter(Boolean).slice(0,12).map(p=>({
  id:p.id, slug:p.slug, name:p.name, category:p.category, subcategory:p.subcategory||null,
  brand:p.brand||null, model:p.model||null, availability:p.availability||null,
  image:p.image||null, imageHost: p.image && /^https?:/.test(p.image)?(()=>{try{return new URL(p.image).host}catch{return null}})(): (p.image? 'local': null),
  shortDescription:(p.shortDescription||'').slice(0,140), description:(p.description||'').slice(0,140),
  specCount:(p.specifications||[]).length, featured:!!p.featured,
}))

function walk(d){ if(!fs.existsSync(d)) return []; return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]) }
const imgRoot = path.join(root,'public','images','products')
const files = walk(imgRoot)
const ext = {}
let thumb=0
for (const f of files){ const e=(path.extname(f).slice(1)||'?').toLowerCase(); ext[e]=(ext[e]||0)+1; if(f.includes(`${path.sep}thumbs${path.sep}`)) thumb++ }
const extHosts = {}
for (const x of imgExternal) extHosts[x.host]=(extHosts[x.host]||0)+1

const out = {
  generatedAt: new Date().toISOString(),
  sourceFile: 'src/data/products.ts',
  note: 'Phase 0.2 discovery audit only. No product data edited. Counts derived from current file; verify before future destructive actions.',
  totals: { products: products.length, categoriesReferenced: Object.keys(categoryCounts).length, brands: Object.keys(brandCounts).filter(b=>b!=='(missing)').length, localImageAssetFiles: files.length, localThumbFiles: thumb },
  declaredTopLevelCategoriesBestEffort: declaredCategories,
  facets: {
    categoryCounts: Object.fromEntries(Object.entries(categoryCounts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))),
    subcategoryCounts: Object.fromEntries(Object.entries(subCounts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))),
    availabilityCounts,
    topBrands: Object.entries(brandCounts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,40),
  },
  images: {
    localRefCount: imgLocal.length,
    externalRefCount: imgExternal.length,
    missingRefCount: imgMissing.length,
    externalHosts: extHosts,
    missingSample: imgMissing.slice(0,30),
    localAssetExtCounts: ext,
  },
  duplicates: { duplicateIds, duplicateSlugs, duplicateNames: duplicateNameList },
  certTokensFromExistingFields: [...certTokens].sort(),
  samples12: samples,
  issues: [
    ...duplicateIds.length? [`duplicate ids: ${duplicateIds.length}`]:[],
    ...duplicateSlugs.length? [`duplicate slugs: ${duplicateSlugs.length}`]:[],
    ...duplicateNameList.length? [`duplicate names (case-insensitive): ${duplicateNameList.length}`]:[],
    `image refs: ${imgLocal.length} local, ${imgExternal.length} external, ${imgMissing.length} missing/null`,
    `brand missing: ${brandCounts['(missing)']||0}; model missing: ${products.filter(p=>!p.model).length}`,
  ],
}
const outPath = path.join(root,'data','audit','products-audit.json')
fs.mkdirSync(path.dirname(outPath),{recursive:true})
fs.writeFileSync(outPath, JSON.stringify(out,null,2)+'\n','utf8')
console.log(JSON.stringify({ok:true,outPath, products:out.totals.products, categories:Object.keys(categoryCounts).length, missing:imgMissing.length, external:imgExternal.length, localRefs:imgLocal.length, dupIds:duplicateIds.length, dupSlugs:duplicateSlugs.length, dupNames:duplicateNameList.length},null,2))

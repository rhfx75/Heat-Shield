import fs from 'fs';
import path from 'path';

const root = 'E:/Heat-Shield-Engineering';
const srcPath = path.join(root, 'src', 'data', 'products.ts');
const outDir = path.join(root, 'data', 'enrichment');
const cacheDir = path.join(outDir, 'cache');
const { execFileSync } = await import('child_process');
const APPLY = process.argv.includes('--apply-level2');
fs.mkdirSync(cacheDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const raw = fs.readFileSync(srcPath, 'utf8');

function parseProducts(text) {
  const slugRe = /"slug"\s*:\s*"[^"]+"/g; let m; const objs = []; const seen = new Set();
  while ((m = slugRe.exec(text))) {
    let a = text.lastIndexOf('{', m.index); if (a < 0) continue;
    const pre = text.slice(a, m.index); if (!/"id"\s*:/.test(pre)) continue;
    if (seen.has(a)) continue; seen.add(a);
    let d = 0, end = a, inS = false, esc = false, q = '';
    for (let j = a; j < text.length; j++) {
      const c = text[j];
      if (inS) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === q) inS = false; continue; }
      if (c === '"' || c === "'") { inS = true; q = c; continue; }
      if (c === '{') d++; else if (c === '}') { d--; if (d === 0) { end = j + 1; break; } }
    }
    try { const o = JSON.parse(text.slice(a, end)); if (o.id && o.slug && o.name) objs.push(o); } catch(e){}
  }
  return objs;
}

const products = parseProducts(raw);
console.log('parsed', products.length);

function isEmpty(v) { if (v == null) return true; const s = String(v).trim(); return s === '' || ['-', '—', 'n/a', 'na', 'not specified', 'unspecified', 'null'].includes(s.toLowerCase()); }
function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

const existingBrands = [...new Set(products.map(p => p.brand).filter(b => !isEmpty(b)).map(b => String(b).trim()))].sort();
const brandAllow = existingBrands.filter(b => b.length <= 30 && !/^NAFFCO \(authorized/.test(b));
brandAllow.push('NAFFCO'); // normalize form exists? keep simple; NAFFCO already present
const brandSet = [...new Set(brandAllow)].sort((a,b)=>b.length-a.length);
const changes = []; const proposedByIdField = new Set(); const unresolved = [];

function addChange(p, field, oldValue, newValue, method, evidence, sourceRef, confidence, needsReview) {
  if (isEmpty(newValue)) return; const key = p.id + '|' + field; if (proposedByIdField.has(key)) return;
  if (!isEmpty(p[field])) return; proposedByIdField.add(key);
  changes.push({ id: p.id, slug: p.slug, name: p.name, field, oldValue: p[field] ?? '', newValue, method, evidence: String(evidence).slice(0,200), sourceRef: sourceRef || '', confidence, needsReview: !!needsReview });
}
function addDisplay(p, displayName, evidence, confidence, needsReview) {
  if (!displayName || displayName === p.name) return; const key = p.id + '|displayName'; if (proposedByIdField.has(key)||!isEmpty(p.displayName)) return;
  proposedByIdField.add(key); changes.push({ id: p.id, slug: p.slug, name: p.name, field:'displayName', oldValue: p.displayName||'', newValue: displayName, method:'name-brand', evidence, sourceRef:'', confidence, needsReview:!!needsReview });
}

// 1b brand from name
for (const p of products) {
  if (!isEmpty(p.brand)) continue;
  const name = p.name || ''; let found = null, why = '';
  const paren = name.match(/\(([A-Za-z][A-Za-z0-9 &.-]{1,28})\)\s*$/);
  if (paren) { const tok = paren[1].trim(); const hit = brandSet.find(b => b.toLowerCase() === tok.toLowerCase()); if (hit) { found = hit; why = `brand "${tok}" in name parens`; } }
  if (!found) {
    for (const b of brandSet) {
      if (b.length < 2) continue;
      const re = new RegExp('(^|[^A-Za-z0-9])' + b.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '([^A-Za-z0-9]|$)', 'i');
      if (re.test(name)) { found = b; why = `known brand "${b}" as whole word in name`; break; }
    }
  }
  if (found) addChange(p,'brand',p.brand,found,'name-brand',why,'product.name','high',false);
}

// displayName for ALL CAPS
const KEEP = /\b(UL|FM|ULC|LPCB|NFPA|HVAC|PLC|HMI|PTEL|EAE|BBT|IP|AC|DC|LED|CCTV|VFD|ROV|ROR|HRL|CHQ|NFS2|VDF|BS|EN|ANSI|HP|RPM|PSI|NPT|USGPM|BAR|K\d+|SA|TR)\b/;
for (const p of products) {
  const letters = String(p.name||'').replace(/[^A-Za-z]/g,'');
  if (letters.length>3 && letters===letters.toUpperCase()) {
    let dn = p.name.toLowerCase().replace(/\b([a-z])/g, (m,c,off,s)=> (off===0||/[\s(\-\/]/.test(s[off-1])) ? c.toUpperCase() : m);
    // restore known acronyms/codes
    dn = dn.replace(/\bUl\b/g,'UL').replace(/\bFm\b/g,'FM').replace(/\bUlc\b/g,'ULC').replace(/\bLpcb\b/g,'LPCB').replace(/\bNfpa\b/g,'NFPA').replace(/\bHvac\b/g,'HVAC').replace(/\bPlc\b/g,'PLC').replace(/\bHmi\b/g,'HMI').replace(/\bCctv\b/g,'CCTV').replace(/\bLed\b/g,'LED').replace(/\bIp(\d+)/gi,'IP$1').replace(/\bBbt\b/g,'BBT').replace(/\bEae\b/g,'EAE').replace(/\bTr\b/g,'TR').replace(/\bSa\b/g,'SA').replace(/\bHr\b/g,'HR').replace(/\bW\b(?=\s|$|-)/g,'W').replace(/\bK(\d+)\b/g,'K$1');
    addDisplay(p, dn, 'ALL CAPS name -> displayName sentence case; acronyms/codes best-effort preserved (needs review)', 'medium', true);
  }
}

// 1c model from name
for (const p of products) {
  if (!isEmpty(p.model)) continue;
  const name = String(p.name||'');
  let m = null, evidence = '', needsReview = true;
  let mm = name.match(/\b(?:Model|Series)\s*[:#-]?\s*([A-Za-z0-9][A-Za-z0-9./-]{1,30})/i);
  if (mm) { m = mm[1]; evidence = `token after Model/Series in name: "${m}"`; }
  if (!m) {
    const tokens = name.split(/[^A-Za-z0-9./-]+/).filter(Boolean);
    const candidates = tokens.filter(t => /[A-Za-z]/.test(t) && /\d/.test(t) && t.length>=2 && t.length<=24 && !/^(ul|fm|nfpa)$/i.test(t));
    if (candidates.length === 1) { m = candidates[0]; evidence = `single letters+digits token in name: "${m}"`; }
    else if (candidates.length > 1) {
      const end = name.match(/[-–—]\s*([A-Za-z]*\d[\w./-]*)\s*$/);
      if (end && candidates.some(c=>c.toLowerCase()===end[1].toLowerCase())) { m = candidates.find(c=>c.toLowerCase()===end[1].toLowerCase()); evidence = `trailing code token in name: "${m}"`; }
      else { unresolved.push({id:p.id,name:p.name,slug:p.slug,missing:(isEmpty(p.brand)&&!proposedByIdField.has(p.id+'|brand')?'brand; ':'')+'model',reason:`ambiguous model tokens in name: ${candidates.join(', ')}; no guess`,confidence:'n/a'}); continue; }
    }
  }
  if (m) {
    const kLike = /^K-?\d+$/i.test(m);
    if (kLike) evidence += '; may be K-factor/rating, not model (needs review)';
    addChange(p,'model',p.model,m,'name-model',evidence,'product.name','medium',true);
  }
}

// Level 2 PTEL fetch (opt-in)
function fetchViaPS(url) {
  const crypto = require('crypto');
  const cacheFile = path.join(cacheDir, crypto.createHash('sha1').update(url).digest('hex') + '.html');
  if (fs.existsSync(cacheFile)) return { cacheFile, ok: true, cached: true };
  const ps = `$h=@{'User-Agent'='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36';'Accept'='text/html,application/xhtml+xml'}; try{ $r=Invoke-WebRequest -Uri '${url.replace(/'/g,"''")}' -UseBasicParsing -Headers $h -TimeoutSec 25; [IO.File]::WriteAllText('${cacheFile.replace(/\\/g,'/').replace(/'/g,"''")}', $r.Content, [Text.UTF8Encoding]::new($false)); 'OK' } catch { 'ERR '+$_.Exception.Message }`;
  try { const out = execFileSync('powershell.exe',['-NoProfile','-Command',ps],{encoding:'utf8',timeout:50000,stdio:['ignore','pipe','pipe']}).trim(); if(out.startsWith('OK')) return {cacheFile,ok:true}; return {ok:false,error:out}; }
  catch(e){ return {ok:false,error:String(e.message||e)}; }
}
let fetchErr=0;
if (APPLY) {
  for (const p of products) {
    const img=String(p.image||''); if(!img.includes('ptel.com.bd') && !String(p.id).startsWith('ptel-')) continue;
    if(!isEmpty(p.brand) && !isEmpty(p.model)) continue;
    if(fetchErr>=3) break;
    const url=`https://ptel.com.bd/product/${p.slug}`;
    const res=fetchViaPS(url); if(!res.ok){fetchErr++; continue;}
    const html=fs.readFileSync(res.cacheFile,'utf8');
    const text=(x)=>String(x||'').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
    const all=text(html);
    const bm=all.match(/\b(?:Brand|Manufacturer)\s*[:\-]\s*([A-Za-z0-9][A-Za-z0-9 &.-]{1,40})/); if(bm && isEmpty(p.brand)) addChange(p,'brand',p.brand,bm[1].trim(),'source',`Brand/Manufacturer label: "${bm[1].trim().slice(0,40)}"`,url,'high',false);
    const mm=all.match(/\bModel(?:\s+No\.?)?\s*[:\-]\s*([A-Za-z0-9][A-Za-z0-9 ,/().-]{1,60})/); if(mm && isEmpty(p.model)) addChange(p,'model',p.model,mm[1].trim().replace(/\s{2,}/g,' '),'source',`Model label: "${mm[1].trim().slice(0,60)}"`,url,'high',false);
    execFileSync('powershell.exe',['-NoProfile','-Command','Start-Sleep -Milliseconds 1100'],{stdio:'ignore'});
  }
}

// unresolved
const ukey=new Set();
for (const p of products) {
  const miss=[]; if(isEmpty(p.brand)&&!proposedByIdField.has(p.id+'|brand')) miss.push('brand'); if(isEmpty(p.model)&&!proposedByIdField.has(p.id+'|model')) miss.push('model');
  if(!miss.length) continue;
  const k=p.id+'|'+miss.join(','); if(ukey.has(k)) continue; ukey.add(k);
  const img=String(p.image||'');
  const generic=/electrical motor|end suction|eye wash|positioner|fog light|duct detector|fire pump controller|valve|sprinkler|hose|coupling|cabinet|sign|light|bell|switch|gauge|hanger|nipple|union|tee|elbow|reducer|flange/i.test(p.name);
  let reason = img.includes('ptel.com.bd') ? 'PTEL product: no explicit brand/model label found/proposed in dry run; needs Level 2 source verification' : img.includes('nesbd.com') ? 'NESBD source detail page unreadable/unverified here; needs working product URL or supplier catalog' : 'no usable source';
  if (generic && miss.includes('brand')) reason = 'generic product; ' + reason;
  if (p.name.match(/\([^)]+\)$/) && miss.includes('brand')) reason = 'parenthesized token not in existing brand allowlist; ' + reason;
  if (/ambiguous model tokens/.test((unresolved.find(u=>u.id===p.id)||{}).reason||'')) continue;
  unresolved.push({id:p.id,name:p.name,slug:p.slug,missing:miss.join('; '),reason,confidence:'n/a'});
}
// keep earlier ambiguous-model unresolved entries

function csv(v){ const s=String(v??''); return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }
function writeCsv(file, rows, cols){ fs.writeFileSync(file,[cols.join(','),...rows.map(r=>cols.map(c=>csv(r[c])).join(','))].join('\n')+'\n','utf8'); }

const summary={generatedAt:new Date().toISOString(),mode:APPLY?'level1+level2-ptel':'dry-run-level1-only',productsParsed:products.length,existingBrands,changeCount:changes.length,byConfidence:{},byMethod:{},unresolvedCount:unresolved.length};
for(const c of changes){ summary.byConfidence[c.confidence]=(summary.byConfidence[c.confidence]||0)+1; summary.byMethod[c.method]=(summary.byMethod[c.method]||0)+1; }
fs.writeFileSync(path.join(outDir,'proposed-changes.json'), JSON.stringify({...summary,changes},null,2));
writeCsv(path.join(outDir,'changes-report.csv'), [...changes].sort((a,b)=>(a.confidence||'').localeCompare(b.confidence||'')||a.name.localeCompare(b.name)), ['id','name','field','oldValue','newValue','evidence','confidence','method','sourceRef','needsReview']);
writeCsv(path.join(outDir,'unresolved.csv'), unresolved, ['id','name','slug','missing','reason','confidence']);
fs.writeFileSync(path.join(outDir,'summary.json'), JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));

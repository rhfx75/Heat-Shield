import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
const root=process.cwd();
const args=process.argv.slice(2);
const apply=args.includes('--apply');
const dry=!apply || args.includes('--dry-run');
const conf=(args.find(a=>a.startsWith('--confidence='))||'--confidence=high').split('=')[1].split(',').map(s=>s.trim());
const idsArg=(args.find(a=>a.startsWith('--ids='))||'').split('=')[1];
const ids=idsArg?new Set(idsArg.split(',').map(s=>s.trim()).filter(Boolean)):null;
const srcPath=path.join(root,'src/data/products.ts');
const propPath=path.join(root,'data/enrichment/proposed-changes.json');
if(!fs.existsSync(propPath)) throw new Error('missing '+propPath);
const proposed=JSON.parse(fs.readFileSync(propPath,'utf8'));
let changes=proposed.changes.filter(c=>conf.includes(c.confidence)&&!c.needsReview);
if(ids) changes=changes.filter(c=>ids.has(c.id));
if(dry){ console.log(JSON.stringify({dryRun:true,selected:changes.length,byConfidence:conf,ids:ids?[...ids]:null,example:changes.slice(0,10)},null,2)); process.exit(0); }
const raw=fs.readFileSync(srcPath,'utf8');
const backup=srcPath+'.pre-apply-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';
fs.writeFileSync(backup,raw);
// naive safe replace: only replace exact field occurrences inside the matching object by id is complex; require manual review/apply via dedicated merge if schema varies. For safety, refuse auto-apply except known simple cases.
console.error('REFUSED: automatic live merge is not enabled in this dry-run batch. Review data/enrichment/changes-report.csv and apply approved high-confidence changes with a reviewed patch. Selected changes:', changes.length);
process.exit(2);

import fs from 'fs';
const t = fs.readFileSync('src/data/products.ts','utf8');
const prodCats = [...t.matchAll(/category: '([^']+)'/g)].map(m=>m[1]);
const subCats = [...t.matchAll(/subcategory: '([^']+)'/g)].map(m=>m[1]);
const unknown = prodCats.filter(c=>!['fire-protection-system','fire-detection-system','fire-rated-doors','passive-fire-protection','electrical-safety'].includes(c));
console.log('products with category not matching 5 canonical keys:', unknown.length);
const freq = {};
unknown.forEach(c=>freq[c]=(freq[c]||0)+1);
console.log(freq);

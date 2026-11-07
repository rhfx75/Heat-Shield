import type { Product, ProductCategory } from './products'

export type CatalogCategory = { slug: string; name: string; key: string; icon?: string; description?: string; order: number }
export type CatalogProduct = Product & { categorySlug: string; categoryName: string; _uncategorized?: boolean }
export type Catalog = { products: CatalogProduct[]; categories: CatalogCategory[]; uncategorized: { id: string; slug?: string; name: string; rawCategory: string }[]; duplicateIds: string[]; duplicateSlugs: string[]; issues: string[] }

export function normKey(v: unknown): string {
  return String(v ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/s+/g, ' ')
}

// Explicit alias map (normalized key -> canonical category key/slug)
const CATEGORY_ALIASES: Record<string, string> = {
  // normalized forms for the 5 canonical categories
  'fire protection system': 'fire-protection-system',
  'fire protection': 'fire-protection-system',
  'fire detection and alarm system': 'fire-detection-system',
  'fire detection alarm system': 'fire-detection-system',
  'fire detection system': 'fire-detection-system',
  'fire detection': 'fire-detection-system',
  'fire detection and alarm': 'fire-detection-system',
  'fire rated doors and emergency exit solutions': 'fire-rated-doors',
  'fire rated doors emergency exit solutions': 'fire-rated-doors',
  'fire rated doors': 'fire-rated-doors',
  'passive fire protection system': 'passive-fire-protection',
  'passive fire protection': 'passive-fire-protection',
  'electrical and lightning safety system': 'electrical-safety',
  'electrical lightning safety system': 'electrical-safety',
  'electrical and lightning safety': 'electrical-safety',
  'electrical safety': 'electrical-safety',
}

function findDups(values: string[]) {
  const seen = new Set<string>(); const dups = new Set<string>()
  for (const v of values) { if (!v) continue; if (seen.has(v)) dups.add(v); else seen.add(v) }
  return [...dups]
}

export function normalizeCatalog(rawProducts: Product[], rawCategories: ProductCategory[]): Catalog {
  const issues: string[] = []
  const canonical = rawCategories.map((c, order) => {
    const cat: CatalogCategory = { slug: c.slug, name: c.label, key: c.key, icon: c.icon, description: c.description, order }
    return cat
  })
  // build lookup by key, slug, normalized name/key/slug
  const byAny = new Map<string, CatalogCategory>()
  for (const c of canonical) {
    for (const v of [c.key, c.slug, normKey(c.key), normKey(c.slug), normKey(c.name)]) byAny.set(v, c)
  }
  for (const [alias, key] of Object.entries(CATEGORY_ALIASES)) {
    const c = canonical.find(x => x.key === key)
    if (c) byAny.set(normKey(alias), c)
  }

  const uncategorized: Catalog['uncategorized'] = []
  const products: CatalogProduct[] = rawProducts.map((p) => {
    const rawCat = p.category || ''
    const c = byAny.get(rawCat) || byAny.get(normKey(rawCat))
    if (!c) {
      uncategorized.push({ id: p.id, slug: p.slug, name: p.name, rawCategory: rawCat })
      return { ...p, categorySlug: 'uncategorized', categoryName: 'Uncategorized', _uncategorized: true }
    }
    return { ...p, categorySlug: c.slug, categoryName: c.name }
  })

  const duplicateIds = findDups(rawProducts.map(p => p.id).filter(Boolean))
  const duplicateSlugs = findDups(rawProducts.map(p => p.slug).filter(Boolean))
  if (duplicateIds.length) issues.push('Duplicate product ids: ' + duplicateIds.join(', '))
  if (duplicateSlugs.length) issues.push('Duplicate product slugs: ' + duplicateSlugs.join(', '))
  if (uncategorized.length) issues.push('Uncategorized products: ' + uncategorized.map(u => u.id).join(', '))

  return { products, categories: canonical, uncategorized, duplicateIds, duplicateSlugs, issues }
}

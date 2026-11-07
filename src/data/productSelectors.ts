import { findCategory, productCategories, products } from './products'
import type { Product } from './products'

export type ProductsSort = 'featured' | 'name-asc' | 'name-desc' | 'brand'
export type ProductsStatusFilter = '' | 'all' | 'in-stock' | 'inquiry-required'

export type ProductsQuery = {
  q: string
  category: string
  subcategory: string
  brand: string
  model: string
  status: ProductsStatusFilter
  cert: string
  sort: ProductsSort
}

const CERT_RE = /\b(UL(?:[\s-]?(?:\d+|listed|FM))?|FM(?:[\s-]?\d+|[\s-]?200)?|NFPA(?:[\s-]?\d+)?|LPCB|BS\s?\d*|EN\s?\d*|ISO\s?\d*|CE)\b/gi

export function normalizeText(v: unknown): string {
  return String(v ?? '').toLowerCase().replace(/\s+/g, ' ').trim()
}

export function productCertTokens(p: Product): string[] {
  const found = new Set<string>()
  const chunks: string[] = [p.name, p.shortDescription, p.description, ...(p.certifications || [])]
  for (const s of p.specifications || []) chunks.push(`${s?.label || ''} ${s?.value || ''}`)
  for (const t of chunks) {
    for (const m of String(t || '').match(CERT_RE) || []) found.add(m.replace(/\s+/g, ' ').trim().toUpperCase())
  }
  return [...found]
}

export function matchesCategory(p: Product, category: string): boolean {
  if (!category) return true
  const cat = findCategory(p.category)
  return p.category === category || cat?.slug === category || cat?.key === category
}

export function matchesStatus(p: Product, status: ProductsStatusFilter): boolean {
  if (!status || status === 'all') return true
  if (status === 'in-stock') return p.availability === 'available'
  if (status === 'inquiry-required') return p.availability === 'inquiry-required' || !p.availability || p.availability === 'not-specified'
  return true
}

export function matchesQuery(p: Product, query: ProductsQuery): boolean {
  if (!matchesCategory(p, query.category)) return false
  if (query.subcategory && p.subcategory !== query.subcategory) return false
  if (query.brand && normalizeText(p.brand) !== normalizeText(query.brand)) return false
  if (query.model && normalizeText(p.model) !== normalizeText(query.model)) return false
  if (!matchesStatus(p, query.status)) return false
  if (query.cert) {
    const needle = normalizeText(query.cert)
    const certs = productCertTokens(p).map(normalizeText)
    if (!certs.some((c) => c.includes(needle) || needle.includes(c))) return false
  }
  const q = normalizeText(query.q)
  if (!q) return true
  const hay = [p.name, p.brand, p.model, p.shortDescription, p.description, p.subcategory, p.category, ...(p.keywords || [])]
    .filter(Boolean)
    .map(normalizeText)
    .join(' | ')
  return hay.includes(q)
}

export function sortProducts(list: Product[], sort: ProductsSort): Product[] {
  const out = [...list]
  out.sort((a, b) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name)
    if (sort === 'name-desc') return b.name.localeCompare(a.name)
    if (sort === 'brand') return (a.brand || '\uffff').localeCompare(b.brand || '\uffff') || a.name.localeCompare(b.name)
    return Number(!!b.featured) - Number(!!a.featured) || a.name.localeCompare(b.name)
  })
  return out
}

export function getProducts(query: ProductsQuery): Product[] {
  return sortProducts(products.filter((p) => matchesQuery(p, query)), query.sort)
}

export function getProductFacets() {
  const brands = Array.from(new Set(products.map((p) => p.brand?.trim()).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))
  const models = Array.from(new Set(products.map((p) => p.model?.trim()).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))
  const certs = Array.from(new Set(products.flatMap(productCertTokens))).sort((a, b) => a.localeCompare(b))
  const categories = productCategories.map((c) => ({
    key: c.key,
    slug: c.slug,
    label: c.label,
    count: products.filter((p) => matchesCategory(p, c.key)).length,
  }))
  return { brands, models, certs, categories, total: products.length }
}

export { products, productCategories }

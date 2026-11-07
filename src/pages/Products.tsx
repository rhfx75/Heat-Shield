import { useEffect, useMemo, useState, type SyntheticEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { whatsappLink } from '../data/company'
import { findCategory, productCategories, products, productImage } from '../data/products'
import type { Product } from '../data/products'
import { ProductInquiryForm } from '../components/ProductInquiryForm'
import '../graphics/products/products-base.css'

type SortKey = 'featured' | 'name-asc' | 'name-desc' | 'brand'
const SORTS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A to Z' },
  { value: 'name-desc', label: 'Name Z to A' },
  { value: 'brand', label: 'Brand' },
]
/* Display-only: cleans pasted source fragments; never mutates product data. */
function cleanDescription(text?: string | null): string {
  if (!text) return ''
  let t = String(text).replace(/\s+/g, ' ').trim()
  t = t.replace(/\(?\s*(as\s+)?listed(\s+by\s+source)?\s*\)?\.?$/i, '').trim()
  t = t.replace(/\(?\s*by\s+source\s*\)?\.?$/i, '').trim()
  return t
}

function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget
  if (t.dataset.broken === '1') return
  t.dataset.broken = '1'
  t.removeAttribute('srcset')
  t.onerror = null
  const wrap = t.closest('.hse-pr-plate') as HTMLElement | null
  if (wrap) wrap.classList.add('is-missing')
  t.removeAttribute('src')
  t.alt = ''
}

function specValue(v?: string | null): string {
  const s = (v ?? '').toString().trim()
  if (!s || s === '—' || s === '-' || /^n\/?a$/i.test(s)) return 'Not specified'
  return s
}

function inStockLabel(p: Product) {
  if (p.availability === 'available') return 'In stock'
  if (p.availability === 'inquiry-required') return 'Inquiry required'
  return 'Not specified'
}

export function Products({ category: initialCategory }: { category?: string }) {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || sp.get('search') || ''
  const category = sp.get('category') || initialCategory || ''
  const subcategory = sp.get('subcategory') || ''
  const brand = sp.get('brand') || ''
  const model = sp.get('model') || ''
  const availability = sp.get('availability') || ''
  const sort = (sp.get('sort') as SortKey) || 'featured'
  const [localQ, setLocalQ] = useState(q)
  const [quote, setQuote] = useState<Product | null>(null)

  const patch = (next: Record<string, string>, replace = false) => {
    const n = new URLSearchParams(sp)
    n.delete('search')
    Object.entries(next).forEach(([k, v]) => { if (v) n.set(k, v); else n.delete(k) })
    if (replace) setSp(n, { replace: true }); else setSp(n)
  }

  useEffect(() => { setLocalQ(q) }, [q])
  useEffect(() => { document.title = category ? `${findCategory(category)?.label || 'Category'} | Heat Shield Engineering` : 'All Products | Heat Shield Engineering' }, [category])

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand?.trim()).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b)), [])
  const models = useMemo(() => Array.from(new Set(products.map(p => p.model).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b)), [])
  const availOpts = useMemo(() => Array.from(new Set(products.map(p => p.availability).filter(Boolean) as string[])), [])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    let list = products.filter(p => {
      const cat = findCategory(p.category)
      if (category && p.category !== category && cat?.slug !== category && cat?.key !== category) return false
      if (subcategory && p.subcategory !== subcategory) return false
      if (brand && p.brand?.toLowerCase().trim() !== brand.toLowerCase().trim()) return false
      if (model && p.model !== model) return false
      if (availability && p.availability !== availability) return false
      if (t && ![p.name, p.brand, p.model, p.shortDescription, p.description, p.subcategory, p.category, ...(p.keywords || [])].filter(Boolean).some(v => String(v).toLowerCase().includes(t))) return false
      return true
    })
    list = [...list].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'brand') return (a.brand || 'ZZZ').localeCompare(b.brand || 'ZZZ') || a.name.localeCompare(b.name)
      return Number(!!b.featured) - Number(!!a.featured) || a.name.localeCompare(b.name)
    })
    return list
  }, [q, category, subcategory, brand, model, availability, sort])

  const categories = useMemo(() => productCategories.map(c => ({ key: c.key, slug: c.slug, label: c.label, count: products.filter(p => p.category === c.key).length })), [])
  const helpMsg = 'Hello Heat Shield Engineering, I would like help finding a suitable product. Please advise.'

  return (
    <div className="hse-pr-page">
      <header className="hse-pr-hero" data-surface="brand">
        <div className="hse-pr-wrap">
          <span className="hse-pr-kicker">OUR PRODUCTS</span>
          <h1>{category ? (findCategory(category)?.label || 'Products') : 'Fire safety equipment, specified and supplied'}</h1>
          <p>Browse our range of fire protection, fire detection, passive fire protection, and electrical safety products, then request a quote.</p>
          <div className="hse-pr-stats" aria-label="Product summary">
            <div><b>{products.length}</b><span>Products</span></div>
            <div><b>{productCategories.length}</b><span>Categories</span></div>
            <div><b>{brands.length}</b><span>Brands</span></div>
          </div>
        </div>
      </header>

      <div className="hse-pr-main">
        <aside className="hse-pr-aside" aria-label="Product filters">
          <h3>Search</h3>
          <label className="hse-pr-live" htmlFor="hse-pr-q">Search products</label>
          <input id="hse-pr-q" className="hse-pr-input" type="search" value={localQ} onChange={e => { setLocalQ(e.target.value); patch({ q: e.target.value }, true) }} placeholder="Name, brand or model" />
          <h3>Brand</h3>
          <select className="hse-pr-select" value={brand} onChange={e => patch({ brand: e.target.value })} aria-label="Brand filter"><option value="">All brands</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select>
          <h3>Model</h3>
          <select className="hse-pr-select" value={model} onChange={e => patch({ model: e.target.value })} aria-label="Model filter"><option value="">All models</option>{models.map(m => <option key={m} value={m}>{m}</option>)}</select>
          <h3>Availability</h3>
          <select className="hse-pr-select" value={availability} onChange={e => patch({ availability: e.target.value })} aria-label="Availability filter"><option value="">All</option>{availOpts.map(a => <option key={a} value={a}>{a === 'available' ? 'In stock' : a === 'inquiry-required' ? 'Inquiry required' : a}</option>)}</select>
          <h3>Categories</h3>
          <button type="button" className={`hse-pr-cat ${!category ? 'is-on' : ''}`} onClick={() => patch({ category: '', subcategory: '' })}>All products <em>{products.length}</em></button>
          {categories.map(c => (
            <button key={c.key} type="button" className={`hse-pr-cat ${category === c.key || category === c.slug ? 'is-on' : ''}`} onClick={() => patch({ category: c.key, subcategory: '' })}>{c.label} <em>{c.count}</em></button>
          ))}
          {(q || brand || model || availability || category || subcategory) ? <button type="button" className="hse-pr-cat" style={{ marginTop: 8 }} onClick={() => { setLocalQ(''); patch({ q: '', brand: '', model: '', availability: '', category: initialCategory || '', subcategory: '' }) }}>Clear filters</button> : null}
        </aside>

        <section aria-labelledby="hse-pr-results">
          <div className="hse-pr-bar" role="region" aria-label="Results">
            <span id="hse-pr-results" className="hse-pr-count" aria-live="polite">{filtered.length} products found</span>
            <label className="hse-pr-sort">Sort by{' '}
              <select value={sort} onChange={e => patch({ sort: e.target.value })} aria-label="Sort products">
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
          <div className="hse-pr-grid">
            {filtered.length ? filtered.map((p, i) => {
              const src = productImage(p, 960)
              const srcSet = productImage(p, 480) !== src && !String(src).startsWith('data:') ? `${productImage(p, 480)} 480w, ${src} 960w` : undefined
              const catLabel = findCategory(p.category)?.label || p.category
              const desc = cleanDescription(p.shortDescription || p.description)
              const eager = i < 3
              return (
                <article key={p.id} className="hse-pr-card">
                  <div className="hse-pr-plate">
                    <a href={`/products/${p.slug}`} aria-label={p.name}>
                      {src ? <img src={src} srcSet={srcSet} sizes="(max-width:820px) 92vw, 280px" onError={onImgError} alt={p.name} loading={eager ? 'eager' : 'lazy'} decoding="async" width="960" height="720" /> : null}
                    </a>
                    <div className="hse-pr-missing" aria-hidden="true">
                      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="11" width="34" height="26" rx="4"/><circle cx="18" cy="22" r="3.5"/><path d="M41 31l-9-9-7 7-4-4-14 12"/></svg>
                      <span>Image coming soon</span>
                    </div>
                    <span className="hse-pr-tag" title={catLabel}>{catLabel}</span>
                  </div>
                  <div className="hse-pr-body">
                    <h3 title={p.name}><a href={`/products/${p.slug}`}>{p.name}</a></h3>
                    <p className={`hse-pr-desc${desc ? '' : ' is-empty'}`}>{desc}</p>
                    <dl className="hse-pr-specs">
                      <div><dt>Brand</dt><dd className={specValue(p.brand) === 'Not specified' ? 'is-ns' : undefined}>{specValue(p.brand)}</dd></div>
                      <div><dt>Model</dt><dd className={specValue(p.model) === 'Not specified' ? 'is-ns' : undefined}>{specValue(p.model)}</dd></div>
                      <div><dt>Availability</dt><dd><span className={`hse-pr-avail ${p.availability === 'available' ? 'is-ok' : 'is-iq'}`}>{inStockLabel(p)}</span></dd></div>
                    </dl>
                    <div className="hse-pr-act">
                      <a className="hse-pr-p" href={`/products/${p.slug}`}>View details</a>
                      <button type="button" className="hse-pr-s" onClick={() => setQuote(p)}>Get quote</button>
                    </div>
                  </div>
                </article>
              )
            }) : (
              <div className="hse-pr-empty" data-surface="light">
                <h3>No products match</h3>
                <p>Clear a filter or search by a different name, brand, or model.</p>
                <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button type="button" className="hse-pr-cat" style={{ width: 'auto', borderLeft: '1px solid var(--pr-line)', borderRadius: 8, padding: '10px 14px' }} onClick={() => { setLocalQ(''); patch({ q: '', brand: '', model: '', availability: '', category: initialCategory || '', subcategory: '' }) }}>Clear filters</button>
                  <a className="hse-pr-cat" style={{ width: 'auto', borderLeft: '1px solid var(--pr-line)', borderRadius: 8, padding: '10px 14px', textDecoration: 'none' }} href={whatsappLink(helpMsg)} target="_blank" rel="noopener noreferrer">WhatsApp for help</a>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {quote && (
        <div className="hse-pr-modal-back" role="dialog" aria-modal="true" aria-label="Request a quote" onClick={() => setQuote(null)}>
          <div className="hse-pr-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
              <h2 style={{ margin: 0, font: '700 1.2rem/1.2 Montserrat,sans-serif', color: 'var(--pr-blue)' }}>Get Quote</h2>
              <button type="button" className="hse-pr-cat" style={{ width: 'auto', borderLeft: '1px solid var(--pr-line)', borderRadius: 8 }} onClick={() => setQuote(null)}>Close</button>
            </div>
            <ProductInquiryForm initialProductName={quote.name} initialProductModel={quote.model} />
          </div>
        </div>
      )}
    </div>
  )
}

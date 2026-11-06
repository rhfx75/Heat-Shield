import { useEffect, useMemo, useState, type SyntheticEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { whatsappLink } from '../data/company'
import { findCategory, productCategories, products, productImage, productImageOriginal } from '../data/products'
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
const FALLBACK_IMG = '/images/products/placeholder-product.svg'

function onImgError(e: SyntheticEvent<HTMLImageElement>, orig?: string) {
  const t = e.currentTarget
  if (t.dataset.step === '2') return
  t.removeAttribute('srcset')
  if (t.dataset.step !== '1' && orig && orig !== t.src && !orig.startsWith('data:image/svg')) { t.dataset.step = '1'; t.src = orig; return }
  t.dataset.step = '2'; t.onerror = null; t.alt = ''; t.src = FALLBACK_IMG
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
          <div className="hse-pr-bar">
            <span id="hse-pr-results" aria-live="polite">{filtered.length} products found</span>
            <label>Sort by{' '}
              <select value={sort} onChange={e => patch({ sort: e.target.value })} aria-label="Sort products">
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
          <div className="hse-pr-grid">
            {filtered.length ? filtered.map(p => {
              const src = productImage(p, 960)
              const srcOrig = productImageOriginal(p)
              const srcSet = productImage(p, 480) !== src && !String(src).startsWith('data:') ? `${productImage(p, 480)} 480w, ${src} 960w` : undefined
              const catLabel = findCategory(p.category)?.label || p.category
              return (
                <article key={p.id} className="hse-pr-card">
                  <div className="hse-pr-plate">
                    <span className="hse-pr-tag">{catLabel}</span>
                    <a href={`/products/${p.slug}`} aria-label={p.name}>
                      <img src={src} srcSet={srcSet} sizes="(max-width:820px) 92vw, 280px" onError={(e) => onImgError(e, srcOrig)} onLoad={(e) => { const t = e.currentTarget; if (t.complete && t.naturalWidth === 0) onImgError({ currentTarget: t } as SyntheticEvent<HTMLImageElement>, srcOrig) }} alt={p.name} loading="lazy" decoding="async" width="960" height="720" />
                    </a>
                  </div>
                  <div className="hse-pr-body">
                    <h3><a href={`/products/${p.slug}`}>{p.name}</a></h3>
                    <p className="hse-pr-desc">{p.shortDescription || p.description}</p>
                    <dl className="hse-pr-specs">
                      <div><dt>Brand</dt><dd>{p.brand || '\u2014'}</dd></div>
                      <div><dt>Model</dt><dd>{p.model || '\u2014'}</dd></div>
                      <div><dt>Availability</dt><dd className={p.availability === 'available' ? 'hse-pr-ok' : undefined}>{inStockLabel(p)}</dd></div>
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

import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode, type SyntheticEvent } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { whatsappLink } from '../data/company'
import { findCategory, getTotalProductCount, productImage } from '../data/products'
import type { Product } from '../data/products'
import { getProductFacets, getProducts, type ProductsSort, type ProductsStatusFilter } from '../data/productSelectors'
import { ProductInquiryForm } from '../components/ProductInquiryForm'
import ProductsHero from '../graphics/products/ProductsHero'
import '../graphics/products/products-base.css'

const PAGE_SIZE = 24
const SORTS: { value: ProductsSort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A to Z' },
  { value: 'name-desc', label: 'Name Z to A' },
  { value: 'brand', label: 'Brand' },
]

function cleanDescription(text?: string | null): string {
  if (!text) return ''
  let t = String(text).replace(/\s+/g, ' ').trim()
  t = t.replace(/\(?\s*(as\s+)?listed(\s+by\s+source)?\s*\)?\.?$/i, '').trim()
  t = t.replace(/\(?\s*by\s+source\s*\)?\.?$/i, '').trim()
  return t
}

function specValue(v?: string | null): string {
  const s = (v ?? '').toString().trim()
  if (!s || s === '—' || s === '-' || /^n\/?a$/i.test(s)) return 'Not specified'
  return s
}

function statusLabel(p: Product): string {
  if (p.availability === 'available') return 'In stock'
  if (p.availability === 'inquiry-required') return 'Inquiry required'
  return 'Availability not specified'
}

function onImgLoad(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.classList.add('is-loaded')
  e.currentTarget.closest('.hse-pr-plate')?.classList.add('is-ready')
}

function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget
  if (t.dataset.broken === '1') return
  t.dataset.broken = '1'
  t.removeAttribute('srcset')
  t.onerror = null
  const wrap = t.closest('.hse-pr-plate') as HTMLElement | null
  if (wrap) { wrap.classList.add('is-missing'); wrap.classList.add('is-ready') }
  t.removeAttribute('src')
  t.alt = ''
}

function FilterGroup({ title, count, children, defaultOpen = true }: { title: string; count?: number; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="hse-pr-group">
      <button type="button" className="hse-pr-group-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{title}{typeof count === 'number' ? <em className="hse-pr-group-count">{count}</em> : null}</span>
        <span className="hse-pr-group-chev" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open ? <div className="hse-pr-group-body">{children}</div> : null}
    </div>
  )
}

export function Products({ category: initialCategory }: { category?: string }) {
  const location = useLocation()
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || sp.get('search') || ''
  const category = sp.get('category') || initialCategory || ''
  const subcategory = sp.get('subcategory') || ''
  const brand = sp.get('brand') || ''
  const model = sp.get('model') || ''
  const status = (sp.get('status') || sp.get('availability') || '') as ProductsStatusFilter
  const cert = sp.get('cert') || ''
  const sort = ((sp.get('sort') as ProductsSort) || 'featured')
  const [localQ, setLocalQ] = useState(q)
  const deferredQ = useDeferredValue(localQ)
  const [quote, setQuote] = useState<Product | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const patch = (next: Record<string, string>, replace = false) => {
    const n = new URLSearchParams(sp)
    n.delete('search')
    Object.entries(next).forEach(([k, v]) => { if (v) n.set(k, v); else n.delete(k) })
    if (replace) setSp(n, { replace: true }); else setSp(n)
  }

  useEffect(() => { setLocalQ(q) }, [q])
  useEffect(() => { patch({ q: deferredQ }, true) }, [deferredQ]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setVisible(PAGE_SIZE) }, [q, category, subcategory, brand, model, status, cert, sort])
  useEffect(() => {
    document.title = category ? `${findCategory(category)?.label || 'Products'} | Heat Shield Engineering` : 'Products | Heat Shield Engineering'
  }, [category])
  useEffect(() => { setDrawer(false) }, [location.search])
  useEffect(() => {
    if (!drawer) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [drawer])

  const facets = useMemo(() => getProductFacets(), [])
  const filtered = useMemo(() => getProducts({ q, category, subcategory, brand, model, status, cert, sort }), [q, category, subcategory, brand, model, status, cert, sort])
  const shown = filtered.slice(0, visible)
  const totalCount = getTotalProductCount()
  const helpMsg = 'Hello Heat Shield Engineering, I would like help finding a suitable product. Please advise.'
  const clearAll = () => { setLocalQ(''); patch({ q: '', brand: '', model: '', status: '', availability: '', cert: '', category: initialCategory || '', subcategory: '' }) }
  const hasFilters = !!(q || brand || model || status || cert || category || subcategory)

  const chips = [
    q ? { key: 'q', label: `Search: ${q}`, clear: () => { setLocalQ(''); patch({ q: '' }) } } : null,
    category ? { key: 'category', label: findCategory(category)?.label || category, clear: () => patch({ category: initialCategory || '', subcategory: '' }) } : null,
    brand ? { key: 'brand', label: `Brand: ${brand}`, clear: () => patch({ brand: '' }) } : null,
    model ? { key: 'model', label: `Model: ${model}`, clear: () => patch({ model: '' }) } : null,
    status ? { key: 'status', label: `Status: ${status === 'in-stock' ? 'In stock' : 'Inquiry required'}`, clear: () => patch({ status: '', availability: '' }) } : null,
    cert ? { key: 'cert', label: `Certification: ${cert}`, clear: () => patch({ cert: '' }) } : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[]

  const Filters = ({ idPrefix, onDone }: { idPrefix: string; onDone?: () => void }) => (
    <div>
      <div className="hse-pr-aside-head">
        <h2>Filters</h2>
        {onDone ? <button type="button" className="hse-pr-btn" onClick={onDone}>Close</button> : null}
      </div>
      <FilterGroup title="Search" defaultOpen>
        <label className="hse-pr-live" htmlFor={`${idPrefix}-q`}>Search products</label>
        <input id={`${idPrefix}-q`} className="hse-pr-input" type="search" value={localQ} onChange={(e) => setLocalQ(e.target.value)} placeholder="Name, brand, model, or keyword" autoComplete="off" />
      </FilterGroup>
      <FilterGroup title="Category" count={facets.categories.length} defaultOpen>
        <button type="button" className={`hse-pr-cat ${!category ? 'is-on' : ''}`} onClick={() => patch({ category: initialCategory || '', subcategory: '' })}>All products <em>{totalCount}</em></button>
        {facets.categories.map((c) => (
          <button key={c.key} type="button" className={`hse-pr-cat ${category === c.key || category === c.slug ? 'is-on' : ''}`} onClick={() => patch({ category: c.key, subcategory: '' })}>{c.label} <em>{c.count}</em></button>
        ))}
      </FilterGroup>
      <FilterGroup title="Brand" count={facets.brands.length}>
        <label className="hse-pr-live" htmlFor={`${idPrefix}-brand`}>Brand</label>
        <select id={`${idPrefix}-brand`} className="hse-pr-select" value={brand} onChange={(e) => patch({ brand: e.target.value })}><option value="">All brands</option>{facets.brands.map((b) => <option key={b} value={b}>{b}</option>)}</select>
      </FilterGroup>
      <FilterGroup title="Model" count={facets.models.length}>
        <label className="hse-pr-live" htmlFor={`${idPrefix}-model`}>Model</label>
        <select id={`${idPrefix}-model`} className="hse-pr-select" value={model} onChange={(e) => patch({ model: e.target.value })}><option value="">All models</option>{facets.models.map((m) => <option key={m} value={m}>{m}</option>)}</select>
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="hse-pr-live" htmlFor={`${idPrefix}-status`}>Availability / status</label>
        <select id={`${idPrefix}-status`} className="hse-pr-select" value={status} onChange={(e) => patch({ status: e.target.value, availability: '' })}>
          <option value="">All statuses</option>
          <option value="in-stock">In stock</option>
          <option value="inquiry-required">Inquiry required</option>
        </select>
      </FilterGroup>
      {facets.certs.length ? (
        <FilterGroup title="Certification" count={facets.certs.length}>
          <label className="hse-pr-live" htmlFor={`${idPrefix}-cert`}>Certification</label>
          <select id={`${idPrefix}-cert`} className="hse-pr-select" value={cert} onChange={(e) => patch({ cert: e.target.value })}><option value="">All certifications</option>{facets.certs.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        </FilterGroup>
      ) : null}
      {hasFilters ? <button type="button" className="hse-pr-btn hse-pr-btn--full" onClick={() => { clearAll(); onDone?.() }}>Clear filters</button> : null}
    </div>
  )

  return (
    <div className="hse-pr-page">
      <a className="hse-pr-skip" href="#hse-pr-results">Skip to products</a>
      <ProductsHero
        search={localQ}
        onSearch={(v) => setLocalQ(v)}
        category={category}
        onSelectCategory={(key) => patch({ category: key || initialCategory || '', subcategory: '' })}
      />

      <div className="hse-pr-main">
        <aside className="hse-pr-aside hse-pr-aside--desktop" aria-label="Product filters">
          <Filters idPrefix="desk" />
        </aside>

        <section className="hse-pr-results" aria-labelledby="hse-pr-results-heading">
          <div className="hse-pr-bar" role="region" aria-label="Results controls">
            <div className="hse-pr-bar-left">
              <button type="button" className="hse-pr-btn hse-pr-filter-trigger" onClick={() => setDrawer(true)} aria-expanded={drawer} aria-controls="hse-pr-drawer">Filters</button>
              <span id="hse-pr-results-heading" className="hse-pr-count" aria-live="polite" aria-atomic="true">
                {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found{filtered.length > shown.length ? `, showing ${shown.length}` : ''}
              </span>
            </div>
            <div className="hse-pr-bar-right">
              <label className="hse-pr-sort" htmlFor="hse-pr-sort">Sort by
                <select id="hse-pr-sort" value={sort} onChange={(e) => patch({ sort: e.target.value })} aria-label="Sort products">
                  {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          {chips.length ? (
            <div className="hse-pr-active" aria-label="Active filters">
              {chips.map((c) => <button key={c.key} type="button" className="hse-pr-chipbtn" onClick={c.clear}>{c.label} ×</button>)}
              <button type="button" className="hse-pr-chipbtn" onClick={clearAll}>Clear all</button>
            </div>
          ) : null}

          {filtered.length ? (
            <>
              <div id="hse-pr-results" className="hse-pr-grid" tabIndex={-1}>
                {shown.map((p, i) => {
                  const src = productImage(p, 960)
                  const src480 = productImage(p, 480)
                  const srcSet = src480 !== src && !String(src).startsWith('data:') && !/^https?:\/\//i.test(String(src)) ? `${src480} 480w, ${src} 960w` : undefined
                  const catLabel = findCategory(p.category)?.label || p.category
                  const desc = cleanDescription(p.shortDescription || p.description)
                  const eager = i < 4
                  return (
                    <article key={p.id} className="hse-pr-card">
                      <div className="hse-pr-plate">
                        <div className="hse-pr-skel" aria-hidden="true" />
                        <a href={`/products/${p.slug}`} aria-label={`View details for ${p.name}`}>
                          {src ? <img src={src} srcSet={srcSet} sizes="(max-width:640px) 94vw, (max-width:1024px) 46vw, 320px" onLoad={onImgLoad} onError={onImgError} alt={p.name} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" width="960" height="720" /> : null}
                        </a>
                        <div className="hse-pr-missing" aria-hidden="true">
                          <svg viewBox="0 0 48 48" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="11" width="34" height="26" rx="4" /><circle cx="18" cy="22" r="3.5" /><path d="M41 31l-9-9-7 7-4-4-14 12" /></svg>
                          <span>Image unavailable</span>
                        </div>
                        <span className="hse-pr-tag" title={catLabel}>{catLabel}</span>
                      </div>
                      <div className="hse-pr-body">
                        <h3 title={p.name}><a href={`/products/${p.slug}`}>{p.name}</a></h3>
                        <p className={`hse-pr-desc${desc ? '' : ' is-empty'}`}>{desc || 'No description provided.'}</p>
                        <div className="hse-pr-bottom">
                          <dl className="hse-pr-specs">
                            <div><dt>Brand</dt><dd className={specValue(p.brand) === 'Not specified' ? 'is-ns' : undefined}>{specValue(p.brand)}</dd></div>
                            <div><dt>Model</dt><dd className={specValue(p.model) === 'Not specified' ? 'is-ns' : undefined}>{specValue(p.model)}</dd></div>
                            <div><dt>Availability</dt><dd><span className={`hse-pr-avail ${p.availability === 'available' ? 'is-ok' : 'is-iq'}`}>{statusLabel(p)}</span></dd></div>
                          </dl>
                          <div className="hse-pr-act">
                            <a className="hse-pr-p" href={`/products/${p.slug}`}>View details</a>
                            <button type="button" className="hse-pr-s" onClick={() => setQuote(p)}>Get quote</button>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
              {filtered.length > shown.length ? (
                <div className="hse-pr-more">
                  <button type="button" className="hse-pr-btn hse-pr-btn--primary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more ({filtered.length - shown.length} remaining)</button>
                </div>
              ) : null}
            </>
          ) : (
            <div id="hse-pr-results" className="hse-pr-empty" data-surface="light" tabIndex={-1}>
              <h3>No products match these filters</h3>
              <p>Try clearing a filter, searching by a broader term, or ask our team for help finding the right product.</p>
              <div className="hse-pr-empty-actions">
                <button type="button" className="hse-pr-btn hse-pr-btn--primary" onClick={clearAll}>Clear filters</button>
                <a className="hse-pr-btn" href={whatsappLink(helpMsg)} target="_blank" rel="noopener noreferrer">WhatsApp for help</a>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className={`hse-pr-drawer-back${drawer ? ' is-open' : ''}`} aria-hidden="true" onClick={() => setDrawer(false)} />
      <aside id="hse-pr-drawer" className={`hse-pr-drawer${drawer ? ' is-open' : ''}`} aria-label="Product filters" aria-hidden={!drawer}>
        <div className="hse-pr-drawer-head">
          <strong>Filters</strong>
          <button ref={closeRef} type="button" className="hse-pr-btn" onClick={() => setDrawer(false)}>Close</button>
        </div>
        <div className="hse-pr-drawer-body">
          <Filters idPrefix="mob" onDone={() => setDrawer(false)} />
        </div>
      </aside>

      {quote ? (
        <div className="hse-pr-modal-back" role="dialog" aria-modal="true" aria-label="Request a quote" onClick={() => setQuote(null)}>
          <div className="hse-pr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hse-pr-modal-head">
              <div>
                <h2>Get Quote</h2>
                <p style={{ margin: '4px 0 0', color: 'var(--pr-mute)', fontSize: 14 }}>{quote.name}</p>
              </div>
              <button type="button" className="hse-pr-btn" onClick={() => setQuote(null)}>Close</button>
            </div>
            <ProductInquiryForm initialProductName={quote.name} initialProductModel={quote.model} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

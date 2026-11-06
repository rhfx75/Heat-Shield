import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { whatsappLink } from '../data/company'
import { findCategory, getProductIcon, productCategories, products, productImage, productImageOriginal } from '../data/products'
import type { Product } from '../data/products'
import { ProductInquiryForm } from '../components/ProductInquiryForm'
import ProductsHero from '../graphics/products/ProductsHero'
import '../graphics/products/products-base.css'
import type { SyntheticEvent } from 'react'

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

function useProductFilters(initialCategory?: string) {
  const [sp, setSp] = useSearchParams()
  const navigate = useNavigate()
  const q = sp.get('q') || ''
  const category = sp.get('category') || initialCategory || ''
  const brand = sp.get('brand') || ''
  const model = sp.get('model') || ''
  const availability = sp.get('availability') || ''
  const sort = (sp.get('sort') as SortKey) || 'featured'
  const patch = (next: Record<string, string>, replace = false) => {
    const n = new URLSearchParams(sp)
    Object.entries(next).forEach(([k, v]) => { if (v) n.set(k, v); else n.delete(k) })
    if (replace) setSp(n, { replace: true }); else setSp(n)
  }
  return { sp, navigate, q, category, brand, model, availability, sort, patch }
}

function Drawer({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!open) return; const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'; const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', onKey); ref.current?.focus(); return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) } }, [open, onClose])
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={{ position: 'fixed', inset: 0, zIndex: 80 }}>
      <button type="button" aria-label="Close filters" onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(1,28,70,.38)', border: 0 }} />
      <div ref={ref} tabIndex={-1} data-surface="light" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(420px,94vw)', background: '#fff', color: 'var(--pr-blue)', padding: 20, overflow: 'auto', boxShadow: '-18px 0 40px rgba(1,78,182,.14)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}><h2 style={{ margin: 0, font: '700 1.2rem/1.2 Montserrat,sans-serif' }}>{title}</h2><button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={onClose}>Close</button></div>
        <div style={{ marginTop: 16 }}>{children}</div>
      </div>
    </div>
  )
}

function Card({ p, onQuote, onCompare, compared }: { p: Product; onQuote: (p: Product) => void; onCompare: (p: Product) => void; compared: boolean }) {
  const cat = findCategory(p.category)?.label || p.category
  const src = productImage(p, 960)
  const srcOrig = productImageOriginal(p)
  const srcSet = productImage(p, 480) !== src && !src.startsWith('data:') ? `${productImage(p, 480)} 480w, ${src} 960w` : undefined
  return (
    <article id={`product-${p.slug}`} data-surface="light" style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: '#fff', border: '1px solid var(--pr-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 6px 18px rgba(1,78,182,.05)' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: 'radial-gradient(circle at 50% 35%, #fff, var(--pr-pale) 76%)', borderBottom: '1px solid rgba(1,78,182,.06)' }}>
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 8, zIndex: 2, pointerEvents: 'none' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', maxWidth: 'calc(100% - 92px)', padding: '5px 9px', borderRadius: 999, background: 'var(--pr-pale2)', color: 'var(--pr-blue)', font: '700 .68rem/1.1 Montserrat,sans-serif' }}>{cat}</span>
          <button type="button" aria-pressed={compared} aria-label={compared ? `Remove ${p.name} from compare` : `Compare ${p.name}`} onClick={() => onCompare(p)} style={{ pointerEvents: 'auto', minHeight: 32, padding: '0 10px', borderRadius: 999, border: '1px solid var(--pr-border)', background: compared ? 'var(--pr-blue)' : '#fff', color: compared ? '#fff' : 'var(--pr-blue)', font: '600 .72rem/1 Inter,sans-serif', cursor: 'pointer', flex: '0 0 auto' }}>{compared ? 'Added' : 'Compare'}</button>
        </div>
        <a href={`/products/${p.slug}`} style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', padding: 14 }}>
          <img src={src} srcSet={srcSet} sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 23vw" onError={(e) => onImgError(e, srcOrig)} onLoad={(e) => { const t = e.currentTarget; if (t.complete && t.naturalWidth === 0) onImgError({ currentTarget: t } as SyntheticEvent<HTMLImageElement>, srcOrig) }} alt={p.name} loading="lazy" decoding="async" width="960" height="720" style={{ display: 'block', width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center' }} />
        </a>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
        {(p.brand || p.model) && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.brand ? <span className="hse-pr-chip">{p.brand}</span> : null}{p.model ? <span className="hse-pr-chip">Model: {p.model}</span> : null}</div>}
        <h3 style={{ margin: 0, font: '700 1rem/1.3 Montserrat,sans-serif' }}><a href={`/products/${p.slug}`} style={{ color: 'var(--pr-blue)', textDecoration: 'none' }}>{p.name}</a></h3>
        <p className="hse-pr-muted" style={{ margin: 0, font: '400 .92rem/1.65 Inter,sans-serif', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.shortDescription}</p>
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
          <a className="hse-pr-btn hse-pr-btn--blue" href={`/products/${p.slug}`} style={{ minHeight: 44, minWidth: 0 }}>View Details</a>
          <button type="button" className="hse-pr-btn hse-pr-btn--red" style={{ minHeight: 44, minWidth: 0 }} onClick={() => onQuote(p)}>Get Quote</button>
        </div>
      </div>
    </article>
  )
}

export function Products({ category: initialCategory }: { category?: string }) {
  const { q, category, brand, model, availability, sort, patch, navigate } = useProductFilters(initialCategory)
  const [localQ, setLocalQ] = useState(q)
  const [drawer, setDrawer] = useState(false)
  const [visible, setVisible] = useState(24)
  const [quote, setQuote] = useState<Product | null>(null)
  const [compare, setCompare] = useState<Product[]>([])
  const [compareOpen, setCompareOpen] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => { setLocalQ(q) }, [q])
  useEffect(() => { document.title = category ? `${findCategory(category)?.label || 'Category'} | Heat Shield Engineering` : 'All Products | Heat Shield Engineering' }, [category])
  useEffect(() => { setVisible(24) }, [q, category, brand, model, availability, sort])

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand).filter(Boolean) as string[])).sort((a,b)=>a.localeCompare(b)), [])
  const models = useMemo(() => Array.from(new Set(products.map(p => p.model).filter(Boolean) as string[])).sort((a,b)=>a.localeCompare(b)), [])
  const availOpts = useMemo(() => Array.from(new Set(products.map(p => p.availability).filter(Boolean) as string[])), [])

  const suggestions = useMemo(() => {
    const t = localQ.trim().toLowerCase(); if (!t) return []
    return products.filter(p => [p.name, p.brand, p.model, p.slug].filter(Boolean).some(v => String(v).toLowerCase().includes(t))).slice(0, 6)
  }, [localQ])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    let list = products.filter(p => {
      if (category && p.category !== category && findCategory(p.category)?.slug !== category) return false
      if (brand && p.brand !== brand) return false
      if (model && p.model !== model) return false
      if (availability && p.availability !== availability) return false
      if (t && ![p.name,p.brand,p.model,p.shortDescription,p.subcategory,p.category,...(p.keywords||[])].filter(Boolean).some(v => String(v).toLowerCase().includes(t))) return false
      return true
    })
    list = [...list].sort((a,b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'brand') return (a.brand || 'ZZZ').localeCompare(b.brand || 'ZZZ') || a.name.localeCompare(b.name)
      return Number(!!b.featured) - Number(!!a.featured) || a.name.localeCompare(b.name)
    })
    return list
  }, [q, category, brand, model, availability, sort])

  useEffect(() => {
    const el = sentinel.current; if (!el) return
    const io = new IntersectionObserver((es) => { if (es.some(e => e.isIntersecting)) setVisible(v => Math.min(v + 24, filtered.length || 24)) }, { rootMargin: '300px' })
    io.observe(el); return () => io.disconnect()
  }, [filtered.length])

  const shown = filtered.slice(0, visible)
  const title = category ? (findCategory(category)?.label || 'Products') : 'All Products'
  const activeFilters = [['q',q],['brand',brand],['model',model],['availability',availability]].filter(([,v])=>v)
  const activeCount = activeFilters.length + (category ? 1 : 0)
  const toggleCompare = (p: Product) => setCompare(cur => cur.find(x => x.id === p.id) ? cur.filter(x => x.id !== p.id) : cur.length >= 3 ? cur : [...cur, p])
  const helpMsg = `Hello Heat Shield Engineering, I need help finding a product.${activeFilters.length ? ` Filters: ${activeFilters.map(([k,v]) => `${k}=${v}`).join(', ')}.` : ''}`

  return (
    <div className="hse-pr-page">
      <ProductsHero title={title} search={localQ} onSearch={(v) => { setLocalQ(v); patch({ q: v }, true) }} suggestions={suggestions} onSelectSuggestion={(p) => { setLocalQ(''); patch({ q: '' }, true); if (filtered.find(x => x.id === p.id)) document.getElementById(`product-${p.slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); else navigate(`/products/${p.slug}`) }} />

      <section data-surface="light" style={{ position: 'sticky', top: 'var(--header-h,72px)', zIndex: 25, background: 'rgba(255,255,255,.96)', borderBottom: '1px solid var(--pr-border)' }} aria-label="Product categories and filters">
        <div className="hse-pr-wrap" style={{ padding: '10px 20px' }}>
          <div role="navigation" aria-label="Product categories" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            <button type="button" onClick={() => patch({ category: '' })} style={{ flex: '0 0 auto', minHeight: 42, padding: '0 14px', borderRadius: 999, border: '1px solid var(--pr-border)', background: !category ? 'var(--pr-blue)' : '#fff', color: !category ? '#fff' : 'var(--pr-blue)', font: '600 .88rem/1 Inter,sans-serif', cursor: 'pointer' }}>All ({products.length})</button>
            {productCategories.map(c => { const Icon = getProductIcon(c.icon); const count = products.filter(p => p.category === c.key).length; const active = category === c.key || category === c.slug; return <button key={c.key} type="button" onClick={() => patch({ category: c.key })} style={{ flex: '0 0 auto', minHeight: 42, padding: '0 14px', borderRadius: 999, border: '1px solid var(--pr-border)', background: active ? 'var(--pr-blue)' : '#fff', color: active ? '#fff' : 'var(--pr-blue)', font: '600 .88rem/1 Inter,sans-serif', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>{Icon ? <Icon size={16} /> : null}{c.label} ({count})</button> })}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
            <button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={() => setDrawer(true)}>More filters{activeCount ? ` (${activeCount})` : ''}</button>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--pr-blue)', font: '600 .85rem/1 Inter,sans-serif' }}>Sort
              <select value={sort} onChange={(e) => patch({ sort: e.target.value })} aria-label="Sort products" style={{ minHeight: 42, borderRadius: 12, border: '1px solid var(--pr-border)', padding: '0 12px', color: 'var(--pr-blue)', background: '#fff' }}>
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
            {activeFilters.map(([k,v]) => <button key={k} type="button" className="hse-pr-chip" onClick={() => patch({ [k]: '' })} aria-label={`Remove ${k} filter ${v}`} style={{ cursor: 'pointer' }}>{k}: {v} ×</button>)}
            {activeFilters.length ? <button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={() => patch({ q:'',brand:'',model:'',availability:'' })}>Clear filters</button> : null}
          </div>
        </div>
      </section>

      <Drawer open={drawer} title="More filters" onClose={() => setDrawer(false)}>
        <div style={{ display: 'grid', gap: 14 }}>
          <label style={{ display: 'grid', gap: 6, color: 'var(--pr-blue)', font: '600 .9rem/1.2 Inter,sans-serif' }}>Brand
            <select value={brand} onChange={(e) => patch({ brand: e.target.value })} style={{ minHeight: 44, borderRadius: 12, border: '1px solid var(--pr-border)', padding: '0 12px', color: 'var(--pr-blue)' }}><option value="">All brands</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select>
          </label>
          <label style={{ display: 'grid', gap: 6, color: 'var(--pr-blue)', font: '600 .9rem/1.2 Inter,sans-serif' }}>Model
            <select value={model} onChange={(e) => patch({ model: e.target.value })} style={{ minHeight: 44, borderRadius: 12, border: '1px solid var(--pr-border)', padding: '0 12px', color: 'var(--pr-blue)' }}><option value="">All models</option>{models.map(m => <option key={m} value={m}>{m}</option>)}</select>
          </label>
          <label style={{ display: 'grid', gap: 6, color: 'var(--pr-blue)', font: '600 .9rem/1.2 Inter,sans-serif' }}>Availability
            <select value={availability} onChange={(e) => patch({ availability: e.target.value })} style={{ minHeight: 44, borderRadius: 12, border: '1px solid var(--pr-border)', padding: '0 12px', color: 'var(--pr-blue)' }}><option value="">All</option>{availOpts.map(a => <option key={a} value={a}>{a}</option>)}</select>
          </label>
          <button type="button" className="hse-pr-btn hse-pr-btn--red" onClick={() => { patch({ brand:'',model:'',availability:'',q:'' }); setDrawer(false) }}>Clear all</button>
        </div>
      </Drawer>

      <section data-surface="pale" style={{ padding: '24px 0 72px' }} aria-labelledby="hse-pr-results">
        <div className="hse-pr-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
            <h2 id="hse-pr-results" style={{ margin: 0, font: '700 1.15rem/1.2 Montserrat,sans-serif', color: 'var(--pr-blue)' }}>Showing {filtered.length} products</h2>
            <div aria-live="polite" className="hse-pr-live">Showing {filtered.length} products</div>
          </div>
          {filtered.length === 0 ? (
            <div data-surface="light" style={{ background: '#fff', border: '1px solid var(--pr-border)', borderRadius: 22, padding: 28, textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--pr-blue)', font: '700 1.25rem/1.2 Montserrat,sans-serif' }}>No products match these filters</h3>
              <p className="hse-pr-muted" style={{ margin: '10px 0 16px' }}>Try clearing filters or searching by a different name, brand, or model.</p>
              <button type="button" className="hse-pr-btn hse-pr-btn--blue" onClick={() => patch({ q:'',brand:'',model:'',availability:'',category:'' })}>Clear filters</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: 18 }}>
                {shown.map(p => <Card key={p.id} p={p} onQuote={setQuote} onCompare={toggleCompare} compared={!!compare.find(x => x.id === p.id)} />)}
              </div>
              {visible < filtered.length && <div ref={sentinel} style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}><button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={() => setVisible(v => Math.min(v + 24, filtered.length))}>Load more</button></div>}
            </>
          )}
        </div>
      </section>

      {compare.length > 0 && (
        <div data-surface="light" style={{ position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 70, background: '#fff', border: '1px solid var(--pr-border)', borderRadius: 18, boxShadow: '0 18px 44px rgba(1,78,182,.16)', padding: 12 }}>
          <div className="hse-pr-wrap" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', padding: 0 }}>
            <strong style={{ color: 'var(--pr-blue)' }}>Compare ({compare.length}/3)</strong>
            {compare.map(p => <span key={p.id} className="hse-pr-chip">{p.name}<button type="button" onClick={() => toggleCompare(p)} aria-label={`Remove ${p.name}`} style={{ border: 0, background: 'transparent', color: 'var(--pr-blue)', cursor: 'pointer' }}>×</button></span>)}
            <button type="button" className="hse-pr-btn hse-pr-btn--blue" onClick={() => setCompareOpen(true)} disabled={compare.length < 2}>Compare</button>
            <button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={() => setCompare([])}>Clear</button>
          </div>
        </div>
      )}

      {compareOpen && (
        <div role="dialog" aria-modal="true" aria-label="Compare products" style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(1,28,70,.42)', padding: 16, overflow: 'auto' }} onClick={() => setCompareOpen(false)}>
          <div data-surface="light" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1100, margin: '24px auto', background: '#fff', borderRadius: 20, padding: 18, color: 'var(--pr-blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><h2 style={{ margin: 0 }}>Comparison</h2><button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={() => setCompareOpen(false)}>Close</button></div>
            {/* // TODO(confirm): Comparison labels and values must come only from specifications supplied in the product data. */}
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', font: '400 .92rem/1.5 Inter,sans-serif' }}>
                <thead><tr>{['Specification', ...compare.map(p => p.name)].map(h => <th key={h} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--pr-border)', background: 'var(--pr-pale2)' }}>{h}</th>)}</tr></thead>
                <tbody>{Array.from(new Set(compare.flatMap(p => (p.specifications || []).map(s => s.label)))).map(label => <tr key={label}>{[label, ...compare.map(p => p.specifications?.find(s => s.label === label)?.value || '-')].map((v, i) => <td key={i} style={{ padding: 10, borderBottom: '1px solid var(--pr-border)', verticalAlign: 'top' }}>{v}</td>)}</tr>)}{compare.every(p => !(p.specifications || []).length) ? <tr><td colSpan={compare.length + 1} style={{ padding: 12 }}>No supplied specifications available for selected products.</td></tr> : null}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {quote && (
        <div role="dialog" aria-modal="true" aria-label="Request a quote" style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(1,28,70,.42)', padding: 16, overflow: 'auto' }} onClick={() => setQuote(null)}>
          <div data-surface="light" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 720, margin: '24px auto', background: '#fff', borderRadius: 20, padding: 18, color: 'var(--pr-blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}><h2 style={{ margin: 0, font: '700 1.2rem/1.2 Montserrat,sans-serif' }}>Get Quote</h2><button type="button" className="hse-pr-btn hse-pr-btn--ghost" onClick={() => setQuote(null)}>Close</button></div>
            <ProductInquiryForm initialProductName={quote.name} initialProductModel={quote.model} />
          </div>
        </div>
      )}

      <section data-surface="brand" style={{ padding: '42px 0' }} aria-labelledby="hse-pr-help">
        <div className="hse-pr-wrap" style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h2 id="hse-pr-help" style={{ margin: 0, font: '700 clamp(1.4rem,2.5vw,2rem)/1.15 Montserrat,sans-serif', color: '#fff' }}>Can&apos;t find the product?</h2>
            <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,.92)', font: '400 1rem/1.65 Inter,sans-serif' }}>Share your requirement and we&apos;ll help you identify suitable products and options.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="hse-pr-btn hse-pr-btn--red" href="/contact">Request a Quote</a>
            <a className="hse-pr-btn hse-pr-btn--wa" href={whatsappLink(helpMsg)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}

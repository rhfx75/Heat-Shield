import { useEffect, useMemo, useState } from 'react'
import { products, productCategories, productImage } from '../../data/products'
import type { Product } from '../../data/products'
import type { SyntheticEvent } from 'react'

const FALLBACK_IMG = '/images/products/placeholder-product.svg'
function onImgError(e: SyntheticEvent<HTMLImageElement>) { const t = e.currentTarget; if (t.dataset.step === '1') return; t.dataset.step = '1'; t.removeAttribute('srcset'); t.onerror = null; t.alt = ''; t.src = FALLBACK_IMG }

function pickFeatured(list: Product[]): Product | null {
  const usable = list.filter((p) => !!p.image)
  return usable.find((p) => p.featured) || usable[0] || list[0] || null
}

function Count({ value, label }: { value: number; label: string }) {
  return <span><strong style={{ color: 'var(--pr-blue)', font: '700 1.15rem/1 Montserrat,sans-serif' }}>{value}</strong> {label}</span>
}

export default function ProductsHero({
  title, search, onSearch, suggestions, onSelectSuggestion,
}: {
  title: string
  search: string
  onSearch: (v: string) => void
  suggestions: Product[]
  onSelectSuggestion: (p: Product) => void
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [idx, setIdx] = useState(0)
  const featuredList = useMemo(() => {
    const usable = products.filter((p) => !!p.image)
    const f = usable.filter((p) => p.featured)
    const out: Product[] = []
    for (const p of f) if (!out.find(x => x.id === p.id)) out.push(p)
    for (const p of usable) if (out.length < 6 && !out.find(x => x.id === p.id)) out.push(p)
    return out.length ? out : (pickFeatured(products) ? [pickFeatured(products)!] : [])
  }, [])
  const brandsCount = useMemo(() => new Set(products.map(p => p.brand).filter(Boolean)).size, [])
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !(e.target as HTMLElement)?.isContentEditable) { e.preventDefault(); (document.getElementById('hse-pr-search') as HTMLInputElement | null)?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (reduce || featuredList.length < 2) return
    const id = window.setInterval(() => { if (!document.hidden) setIdx(i => (i + 1) % featuredList.length) }, 5000)
    return () => window.clearInterval(id)
  }, [featuredList.length, reduce])

  const showSug = open && suggestions.length > 0
  const current = featuredList[idx] || featuredList[0] || null

  return (
    <section className="hse-pr-hero" data-surface="light" aria-labelledby="hse-pr-title" style={{ padding: 'clamp(84px,10vw,118px) 0 28px', background: 'linear-gradient(180deg,#F3F8FF 0%,#FFFFFF 72%)' }}>
      <div className="hse-pr-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, alignItems: 'center' }}>
        <div data-surface="light" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 999, background: '#c62828', color: '#fff', font: '700 .78rem/1 Montserrat,sans-serif', letterSpacing: '.08em' }}>OUR PRODUCTS</span>
          <h1 id="hse-pr-title" style={{ margin: '14px 0 10px', font: '700 clamp(2rem,4.4vw,3.5rem)/1.06 Montserrat,sans-serif', color: 'var(--pr-blue)' }}>{title}</h1>
          <p className="hse-pr-muted" style={{ margin: 0, font: '400 1.02rem/1.75 Inter,sans-serif', maxWidth: 620 }}>Browse our complete range of fire protection, fire detection, fire suppression, passive fire protection, and electrical safety products.</p>
          <p style={{ margin: '14px 0 0', font: '500 .98rem/1.6 Inter,sans-serif', color: 'var(--pr-blue)' }}><Count value={products.length} label="products" /> · <Count value={productCategories.length} label="categories" /> · <Count value={brandsCount} label="brands" /></p>
          <div style={{ position: 'relative', marginTop: 18, maxWidth: 640 }}>
            <label className="hse-pr-live" htmlFor="hse-pr-search">Search products</label>
            <input id="hse-pr-search" value={search} onChange={(e) => { onSearch(e.target.value); setOpen(true); setActive(0) }} onFocus={() => setOpen(true)} onBlur={() => window.setTimeout(() => setOpen(false), 120)}
              onKeyDown={(e) => {
                if (!showSug) return
                if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, suggestions.length - 1)) }
                if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
                if (e.key === 'Enter') { e.preventDefault(); onSelectSuggestion(suggestions[active]) }
                if (e.key === 'Escape') setOpen(false)
              }}
              role="combobox" aria-expanded={showSug} aria-controls="hse-pr-suggest" aria-autocomplete="list" aria-activedescendant={showSug ? `hse-pr-opt-${active}` : undefined}
              placeholder="Search by name, brand or model — press / to focus"
              style={{ width: '100%', minHeight: 54, borderRadius: 16, border: '1px solid var(--pr-border)', background: '#fff', color: 'var(--pr-blue)', padding: '0 16px', font: '500 1rem/1 Inter,sans-serif', boxShadow: '0 8px 24px rgba(1,78,182,.06)' }} />
            {showSug && (
              <ul id="hse-pr-suggest" role="listbox" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', margin: 0, padding: 8, listStyle: 'none', background: '#fff', border: '1px solid var(--pr-border)', borderRadius: 16, boxShadow: '0 18px 40px rgba(1,78,182,.12)', zIndex: 30, maxHeight: 360, overflow: 'auto' }}>
                {suggestions.map((p, i) => (
                  <li key={p.id} id={`hse-pr-opt-${i}`} role="option" aria-selected={i === active}>
                    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onSelectSuggestion(p)} style={{ width: '100%', display: 'flex', gap: 12, alignItems: 'center', padding: 10, borderRadius: 12, border: 0, background: i === active ? 'var(--pr-pale2)' : '#fff', color: 'var(--pr-blue)', textAlign: 'left', cursor: 'pointer' }}>
                      <img src={productImage(p, 480)} onError={onImgError} alt="" width="40" height="40" loading="lazy" decoding="async" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 10, background: '#fff', border: '1px solid var(--pr-border)', display: 'block' }} />
                      <span style={{ minWidth: 0 }}><span style={{ display: 'block', font: '600 .95rem/1.25 Inter,sans-serif' }}>{p.name}</span>{p.brand ? <span className="hse-pr-chip" style={{ marginTop: 4 }}>{p.brand}</span> : null}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div data-surface="brand" style={{ position: 'relative', borderRadius: 24, minHeight: 360, overflow: 'hidden', background: 'linear-gradient(145deg,var(--pr-blue) 0%,#0868d8 58%,#013a8a 100%)', boxShadow: '0 20px 48px rgba(1,58,138,.18)' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 24%, rgba(255,255,255,.22), rgba(255,255,255,0) 38%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', left: '50%', bottom: 24, width: '58%', height: 44, transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(255,255,255,.18), rgba(255,255,255,0) 72%)' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', placeItems: 'center', minHeight: 360, padding: '24px 24px 20px' }}>
            {current ? (
              <button type="button" onClick={() => onSelectSuggestion(current)} style={{ width: '100%', maxWidth: 420, border: 0, background: 'transparent', padding: 0, cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '4 / 3', display: 'grid', placeItems: 'center' }}>
                  <img key={current.id} src={productImage(current, 960)} onError={onImgError} alt={current.name} loading="eager" decoding="async" width="960" height="720" style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: 320, objectFit: 'contain', objectPosition: 'center', display: 'block', filter: 'drop-shadow(0 14px 24px rgba(1,28,70,.28))' }} />
                </div>
                <span style={{ display: 'inline-block', marginTop: 10, maxWidth: '100%', padding: '8px 12px', borderRadius: 14, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.22)', color: '#fff', font: '600 .84rem/1.3 Inter,sans-serif' }}>
                  {current.brand ? `${current.brand}${current.model ? ` · ${current.model}` : ''} · ` : ''}{current.name}
                </span>
              </button>
            ) : (
              <div style={{ color: '#fff', font: '600 1rem/1.4 Inter,sans-serif' }}>Products catalog</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

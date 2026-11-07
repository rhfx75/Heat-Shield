import { type SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { findCategory, productImage, products, productCategories } from '../../data/products'

const SHOWCASE_SLUGS = ['diesel-engine-fire-pump-set', 'conventional-fire-alarm-panel', 'addressable-fire-alarm-control-panel'] as const

function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget
  if (t.dataset.broken === '1') return
  t.dataset.broken = '1'
  t.removeAttribute('srcset')
  t.onerror = null
  t.alt = ''
  t.style.visibility = 'hidden'
}

export default function ProductsHero({
  search,
  onSearch,
  category,
  onSelectCategory,
}: {
  search: string
  onSearch: (v: string) => void
  category: string
  onSelectCategory: (key: string) => void
}) {
  const totalProducts = products.length
  const totalCategories = productCategories.length
  const totalBrands = new Set(products.map((p) => p.brand?.trim()).filter(Boolean)).size
  const showcase = SHOWCASE_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean)
  const categoryChips = [{ key: '', label: 'All products', count: totalProducts }, ...productCategories.map((c) => ({ key: c.key, label: c.label, count: products.filter((p) => p.category === c.key).length }))]

  return (
    <header className="hse-pr-hero" data-surface="brand">
      <div className="hse-pr-wrap hse-pr-hero-layout">
        <div className="hse-pr-hero-copy">
          <nav className="hse-pr-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Products</span>
          </nav>
          <h1>
            Find the right <span className="hse-pr-hero-accent">fire safety</span> equipment
          </h1>
          <p className="hse-pr-hero-sub">
            Search {totalProducts} products across {totalCategories} categories from {totalBrands} brands, then request a quote.
          </p>
          <form
            className="hse-pr-hero-search"
            role="search"
            onSubmit={(e) => { e.preventDefault() }}
          >
            <label className="hse-pr-live" htmlFor="hse-pr-hero-q">Search products</label>
            <input
              id="hse-pr-hero-q"
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search by name, brand, model, or keyword"
              autoComplete="off"
            />
            <button type="submit" className="hse-pr-hero-search-btn">Search</button>
          </form>
          <div className="hse-pr-hero-chips" aria-label="Product categories">
            {categoryChips.map((c) => {
              const active = !category ? c.key === '' : c.key === category || findCategory(category)?.key === c.key
              return (
                <button
                  key={c.key || 'all'}
                  type="button"
                  className={`hse-pr-hero-chip${active ? ' is-on' : ''}`}
                  onClick={() => onSelectCategory(c.key)}
                >
                  {c.label} <em>{c.count}</em>
                </button>
              )
            })}
          </div>
        </div>

        <div className="hse-pr-hero-art" aria-hidden="true">
          <span className="hse-pr-ripple hse-pr-ripple--1" />
          <span className="hse-pr-ripple hse-pr-ripple--2" />
          <span className="hse-pr-ripple hse-pr-ripple--3" />
          <div className="hse-pr-fan">
            {showcase.map((p, i) => (
              <div key={p!.id} className={`hse-pr-fan-card hse-pr-fan-card--${i + 1}`}>
                <div className="hse-pr-fan-plate">
                  <img src={productImage(p!, 480)} alt="" loading="eager" decoding="async" width="480" height="360" onError={onImgError} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg className="hse-pr-hero-curve" viewBox="0 0 1440 54" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0,0 C240,54 480,54 720,34 C960,14 1200,14 1440,42 L1440,54 L0,54 Z" fill="var(--pr-bg, #f7f9fc)" />
      </svg>
    </header>
  )
}

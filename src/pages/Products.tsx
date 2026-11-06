import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import {
  productCategories,
  products,
  getProductsByCategory,
  getProductCount,
  findCategory,
  getProductIcon,
  getCategoryProductCount,
} from '../data/products'
import { Search, Grid, ChevronRight } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Products' },
  { value: 'name-asc', label: 'Product Name: A–Z' },
  { value: 'name-desc', label: 'Product Name: Z–A' },
  { value: 'recent', label: 'Recently Added' },
] as const

interface ProductsProps {
  category?: string
}

export function Products({ category: initialCategory }: ProductsProps) {
  const [searchParams] = useSearchParams()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const navigate = useNavigate()

  const urlCategory = searchParams.get('category') || initialCategory || ''
  const urlSubcategory = searchParams.get('subcategory') || ''
  const urlSearch = searchParams.get('search') || ''
  const urlSort = searchParams.get('sort') || 'featured'
  const urlBrand = searchParams.get('brand') || ''
  const urlModel = searchParams.get('model') || ''
  const urlAvailability = searchParams.get('availability') || ''

  const activeCategoryKey = useMemo(() => {
    if (!urlCategory) return null
    const cat = findCategory(urlCategory)
    return cat ? cat.key : urlCategory
  }, [urlCategory])

  const activeSubKey = urlSubcategory || null

  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [sort, setSort] = useState(urlSort)
  const [brandFilter, setBrandFilter] = useState(urlBrand || '')
  const [modelFilter, setModelFilter] = useState(urlModel)
  const [availabilityFilter, setAvailabilityFilter] = useState(urlAvailability)
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const saved = localStorage.getItem('hse-sidebar-width')
      return saved ? parseInt(saved, 10) : 300
    } catch {
      return 300
    }
  })

  const sidebarRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const startScrollTopRef = useRef(0)

  // Available brands (normalized to lowercase for consistent matching; labels keep original case)
  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, string>()
    products.forEach((p) => {
      if (p.brand) {
        const key = p.brand.toLowerCase().trim()
        if (!brandMap.has(key)) brandMap.set(key, p.brand)
      }
    })
    return Array.from(brandMap.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  // Available models
  const availableModels = useMemo(() => {
    const models = new Set<string>()
    products.forEach((p) => {
      if (p.model) models.add(p.model)
    })
    return Array.from(models).sort()
  }, [])

  // Filtered products
  const filteredProducts = useMemo(() => {
    let list = products

    if (activeCategoryKey) {
      list = getProductsByCategory(activeCategoryKey)
    }
    if (activeSubKey) {
      list = list.filter((p) => p.subcategory === activeSubKey)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          findCategory(p.category)?.label.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.keywords?.some((k) => k.toLowerCase().includes(q)) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    if (brandFilter) {
      const bf = brandFilter.toLowerCase().trim()
      list = list.filter((p) => p.brand?.toLowerCase().trim() === bf)
    }
    if (modelFilter) {
      list = list.filter((p) => p.model === modelFilter)
    }
    if (availabilityFilter) {
      list = list.filter((p) => p.availability === availabilityFilter)
    }

    // Sort
    const sorted = [...list].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'recent') return 0
      // featured: featured first, then by name
      const aFeatured = a.featured ? 0 : 1
      const bFeatured = b.featured ? 0 : 1
      if (aFeatured !== bFeatured) return aFeatured - bFeatured
      return a.name.localeCompare(b.name)
    })
    return sorted
  }, [activeCategoryKey, activeSubKey, searchQuery, brandFilter, modelFilter, availabilityFilter, sort])

  const totalCount = getProductCount()

  const updateUrl = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams)
      Object.entries(params).forEach(([key, value]) => {
        if (value) newParams.set(key, value)
        else newParams.delete(key)
      })
      navigate(`?${newParams.toString()}`)
    },
    [navigate, searchParams]
  )

  // Keep brand filter in sync with the URL so brand links from the Brands page work
  useEffect(() => {
    const currentBrand = searchParams.get('brand') || ''
    const desiredBrand = brandFilter ? brandFilter.toLowerCase().trim() : ''
    if (currentBrand !== desiredBrand) {
      updateUrl({ brand: desiredBrand || '' })
    }
  }, [brandFilter, updateUrl, searchParams])

  // Sidebar drag-to-scroll and resize
  useEffect(() => {
    const el = sidebarRef.current
    if (!el) return

    // Drag-to-scroll (mouse/touch)
    let down = false
    let moved = false

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null
      if (target?.closest('input, select, button, a, [contenteditable="true"]')) return
      down = true
      moved = false
      startYRef.current = e.clientY
      startScrollTopRef.current = el.scrollTop
      el.classList.add('sidebar-dragging')
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!down) return
      const dy = e.clientY - startYRef.current
      if (Math.abs(dy) > 5) {
        moved = true
        el.classList.add('sidebar-dragging')
      }
      if (moved) {
        e.preventDefault()
        el.scrollTop = startScrollTopRef.current - dy
      }
    }

    const onPointerUp = () => {
      down = false
      el.classList.remove('sidebar-dragging')
    }

    el.addEventListener('pointerdown', onPointerDown as EventListener)
    window.addEventListener('pointermove', onPointerMove as EventListener)
    window.addEventListener('pointerup', onPointerUp as EventListener)
    el.addEventListener('pointerleave', onPointerUp as EventListener)

    // Resize handle
    const handle = el.querySelector('.sidebar-resizer')
    let onResizeDown: ((e: PointerEvent) => void) | null = null

    if (handle) {
      onResizeDown = (e: PointerEvent) => {
        e.preventDefault()
        const startX = e.clientX
        const startWidth = sidebarWidth

        const onResizeMove = (ev: PointerEvent) => {
          const dx = ev.clientX - startX
          let newWidth = startWidth + dx
          newWidth = Math.min(420, Math.max(240, newWidth))
          setSidebarWidth(newWidth)
          try { localStorage.setItem('hse-sidebar-width', String(newWidth)) } catch { }
        }

        const onResizeUp = () => {
          window.removeEventListener('pointermove', onResizeMove as EventListener)
          window.removeEventListener('pointerup', onResizeUp as EventListener)
          window.removeEventListener('pointercancel', onResizeUp as EventListener)
        }

        window.addEventListener('pointermove', onResizeMove as EventListener)
        window.addEventListener('pointerup', onResizeUp as EventListener)
        window.addEventListener('pointercancel', onResizeUp as EventListener)
      }
      handle?.addEventListener('pointerdown', onResizeDown as EventListener)
    }

    return () => {
      el.removeEventListener('pointerdown', onPointerDown as EventListener)
      window.removeEventListener('pointermove', onPointerMove as EventListener)
      window.removeEventListener('pointerup', onPointerUp as EventListener)
      el.removeEventListener('pointerleave', onPointerUp as EventListener)
      if (handle && onResizeDown) {
        handle.removeEventListener('pointerdown', onResizeDown as EventListener)
      }
    }
  }, [sidebarWidth])

  // Apply sidebar width via inline style
  useEffect(() => {
    const el = sidebarRef.current
    if (el) {
      el.style.width = `${sidebarWidth}px`
      el.style.flex = `0 0 ${sidebarWidth}px`
      el.style.maxWidth = `${sidebarWidth}px`
    }
  }, [sidebarWidth])

  const setSearch = useCallback(
    (value: string) => {
      setSearchQuery(value)
      updateUrl({ search: value })
    },
    [updateUrl]
  )

  const setSortOption = useCallback(
    (value: string) => {
      setSort(value)
      updateUrl({ sort: value })
    },
    [updateUrl]
  )

  const selectCategory = useCallback((key: string, slug: string) => {
    setOpenCategory(key)
    updateUrl({ category: slug, subcategory: '', search: '' })
  }, [updateUrl])

  const selectSubCategory = useCallback(
    (catKey: string, subSlug: string) => {
      setOpenCategory(catKey)
      updateUrl({ category: findCategory(catKey)?.slug || '', subcategory: subSlug, search: '' })
    },
    [updateUrl]
  )

  const clearFilters = useCallback(() => {
    setOpenCategory(null)
    setSearchQuery('')
    setSort('featured')
    setBrandFilter('')
    setModelFilter('')
    setAvailabilityFilter('')
    updateUrl({})
  }, [updateUrl])

  const toggleCategory = useCallback((key: string) => {
    setOpenCategory((prev) => (prev === key ? null : key))
  }, [])

  return (
    <div className="listing-page relative min-h-screen">
      <div className="listing-page-bg absolute inset-0 z-[-1]" />

      {/* HERO – full width edge to edge */}
      <section className="relative isolate z-1 overflow-hidden listing-hero">
        <div className="absolute inset-0 z-[-2] listing-gradient-bg" />
        <div className="absolute inset-0 z-[-1] listing-blueprint" />
        <svg className="listing-wave" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 35 Q 360 0 720 35 T 1440 35 V70 H0 Z" fill="var(--hse-surface,#F7F9FC)" />
        </svg>
        <div className="relative z-10 container section pt-[calc(var(--header-h)+64px)] pb-24 text-center">
          <div className="listing-stat-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-stats">
            <div className="listing-stat-card">
              <div className="listing-stat-value">{totalCount}</div>
              <div className="listing-stat-label">Products</div>
            </div>
            <div className="listing-stat-card">
              <div className="listing-stat-value">{productCategories.length}</div>
              <div className="listing-stat-label">Categories</div>
            </div>
            <div className="listing-stat-card">
              <div className="listing-stat-value">{availableBrands.length}</div>
              <div className="listing-stat-label">Brands</div>
            </div>
          </div>
          <span className="listing-badge">OUR PRODUCTS</span>
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">All Products</h1>
          <p className="text-lg text-white max-w-[700px] mx-auto">
            Browse our complete range of fire protection, fire detection, fire suppression, passive fire protection, and electrical safety products.
          </p>
        </div>
      </section>

      {/* Content below – constrained width */}
      <div className="product-container page-container relative">
        <section className="listing-body">
          <div className="container-inner">
            <div className="listing-layout">
            {/* SIDEBAR */}
            <aside
              ref={sidebarRef}
              className="listing-sidebar"
              style={{ width: sidebarWidth, flex: `0 0 ${sidebarWidth}px`, maxWidth: sidebarWidth }}
            >
              <div className="sidebar-card">
                <div className="sidebar-search">
                  <div className="search-wrapper">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search products by name, model, brand, or category…"
                      value={searchQuery}
                      onChange={(e) => setSearch(e.target.value)}
                      className="sidebar-search-input"
                    />
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearch('')}
                      className="sidebar-clear"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="sidebar-view-all">
                  <button
                    onClick={clearFilters}
                    className={`view-all-button ${!activeCategoryKey && !activeSubKey && !searchQuery && !brandFilter && !modelFilter && !availabilityFilter ? 'view-all-active' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                    <span>View All Products</span>
                    <span className="view-all-count">{totalCount}</span>
                  </button>
                </div>

                <div className="sidebar-filters">
                  <h3 className="sidebar-filter-title">Filters</h3>

                  <div className="sidebar-filter-group">
                    <label className="sidebar-filter-label">Brand</label>
                    <select
                      value={brandFilter}
                      onChange={(e) => setBrandFilter(e.target.value)}
                      className="sidebar-filter-select"
                    >
                      <option value="">All Brands</option>
                      {availableBrands.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sidebar-filter-group">
                    <label className="sidebar-filter-label">Model</label>
                    <select
                      value={modelFilter}
                      onChange={(e) => setModelFilter(e.target.value)}
                      className="sidebar-filter-select"
                    >
                      <option value="">All Models</option>
                      {availableModels.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sidebar-filter-group">
                    <label className="sidebar-filter-label">Availability</label>
                    <select
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                      className="sidebar-filter-select"
                    >
                      <option value="">All</option>
                      <option value="available">Available</option>
                      <option value="inquiry-required">Inquiry Required</option>
                      <option value="not-specified">Not Specified</option>
                    </select>
                  </div>
                </div>

                <div className="sidebar-categories">
                  <h3 className="sidebar-filter-title">Categories</h3>
                  {productCategories.map((cat) => {
                    const isActive = activeCategoryKey === cat.key
                    const isExpanded = openCategory === cat.key
                    const catCount = getCategoryProductCount(cat.key)
                    const CatIcon = getProductIcon(cat.icon)

                    return (
                      <div key={cat.key} className="category-item">
                        <button
                          onClick={() => {
                            if (isActive) {
                              selectCategory(cat.key, cat.slug)
                            } else {
                              toggleCategory(cat.key)
                              selectCategory(cat.key, cat.slug)
                            }
                          }}
                          className={`category-button ${isActive ? 'category-active' : ''} ${isExpanded ? '' : 'collapsed'}`}
                          aria-expanded={isExpanded}
                          aria-controls={`category-${cat.key}`}
                        >
                          <span className="category-icon">
                            {CatIcon && <CatIcon />}
                          </span>
                          <span className="category-label">{cat.label}</span>
                          <span className="category-count">{catCount}</span>
                          <ChevronRight className="category-chevron" />
                        </button>
                        {isExpanded && (
                          <div className="category-subcategories" id={`category-${cat.key}`}>
                            {cat.subCategories.map((sub) => {
                              const isSubActive = activeSubKey === sub.key || activeSubKey === sub.slug
                              const subCount = getProductCount(cat.key, sub.key)
                              const SubIcon = getProductIcon(sub.icon)
                              const isEmpty = subCount === 0
                              return (
                                <button
                                  key={sub.key}
                                  onClick={() =>
                                    !isEmpty && selectSubCategory(cat.key, sub.slug)
                                  }
                                  className={`subcategory-button ${isSubActive ? 'subcategory-active' : ''} ${isEmpty ? 'subcategory-empty' : ''}`}
                                >
                                  <span className="subcategory-icon">
                                    {SubIcon && <SubIcon />}
                                  </span>
                                  <span className="subcategory-label">{sub.label}</span>
                                  <span className="subcategory-count">{subCount}</span>
                                  {!isEmpty && <ChevronRight className="subcategory-chevron" />}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <button
                  onClick={clearFilters}
                  className="clear-filters"
                >
                  <Grid className="w-4 h-4" /> Clear filters
                </button>
              </div>
              <div className="sidebar-resizer" />
            </aside>

            {/* MAIN */}
            <main className="listing-main">
              <div className="listing-toolbar">
                <div>
                  <p className="listing-toolbar-count">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                  {brandFilter && (
                    <div className="listing-active-brand">
                      <span className="active-brand-label">Showing brand:</span>
                      <span className="active-brand-value">{brandFilter}</span>
                        <button
                          onClick={() => {
                            setBrandFilter('')
                            updateUrl({ brand: '' })
                          }}
                          className="clear-brand-button"
                        >
                        Clear brand filter / All brands
                      </button>
                    </div>
                  )}
                </div>
                <div className="listing-sort">
                  <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-select"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="listing-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      slug={p.slug}
                      name={p.name}
                      category={p.category}
                      brand={p.brand}
                      model={p.model}
                      shortDescription={p.shortDescription}
                      image={p.image}
                      availability={p.availability}
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    {brandFilter ? (
                      <>
                        <h3 className="empty-title">
                          No products available for <span className="empty-brand">{brandFilter}</span> yet
                        </h3>
                        <p className="empty-description">
                          We don't have any listed products for this brand at the moment. Contact us for a
                          quotation or browse other brands.
                        </p>
                        <button
                          onClick={() => {
                            setBrandFilter('')
                            updateUrl({ brand: '' })
                          }}
                          className="empty-button"
                        >
                          <Grid className="w-4 h-4 mr-2" />
                          Contact us for a quote
                        </button>
                        <button
                          onClick={clearFilters}
                          className="empty-button empty-button--outline"
                        >
                          <Grid className="w-4 h-4 mr-2" />
                          View All Brands
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="empty-title">No products found</h3>
                        <p className="empty-description">
                          Try adjusting your search or removing some filters to find the products you need.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="empty-button"
                        >
                          <Grid className="w-4 h-4 mr-2" />
                          View All Products
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  </div>
)
}

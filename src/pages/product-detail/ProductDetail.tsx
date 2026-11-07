import { useEffect, useMemo, useState, type SyntheticEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Phone, Download, MessageCircle, CheckCircle2, Copy } from 'lucide-react'
import { company, telHref, whatsappLink } from '../../data/company'
import { getProductBySlug, findCategory, products } from '../../data/products'
import { ProductCard } from '../../components/ProductCard'
import './product-detail.css'

function statusOf(a?: string) {
  if (a === 'available') return { label: 'In stock', cls: 'pd-chip pd-chip--ok' }
  if (a === 'inquiry-required') return { label: 'Inquiry required', cls: 'pd-chip pd-chip--warn' }
  return { label: 'Not specified', cls: 'pd-chip' }
}

function Rings() {
  return (
    <svg className="pd-rings" viewBox="0 0 600 600" aria-hidden="true">
      {[90, 150, 215, 280].map((r) => <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeWidth="2" />)}
    </svg>
  )
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const product = slug ? getProductBySlug(slug) : undefined

  useEffect(() => { setLoading(true); setActive(0); const t = window.setTimeout(() => setLoading(false), 120); return () => window.clearTimeout(t) }, [slug])
  useEffect(() => {
    if (!product) return
    const prev = document.title
    document.title = product.name + ' | ' + company.name
    return () => { document.title = prev }
  }, [product])

  const category = product ? findCategory(product.category) : undefined
  const categoryLabel = category?.label || product?.category || 'Products'
  const categorySlug = category?.slug || product?.category || ''
  const images = useMemo(() => {
    if (!product) return []
    const raw = [product.image, ...(product.gallery || [])].filter((v): v is string => !!v)
    return Array.from(new Set(raw))
  }, [product])
  const related = useMemo(() => !product ? [] : products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4), [product])

  if (loading) {
    return (
      <div className="pd-page" aria-busy="true" aria-label="Loading product">
        <div className="pd-wrap"><div style={{ padding: '20px 0' }}><div className="pd-skel" style={{ width: 240, height: 14 }} /></div>
          <div className="pd-hero"><div><div className="pd-skel" style={{ width: 120, height: 28, borderRadius: 999 }} /><div className="pd-skel" style={{ height: 56, marginTop: 14, maxWidth: 520 }} /><div className="pd-skel" style={{ height: 18, marginTop: 14, maxWidth: 460 }} /><div className="pd-skel" style={{ height: 44, marginTop: 22, maxWidth: 280 }} /></div>
          <div className="pd-skel" style={{ minHeight: 320, borderRadius: 14 }} /></div>
          <div className="pd-body"><div><div className="pd-skel" style={{ height: 120 }} /></div><div className="pd-skel" style={{ height: 220, borderRadius: 14 }} /></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pd-page"><div className="pd-wrap pd-empty" role="status">
        <h1>We couldn\'t find this product</h1>
        <p>The product may have been moved or the link may be incorrect.</p>
        <div style={{ marginTop: 18 }}><Link className="pd-btn pd-btn--red" to="/products">Back to products</Link></div>
      </div></div>
    )
  }

  const whatsAppMessage = 'Hello ' + company.name + ', I would like to request a quotation for ' + product.name + (product.model ? ' (Model: ' + product.model + ')' : '') + '. Please share the price, specifications, availability, and delivery details.'
  const whatsAppUrl = whatsappLink(whatsAppMessage)
  const quoteHref = '/contact?subject=' + encodeURIComponent('Quotation request') + '&product=' + encodeURIComponent(product.slug)
  const datasheet = (product.documents || []).find(d => d.url && /datasheet/i.test(d.label)) || (product.documents || []).find(d => d.url)
  const status = statusOf(product.availability)
  const specRows: { label: string; value: string }[] = [...(product.specifications || [])]
  if (product.compatibility?.length) specRows.push({ label: 'Compatibility', value: product.compatibility.join(', ') })
  if (product.certifications?.length) specRows.push({ label: 'Certifications', value: product.certifications.join(', ') })

  const copySpecs = async () => {
    const text = specRows.map(r => r.label + ': ' + r.value).join('\n')
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1400) } catch {}
  }
  const onImgErr = (e: SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none' }

  return (
    <div className="pd-page">
      <div className="pd-wrap">
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/products">Products</Link></li><li aria-hidden="true">/</li>
            <li><Link to={'/products/' + categorySlug}>{categoryLabel}</Link></li><li aria-hidden="true">/</li>
            <li><span aria-current="page">{product.name}</span></li>
          </ol>
        </nav>

        <section className="pd-hero" aria-labelledby="pd-title">
          <div>
            <span className="pd-cat">{categoryLabel}</span>
            <h1 id="pd-title" className="pd-title">{product.name}</h1>
            <div className="pd-meta">
              {product.brand ? <span className="pd-chip"><b>Brand:</b> {product.brand}</span> : null}
              {product.model ? <span className="pd-chip"><b>Model:</b> {product.model}</span> : null}
              <span className={status.cls}>{status.label}</span>
            </div>
            <p className="pd-lead">{product.shortDescription || product.description}</p>
            <div className="pd-actions">
              <a className="pd-btn pd-btn--red" href={quoteHref}><Phone size={16} aria-hidden="true" /> Request a quotation</a>
              {datasheet?.url ? <a className="pd-btn pd-btn--outline" href={datasheet.url} target="_blank" rel="noopener noreferrer"><Download size={16} aria-hidden="true" /> Download datasheet</a> : null}
              <a className="pd-btn pd-btn--wa" href={whatsAppUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
            </div>
          </div>
          <div>
            <div className="pd-stage">
              <Rings />
              <div className="pd-stage-main">
                {images[active] ? <img key={images[active]} className="pd-fade pd-img--blend" src={images[active]} alt={product.name} loading="eager" decoding="async" onError={onImgErr} /> : <div className="pd-nodata" style={{ position: 'relative', zIndex: 1 }}>Image not available</div>}
              </div>
            </div>
            {images.length > 1 ? (
              <div className="pd-thumbs" aria-label="Product images">
                {images.map((src, i) => (
                  <button key={src} type="button" className={'pd-thumb ' + (i === active ? 'is-on' : '')} onClick={() => setActive(i)} aria-label={'View image ' + (i + 1)} aria-pressed={i === active}>
                    <img src={src} alt="" loading="lazy" decoding="async" onError={onImgErr} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <div className="pd-body">
          <div className="pd-main">
            {product.description ? (
              <section className="pd-section" aria-labelledby="pd-overview"><h2 id="pd-overview">Product overview</h2><p className="pd-prose">{product.description}</p></section>
            ) : null}
            {product.features?.length ? (
              <section className="pd-section" aria-labelledby="pd-features"><h2 id="pd-features">Key features</h2>
                <ul className="pd-features">{product.features.map(f => <li key={f}><CheckCircle2 size={18} aria-hidden="true" /><span>{f}</span></li>)}</ul>
              </section>
            ) : null}
            {product.applications?.length ? (
              <section className="pd-section" aria-labelledby="pd-apps"><h2 id="pd-apps">Applications</h2>
                <ul className="pd-features">{product.applications.map(a => <li key={a}><CheckCircle2 size={18} aria-hidden="true" /><span>{a}</span></li>)}</ul>
              </section>
            ) : null}
            {product.documents?.some(d => d.url) ? (
              <section className="pd-section" aria-labelledby="pd-docs"><h2 id="pd-docs">Technical documents</h2>
                <div className="pd-card"><ul className="pd-docs">{product.documents!.filter(d => d.url).map(d => <li key={d.label}><a href={d.url!} target="_blank" rel="noopener noreferrer"><Download size={14} aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 6 }} />{d.label}</a></li>)}</ul></div>
              </section>
            ) : product.documents?.length ? (
              <section className="pd-section" aria-labelledby="pd-docs"><h2 id="pd-docs">Technical documents</h2><div className="pd-card"><p className="pd-nodata">No technical documents available for this product.</p></div></section>
            ) : null}
          </div>

          <aside className="pd-side" aria-label="Product details">
            {specRows.length ? (
              <div className="pd-card">
                <div className="pd-card-head"><h2>Technical specifications</h2><button type="button" className="pd-ghost" onClick={copySpecs}><Copy size={13} aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 4 }} />{copied ? 'Copied' : 'Copy specs'}</button></div>
                <dl className="pd-specs">{specRows.map(r => <div key={r.label}><dt>{r.label}</dt><dd>{/cert/i.test(r.label) ? <span className="pd-badge">{r.value}</span> : r.value}</dd></div>)}</dl>
              </div>
            ) : null}
            <div className="pd-price">
              <h3>Need pricing?</h3>
              <a className="pd-btn pd-btn--red" href={quoteHref}><Phone size={16} aria-hidden="true" /> Request a quotation</a>
              <p><a href={telHref()} style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>{company.phones[0]?.display}</a></p>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="pd-related" aria-labelledby="pd-related"><h2 id="pd-related">More from {categoryLabel}</h2>
            <div className="pd-related-grid">{related.map(p => <ProductCard key={p.id} slug={p.slug} name={p.name} category={p.category} brand={p.brand} model={p.model} shortDescription={p.shortDescription} image={p.image} availability={p.availability} />)}</div>
          </section>
        ) : null}
      </div>

      <div className="pd-sticky" aria-label="Quick actions"><span>{product.name}</span><a className="pd-btn pd-btn--red" href={quoteHref}>Get quote</a></div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { findCategory, productImage, productImageOriginal } from '../data/products'
import { brands } from '../data/brands'
import { company, whatsappLink } from '../data/company'
import { ArrowRight, Phone } from 'lucide-react'
import type { SyntheticEvent } from 'react'

function cleanDescription(text?: string | null): string {
  if (!text) return ''
  let t = String(text).replace(/\s+/g, ' ').trim()
  t = t.replace(/\(?\s*(as\s+)?listed(\s+by\s+source)?\s*\)?\.?$/i, '').trim()
  t = t.replace(/\(?\s*by\s+source\s*\)?\.?$/i, '').trim()
  return t
}

function onImgError(e: SyntheticEvent<HTMLImageElement>, orig?: string) {
  const t = e.currentTarget
  if (t.dataset.step === '2') { t.dataset.step = '3'; t.style.display = 'none'; t.alt = ''; return }
  t.removeAttribute('srcset')
  if (t.dataset.step !== '1' && orig && orig !== t.src && !orig.startsWith('data:image/svg')) { t.dataset.step = '1'; t.src = orig; return }
  t.dataset.step = '2'; t.onerror = null; t.alt = ''
}

interface ProductCardProps {
  slug: string
  name: string
  category: string
  brand?: string
  model?: string
  shortDescription: string
  image: string | null
  availability?: string
}

export function ProductCard({ slug, name, category, brand, model, shortDescription, image }: ProductCardProps) {
  const categoryLabel = findCategory(category)?.label || category
  const brandEntry = brand ? brands.find((b) => b.name.toLowerCase() === brand.toLowerCase()) : null
  const whatsAppMessage = `Hello ${company.name}, I would like to request a quotation for ${name}. Please share the price, specifications, availability, and delivery details.`
  const whatsAppUrl = whatsappLink(whatsAppMessage)
  const src480 = productImage({ image }, 480)
  const src960 = productImage({ image }, 960)
  const srcOrig = productImageOriginal({ image })
  const srcSet = src480 !== src960 && !src960.startsWith('data:') ? `${src480} 480w, ${src960} 960w` : undefined
  const desc = cleanDescription(shortDescription)
  return (
    <article data-surface="light" style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: '#fff', border: '1px solid #dde3ee', borderRadius: 14, overflow: 'hidden', color: 'var(--color-hse-blue)' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#eef2f9', overflow: 'hidden', display: 'grid', placeItems: 'center', padding: '44px 16px 16px', borderBottom: '1px solid rgba(1,78,182,.06)' }}>
        <Link to={`/products/${slug}`} aria-label={name} style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', minHeight: 0 }}>
          <img src={src960} srcSet={srcSet} sizes="(max-width:640px) 92vw, 320px" onError={(e) => onImgError(e, srcOrig)} alt={name} loading="lazy" decoding="async" width="960" height="720" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', objectPosition: 'center', mixBlendMode: 'multiply' }} />
        </Link>
        <span title={categoryLabel} style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, maxWidth: 'calc(100% - 24px)', padding: '4px 10px', borderRadius: 999, background: '#fff', border: '1px solid #dde3ee', color: 'var(--color-hse-blue)', font: '600 12px/1.2 Inter,sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{categoryLabel}</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <h3 title={name} style={{ margin: 0, font: '700 22px/1.15 "Barlow Condensed","Oswald",Montserrat,sans-serif', color: '#0a1e3f', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.3em' }}><Link to={`/products/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{name}</Link></h3>
        <p style={{ margin: 0, color: '#5b6b85', font: '400 14px/1.5 Inter,sans-serif', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '4.5em', visibility: desc ? 'visible' : 'hidden' }}>{desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>{brand?.trim() ? <span style={{ padding: '4px 8px', borderRadius: 999, background: 'var(--color-hse-blue-50)', color: '#5b6b85', font: '400 12px/1 Inter,sans-serif' }}>{brandEntry ? <Link to={`/brands/${brandEntry.id}`} style={{ color: 'inherit' }}>{brand}</Link> : brand}</span> : null}{model?.trim() ? <span style={{ padding: '4px 8px', borderRadius: 999, background: 'var(--color-hse-blue-50)', color: '#5b6b85', font: '400 12px/1 Inter,sans-serif' }}>Model: {model}</span> : null}</div>
        <div style={{ paddingTop: 4, display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
          <Link to={`/products/${slug}`} style={{ height: 44, minWidth: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 8, background: 'var(--color-hse-blue)', color: '#fff', font: '600 14px/1 Inter,sans-serif', textDecoration: 'none' }}>View details <ArrowRight size={14} /></Link>
          <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get quote for ${name} on WhatsApp`} style={{ height: 44, minWidth: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 8, border: '1px solid #dde3ee', background: '#fff', color: '#0a1e3f', font: '600 14px/1 Inter,sans-serif', textDecoration: 'none' }}><Phone size={14} /> Get quote</a>
        </div>
      </div>
    </article>
  )
}

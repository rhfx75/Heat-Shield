import { Link } from 'react-router-dom'
import { findCategory, productImage, productImageOriginal } from '../data/products'
import { brands } from '../data/brands'
import { company, whatsappLink } from '../data/company'
import { ArrowRight, Phone } from 'lucide-react'
import type { SyntheticEvent } from 'react'

const FALLBACK_IMG = '/images/products/placeholder-product.svg'

function onImgError(e: SyntheticEvent<HTMLImageElement>, orig?: string) {
  const t = e.currentTarget
  if (t.dataset.step === '2') return
  t.removeAttribute('srcset')
  if (t.dataset.step !== '1' && orig && orig !== t.src && !orig.startsWith('data:image/svg')) { t.dataset.step = '1'; t.src = orig; return }
  t.dataset.step = '2'; t.onerror = null; t.alt = ''; t.src = FALLBACK_IMG
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
  return (
    <article data-surface="light" style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: '#fff', border: '1px solid var(--color-hse-border)', borderRadius: 16, overflow: 'hidden', color: 'var(--color-hse-blue)' }}>
      <Link to={`/products/${slug}`} style={{ display: 'grid', placeItems: 'center', width: '100%', aspectRatio: '4 / 3', background: 'radial-gradient(circle at 50% 35%, #fff, var(--color-hse-blue-50) 76%)', padding: 12, borderBottom: '1px solid rgba(1,78,182,.06)' }}>
        <img src={src960} srcSet={srcSet} sizes="(max-width:640px) 92vw, 320px" onError={(e) => onImgError(e, srcOrig)} onLoad={(e) => { const t = e.currentTarget; if (t.complete && t.naturalWidth === 0) onImgError({ currentTarget: t } as SyntheticEvent<HTMLImageElement>, srcOrig) }} alt={name} loading="lazy" decoding="async" width="960" height="720" style={{ display: 'block', width: '100%', height: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center' }} />
      </Link>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
        <span style={{ alignSelf: 'flex-start', padding: '4px 9px', borderRadius: 999, background: 'var(--color-hse-blue-pale)', color: 'var(--color-hse-blue)', font: '700 .68rem/1 Montserrat,sans-serif' }}>{categoryLabel}</span>
        <h3 style={{ margin: 0, font: '700 1rem/1.3 Montserrat,sans-serif' }}><Link to={`/products/${slug}`} style={{ color: 'var(--color-hse-blue)', textDecoration: 'none' }}>{name}</Link></h3>
        {(brand || model) ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{brand ? <span style={{ padding: '4px 8px', borderRadius: 999, background: 'var(--color-hse-blue-50)', color: 'var(--color-hse-blue)', font: '600 .74rem/1 Inter,sans-serif' }}>{brandEntry ? <Link to={`/brands/${brandEntry.id}`} style={{ color: 'inherit' }}>{brand}</Link> : brand}</span> : null}{model ? <span style={{ padding: '4px 8px', borderRadius: 999, background: 'var(--color-hse-blue-50)', color: 'var(--color-hse-blue)', font: '600 .74rem/1 Inter,sans-serif' }}>Model: {model}</span> : null}</div> : null}
        <p style={{ margin: 0, color: 'var(--color-hse-body-text)', font: '400 .9rem/1.6 Inter,sans-serif', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{shortDescription}</p>
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
          <Link to={`/products/${slug}`} style={{ minHeight: 44, minWidth: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, background: 'var(--color-hse-blue)', color: '#fff', font: '600 .86rem/1 Inter,sans-serif', textDecoration: 'none' }}>View Details <ArrowRight size={14} /></Link>
          <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get quote for ${name} on WhatsApp`} style={{ minHeight: 44, minWidth: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, background: '#c62828', color: '#fff', font: '600 .86rem/1 Inter,sans-serif', textDecoration: 'none' }}><Phone size={14} /> Get Quote</a>
        </div>
      </div>
    </article>
  )
}

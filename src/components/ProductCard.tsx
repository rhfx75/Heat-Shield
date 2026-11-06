import { Link } from 'react-router-dom'
import { findCategory } from '../data/products'
import { brands } from '../data/brands'
import { Phone, ArrowRight } from 'lucide-react'

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

export function ProductCard({
  slug,
  name,
  category,
  brand,
  model,
  shortDescription,
  image,
}: ProductCardProps) {
  const categoryLabel = findCategory(category)?.label || category

  const brandEntry = brand ? brands.find((b) => b.name.toLowerCase() === brand.toLowerCase()) : null

  const whatsAppNumber = '8801788585741'
  const whatsAppMessage = `Hello HEAT SHIELD ENGINEERING, I would like to request a quotation for ${name}. Please share the price, specifications, availability, and delivery details.`
  const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`

  return (
    <article className="product-card">
      <div className="product-card-accent" />
      <div className="product-card-image">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="product-card-placeholder">
            Image Coming Soon
          </div>
        )}
      </div>
      <div className="product-card-info">
        <span className="product-card-category">{categoryLabel}</span>
        <h3 className="product-card-name">{name}</h3>
        <div className="product-card-chips">
          {brand && (
            <span className="product-card-chip">
              {brandEntry ? (
                <Link to={`/brands/${brandEntry.id}`} className="chip-link">
                  {brand}
                </Link>
              ) : (
                brand
              )}
            </span>
          )}
          {model && (
            <span className="product-card-chip">Model: {model}</span>
          )}
        </div>
        <p className="product-card-description">{shortDescription}</p>
      </div>
      <div className="product-card-actions">
        <Link
          to={`/products/${slug}`}
          className="product-card-view-details"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card-quote"
          aria-label={`Get quote for ${name} on WhatsApp`}
        >
          <Phone className="w-3.5 h-3.5" />
          Get Quote
        </a>
      </div>
    </article>
  )
}

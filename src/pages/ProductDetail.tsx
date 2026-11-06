import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getProductBySlug, findCategory, products, whatsAppConfig } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { Phone, Download } from 'lucide-react'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return (
      <div className="section text-center py-24">
        <h1 className="text-2xl font-bold text-hse-primary mb-4">Product Not Found</h1>
        <Link to="/products" className="text-hse-red hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  const category = findCategory(product.category)
  const categoryLabel = category?.label || product.category
  const categorySlug = category?.slug || product.category

  const whatsAppMessage = whatsAppConfig.messageTemplate(product.name)
  const whatsAppUrl = `https://wa.me/${whatsAppConfig.number}?text=${encodeURIComponent(whatsAppMessage)}`

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="product-container page-container detail-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">Home</Link>
          </li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item">
            <Link to="/products" className="breadcrumb-link">Products</Link>
          </li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item">
            <Link to={`/products/${categorySlug}`} className="breadcrumb-link">
              {categoryLabel}
            </Link>
          </li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item breadcrumb-current">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="detail-hero">
        <div className="detail-image-col">
          <div className="detail-image-wrapper">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="detail-image"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="detail-image-placeholder">
                <span className="placeholder-label">{product.name}</span>
              </div>
            )}
          </div>
        </div>
        <div className="detail-info-col">
          <span className="detail-category-chip">{categoryLabel}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-meta">
            {product.brand && (
              <span className="detail-meta-item">
                <strong>Brand:</strong> {product.brand}
              </span>
            )}
            {product.model && (
              <span className="detail-meta-item">
                <strong>Model:</strong> {product.model}
              </span>
            )}
          </div>
          <p className="detail-description">{product.shortDescription || product.description}</p>

          <div className="detail-actions">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quote"
              aria-label={`Request a quotation for ${product.name}`}
            >
              <Phone className="w-4 h-4" />
              Request a Quotation
            </a>
          </div>
        </div>
      </section>

      <section className="detail-content">
        <div className="detail-grid">
          <div className="detail-column detail-column-main">
            {product.description && (
              <div className="detail-section">
                <h2 className="detail-section-title">Product Overview</h2>
                <p className="detail-section-text">{product.description}</p>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="detail-section">
                <h2 className="detail-section-title">Key Features</h2>
                <ul className="feature-list">
                  {product.features.map((feat) => (
                    <li key={feat} className="feature-item">
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.applications && product.applications.length > 0 && (
              <div className="detail-section">
                <h2 className="detail-section-title">Applications</h2>
                <ul className="application-list">
                  {product.applications.map((app) => (
                    <li key={app} className="application-item">
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="detail-column detail-column-side">
            {(product.specifications && product.specifications.length > 0) ||
              (product.compatibility && product.compatibility.length > 0) ||
              (product.certifications && product.certifications.length > 0) ? (
              <div className="detail-section detail-card">
                <h2 className="detail-section-title">Technical Specifications</h2>
                {product.specifications && product.specifications.length > 0 ? (
                  <table className="specs-table">
                    <tbody>
                      {product.specifications.map((spec) => (
                        <tr key={spec.label}>
                          <td className="spec-label">{spec.label}</td>
                          <td className="spec-value">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
                {product.compatibility && product.compatibility.length > 0 && (
                  <div className="spec-row mt-4">
                    <span className="spec-label">Compatibility</span>
                    <span className="spec-value">{product.compatibility.join(', ')}</span>
                  </div>
                )}
                {product.certifications && product.certifications.length > 0 && (
                  <div className="spec-row mt-4">
                    <span className="spec-label">Certifications</span>
                    <span className="spec-value">{product.certifications.join(', ')}</span>
                  </div>
                )}
              </div>
            ) : null}

            {(product.documents && product.documents.length > 0) && (
              <div className="detail-section detail-card">
                <h2 className="detail-section-title">Technical Documents</h2>
                <ul className="documents-list">
                  {product.documents
                    .filter((d) => d.url)
                    .map((doc) => (
                      <li key={doc.label} className="document-item">
                        <a
                          href={doc.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {doc.label}
                        </a>
                      </li>
                    ))}
                </ul>
                {product.documents.every((d) => !d.url) && (
                  <p className="no-data">No technical documents available for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2 className="related-title">Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                category={p.category}
                brand={p.brand}
                model={p.model}
                shortDescription={p.shortDescription}
                image={p.image}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

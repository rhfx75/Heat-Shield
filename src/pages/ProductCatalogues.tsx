import { Download, FileText } from 'lucide-react'
import { catalogueDocuments } from '../data/products'

const TYPE_LABELS: Record<string, string> = {
  datasheet: 'Datasheet',
  catalogue: 'Catalogue',
  manual: 'Manual',
  certificate: 'Certificate',
}

export function ProductCatalogues() {
  return (
    <div className="product-container page-container">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Product Catalogues &amp; Technical Documents</h1>
          <p className="section-subtitle">
            Access technical catalogues, product brochures, installation manuals, and datasheets for
            HEAT SHIELD ENGINEERING's fire safety and engineering solutions.
          </p>

          <div className="catalogues-grid">
            {catalogueDocuments.map((doc) => (
              <div key={doc.id} className="catalogue-card">
                <div className="catalogue-card-header">
                  <div className="catalogue-card-icon">
                    {doc.type === 'catalogue' ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </div>
                  <span className="catalogue-card-type">
                    {TYPE_LABELS[doc.type]}
                  </span>
                </div>
                <h3 className="catalogue-card-title">{doc.title}</h3>
                <p className="catalogue-card-manufacturer">{doc.manufacturer}</p>
                <div className="catalogue-card-meta">
                  <span className="catalogue-card-meta-item">
                    {doc.fileSize || 'File size to be specified'}
                  </span>
                  <span className="catalogue-card-meta-item">
                    {doc.lastUpdated || 'Last updated to be specified'}
                  </span>
                </div>
                {doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalogue-card-download"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>
                ) : (
                  <button className="catalogue-card-download catalogue-card-download-disabled" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="catalogue-note">
            Download links will be activated as PDF files are uploaded. Backend integration required
            to serve document files.
          </p>
        </div>
      </section>
    </div>
  )
}

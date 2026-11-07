import { products, productCategories, catalogueDocuments, whatsAppConfig } from './products'
import type { Product, ProductCategory, CatalogueDocument, WhatsAppConfig } from './products'

export type RawCatalog = { products: Product[]; categories: ProductCategory[]; catalogueDocuments: CatalogueDocument[]; whatsAppConfig: WhatsAppConfig }

export async function loadCatalog(): Promise<RawCatalog> {
  return { products, categories: productCategories, catalogueDocuments, whatsAppConfig }
}

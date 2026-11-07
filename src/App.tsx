import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { ServiceDetail } from './pages/ServiceDetail'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { ProductCatalogues } from './pages/ProductCatalogues'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Brands } from './pages/Brands'
import { BrandDetail } from './pages/BrandDetail'
import { Resources } from './pages/Resources'
import { Contact } from './pages/Contact'
import StandardsPage from './pages/Standards/StandardsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="products/fire-protection" element={<Products category="fire-protection-system" />} />
          <Route path="products/fire-detection" element={<Products category="fire-detection-system" />} />
          <Route path="products/fire-rated-doors" element={<Products category="fire-rated-doors" />} />
          <Route path="products/passive-fire-protection" element={<Products category="passive-fire-protection" />} />
          <Route path="products/electrical-safety" element={<Products category="electrical-safety" />} />
          <Route path="products/electrical-system" element={<Products category="electrical-system" />} />
          <Route path="products/industrial-safety-equipment" element={<Products category="industrial-safety-equipment" />} />
          <Route path="products/industrial-automation" element={<Products category="industrial-automation" />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="product-catalogues" element={<ProductCatalogues />} />
          <Route path="standards" element={<StandardsPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:id" element={<BrandDetail />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


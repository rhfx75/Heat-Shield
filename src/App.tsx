import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })))
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const ProductDetail = lazy(() => import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })))
const ProductCatalogues = lazy(() => import('./pages/ProductCatalogues').then((m) => ({ default: m.ProductCatalogues })))
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })))
const Brands = lazy(() => import('./pages/Brands').then((m) => ({ default: m.Brands })))
const BrandDetail = lazy(() => import('./pages/BrandDetail').then((m) => ({ default: m.BrandDetail })))
const Resources = lazy(() => import('./pages/Resources').then((m) => ({ default: m.Resources })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const StandardsPage = lazy(() => import('./pages/Standards/StandardsPage'))

function RouteFallback() {
  return <div className="container section" role="status" aria-live="polite"><p className="text-hse-muted">Loading…</p></div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Suspense fallback={<RouteFallback />}><Home /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<RouteFallback />}><About /></Suspense>} />
          <Route path="services" element={<Suspense fallback={<RouteFallback />}><Services /></Suspense>} />
          <Route path="services/:id" element={<Suspense fallback={<RouteFallback />}><ServiceDetail /></Suspense>} />
          <Route path="products" element={<Suspense fallback={<RouteFallback />}><Products /></Suspense>} />
          <Route path="products/fire-protection" element={<Suspense fallback={<RouteFallback />}><Products category="fire-protection-system" /></Suspense>} />
          <Route path="products/fire-detection" element={<Suspense fallback={<RouteFallback />}><Products category="fire-detection-system" /></Suspense>} />
          <Route path="products/fire-rated-doors" element={<Suspense fallback={<RouteFallback />}><Products category="fire-rated-doors" /></Suspense>} />
          <Route path="products/passive-fire-protection" element={<Suspense fallback={<RouteFallback />}><Products category="passive-fire-protection" /></Suspense>} />
          <Route path="products/electrical-safety" element={<Suspense fallback={<RouteFallback />}><Products category="electrical-safety" /></Suspense>} />
          <Route path="products/electrical-system" element={<Suspense fallback={<RouteFallback />}><Products category="electrical-system" /></Suspense>} />
          <Route path="products/industrial-safety-equipment" element={<Suspense fallback={<RouteFallback />}><Products category="industrial-safety-equipment" /></Suspense>} />
          <Route path="products/industrial-automation" element={<Suspense fallback={<RouteFallback />}><Products category="industrial-automation" /></Suspense>} />
          <Route path="products/:slug" element={<Suspense fallback={<RouteFallback />}><ProductDetail /></Suspense>} />
          <Route path="product-catalogues" element={<Suspense fallback={<RouteFallback />}><ProductCatalogues /></Suspense>} />
          <Route path="standards" element={<Suspense fallback={<RouteFallback />}><StandardsPage /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<RouteFallback />}><Projects /></Suspense>} />
          <Route path="projects/:id" element={<Suspense fallback={<RouteFallback />}><ProjectDetail /></Suspense>} />
          <Route path="brands" element={<Suspense fallback={<RouteFallback />}><Brands /></Suspense>} />
          <Route path="brands/:id" element={<Suspense fallback={<RouteFallback />}><BrandDetail /></Suspense>} />
          <Route path="resources" element={<Suspense fallback={<RouteFallback />}><Resources /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<RouteFallback />}><Contact /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


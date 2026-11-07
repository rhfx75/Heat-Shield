import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { TrustStrip } from './home-sections/TrustStrip'
import { IntroActions } from './home-sections/IntroActions'
import { ServicesSection } from './home-sections/ServicesSection'
import { CategoriesSection } from './home-sections/CategoriesSection'
import { FeaturedProducts } from './home-sections/FeaturedProducts'
import { BrandsMarquee } from './home-sections/BrandsMarquee'
import { HowWeWork } from './home-sections/HowWeWork'
import { StandardsSection } from './home-sections/StandardsSection'
import { ProjectsPreview } from './home-sections/ProjectsPreview'
import { company } from '../data/company'
import './home-sections/home-sections.css'

const META_DESC = 'Heat Shield Engineering supplies and installs fire detection, protection and utility equipment for industrial, commercial and institutional facilities in Bangladesh.' // 155 chars

export function Home() {
  useEffect(() => {
    document.title = 'Heat Shield Engineering | Fire detection and protection in Bangladesh'
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content = META_DESC
  }, [])

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    telephone: company.phones?.[0]?.tel,
    email: company.emails?.[0]?.address,
  }

  return (
    <div className="hs">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Hero />
      <TrustStrip />
      <IntroActions />
      <ServicesSection />
      <CategoriesSection />
      <FeaturedProducts />
      <BrandsMarquee />
      <HowWeWork />
      <StandardsSection />
      <ProjectsPreview />
    </div>
  )
}

export default Home

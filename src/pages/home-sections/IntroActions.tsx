import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../../data/company'
import { useReveal } from './useReveal'

export function IntroActions() {
  const { ref, shown } = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="hero-next" className="hs-section hs-section--white" aria-labelledby="hs-intro-title">
      <div className="hs-container hs-intro">
        <div className={`hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: 0 }}>
          <div className="hs-head__bar" aria-hidden="true" />
          <h2 id="hs-intro-title" className="hs-head" style={{display:'block',marginBottom:0}}><span style={{font:"700 clamp(28px,3.2vw,40px)/1.05 'Barlow Condensed','Montserrat',sans-serif",color:'var(--ink)',textWrap:'balance',display:'block',maxWidth:'22ch'}}>Fire detection and protection equipment for Bangladesh</span></h2>
          <p>Heat Shield Engineering delivers reliable fire detection, fire protection and utility solutions for industrial, commercial and institutional facilities across Bangladesh, with sales, installation and maintenance support.</p>
        </div>
        <div className={`hs-intro__card hs-reveal ${shown ? 'is-shown' : ''}`} style={{ ['--r' as any]: 1 }}>
          <p>Tell us what you need and we will reply with a quote.</p>
          <div className="hs-actions">
            <Link to="/contact" className="hs-btn hs-btn--red hs-focus">Get a free quote</Link>
            <Link to="/products" className="hs-btn hs-btn--outline hs-focus">Explore products</Link>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hs-wa hs-focus"><MessageCircle aria-hidden="true" />WhatsApp us for a quick response</a>
        </div>
      </div>
    </section>
  )
}

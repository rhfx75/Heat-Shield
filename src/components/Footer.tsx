import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Footer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons()
    }
    const sf = document.querySelector('.sf')
    if (!sf) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sf.classList.add('in')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(sf)
  }, [])

  return (
    <footer className="sf">
      {/* Animated wave edge */}
      <svg
        className="sf-wave"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="w1" d="M0 40 C240 90 480 0 720 40 S1200 80 1440 30 V80 H0Z" />
        <path className="w2" d="M0 55 C260 10 500 90 760 50 S1220 20 1440 55 V80 H0Z" />
      </svg>

      {/* CTA band with sprinkler graphic */}
      <div className="sf-cta relative overflow-hidden" data-surface="dark">
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.45) 1px, transparent 0), radial-gradient(circle at 85% 30%, rgba(255,90,82,.18), transparent 22%)',backgroundSize:'20px 20px, auto'}} />
        <svg
          className="sf-sprk"
          viewBox="0 0 160 170"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M80 0v40" strokeOpacity={0.8} />
          <circle cx="80" cy="52" r="12" fill="#014EB6" />
          <path d="M68 52h24" />
          <g className="spray" strokeLinecap="round">
            <path d="M80 66 L30 150" />
            <path d="M80 66 L55 156" />
            <path d="M80 66 L80 160" />
            <path d="M80 66 L105 156" />
            <path d="M80 66 L130 150" />
          </g>
          <circle className="drop d1" cx="42" cy="120" r="3" fill="#fff" />
          <circle className="drop d2" cx="80" cy="125" r="3" fill="#fff" />
          <circle className="drop d3" cx="118" cy="120" r="3" fill="#fff" />
        </svg>
        <div className="sf-wrap sf-cta-in">
          <div>
            <h3>Need fire detection, fire protection or utility products for your facility?</h3>
            <p>Talk to our engineers for a site assessment and quotation.</p>
          </div>
          <div className="sf-btns">
            <Link to="/contact" className="sf-btn">
              <i data-lucide="file-clock" /> Request a Quote
            </Link>
            <a
              className="sf-btn sf-wa"
              href="https://wa.me/8801788585741"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="message-circle" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Flowing pipe line */}
      <svg
        className="sf-pipe"
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="8" x2="1200" y2="8" stroke="#014EB6" strokeWidth="8" />
        <line
          className="flow"
          x1="0"
          y1="8"
          x2="1200"
          y2="8"
          stroke="#0868D8"
          strokeWidth="3"
          strokeDasharray="14 18"
        />
      </svg>

      <div className="sf-wrap sf-grid">
        <div className="sf-about sf-r">
          <div className="sf-brand">
            <span className="sf-shield" style={{background:'#fff',padding:'4px'}}><img src="/images/heatshield-logo.png" alt="Heat Shield Engineering logo" style={{width:'40px',height:'40px',objectFit:'contain',display:'block'}} /></span>
            <span className="sf-name">
              HEAT SHIELD ENGINEERING<small>Fire Detection | Fire Protection | Utility Products</small>
            </span>
          </div>
          <p>
            Fire detection, fire protection, electrical safety and industrial
            engineering across Bangladesh.
          </p>
          <div className="sf-social">
            <a href="#" aria-label="Facebook">
              <i data-lucide="link" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <i data-lucide="link2" />
            </a>
            <a href="#" aria-label="Instagram">
              <i data-lucide="mail" />
            </a>
            <a
              href="https://wa.me/8801788585741"
              aria-label="WhatsApp"
            >
              <i data-lucide="phone" />
            </a>
          </div>
        </div>

        <div className="sf-r" style={{ '--d': '.1s' } as React.CSSProperties}>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="sf-r" style={{ '--d': '.2s' } as React.CSSProperties}>
          <h4>Services</h4>
          <ul>
            <li><a href="#">Fire Protection Design</a></li>
            <li><a href="#">Fire Detection &amp; Alarm</a></li>
            <li><a href="#">Fire Suppression Systems</a></li>
            <li><a href="#">Fire Pump &amp; Hydrant</a></li>
            <li><a href="#">Electrical &amp; Lightning Safety</a></li>
            <li><a href="#">Maintenance (AMC)</a></li>
          </ul>
        </div>

        <div className="sf-r" style={{ '--d': '.3s' } as React.CSSProperties}>
          <h4>Contact</h4>
          <ul className="sf-contact">
            <li>
              <i data-lucide="phone" />
              <a href="tel:01788585741">01788585741</a>
            </li>
            <li>
              <i data-lucide="mail" />
              <a href="mailto:heatshieldengineering01@gmail.com">
                heatshieldengineering01@gmail.com
              </a>
            </li>
            <li>
              <i data-lucide="map-pin" />
              <span>House-12, Road-04, Block-C, Banani, Dhaka-1213</span>
            </li>
            <li>
              <i data-lucide="clock" />
              <span>Sat–Thu: 9:00 AM – 6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="sf-bottom">
        <div className="sf-wrap sf-bottom-in">
          <span>© 2026 HEAT SHIELD ENGINEERING. All rights reserved.</span>
          <a
            href="#top"
            className="sf-up"
            aria-label="Back to top"
          >
            <i data-lucide="arrow-up" />
          </a>
          <span>Sales | Installation | Maintenance</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

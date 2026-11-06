import { SectionTitle } from '../components/SectionTitle'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

const ARTICLES = [
  {
    title: 'Fire Safety Basics for Commercial Buildings',
    excerpt: 'Understanding the essential fire protection systems every commercial facility should have in place.',
    date: 'November 2026',
    image: 'https://images.unsplash.com/photo-1590433731297-3c917351e73a?w=600&q=80',
  },
  {
    title: 'How Fire Hydrant Systems Work',
    excerpt: 'A technical overview of fire hydrant networks, pump sets, and water supply for industrial facilities.',
    date: 'October 2026',
    image: 'https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=600&q=80',
  },
  {
    title: 'Choosing the Right Fire Extinguisher',
    excerpt: 'A guide to selecting the appropriate extinguisher type for different classes of fire risk.',
    date: 'September 2026',
    image: 'https://images.unsplash.com/photo-1558488887-d9ad34e72142?w=600&q=80',
  },
  {
    title: 'Electrical Safety & Lightning Protection',
    excerpt: 'Preventing fire hazards through proper earthing, grounding, and surge protection systems.',
    date: 'August 2026',
    image: 'https://images.unsplash.com/photo-1623124703085-30db99557798?w=600&q=80',
  },
]

export function Resources() {
  return (
    <div>
      <section className="relative overflow-hidden hero">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="Resources and knowledge"
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-hse-primary/80" />
        </div>
        <div className="relative z-10 container section pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Resources</h1>
          <p className="text-lg text-white max-w-xl mx-auto">
            Fire safety knowledge, technical articles, and industry insights from our engineering team.
          </p>
        </div>
      </section>

      <section>
        <div className="container section">
          <SectionTitle
            title="Knowledge Center"
            subtitle="Technical articles, fire safety tips, and resources to help you make informed decisions."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <article key={article.title} className="rounded-xl border border-hse-border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
                <div className="h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-hse-red-600 uppercase tracking-wider">{article.date}</span>
                  <h3 className="font-bold text-hse-primary mb-3">{article.title}</h3>
                  <p className="text-hse-muted text-sm leading-relaxed mb-6">{article.excerpt}</p>
                  <Link to="#" className="text-sm font-semibold text-hse-red-600 hover:underline flex items-center gap-1 onClick={(e)=>e.preventDefault()}">
                    Read Article <span className="w-3 h-3">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container section">
          <SectionTitle
            title="Get Technical Support"
            subtitle="Have a fire safety question or need help with your facility?"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-hse-primary">Call Us</h4>
                  <p className="text-hse-muted text-sm">01788585741</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-hse-primary">Email Us</h4>
                  <p className="text-hse-muted text-sm">heatshieldengineering01@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-hse-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-hse-primary">Visit Us</h4>
                  <p className="text-hse-muted text-sm">House-12, Road-04, Block-C, Banani, Dhaka-1213, Bangladesh</p>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-xl border border-hse-border bg-white">
              <Link to="/contact">
                <Button variant="primary" className="w-full py-3">
                  Contact Our Team
                </Button>
              </Link>
              <div className="mt-4">
                <a href="https://wa.me/8801788585741" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                  <Button variant="whatsapp-sm" className="w-full justify-center">
                    <span className="text-sm">WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

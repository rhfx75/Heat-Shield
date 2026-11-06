import { Link } from 'react-router-dom'
import { ArrowRight, getServiceIcon } from '../graphics/services/serviceIcons'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon: string
  image: string
  category: string
  index?: number
}

export function ServiceCard({ id, title, description, icon, image, category, index = 0 }: ServiceCardProps) {
  const Icon = getServiceIcon(icon)

  return (
    <Link to={`/services/${id}`} className="hse-sv-card-link" aria-label={`${title} - Learn more`}>
      <article className="hse-sv-card service-card-premium">
        <div className="hse-sv-card__media">
          <img src={image} alt={title} width={640} height={400} loading="lazy" />
          <span className="hse-sv-card__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="hse-sv-card__body">
          <div className="hse-sv-card__meta">
            <span className="hse-sv-card__icon" aria-hidden="true"><Icon className="w-5 h-5" /></span>
            <span className="hse-sv-card__tag">{category}</span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="hse-sv-card__more">
            Learn More <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  )
}
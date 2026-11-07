import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export function SectionHeader({ id, title, intro, to, linkLabel }: { id: string; title: string; intro?: string; to?: string; linkLabel?: string; children?: ReactNode }) {
  return (
    <div className="hs-head">
      <div>
        <div className="hs-head__bar" aria-hidden="true" />
        <h2 id={id}>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {to && linkLabel ? <Link to={to} className="hs-head__link hs-focus">{linkLabel}</Link> : null}
    </div>
  )
}

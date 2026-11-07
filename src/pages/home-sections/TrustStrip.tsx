import { useEffect, useState } from 'react'
import { products, productCategories } from '../../data/products'
import { brands } from '../../data/brands'
import { useReveal } from './useReveal'

const PROJECTS_DELIVERED: number | null = null // TODO: set real delivered-project count when confirmed

function Count({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    const start = performance.now(), dur = 1200
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setV(Math.round(to * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{v}</>
}

export function TrustStrip() {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const items = [
    { label: 'Products', value: products.length },
    { label: 'Categories', value: productCategories.length },
    { label: 'Brands', value: new Set(brands.map(b => b.name)).size },
    ...(PROJECTS_DELIVERED != null ? [{ label: 'Projects delivered', value: PROJECTS_DELIVERED }] : []),
  ]
  return (
    <div className="hs-trust">
      <div className="hs-container">
        <div ref={ref} className={`hs-trust__card hs-reveal ${shown ? 'is-shown' : ''}`} style={{ gridTemplateColumns: `repeat(${items.length},minmax(0,1fr))` }}>
          {items.map((it, i) => (
            <div key={it.label} className="hs-trust__item" style={{ ['--r' as any]: i }}>
              <div className="hs-trust__num"><Count to={it.value} run={shown} /></div>
              <div className="hs-trust__label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

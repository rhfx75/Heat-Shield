import { motion } from 'framer-motion'

export type FilterKey = 'all' | 'Fire Protection' | 'Detection & Alarm' | 'Electrical Safety' | 'Maintenance'
export const FILTERS: { key: FilterKey; label: string; hash: string }[] = [
  { key: 'all', label: 'All', hash: '' },
  { key: 'Fire Protection', label: 'Fire Protection', hash: 'fire-protection' },
  { key: 'Detection & Alarm', label: 'Detection & Alarm', hash: 'detection-alarm' },
  { key: 'Electrical Safety', label: 'Electrical Safety', hash: 'electrical-safety' },
  { key: 'Maintenance', label: 'Maintenance', hash: 'maintenance' },
]

export function ServiceFilters({ active, counts, onSelect }: { active: FilterKey; counts: Record<string, number>; onSelect: (k: FilterKey) => void }) {
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); onSelect(FILTERS[(i + 1) % FILTERS.length].key) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); onSelect(FILTERS[(i - 1 + FILTERS.length) % FILTERS.length].key) }
    if (e.key === 'Home') { e.preventDefault(); onSelect(FILTERS[0].key) }
    if (e.key === 'End') { e.preventDefault(); onSelect(FILTERS[FILTERS.length - 1].key) }
  }
  return (
    <div className="hse-sv-filters" role="tablist" aria-label="Filter services">
      {FILTERS.map((f, i) => {
        const selected = active === f.key
        return (
          <button key={f.key} type="button" role="tab" id={`hse-sv-tab-${f.hash || 'all'}`} aria-selected={selected} aria-controls="hse-sv-grid" tabIndex={selected ? 0 : -1} className={`hse-sv-chip${selected ? ' is-selected' : ''}`} onClick={() => onSelect(f.key)} onKeyDown={(e) => onKey(e, i)}>
            {selected && <motion.span layoutId="hse-sv-chip-bg" className="hse-sv-chip__bg" aria-hidden="true" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="hse-sv-chip__label">{f.label}</span>
            <span className="hse-sv-chip__count">{counts[f.key] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}

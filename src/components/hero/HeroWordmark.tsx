export function HeroWordmark() {
  const line1 = 'HEAT SHIELD'.split('')
  const line2 = 'ENGINEERING'.split('')
  return (
    <div className="hse-hw" aria-hidden="true">
      <div className="hse-hw__line1">
        {line1.map((ch, i) => ch === ' ' ? <span key={i} className="hse-hw__sp" /> : <span key={i} className="hse-hw__ch" style={{ ['--i' as any]: i }}>{ch}</span>)}
        <span className="hse-hw__sweep" />
      </div>
      <div className="hse-hw__line2wrap">
        <span className="hse-hw__rule" />
        <span className="hse-hw__line2">{line2.map((ch, i) => <span key={i} style={{ ['--j' as any]: i }}>{ch}</span>)}</span>
        <span className="hse-hw__rule" />
      </div>
      <div className="hse-hw__shimmer" />
    </div>
  )
}

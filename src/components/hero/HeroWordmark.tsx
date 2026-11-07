export function HeroWordmark() {
  const heat = 'HEAT'.split('')
  const shield = 'SHIELD'.split('')
  const line2 = 'ENGINEERING'.split('')
  return (
    <div className="hse-hw" aria-hidden="true">
      <div className="hse-hw__line1">
        {heat.map((ch, i) => <span key={`h${i}`} className="hse-hw__ch hse-hw__ch--heat" style={{ ['--i' as any]: i }}>{ch}</span>)}
        <span className="hse-hw__sp" />
        {shield.map((ch, i) => <span key={`s${i}`} className="hse-hw__ch hse-hw__ch--shield" style={{ ['--i' as any]: i + 5 }}>{ch}</span>)}
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

import { brands } from '../../data/brands';
import { company } from '../../data/company';

function FlameGlyph() {
  return <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#FFB300" d="M12 2c2.8 4 6 6.2 6 11a6 6 0 1 1-12 0c0-2.6 1.1-4.6 2.8-6.8.6 2 1.4 3.2 3.2 4.4-.4-3 .1-5.7 0-8.6Z"/><path fill="#FF5A52" d="M12 10c1.4 2 3 3.2 3 5.5a3 3 0 1 1-6 0c0-1.2.5-2.2 1.3-3.3.3 1 .7 1.6 1.7 2.2-.2-1.5 0-2.9 0-4.4Z"/></svg>;
}

export function HubTicker() {
  const tags = ['Fire Detection', 'Fire Protection', 'Utility Products', 'Sales', 'Installation', 'Maintenance'];
  const tagTrack = [...tags, ...tags];
  const brandTrack = [...brands, ...brands];
  return (
    <div className="hse-hub-ticker" aria-label={`${company.name} capabilities and brands`}>
      <div className="hse-hub-ticker__row hse-hub-ticker__row--left">
        <div className="hse-hub-ticker__track">
          {tagTrack.map((t, i) => (
            <span className="hse-hub-ticker__item" key={`${t}-${i}`}><FlameGlyph />{t}</span>
          ))}
        </div>
      </div>
      <div className="hse-hub-ticker__row hse-hub-ticker__row--brands hse-hub-ticker__row--right">
        <div className="hse-hub-ticker__track">
          {brandTrack.map((b, i) => (
            <span className="hse-hub-ticker__brand" key={`${b.id}-${i}`} title={b.name}>
              <img src={b.image} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

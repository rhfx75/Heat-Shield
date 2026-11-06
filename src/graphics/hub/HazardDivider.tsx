import './hub.css';

export function HazardDivider() {
  return (
    <div className="hse-hub-divider" aria-hidden="true">
      <div className="hse-hub-divider__slash" />
      <div className="hse-hub-divider__chevrons" />
      <div className="hse-hub-divider__line" />
      <div className="hse-hub-divider__line hse-hub-divider__line--b" />
    </div>
  );
}

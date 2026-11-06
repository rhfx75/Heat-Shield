import { Link } from 'react-router-dom';
import { company, whatsappLink } from '../../data/company';
import { PullStation } from './PullStation';

export function EmergencyResponseHub() {
  return (
    <section className="hse-hub-cta" aria-labelledby="hse-hub-cta-title" data-surface="dark">
      <div className="hse-hub-cta__inner">
        <div>
          <h3 id="hse-hub-cta-title">Need fire detection, fire protection or utility products for your facility?</h3>
          <p>Talk to our engineers for a site assessment and quotation.</p>
          <div className="hse-hub-cta__actions">
            <Link to="/contact" className="hse-hub-btn hse-hub-btn--red">Request a Quote</Link>
            <a href={whatsappLink(`Hello ${company.name}, I need fire detection, fire protection, or utility product support for my facility.`)} target="_blank" rel="noopener noreferrer" className="hse-hub-btn hse-hub-btn--wa">WhatsApp</a>
          </div>
        </div>
        <PullStation />
      </div>
    </section>
  );
}

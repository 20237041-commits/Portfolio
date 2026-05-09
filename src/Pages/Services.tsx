

import { SERVICES } from '../Data/PortfolioData'

export default function Services() {
  return (
    <section className="page-wrap" id="services-page">

      <header className="page-header">
        <p className="page-label">What I Offer</p>
        <h1 className="page-title">My <span>Services</span></h1>
        <div className="bar" />
      </header>

      <div className="svc-grid" role="list">
        {SERVICES.map((svc, i) => (
          <div className="svc-card" key={i} role="listitem">
            <span className="svc-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="svc-icon" aria-hidden="true">
              <img className={svc.icon} alt="" style={{ width: '24px', height: '30px', objectFit: 'contain' }} />
            </div>
            <h2 className="svc-title">{svc.title}</h2>
            <p  className="svc-desc">{svc.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(238px, 1fr));
          gap: 20px;
        }
        .svc-card {
          padding: 30px 26px; border-radius: 14px;
          background: var(--card); border: 1px solid var(--border);
          position: relative; overflow: hidden;
          transition: border-color .25s, transform .25s;
        }
        .svc-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,212,255,.05), rgba(123,92,255,.05));
          opacity: 0; transition: opacity .3s;
        }
        .svc-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .svc-card:hover::before { opacity: 1; }

        .svc-num {
          position: absolute; top: 18px; right: 18px;
          font-size: 2.8rem; font-weight: 900; line-height: 1;
          color: rgba(255,255,255,.04);
          font-family: 'Playfair Display', serif;
          pointer-events: none;
        }
        .svc-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(0, 212, 255, .1);
          display: grid; place-items: center;
          font-size: 1.25rem; color: var(--accent); margin-bottom: 18px;
        }
        .svc-title { font-size: .98rem; font-weight: 600; margin-bottom: 10px; }
        .svc-desc  { font-size: .82rem; color: var(--muted); line-height: 1.72; }
      `}</style>
    </section>
  )
}

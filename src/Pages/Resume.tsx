

import { EXPERIENCE, EDUCATION, TECH_TAGS } from '../Data/PortfolioData'
import type { TimelineItem } from '../Data/PortfolioData'

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <article className="tl-item" key={i}>
          <div className="tl-dot" aria-hidden="true" />
          <time className="tl-date">{item.date}</time>
          <p  className="tl-role">{item.role}</p>
          <p  className="tl-place">{item.place}</p>
          <p  className="tl-desc">{item.desc}</p>
        </article>
      ))}
    </div>
  )
}

export default function Resume() {
  return (
    <section className="page-wrap" id="resume-page">

      <header className="page-header">
        <p className="page-label">My Experience</p>
        <h1 className="page-title">My <span>Resume</span></h1>
        <div className="bar" />
      </header>

      <div className="resume-grid">


        <div className="tl-section">
          <h2 className="tl-heading">
            <i className="fas fa-briefcase" aria-hidden="true" /> Work Experience
          </h2>
          <Timeline items={EXPERIENCE} />
        </div>


        <div className="tl-section">
          <h2 className="tl-heading">
            <i className="fas fa-graduation-cap" aria-hidden="true" /> Education
          </h2>
          <Timeline items={EDUCATION} />

          <h2 className="tl-heading" style={{ marginTop: '36px' }}>
            <i className="fas fa-code" aria-hidden="true" /> Tech Skills
          </h2>
          <ul className="tag-cloud" aria-label="Technical skills">
            {TECH_TAGS.map(tag => (
              <li className="tag" key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

      </div>

      <style>{`
        .resume-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
        }
        .tl-heading {
          font-size: .78rem; text-transform: uppercase;
          letter-spacing: .18em; color: var(--accent);
          margin-bottom: 26px;
          display: flex; align-items: center; gap: 9px;
          font-weight: 600;
        }

        /* Timeline */
        .timeline { position: relative; padding-left: 26px; }
        .timeline::before {
          content: ''; position: absolute;
          left: 7px; top: 8px; bottom: 0;
          width: 1px; background: var(--border);
        }
        .tl-item   { position: relative; margin-bottom: 30px; }
        .tl-dot {
          position: absolute; left: -22px; top: 5px;
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid var(--accent); background: var(--bg);
        }
        .tl-date  { font-size: .7rem; color: var(--accent); letter-spacing: .08em; display: block; }
        .tl-role  { font-size: .9rem; font-weight: 600; margin: 4px 0 2px; }
        .tl-place { font-size: .8rem; color: var(--muted); margin-bottom: 7px; }
        .tl-desc  { font-size: .82rem; color: var(--muted); line-height: 1.65; }

        /* Tag cloud */
        .tag-cloud {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 14px; list-style: none;
        }
        .tag {
          padding: 5px 14px; border-radius: 99px;
          border: 1px solid var(--border);
          font-size: .74rem; color: var(--muted); cursor: default;
          transition: border-color .2s, color .2s;
        }
        .tag:hover { border-color: var(--accent); color: var(--accent); }

        @media (max-width: 900px) {
          .resume-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

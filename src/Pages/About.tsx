// ============================================================
//  src/Pages/About.tsx  →  Route: /about
//  ── ABOUT PAGE ──
//
//  React Router hook:
//    useNavigate() — used by the "Download CV" button to send
//    the user to /resume without a full page reload.
//
//  What to edit:
//    • Bio paragraphs  → data/portfolioData.ts → PROFILE.bio
//    • Personal info   → data/portfolioData.ts → PROFILE.info
//    • Skill bars      → data/portfolioData.ts → SKILLS
//    • Your photo      → data/portfolioData.ts → PROFILE.heroImage
// ============================================================

import { useEffect, useRef } from 'react'
import { useNavigate }       from 'react-router-dom'    // ← Router
import { PROFILE, SKILLS }   from '../Data/PortfolioData'

export default function About() {
  const navigate = useNavigate()
  const barsRef  = useRef<HTMLDivElement>(null)

  // Trigger CSS width transition after mount so bars animate in
  useEffect(() => {
    const t = setTimeout(() => {
      barsRef.current
        ?.querySelectorAll<HTMLDivElement>('.skill-fill')
        .forEach(el => el.classList.add('animated'))
    }, 250)
    return () => clearTimeout(t)
  }, [])

  const { info, bio, name, heroImage, tagline } = PROFILE

  return (
    <section className="page-wrap" id="about-page">

      {/* ── Page header ── */}
      <header className="page-header">
        <p className="page-label">Get to know me</p>
        <h1 className="page-title">About <span>Me</span></h1>
        <div className="bar" />
        <p className="page-sub">
          Passionate designer &amp; developer crafting digital experiences that leave a lasting impression.
        </p>
      </header>

      <div className="about-grid">

        {/* ── Photo column ── */}
        {/* ↓ Image URL → data/portfolioData.ts → PROFILE.heroImage */}
        <div className="about-img-wrap">
          <img src={heroImage} alt={name} />
          <div className="img-frame" aria-hidden="true" />
        </div>

        {/* ── Text column ── */}
        <div className="about-body">
          {/* ↓ Tagline → PROFILE.tagline */}
          <h2 className="about-subtitle">{tagline}</h2>

          {/* ↓ Paragraphs → PROFILE.bio */}
          {bio.map((para, i) => (
            <p className="about-para" key={i}>{para}</p>
          ))}

          {/* Personal info grid — values from PROFILE.info */}
          <dl className="info-grid">
            {(
              [
                ['Birthday',  info.birthday],
                ['Age',       info.age],
                ['Location',  info.location],
                ['Email',     info.email],
                ['Phone',     info.phone],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div className="info-item" key={label}>
                <dt className="info-label">{label}</dt>
                <dd className="info-value">{value}</dd>
              </div>
            ))}
            <div className="info-item">
              <dt className="info-label">Freelance</dt>
              <dd className="info-value" style={{ color: info.freelance ? 'var(--accent)' : 'var(--muted)' }}>
                {info.freelance ? 'Available' : 'Unavailable'}
              </dd>
            </div>
          </dl>

          {/* ↓ Navigates to /resume on click */}
          <button className="btn btn-primary" onClick={() => navigate('/resume')}>
            <i className="fas fa-download" aria-hidden="true" /> Download CV
          </button>

          {/* ── Skill bars — values from SKILLS ── */}
          {/* ↓ Edit in data/portfolioData.ts → SKILLS */}
          <div className="skill-bars" ref={barsRef} aria-label="Skill levels">
            {SKILLS.map(sk => (
              <div className="skill-row" key={sk.label}>
                <div className="skill-meta">
                  <span>{sk.label}</span>
                  <span className="skill-pct">{sk.percent}%</span>
                </div>
                <div className="skill-track" role="progressbar" aria-valuenow={sk.percent} aria-valuemin={0} aria-valuemax={100}>
                  {/* --w CSS custom property drives the animated width */}
                  <div
                    className="skill-fill"
                    style={{ '--w': `${sk.percent}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.45fr;
          gap: 64px; align-items: start;
        }

        /* Photo */
        .about-img-wrap { position: relative; }
        .about-img-wrap img {
          width: 100%; border-radius: 16px; display: block;
          filter: grayscale(12%) contrast(1.03);
        }
        .img-frame {
          position: absolute; inset: 12px -12px -12px 12px;
          border: 2px solid var(--accent); border-radius: 16px; z-index: -1;
        }

        /* Text */
        .about-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem; font-weight: 700; margin-bottom: 18px;
        }
        .about-para {
          color: var(--muted); line-height: 1.8;
          font-size: .9rem; margin-bottom: 18px;
        }

        /* Info grid */
        .info-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px 24px; margin-bottom: 28px;
          list-style: none;
        }
        .info-item  { display: flex; flex-direction: column; gap: 3px; }
        .info-label {
          font-size: .68rem; text-transform: uppercase;
          letter-spacing: .12em; color: var(--muted);
        }
        .info-value { font-size: .87rem; color: var(--text); }

        /* Skill bars */
        .skill-bars { margin-top: 30px; }
        .skill-row  { margin-bottom: 15px; }
        .skill-meta {
          display: flex; justify-content: space-between;
          font-size: .78rem; margin-bottom: 7px;
        }
        .skill-pct  { color: var(--accent); }
        .skill-track {
          height: 3px; background: var(--border);
          border-radius: 99px; overflow: hidden;
        }
        .skill-fill {
          height: 100%; width: 0;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          border-radius: 99px;
          transition: width 1.3s cubic-bezier(.4,0,.2,1) .15s;
        }
        .skill-fill.animated { width: var(--w); }

        @media (max-width: 900px) {
          .about-grid  { grid-template-columns: 1fr; gap: 36px; }
          .img-frame   { display: none; }
          .info-grid   { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}

// ============================================================
//  src/Components/Sidebar.tsx
//  ── SIDEBAR / NAVIGATION ──
//
//  React Router hooks used:
//    NavLink  — Like <a> but adds className="active" automatically
//               when its `to` URL matches the current page.
//               The `end` prop on "/" prevents it matching every URL.
//
//  What to edit:
//    • Nav items  → ROUTES in data/portfolioData.ts
//    • Socials    → SOCIALS in data/portfolioData.ts
//    • Avatar     → PROFILE.avatar in data/portfolioData.ts
//    • Dropdown   → DROPDOWN array below
// ============================================================

import { useState } from 'react'
import { NavLink }  from 'react-router-dom'           // ← Router
import { PROFILE, SOCIALS, ROUTES } from '../Data/PortfolioData'

// Dropdown sub-items — edit paths to match your Route definitions
const DROPDOWN = [
  { label: 'All Projects', path: '/portfolio' },
  { label: 'Web Design',   path: '/services'  },
  { label: 'Get in Touch', path: '/contact'   },
]

export default function Sidebar() {
  const [dropOpen,   setDropOpen]   = useState<boolean>(false)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  // Close sidebar on mobile after a link is clicked
  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* ── Hamburger (visible on mobile only) ── */}
      <button
        className="hamburger"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle navigation"
        aria-expanded={mobileOpen}
      >
        <span /><span /><span />
      </button>

      {/* ── Sidebar panel ── */}
      <aside id="sidebar" className={mobileOpen ? 'open' : ''} aria-label="Site navigation">

        {/* Avatar */}
        <div className="sb-avatar-wrap">
          <div className="sb-avatar-ring" aria-hidden="true" />
          <img src={PROFILE.avatar} alt={`${PROFILE.name} avatar`} />
        </div>

        {/* Name */}
        <p className="sb-name">{PROFILE.name}</p>

        {/* Social links */}
        <div className="sb-socials" role="list">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              title={s.label}
              target="_blank"
              rel="noreferrer"
              role="listitem"
            >
              {/* 
                  CHANGE: Replace the <i> tag with an <img> tag 
                  since your 's.icon' is now an image path
              */}
              <img 
                src={s.icon} 
                alt={s.label} 
                style={{ width: '16px', height: '16px', objectFit: 'contain' }} 
              />
            </a>
          ))}
        </div>

        <div className="sb-divider" />

        {/* ── Navigation ── */}
        <nav onClick={closeMobile} aria-label="Main navigation">
          <ul>
            {/*
              ROUTES drives every nav item.
              NavLink: when `to` matches the URL → adds class "active"
              `end` on "/" ensures only exact "/" is highlighted,
              not every page that starts with "/".
            */}
            {ROUTES.map(route => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  end={route.path === '/'}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <i className={route.icon} aria-hidden="true" />
                  {route.label}
                </NavLink>
              </li>
            ))}

            {/* ── Dropdown section ── */}
            <li>
              <div
                className={`sb-dropdown-toggle ${dropOpen ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDropOpen(o => !o) }}
                role="button"
                aria-expanded={dropOpen}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setDropOpen(o => !o)}
              >
                <span className="left">
                  <i className="fas fa-server" aria-hidden="true" />
                  More
                </span>
                <i className="fas fa-chevron-down arrow" aria-hidden="true" />
              </div>

              {dropOpen && (
                <ul className="sb-submenu">
                  {DROPDOWN.map(d => (
                    <li key={d.label}>
                      <NavLink
                        to={d.path}
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => { setDropOpen(false); closeMobile() }}
                      >
                        {d.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <style>{`
        /* ── Hamburger ──────────────────────────────────────── */
        .hamburger {
          display: none;
          position: fixed; top: 16px; left: 16px; z-index: 300;
          flex-direction: column; gap: 5px; cursor: pointer;
          background: var(--sidebar); padding: 10px 11px;
          border-radius: 8px; border: 1px solid var(--border);
        }
        .hamburger span {
          display: block; width: 20px; height: 2px;
          background: var(--text); border-radius: 2px;
          transition: all .3s;
        }

        /* ── Sidebar panel ──────────────────────────────────── */
        #sidebar {
          position: fixed; top: 0; left: 0; z-index: 200;
          width: var(--sidebar-w); height: 100vh;
          background: var(--sidebar); border-right: 1px solid var(--border);
          display: flex; flex-direction: column; align-items: center;
          padding: 32px 0 24px;
          overflow-y: auto;
          transition: transform .3s cubic-bezier(.4,0,.2,1);
        }

        /* ── Avatar ─────────────────────────────────────────── */
        .sb-avatar-wrap {
          position: relative; width: 86px; height: 86px; margin-bottom: 14px;
        }
        .sb-avatar-wrap img {
          width: 100%; height: 100%; border-radius: 50%;
          object-fit: cover; border: 2px solid var(--accent);
          position: relative; z-index: 1;
        }
        .sb-avatar-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid transparent;
          background:
            linear-gradient(var(--sidebar), var(--sidebar)) padding-box,
            linear-gradient(135deg, var(--accent), var(--accent2)) border-box;
          animation: sbSpin 8s linear infinite;
        }
        @keyframes sbSpin { to { transform: rotate(360deg); } }

        .sb-name {
          font-family: 'Playfair Display', serif;
          font-size: .95rem; font-weight: 700;
          letter-spacing: .03em; margin-bottom: 14px; text-align: center;
          color: var(--text);
        }

        /* ── Socials ─────────────────────────────────────────── */
        .sb-socials {
          display: flex; gap: 7px; margin-bottom: 26px;
          flex-wrap: wrap; justify-content: center; padding: 0 10px;
        }
        .sb-socials a {
          width: 30px; height: 30px; border-radius: 7px;
          border: 1px solid var(--border);
          display: grid; place-items: center;
          color: var(--muted); font-size: .72rem; text-decoration: none;
          transition: border-color .22s, color .22s, transform .22s;
        }
        .sb-socials a:hover {
          border-color: var(--accent); color: var(--accent);
          transform: translateY(-2px);
        }

        .sb-divider { width: 78%; height: 1px; background: var(--border); margin-bottom: 14px; }

        /* ── Nav links ───────────────────────────────────────── */
        nav ul { list-style: none; width: 100%; }

        /* Both regular NavLink AND dropdown toggle share these */
        nav a,
        .sb-dropdown-toggle {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 22px; width: 100%;
          font-size: .81rem; font-weight: 400;
          color: var(--muted); text-decoration: none;
          border-left: 3px solid transparent;
          border-top: none; border-right: none; border-bottom: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: color .18s, background .18s, border-color .18s;
        }
        nav a i { font-size: .87rem; width: 15px; }

        nav a:hover        { color: var(--text); background: rgba(255,255,255,.03); }

        /* NavLink injects this class when URL matches */
        nav a.active {
          color: var(--accent);
          border-left-color: var(--accent);
          background: rgba(0, 212, 255, .06);
        }

        /* ── Dropdown toggle ─────────────────────────────────── */
        .sb-dropdown-toggle { justify-content: space-between; }
        .sb-dropdown-toggle .left { display: flex; align-items: center; gap: 10px; }
        .sb-dropdown-toggle i.arrow { font-size: .6rem !important; transition: transform .25s; }
        .sb-dropdown-toggle.open .arrow { transform: rotate(180deg); }
        .sb-dropdown-toggle:hover { color: var(--text); background: rgba(255,255,255,.03); }

        .sb-submenu { background: rgba(0,0,0,.18); list-style: none; }
        .sb-submenu a {
          padding-left: 46px !important; font-size: .76rem !important;
          border-left: none !important;
        }
        .sb-submenu a.active { color: var(--accent); }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width: 900px) {
          .hamburger    { display: flex; }
          #sidebar      { transform: translateX(-220px); }
          #sidebar.open { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}

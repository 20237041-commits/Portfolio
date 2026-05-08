// ============================================================
//  src/Pages/Notfound.tsx  →  Route: * (catch-all 404)
//  ── NOT FOUND PAGE ──
//
//  React Router hooks:
//    useNavigate()  — button click sends user back to /
//    useLocation()  — reads the current URL path so we can
//                     show which path wasn't found.
//
//  This route is defined LAST in App.tsx with path="*" so it
//  only matches URLs that no other route has claimed.
// ============================================================

import { useNavigate, useLocation } from 'react-router-dom'   // ← Router

export default function Notfound() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section id="notfound-page">
      <div className="nf-inner">

        {/* Large 404 heading */}
        <p className="nf-code" aria-label="Error 404">404</p>

        <h1 className="nf-title">Page Not Found</h1>

        {/* Shows which URL was attempted — from useLocation() */}
        <p className="nf-msg">
          The path{' '}
          <code>{location.pathname}</code>
          {' '}doesn't exist.
        </p>

        {/* navigate('/') goes back to Home */}
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <i className="fas fa-house" aria-hidden="true" /> Back to Home
        </button>

      </div>

      <style>{`
        #notfound-page {
          min-height: 100vh; display: flex;
          align-items: center; justify-content: center;
          padding: 40px 24px; text-align: center;
          animation: pageEnter .38s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        .nf-inner { max-width: 460px; }
        .nf-code {
          font-family: 'Playfair Display', serif;
          font-size: clamp(6rem, 18vw, 11rem);
          font-weight: 900; line-height: 1;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .nf-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; }
        .nf-msg   { color: var(--muted); font-size: .9rem; margin-bottom: 32px; }
        .nf-msg code {
          background: var(--card); padding: 2px 8px; border-radius: 5px;
          font-size: .85rem; color: var(--accent); border: 1px solid var(--border);
        }
      `}</style>
    </section>
  )
}

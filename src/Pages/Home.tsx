

import { useEffect, useRef } from 'react'
import { useNavigate }       from 'react-router-dom'    // ← Router
import { PROFILE }           from '../Data/PortfolioData'

export default function Home() {
  const navigate  = useNavigate()
  const typedRef  = useRef<HTMLElement>(null)

  const stateRef  = useRef({ wi: 0, ci: 0, deleting: false, timer: 0 })

  useEffect(() => {
    const words = PROFILE.typingWords
    const s     = stateRef.current

    function tick() {
      if (!typedRef.current) return
      const word = words[s.wi]

      typedRef.current.textContent = s.deleting
        ? word.slice(0, s.ci--)
        : word.slice(0, s.ci++)

      if (!s.deleting && s.ci > word.length) {
        s.deleting = true
        s.timer    = window.setTimeout(tick, 1500)
        return
      }
      if (s.deleting && s.ci < 0) {
        s.deleting = false
        s.wi       = (s.wi + 1) % words.length
        s.ci       = 0
      }
      s.timer = window.setTimeout(tick, s.deleting ? 55 : 108)
    }

    s.timer = window.setTimeout(tick, 700)
    return () => clearTimeout(s.timer)
  }, [])

  return (
    <section id="home-page">
      <div className="hero-bg"       aria-hidden="true" />
      <div className="hero-grid"     aria-hidden="true" />
      <div className="hero-blob b1"  aria-hidden="true" />
      <div className="hero-blob b2"  aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-eyebrow">✦ Welcome to my Portfolio</p>

        <h1 className="hero-name">
          <span>{PROFILE.name}</span>
        </h1>

        <p className="hero-sub">
          I'm a{' '}
          <strong ref={typedRef as React.RefObject<HTMLElement>} />
          <span className="cursor" aria-hidden="true" />
        </p>

        <div className="hero-btns">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/portfolio')}   
          >
            <i className="fas fa-eye" aria-hidden="true" /> View Work
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/contact')}    
          >
            <i className="fas fa-paper-plane" aria-hidden="true" /> Hire Me
          </button>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>

      <style>{`
        #home-page {
          position: relative; min-height: 100vh;
          overflow: hidden; display: flex; align-items: center;
        }

        /* ── Background layers ── */
        /* ↓ Edit gradient stops here to change hero colours */
        .hero-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #080c14 0%, #0e1826 55%, #0b1220 100%);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.016) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(72px); pointer-events: none;
          animation: blobDrift 9s ease-in-out infinite;
        }
        .b1 { width:400px;height:400px; background:rgba(0,212,255,.07);  top:6%;   right:10%; }
        .b2 { width:260px;height:260px; background:rgba(123,92,255,.09); bottom:18%;right:28%; animation-delay:2.5s; }
        @keyframes blobDrift {
          0%,100% { transform: translateY(0)    scale(1);    }
          50%      { transform: translateY(-22px) scale(1.04); }
        }

        /* ── Content ── */
        .hero-content {
          position: relative; z-index: 2;
          padding: 0 72px; max-width: 800px;
        }

        .hero-eyebrow {
          font-size: .7rem; letter-spacing: .3em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 20px;
          opacity: 0; animation: heroRise .6s .2s forwards;
        }
        .hero-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7.5vw, 6.5rem);
          font-weight: 900; line-height: 1.03; margin-bottom: 22px;
          opacity: 0; animation: heroRise .7s .4s forwards;
        }
        .hero-name span {
          background: linear-gradient(100deg, #fff 25%, var(--accent) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 1.1rem; color: var(--muted); margin-bottom: 40px;
          opacity: 0; animation: heroRise .7s .6s forwards;
          min-height: 1.6em;
        }
        .hero-sub strong { color: var(--accent); font-weight: 500; }

        /* Blinking cursor */
        .cursor {
          display: inline-block; width: 2px; height: 1em;
          background: var(--accent); margin-left: 3px;
          vertical-align: text-bottom;
          animation: cursorBlink .75s step-end infinite;
        }
        @keyframes cursorBlink { 50% { opacity: 0; } }

        .hero-btns {
          display: flex; gap: 14px; flex-wrap: wrap;
          opacity: 0; animation: heroRise .7s .8s forwards;
        }

        @keyframes heroRise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: none; }
        }

        /* Scroll hint */
        .scroll-hint {
          display: flex; align-items: center; gap: 12px; margin-top: 56px;
          opacity: 0; animation: heroRise .6s 1.1s forwards;
          color: var(--muted); font-size: .68rem;
          letter-spacing: .18em; text-transform: uppercase;
        }
        .scroll-line {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent);
        }

        @media (max-width: 700px) {
          .hero-content { padding: 0 26px; }
          .hero-btns    { flex-direction: column; }
        }
      `}</style>
    </section>
  )
}

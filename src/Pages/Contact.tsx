// ============================================================
//  src/Pages/Contact.tsx  →  Route: /contact
//  ── CONTACT PAGE — Connected to MongoDB ──
//
//  Follows the same pattern as your professor's Register.tsx:
//    1. useState stores form fields          (same as formData)
//    2. handleChange updates state           (same pattern)
//    3. handleSubmit sends POST to backend   (same fetch pattern)
//    4. Clears form after success            (same pattern)
// ============================================================

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { CONTACT_INFO } from '../Data/PortfolioData'

// ── Same interface pattern your professor used for form fields ─
interface FormState {
  firstName : string
  lastName  : string
  email     : string
  subject   : string
  message   : string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Empty form — same as your professor's initial state
const INITIAL_FORM: FormState = {
  firstName : '',
  lastName  : '',
  email     : '',
  subject   : '',
  message   : '',
}

export default function Contact() {

  // ── useState: same as professor's formData ────────────────
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [status,   setStatus]   = useState<Status>('idle')

  // ── handleChange: same pattern as professor's module ──────
  // Updates only the field that changed, keeps others the same
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,                    // keep all other fields
      [e.target.name]: e.target.value // update only this field
    })
  }

  // ── handleSubmit: same fetch pattern as professor's module ─
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // POST request to our backend — same as professor's /register
      const res = await fetch("http://localhost:5000/contact", {
        method  : "POST",
        headers : { "Content-Type": "application/json" },
        body    : JSON.stringify({
          firstName : formData.firstName,
          lastName  : formData.lastName,
          email     : formData.email,
          subject   : formData.subject,
          message   : formData.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      setStatus('sent')

      // Clear form after success — same as professor's module
      setFormData(INITIAL_FORM)

      // Reset button back to normal after 3 seconds
      setTimeout(() => setStatus('idle'), 3500)

    } catch (error) {
      console.error(error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  // Button label and icon change based on status
  const btnMeta: Record<Status, { label: string; icon: string; bg?: string }> = {
    idle   : { label: 'Send Message',       icon: 'fas fa-paper-plane' },
    sending: { label: 'Sending…',           icon: 'fas fa-circle-notch fa-spin' },
    sent   : { label: 'Message Sent!',      icon: 'fas fa-check',       bg: 'linear-gradient(135deg,#10b981,#059669)' },
    error  : { label: 'Failed — Try Again', icon: 'fas fa-exclamation', bg: 'linear-gradient(135deg,#ef4444,#dc2626)' },
  }
  const { label: btnLabel, icon: btnIcon, bg: btnBg } = btnMeta[status]

  return (
    <section className="page-wrap" id="contact-page">

      {/* ── Page header ── */}
      <header className="page-header">
        <p className="page-label">Let's Talk</p>
        <h1 className="page-title">Get in <span>Touch</span></h1>
        <div className="bar" />
      </header>

      <div className="contact-grid">

        {/* ── Left: contact info ── */}
        <div className="c-info">
          <h2 className="c-greeting">Don't be shy — say hello!</h2>
          {CONTACT_INFO.map((item, i) => (
            <div className="c-item" key={i}>
              <div className="c-icon" aria-hidden="true">
                <i className={item.icon} />
              </div>
              <div>
                <span className="c-label">{item.label}</span>
                <span className="c-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: form — same structure as professor's Register form ── */}
        <form className="c-form" onSubmit={handleSubmit} noValidate>

          {/* Name row — two fields side by side */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project inquiry…"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project…"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'sending'}
            style={{
              width          : '100%',
              justifyContent : 'center',
              background     : btnBg,
            }}
          >
            <i className={btnIcon} aria-hidden="true" /> {btnLabel}
          </button>

        </form>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 56px; align-items: start;
        }
        .c-greeting { font-size: 1.06rem; font-weight: 600; margin-bottom: 24px; }
        .c-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
        .c-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(0, 212, 255, .1);
          display: grid; place-items: center;
          color: var(--accent); font-size: .9rem; flex-shrink: 0;
        }
        .c-label {
          display: block; font-size: .68rem; text-transform: uppercase;
          letter-spacing: .12em; color: var(--muted); margin-bottom: 3px;
        }
        .c-value { display: block; font-size: .87rem; color: var(--text); }

        /* Form styles */
        .c-form .form-group { margin-bottom: 16px; }
        .c-form label {
          display: block; font-size: .72rem; text-transform: uppercase;
          letter-spacing: .1em; color: var(--muted); margin-bottom: 7px;
        }
        .c-form input,
        .c-form textarea {
          width: 100%; padding: 12px 16px;
          background: var(--card); border: 1px solid var(--border);
          border-radius: 10px; color: var(--text);
          font-family: 'DM Sans', sans-serif; font-size: .87rem;
          outline: none; transition: border-color .2s;
        }
        .c-form input:focus,
        .c-form textarea:focus { border-color: var(--accent); }
        .c-form textarea { height: 132px; resize: none; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 36px; }
          .form-row     { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

import { useState, useEffect } from 'react'

interface Message {
  _id       : string
  firstName : string
  lastName  : string
  email     : string
  subject   : string
  message   : string
  createdAt : string
}

type View = 'login' | 'dashboard'

export default function Admin() {

  const [view,     setView]     = useState<View>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading,  setLoading]  = useState(false)

  // ── Persist login across refresh ──────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setView('dashboard')
      fetchMessages()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res  = await fetch('http://localhost:5000/admin/login', {
        method  : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body    : JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (data.success) {
        sessionStorage.setItem('admin_auth', 'true')
        setView('dashboard')
        fetchMessages()
      } else {
        setError('Invalid username or password.')
      }
    } catch {
      setError('Could not connect to server.')
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    const res  = await fetch('http://localhost:5000/admin/messages')
    const data = await res.json()
    setMessages(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`http://localhost:5000/admin/messages/${id}`, { method: 'DELETE' })
    setMessages(prev => prev.filter(m => m._id !== id))
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setView('login')
    setUsername('')
    setPassword('')
  }

  // ── Login screen ───────────────────────────────────────────────
  if (view === 'login') return (
    <div style={styles.loginWrap}>
      <form style={styles.loginBox} onSubmit={handleLogin}>
        <h2 style={styles.loginTitle}>Admin Access</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button style={styles.btn} type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  )

  // ── Dashboard ──────────────────────────────────────────────────
  return (
    <div style={styles.dashWrap}>
      <div style={styles.dashHeader}>
        <h2 style={styles.dashTitle}>📬 Contact Messages ({messages.length})</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      {messages.length === 0 ? (
        <p style={{ color: '#888' }}>No messages yet.</p>
      ) : (
        messages.map(msg => (
          <div key={msg._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <strong style={styles.name}>{msg.firstName} {msg.lastName}</strong>
                <span style={styles.email}>{msg.email}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={styles.date}>
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(msg._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
            {msg.subject && <p style={styles.subject}>Subject: {msg.subject}</p>}
            <p style={styles.msgText}>{msg.message}</p>
          </div>
        ))
      )}
    </div>
  )
}

// ── Inline styles ──────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  loginWrap  : { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' },
  loginBox   : { background: '#111', border: '1px solid #222', borderRadius: 14, padding: 40, display: 'flex', flexDirection: 'column', gap: 14, width: 340 },
  loginTitle : { color: '#fff', margin: 0, marginBottom: 8, fontSize: '1.3rem' },
  input      : { padding: '11px 14px', borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#fff', fontSize: '0.9rem', outline: 'none' },
  btn        : { padding: '12px', borderRadius: 8, background: 'linear-gradient(135deg,#00d4ff,#0099bb)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' },
  error      : { color: '#ef4444', margin: 0, fontSize: '0.85rem' },
  dashWrap   : { maxWidth: 860, margin: '0 auto', padding: '40px 24px' },
  dashHeader : { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
  dashTitle  : { color: '#fff', margin: 0 },
  logoutBtn  : { padding: '8px 18px', borderRadius: 8, background: '#1a1a1a', border: '1px solid #333', color: '#aaa', cursor: 'pointer' },
  card       : { background: '#111', border: '1px solid #222', borderRadius: 12, padding: 22, marginBottom: 16 },
  cardHeader : { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  name       : { display: 'block', color: '#fff', fontSize: '1rem' },
  email      : { display: 'block', color: '#00d4ff', fontSize: '0.82rem', marginTop: 2 },
  date       : { display: 'block', color: '#555', fontSize: '0.78rem', marginBottom: 6 },
  deleteBtn  : { padding: '5px 12px', borderRadius: 6, background: '#1a1a1a', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' },
  subject    : { color: '#aaa', fontSize: '0.85rem', margin: '0 0 8px' },
  msgText    : { color: '#ccc', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 },
}
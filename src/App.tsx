// ============================================================
//  src/App.tsx
//  ── ROOT APP — REACT ROUTER SPA ──
//
//  Routing structure:
//    BrowserRouter              provides URL context to everything
//    └─ Routes                  picks first matching <Route>
//       ├─ Route  /             → Home
//       ├─ Route  /about        → About
//       ├─ Route  /resume       → Resume
//       ├─ Route  /portfolio    → Portfolio
//       ├─ Route  /services     → Services
//       ├─ Route  /contact      → Contact
//       └─ Route  *             → Notfound  (404 catch-all)
//
//  All pages are lazily imported — they're only downloaded the
//  first time the user visits that route (code-splitting).
//
//  To ADD a new page:
//    1. Create src/Pages/YourPage.tsx
//    2. const YourPage = lazy(() => import('./Pages/YourPage'))
//    3. Add <Route path="/your-path" element={<YourPage />} />
//    4. Add entry to ROUTES in portfolioData.ts
// ============================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// ── Regular imports (one per page) ───────────────────────────
import Sidebar   from './Components/Sidebar'
import Home      from './Pages/Home'
import About     from './Pages/About'
import Resume    from './Pages/Resume'
import Portfolio from './Pages/Portfolio'
import Services  from './Pages/Services'
import Contact   from './Pages/Contact'
import Notfound  from './Pages/Notfound'
import Admin from './Pages/Admin'

export default function App() {
  return (
    // BrowserRouter: gives every child component access to
    // the current URL and navigation functions via React Context.
   <BrowserRouter basename="/Portfolio">
  <div className="app-shell">
    <Sidebar />
    <main id="main-content">
      <Routes>
        <Route path="/"          element={<Home />}      />
        <Route path="/about"     element={<About />}     />
        <Route path="/resume"    element={<Resume />}    />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services"  element={<Services />}  />
        <Route path="/contact"   element={<Contact />}   />
        <Route path="/admin"     element={<Admin />}     />
        <Route path="*"          element={<Notfound />}  />
      </Routes>
    </main>
  </div>
</BrowserRouter>
  )
}

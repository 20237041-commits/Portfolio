

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

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

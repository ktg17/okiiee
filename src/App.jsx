import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import LoveMeter from './pages/LoveMeter.jsx'
import Passed from './pages/Passed.jsx'
import Bouquet from './pages/Bouquet.jsx'
import PhotoSong from './pages/PhotoSong.jsx'
import Letter from './pages/Letter.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meter" element={<LoveMeter />} />
        <Route path="/passed" element={<Passed />} />
        <Route path="/bouquet" element={<Bouquet />} />
        <Route path="/photo" element={<PhotoSong />} />
        <Route path="/letter" element={<Letter />} />
      </Routes>
    </>
  )
}

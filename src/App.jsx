import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import AboutPage from './pages/about/AboutPage'
import DiscoverPage from './pages/discover/DiscoverPage'
import PropertyDetails from './pages/properties/PropertyDetails'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
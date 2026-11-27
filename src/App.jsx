import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import AboutPage from './pages/about/AboutPage'
import DiscoverPage from './pages/discover/DiscoverPage'
import PropertyDetails from './pages/properties/PropertyDetails'
import SavedPage from './pages/saved/SavedPage'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SavedPropertiesProvider } from './context/SavedPropertiesContext'

function App() {
  return (
    <SavedPropertiesProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </SavedPropertiesProvider>
  )
}

export default App
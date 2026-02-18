
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProductListPage from './pages/ProductListPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderSearchPage from './pages/OrderSearchPage.jsx'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
import AdminOrdersPage from './pages/AdminOrdersPage.jsx'
import AdminProductsPage from './pages/AdminProductsPage.jsx'
import FloatingCart from './components/FloatingCart.jsx'
import HeroSlider from './components/HeroSlider.jsx'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/admin/login" replace />
}

const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#6a4e23' }, secondary: { main: '#d4a373' } },
  typography: { fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' },
  shape: { borderRadius: 12 }
})

export default function App(){
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // On initial load, redirect any non-root path to the landing page
    // (client-side fallback for hosts not serving SPA rewrites)
    if (location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [])
  const [heroQuery, setHeroQuery] = useState('')

  const handleHeroSearch = (e) => {
    if (!heroQuery) return
    navigate(`/?q=${encodeURIComponent(heroQuery)}`)
  }

  const handlePickupOrder = () => {
    const lat = import.meta.env.VITE_BAKERY_LAT
    const lng = import.meta.env.VITE_BAKERY_LNG
    const hasCoords = lat && lng

    const openMapsWithDestination = (destination) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`
      window.open(url, '_blank')
    }

    if (!navigator.geolocation) {
      // No geolocation available — open maps with bakery as destination
      if (hasCoords) openMapsWithDestination(`${lat},${lng}`)
      else openMapsWithDestination('Amruta Bakery')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`
        if (hasCoords) {
          const dest = `${lat},${lng}`
          const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}&travelmode=driving`
          window.open(url, '_blank')
        } else {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent('Amruta Bakery')}&travelmode=driving`
          window.open(url, '_blank')
        }
      },
      (err) => {
        // Permission denied or error — open maps to destination only
        if (hasCoords) openMapsWithDestination(`${lat},${lng}`)
        else openMapsWithDestination('Amruta Bakery')
      },
      { timeout: 8000 }
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container className="container" sx={{ pt: '80px', mb: 6 }}>
        <div className="hero hero--theme">
          <div className="hero__wrap">
            <div className="hero__left">
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <div className="promo-ribbon">Fresh Today — 10% off Khari</div>
                </div>
                <div className="wordmark">Amruta</div>
                <div className="hero__subtitle">Fast pickup for Khari • Bread • Biscuits • Rusk • Cakes</div>
                <div style={{ marginTop: 14, width: '100%', maxWidth: 560 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      aria-label="Search bakery items"
                      className="hero-search"
                      placeholder="Search bakery items..."
                      value={heroQuery}
                      onChange={e => setHeroQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleHeroSearch() }}
                    />
                    <button className="btn-primary" onClick={handleHeroSearch}>Search</button>
                  </div>
                </div>
            </div>
            <div className="hero__right">
              <HeroSlider />
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderSearchPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <FloatingCart />
      <Footer />
    </ThemeProvider>
  )
}

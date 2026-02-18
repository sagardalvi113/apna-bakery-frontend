
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
import StickyCartBar from './components/StickyCartBar.jsx'

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
  // Minimal hero: wordmark only (mobile-first clean design)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container className="container" sx={{ pt: '80px', mb: 6 }}>
        <div className="hero hero--theme">
          <div className="hero__wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px' }}>
            <div className="wordmark" style={{ margin: 0 }}>Amruta</div>
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
      <StickyCartBar />
      <Footer />
    </ThemeProvider>
  )
}

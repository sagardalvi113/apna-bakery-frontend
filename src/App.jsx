
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProductListPage from './pages/ProductListPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderSearchPage from './pages/OrderSearchPage.jsx'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
import AdminOrdersPage from './pages/AdminOrdersPage.jsx'
import FloatingCart from './components/FloatingCart.jsx'

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container className="container" sx={{ mt: 3, mb: 6 }}>
        <div className="hero">
          <h1>Highway Bakery</h1>
          <p>Fast pickup for Khari • Bread • Biscuits • Rusk • Cakes</p>
        </div>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderSearchPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <FloatingCart />
      <Footer />
    </ThemeProvider>
  )
}

import { Paper, Badge, IconButton, Typography, Box } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../store.js'
import { useNavigate, useLocation } from 'react-router-dom'

export default function FloatingCart(){
  const { cart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const count = cart.reduce((a,c)=> a + c.quantity, 0)
  const total = cart.reduce((a,c)=> a + (Number(c.product.price) || 0) * c.quantity, 0)
  // Hide floating cart for admin users or when on admin routes
  const token = localStorage.getItem('token')
  if (token === 'admin-token' || location.pathname.startsWith('/admin')) return null

  return (
    <Box sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1400 }}>
      <Paper elevation={8} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.25, borderRadius: '14px', cursor: 'pointer', minWidth: 180 }} onClick={() => navigate('/cart')}>
        <IconButton size="medium" sx={{ background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)', color: '#fff' }}>
          <Badge badgeContent={count} color="secondary" sx={{ '& .MuiBadge-badge': { background: 'linear-gradient(135deg, #d4a373 0%, #e8b548 100%)', color: '#000' } }}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Cart</Typography>
          <Typography sx={{ fontSize: 13, color: '#6b7280' }}>₹{total.toFixed(2)}</Typography>
        </Box>
      </Paper>
    </Box>
  )
}


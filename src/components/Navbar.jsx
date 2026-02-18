
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store.js'

export default function Navbar(){
  const { cart } = useCart()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')
  const count = cart.reduce((a,c)=> a + c.quantity, 0)
  
  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: 'rgba(250, 248, 243, 0.7)',
        backdropFilter: 'blur(12px) saturate(120%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#6a4e23'
        , top: 0, left: 0, right: 0, zIndex: 1400
      }}
    >
      <Toolbar sx={{ gap: 2, padding: '8px 24px' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 800,
            fontSize: '20px',
            background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            textDecoration: 'none'
          }} 
          component={Link} 
          to="/" 
          underline="none"
        >
          🍞 Highway Bakery
        </Typography>
        
        <Button 
          color="inherit" 
          startIcon={<FindInPageIcon />}
          onClick={() => navigate('/orders')}
          sx={{
            fontWeight: 600,
            fontSize: '13px',
            textTransform: 'none',
            transition: 'background 0.2s ease',
            '&:hover': {
              background: 'rgba(106, 78, 35, 0.1)'
            }
          }}
        >
          Find Order
        </Button>
        
        <Button 
          color="inherit" 
          startIcon={<AdminPanelSettingsIcon />}
          onClick={() => navigate('/admin/login')}
          sx={{
            fontWeight: 600,
            fontSize: '13px',
            textTransform: 'none',
            transition: 'background 0.2s ease',
            '&:hover': {
              background: 'rgba(106, 78, 35, 0.1)'
            }
          }}
        >
          Admin
        </Button>

        {token === 'admin-token' && (
          <Button 
            color="inherit" 
            onClick={() => navigate('/admin/products')}
            sx={{
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'none',
              transition: 'background 0.2s ease',
              '&:hover': { background: 'rgba(106, 78, 35, 0.1)' }
            }}
          >
            Products
          </Button>
        )}
        
        <IconButton 
          size="large" 
          color="inherit" 
          onClick={() => navigate('/cart')}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              background: 'rgba(106, 78, 35, 0.1)'
            }
          }}
        >
          <Badge 
            badgeContent={count} 
            sx={{
              '& .MuiBadge-badge': {
                background: 'linear-gradient(135deg, #d4a373 0%, #e8b548 100%)',
                fontWeight: 700,
                fontSize: '11px',
                boxShadow: '0 4px 12px rgba(232, 181, 72, 0.3)'
              }
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: '24px' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

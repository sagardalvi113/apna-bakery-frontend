
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Button, InputBase, Paper } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store.js'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Navbar(){
  const { cart } = useCart()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileQuery, setMobileQuery] = useState('')
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')
  const count = cart.reduce((a,c)=> a + c.quantity, 0)
  
  const handleMobileSearch = () => {
    if (!mobileQuery) return
    setMobileSearchOpen(false)
    navigate(`/?q=${encodeURIComponent(mobileQuery)}`)
  }
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/logo.png" alt="Amruta" style={{ height: 34, borderRadius: 6 }} />
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>Amruta</span>
          </Box>
        </Typography>
        
        {isMobile ? (
          <IconButton
            color="inherit"
            onClick={() => setMobileSearchOpen(true)}
            sx={{ mr: 1 }}
            aria-label="Open search"
          >
            <SearchIcon />
          </IconButton>
        ) : (
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
        )}
        
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
      
      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <Paper elevation={6} sx={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 1600, p: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <InputBase
              placeholder="Search bakery items..."
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleMobileSearch() }}
              sx={{ flex: 1, pl: 1 }}
              inputProps={{ 'aria-label': 'Search bakery items' }}
            />
            <IconButton aria-label="Close" onClick={() => setMobileSearchOpen(false)}>
              <CloseIcon />
            </IconButton>
            <Button variant="contained" onClick={handleMobileSearch} sx={{ ml: 1 }}>Search</Button>
          </Box>
        </Paper>
      )}
      </Toolbar>
    </AppBar>
  )
}

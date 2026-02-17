
import { useState, useEffect } from 'react'
import { TextField, Button, Stack, Typography, Alert, Paper, Box, CircularProgress, List, ListItem, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import api from '../api.js'
import { useCart } from '../store.js'
import { useNavigate } from 'react-router-dom'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

export default function CheckoutPage(){
  const { cart, clear, increase, decrease } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const DEFAULT_SHOP_ID = 1  // Single default bakery

  const items = cart?.map(ci => ({ productId: ci.product?.id, quantity: ci.quantity })) || []

  // No need to extract shopId from cart anymore - use default

  const onSubmit = async () => {
    setError('')
    
    if (cart?.length === 0) {
      setError('Your cart is empty. Please add items.')
      return
    }
    
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    
    if (!phone.trim()) {
      setError('Please enter your phone number.')
      return
    }

    setLoading(true)
    try {
      console.log('Items to submit:', items)
      console.log('ShopId to submit:', DEFAULT_SHOP_ID)
      
      const res = await api.post('/api/orders', { 
        shopId: DEFAULT_SHOP_ID, 
        customerName: name, 
        customerPhone: phone, 
        items 
      })
      clear()
      navigate('/orders', { state: { orderId: res.data.id } })
    } catch (e){
      setError(e.response?.data?.message || 'Failed to place order. Please try again.')
      console.error('Order submission error:', e)
      setLoading(false)
    }
  }

  const canPlaceOrder = cart?.length > 0 && name.trim() && phone.trim()
  const total = cart?.reduce((a,c)=> a + (c?.product?.price || 0) * c?.quantity, 0).toFixed(2) || '0.00'

  return (
    <Stack spacing={3}>
      <Paper className="glass-card" sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalShippingIcon sx={{ fontSize: 28, color: '#6a4e23' }} />
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Checkout
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ py: 1.5, borderRadius: '12px' }}>{error}</Alert>}
          {cart?.length === 0 && <Alert severity="warning" sx={{ py: 1.5, borderRadius: '12px' }}>Your cart is empty. Add items before checkout.</Alert>}
          {cart?.length > 0 && <Alert severity="info" sx={{ py: 1.5, borderRadius: '12px' }}>✓ You have {cart.length} item(s) in your cart. Enter your details to proceed.</Alert>}

          {cart?.length > 0 && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <List sx={{ p: 0 }}>
                {cart.map(ci => (
                  <ListItem key={ci.product?.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 0.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>{ci.product?.name}</Typography>
                      <Typography sx={{ fontSize: 13, color: '#6b7280' }}>₹{ci.product?.price}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => decrease(ci.product?.id)}>
                        <RemoveIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <Typography sx={{ width: 24, textAlign: 'center', fontWeight: 700 }}>{ci.quantity}</Typography>
                      <IconButton size="small" onClick={() => increase(ci.product?.id)}>
                        <AddIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Box sx={{ py: 2, px: 2, background: 'rgba(232, 181, 72, 0.1)', borderRadius: '12px' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="textSecondary">Items ({cart?.length}):</Typography>
              <Typography sx={{ fontWeight: 700, color: '#6a4e23' }}>₹{total}</Typography>
            </Stack>
          </Box>

          <TextField 
            label="Your Name" 
            value={name} 
            onChange={e=>setName(e.target.value)} 
            fullWidth
            placeholder="Enter your full name"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                transition: 'box-shadow 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(106, 78, 35, 0.1)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 8px 20px rgba(106, 78, 35, 0.15)'
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5ded5'
              }
            }}
          />

          <TextField 
            label="Phone Number" 
            value={phone} 
            onChange={e=>setPhone(e.target.value)} 
            fullWidth
            placeholder="Enter your 10-digit phone number"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                transition: 'box-shadow 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(106, 78, 35, 0.1)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 8px 20px rgba(106, 78, 35, 0.15)'
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5ded5'
              }
            }}
          />

          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined"
              onClick={() => navigate('/cart')}
              fullWidth
              sx={{
                borderColor: '#6a4e23',
                color: '#6a4e23',
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'background 0.2s ease',
                '&:hover': {
                  background: 'rgba(106, 78, 35, 0.05)',
                  borderColor: '#6a4e23'
                }
              }}
            >
              Back to Cart
            </Button>

            <Button 
              variant="contained" 
              onClick={onSubmit} 
              disabled={!canPlaceOrder || loading}
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 20px rgba(106, 78, 35, 0.2)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 12px 30px rgba(106, 78, 35, 0.3)'
                },
                '&:disabled': {
                  opacity: 0.5
                }
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Place Order'}
            </Button>
          </Stack>

          <Typography 
            color="textSecondary" 
            align="center"
            sx={{ fontSize: '13px', fontStyle: 'italic' }}
          >
            You will receive an order ID and can track it on the next page.
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  )
}

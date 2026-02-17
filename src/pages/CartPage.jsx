
import { useCart } from '../store.js'
import { Box, Button, Divider, List, ListItem, ListItemText, Typography, Paper, Stack, Chip, IconButton, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import EmptyState from '../components/EmptyState.jsx'

export default function CartPage(){
  const { cart, remove } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((a,c)=> a + (c.product?.price || 0) * c.quantity, 0).toFixed(2)
  
  if (cart.length === 0) {
    return <EmptyState title="Your cart is empty" subtitle="Add some delicious items to get started!" />
  }
  
  return (
    <Stack spacing={2.5}>
      <Paper className="glass-card" sx={{ p: 3, mb: 2 }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          🛒 Your Cart ({cart.length})
        </Typography>
        
        <List sx={{ p: 0 }}>
          {cart.map((ci, idx) => (
            <Box key={ci.product?.id || idx}>
              <ListItem 
                sx={{
                  py: 2,
                  px: 2,
                  mx: -2,
                  transition: 'all 0.2s ease',
                  borderRadius: '10px',
                  '&:hover': {
                    background: 'rgba(106, 78, 35, 0.08)',
                  }
                }}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    color="error" 
                    onClick={() => remove(ci.product?.id)}
                    sx={{
                      transition: 'background 0.2s ease',
                      '&:hover': {
                        background: 'rgba(244, 67, 54, 0.1)'
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5 }}
                    >
                      {ci.product?.name}
                    </Typography>
                  }
                  secondary={
                    <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`₹${ci.product?.price || 0}`}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #d4a373 0%, #e8b548 100%)',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: '12px'
                        }}
                      />
                      <Chip 
                        label={`Qty: ${ci.quantity}`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderColor: '#6a4e23', 
                          color: '#6a4e23',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      />
                      <Chip 
                        label={`₹${((ci.product?.price || 0) * ci.quantity).toFixed(2)}`}
                        size="small"
                        sx={{
                          background: 'rgba(106, 78, 35, 0.1)',
                          color: '#6a4e23',
                          fontWeight: 700,
                          fontSize: '12px'
                        }}
                      />
                    </Stack>
                  }
                />
              </ListItem>
              {idx < cart.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </Box>
          ))}
        </List>
      </Paper>

      <Paper 
        className="glass-card" 
        sx={{ 
          p: 3,
          background: 'linear-gradient(135deg, rgba(232, 181, 72, 0.08) 0%, rgba(212, 163, 115, 0.08) 100%)',
          borderColor: 'rgba(232, 181, 72, 0.15)',
          mb: 1
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, fontSize: '13px' }}>Items ({cart.reduce((a,c)=> a + c.quantity, 0)})</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#6a4e23' }}>₹{total}</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                fontSize: '16px',
                color: '#6a4e23'
              }}
            >
              Total
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ₹{total}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
            <Button 
              variant="outlined"
              onClick={() => navigate('/')}
              fullWidth
              sx={{
                borderColor: '#6a4e23',
                color: '#6a4e23',
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '13px',
                transition: 'background 0.2s ease',
                '&:hover': {
                  background: 'rgba(106, 78, 35, 0.05)',
                  borderColor: '#6a4e23'
                }
              }}
            >
              Continue Shopping
            </Button>

            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/checkout')}
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                padding: '10px 24px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 20px rgba(106, 78, 35, 0.2)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 12px 30px rgba(106, 78, 35, 0.3)'
                }
              }}
            >
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

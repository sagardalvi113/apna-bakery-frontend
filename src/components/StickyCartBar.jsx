import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../store.js'

export default function StickyCartBar(){
  const { cart } = useCart()
  const navigate = useNavigate()

  const totalQty = cart.reduce((s,ci)=> s + ci.quantity, 0)
  const totalAmount = cart.reduce((s,ci)=> s + (ci.product.price || 0) * ci.quantity, 0)

  if (totalQty === 0) return null

  return (
    <Box className="sticky-cart-bar">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%' }}>
        <Box>
          <Typography sx={{ fontWeight: 700 }}>{totalQty} items</Typography>
          <Typography sx={{ color: '#6b7280', fontSize: 13 }}>₹{totalAmount}</Typography>
        </Box>
        <Button variant="contained" onClick={() => navigate('/checkout')} sx={{ background: 'linear-gradient(135deg,#6a4e23 0%, #a0704a 100%)' }}>Checkout</Button>
      </Box>
    </Box>
  )
}

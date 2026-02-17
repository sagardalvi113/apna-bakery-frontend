
import { Card, CardContent, CardActions, Typography, Button, Stack, Box, IconButton, ButtonGroup } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useState } from 'react'

export default function ProductCard({ product, onClick, onAdd }){
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      onAdd(product)
    }
    setTimeout(() => {
      setQuantity(1)
      setIsAdding(false)
    }, 300)
  }

  const incrementQty = (e) => {
    e.stopPropagation()
    setQuantity(q => q + 1)
  }

  const decrementQty = (e) => {
    e.stopPropagation()
    setQuantity(q => q > 1 ? q - 1 : 1)
  }

  return (
    <Card 
      className="glass-card" 
      onClick={onClick} 
      sx={{ 
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 15px 40px rgba(106, 78, 35, 0.15)'
        }
      }}
    >
      {/* Product Image */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: '200px',
          background: 'linear-gradient(135deg, #ffe8b6 0%, #ffd699 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {product.imageUrl ? (
          <img 
            className="product-media" 
            src={product.imageUrl} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Typography sx={{ fontSize: '60px' }}>🍞</Typography>
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ pb: 1, flexGrow: 1 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 700,
            color: '#1a1a1a',
            fontSize: '16px',
            mb: 0.5
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{
            fontSize: '13px',
            color: '#6b7280',
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '32px'
          }}
          title={product.description}
        >
          {product.description}
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #d4a373 0%, #e8b548 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          ₹{product.price}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ pt: 1, px: 1.5, pb: 1.5, flexDirection: 'column', gap: 1 }}>
        {/* Quantity Selector */}
        <Stack 
          direction="row" 
          spacing={0} 
          sx={{ 
            width: '100%',
            background: 'rgba(106, 78, 35, 0.05)',
            borderRadius: '10px',
            p: 0.5
          }}
        >
          <IconButton 
            size="small"
            onClick={decrementQty}
            sx={{
              color: '#6a4e23',
              flex: 1,
              borderRadius: '8px',
              '&:hover': { background: 'rgba(106, 78, 35, 0.1)' }
            }}
          >
            <RemoveIcon sx={{ fontSize: '18px' }} />
          </IconButton>
          
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#6a4e23',
              fontSize: '14px'
            }}
          >
            {quantity}
          </Box>
          
          <IconButton 
            size="small"
            onClick={incrementQty}
            sx={{
              color: '#6a4e23',
              flex: 1,
              borderRadius: '8px',
              '&:hover': { background: 'rgba(106, 78, 35, 0.1)' }
            }}
          >
            <AddIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Stack>

        {/* Add to Cart Button */}
        <Button 
          variant="contained"
          fullWidth
          onClick={handleAdd}
          disabled={isAdding}
          startIcon={<ShoppingCartIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            borderRadius: '10px',
            padding: '10px 16px',
            boxShadow: '0 4px 12px rgba(106, 78, 35, 0.2)',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(106, 78, 35, 0.3)'
            },
            '&:disabled': {
              opacity: 0.6
            }
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

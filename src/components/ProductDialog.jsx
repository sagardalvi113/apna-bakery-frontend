
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, Chip } from '@mui/material'

export default function ProductDialog({ open, product, onClose, onAdd }){
  if (!product) return null
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} style={{ width:'100%', borderRadius:8 }} />
          )}
          <Typography color="text.secondary">{product.description}</Typography>
          <Typography variant="h6">₹{product.price}</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={product.category} size="small" />
            <Chip label={product.shop?.name || 'Bakery'} size="small" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => onAdd(product)}>Add to Cart</Button>
      </DialogActions>
    </Dialog>
  )
}


import { useEffect, useState } from 'react'
import { Alert, Button, Card, CardContent, Stack, TextField, Typography, Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'
import api from '../api.js'
import { formatISTDateTime } from '../utils/dateUtils.js'
import { useLocation } from 'react-router-dom'

export default function OrderSearchPage(){
  const [q, setQ] = useState('')
  const [orders, setOrders] = useState([])
  const loc = useLocation()

  useEffect(()=>{
    if (loc.state && loc.state.orderId) {
      const id = String(loc.state.orderId)
      setQ(id)
      search(id)
    }
  },[])

  const search = async (term) => {
    if (!term) return
    const res = await api.get('/api/orders/search', { params: { q: term } })
    setOrders(res.data)
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Find Your Order</Typography>
      <Stack direction={{ xs:'column', sm:'row' }} spacing={1}>
        <TextField label="Order ID or Phone" value={q} onChange={e=>setQ(e.target.value)} fullWidth />
        <Button variant="contained" onClick={()=> search(q)}>Search</Button>
      </Stack>
      {orders.length===0 ? <Alert severity="info">No orders to show</Alert> : (
        <Grid container spacing={2}>
          {orders.map(o => {
            const statusColors = {
              PENDING: { bg: 'rgba(255, 152, 0, 0.1)', color: '#ff9800', label: '⏳ PENDING' },
              PREPARING: { bg: 'rgba(33, 150, 243, 0.1)', color: '#2196f3', label: '⚙️ PREPARING' },
              READY: { bg: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', label: '✓ READY' },
              COMPLETED: { bg: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', label: '✅ COMPLETED' }
            }
            const statusStyle = statusColors[o.status] || statusColors.PENDING
            
            return (
              <Grid item xs={12} key={o.id}>
                <Card className="glass-card">
                  <CardContent>
                    <Stack spacing={2}>
                      {/* Header */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Order #{o.id}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            {o.customerName}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            📞 {o.customerPhone}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280', mt: 1, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '11px', fontWeight: 600 }}>
                            🕐 {formatISTDateTime(o.createdAt)}
                          </Typography>
                        </Box>
                        
                        <Stack alignItems="flex-end" spacing={1}>
                          <Chip 
                            label={statusStyle.label}
                            sx={{
                              background: statusStyle.bg,
                              color: statusStyle.color,
                              fontWeight: 700,
                              fontSize: '12px',
                              height: '32px',
                              borderRadius: '8px'
                            }}
                          />
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
                            ₹{o.totalAmount}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Items Table */}
                      {o.items && o.items.length > 0 && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 1 }}>
                            🛍️ Items ({o.items.length})
                          </Typography>
                          <TableContainer 
                            component={Paper} 
                            sx={{ 
                              backgroundColor: 'rgba(250, 248, 243, 0.5)',
                              borderRadius: '12px',
                              border: '1px solid rgba(106, 78, 35, 0.1)'
                            }}
                          >
                            <Table size="small" sx={{ border: 'none' }}>
                              <TableHead>
                                <TableRow sx={{ background: 'rgba(106, 78, 35, 0.05)' }}>
                                  <TableCell sx={{ fontWeight: 700, color: '#6a4e23', fontSize: '12px' }}>Product</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: 700, color: '#6a4e23', fontSize: '12px' }}>Qty</TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 700, color: '#6a4e23', fontSize: '12px' }}>Price</TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 700, color: '#6a4e23', fontSize: '12px' }}>Subtotal</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {o.items.map((item, idx) => (
                                  <TableRow 
                                    key={idx}
                                    sx={{
                                      '&:hover': { background: 'rgba(106, 78, 35, 0.03)' },
                                      borderBottom: '1px solid rgba(106, 78, 35, 0.05)'
                                    }}
                                  >
                                    <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>{item.product?.name || 'Unknown'}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>{item.quantity}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, color: '#d4a373' }}>₹{item.price}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, color: '#6a4e23' }}>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Stack>
  )
}

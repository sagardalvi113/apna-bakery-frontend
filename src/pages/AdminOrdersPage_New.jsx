import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'
import { Alert, Button, Card, CardActions, CardContent, Chip, CircularProgress, Grid, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function AdminOrdersPage(){
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshInterval, setRefreshInterval] = useState(true)
  const navigate = useNavigate()

  const load = async () => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/admin/login')
        return
      }
      const res = await api.get('/api/orders')
      const upcomingOrders = res.data.filter(o => o.status !== 'COMPLETED').sort((a, b) => b.id - a.id)
      setOrders(upcomingOrders)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load orders')
      console.error('Orders fetch error:', e)
    } finally {
      setLoading(false)
    }
  }

  const update = async (id, status) => {
    try {
      await api.put(`/api/orders/${id}/status`, null, { params: { status } })
      await load()
    } catch (e) {
      setError('Failed to update order status')
      console.error('Update error:', e)
    }
  }

  useEffect(()=>{ load() },[])

  useEffect(() => {
    if (!refreshInterval) return
    const interval = setInterval(() => {
      load()
    }, 3000)
    return () => clearInterval(interval)
  }, [refreshInterval])

  const getStatusIcon = (status) => {
    switch(status) {
      case 'PENDING': return <HourglassTopIcon sx={{ fontSize: '16px' }} />
      case 'PREPARING': return <AccessTimeIcon sx={{ fontSize: '16px' }} />
      case 'READY': return <CheckCircleIcon sx={{ fontSize: '16px' }} />
      default: return null
    }
  }

  const getStatusStyle = (status) => ({
    PENDING: {
      bg: 'rgba(255, 152, 0, 0.1)',
      color: '#ff9800',
      label: '⏳ PENDING',
      textColor: '#ff9800'
    },
    PREPARING: {
      bg: 'rgba(33, 150, 243, 0.1)',
      color: '#2196f3',
      label: '⚙️ PREPARING',
      textColor: '#2196f3'
    },
    READY: {
      bg: 'rgba(76, 175, 80, 0.1)',
      color: '#4caf50',
      label: '✓ READY',
      textColor: '#4caf50'
    }
  }[status])

  if (loading) {
    return (
      <Stack spacing={2} alignItems="center" sx={{ py: 8 }}>
        <CircularProgress sx={{ color: '#6a4e23' }} />
        <Typography sx={{ color: '#6b7280', fontWeight: 600 }}>Loading incoming orders...</Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 0.5
            }}
          >
            📋 Incoming Orders
          </Typography>
          <Typography color="textSecondary" sx={{ fontSize: '13px', fontWeight: 500 }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} active
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip 
            label={refreshInterval ? "🔴 LIVE MODE" : "⚪ PAUSED"} 
            onClick={() => setRefreshInterval(!refreshInterval)}
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 700,
              fontSize: '12px',
              background: refreshInterval 
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)'
                : 'rgba(200, 200, 200, 0.1)',
              color: refreshInterval ? '#4caf50' : '#999',
              borderRadius: '20px',
              border: '2px solid',
              borderColor: refreshInterval ? '#4caf50' : '#ddd',
              padding: '4px 0'
            }}
          />
          <IconButton 
            onClick={load} 
            title="Refresh Now"
            sx={{
              background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
              color: '#fff',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'rotate(180deg)',
                boxShadow: '0 8px 20px rgba(106, 78, 35, 0.2)'
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ borderRadius: '12px', py: 1.5 }}>{error}</Alert>}
      
      {orders.length === 0 && !error && (
        <Paper className="glass-card" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#6b7280', mb: 1 }}>✨ All quiet here!</Typography>
          <Typography color="textSecondary">No incoming orders at the moment. Enjoy your break!</Typography>
        </Paper>
      )}

      <Grid container spacing={2.5}>
        {orders.map(o => {
          const styleData = getStatusStyle(o.status)
          return (
            <Grid item xs={12} key={o.id}>
              <Card 
                className="glass-card"
                sx={{
                  borderLeft: `6px solid ${styleData.color}`,
                  animation: o.status === 'PENDING' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Stack spacing={2.5}>
                    {/* Header */}
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                      <Box>
                        <Typography 
                          sx={{ 
                            fontSize: '12px', 
                            color: '#6b7280', 
                            fontWeight: 600,
                            mb: 0.5,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}
                        >
                          Order #{o.id}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          {o.customerName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          📞 {o.customerPhone}
                        </Typography>
                      </Box>

                      <Stack alignItems="flex-end" spacing={1}>
                        <Chip 
                          icon={getStatusIcon(o.status)}
                          label={styleData.label}
                          sx={{
                            background: styleData.bg,
                            color: styleData.textColor,
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
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          mb: 1.5, 
                          fontWeight: 700,
                          color: '#1a1a1a',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        🛍️ Items Added by User ({o.items?.length || 0})
                      </Typography>
                      {o.items && o.items.length > 0 ? (
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
                                <TableCell align="right" sx={{ fontWeight: 700, color: '#6a4e23', fontSize: '12px' }}>Price/Unit</TableCell>
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
                      ) : (
                        <Typography variant="body2" color="textSecondary">No items in this order</Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions sx={{ pt: 0, px: 2, pb: 2, justifyContent: 'flex-end', gap: 1 }}>
                  {o.status === 'PENDING' && (
                    <Button 
                      variant="contained"
                      onClick={() => update(o.id, 'PREPARING')}
                      startIcon={<AccessTimeIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(255, 152, 0, 0.3)'
                        }
                      }}
                    >
                      Preparing
                    </Button>
                  )}
                  {o.status === 'PREPARING' && (
                    <Button 
                      variant="contained"
                      onClick={() => update(o.id, 'READY')}
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(33, 150, 243, 0.3)'
                        }
                      }}
                    >
                      Ready
                    </Button>
                  )}
                  {o.status === 'READY' && (
                    <Button 
                      variant="contained"
                      onClick={() => update(o.id, 'COMPLETED')}
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(76, 175, 80, 0.3)'
                        }
                      }}
                    >
                      Complete
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

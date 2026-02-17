
import { useState } from 'react'
import { Alert, Button, Stack, TextField, Typography, Paper } from '@mui/material'
import api from '../api.js'
import { useNavigate } from 'react-router-dom'

export default function AdminLoginPage(){
  const [email, setEmail] = useState('admin@bakery.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = async () => {
    try {
      const res = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/admin/orders')
    } catch (e){
      setError('Login failed')
    }
  }

  return (
    <Paper className="glass-card" sx={{ p:3, maxWidth:420 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Admin Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button variant="contained" onClick={login}>Login</Button>
      </Stack>
    </Paper>
  )
}

import { useEffect, useState } from 'react'
import api from '../api.js'
import { Stack, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function AdminProductsPage(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name:'', description:'', imageUrl:'', price:'', category:'' })

  const load = async ()=>{
    setLoading(true)
    try{
      const res = await api.get('/api/products')
      setProducts(res.data)
    }catch(e){
      setProducts([])
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const openNew = ()=>{ setEditing(null); setForm({ name:'', description:'', imageUrl:'', price:'', category:'' }); setDialogOpen(true) }
  const openEdit = (p)=>{ setEditing(p); setForm({ name:p.name||'', description:p.description||'', imageUrl:p.imageUrl||'', price:String(p.price||''), category:p.category||'' }); setDialogOpen(true) }

  const save = async ()=>{
    const payload = { ...form, price: Number(form.price) }
    try{
      if (editing && editing.id){
        await api.put(`/api/products/${editing.id}`, payload)
      } else {
        await api.post('/api/products', payload)
      }
      setDialogOpen(false)
      await load()
    }catch(e){
      alert('Failed to save')
    }
  }

  const remove = async (id)=>{
    if (!confirm('Delete this product?')) return
    try{ await api.delete(`/api/products/${id}`); await load() }catch(e){ alert('Failed to delete') }
  }

  return (
    <Stack spacing={2}>
      <Paper className="glass-card" sx={{ p:3, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <Typography variant="h5" sx={{ fontWeight:800 }}>Products</Typography>
          <Typography variant="body2" color="text.secondary">Manage product catalog</Typography>
        </div>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openNew}>Add Product</Button>
      </Paper>

      <TableContainer component={Paper} className="glass-card">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(p=> (
              <TableRow key={p.id}>
                <TableCell sx={{ fontWeight:700 }}>{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={()=>openEdit(p)}><EditIcon/></IconButton>
                  <IconButton color="error" onClick={()=>remove(p.id)}><DeleteIcon/></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt:1 }}>
            <TextField label="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} fullWidth />
            <TextField label="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} fullWidth />
            <TextField label="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} fullWidth />
            <TextField label="Image URL" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} fullWidth />
            <TextField label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} multiline rows={3} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

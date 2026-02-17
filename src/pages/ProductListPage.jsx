
import { useEffect, useMemo, useState } from 'react'
import api from '../api.js'
import { Grid, Snackbar, Alert, Stack, TextField, Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useCart } from '../store.js'
import ProductDialog from '../components/ProductDialog.jsx'
import ProductCard from '../components/ProductCard.jsx'
import CategoryChips from '../components/CategoryChips.jsx'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'

const DEFAULT_CATS = ['Khari','Bread','Biscuits','Rusk','Cakes','Namkeen']

export default function ProductListPage(){
  const [products, setProducts] = useState(null)
  const [activeCat, setActiveCat] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')
  const { add } = useCart()

  useEffect(()=>{
    setProducts(null)
    api.get(`/api/products`)
      .then(r => setProducts(r.data))
      .catch(()=> setProducts([]))
  },[])

  const categories = useMemo(()=>{
    if (!products || products.length===0) return DEFAULT_CATS
    const cats = Array.from(new Set(products.map(p => p.category || 'Other')))
    return [...DEFAULT_CATS.filter(c=>cats.includes(c)), ...cats.filter(c=>!DEFAULT_CATS.includes(c))]
  },[products])

  const filtered = useMemo(()=>{
    if (!products) return []
    let result = products
    
    // Category filter
    if (activeCat) {
      result = result.filter(p => (p.category||'').toLowerCase() === activeCat.toLowerCase())
    }
    
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        (p.description||'').toLowerCase().includes(term) ||
        (p.category||'').toLowerCase().includes(term)
      )
    }
    
    // Sorting
    const sorted = [...result]
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price)
    else if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    
    return sorted
  },[products, activeCat, searchTerm, sortBy])

  const onAdd = (p) => { add(p); setToast(`${p.name} added to cart`) }

  return (
    <>
      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search bakery items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: '#6a4e23' }} />
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
      </Box>

      {/* Category Chips */}
      <CategoryChips categories={categories} active={activeCat} onChange={setActiveCat} />

      {/* Sort Options */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TuneIcon sx={{ color: '#6a4e23', fontSize: '20px' }} />
          <ToggleButtonGroup
            value={sortBy}
            exclusive
            onChange={(e, newSort) => newSort && setSortBy(newSort)}
            sx={{
              '& .MuiToggleButton-root': {
                color: '#6a4e23',
                border: '2px solid rgba(106, 78, 35, 0.2)',
                fontWeight: 600,
                fontSize: '12px',
                padding: '6px 14px',
                textTransform: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(106, 78, 35, 0.05)',
                  borderColor: '#6a4e23'
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
                  color: '#fff',
                  borderColor: '#6a4e23',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6a4e23 0%, #a0704a 100%)',
                    borderColor: '#6a4e23'
                  }
                }
              }
            }}
          >
            <ToggleButton value="popular">Popular</ToggleButton>
            <ToggleButton value="price-low">Price: Low-High</ToggleButton>
            <ToggleButton value="price-high">Price: High-Low</ToggleButton>
            <ToggleButton value="name">A-Z</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </Box>
      </Stack>

      {/* Loading State */}
      {!products && (
        <Grid container spacing={2.5}>{Array.from({length:8}).map((_,i)=>(
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}><LoadingSkeleton/></Grid>
        ))}</Grid>
      )}

      {/* Empty State */}
      {products && filtered.length===0 && (
        <EmptyState 
          title={searchTerm ? "No items found" : "No items in this category"} 
          subtitle={searchTerm ? "Try a different search term" : "Try another category or come back later."} 
        />
      )}

      {/* Product Grid */}
      {products && filtered.length>0 && (
        <Grid container spacing={2.5}>
          {filtered.map(p => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <ProductCard product={p} onClick={()=>{ setSelected(p); setOpen(true) }} onAdd={onAdd} />
            </Grid>
          ))}
        </Grid>
      )}

      <ProductDialog open={open} product={selected} onClose={()=> setOpen(false)} onAdd={(p)=>{ onAdd(p); setOpen(false) }} />

      <Snackbar 
        open={!!toast} 
        onClose={()=> setToast('')} 
        autoHideDuration={1600} 
        anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
      >
        <Alert severity="success" sx={{ width:'100%', borderRadius: '12px' }}>{toast}</Alert>
      </Snackbar>
    </>
  )
}

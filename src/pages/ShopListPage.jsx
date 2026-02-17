
import { useEffect, useState } from 'react'
import api from '../api.js'
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'

export default function ShopListPage(){
  const [shops, setShops] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    api.get('/api/shops').then(r=> setShops(r.data)).catch(()=> setShops([]))
  },[])

  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:8, margin:'8px 0 16px' }}>
        <span className="badge">Highway • Pickup</span>
      </div>

      {!shops && (
        <Grid container spacing={2}>{Array.from({length:6}).map((_,i)=>(
          <Grid item xs={12} md={6} lg={4} key={i}><LoadingSkeleton/></Grid>
        ))}</Grid>
      )}

      {shops && shops.length===0 && (
        <Typography color="text.secondary">No shops available right now.</Typography>
      )}

      {shops && shops.length>0 && (
        <Grid container spacing={2}>
          {shops.map(s => (
            <Grid item xs={12} md={6} lg={4} key={s.id}>
              <Card className="glass-card">
                <CardActionArea onClick={()=> navigate(`/shop/${s.id}`)}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight:700 }}>{s.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{s.address}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

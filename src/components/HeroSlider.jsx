import { useEffect, useRef, useState } from 'react'
import api from '../api.js'
import ProductCard from './ProductCard.jsx'

export default function HeroSlider(){
  const [products, setProducts] = useState([])
  const listRef = useRef(null)

  useEffect(()=>{
    let mounted = true
    api.get('/api/products')
      .then(res => { if(mounted) setProducts((res.data || []).slice(0, 10)) })
      .catch(()=>{})
    return () => { mounted = false }
  },[])

  const scrollBy = (dir = 'right') => {
    const el = listRef.current
    if(!el) return
    const offset = Math.round(el.clientWidth * 0.7)
    el.scrollBy({ left: dir === 'left' ? -offset : offset, behavior: 'smooth' })
  }

  if (!products.length) return null

  return (
    <div className="hero-slider">
      <button className="slider-btn left" aria-label="Scroll left" onClick={() => scrollBy('left')}>‹</button>
      <div className="hero-slider__list" ref={listRef}>
        {products.map(p => (
          <div className="hero-slider__card" key={p.id}>
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>
      <button className="slider-btn right" aria-label="Scroll right" onClick={() => scrollBy('right')}>›</button>
    </div>
  )
}

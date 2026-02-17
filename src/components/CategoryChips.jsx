
export default function CategoryChips({ categories, active, onChange }){
  return (
    <div style={{ 
      display: 'flex', 
      gap: 10, 
      flexWrap: 'wrap', 
      marginBottom: 24,
      alignItems: 'center'
    }}>
      <span 
        className={`category-chip ${!active ? 'active' : ''}`} 
        onClick={() => onChange('')}
        style={{
          cursor: 'pointer',
          fontWeight: active ? 500 : 700,
          opacity: !active ? 1 : 0.7
        }}
      >
        🏪 All Items
      </span>
      
      {categories.map(cat => (
        <span 
          key={cat} 
          className={`category-chip ${active === cat ? 'active' : ''}`} 
          onClick={() => onChange(cat)}
          style={{
            cursor: 'pointer',
            fontWeight: active === cat ? 700 : 500,
            opacity: active === cat ? 1 : 0.8
          }}
        >
          {cat}
        </span>
      ))}
    </div>
  )
}

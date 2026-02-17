
export default function EmptyState({ title, subtitle }){
  return (
    <div style={{ padding:32, textAlign:'center' }} className="glass-card">
      <div style={{ fontSize:18, fontWeight:600 }}>{title}</div>
      <div style={{ color:'#6b7280', marginTop:6 }}>{subtitle}</div>
    </div>
  )
}

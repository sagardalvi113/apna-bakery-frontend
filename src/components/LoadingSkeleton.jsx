
export default function LoadingSkeleton(){
  return (
    <div className="glass-card" style={{ padding:16 }}>
      <div style={{ height:140, background:'#f3f4f6', borderRadius:12, marginBottom:12 }} />
      <div style={{ height:14, background:'#eee', borderRadius:99, width:'60%', marginBottom:8 }} />
      <div style={{ height:12, background:'#f1f1f1', borderRadius:99, width:'80%', marginBottom:8 }} />
      <div style={{ height:18, background:'#ececec', borderRadius:99, width:'30%', marginTop:8 }} />
    </div>
  )
}

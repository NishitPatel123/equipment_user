import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getFeedbacks } from "../services/api"
export default function Feedbacks() {
  const [feedbacks,setFeedbacks]=useState([]); const [loading,setLoading]=useState(true)
  useEffect(()=>{getFeedbacks().then(r=>setFeedbacks(r.data.data||[])).catch(console.error).finally(()=>setLoading(false))},[])
  const avg=feedbacks.length?(feedbacks.reduce((s,f)=>s+f.rating,0)/feedbacks.length).toFixed(1):0
  return (
    <div>
      <section className="hero-area"><div className="breadcrumbs-area bg_cover" style={{backgroundImage:"url(/assets/images/bg/breadcrumbs-bg-1.jpg)",backgroundSize:"cover",backgroundPosition:"center",padding:"60px 0",position:"relative"}}><div style={{position:"absolute",inset:0,background:"rgba(12,18,57,.7)"}}/><div className="container" style={{position:"relative",zIndex:2}}><div className="text-center"><h2 style={{color:"#fff",fontWeight:900,fontSize:"clamp(1.8rem,3vw,2.6rem)",marginBottom:10}}>Customer Reviews</h2><nav><ol className="breadcrumb justify-content-center mb-0" style={{background:"none"}}><li className="breadcrumb-item"><Link to="/" style={{color:"var(--primary-color)"}}>Home</Link></li><li className="breadcrumb-item active" style={{color:"#fff"}}>Reviews</li></ol></nav></div></div></div></section>
      <section style={{padding:"60px 0",background:"#f9f9fb"}}>
        <div className="container">
          {!loading&&feedbacks.length>0&&(<div style={{background:"#fff",border:"1px solid #eee",borderRadius:10,padding:28,marginBottom:40,display:"flex",alignItems:"center",gap:40,flexWrap:"wrap",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
            <div className="text-center"><div style={{fontSize:52,fontWeight:900,color:"var(--primary-color)",lineHeight:1}}>{avg}</div><div style={{display:"flex",justifyContent:"center",gap:3,margin:"8px 0"}}>{[1,2,3,4,5].map(s=><i key={s} className="fas fa-star" style={{color:s<=Math.round(avg)?"var(--primary-color)":"#eee",fontSize:18}}/>)}</div><p style={{color:"#727272",fontSize:13,margin:0}}>{feedbacks.length} reviews</p></div>
            <div style={{flex:1,minWidth:200}}>{[5,4,3,2,1].map(star=>{const c=feedbacks.filter(r=>Math.round(r.rating)===star).length;const p=feedbacks.length?Math.round((c/feedbacks.length)*100):0;return(<div key={star} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{color:"#727272",fontSize:13,width:20}}>{star}</span><i className="fas fa-star" style={{color:"var(--primary-color)",fontSize:12}}/><div style={{flex:1,height:6,background:"#eee",borderRadius:3}}><div style={{width:`${p}%`,height:"100%",background:"var(--primary-color)",borderRadius:3}}/></div><span style={{color:"#727272",fontSize:12,width:24}}>{c}</span></div>)})}
            </div>
          </div>)}
          {loading?(<div className="text-center py-5"><div style={{width:40,height:40,border:"3px solid rgba(251,163,28,.2)",borderTopColor:"#FBA31C",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto"}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>)
          :feedbacks.length===0?(<div style={{textAlign:"center",padding:"80px 0"}}><div style={{fontSize:64,marginBottom:16}}>⭐</div><h4 style={{color:"var(--heading-color)"}}>No reviews yet</h4></div>)
          :(<div className="row g-4">{feedbacks.map((f,i)=>(<div key={f._id||i} className="col-lg-4 col-md-6"><div style={{background:"#fff",borderRadius:10,padding:24,boxShadow:"0 4px 16px rgba(0,0,0,.05)",border:"1px solid #eee",height:"100%"}}><div style={{display:"flex",gap:3,marginBottom:12}}>{[1,2,3,4,5].map(s=><i key={s} className="fas fa-star" style={{color:s<=f.rating?"var(--primary-color)":"#eee",fontSize:14}}/>)}</div><p style={{color:"#727272",fontSize:14,fontStyle:"italic",lineHeight:1.7,marginBottom:16}}>"{f.feedback}"</p><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:38,height:38,borderRadius:"50%",background:"var(--primary-color)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:15}}>{f.user?.name?.charAt(0)?.toUpperCase()||"C"}</div><div><p style={{color:"var(--heading-color)",fontWeight:700,fontSize:14,margin:0}}>{f.user?.name||"Customer"}</p><p style={{color:"var(--primary-color)",fontSize:12,margin:0}}>{f.rating}/5 · {f.equipment?.name||""}</p></div></div></div></div>))}</div>)}
        </div>
      </section>
    </div>
  )
}

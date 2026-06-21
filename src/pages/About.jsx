import React from "react"
import { Link } from "react-router-dom"
export default function About() {
  return (
    <div>
      <section className="hero-area"><div className="breadcrumbs-area bg_cover" style={{backgroundImage:"url(/assets/images/bg/breadcrumbs-bg-1.jpg)",backgroundSize:"cover",backgroundPosition:"center",padding:"60px 0",position:"relative"}}><div style={{position:"absolute",inset:0,background:"rgba(12,18,57,.7)"}}/><div className="container" style={{position:"relative",zIndex:2}}><div className="text-center"><h2 style={{color:"#fff",fontWeight:900,fontSize:"clamp(1.8rem,3vw,2.6rem)",marginBottom:10}}>About RentEquip</h2><nav><ol className="breadcrumb justify-content-center mb-0" style={{background:"none"}}><li className="breadcrumb-item"><Link to="/" style={{color:"var(--primary-color)"}}>Home</Link></li><li className="breadcrumb-item active" style={{color:"#fff"}}>About</li></ol></nav></div></div></div></section>
      <section style={{padding:"60px 0",background:"#f9f9fb"}}>
        <div className="container"><div className="row g-5 align-items-center">
          <div className="col-lg-6"><div style={{background:"linear-gradient(135deg,rgba(251,163,28,.08),rgba(12,18,57,.04))",border:"1px solid rgba(251,163,28,.2)",borderRadius:16,padding:48,textAlign:"center"}}><div style={{fontSize:90,marginBottom:16}}>⚙️</div><h3 style={{color:"var(--primary-color)",fontWeight:900}}>RentEquip</h3><p style={{color:"#727272"}}>India's Trusted Equipment Rental Platform</p></div></div>
          <div className="col-lg-6">
            <span style={{color:"var(--primary-color)",fontWeight:700,fontSize:13,textTransform:"uppercase",letterSpacing:2}}>Our Story</span>
            <h2 style={{color:"var(--heading-color)",fontWeight:800,fontSize:"clamp(1.4rem,3vw,2.2rem)",margin:"10px 0 16px"}}>Making Equipment Rental <span style={{color:"var(--primary-color)"}}>Simple & Affordable</span></h2>
            <p style={{color:"#727272",lineHeight:1.8,marginBottom:16}}>RentEquip is India's premier online platform for construction equipment and industrial tool rentals. We connect businesses and individuals with the machinery they need, without the burden of ownership costs.</p>
            <p style={{color:"#727272",lineHeight:1.8,marginBottom:28}}>Our digital-first approach eliminates manual booking hassles, provides real-time availability tracking, and offers secure online payments — making equipment access fast, transparent, and reliable.</p>
            <div className="row g-3 mb-4">{[{n:"500+",l:"Equipment"},{n:"1000+",l:"Happy Clients"},{n:"50+",l:"Categories"},{n:"4.8★",l:"Avg Rating"}].map(s=>(<div key={s.l} className="col-6"><div style={{background:"#fff",border:"1px solid rgba(251,163,28,.2)",borderRadius:8,padding:"14px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}><h4 style={{color:"var(--primary-color)",fontWeight:900,marginBottom:2}}>{s.n}</h4><p style={{color:"#727272",fontSize:12,margin:0}}>{s.l}</p></div></div>))}</div>
            <Link to="/equipment" className="main-btn main-btn-primary">Browse Equipment →</Link>
          </div>
        </div></div>
      </section>
    </div>
  )
}

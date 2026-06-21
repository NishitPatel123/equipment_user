import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getProfile, updateProfile, changePassword } from "../services/api"
const BACKEND = "http://localhost:8000"
export default function Profile({ userData, setUserData }) {
  const [profile,setProfile]=useState(null); const [loading,setLoading]=useState(true); const [tab,setTab]=useState("info"); const [saving,setSaving]=useState(false); const [changing,setChanging]=useState(false); const [imgFile,setImgFile]=useState(null); const [preview,setPreview]=useState(null); const [form,setForm]=useState({name:"",phone:""}); const [passForm,setPassForm]=useState({newPassword:"",confirm:""})
  const inp={width:"100%",padding:"11px 14px",border:"1px solid #eee",borderRadius:6,fontSize:14,outline:"none"}
  const fetch=async()=>{try{const r=await getProfile();const d=r.data.data;setProfile(d);setForm({name:d.name||"",phone:d.phone||""})}catch{toast.error("Failed")}finally{setLoading(false)}}
  useEffect(()=>{fetch()},[])
  const handleSave=async(e)=>{e?.preventDefault();setSaving(true);try{const fd=new FormData();fd.append("name",form.name);fd.append("phone",form.phone);if(imgFile)fd.append("profile_image",imgFile);const r=await updateProfile(fd);if(r.data.success){toast.success("Profile updated!");setImgFile(null);setPreview(null);fetch();setUserData(p=>({...p,name:form.name}))}}catch(err){toast.error(err.response?.data?.message||"Failed!")}finally{setSaving(false)}}
  const handlePass=async(e)=>{e.preventDefault();if(passForm.newPassword!==passForm.confirm){toast.error("Don't match!");return};setChanging(true);try{const r=await changePassword({email:profile.email,newPassword:passForm.newPassword});if(r.data.success){toast.success("Password changed!");setPassForm({newPassword:"",confirm:""})}}catch(err){toast.error(err.response?.data?.message||"Failed!")}finally{setChanging(false)}}
  const avatarSrc=preview?preview:profile?.profile_image?`${BACKEND}${profile.profile_image}`:null
  if(loading)return <div style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f9f9fb"}}><div style={{width:40,height:40,border:"3px solid rgba(251,163,28,.2)",borderTopColor:"#FBA31C",borderRadius:"50%",animation:"spin .8s linear infinite"}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
  return (
    <div>
      <section className="hero-area"><div className="breadcrumbs-area bg_cover" style={{backgroundImage:"url(/assets/images/bg/breadcrumbs-bg-1.jpg)",backgroundSize:"cover",backgroundPosition:"center",padding:"60px 0",position:"relative"}}><div style={{position:"absolute",inset:0,background:"rgba(12,18,57,.7)"}}/><div className="container" style={{position:"relative",zIndex:2}}><div className="row justify-content-center"><div className="col-lg-8 text-center"><h2 style={{color:"#fff",fontWeight:900,fontSize:"clamp(1.8rem,3vw,2.6rem)",marginBottom:10}}>My Profile</h2><nav><ol className="breadcrumb justify-content-center mb-0" style={{background:"none"}}><li className="breadcrumb-item"><Link to="/" style={{color:"var(--primary-color)"}}>Home</Link></li><li className="breadcrumb-item active" style={{color:"#fff"}}>Profile</li></ol></nav></div></div></div></div></section>
      <section style={{padding:"60px 0",background:"#f9f9fb"}}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div style={{background:"#fff",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.06)",overflow:"hidden"}}>
                <div style={{background:"var(--primary-color)",padding:"32px 20px",textAlign:"center"}}>
                  <div style={{position:"relative",display:"inline-block",marginBottom:16}}>
                    {avatarSrc?<img src={avatarSrc} alt="" style={{width:90,height:90,borderRadius:"50%",objectFit:"cover",border:"3px solid #fff"}} onError={e=>e.target.style.display="none"}/>:<div style={{width:90,height:90,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,color:"var(--primary-color)",fontWeight:800,margin:"0 auto"}}>{profile?.name?.charAt(0)?.toUpperCase()}</div>}
                    <label htmlFor="av" style={{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:"50%",background:"var(--heading-color)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12,border:"2px solid #fff"}}>📷<input id="av" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){setImgFile(f);setPreview(URL.createObjectURL(f))}}}/></label>
                  </div>
                  <h4 style={{color:"#fff",fontWeight:700,marginBottom:2}}>{profile?.name}</h4><p style={{color:"rgba(255,255,255,.8)",fontSize:13,margin:0}}>RentEquip Member</p>
                </div>
                <div style={{padding:20}}>
                  {[{i:"fas fa-envelope",l:"Email",v:profile?.email},{i:"fas fa-phone",l:"Phone",v:profile?.phone}].map(x=>(<div key={x.l} style={{display:"flex",gap:12,marginBottom:14}}><i className={x.i} style={{color:"var(--primary-color)",marginTop:2,flexShrink:0,width:16}}/><div><p style={{color:"#999",fontSize:11,margin:0}}>{x.l}</p><p style={{color:"var(--heading-color)",fontSize:13,fontWeight:600,margin:0}}>{x.v||"—"}</p></div></div>))}
                  <Link to="/my-bookings" className="main-btn main-btn-primary" style={{display:"block",textAlign:"center",marginTop:16}}>My Bookings</Link>
                  {imgFile&&<button onClick={handleSave} disabled={saving} style={{width:"100%",marginTop:8,padding:"9px",background:"rgba(251,163,28,.1)",color:"var(--primary-color)",border:"1px solid rgba(251,163,28,.3)",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:13}}>{saving?"Saving...":"Save New Photo"}</button>}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div style={{background:"#fff",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.06)",overflow:"hidden"}}>
                <div style={{display:"flex",borderBottom:"1px solid #eee"}}>
                  {[{k:"info",l:"Account Info"},{k:"password",l:"Change Password"}].map(t=>(<button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"16px 20px",border:"none",background:"none",cursor:"pointer",fontWeight:tab===t.k?700:500,color:tab===t.k?"var(--primary-color)":"#727272",borderBottom:tab===t.k?"3px solid var(--primary-color)":"3px solid transparent",fontSize:14,transition:"all .2s"}}>{t.l}</button>))}
                </div>
                <div style={{padding:28}}>
                  {tab==="info"&&(<form onSubmit={handleSave}><div className="row g-3"><div className="col-md-6"><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>Full Name</label><input type="text" style={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div><div className="col-md-6"><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>Phone</label><input type="tel" style={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div><div className="col-12"><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>Email <span style={{color:"#999",fontWeight:400,fontSize:11}}>(cannot change)</span></label><div style={{...inp,color:"#999",background:"#f9f9fb",cursor:"not-allowed"}}>{profile?.email}</div></div></div><button type="submit" className="main-btn main-btn-primary" style={{marginTop:20,padding:"11px 28px",fontSize:14}} disabled={saving}>{saving?"Saving...":"Save Changes"}</button></form>)}
                  {tab==="password"&&(<form onSubmit={handlePass}><div style={{background:"#fff8e7",border:"1px solid rgba(251,163,28,.3)",borderRadius:6,padding:12,marginBottom:20,fontSize:13,color:"#92400e"}}>⚠️ New password must be at least 6 characters.</div><div style={{marginBottom:14}}><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>New Password *</label><input type="password" style={inp} value={passForm.newPassword} onChange={e=>setPassForm({...passForm,newPassword:e.target.value})} required minLength={6}/></div><div style={{marginBottom:24}}><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>Confirm *</label><input type="password" style={inp} value={passForm.confirm} onChange={e=>setPassForm({...passForm,confirm:e.target.value})} required/>{passForm.confirm&&<small style={{color:passForm.newPassword===passForm.confirm?"#16a34a":"#dc2626",fontSize:12,marginTop:4,display:"block"}}>{passForm.newPassword===passForm.confirm?"✓ Match":"✗ Don't match"}</small>}</div><button type="submit" className="main-btn main-btn-primary" style={{padding:"11px 28px",fontSize:14}} disabled={changing}>{changing?"Updating...":"Update Password"}</button></form>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

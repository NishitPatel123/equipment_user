import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
const B = "https://equipment-user-n5bb.onrender.com"
const inp = { width: "100%", padding: "11px 14px", border: "1px solid #eee", borderRadius: 6, fontSize: 14, outline: "none" }
export default function ForgotPassword() {
  const [step,setStep]=useState(1); const [email,setEmail]=useState(""); const [otp,setOtp]=useState(""); const [newPass,setNewPass]=useState(""); const [confirm,setConfirm]=useState(""); const [loading,setLoading]=useState(false); const navigate=useNavigate()
  const sendOtp=async(e)=>{e.preventDefault();setLoading(true);try{const r=await axios.post(`${B}/sendOtp`,{email});if(r.data.success){toast.success("OTP sent!");setStep(2)}else toast.error(r.data.message)}catch(err){toast.error(err.response?.data?.message||"Failed!")}finally{setLoading(false)}}
  const verifyOtp=async(e)=>{e.preventDefault();setLoading(true);try{const r=await axios.post(`${B}/verifyOtp`,{email,otp});if(r.data.success){toast.success("OTP verified!");setStep(3)}else toast.error(r.data.message)}catch(err){toast.error(err.response?.data?.message||"Invalid OTP!")}finally{setLoading(false)}}
  const resetPass=async(e)=>{e.preventDefault();if(newPass!==confirm){toast.error("Don't match!");return};setLoading(true);try{const r=await axios.post(`${B}/changePassword`,{email,newPassword:newPass});if(r.data.success){toast.success("Password reset!");navigate("/login")}else toast.error(r.data.message)}catch(err){toast.error(err.response?.data?.message||"Failed!")}finally{setLoading(false)}}
  return (
    <div style={{minHeight:"85vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f9f9fb",padding:"40px 20px"}}>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{background:"#fff",borderRadius:12,boxShadow:"0 8px 40px rgba(0,0,0,.08)",overflow:"hidden"}}>
          <div style={{background:"var(--primary-color)",padding:"24px 32px"}}><h3 style={{color:"#fff",fontWeight:800,marginBottom:2}}>Forgot Password</h3><p style={{color:"rgba(255,255,255,.8)",fontSize:13,margin:0}}>Step {step} of 3 — {["Enter Email","Verify OTP","New Password"][step-1]}</p></div>
          <div style={{padding:32}}>
            {step===1&&<form onSubmit={sendOtp}><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>Email *</label><input type="email" style={inp} placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required /><button type="submit" className="main-btn main-btn-primary" style={{width:"100%",padding:"12px",fontSize:14,marginTop:16}} disabled={loading}>{loading?"Sending...":"Send OTP"}</button></form>}
            {step===2&&<form onSubmit={verifyOtp}><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>OTP *</label><input type="text" style={inp} placeholder="6-digit OTP" value={otp} onChange={e=>setOtp(e.target.value)} required maxLength={6} /><button type="submit" className="main-btn main-btn-primary" style={{width:"100%",padding:"12px",fontSize:14,marginTop:16}} disabled={loading}>{loading?"Verifying...":"Verify OTP"}</button></form>}
            {step===3&&<form onSubmit={resetPass}><div style={{marginBottom:14}}><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>New Password *</label><input type="password" style={inp} value={newPass} onChange={e=>setNewPass(e.target.value)} required minLength={6} /></div><div style={{marginBottom:20}}><label style={{color:"var(--heading-color)",fontSize:13,fontWeight:700,marginBottom:6,display:"block"}}>Confirm *</label><input type="password" style={inp} value={confirm} onChange={e=>setConfirm(e.target.value)} required /></div><button type="submit" className="main-btn main-btn-primary" style={{width:"100%",padding:"12px",fontSize:14}} disabled={loading}>{loading?"Resetting...":"Reset Password"}</button></form>}
            <p style={{textAlign:"center",marginTop:20,fontSize:14}}><Link to="/login" style={{color:"var(--primary-color)",fontWeight:700}}>← Back to Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

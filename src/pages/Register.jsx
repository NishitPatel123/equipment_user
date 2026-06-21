import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signup } from "../services/api"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error("Passwords don't match!"); return }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters!"); return }
    setLoading(true)
    try {
      const r = await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      if (r.data.success) { toast.success("Account created! Please login."); navigate("/login") }
    } catch (err) { toast.error(err.response?.data?.message || "Registration failed!") }
    finally { setLoading(false) }
  }

  const inp = { width: "100%", padding: "11px 14px", border: "1px solid #eee", borderRadius: 6, fontSize: 14, outline: "none" }

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9fb", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 500 }}>
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 8px 40px rgba(0,0,0,.08)", overflow: "hidden" }}>
          <div style={{ background: "var(--primary-color)", padding: "24px 32px" }}>
            <h3 style={{ color: "#fff", fontWeight: 800, marginBottom: 2 }}>Create Account</h3>
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: 13, margin: 0 }}>Join RentEquip and start booking today!</p>
          </div>
          <div style={{ padding: 32 }}>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {[{f:"name",l:"Full Name",t:"text",ph:"John Doe"},{f:"email",l:"Email",t:"email",ph:"john@email.com"},{f:"phone",l:"Phone",t:"tel",ph:"+91 98765 43210"}].map(x => (
                  <div key={x.f} className="col-12">
                    <label style={{ color: "var(--heading-color)", fontSize: 13, fontWeight: 700, marginBottom: 6, display: "block" }}>{x.l} *</label>
                    <input type={x.t} style={inp} placeholder={x.ph} value={form[x.f]} onChange={e => setForm({...form,[x.f]:e.target.value})} required />
                  </div>
                ))}
                <div className="col-6">
                  <label style={{ color: "var(--heading-color)", fontSize: 13, fontWeight: 700, marginBottom: 6, display: "block" }}>Password *</label>
                  <input type="password" style={inp} placeholder="Min 6 chars" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required minLength={6} />
                </div>
                <div className="col-6">
                  <label style={{ color: "var(--heading-color)", fontSize: 13, fontWeight: 700, marginBottom: 6, display: "block" }}>Confirm *</label>
                  <input type="password" style={inp} placeholder="Repeat" value={form.confirm} onChange={e => setForm({...form,confirm:e.target.value})} required />
                  {form.confirm && <small style={{ color: form.password===form.confirm?"#16a34a":"#dc2626", fontSize: 11 }}>{form.password===form.confirm?"✓ Match":"✗ Mismatch"}</small>}
                </div>
              </div>
              <button type="submit" className="main-btn main-btn-primary" style={{ width: "100%", padding: "13px", fontSize: 15, marginTop: 20 }} disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <p style={{ color: "#727272", textAlign: "center", marginTop: 20, fontSize: 14 }}>
              Already have an account? <Link to="/login" style={{ color: "var(--primary-color)", fontWeight: 700 }}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

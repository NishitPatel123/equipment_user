import React, { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getEquipmentDetails, placeBooking, myBookings, genOrderId, verifyPayment } from "../services/api"

const BACKEND = "https://equipment-user-n5bb.onrender.com"
const RAZORPAY_KEY = "rzp_test_VQhEfe2NCXbbwI"

export default function EquipmentDetail({ isAuthenticated }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    getEquipmentDetails(id)
      .then(r => setEquipment(r.data.data))
      .catch(() => { toast.error("Equipment not found!"); navigate("/equipment") })
      .finally(() => setLoading(false))
  }, [id])

  const rentalDays = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000))
    : 0
  const totalCost = equipment && rentalDays ? equipment.price * quantity * rentalDays : 0

  const handleBook = async () => {
    if (!isAuthenticated) { toast.error("Please login to book equipment"); navigate("/login"); return }
    if (!startDate) { toast.error("Please select a start date"); return }
    if (!endDate) { toast.error("Please select an end date"); return }
    if (new Date(endDate) <= new Date(startDate)) { toast.error("End date must be after start date"); return }
    if (quantity < 1 || quantity > equipment.total_qty) { toast.error(`Quantity must be between 1 and ${equipment.total_qty}`); return }

    setBooking(true)
    try {
      const r = await placeBooking({ equip_id: id, start_date: startDate, end_date: endDate, quantity })
      if (!r.data.success) { toast.error(r.data.message); return }
      toast.success("Booking placed! Awaiting admin approval. You can pay after approval.")
      navigate("/my-bookings")
    } catch (err) { toast.error(err.response?.data?.message || "Booking failed!") }
    finally { setBooking(false) }
  }

  if (loading) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9fb" }}>
      <div style={{ width: 48, height: 48, border: "4px solid rgba(251,163,28,.2)", borderTopColor: "#FBA31C", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if (!equipment) return null

  const today = new Date().toISOString().split("T")[0]
  const specs = equipment.specification ? equipment.specification.split(",").map(s => s.trim()).filter(Boolean) : []

  return (
    <div>
      {/* Breadcrumb */}
      <section className="hero-area">
        <div className="breadcrumbs-area bg_cover" style={{ backgroundImage: "url(/assets/images/bg/breadcrumbs-bg-1.jpg)", backgroundSize: "cover", backgroundPosition: "center", padding: "60px 0", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(12,18,57,.7)" }} />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ background: "none" }}>
                <li className="breadcrumb-item"><Link to="/" style={{ color: "var(--primary-color)" }}>Home</Link></li>
                <li className="breadcrumb-item"><Link to="/equipment" style={{ color: "var(--primary-color)" }}>Equipment</Link></li>
                <li className="breadcrumb-item active" style={{ color: "#fff" }}>{equipment.name}</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="equipment-details-section" style={{ padding: "60px 0", background: "#f9f9fb" }}>
        <div className="container">
          <div className="row g-5">
            {/* Left */}
            <div className="col-lg-7">
              {/* Image */}
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 28, boxShadow: "0 8px 30px rgba(0,0,0,.1)" }}>
                {equipment.image ? (
                  <img src={`${BACKEND}${equipment.image}`} alt={equipment.name} style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                ) : (
                  <div style={{ height: 360, background: "linear-gradient(135deg,#f0f4ff,#e8eeff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90 }}>⚙️</div>
                )}
              </div>

              {/* Info */}
              <div style={{ background: "#fff", borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,.06)", border: "1px solid #eee" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <span style={{ background: "rgba(251,163,28,.1)", color: "var(--primary-color)", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20, border: "1px solid rgba(251,163,28,.3)" }}>{equipment.category?.name || "Equipment"}</span>
                    <h2 style={{ color: "var(--heading-color)", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", margin: "10px 0 0" }}>{equipment.name}</h2>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ color: "var(--primary-color)", fontWeight: 900, fontSize: 28, margin: 0 }}>₹{equipment.price}</p>
                    <p style={{ color: "#999", fontSize: 12, margin: 0 }}>per day per unit</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ background: equipment.status === "Available" ? "#dcfce7" : "#fee2e2", color: equipment.status === "Available" ? "#16a34a" : "#dc2626", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                    <i className={`fas fa-${equipment.status === "Available" ? "check-circle" : "times-circle"} me-1`} />{equipment.status}
                  </span>
                  <span style={{ background: "#f0f4ff", color: "#4f46e5", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                    <i className="fas fa-boxes me-1" />{equipment.total_qty} units available
                  </span>
                </div>

                <p style={{ color: "#727272", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{equipment.description}</p>

                {/* Specifications */}
                {specs.length > 0 && (
                  <div>
                    <h5 style={{ color: "var(--heading-color)", fontWeight: 700, marginBottom: 14, fontSize: 16 }}>
                      <i className="fas fa-cogs me-2" style={{ color: "var(--primary-color)" }} />Specifications
                    </h5>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {specs.map((s, i) => (
                        <span key={i} style={{ background: "#f9f9fb", border: "1px solid #eee", borderRadius: 6, padding: "6px 12px", fontSize: 13, color: "#555" }}>
                          <i className="fas fa-check me-1" style={{ color: "var(--primary-color)" }} />{s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Booking Card */}
            <div className="col-lg-5">
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,.1)", border: "1px solid #eee", overflow: "hidden", position: "sticky", top: 90 }}>
                <div style={{ background: "var(--primary-color)", padding: "16px 24px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 800, margin: 0, fontSize: 18 }}>
                    <i className="fas fa-calendar-check me-2" />Reserve This Equipment
                  </h4>
                </div>
                <div style={{ padding: 24 }}>
                  {/* Dates */}
                  <div className="row g-3 mb-16" style={{ marginBottom: 16 }}>
                    <div className="col-6">
                      <label style={{ color: "var(--heading-color)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>Start Date *</label>
                      <input type="date" value={startDate} min={today}
                        onChange={e => { setStartDate(e.target.value); if (endDate && e.target.value >= endDate) setEndDate("") }}
                        style={{ width: "100%", padding: "10px 12px", border: "1px solid #eee", borderRadius: 6, fontSize: 13, outline: "none", colorScheme: "light" }} />
                    </div>
                    <div className="col-6">
                      <label style={{ color: "var(--heading-color)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>End Date *</label>
                      <input type="date" value={endDate} min={startDate || today}
                        onChange={e => setEndDate(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", border: "1px solid #eee", borderRadius: 6, fontSize: 13, outline: "none", colorScheme: "light" }} />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ color: "var(--heading-color)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>
                      Quantity (Max: {equipment.total_qty})
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #eee", borderRadius: 6, overflow: "hidden" }}>
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        style={{ width: 40, height: 42, background: "#f9f9fb", border: "none", cursor: "pointer", fontSize: 18, fontWeight: 700, color: "var(--primary-color)" }}>−</button>
                      <input type="number" value={quantity} min={1} max={equipment.total_qty}
                        onChange={e => setQuantity(Math.min(equipment.total_qty, Math.max(1, parseInt(e.target.value) || 1)))}
                        style={{ flex: 1, textAlign: "center", border: "none", outline: "none", fontSize: 15, fontWeight: 700, color: "var(--heading-color)" }} />
                      <button onClick={() => setQuantity(q => Math.min(equipment.total_qty, q + 1))}
                        style={{ width: 40, height: 42, background: "#f9f9fb", border: "none", cursor: "pointer", fontSize: 18, fontWeight: 700, color: "var(--primary-color)" }}>+</button>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  {rentalDays > 0 && (
                    <div style={{ background: "#f9f9fb", border: "1px solid rgba(251,163,28,.2)", borderRadius: 8, padding: "16px 18px", marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: "#727272", fontSize: 13 }}>₹{equipment.price} × {quantity} unit{quantity > 1 ? "s" : ""} × {rentalDays} day{rentalDays > 1 ? "s" : ""}</span>
                        <span style={{ color: "var(--heading-color)", fontWeight: 600, fontSize: 13 }}>₹{totalCost}</span>
                      </div>
                      <hr style={{ margin: "10px 0", borderColor: "rgba(251,163,28,.2)" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--heading-color)", fontWeight: 700, fontSize: 15 }}>Total Amount</span>
                        <span style={{ color: "var(--primary-color)", fontWeight: 900, fontSize: 24 }}>₹{totalCost}</span>
                      </div>
                      <p style={{ color: "#999", fontSize: 11, marginTop: 6, marginBottom: 0 }}>
                        ⚠️ Booking pending admin approval. Pay after approval from My Bookings.
                      </p>
                    </div>
                  )}

                  {/* Book Button */}
                  {equipment.status === "Available" ? (
                    <button className="main-btn main-btn-primary" style={{ width: "100%", padding: "14px", fontSize: 15, opacity: booking ? .7 : 1 }}
                      onClick={handleBook} disabled={booking}>
                      {booking ? "Placing Booking..." : isAuthenticated ? "🔧 Place Booking Request" : "Login to Book"}
                    </button>
                  ) : (
                    <div style={{ textAlign: "center", padding: 14, background: "#f9f9fb", borderRadius: 6, color: "#999", fontWeight: 600 }}>Equipment Unavailable</div>
                  )}

                  {!isAuthenticated && (
                    <p style={{ color: "#727272", fontSize: 12, textAlign: "center", marginTop: 12 }}>
                      <Link to="/login" style={{ color: "var(--primary-color)" }}>Login</Link> or <Link to="/register" style={{ color: "var(--primary-color)" }}>Register</Link> to place bookings
                    </p>
                  )}

                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                    {["✅ Admin approval required before payment", "🔒 Secure Razorpay payment", "📋 Digital booking confirmation", "❌ Cancel anytime from My Bookings"].map(t => (
                      <p key={t} style={{ color: "#999", fontSize: 11, margin: 0 }}>{t}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

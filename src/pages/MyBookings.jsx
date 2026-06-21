import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  myBookings,
  cancelBooking,
  genOrderId,
  verifyPayment,
  addFeedback,
} from "../services/api";

const BACKEND = "http://localhost:8000";
const RAZORPAY_KEY = "rzp_test_VQhEfe2NCXbbwI";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [fbForm, setFbForm] = useState({ rating: 5, feedback: "" });
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await myBookings();
      setBookings(r.data.data || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const r = await cancelBooking({ booking_id: cancelModal._id });
      if (r.data.success) {
        toast.success("Booking cancelled!");
        setCancelModal(null);
        fetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed!");
    } finally {
      setCancelling(false);
    }
  };

  const handlePay = async (booking) => {
    setPaying(booking._id);
    try {
      const oRes = await genOrderId({ booking_id: booking._id });
      if (!oRes.data.success) {
        toast.error(oRes.data.message);
        return;
      }
      const { order_id, amount, booking_id } = oRes.data.data;
      const options = {
        key: RAZORPAY_KEY,
        amount,
        currency: "INR",
        name: "RentEquip",
        description: `${booking.equipment?.name} – ${booking.rental_days} day(s)`,
        order_id,
        handler: async (response) => {
          try {
            const vRes = await verifyPayment({
              booking_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (vRes.data.success) {
              toast.success("Payment successful! 🔧");
              fetch();
            }
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        theme: { color: "#FBA31C" },
      };
      if (!window.Razorpay) {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(s);
        await new Promise((r) => (s.onload = r));
      }
      new window.Razorpay(options).open();
    } catch {
      toast.error("Payment initiation failed");
    } finally {
      setPaying(null);
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const r = await addFeedback({
        booking_id: feedbackModal._id,
        service_id: feedbackModal.equipment?._id,
        rating: fbForm.rating,
        feedback: fbForm.feedback,
      });
      if (r.data.success) {
        toast.success("Review submitted! Thank you!");
        setFeedbackModal(null);
        setFbForm({ rating: 5, feedback: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (s) => {
    const m = {
      Pending: { bg: "#fef9c3", color: "#a16207" },
      Approved: { bg: "#dcfce7", color: "#15803d" },
      Cancelled: { bg: "#fee2e2", color: "#dc2626" },
    };
    const style = m[s] || { bg: "#f3f4f6", color: "#374151" };
    return (
      <span
        style={{
          background: style.bg,
          color: style.color,
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 20,
        }}
      >
        {s}
      </span>
    );
  };
  const payBadge = (s) => {
    const m = {
      Success: { bg: "#dcfce7", color: "#15803d" },
      Pending: { bg: "#fef9c3", color: "#a16207" },
      Failed: { bg: "#fee2e2", color: "#dc2626" },
    };
    const style = m[s] || { bg: "#f3f4f6", color: "#374151" };
    return (
      <span
        style={{
          background: style.bg,
          color: style.color,
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 20,
        }}
      >
        {s || "Pending"}
      </span>
    );
  };

  return (
    <div>
      <section className="hero-area">
        <div
          className="breadcrumbs-area bg_cover"
          style={{
            backgroundImage: "url(/assets/images/bg/breadcrumbs-bg-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "60px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(12,18,57,.7)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2
                  style={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "clamp(1.8rem,3vw,2.6rem)",
                    marginBottom: 10,
                  }}
                >
                  My Bookings
                </h2>
                <nav>
                  <ol
                    className="breadcrumb justify-content-center mb-0"
                    style={{ background: "none" }}
                  >
                    <li className="breadcrumb-item">
                      <Link to="/" style={{ color: "var(--primary-color)" }}>
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      style={{ color: "#fff" }}
                    >
                      My Bookings
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "#f9f9fb" }}>
        <div className="container">
          {/* Legend */}
          <div
            style={{
              background: "#fff8e7",
              border: "1px solid rgba(251,163,28,.3)",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 28,
              fontSize: 13,
              color: "#92400e",
            }}
          >
            <i
              className="fas fa-info-circle me-2"
              style={{ color: "var(--primary-color)" }}
            />
            <strong>Booking Flow:</strong> Place booking → Admin approves → Pay
            via Razorpay. You can only pay after the admin approves your
            booking.
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "3px solid rgba(251,163,28,.2)",
                  borderTopColor: "#FBA31C",
                  borderRadius: "50%",
                  animation: "spin .8s linear infinite",
                  margin: "0 auto",
                }}
              />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
              <h4 style={{ color: "var(--heading-color)" }}>No bookings yet</h4>
              <p style={{ color: "#727272", marginBottom: 24 }}>
                Start by browsing our equipment collection!
              </p>
              <Link to="/equipment" className="main-btn main-btn-primary">
                Browse Equipment
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {bookings.map((b) => (
                <div
                  key={b._id}
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: 24,
                    boxShadow: "0 4px 16px rgba(0,0,0,.05)",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(251,163,28,.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,.05)")
                  }
                >
                  <div className="row g-4 align-items-start">
                    {/* Image */}
                    <div className="col-md-2 col-4">
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          height: 90,
                        }}
                      >
                        {b.equipment?.image ? (
                          <img
                            src={`${BACKEND}${b.equipment.image}`}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "#f0f4ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 32,
                            }}
                          >
                            ⚙️
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Details */}
                    <div className="col-md-5">
                      <h5
                        style={{
                          color: "var(--heading-color)",
                          fontWeight: 700,
                          fontSize: 16,
                          marginBottom: 8,
                        }}
                      >
                        {b.equipment?.name || "Equipment"}
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <span style={{ color: "#727272", fontSize: 13 }}>
                          <i
                            className="fas fa-tag me-1"
                            style={{ color: "var(--primary-color)" }}
                          />
                          {b.category?.name || "—"}
                        </span>
                        <span style={{ color: "#727272", fontSize: 13 }}>
                          <i
                            className="fas fa-calendar me-1"
                            style={{ color: "var(--primary-color)" }}
                          />
                          {b.start_date
                            ? new Date(b.start_date).toLocaleDateString("en-IN")
                            : "—"}{" "}
                          →{" "}
                          {b.end_date
                            ? new Date(b.end_date).toLocaleDateString("en-IN")
                            : "—"}
                        </span>
                        <span style={{ color: "#727272", fontSize: 13 }}>
                          <i
                            className="fas fa-boxes me-1"
                            style={{ color: "var(--primary-color)" }}
                          />
                          Qty: <strong>{b.quantity}</strong> unit
                          {b.quantity > 1 ? "s" : ""} × {b.rental_days} day
                          {b.rental_days > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    {/* Status + actions */}
                    <div className="col-md-5">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          {statusBadge(b.status)}
                          {payBadge(b.payment_status)}
                          <span
                            style={{
                              color: "var(--primary-color)",
                              fontWeight: 800,
                              fontSize: 16,
                              marginLeft: "auto",
                            }}
                          >
                            ₹{b.total_amount}
                          </span>
                        </div>
                        {b.status === "Pending" && (
                          <p
                            style={{
                              color: "#a16207",
                              fontSize: 12,
                              background: "#fef9c3",
                              borderRadius: 4,
                              padding: "4px 8px",
                              margin: 0,
                            }}
                          >
                            <i className="fas fa-clock me-1" />
                            Waiting for admin approval before payment
                          </p>
                        )}
                        <div
                          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                        >
                          {b.status === "Approved" &&
                            b.payment_status !== "Success" && (
                              <button
                                className="main-btn main-btn-primary"
                                style={{
                                  padding: "7px 14px",
                                  fontSize: 12,
                                  opacity: paying === b._id ? 0.7 : 1,
                                }}
                                onClick={() => handlePay(b)}
                                disabled={paying === b._id}
                              >
                                {paying === b._id ? "..." : "💳 Pay Now"}
                              </button>
                            )}
                          {(b.status === "Pending" ||
                            b.status === "Approved") &&
                            b.payment_status !== "Success" && (
                              <button
                                onClick={() => setCancelModal(b)}
                                style={{
                                  padding: "7px 14px",
                                  fontSize: 12,
                                  background: "#fee2e2",
                                  color: "#dc2626",
                                  border: "1px solid #fca5a5",
                                  borderRadius: 4,
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                ✕ Cancel
                              </button>
                            )}
                          {b.status === "Approved" &&
                            b.payment_status === "Success" && (
                              <button
                                onClick={() => {
                                  setFeedbackModal(b);
                                  setFbForm({ rating: 5, feedback: "" });
                                }}
                                style={{
                                  padding: "7px 14px",
                                  fontSize: 12,
                                  background: "#fef9c3",
                                  color: "#a16207",
                                  border: "1px solid rgba(251,163,28,.4)",
                                  borderRadius: 4,
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                ⭐ Review
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cancel Modal */}
      {cancelModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,.2)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <h4 style={{ color: "var(--heading-color)", marginBottom: 8 }}>
              Cancel Booking?
            </h4>
            <p style={{ color: "#727272", fontSize: 14, marginBottom: 24 }}>
              This will cancel your booking for{" "}
              <strong>{cancelModal.equipment?.name}</strong>.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setCancelModal(null)}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "#f9f9fb",
                  border: "1px solid #eee",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#555",
                }}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fca5a5",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              maxWidth: 460,
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,.2)",
            }}
          >
            <h4
              style={{
                color: "var(--heading-color)",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Leave a Review
            </h4>
            <p style={{ color: "#727272", fontSize: 13, marginBottom: 24 }}>
              How was your experience with{" "}
              <strong style={{ color: "var(--primary-color)" }}>
                {feedbackModal.equipment?.name}
              </strong>
              ?
            </p>
            <form onSubmit={handleFeedback}>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    color: "var(--heading-color)",
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 8,
                    display: "block",
                  }}
                >
                  Rating *
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFbForm((f) => ({ ...f, rating: s }))}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 6,
                        border:
                          s <= fbForm.rating
                            ? "2px solid var(--primary-color)"
                            : "1px solid #eee",
                        background:
                          s <= fbForm.rating ? "rgba(251,163,28,.1)" : "#fff",
                        color:
                          s <= fbForm.rating ? "var(--primary-color)" : "#ccc",
                        fontSize: 22,
                        cursor: "pointer",
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: 700,
                      fontSize: 16,
                      alignSelf: "center",
                      marginLeft: 8,
                    }}
                  >
                    {fbForm.rating}/5
                  </span>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    color: "var(--heading-color)",
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 8,
                    display: "block",
                  }}
                >
                  Your Feedback *
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your experience..."
                  value={fbForm.feedback}
                  onChange={(e) =>
                    setFbForm((f) => ({ ...f, feedback: e.target.value }))
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #eee",
                    borderRadius: 6,
                    fontSize: 14,
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setFeedbackModal(null)}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "#f9f9fb",
                    border: "1px solid #eee",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "#555",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="main-btn main-btn-primary"
                  style={{ flex: 2, padding: 12, fontSize: 14 }}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

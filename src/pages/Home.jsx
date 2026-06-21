import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getEquipment, getFeedbacks } from "../services/api";

const BACKEND = "https://equipment-user-n5bb.onrender.com";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getEquipment(), getFeedbacks()])
      .then(([cR, eR, fR]) => {
        setCategories(cR.data.data || []);
        setEquipment((eR.data.data || []).slice(0, 6));
        setFeedbacks((fR.data.data || []).slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const avg = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(
        1,
      )
    : "5.0";

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero-area">
        <div
          className="single-hero-slider bg_cover"
          style={{
            backgroundImage: "url(/assets/images/bg/hero-bg-slider-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(12,18,57,.75)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="hero-content text-center">
                  <p
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    #1 Equipment Rental Platform in India
                  </p>
                  <h1
                    style={{
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "clamp(2rem,5vw,3.8rem)",
                      lineHeight: 1.15,
                      marginBottom: 20,
                    }}
                  >
                    Rent Construction Equipment <br />
                    <span style={{ color: "var(--primary-color)" }}>
                      Fast, Easy & Affordable
                    </span>
                  </h1>
                  <p
                    style={{
                      color: "rgba(255,255,255,.8)",
                      lineHeight: 1.8,
                    }}
                  >
                    Browse hundreds of machines, tools & industrial equipment.
                    Book online with flexible rental periods and secure Razorpay
                    payments.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Link
                      to="/equipment"
                      className="main-btn main-btn-primary"
                      style={{ padding: "14px 36px", fontSize: 15 }}
                    >
                      Browse Equipment <i className="fas fa-arrow-right ms-2" />
                    </Link>
                    <Link
                      to="/register"
                      className="main-btn"
                      style={{
                        padding: "13px 36px",
                        fontSize: 15,
                        border: "2px solid #fff",
                        color: "#fff",
                        background: "transparent",
                      }}
                    >
                      Get Started Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: "var(--primary-color)", padding: "20px 0" }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              {
                n: equipment.length || "100",
                s: "+",
                l: "Equipment Available",
              },
              { n: "500", s: "+", l: "Happy Clients" },
              { n: categories.length || "20", s: "+", l: "Categories" },
              { n: avg, s: "★", l: "Average Rating" },
            ].map((s, i) => (
              <div key={i} className="col-md-3 col-6">
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 32,
                    marginBottom: 2,
                  }}
                >
                  {s.n}
                  <span style={{ fontSize: 18 }}>{s.s}</span>
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,.8)",
                    fontSize: 13,
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: "80px 0", background: "#f9f9fb" }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center">
              <div className="section-title">
                <span
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  Browse By Category
                </span>
                <h2
                  style={{
                    color: "var(--heading-color)",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    marginTop: 8,
                  }}
                >
                  Find Equipment by Category
                </h2>
              </div>
            </div>
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
          ) : (
            <div className="row g-4">
              {categories.slice(0, 8).map((c, i) => (
                <div key={c._id} className="col-lg-3 col-md-4 col-6">
                  <Link
                    to={`/equipment?category_id=${c._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: 10,
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                        border: "1px solid #eee",
                        transition: "all .3s",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 12px 30px rgba(251,163,28,.2)";
                        e.currentTarget.style.borderColor =
                          "var(--primary-color)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(0,0,0,.06)";
                        e.currentTarget.style.borderColor = "#eee";
                      }}
                    >
                      <div
                        style={{
                          height: 140,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        {c.image ? (
                          <img
                            src={`${BACKEND}${c.image}`}
                            alt={c.name}
                            style={{
                              width: "250px",
                              height: "250px",
                              objectFit: "cover",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              background: `hsl(${i * 35},60%,92%)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 44,
                            }}
                          >
                            ⚙️
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "14px 12px" }}>
                        <h6
                          style={{
                            color: "var(--heading-color)",
                            fontWeight: 700,
                            fontSize: 14,
                            margin: 0,
                          }}
                        >
                          {c.name}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 0", background: "#0C1239" }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center">
              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                Simple Process
              </span>
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem,3vw,2.4rem)",
                  marginTop: 8,
                }}
              >
                How Rental Works
              </h2>
            </div>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "fas fa-search",
                step: "01",
                title: "Browse Equipment",
                desc: "Search and filter hundreds of machines by category, price, and availability.",
              },
              {
                icon: "fas fa-calendar-alt",
                step: "02",
                title: "Set Rental Period",
                desc: "Choose your start date, end date, and quantity. See the total cost instantly.",
              },
              {
                icon: "fas fa-credit-card",
                step: "03",
                title: "Book & Pay",
                desc: "Place your booking and pay securely via Razorpay. Instant confirmation.",
              },
              {
                icon: "fas fa-truck",
                step: "04",
                title: "Get Equipment",
                desc: "After admin approval, collect your equipment and get the job done.",
              },
            ].map((s, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div style={{ textAlign: "center", padding: "32px 24px" }}>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background: "rgba(251,163,28,.12)",
                      border: "2px solid rgba(251,163,28,.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <i
                      className={s.icon}
                      style={{ color: "var(--primary-color)", fontSize: 26 }}
                    />
                  </div>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: 2,
                    }}
                  >
                    STEP {s.step}
                  </span>
                  <h5
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      margin: "10px 0 10px",
                    }}
                  >
                    {s.title}
                  </h5>
                  <p
                    style={{
                      color: "#a9afc3",
                      fontSize: 14,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EQUIPMENT ── */}
      {equipment.length > 0 && (
        <section style={{ padding: "80px 0", background: "#fff" }}>
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-lg-8">
                <span
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  Latest Listings
                </span>
                <h2
                  style={{
                    color: "var(--heading-color)",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  Featured Equipment
                </h2>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link
                  to="/equipment"
                  className="main-btn main-btn-primary"
                  style={{ padding: "10px 24px", fontSize: 13 }}
                >
                  View All Equipment
                </Link>
              </div>
            </div>
            <div className="row g-4">
              {equipment.map((eq) => (
                <div key={eq._id} className="col-lg-4 col-md-6">
                  <div
                    className="pricing-item pricing-item-three"
                    style={{
                      background: "#fff",
                      borderRadius: 10,
                      overflow: "hidden",
                      boxShadow: "0 4px 24px rgba(0,0,0,.08)",
                      border: "1px solid #eee",
                      transition: "all .3s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 12px 40px rgba(251,163,28,.18)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 24px rgba(0,0,0,.08)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div
                      className="pricing-img"
                      style={{
                        position: "relative",
                        height: 220,
                        overflow: "hidden",
                      }}
                    >
                      {eq.image ? (
                        <img
                          src={`${BACKEND}${eq.image}`}
                          alt={eq.name}
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
                            background:
                              "linear-gradient(135deg,#f0f4ff,#e8eeff)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 60,
                          }}
                        >
                          ⚙️
                        </div>
                      )}
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background:
                            eq.status === "Available" ? "#22c55e" : "#ef4444",
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {eq.status}
                      </span>
                    </div>
                    <div
                      className="pricing-info"
                      style={{
                        flex: 1,
                        padding: "20px 20px 24px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(251,163,28,.1)",
                            color: "var(--primary-color)",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 20,
                            border: "1px solid rgba(251,163,28,.3)",
                          }}
                        >
                          {eq.category?.name || "Equipment"}
                        </span>
                        <span
                          style={{
                            color: "var(--primary-color)",
                            fontWeight: 800,
                            fontSize: 18,
                          }}
                        >
                          ₹{eq.price}
                          <span
                            style={{
                              fontSize: 12,
                              color: "#999",
                              fontWeight: 400,
                            }}
                          >
                            /day
                          </span>
                        </span>
                      </div>
                      <h5
                        style={{
                          color: "var(--heading-color)",
                          fontWeight: 700,
                          fontSize: 17,
                          marginBottom: 8,
                        }}
                      >
                        {eq.name}
                      </h5>
                      <p
                        style={{
                          color: "#727272",
                          fontSize: 13,
                          lineHeight: 1.6,
                          flex: 1,
                          marginBottom: 12,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {eq.description}
                      </p>
                      {eq.specification && (
                        <p
                          style={{
                            color: "#999",
                            fontSize: 12,
                            marginBottom: 14,
                            fontFamily: "monospace",
                          }}
                        >
                          <i
                            className="fas fa-cog me-1"
                            style={{ color: "var(--primary-color)" }}
                          />
                          {eq.specification.slice(0, 60)}
                          {eq.specification.length > 60 ? "..." : ""}
                        </p>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "#999", fontSize: 12 }}>
                          <i className="fas fa-boxes me-1" />
                          {eq.total_qty} unit{eq.total_qty > 1 ? "s" : ""}{" "}
                          available
                        </span>
                        <Link
                          to={`/equipment/${eq._id}`}
                          className="main-btn main-btn-primary"
                          style={{ padding: "8px 18px", fontSize: 13 }}
                        >
                          Reserve <i className="fas fa-arrow-right ms-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section
        style={{ padding: "80px 0", background: "var(--primary-color)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem,3vw,2.6rem)",
                  marginBottom: 10,
                }}
              >
                Ready to Rent Equipment?
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.85)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Create a free account and start booking equipment in minutes.
                Admin approval within 24 hours.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link
                to="/register"
                className="main-btn"
                style={{
                  background: "#fff",
                  color: "var(--primary-color)",
                  border: "none",
                  padding: "14px 36px",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEEDBACKS ── */}
      {feedbacks.length > 0 && (
        <section style={{ padding: "80px 0", background: "#f9f9fb" }}>
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-7 text-center">
                <span
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  What Clients Say
                </span>
                <h2
                  style={{
                    color: "var(--heading-color)",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    marginTop: 8,
                  }}
                >
                  Customer Reviews
                </h2>
              </div>
            </div>
            <div className="row g-4">
              {feedbacks.map((f, i) => (
                <div key={f._id || i} className="col-lg-4 col-md-6">
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 10,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                      border: "1px solid #eee",
                      height: "100%",
                    }}
                  >
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i
                          key={s}
                          className="fas fa-star"
                          style={{
                            color:
                              s <= f.rating
                                ? "var(--primary-color)"
                                : "#e2e2e2",
                            fontSize: 14,
                          }}
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        color: "#727272",
                        fontSize: 14,
                        fontStyle: "italic",
                        lineHeight: 1.8,
                        marginBottom: 18,
                      }}
                    >
                      "{f.feedback}"
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: "var(--primary-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: 16,
                        }}
                      >
                        {f.user?.name?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                      <div>
                        <p
                          style={{
                            color: "var(--heading-color)",
                            fontWeight: 700,
                            fontSize: 14,
                            margin: 0,
                          }}
                        >
                          {f.user?.name || "Customer"}
                        </p>
                        <p
                          style={{
                            color: "var(--primary-color)",
                            fontSize: 12,
                            margin: 0,
                          }}
                        >
                          {f.rating}/5 Rating
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link
                to="/feedbacks"
                className="main-btn main-btn-primary"
                style={{ padding: "12px 32px" }}
              >
                View All Reviews
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

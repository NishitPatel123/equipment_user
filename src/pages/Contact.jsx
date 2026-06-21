import React from "react";
import { Link } from "react-router-dom";
export default function Contact() {
  const inp = {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #eee",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
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
            <div className="text-center">
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem,3vw,2.6rem)",
                  marginBottom: 10,
                }}
              >
                Contact Us
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
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: "60px 0", background: "#f9f9fb" }}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                Get In Touch
              </span>
              <h2
                style={{
                  color: "var(--heading-color)",
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem,3vw,2.2rem)",
                  margin: "10px 0 20px",
                }}
              >
                We'd Love to{" "}
                <span style={{ color: "var(--primary-color)" }}>
                  Hear From You
                </span>
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {[
                  {
                    i: "fas fa-map-marker-alt",
                    t: "Address",
                    v: "Navrangpura, Ahmedabad, Gujarat - 380009",
                  },
                  { i: "fas fa-phone", t: "Phone", v: "+91 12345 67890" },
                  { i: "fas fa-envelope", t: "Email", v: "info@rentequip.in" },
                  {
                    i: "fas fa-clock",
                    t: "Hours",
                    v: "Mon–Sat: 9:00 AM – 6:00 PM",
                  },
                ].map((c) => (
                  <div
                    key={c.t}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      background: "#fff",
                      border: "1px solid #eee",
                      borderRadius: 10,
                      padding: 18,
                      boxShadow: "0 2px 10px rgba(0,0,0,.04)",
                    }}
                  >
                    <i
                      className={c.i}
                      style={{
                        color: "var(--primary-color)",
                        fontSize: 20,
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          color: "var(--heading-color)",
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {c.t}
                      </p>
                      <p style={{ color: "#727272", fontSize: 13, margin: 0 }}>
                        {c.v}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 32,
                  boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                  border: "1px solid #eee",
                }}
              >
                <h4
                  style={{
                    color: "var(--heading-color)",
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  Send a Message
                </h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label
                      style={{
                        color: "var(--heading-color)",
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Full Name
                    </label>
                    <input type="text" style={inp} placeholder="John Doe" />
                  </div>
                  <div className="col-md-6">
                    <label
                      style={{
                        color: "var(--heading-color)",
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      style={inp}
                      placeholder="john@email.com"
                    />
                  </div>
                  <div className="col-12">
                    <label
                      style={{
                        color: "var(--heading-color)",
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      style={inp}
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="col-12">
                    <label
                      style={{
                        color: "var(--heading-color)",
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={5}
                      style={{ ...inp, resize: "vertical" }}
                      placeholder="Your message..."
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="main-btn main-btn-primary"
                      style={{ padding: "12px 32px", fontSize: 14 }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

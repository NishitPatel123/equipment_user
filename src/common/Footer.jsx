import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="footer-area"
      style={{ background: "#0C1239", color: "#a9afc3" }}
    >
      <div className="container" style={{ paddingTop: 60, paddingBottom: 30 }}>
        <div className="row g-4 mb-5">
          {/* Brand */}
          <div className="col-lg-4">
            <div style={{ marginBottom: 20 }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 800,
                  fontSize: 22,
                }}
              >
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 6,
                    background: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  ⚙️
                </span>
                <span style={{ color: "#fff" }}>
                  Rent
                  <span style={{ color: "var(--primary-color)" }}>Equip</span>
                </span>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              India's trusted platform for equipment rental. Find and book
              construction machinery, tools, and industrial equipment online.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                ["fab fa-facebook-f", "https://facebook.com"],
                ["fab fa-twitter", "https://twitter.com"],
                ["fab fa-linkedin-in", "https://linkedin.com"],
                ["fab fa-instagram", "https://instagram.com"],
              ].map(([ic, href]) => (
                <a
                  key={ic}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(251,163,28,.12)",
                    border: "1px solid rgba(251,163,28,.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary-color)",
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--primary-color)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(251,163,28,.12)";
                    e.currentTarget.style.color = "var(--primary-color)";
                  }}
                >
                  <i className={ic} style={{ fontSize: 13 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4">
            <h6
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: 16,
                paddingBottom: 10,
                borderBottom: "2px solid var(--primary-color)",
                display: "inline-block",
              }}
            >
              Quick Links
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { to: "/", l: "Home" },
                { to: "/equipment", l: "Equipment" },
                { to: "/feedbacks", l: "Reviews" },
                { to: "/about", l: "About Us" },
                { to: "/contact", l: "Contact" },
              ].map((x) => (
                <li key={x.to} style={{ marginBottom: 8 }}>
                  <Link
                    to={x.to}
                    style={{
                      color: "#a9afc3",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--primary-color)")
                    }
                    onMouseLeave={(e) => (e.target.style.color = "#a9afc3")}
                  >
                    <i
                      className="fas fa-angle-right me-2"
                      style={{ color: "var(--primary-color)", fontSize: 11 }}
                    />
                    {x.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="col-lg-2 col-md-4">
            <h6
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: 16,
                paddingBottom: 10,
                borderBottom: "2px solid var(--primary-color)",
                display: "inline-block",
              }}
            >
              Account
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { to: "/login", l: "Login" },
                { to: "/register", l: "Register" },
                { to: "/my-bookings", l: "My Bookings" },
                { to: "/profile", l: "My Profile" },
                // { to: "/forgot-password", l: "Forgot Password" },
              ].map((x) => (
                <li key={x.to} style={{ marginBottom: 8 }}>
                  <Link
                    to={x.to}
                    style={{
                      color: "#a9afc3",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--primary-color)")
                    }
                    onMouseLeave={(e) => (e.target.style.color = "#a9afc3")}
                  >
                    <i
                      className="fas fa-angle-right me-2"
                      style={{ color: "var(--primary-color)", fontSize: 11 }}
                    />
                    {x.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-4">
            <h6
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: 16,
                paddingBottom: 10,
                borderBottom: "2px solid var(--primary-color)",
                display: "inline-block",
              }}
            >
              Contact Info
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                {
                  icon: "fas fa-map-marker-alt",
                  text: "Navrangpura, Ahmedabad, Gujarat - 380009",
                },
                { icon: "fas fa-phone", text: "+91 12345 67890" },
                { icon: "fas fa-envelope", text: "info@rentequip.in" },
                { icon: "fas fa-clock", text: "Mon–Sat: 9:00 AM – 6:00 PM" },
              ].map((c, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: 12, marginBottom: 14 }}
                >
                  <i
                    className={c.icon}
                    style={{
                      color: "var(--primary-color)",
                      marginTop: 3,
                      flexShrink: 0,
                      width: 16,
                    }}
                  />
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.1)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ margin: 0, fontSize: 13 }}>
            © {new Date().getFullYear()}{" "}
            <strong style={{ color: "var(--primary-color)" }}>RentEquip</strong>
            . All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: 13 }}>
            Secure payments by{" "}
            <strong style={{ color: "var(--primary-color)" }}>Razorpay</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

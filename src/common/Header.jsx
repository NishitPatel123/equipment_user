import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../auth/authService";
import { toast } from "react-toastify";

export default function Header({
  isAuthenticated,
  setIsAuthenticated,
  userData,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const fn = () => setSticky(window.scrollY > 100);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/equipment", label: "Equipment" },
    { to: "/feedbacks", label: "Reviews" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`header-area-one${sticky ? " sticky" : ""}`}>
        {/* ── Top Bar ── */}

        {/* ── Navigation ── */}
        <div className="header-navigation">
          <div className="container-fluid pl-0 pr-0">
            <div className="primary-menu d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="site-branding">
                <Link to="/" className="brand-logo">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        background: "var(--primary-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: 20,
                      }}
                    >
                      ⚙️
                    </span>
                    <span style={{ color: "var(--heading-color)" }}>
                      Rent
                      <span>Equip</span>
                    </span>
                  </span>
                </Link>
              </div>

              {/* Desktop Nav */}
              <div className={`nav-menu${mobileOpen ? " menu-on" : ""}`}>
                <div
                  className="navbar-close"
                  onClick={() => setMobileOpen(false)}
                >
                  <i className="fal fa-times" />
                </div>
                <nav className="main-menu">
                  <ul>
                    {navLinks.map((l) => (
                      <li
                        key={l.to}
                        className={`menu-item${pathname === l.to ? " active" : ""}`}
                      >
                        <Link
                          to={l.to}
                          className={pathname === l.to ? "active" : ""}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                    {isAuthenticated && (
                      <>
                        <li className="menu-item d-lg-none">
                          <Link to="/my-bookings">My Bookings</Link>
                        </li>
                        <li className="menu-item d-lg-none">
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li className="menu-item d-lg-none">
                          <button
                            onClick={handleLogout}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#0C1239",
                              fontWeight: 600,
                              padding: 0,
                              fontSize: 14,
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                    {!isAuthenticated && (
                      <li className="menu-item d-lg-none">
                        <Link to="/login">Login / Register</Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              {/* Mobile toggle */}
              <div
                className={`navbar-toggler${mobileOpen ? " active" : ""}`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span />
                <span />
                <span />
              </div>

              {/* Header right */}
              <div className="header-right-nav d-none d-lg-flex align-items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/my-bookings"
                      className="main-btn main-btn-primary"
                      style={{ padding: "10px 22px", fontSize: 13 }}
                    >
                      <i className="fas fa-calendar-check me-2" />
                      My Bookings
                    </Link>
                    <div ref={profileRef} style={{ position: "relative" }}>
                      <button
                        className="main-btn"
                        style={{
                          background: "transparent",
                          border: "2px solid ",
                          padding: "9px 20px",
                          fontSize: 13,
                        }}
                        onClick={() => setProfileOpen((prev) => !prev)}
                        aria-expanded={profileOpen}
                        aria-haspopup="true"
                      >
                        <i className="fas fa-user-circle me-2" />
                        {userData?.name?.split(" ")[0]} ▾
                      </button>
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "calc(100% + 10px)",
                          minWidth: 200,
                          background: "#fff",
                          border: "1px solid rgba(14, 46, 91, 0.12)",
                          borderRadius: 14,
                          boxShadow: "0 24px 60px rgba(17, 38, 77, 0.16)",
                          padding: "8px 0",
                          zIndex: 999,
                          opacity: profileOpen ? 1 : 0,
                          visibility: profileOpen ? "visible" : "hidden",
                          transform: profileOpen
                            ? "translateY(0)"
                            : "translateY(-8px)",
                          transition:
                            "opacity .18s ease, transform .18s ease, visibility .18s ease",
                        }}
                      >
                        <Link
                          to="/profile"
                          className="dropdown-item "
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            color: "#0C1239",
                            padding: "12px 18px",
                            fontSize: 14,
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                          onClick={() => setProfileOpen(false)}
                        >
                          <i className="fas fa-user me-2 text-warning" />
                          Profile
                        </Link>

                        <hr
                          style={{
                            margin: "8px 0",
                            border: 0,
                            borderTop: "1px solid rgba(14, 46, 91, 0.08)",
                          }}
                        />
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => {
                            setProfileOpen(false);
                            handleLogout();
                          }}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            color: "#DC3545",
                            padding: "12px 18px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-sign-out-alt me-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="main-btn main-btn-primary"
                      style={{ padding: "10px 22px" }}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            zIndex: 998,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

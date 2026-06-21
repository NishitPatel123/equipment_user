import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/api";
import { setToken } from "../auth/authService";

export default function Login({ setIsAuthenticated, setUserData }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await login(form);
      if (r.data.success) {
        if (r.data.userData?.session?.role !== "User") {
          toast.error("Admin accounts must use admin panel!");
          return;
        }
        setToken(r.data.token);
        setIsAuthenticated(true);
        setUserData(r.data.userData?.session);
        toast.success(
          `Welcome back, ${r.data.userData?.session?.name?.split(" ")[0]}! 🔧`,
        );
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9fb",
        padding: "40px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 40px rgba(0,0,0,.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{ background: "var(--primary-color)", padding: "28px 32px" }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 12,
              }}
            >
              ⚙️
            </div>
            <h3 style={{ color: "#fff", fontWeight: 800, marginBottom: 4 }}>
              Welcome Back
            </h3>
            <p
              style={{ color: "rgba(255,255,255,.8)", fontSize: 13, margin: 0 }}
            >
              Sign in to your RentEquip account
            </p>
          </div>
          <div style={{ padding: 32 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    color: "var(--heading-color)",
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid #eee",
                    borderRadius: 6,
                    fontSize: 14,
                    outline: "none",
                  }}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div style={{ marginBottom: 20, position: "relative" }}>
                <label
                  style={{
                    color: "var(--heading-color)",
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  Password *
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  style={{
                    width: "100%",
                    padding: "11px 40px 11px 14px",
                    border: "1px solid #eee",
                    borderRadius: 6,
                    fontSize: 14,
                    outline: "none",
                  }}
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 32,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                  }}
                >
                  <i className={`fas fa-eye${showPass ? "-slash" : ""}`} />
                </button>
              </div>

              <button
                type="submit"
                className="main-btn main-btn-primary"
                style={{ width: "100%", padding: "13px", fontSize: 15 }}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p
              style={{
                color: "#727272",
                textAlign: "center",
                marginTop: 20,
                fontSize: 14,
              }}
            >
              New to RentEquip?{" "}
              <Link
                to="/register"
                style={{ color: "var(--primary-color)", fontWeight: 700 }}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

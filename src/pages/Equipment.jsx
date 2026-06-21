import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getEquipment, getCategories } from "../services/api";

const BACKEND = "http://localhost:8000";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState(
    searchParams.get("category_id") || "",
  );
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const fetchEquipment = async (
    catId = activeCat,
    min = priceRange.min,
    max = priceRange.max,
  ) => {
    setLoading(true);
    try {
      const params = {};
      if (catId) params.category_id = catId;
      if (min) params.min_price = min;
      if (max) params.max_price = max;
      const r = await getEquipment(params);
      setEquipment(r.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories()
      .then((r) => setCategories(r.data.data || []))
      .catch(console.error);
    fetchEquipment();
  }, []);

  const handleCatChange = (id) => {
    setActiveCat(id);
    if (id) setSearchParams({ category_id: id });
    else setSearchParams({});
    fetchEquipment(id);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const filtered = equipment.filter(
    (e) =>
      !search ||
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Breadcrumb */}
      <section className="hero-area">
        <div
          className="breadcrumbs-area bg_cover"
          style={{
            backgroundImage: "url(/assets/images/bg/breadcrumbs-bg-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "80px 0",
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
                    fontSize: "clamp(1.8rem,4vw,2.8rem)",
                    marginBottom: 10,
                  }}
                >
                  Equipment Listings
                </h2>
                <nav aria-label="breadcrumb">
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
                      Equipment
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
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  padding: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                  position: "sticky",
                  top: 90,
                }}
              >
                {/* Search */}
                <div style={{ marginBottom: 28 }}>
                  <h5
                    style={{
                      color: "var(--heading-color)",
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 14,
                      paddingBottom: 10,
                      borderBottom: "2px solid var(--primary-color)",
                    }}
                  >
                    Search
                  </h5>
                  <div className="form_group" style={{ position: "relative" }}>
                    <i
                      className="fas fa-search"
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--primary-color)",
                      }}
                    />
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Search equipment..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        paddingLeft: 36,
                        borderRadius: 6,
                        border: "1px solid #eee",
                        width: "100%",
                        padding: "10px 12px 10px 36px",
                        fontSize: 13,
                      }}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div style={{ marginBottom: 28 }}>
                  <h5
                    style={{
                      color: "var(--heading-color)",
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 14,
                      paddingBottom: 10,
                      borderBottom: "2px solid var(--primary-color)",
                    }}
                  >
                    Categories
                  </h5>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <button
                      onClick={() => handleCatChange("")}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "none",
                        background: !activeCat
                          ? "rgba(251,163,28,.12)"
                          : "none",
                        color: !activeCat ? "var(--primary-color)" : "#727272",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: !activeCat ? 700 : 400,
                      }}
                    >
                      <i
                        className="fas fa-th-large me-2"
                        style={{ color: "var(--primary-color)" }}
                      />
                      All Categories
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c._id}
                        onClick={() => handleCatChange(c._id)}
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
                          borderRadius: 6,
                          border: "none",
                          background:
                            activeCat === c._id
                              ? "rgba(251,163,28,.12)"
                              : "none",
                          color:
                            activeCat === c._id
                              ? "var(--primary-color)"
                              : "#727272",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: activeCat === c._id ? 700 : 400,
                        }}
                      >
                        <i
                          className="fas fa-angle-right me-2"
                          style={{ color: "var(--primary-color)" }}
                        />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h5
                    style={{
                      color: "var(--heading-color)",
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 14,
                      paddingBottom: 10,
                      borderBottom: "2px solid var(--primary-color)",
                    }}
                  >
                    Price Range / Day
                  </h5>
                  <div style={{ gap: 8, marginBottom: 10 }}>
                    <input
                      type="number"
                      placeholder="Min ₹"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((p) => ({ ...p, min: e.target.value }))
                      }
                      style={{
                        flex: 1,
                        padding: "9px 10px",
                        border: "1px solid #eee",
                        borderRadius: 6,
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max ₹"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((p) => ({ ...p, max: e.target.value }))
                      }
                      style={{
                        flex: 1,
                        padding: "9px 10px",
                        border: "1px solid #eee",
                        borderRadius: 6,
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                  </div>
                  <button
                    onClick={() =>
                      fetchEquipment(activeCat, priceRange.min, priceRange.max)
                    }
                    className="main-btn main-btn-primary"
                    style={{ width: "100%", padding: "10px", fontSize: 13 }}
                  >
                    Apply Filter
                  </button>
                  {(activeCat ||
                    priceRange.min ||
                    priceRange.max ||
                    search) && (
                    <button
                      onClick={() => {
                        setActiveCat("");
                        setPriceRange({ min: "", max: "" });
                        setSearch("");
                        setSearchParams({});
                        fetchEquipment("", "", "");
                      }}
                      style={{
                        width: "100%",
                        marginTop: 8,
                        padding: "8px",
                        background: "#f9f9fb",
                        border: "1px solid #eee",
                        borderRadius: 6,
                        color: "#727272",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="col-lg-9">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ color: "#727272", fontSize: 14, margin: 0 }}>
                  Showing{" "}
                  <strong style={{ color: "var(--primary-color)" }}>
                    {filtered.length}
                  </strong>{" "}
                  equipment
                </p>
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
                      margin: "0 auto 12px",
                    }}
                  />
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  <p style={{ color: "#727272" }}>Loading equipment...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>⚙️</div>
                  <h4 style={{ color: "var(--heading-color)" }}>
                    No equipment found
                  </h4>
                  <p style={{ color: "#727272" }}>Try adjusting your filters</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filtered.map((eq) => (
                    <div key={eq._id} className="col-12 pb-2">
                      <div
                        className="pricing-item pricing-item-three"
                        style={{
                          display: "flex",
                          background: "#fff",
                          borderRadius: 10,
                          overflow: "hidden",
                          boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                          border: "1px solid #eee",
                          transition: "all .3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 8px 30px rgba(251,163,28,.15)";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 4px 20px rgba(0,0,0,.06)";
                          e.currentTarget.style.transform = "none";
                        }}
                      >
                        {/* Image */}
                        <div
                          className="pricing-img"
                          style={{
                            width: 200,
                            minHeight: 160,
                            flexShrink: 0,
                            position: "relative",
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
                                fontSize: 48,
                              }}
                            >
                              ⚙️
                            </div>
                          )}
                          <span
                            style={{
                              position: "absolute",
                              bottom: 8,
                              left: 8,
                              background:
                                eq.status === "Available"
                                  ? "#22c55e"
                                  : "#ef4444",
                              color: "#fff",
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: 10,
                            }}
                          >
                            {eq.status}
                          </span>
                        </div>
                        {/* Info */}
                        <div
                          className="pricing-info"
                          style={{
                            flex: 1,
                            padding: "20px 24px",
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
                            <div>
                              <span
                                style={{
                                  background: "rgba(251,163,28,.1)",
                                  color: "var(--primary-color)",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  padding: "2px 10px",
                                  borderRadius: 20,
                                }}
                              >
                                {eq.category?.name || "Equipment"}
                              </span>
                              <h4
                                style={{
                                  color: "var(--heading-color)",
                                  fontWeight: 700,
                                  fontSize: 18,
                                  margin: "8px 0 6px",
                                }}
                              >
                                {eq.name}
                              </h4>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <p
                                style={{
                                  color: "var(--primary-color)",
                                  fontWeight: 800,
                                  fontSize: 22,
                                  margin: 0,
                                }}
                              >
                                ₹{eq.price}
                              </p>
                              <p
                                style={{
                                  color: "#999",
                                  fontSize: 12,
                                  margin: 0,
                                }}
                              >
                                per day
                              </p>
                            </div>
                          </div>
                          <p
                            style={{
                              color: "#727272",
                              fontSize: 13,
                              lineHeight: 1.7,
                              marginBottom: 10,
                              flex: 1,
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
                                background: "#f9f9fb",
                                padding: "6px 10px",
                                borderRadius: 4,
                              }}
                            >
                              <i
                                className="fas fa-microchip me-1"
                                style={{ color: "var(--primary-color)" }}
                              />
                              {eq.specification}
                            </p>
                          )}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ color: "#999", fontSize: 13 }}>
                              <i
                                className="fas fa-boxes me-1"
                                style={{ color: "var(--primary-color)" }}
                              />
                              &nbsp;
                              {eq.total_qty} units available
                            </span>
                            <Link
                              to={`/equipment/${eq._id}`}
                              className="main-btn main-btn-primary"
                              style={{ padding: "9px 20px", fontSize: 13 }}
                            >
                              Reserve Now{" "}
                              <i className="fas fa-arrow-right ms-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

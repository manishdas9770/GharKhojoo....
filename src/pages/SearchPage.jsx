import { useState } from "react";
import { useApp } from "../context/AppContext";
import RoomCard from "../components/RoomCard";

const CITIES_LIST = ["All", "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Satna", "Mandsaur", "Neemuch"];
const TYPES_LIST  = ["All", "Studio", "1 BHK", "2 BHK", "3 BHK Villa", "PG", "Single Room"];
const FURN_LIST   = ["All", "Fully Furnished", "Semi Furnished", "Unfurnished"];
const TIER_LIST   = ["All", "Budget", "Standard", "Premium", "Luxury"];

export default function SearchPage() {
  const { rooms, navigate } = useApp();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "All", type: "All", furnishing: "All", tier: "All", maxPrice: 40000,
  });

  function setFilter(key, val) {
    setFilters((prev) => ({ ...prev, [key]: val }));
  }

  function resetFilters() {
    setFilters({ city: "All", type: "All", furnishing: "All", tier: "All", maxPrice: 40000 });
    setSearch("");
  }

  const filtered = rooms.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.city.toLowerCase().includes(q);
    const matchCity   = filters.city === "All" || r.city === filters.city;
    const matchType   = filters.type === "All" || r.type === filters.type;
    const matchFurn   = filters.furnishing === "All" || r.furnishing === filters.furnishing;
    const matchTier   = filters.tier === "All" || r.tier === filters.tier;
    const matchPrice  = r.price <= filters.maxPrice;
    return matchSearch && matchCity && matchType && matchFurn && matchTier && matchPrice;
  });

  const selectStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1.5px solid #e2e8f0",
    fontSize: "13px",
    outline: "none",
    background: "#f8fafc",
    color: "#0f172a",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <div>
      {/* Search Header */}
      <div style={{ background: "#0f172a", padding: "28px 24px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "flex", gap: "10px" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute", left: "14px", top: "50%",
                transform: "translateY(-50%)", color: "#94a3b8", fontSize: "16px",
              }}
            >
              🔍
            </span>
            <input
              placeholder="Search by city, locality or room type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                borderRadius: "10px",
                border: "1.5px solid rgba(255,255,255,0.12)",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={() => {}}
            style={{
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "28px 24px" }}>

        {/* Filters Bar */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "18px 22px",
            marginBottom: "28px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "flex-end",
            border: "1px solid #e8eaf0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
            ⚙️ Filters
          </div>
          <div style={{ width: "1px", height: "28px", background: "#e2e8f0" }} />

          {/* City */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>City</label>
            <select style={selectStyle} value={filters.city} onChange={(e) => setFilter("city", e.target.value)}>
              {CITIES_LIST.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Type */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Type</label>
            <select style={selectStyle} value={filters.type} onChange={(e) => setFilter("type", e.target.value)}>
              {TYPES_LIST.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Furnishing */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Furnishing</label>
            <select style={selectStyle} value={filters.furnishing} onChange={(e) => setFilter("furnishing", e.target.value)}>
              {FURN_LIST.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>

          {/* Tier */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Budget Tier</label>
            <select style={selectStyle} value={filters.tier} onChange={(e) => setFilter("tier", e.target.value)}>
              {TIER_LIST.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Max Rent
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", minWidth: "80px" }}>
                ₹{filters.maxPrice.toLocaleString()}
              </span>
              <input
                type="range"
                min={3000}
                max={40000}
                step={1000}
                value={filters.maxPrice}
                onChange={(e) => setFilter("maxPrice", +e.target.value)}
                style={{ width: "100px" }}
              />
            </div>
          </div>

          <button
            onClick={resetFilters}
            style={{
              marginLeft: "auto",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              color: "#64748b",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            ✕ Reset
          </button>
        </div>

        {/* Results Count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: "18px", color: "#0f172a" }}>{filtered.length}</span>
            <span style={{ color: "#64748b", fontSize: "14px", marginLeft: "6px" }}>
              room{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🏚️</div>
            <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>No rooms found</h3>
            <p style={{ marginBottom: "20px" }}>Try adjusting your filters or search term.</p>
            <button
              onClick={resetFilters}
              style={{
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
                color: "#fff",
                border: "none",
                padding: "11px 24px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "22px" }}>
            {filtered.map((r) => <RoomCard key={r.id} room={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}

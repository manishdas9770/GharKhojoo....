import { useState } from "react";
import { useApp } from "../context/AppContext";
import { TIER_COLORS, CITIES } from "../data/rooms";
import RoomCard from "../components/RoomCard";

export default function HomePage() {
  const { rooms, navigate } = useApp();
  const [search, setSearch] = useState("");

  function goSearch(cityFilter = null) {
    if (cityFilter) {
      navigate("search", null, cityFilter);
    } else {
      navigate("search");
    }
  }

  const featuredRooms = rooms.filter((r) => r.available).slice(0, 3);

  return (
    <div>
      {/* ── HERO ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          color: "#fff",
          padding: "90px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          {/* Status pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "9999px",
              padding: "6px 16px",
              marginBottom: "24px",
              fontSize: "13px",
              color: "#fbbf24",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Verified listings across Madhya Pradesh
          </div>

          <h1
            style={{
              fontSize: "44px",
              fontWeight: 800,
              margin: "0 0 16px",
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
            }}
          >
            Find Your Perfect Room <br />
            <span style={{ color: "#f59e0b" }}>Across MP</span>
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#94a3b8",
              maxWidth: "520px",
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Search verified rooms across 10 major cities of Madhya Pradesh — from
            budget PGs to luxury villas, all in one place.
          </p>

          {/* Search bar */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              maxWidth: "580px",
              margin: "0 auto 20px",
            }}
          >
            <input
              placeholder="Search by location or room type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: "10px",
                border: "1.5px solid rgba(255,255,255,0.12)",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.07)",
                color: "#fff",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={goSearch}
              style={{
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            >
              Search
            </button>
          </div>

          {/* City quick-links */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => goSearch(c.name)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  fontFamily: "inherit",
                }}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8eaf0" }}>
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {[
            ["1000+", "Listed Rooms"],
            ["4.8★", "Avg Rating"],
            ["100%", "Verified"],
            ["10", "Cities Covered"],
          ].map(([num, label], i) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                padding: "0 32px",
                borderRight: i < 3 ? "1px solid #e8eaf0" : "none",
              }}
            >
              <div style={{ fontWeight: 800, fontSize: "22px", color: "#0f172a" }}>
                {num}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY ROOMFINDER ── */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "56px 24px 36px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#fef3c7",
            color: "#92400e",
            borderRadius: "9999px",
            padding: "4px 14px",
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          Why Choose Us
        </div>
        <h2
          style={{
            fontWeight: 800,
            fontSize: "28px",
            marginBottom: "8px",
            color: "#0f172a",
          }}
        >
          Everything You Need to Find Your Home
        </h2>
        <p style={{ color: "#64748b", marginBottom: "36px", fontSize: "15px" }}>
          Trusted by thousands of renters across Madhya Pradesh
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            ["🔍", "Smart Search", "Filter by city, price, furnishing, type and more to find exactly what you need."],
            ["💬", "Direct Messaging", "Chat directly with property owners — no middlemen, no hidden fees."],
            ["🗺️", "Map Navigation", "View exact property locations and get directions with one tap."],
            ["⭐", "Verified Listings", "All properties are verified and reviewed by real tenants."],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "26px 22px",
                textAlign: "left",
                border: "1px solid #e8eaf0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#fef3c7",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "16px",
                }}
              >
                {icon}
              </div>
              <div
                style={{ fontWeight: 700, fontSize: "15px", marginBottom: "8px", color: "#0f172a" }}
              >
                {title}
              </div>
              <div style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.6 }}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED ROOMS ── */}
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px 56px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "24px", margin: 0, color: "#0f172a" }}>
              Featured Rooms
            </h2>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
              Hand-picked top listings across MP
            </p>
          </div>
          <button
            onClick={() => navigate("search")}
            style={{
              background: "transparent",
              border: "1.5px solid #e2e8f0",
              color: "#0f172a",
              padding: "8px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          >
            View All →
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "22px",
          }}
        >
          {featuredRooms.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </div>

      {/* ── PRICING TIERS ── */}
      <div style={{ background: "#0f172a", padding: "60px 24px", color: "#fff" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(245,158,11,0.15)",
              color: "#fbbf24",
              borderRadius: "9999px",
              padding: "4px 14px",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            Pricing Tiers
          </div>
          <h2 style={{ fontWeight: 800, fontSize: "28px", marginBottom: "10px" }}>
            Options for Every Budget
          </h2>
          <p style={{ color: "#64748b", marginBottom: "40px", fontSize: "15px" }}>
            Click any tier to instantly filter rooms by price range
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { tier: "Budget", range: "₹3,000 – ₹6,000", desc: "PG Rooms & Singles", icon: "🏠" },
              { tier: "Standard", range: "₹6,000 – ₹14,000", desc: "1 BHK & Studios", icon: "🏢" },
              { tier: "Premium", range: "₹14,000 – ₹25,000", desc: "2 BHK Furnished", icon: "🌟" },
              { tier: "Luxury", range: "₹25,000+", desc: "Villas & Penthouses", icon: "💎" },
            ].map(({ tier, range, desc, icon }) => (
              <div
                key={tier}
                onClick={() => navigate("search")}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid " + (TIER_COLORS[tier]?.border + "40"),
                  borderRadius: "16px",
                  padding: "24px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "30px", marginBottom: "14px" }}>{icon}</div>
                <div
                  style={{
                    fontWeight: 800,
                    color: TIER_COLORS[tier]?.text,
                    fontSize: "16px",
                    marginBottom: "4px",
                  }}
                >
                  {tier}
                </div>
                <div
                  style={{
                    color: "#f59e0b",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  {range}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          background: "#080d14",
          padding: "20px 24px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ color: "#334155", fontSize: "13px" }}>
            © 2025 RoomFinder MP · Madhya Pradesh
          </div>
          <div style={{ color: "#1e293b", fontSize: "11px" }}>
            Bhopal · Indore · Gwalior · Jabalpur · Ujjain · Sagar · Rewa · Satna · Mandsaur · Neemuch
          </div>
        </div>
      </div>
    </div>
  );
}

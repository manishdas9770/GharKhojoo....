import { useApp } from "../context/AppContext";
import { CITIES } from "../data/rooms";

export default function MapPage() {
  const { rooms, navigate } = useApp();

  return (
    <div style={{ background: "#f2f4f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "36px 24px" }}>

        {/* Page Header */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontWeight: 800, fontSize: "24px", margin: "0 0 6px", color: "#0f172a" }}>
            Room Locations
          </h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            All available rooms across Madhya Pradesh
          </p>
        </div>

        {/* Map Banner */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
              padding: "48px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#fff",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "52px" }}>🗺️</div>
            <h3 style={{ fontWeight: 800, margin: 0, fontSize: "22px" }}>
              Madhya Pradesh — Room Map
            </h3>
            <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px", textAlign: "center" }}>
              Bhopal · Indore · Gwalior · Jabalpur · Ujjain · Sagar · Rewa · Satna · Mandsaur · Neemuch
            </p>

            {/* Google Maps links per city */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "8px",
              }}
            >
              {CITIES.map((c) => (
                <a
                  key={c.name}
                  href={"https://maps.google.com/maps?q=" + c.name + ",Madhya+Pradesh"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "12.5px",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  📍 {c.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* City-wise room listings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {CITIES.map((c) => {
            const cityRooms = rooms.filter(
              (r) => r.available && r.city === c.name
            );
            if (cityRooms.length === 0) return null;

            return (
              <div
                key={c.name}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #e8eaf0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* City Header */}
                <div
                  style={{
                    padding: "18px 22px 14px",
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      background: "#fef3c7",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      flexShrink: 0,
                    }}
                  >
                    {c.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: "17px", color: "#0f172a" }}>
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{c.coords}</span>
                      <span>·</span>
                      <span style={{ color: "#d97706", fontWeight: 600 }}>{c.label}</span>
                      <span>·</span>
                      <span>
                        {cityRooms.length} room{cityRooms.length > 1 ? "s" : ""} available
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("search")}
                    style={{
                      background: "transparent",
                      border: "1.5px solid #e2e8f0",
                      color: "#0f172a",
                      padding: "6px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "inherit",
                      flexShrink: 0,
                    }}
                  >
                    View All →
                  </button>
                </div>

                {/* Room Tiles */}
                <div
                  style={{
                    padding: "14px 18px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {cityRooms.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => navigate("detail", r)}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "10px 12px",
                        background: "#f8fafc",
                        borderRadius: "12px",
                        cursor: "pointer",
                        alignItems: "center",
                        border: "1px solid #e8eaf0",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f0f4ff";
                        e.currentTarget.style.borderColor = "#c7d2fe";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.borderColor = "#e8eaf0";
                      }}
                    >
                      <img
                        src={r.image}
                        alt={r.title}
                        style={{
                          width: "50px",
                          height: "44px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "12.5px",
                            color: "#0f172a",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.title}
                        </div>
                        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                          {r.type} · {r.area}
                        </div>
                        <div
                          style={{
                            fontSize: "12.5px",
                            color: "#d97706",
                            fontWeight: 700,
                            marginTop: "2px",
                          }}
                        >
                          ₹{r.price.toLocaleString()}/mo
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

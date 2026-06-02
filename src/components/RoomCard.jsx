import { useApp } from "../context/AppContext";
import { TIER_COLORS, AMENITY_ICONS } from "../data/rooms";

export default function RoomCard({ room }) {
  const { navigate, wishlist, toggleWishlist } = useApp();
  const liked = wishlist.includes(room.id);

  return (
    <div
      onClick={() => navigate("detail", room)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)",
        border: "1px solid #e8eaf0",
        cursor: "pointer",
        transition: "transform 0.18s, box-shadow 0.18s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)";
      }}
    >
      {/* ── Image Section ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={room.image}
          alt={room.title}
          style={{ width: "100%", height: "210px", objectFit: "cover", display: "block" }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />

        {/* Tier badge */}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <span
            style={{
              background: TIER_COLORS[room.tier]?.bg + "ee",
              color: TIER_COLORS[room.tier]?.text,
              border: "1px solid " + TIER_COLORS[room.tier]?.border,
              padding: "3px 10px",
              borderRadius: "9999px",
              fontSize: "11.5px",
              fontWeight: 700,
            }}
          >
            {room.tier}
          </span>
        </div>

        {/* Wishlist button */}
        <div style={{ position: "absolute", top: "12px", right: "12px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(room.id);
            }}
            style={{
              background: liked ? "#ef4444" : "rgba(255,255,255,0.92)",
              color: liked ? "#fff" : "#64748b",
              border: liked ? "none" : "1px solid rgba(255,255,255,0.6)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {liked ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Price overlay */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "19px" }}>
            ₹{room.price.toLocaleString()}
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>/mo</span>
        </div>

        {/* Availability badge */}
        <div style={{ position: "absolute", bottom: "12px", right: "12px" }}>
          <span
            style={{
              background: room.available ? "#dcfce7" : "#fee2e2",
              color: room.available ? "#15803d" : "#dc2626",
              padding: "3px 10px",
              borderRadius: "9999px",
              fontSize: "11.5px",
              fontWeight: 700,
            }}
          >
            {room.available ? "✓ Available" : "Occupied"}
          </span>
        </div>
      </div>

      {/* ── Content Section ── */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: "15.5px",
            marginBottom: "5px",
            color: "#0f172a",
            lineHeight: 1.3,
          }}
        >
          {room.title}
        </div>

        <div
          style={{
            fontSize: "12.5px",
            color: "#64748b",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ color: "#f59e0b" }}>📍</span> {room.location}
        </div>

        {/* Room specs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "13px", flexWrap: "wrap" }}>
          {[room.type, room.area, room.furnishing.replace(" Furnished", "") + " Furn."].map(
            (spec) => (
              <span
                key={spec}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "3px 9px",
                  borderRadius: "6px",
                  color: "#475569",
                  fontWeight: 500,
                  fontSize: "12px",
                }}
              >
                {spec}
              </span>
            )
          )}
        </div>

        {/* Amenity icons + Rating */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            {room.amenities.slice(0, 4).map((a) => (
              <span key={a} style={{ fontSize: "15px" }} title={a}>
                {AMENITY_ICONS[a] || "✓"}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                +{room.amenities.length - 4}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "#fefce8",
              border: "1px solid #fde68a",
              borderRadius: "8px",
              padding: "3px 9px",
            }}
          >
            <span style={{ fontSize: "12px" }}>⭐</span>
            <span style={{ fontWeight: 700, fontSize: "13px", color: "#92400e" }}>
              {room.rating}
            </span>
            <span style={{ fontSize: "11px", color: "#a16207" }}>
              ({room.reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

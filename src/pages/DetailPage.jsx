import { useState } from "react";
import { useApp } from "../context/AppContext";
import { TIER_COLORS, AMENITY_ICONS } from "../data/rooms";

export default function DetailPage() {
  const { selectedRoom: r, navigate, user, wishlist, toggleWishlist, sendMessage, getMessages, bookRoom, requests } = useApp();
  const [imgIdx, setImgIdx]   = useState(0);
  const [activeTab, setActiveTab] = useState("chat");
  const [msgInput, setMsgInput]   = useState("");

  if (!r) { navigate("search"); return null; }

  const roomMsgs = getMessages(r.id);
  const liked = wishlist.includes(r.id);

  function handleSend() {
    sendMessage(r.id, msgInput);
    setMsgInput("");
  }

  const panelTabStyle = (active) => ({
    flex: 1,
    padding: "9px 0",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13.5px",
    background: active ? "#0f172a" : "transparent",
    color: active ? "#fff" : "#94a3b8",
    transition: "all 0.2s",
    fontFamily: "inherit",
  });

  return (
    <div style={{ background: "#f2f4f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "28px 24px" }}>

        {/* Back */}
        <button
          onClick={() => navigate("search")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#64748b", fontSize: "14px", marginBottom: "20px",
            display: "flex", alignItems: "center", gap: "6px", fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          ← Back to Listings
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 370px", gap: "28px" }}>

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Main image */}
            <div
              style={{
                borderRadius: "18px", overflow: "hidden", marginBottom: "10px",
                position: "relative", boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={r.images[imgIdx]}
                alt={r.title}
                style={{ width: "100%", height: "350px", objectFit: "cover", display: "block" }}
              />
              {/* Photo counter */}
              <div
                style={{
                  position: "absolute", bottom: "14px", left: "14px",
                  background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
                  color: "#fff", padding: "4px 12px", borderRadius: "9999px",
                  fontSize: "12px", fontWeight: 600,
                }}
              >
                📷 {imgIdx + 1} / {r.images.length}
              </div>
              {/* Nav arrows */}
              {r.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + r.images.length) % r.images.length)}
                    style={{
                      position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                      background: "rgba(255,255,255,0.9)", color: "#0f172a", border: "none",
                      borderRadius: "50%", width: "38px", height: "38px", cursor: "pointer",
                      fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % r.images.length)}
                    style={{
                      position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                      background: "rgba(255,255,255,0.9)", color: "#0f172a", border: "none",
                      borderRadius: "50%", width: "38px", height: "38px", cursor: "pointer",
                      fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {r.images.length > 1 && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "22px" }}>
                {r.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setImgIdx(i)}
                    style={{
                      width: "78px", height: "58px", objectFit: "cover", borderRadius: "10px",
                      cursor: "pointer",
                      border: imgIdx === i ? "2.5px solid #f59e0b" : "2.5px solid transparent",
                      opacity: imgIdx === i ? 1 : 0.55,
                      transition: "all 0.15s",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Details Card */}
            <div
              style={{
                background: "#fff", borderRadius: "16px",
                border: "1px solid #e8eaf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ padding: "24px 26px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: "16px",
                  }}
                >
                  <div style={{ flex: 1, paddingRight: "12px" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: TIER_COLORS[r.tier]?.bg,
                          color: TIER_COLORS[r.tier]?.text,
                          border: "1px solid " + TIER_COLORS[r.tier]?.border,
                          padding: "3px 10px", borderRadius: "9999px",
                          fontSize: "11.5px", fontWeight: 700,
                        }}
                      >
                        {r.tier}
                      </span>
                      <span
                        style={{
                          background: r.available ? "#dcfce7" : "#fee2e2",
                          color: r.available ? "#15803d" : "#dc2626",
                          padding: "3px 10px", borderRadius: "9999px",
                          fontSize: "11.5px", fontWeight: 700,
                        }}
                      >
                        {r.available ? "✓ Available Now" : "Currently Occupied"}
                      </span>
                    </div>
                    <h1 style={{ fontWeight: 800, fontSize: "22px", margin: "0 0 8px", color: "#0f172a", lineHeight: 1.3 }}>
                      {r.title}
                    </h1>
                    <div style={{ color: "#64748b", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ color: "#f59e0b" }}>📍</span>
                      {r.location} · {r.type} · {r.area} · {r.furnishing}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleWishlist(r.id)}
                    style={{
                      background: liked ? "#ef4444" : "transparent",
                      color: liked ? "#fff" : "#64748b",
                      border: liked ? "none" : "1.5px solid #e2e8f0",
                      borderRadius: "12px", width: "44px", height: "44px",
                      cursor: "pointer", fontSize: "20px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {liked ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* Price stats */}
                <div
                  style={{
                    display: "flex", marginBottom: "20px",
                    background: "#f8fafc", borderRadius: "14px",
                    overflow: "hidden", border: "1px solid #e2e8f0",
                  }}
                >
                  {[
                    { label: "Monthly Rent", value: "₹" + r.price.toLocaleString(), accent: true },
                    { label: "Security Deposit", value: "₹" + r.deposit.toLocaleString(), accent: false },
                    { label: "Rating", value: "⭐ " + r.rating + " (" + r.reviews + ")", accent: false },
                  ].map(({ label, value, accent }, i) => (
                    <div
                      key={label}
                      style={{
                        flex: 1, padding: "14px 16px",
                        borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                        {label}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: accent ? "20px" : "15px", color: accent ? "#d97706" : "#0f172a" }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "22px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => bookRoom(r.id)}
                    disabled={!r.available || requests.some((req) => req.roomId === r.id && req.userEmail === user?.email)}
                    style={{
                      flex: "1 1 220px",
                      background: r.available ? "#f59e0b" : "#e2e8f0",
                      color: r.available ? "#0f172a" : "#94a3b8",
                      border: "none",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      cursor: r.available ? "pointer" : "not-allowed",
                      fontWeight: 700,
                      fontSize: "14px",
                      fontFamily: "inherit",
                    }}
                  >
                    {requests.some((req) => req.roomId === r.id && req.userEmail === user?.email)
                      ? "Request Sent"
                      : r.available
                      ? "Request Booking"
                      : "Not Available"}
                  </button>
                  <button
                    onClick={() => navigate("messages")}
                    style={{
                      flex: "1 1 220px",
                      background: "#e2e8f0",
                      color: "#0f172a",
                      border: "none",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "14px",
                      fontFamily: "inherit",
                    }}
                  >
                    Contact Owner
                  </button>
                </div>

                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: "14.5px", marginBottom: "24px" }}>
                  {r.description}
                </p>

                {/* Amenities */}
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                  <h3 style={{ fontWeight: 700, marginBottom: "14px", color: "#0f172a", fontSize: "15px" }}>
                    Amenities & Features
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {r.amenities.map((a) => (
                      <div
                        key={a}
                        style={{
                          background: "#f0fdf4", border: "1px solid #bbf7d0",
                          borderRadius: "10px", padding: "7px 14px",
                          fontSize: "13px", display: "flex", alignItems: "center",
                          gap: "7px", color: "#15803d", fontWeight: 500,
                        }}
                      >
                        <span>{AMENITY_ICONS[a] || "✓"}</span>{a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Contact Panel ── */}
          <div>
            <div
              style={{
                background: "#fff", borderRadius: "16px",
                border: "1px solid #e8eaf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                position: "sticky", top: "80px",
              }}
            >
              {/* Tab switcher */}
              <div style={{ padding: "18px 18px 0" }}>
                <div
                  style={{
                    display: "flex", background: "#f1f5f9",
                    borderRadius: "12px", padding: "4px", marginBottom: "16px",
                  }}
                >
                  {["chat", "contact"].map((t) => (
                    <button key={t} onClick={() => setActiveTab(t)} style={panelTabStyle(activeTab === t)}>
                      {t === "chat" ? "💬 Chat" : "📞 Contact"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Tab */}
              {activeTab === "chat" && (
                <div style={{ padding: "0 16px 18px" }}>
                  {/* Owner info */}
                  <div
                    style={{
                      background: "#f8fafc", border: "1px solid #e2e8f0",
                      borderRadius: "12px", padding: "12px 14px",
                      marginBottom: "14px", display: "flex", alignItems: "center", gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px", height: "44px",
                        background: "linear-gradient(135deg,#f59e0b,#d97706)",
                        borderRadius: "12px", display: "flex", alignItems: "center",
                        justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "18px",
                      }}
                    >
                      {r.owner[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#0f172a" }}>{r.owner}</div>
                      <div style={{ fontSize: "12px", color: "#22c55e", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                        Usually responds in minutes
                      </div>
                    </div>
                  </div>

                  {!user ? (
                    <div style={{ textAlign: "center", padding: "28px 16px" }}>
                      <div style={{ fontSize: "42px", marginBottom: "12px" }}>🔐</div>
                      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "18px", lineHeight: 1.6 }}>
                        Sign in to message the owner and schedule a visit.
                      </p>
                      <button
                        onClick={() => navigate("auth")}
                        style={{
                          background: "linear-gradient(135deg,#f59e0b,#d97706)",
                          color: "#fff", border: "none", width: "100%",
                          padding: "11px 0", borderRadius: "10px",
                          cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
                        }}
                      >
                        Sign In to Chat
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          height: "210px", overflowY: "auto",
                          display: "flex", flexDirection: "column", gap: "8px",
                          marginBottom: "12px", padding: "4px 0",
                        }}
                      >
                        {roomMsgs.length === 0 ? (
                          <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "70px" }}>
                            <div style={{ fontSize: "32px", marginBottom: "8px" }}>💬</div>
                            Send your first inquiry below
                          </div>
                        ) : (
                          roomMsgs.map((m, i) => {
                            const isMe = m.authorEmail === user.email;
                            return (
                              <div
                                key={i}
                                style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}
                              >
                                <div
                                  style={{
                                    background: isMe ? "#0f172a" : "#f1f5f9",
                                    color: isMe ? "#fff" : "#1e293b",
                                    padding: "9px 14px",
                                    borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                    fontSize: "13.5px", maxWidth: "78%", lineHeight: 1.5,
                                  }}
                                >
                                  {m.text}
                                </div>
                                <div style={{ fontSize: "10px", color: "#cbd5e1", margin: "3px 4px" }}>{m.time}</div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          placeholder="Type your message..."
                          value={msgInput}
                          onChange={(e) => setMsgInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          style={{
                            flex: 1, padding: "10px 14px", borderRadius: "10px",
                            border: "1.5px solid #e2e8f0", fontSize: "14px",
                            outline: "none", background: "#f8fafc", fontFamily: "inherit",
                          }}
                        />
                        <button
                          onClick={handleSend}
                          style={{
                            background: "linear-gradient(135deg,#f59e0b,#d97706)",
                            color: "#fff", border: "none", padding: "10px 16px",
                            borderRadius: "10px", cursor: "pointer", fontFamily: "inherit",
                          }}
                        >
                          ➤
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <div style={{ padding: "0 16px 20px" }}>
                  {[
                    ["📞", "Phone", r.ownerPhone],
                    ["👤", "Owner", r.owner],
                    ["📍", "Location", r.location],
                  ].map(([icon, label, val], i) => (
                    <div
                      key={label}
                      style={{
                        display: "flex", gap: "14px", padding: "14px 0",
                        borderBottom: i < 2 ? "1px solid #f1f5f9" : "none",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "38px", height: "38px", background: "#f8fafc",
                          border: "1px solid #e2e8f0", borderRadius: "10px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "17px", flexShrink: 0,
                        }}
                      >
                        {icon}
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                          {label}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "#0f172a", marginTop: "2px" }}>
                          {val}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                    <button
                      onClick={() => navigate("map")}
                      style={{
                        background: "linear-gradient(135deg,#f59e0b,#d97706)",
                        color: "#fff", border: "none", width: "100%",
                        padding: "12px 0", borderRadius: "12px",
                        cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
                      }}
                    >
                      🗺️ View on Map
                    </button>
                    <a
                      href={"tel:" + r.ownerPhone}
                      style={{
                        display: "block", textAlign: "center",
                        padding: "12px 0", borderRadius: "12px",
                        border: "1.5px solid #e2e8f0", color: "#0f172a",
                        fontWeight: 600, fontSize: "14px", textDecoration: "none",
                      }}
                    >
                      📞 Call Owner
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

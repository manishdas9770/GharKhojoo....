import { useApp } from "../context/AppContext";

export default function MessagesPage() {
  const { user, navigate, getAllConversations } = useApp();

  if (!user) { navigate("auth"); return null; }

  const convos = getAllConversations();

  return (
    <div style={{ background: "#f2f4f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "36px 24px" }}>

        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontWeight: 800, fontSize: "24px", margin: "0 0 6px", color: "#0f172a" }}>
            My Messages
          </h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            {convos.length} conversation{convos.length !== 1 ? "s" : ""}
          </p>
        </div>

        {convos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
            <div
              style={{
                width: "80px", height: "80px", background: "#f1f5f9",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "36px", margin: "0 auto 20px",
              }}
            >
              📭
            </div>
            <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
              No messages yet
            </h3>
            <p style={{ marginBottom: "24px" }}>
              Browse rooms and send an inquiry to get started!
            </p>
            <button
              onClick={() => navigate("search")}
              style={{
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
                color: "#fff", border: "none",
                padding: "11px 24px", borderRadius: "10px",
                cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
              }}
            >
              Browse Rooms
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {convos.map(({ key, room, msgs }) => {
              const last = msgs[msgs.length - 1];
              return (
                <div
                  key={key}
                  onClick={() => navigate("detail", room)}
                  style={{
                    background: "#fff", borderRadius: "16px",
                    padding: "18px 22px", display: "flex", gap: "16px",
                    cursor: "pointer", alignItems: "center",
                    border: "1px solid #e8eaf0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)")}
                >
                  <img
                    src={room.image}
                    alt={room.title}
                    style={{ width: "66px", height: "56px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#0f172a", marginBottom: "3px" }}>
                      {room.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "5px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ color: "#f59e0b" }}>📍</span>
                      {room.location}
                    </div>
                    <div
                      style={{
                        fontSize: "13px", color: "#64748b",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>
                        {last?.authorEmail === user.email ? "You" : last?.from === "admin" ? "Admin" : room.owner}:
                      </span>{" "}
                      {last?.text?.slice(0, 55)}...
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "6px" }}>{last?.time}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#d97706" }}>
                      ₹{room.price.toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

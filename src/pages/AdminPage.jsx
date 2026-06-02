import { useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function AdminPage() {
  const {
    user, isAdmin, navigate,
    getAdminRequests, approveRequest, rejectRequest,
    getAdminConversations, markRequestsSeen, getNewRequestsCount,
  } = useApp();

  // Redirect if not admin
  if (!user || !isAdmin) {
    navigate("auth");
    return null;
  }

  const requests   = getAdminRequests();
  const newCount   = getNewRequestsCount();

  // Mark all as seen when admin opens the page
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    markRequestsSeen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusStyle = (status) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize: "12px",
    background:
      status === "Pending"  ? "#fef3c7" :
      status === "Approved" ? "#dcfce7" : "#fee2e2",
    color:
      status === "Pending"  ? "#92400e" :
      status === "Approved" ? "#166534" : "#991b1b",
  });

  return (
    <div style={{ background: "#f2f4f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "36px 20px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: "26px", color: "#0f172a", margin: 0 }}>
              🛡️ Admin Panel
            </h1>
            <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>
              Welcome back, <strong>{user.name}</strong>. Manage all booking requests below.
            </p>
          </div>

          {/* Admin Info Card */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "14px 18px", border: "1px solid #e8eaf0", minWidth: "200px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Logged in as</div>
            <div style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a" }}>{user.name}</div>
            <div style={{ color: "#64748b", marginTop: "4px", fontSize: "12px" }}>{user.email}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "Total Requests", value: requests.length, color: "#6366f1", bg: "#eef2ff" },
            { label: "Pending",        value: requests.filter(r => r.status === "Pending").length,  color: "#d97706", bg: "#fef3c7" },
            { label: "Approved",       value: requests.filter(r => r.status === "Approved").length, color: "#16a34a", bg: "#dcfce7" },
            { label: "Rejected",       value: requests.filter(r => r.status === "Rejected").length, color: "#dc2626", bg: "#fee2e2" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#fff", borderRadius: "14px", padding: "16px 18px", border: "1px solid #e8eaf0", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, marginTop: "4px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* New Requests Banner */}
        {newCount > 0 && (
          <div style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "#fff",
            borderRadius: "14px",
            padding: "14px 20px",
            marginBottom: "22px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 700,
            fontSize: "14px",
          }}>
            🔔 {newCount} naya booking request aaya hai!
          </div>
        )}

        {/* Admin Inbox */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>💬 User Inquiries</h3>
          <p style={{ margin: "0 0 12px", color: "#64748b", fontSize: "13px" }}>Users ke sawal aur messages.</p>
          <div style={{ display: "grid", gap: "10px" }}>
            {getAdminConversations().length === 0 ? (
              <div style={{ background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #e8eaf0", color: "#94a3b8", fontSize: "14px" }}>
                📭 Abhi tak koi inquiry nahi hai.
              </div>
            ) : (
              getAdminConversations().map((c) => (
                <div key={c.key} style={{
                  background: "#fff", padding: "14px 16px", borderRadius: "12px",
                  border: "1px solid #e8eaf0", display: "flex",
                  justifyContent: "space-between", alignItems: "center", gap: "10px",
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "14px", marginBottom: "3px" }}>{c.room?.title}</div>
                    <div style={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.userEmail || "Unknown"} • {c.last?.text?.slice(0, 55)}{c.last?.text?.length > 55 ? "…" : ""}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("detail", c.room)}
                    style={{ background: "#f59e0b", color: "#0f172a", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "13px", whiteSpace: "nowrap" }}
                  >
                    Open →
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Booking Requests */}
        <div>
          <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>📋 Booking Requests</h3>
          <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: "13px" }}>Jab koi user room book kare, yahan dikhega.</p>

          {requests.length === 0 ? (
            <div style={{
              background: "#fff", borderRadius: "18px", padding: "60px 40px",
              textAlign: "center", border: "1px solid #e8eaf0",
            }}>
              <div style={{ fontSize: "50px", marginBottom: "14px" }}>📭</div>
              <h2 style={{ fontWeight: 800, fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>
                Abhi tak koi booking request nahi
              </h2>
              <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "14px" }}>
                Jab koi visitor room book karega, woh yahan dikhega.
              </p>
              <button
                onClick={() => navigate("home")}
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                  color: "#fff", border: "none", padding: "12px 24px",
                  borderRadius: "12px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit",
                }}
              >
                Browse Rooms
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {requests.map((req) => (
                <div
                  key={req.id}
                  style={{
                    background: "#fff", borderRadius: "16px", padding: "22px",
                    border: req.isNew ? "2px solid #f59e0b" : "1px solid #e8eaf0",
                    boxShadow: req.isNew ? "0 2px 12px rgba(245,158,11,0.15)" : "0 1px 4px rgba(15,23,42,0.05)",
                    position: "relative",
                  }}
                >
                  {req.isNew && (
                    <div style={{
                      position: "absolute", top: "-10px", right: "16px",
                      background: "#f59e0b", color: "#fff", fontSize: "11px",
                      fontWeight: 800, padding: "3px 10px", borderRadius: "9999px",
                    }}>
                      NEW
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "14px", flexWrap: "wrap", marginBottom: "14px" }}>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "5px" }}>
                        🏠 {req.roomTitle}
                      </div>
                      <div style={{ color: "#64748b", fontSize: "13px" }}>
                        {req.userName} • {req.userEmail} • {req.userPhone}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "6px" }}>🕐 {req.createdAt}</div>
                      <div style={statusStyle(req.status)}>{req.status}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: "#334155" }}>
                      <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>ROOM ID</span>
                      <strong>#{req.roomId}</strong>
                    </div>
                    <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: "#334155" }}>
                      <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "2px" }}>OWNER</span>
                      <strong>{req.ownerName}</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => approveRequest(req.id)}
                      disabled={req.status !== "Pending"}
                      style={{
                        flex: "1 1 140px",
                        background: req.status === "Pending" ? "#22c55e" : "#d1fae5",
                        color: req.status === "Pending" ? "#fff" : "#6b7280",
                        border: "none", padding: "11px 18px", borderRadius: "10px",
                        cursor: req.status === "Pending" ? "pointer" : "not-allowed",
                        fontWeight: 700, fontFamily: "inherit", fontSize: "13px",
                      }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => rejectRequest(req.id)}
                      disabled={req.status !== "Pending"}
                      style={{
                        flex: "1 1 140px",
                        background: req.status === "Pending" ? "#ef4444" : "#fee2e2",
                        color: req.status === "Pending" ? "#fff" : "#9ca3af",
                        border: "none", padding: "11px 18px", borderRadius: "10px",
                        cursor: req.status === "Pending" ? "pointer" : "not-allowed",
                        fontWeight: 700, fontFamily: "inherit", fontSize: "13px",
                      }}
                    >
                      ❌ Reject
                    </button>
                    <button
                      onClick={() => {
                        const room = { id: req.roomId, title: req.roomTitle };
                        navigate("detail", room);
                      }}
                      style={{
                        flex: "1 1 140px",
                        background: "#f1f5f9", color: "#334155",
                        border: "none", padding: "11px 18px", borderRadius: "10px",
                        cursor: "pointer", fontWeight: 700, fontFamily: "inherit", fontSize: "13px",
                      }}
                    >
                      👁️ View Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

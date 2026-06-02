import { useApp } from "../context/AppContext";

export default function OwnerPage() {
  const {
    user,
    isOwner,
    navigate,
    getOwnerRequests,
    getOwnerRooms,
    approveRequest,
    rejectRequest,
  } = useApp();

  if (!user || !isOwner) {
    navigate("auth");
    return null;
  }

  const requests = getOwnerRequests();
  const rooms = getOwnerRooms();
  const pendingCount = requests.filter((req) => req.status === "Pending").length;

  return (
    <div style={{ background: "#f2f4f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontWeight: 800, fontSize: "28px", color: "#0f172a", margin: 0 }}>
            Owner Dashboard
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px", fontSize: "15px" }}>
            Welcome, {user.name}. Manage your rooms and booking requests here.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "28px" }}>
          <div style={{ background: "#fff", borderRadius: "18px", padding: "22px", border: "1px solid #e8eaf0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Owner Info
            </div>
            <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "18px" }}>{user.name}</div>
            <div style={{ color: "#64748b", marginTop: "8px", fontSize: "14px" }}>{user.email}</div>
            <div style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>{user.phone}</div>
          </div>
          <div style={{ background: "#fff", borderRadius: "18px", padding: "22px", border: "1px solid #e8eaf0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Rooms Owned
            </div>
            <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "28px" }}>{rooms.length}</div>
            <div style={{ color: "#64748b", marginTop: "8px", fontSize: "14px" }}>
              {rooms.length === 1 ? "Room listed" : "Rooms listed"}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: "18px", padding: "22px", border: "1px solid #e8eaf0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Pending Requests
            </div>
            <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "28px" }}>{pendingCount}</div>
            <div style={{ color: "#64748b", marginTop: "8px", fontSize: "14px" }}>
              waiting for your response
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "22px" }}>
          <section>
            <div style={{ marginBottom: "18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>Booking Requests</h2>
                <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "14px" }}>
                  All requests for your rooms are shown below.
                </p>
              </div>
            </div>

            {requests.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "18px", padding: "40px 30px", textAlign: "center", border: "1px solid #e8eaf0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "18px", marginBottom: "10px" }}>No booking requests yet</div>
                <div style={{ color: "#64748b", fontSize: "14px" }}>
                  Visitors will send booking requests from the room detail page.
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {requests.map((req) => (
                  <div key={req.id} style={{ background: "#fff", borderRadius: "18px", padding: "22px", border: "1px solid #e8eaf0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "16px", color: "#0f172a" }}>{req.roomTitle}</div>
                        <div style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>
                          Requested by {req.userName} • {req.userEmail}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>{req.createdAt}</div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "9999px", background: req.status === "Pending" ? "#fef3c7" : req.status === "Approved" ? "#dcfce7" : "#fee2e2", color: req.status === "Pending" ? "#92400e" : req.status === "Approved" ? "#166534" : "#991b1b", fontWeight: 700, fontSize: "12px" }}>
                          {req.status}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "16px", display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
                      <div style={{ color: "#334155", fontSize: "14px" }}><strong>Phone:</strong> {req.userPhone}</div>
                      <div style={{ color: "#334155", fontSize: "14px" }}><strong>Room ID:</strong> {req.roomId}</div>
                    </div>

                    <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => approveRequest(req.id)}
                        disabled={req.status !== "Pending"}
                        style={{
                          flex: "1 1 150px",
                          background: req.status === "Pending" ? "#22c55e" : "#d1fae5",
                          color: req.status === "Pending" ? "#0f172a" : "#4b5563",
                          border: "none",
                          padding: "12px 18px",
                          borderRadius: "12px",
                          cursor: req.status === "Pending" ? "pointer" : "not-allowed",
                          fontWeight: 700,
                          fontFamily: "inherit",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        disabled={req.status !== "Pending"}
                        style={{
                          flex: "1 1 150px",
                          background: req.status === "Pending" ? "#ef4444" : "#fee2e2",
                          color: req.status === "Pending" ? "#fff" : "#9ca3af",
                          border: "none",
                          padding: "12px 18px",
                          borderRadius: "12px",
                          cursor: req.status === "Pending" ? "pointer" : "not-allowed",
                          fontWeight: 700,
                          fontFamily: "inherit",
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside>
            <div style={{ background: "#fff", borderRadius: "18px", padding: "22px", border: "1px solid #e8eaf0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0, marginBottom: "12px" }}>
                Your Rooms
              </h3>
              {rooms.length === 0 ? (
                <div style={{ color: "#64748b", fontSize: "14px" }}>
                  You don't have any rooms assigned yet.
                </div>
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {rooms.map((room) => (
                    <div key={room.id} style={{ background: "#f8fafc", borderRadius: "14px", padding: "14px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>{room.title}</div>
                      <div style={{ color: "#475569", fontSize: "13px" }}>₹{room.price.toLocaleString()} / mo</div>
                      <div style={{ color: "#64748b", fontSize: "12px", marginTop: "6px" }}>{room.location}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user, logout, navigate, page, isAdmin, isOwner, getNewRequestsCount } = useApp();

  const navBtn = (active) => ({
    background: active ? "#f59e0b" : "transparent",
    color: active ? "#0f172a" : "#94a3b8",
    border: "none",
    padding: "6px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: active ? 700 : 500,
    fontSize: "13.5px",
    transition: "all 0.15s",
    fontFamily: "inherit",
  });

  const newCount = isAdmin ? getNewRequestsCount() : 0;

  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("home")}
        style={{
          color: "#f59e0b",
          fontWeight: 800,
          fontSize: "20px",
          cursor: "pointer",
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            background: "#f59e0b",
            color: "#0f172a",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
          }}
        >
          🏠
        </span>
        GharKhojo
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <button style={navBtn(page === "home")} onClick={() => navigate("home")}>
          Home
        </button>
        <button style={navBtn(page === "search")} onClick={() => navigate("search")}>
          Browse
        </button>
        {user && (
          <button style={navBtn(page === "messages")} onClick={() => navigate("messages")}>
            Messages
          </button>
        )}
        {user && (
          <button style={navBtn(page === "map")} onClick={() => navigate("map")}>
            Map
          </button>
        )}
        {user && isAdmin && (
          <button
            style={{ ...navBtn(page === "admin"), position: "relative" }}
            onClick={() => navigate("admin")}
          >
            🛡️ Admin
            {/* Notification badge */}
            {newCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "#ef4444",
                color: "#fff",
                borderRadius: "9999px",
                fontSize: "10px",
                fontWeight: 800,
                minWidth: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
                lineHeight: 1,
              }}>
                {newCount}
              </span>
            )}
          </button>
        )}
        {user && isOwner && (
          <button style={navBtn(page === "owner")} onClick={() => navigate("owner")}>Owner</button>
        )}

        {user ? (
          <button
            onClick={logout}
            style={{
              ...navBtn(false),
              color: "#f59e0b",
              marginLeft: "8px",
            }}
          >
            Logout ({user.name.split(" ")[0]})
          </button>
        ) : (
          <button
            onClick={() => navigate("auth")}
            style={{
              background: "#f59e0b",
              color: "#0f172a",
              border: "none",
              padding: "7px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
              marginLeft: "8px",
              fontFamily: "inherit",
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

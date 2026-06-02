import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AuthPage() {
  const { login, register, navigate, accounts } = useApp();
  const [mode, setMode]   = useState("login");
  const [error, setError] = useState("");
  const [form, setForm]   = useState({ name: "", email: "", password: "", phone: "" });

  function update(field, val) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function handleSubmit() {
    setError("");
    if (mode === "register") {
      if (!form.name || !form.email || !form.password || !form.phone) {
        setError("Please fill in all fields."); return;
      }
      const err = register(form.name, form.email, form.password, form.phone);
      if (err) setError(err);
    } else {
      if (!form.email || !form.password) {
        setError("Please enter email and password."); return;
      }
      const err = login(form.email, form.password);
      if (err) setError(err);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    background: "#f8fafc",
    color: "#111827",
    fontFamily: "inherit",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    display: "block",
    marginBottom: "5px",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 36px",
          width: "100%",
          maxWidth: "430px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              margin: "0 auto 14px",
            }}
          >
            🏠
          </div>
          <h2 style={{ fontWeight: 800, margin: "0 0 6px", fontSize: "22px", color: "#0f172a" }}>
            RoomFinder MP
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            {mode === "login" ? "Welcome back! Sign in to continue." : "Create your free account today."}
          </p>
        </div>

        {/* Mode toggle */}
        <div
          style={{
            display: "flex",
            background: "#f1f5f9",
            borderRadius: "12px",
            padding: "4px",
            marginBottom: "26px",
          }}
        >
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              style={{
                flex: 1,
                padding: "9px 0",
                border: "none",
                borderRadius: "9px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13.5px",
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? "#0f172a" : "#94a3b8",
                boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {mode === "register" && (
            <>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  placeholder="e.g. Rahul Sharma"
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  placeholder="+91 XXXXX XXXXX"
                  style={inputStyle}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              style={inputStyle}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={inputStyle}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {error && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "13px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                padding: "10px 14px",
                borderRadius: "8px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              color: "#fff",
              border: "none",
              width: "100%",
              padding: "13px 0",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              marginTop: "6px",
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(245,158,11,0.35)",
            }}
          >
            {mode === "login" ? "Sign In →" : "Create Account →"}
          </button>

          <div style={{ textAlign: "center", fontSize: "13px", color: "#64748b" }}>
            {mode === "login" ? "New to RoomFinder? " : "Already have an account? "}
            <span
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              style={{ color: "#f59e0b", cursor: "pointer", fontWeight: 700 }}
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </span>
          </div>
        </div>

        {mode === "login" && accounts.length === 0 && (
          <div
            style={{
              marginTop: "18px",
              padding: "10px 14px",
              background: "#fefce8",
              border: "1px solid #fde68a",
              borderRadius: "10px",
              fontSize: "12.5px",
              color: "#92400e",
              display: "flex",
              gap: "8px",
            }}
          >
            💡 Please register first, then sign in.
          </div>
        )}
      </div>
    </div>
  );
}

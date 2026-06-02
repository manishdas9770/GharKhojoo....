import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        background: "#0f172a",
        color: "#fff",
        padding: "13px 22px",
        borderRadius: "12px",
        zIndex: 9999,
        fontSize: "14px",
        fontWeight: 500,
        boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        border: "1px solid rgba(255,255,255,0.08)",
        animation: "fadeUp 0.25s ease",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#22c55e",
          flexShrink: 0,
        }}
      />
      {toast}
    </div>
  );
}

import { useApp } from "../context/AppContext";

export default function Modal() {
  const { modal } = useApp();
  if (!modal || !modal.visible) return null;

  const { title, message, onConfirm, onCancel } = modal;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(2,6,23,0.6)", zIndex: 20000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "min(560px, 92%)", background: "#fff", borderRadius: "12px", padding: "22px", boxShadow: "0 12px 40px rgba(2,6,23,0.4)", color: "#0f172a" }}>
        <div style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>{title}</div>
        <div style={{ color: "#475569", marginBottom: "18px" }}>{message}</div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            onClick={() => onCancel && onCancel()}
            style={{ background: "transparent", border: "1px solid #e6eef8", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm && onConfirm()}
            style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700 }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

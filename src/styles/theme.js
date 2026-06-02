export const theme = {
  colors: {
    primary: "#f59e0b",
    primaryDark: "#d97706",
    dark: "#0f172a",
    darkMid: "#1e293b",
    bg: "#f2f4f8",
    white: "#ffffff",
    border: "#e2e8f0",
    muted: "#64748b",
    mutedLight: "#94a3b8",
    success: "#22c55e",
    danger: "#ef4444",
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)",
    cardHover: "0 8px 32px rgba(0,0,0,0.12)",
    nav: "0 1px 0 rgba(255,255,255,0.06)",
    btn: "0 2px 8px rgba(245,158,11,0.35)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },
};

// Reusable inline style objects
export const S = {
  app: {
    fontFamily: "'Inter','Segoe UI',sans-serif",
    minHeight: "100vh",
    background: theme.colors.bg,
    color: "#111827",
  },
  card: {
    background: theme.colors.white,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    boxShadow: theme.shadows.card,
    border: "1px solid " + theme.colors.border,
  },
  input: {
    width: "100%",
    padding: "11px 16px",
    borderRadius: theme.radius.sm,
    border: "1.5px solid " + theme.colors.border,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    background: theme.colors.white,
    color: "#111827",
    fontFamily: "inherit",
  },
  section: {
    maxWidth: "1140px",
    margin: "0 auto",
    padding: "36px 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
    gap: "22px",
  },
  btn: (variant = "primary") => ({
    background:
      variant === "primary"
        ? "linear-gradient(135deg,#f59e0b,#d97706)"
        : variant === "outline"
        ? "transparent"
        : theme.colors.dark,
    color: variant === "outline" ? theme.colors.dark : "#fff",
    border:
      variant === "outline"
        ? "1.5px solid " + theme.colors.border
        : "none",
    padding: "11px 24px",
    borderRadius: theme.radius.sm,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    boxShadow: variant === "primary" ? theme.shadows.btn : "none",
    fontFamily: "inherit",
  }),
  tag: (tier, TIER_COLORS) => ({
    background: TIER_COLORS[tier]?.bg,
    color: TIER_COLORS[tier]?.text,
    border: "1px solid " + TIER_COLORS[tier]?.border,
    padding: "3px 10px",
    borderRadius: theme.radius.full,
    fontSize: "11.5px",
    fontWeight: 700,
    letterSpacing: "0.3px",
  }),
  badge: (available) => ({
    background: available ? "#dcfce7" : "#fee2e2",
    color: available ? "#15803d" : "#dc2626",
    padding: "3px 10px",
    borderRadius: theme.radius.full,
    fontSize: "11.5px",
    fontWeight: 700,
  }),
};

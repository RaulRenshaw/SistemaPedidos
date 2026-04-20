function Btn({ children, onClick, variant = "primary", style }) {
  const base = {
    width: "100%", padding: "14px 20px", borderRadius: 12,
    fontSize: 16, fontWeight: 600, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 8, fontFamily: "inherit", border: "none",
  };
  const variants = {
    primary:   { background: G.green,  color: "#fff" },
    secondary: { background: G.white,  color: G.text, border: `1.5px solid ${G.border}` },
    wpp:       { background: G.wpp,    color: "#fff" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}
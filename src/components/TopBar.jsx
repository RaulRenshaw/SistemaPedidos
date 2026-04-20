
function TopBar({ title, onBack, right }) {
  return (
    <div style={{
      background: G.white,
      padding: "14px 20px",
      borderBottom: `1px solid ${G.border}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          color: G.muted, fontSize: 22, padding: "0 6px 0 0", lineHeight: 1,
        }}>‹</button>
      )}
      {!onBack && (
        <div style={{
          width: 30, height: 30, borderRadius: 8, background: G.green,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="white"/>
          </svg>
        </div>
      )}
      <span style={{ flex: 1, fontSize: 17, fontWeight: 600, color: G.text }}>{title}</span>
      {right}
    </div>
  );
}
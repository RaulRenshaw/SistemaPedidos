export default function Input({ label, value, onChange, placeholder, multiline }) {
  const shared = {
    width: "100%", padding: "13px 14px",
    border: `1.5px solid ${G.border}`, borderRadius: 10,
    fontSize: 16, fontFamily: "inherit", color: G.text,
    background: G.white, outline: "none", resize: "none",
    boxSizing: "border-box",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: G.muted, display: "block", marginBottom: 6 }}>
        {label}
      </label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={shared} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={shared} />
      }
    </div>
  );
}

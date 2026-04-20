
function Badge({ statusId }) {
  const s = STATUSES[statusId] || STATUSES.recebido;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: 12, fontWeight: 600,
      padding: "4px 10px", borderRadius: 99, whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
}
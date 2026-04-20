
function DetalheServico({ service, onBack, onUpdateStatus }) {
  const [copiado, setCopiado] = useState(false);
  const stepIdx = STATUS_ORDER.indexOf(service.status);
  const s = STATUSES[service.status] || STATUSES.recebido;
  const link = service.link || gerarLink(service.nome);

  function copiar() {
    navigator.clipboard?.writeText("https://" + link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function enviarWpp() {
    const msg = encodeURIComponent(`Olá ${service.nome}! Acompanhe o conserto do seu aparelho: https://${link}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  return (
    <Screen>
      <TopBar title={service.nome} onBack={onBack} />

      <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>

        {/* Status grande */}
        <div style={{
          background: s.bg, border: `1.5px solid ${s.dot}33`,
          borderRadius: 16, padding: "20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 13, color: G.muted, marginBottom: 8 }}>Status atual</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 16 }}>{s.label}</div>
          {/* Barra progresso */}
          <div style={{ display: "flex", gap: 5 }}>
            {STATUS_ORDER.map((id, i) => (
              <div key={id} style={{
                flex: 1, height: 5, borderRadius: 3,
                background: i <= stepIdx ? G.green : G.border,
                opacity: i === stepIdx ? 0.55 : 1,
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {STATUS_ORDER.map((id, i) => (
              <span key={id} style={{ fontSize: 10, color: i <= stepIdx ? G.green : G.muted, flex: 1, textAlign: "center" }}>
                {STATUSES[id].label.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Infos */}
        <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, overflow: "hidden" }}>
          {[["Aparelho", service.aparelho], ["Problema", service.problema || "—"]].map(([label, val], i, arr) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "13px 16px",
              borderBottom: i < arr.length - 1 ? `1px solid ${G.border}` : "none",
            }}>
              <span style={{ fontSize: 13, color: G.muted }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: G.text, maxWidth: "60%", textAlign: "right" }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Mudar status */}
        <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: G.muted, marginBottom: 12 }}>Mudar status</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {STATUS_ORDER.map(id => {
              const st = STATUSES[id];
              const isSelected = service.status === id;
              return (
                <button key={id} onClick={() => onUpdateStatus(service.id, id)} style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: isSelected ? `2px solid ${st.dot}` : `1.5px solid ${G.border}`,
                  background: isSelected ? st.bg : G.white,
                  color: isSelected ? st.color : G.muted,
                  fontSize: 13, fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <Dot statusId={id} size={6} />
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Histórico */}
        <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 12 }}>Histórico</div>
          {STATUS_ORDER.slice(0, stepIdx + 1).reverse().map((id, i) => (
            <div key={id} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < stepIdx ? 10 : 0 }}>
              <Dot statusId={id} size={8} />
              <div>
                <div style={{ fontSize: 13, color: G.text }}>{STATUSES[id].label}</div>
                <div style={{ fontSize: 12, color: G.muted }}>
                  {i === 0 ? "hoje" : i === 1 ? "ontem" : `há ${i + 1} dias`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link e WhatsApp */}
        <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, padding: 16 }}>
          <div style={{ fontSize: 12, color: G.muted, marginBottom: 8 }}>Link do cliente</div>
          <div style={{
            background: G.bg, borderRadius: 8, padding: "10px 12px",
            fontSize: 13, color: G.green, wordBreak: "break-all", marginBottom: 10,
          }}>
            {link}
          </div>
          {copiado && <div style={{ fontSize: 12, color: STATUSES.pronto.color, marginBottom: 8 }}>Copiado!</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={copiar} variant="secondary" style={{ fontSize: 14 }}>Copiar link</Btn>
            <Btn onClick={enviarWpp} variant="wpp" style={{ fontSize: 14 }}>WhatsApp</Btn>
          </div>
        </div>

      </div>
    </Screen>
  );
}

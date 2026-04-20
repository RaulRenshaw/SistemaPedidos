
function ClienteView({ service, onBack }) {
  const stepIdx = STATUS_ORDER.indexOf(service.status);
  const s = STATUSES[service.status] || STATUSES.recebido;

  const mensagens = {
    recebido: "Recebemos seu aparelho e em breve iniciaremos a análise.",
    analise:  "Estamos avaliando o problema do seu aparelho.",
    conserto: "Estamos trabalhando no seu aparelho.",
    pronto:   "Seu aparelho está pronto! Pode vir buscar.",
    entregue: "Aparelho entregue. Obrigado pela preferência!",
  };

  return (
    <Screen>
      <div style={{ background: G.green, padding: "20px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="white"/>
          </svg>
          <span style={{ color: "white", fontSize: 15, fontWeight: 600 }}>TechFix Assistência</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px 16px", overflowY: "auto" }}>

        {/* Info do cliente */}
        <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, padding: 16, marginBottom: 12 }}>
          {[["Cliente", service.nome], ["Aparelho", service.aparelho], ["Problema", service.problema || "—"]].map(([label, val], i, arr) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: i < arr.length - 1 ? `1px solid ${G.border}` : "none",
            }}>
              <span style={{ fontSize: 13, color: G.muted }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: G.text }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{
          background: s.bg, border: `1.5px solid ${s.dot}44`,
          borderRadius: 16, padding: "20px", textAlign: "center", marginBottom: 12,
        }}>
          <div style={{ fontSize: 13, color: G.muted, marginBottom: 8 }}>Status atual</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: G.white, padding: "10px 20px", borderRadius: 40, marginBottom: 14,
          }}>
            <Dot statusId={service.status} size={10} />
            <span style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.label}</span>
          </div>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            {STATUS_ORDER.map((id, i) => (
              <div key={id} style={{
                flex: 1, height: 5, borderRadius: 3,
                background: i <= stepIdx ? G.green : G.border,
                opacity: i === stepIdx ? 0.55 : 1,
              }} />
            ))}
          </div>
        </div>

        {/* Mensagem amigável */}
        <div style={{
          background: G.greenBg, borderRadius: 12, padding: 16,
          color: "#0F6E56", fontSize: 14, textAlign: "center", marginBottom: 12,
        }}>
          {mensagens[service.status]}
        </div>

        {/* Histórico */}
        <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, padding: 16, marginBottom: 12 }}>
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

        {/* WhatsApp */}
        <Btn variant="wpp" onClick={() => window.open("https://wa.me/5511999999999", "_blank")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1A7 7 0 1 1 2.24 10.9L1.5 14.5l3.7-.67A7 7 0 0 1 8 1z" stroke="white" strokeWidth="1.3" fill="none"/>
            <path d="M5.7 6.6c.28.56.75 1.2 1.4 1.87.65.65 1.3 1.12 1.87 1.4.37-.28.74-.47.94-.56.18-.1.45 0 .63.18l.75.93c.18.18.18.46 0 .64-.65.74-1.4 1.03-2.34.56-1.4-.74-3.47-2.8-4.2-4.2-.47-.93.2-1.67.94-2.24.18-.18.46-.18.64 0l.93.75c.18.18.28.45.18.63-.1.2-.28.56-.56.94z" fill="white"/>
          </svg>
          Falar no WhatsApp
        </Btn>

        {onBack && (
          <button onClick={onBack} style={{
            marginTop: 12, background: "none", border: "none",
            color: G.muted, fontSize: 13, cursor: "pointer", width: "100%",
          }}>
            ← voltar (demo)
          </button>
        )}
      </div>
    </Screen>
  );
}

function NovoServico({ onBack, onCreate }) {
  const [nome, setNome] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [problema, setProblema] = useState("");
  const [link, setLink] = useState(null);
  const [copiado, setCopiado] = useState(false);

  function criar() {
    if (!nome.trim() || !aparelho.trim()) return;
    const l = gerarLink(nome);
    setLink(l);
    onCreate({ id: Date.now(), nome, aparelho, problema, status: "recebido", link: l });
  }

  function copiar() {
    navigator.clipboard?.writeText("https://" + link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function enviarWpp() {
    const msg = encodeURIComponent(`Olá ${nome}! Acompanhe o conserto do seu aparelho aqui: https://${link}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  if (link) {
    return (
      <Screen>
        <TopBar title="Serviço criado!" onBack={onBack} />
        <div style={{ flex: 1, padding: "32px 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: G.greenBg, margin: "0 auto 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, color: G.green,
            }}>✓</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: G.text }}>{nome}</div>
            <div style={{ fontSize: 14, color: G.muted, marginTop: 4 }}>{aparelho}</div>
          </div>

          {/* Link */}
          <div style={{ background: G.white, borderRadius: 14, border: `1.5px solid ${G.border}`, padding: 16 }}>
            <div style={{ fontSize: 12, color: G.muted, marginBottom: 8 }}>Link do cliente</div>
            <div style={{
              background: G.bg, borderRadius: 10, padding: "12px 14px",
              fontSize: 14, color: G.green, wordBreak: "break-all", fontWeight: 500,
            }}>
              {link}
            </div>
            {copiado && (
              <div style={{ fontSize: 12, color: STATUSES.pronto.color, marginTop: 6 }}>Link copiado!</div>
            )}
          </div>

          <Btn onClick={copiar} variant="secondary">Copiar link</Btn>
          <Btn onClick={enviarWpp} variant="wpp">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1A7 7 0 1 1 2.24 10.9L1.5 14.5l3.7-.67A7 7 0 0 1 8 1z" stroke="white" strokeWidth="1.3" fill="none"/>
              <path d="M5.7 6.6c.28.56.75 1.2 1.4 1.87.65.65 1.3 1.12 1.87 1.4.37-.28.74-.47.94-.56.18-.1.45 0 .63.18l.75.93c.18.18.18.46 0 .64-.65.74-1.4 1.03-2.34.56-1.4-.74-3.47-2.8-4.2-4.2-.47-.93.2-1.67.94-2.24.18-.18.46-.18.64 0l.93.75c.18.18.28.45.18.63-.1.2-.28.56-.56.94z" fill="white"/>
            </svg>
            Enviar no WhatsApp
          </Btn>
          <Btn onClick={() => { setLink(null); setNome(""); setAparelho(""); setProblema(""); }} variant="secondary">
            + Criar outro serviço
          </Btn>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <TopBar title="Novo serviço" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 20px 0" }}>
        <Input label="Nome do cliente"  value={nome}     onChange={setNome}     placeholder="Ex: João Silva" />
        <Input label="Aparelho"         value={aparelho} onChange={setAparelho} placeholder="Ex: iPhone 14, Samsung S23…" />
        <Input label="Problema"         value={problema} onChange={setProblema} placeholder="Descreva brevemente…" multiline />
      </div>
      <div style={{ padding: "12px 20px 28px" }}>
        <Btn onClick={criar} style={{ opacity: !nome.trim() || !aparelho.trim() ? 0.45 : 1 }}>
          Criar e gerar link
        </Btn>
      </div>
    </Screen>
  );
}
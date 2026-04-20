
function Dashboard({ services, onNovo, onOpen }) {
  const [filtro, setFiltro] = useState("todos");

  const filtrados = services.filter(s => {
    if (filtro === "abertos") return ["recebido","analise","conserto"].includes(s.status);
    if (filtro === "prontos") return s.status === "pronto";
    return true;
  });

  const tabs = [
    { id: "todos",   label: "Todos" },
    { id: "abertos", label: "Em aberto" },
    { id: "prontos", label: "Prontos" },
  ];

  return (
    <Screen>
      <TopBar
        title="Minha Assistência"
        right={<span style={{ fontSize: 13, color: G.muted }}>hoje</span>}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tabs */}
        <div style={{ padding: "12px 16px 0", background: G.white, borderBottom: `1px solid ${G.border}` }}>
          <div style={{
            display: "flex", background: G.bg, borderRadius: 10, padding: 3, gap: 2,
          }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setFiltro(t.id)} style={{
                flex: 1, padding: "8px 4px",
                border: "none", borderRadius: 8, cursor: "pointer",
                fontSize: 13, fontFamily: "inherit",
                fontWeight: filtro === t.id ? 600 : 400,
                background: filtro === t.id ? G.white : "transparent",
                color: filtro === t.id ? G.text : G.muted,
              }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ height: 10 }} />
        </div>

        {/* Lista */}
        <div style={{ flex: 1, padding: "12px 16px", overflowY: "auto" }}>
          {filtrados.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", color: G.muted }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
              <p>Nenhum serviço aqui</p>
            </div>
          )}
          {filtrados.map(s => (
            <div key={s.id} onClick={() => onOpen(s)} style={{
              background: G.white,
              border: `1.5px solid ${G.border}`,
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}>
              <Dot statusId={s.status} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: G.text }}>{s.nome}</div>
                <div style={{ fontSize: 13, color: G.muted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {s.aparelho}
                </div>
              </div>
              <Badge statusId={s.status} />
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div style={{ padding: "12px 16px 28px", background: G.white, borderTop: `1px solid ${G.border}` }}>
          <Btn onClick={onNovo}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
            Novo serviço
          </Btn>
        </div>
      </div>

      {/* Nav bar */}
      <div style={{
        display: "flex",
        background: G.white,
        borderTop: `1px solid ${G.border}`,
      }}>
        {[
          { icon: "▦", label: "Serviços", active: true },
          { icon: "◷", label: "Histórico" },
          { icon: "◯", label: "Perfil" },
        ].map(tab => (
          <div key={tab.label} style={{
            flex: 1, padding: "10px 8px 14px",
            textAlign: "center",
            color: tab.active ? G.green : G.muted,
            fontSize: 11, cursor: "pointer",
          }}>
            <div style={{ fontSize: 18, lineHeight: 1.2 }}>{tab.icon}</div>
            {tab.label}
          </div>
        ))}
      </div>
    </Screen>
  );
}

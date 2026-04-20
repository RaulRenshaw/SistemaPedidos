import { useState } from "react";

import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import Btn from "../components/Button";
import Dot from "../components/Dot";

import gerarLink from "../utils/gerarLink";
import { G } from "../constants/theme";
import { STATUSES, STATUS_ORDER } from "../constants/status";

// Card container reutilizável para manter harmonia
function Card({ children, style }) {
  return (
    <div style={{
      background: G.surface,
      borderRadius: 14,
      border: `1.5px solid ${G.border}`,
      padding: 16,
      ...style,
    }}>
      {children}
    </div>
  );
}

// Linha de info (label + valor)
function InfoRow({ label, value, last }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "11px 0",
      borderBottom: last ? "none" : `1px solid ${G.border}`,
    }}>
      <span style={{ fontSize: 13, color: G.muted }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: G.text, maxWidth: "60%", textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function DetalheServico({ service, onBack, onUpdateStatus }) {
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

      <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>

        {/* Status grande */}
        <Card>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: G.muted, marginBottom: 10 }}>Status atual</div>

            {/* Pill de status */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: G.surfaceAlt,
              border: `1.5px solid ${s.dot}55`,
              padding: "10px 20px", borderRadius: 40, marginBottom: 18,
            }}>
              <Dot statusId={service.status} size={9} />
              <span style={{ fontSize: 18, fontWeight: 700, color: s.dotText || s.dot }}>{s.label}</span>
            </div>

            {/* Barra de progresso */}
            <div style={{ display: "flex", gap: 5 }}>
              {STATUS_ORDER.map((id, i) => (
                <div key={id} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i < stepIdx ? G.green
                             : i === stepIdx ? `${G.green}88`
                             : G.border,
                }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              {STATUS_ORDER.map((id, i) => (
                <span key={id} style={{
                  fontSize: 10, flex: 1, textAlign: "center",
                  color: i <= stepIdx ? G.greenText : G.muted,
                }}>
                  {STATUSES[id].label.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Infos do aparelho */}
        <Card style={{ padding: "4px 16px" }}>
          <InfoRow label="Aparelho" value={service.aparelho} />
          <InfoRow label="Problema" value={service.problema || "—"} last />
        </Card>

        {/* Mudar status */}
        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Mudar status
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {STATUS_ORDER.map(id => {
              const st = STATUSES[id];
              const isSelected = service.status === id;
              return (
                <button key={id} onClick={() => onUpdateStatus(service.id, id)} style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: isSelected ? `1.5px solid ${st.dot}` : `1.5px solid ${G.border}`,
                  background: isSelected ? G.surfaceAlt : G.surfaceAlt,
                  color: isSelected ? st.dot : G.muted,
                  fontSize: 13, fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 6,
                  opacity: isSelected ? 1 : 0.7,
                }}>
                  <Dot statusId={id} size={6} />
                  {st.label}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Histórico */}
        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Histórico
          </div>
          {STATUS_ORDER.slice(0, stepIdx + 1).reverse().map((id, i) => (
            <div key={id} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              marginBottom: i < stepIdx ? 12 : 0,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: G.surfaceAlt,
                border: `1.5px solid ${STATUSES[id].dot}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Dot statusId={id} size={7} />
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 13, color: G.text, fontWeight: 500 }}>{STATUSES[id].label}</div>
                <div style={{ fontSize: 12, color: G.muted, marginTop: 1 }}>
                  {i === 0 ? "hoje" : i === 1 ? "ontem" : `há ${i + 1} dias`}
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Link e WhatsApp */}
        <Card>
          <div style={{ fontSize: 12, color: G.muted, marginBottom: 8 }}>Link do cliente</div>
          <div style={{
            background: G.surfaceAlt,
            border: `1px solid ${G.border}`,
            borderRadius: 8, padding: "10px 12px",
            fontSize: 13, color: G.greenText,
            wordBreak: "break-all", marginBottom: 10,
          }}>
            {link}
          </div>
          {copiado && (
            <div style={{ fontSize: 12, color: G.greenText, marginBottom: 8 }}>✓ Copiado!</div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={copiar} variant="secondary" style={{ fontSize: 14 }}>Copiar link</Btn>
            <Btn onClick={enviarWpp} variant="wpp" style={{ fontSize: 14 }}>WhatsApp</Btn>
          </div>
        </Card>

      </div>
    </Screen>
  );
}

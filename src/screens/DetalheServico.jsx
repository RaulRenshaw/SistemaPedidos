import { useState } from "react";

import Screen from "../components/Screen";
import TopBar from "../components/TopBar";
import Btn from "../components/Button";
import Dot from "../components/Dot";
import ProgressBar from "../components/ProgressBar";
import ServiceHistory from "../components/ServiceHistory";

import gerarLink from "../utils/gerarLink";
import { G } from "../constants/theme";
import { STATUSES, STATUS_ORDER } from "../constants/status";

function Card({ children, style }) {
  return (
    <div style={{
      background:   G.surface,
      borderRadius: 12,
      border:       `1px solid ${G.border}`,
      padding:      16,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize:      11,
      fontWeight:    700,
      color:         G.muted,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      marginBottom:  12,
    }}>
      {children}
    </div>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <div style={{
      display:       "flex",
      justifyContent:"space-between",
      alignItems:    "center",
      padding:       "11px 0",
      borderBottom:  last ? "none" : `1px solid ${G.border}`,
    }}>
      <span style={{ fontSize: 13, color: G.muted }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: G.text, maxWidth: "60%", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

export default function DetalheServico({ service, onBack, onUpdateStatus }) {
  const [copiado, setCopiado] = useState(false);
  const s    = STATUSES[service.status] || STATUSES.recebido;
  const link = service.link || gerarLink(service.nome);

  function copiar() {
    navigator.clipboard?.writeText("https://" + link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function enviarWpp() {
    const msg = encodeURIComponent(
      `Olá ${service.nome}! Acompanhe o conserto do seu aparelho: https://${link}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  return (
    <Screen>
      <TopBar title={service.nome} onBack={onBack} />

      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>

        {/* Status pill + barra */}
        <Card>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        8,
              background: s.bg,
              border:     `1.5px solid ${s.dot}88`,
              padding:    "10px 22px",
              borderRadius: 40,
            }}>
              <Dot statusId={service.status} size={9} />
              <span style={{ fontSize: 17, fontWeight: 700, color: s.color }}>
                {s.label}
              </span>
            </div>
          </div>
          <ProgressBar statusId={service.status} />
        </Card>

        {/* Infos */}
        <Card style={{ padding: "4px 16px" }}>
          <InfoRow label="Aparelho" value={service.aparelho} />
          <InfoRow label="Problema" value={service.problema || "—"} last />
        </Card>

        {/* Mudar status — bg claro de cada status, sempre legível */}
        <Card>
          <SectionLabel>Mudar status</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {STATUS_ORDER.map(id => {
              const st         = STATUSES[id];
              const isSelected = service.status === id;
              return (
                <button
                  key={id}
                  onClick={() => !isSelected && onUpdateStatus(service.id, id)}
                  style={{
                    padding:      "10px 12px",
                    borderRadius: 10,
                    background:   G.bgStatus,
                    color:        st.color,
                    border:       isSelected
                      ? `2px solid ${st.dot}`
                      : `1.5px solid ${st.dot}50`,
                    fontSize:     13,
                    fontWeight:   isSelected ? 700 : 500,
                    cursor:       isSelected ? "default" : "pointer",
                    fontFamily:   "inherit",
                    display:      "flex",
                    alignItems:   "center",
                    gap:          6,
                    opacity:      isSelected ? 1 : 0.72,
                    transition:   "opacity 0.15s, border 0.15s",
                  }}
                >
                  <Dot statusId={id} size={6} />
                  {st.label}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Histórico */}
        <Card>
          <SectionLabel>Histórico</SectionLabel>
          <ServiceHistory
            history={service.history || [{ status: service.status, at: null }]}
            currentStatus={service.status}
          />
        </Card>

        {/* Link */}
        <Card>
          <SectionLabel>Link do cliente</SectionLabel>
          <div style={{
            background:    G.surfaceAlt,
            border:        `1px solid ${G.border}`,
            borderRadius:  8,
            padding:       "10px 12px",
            fontSize:      13,
            color:         G.greenText,
            wordBreak:     "break-all",
            marginBottom:  10,
          }}>
            {link}
          </div>
          {copiado && (
            <div style={{ fontSize: 12, color: G.greenText, marginBottom: 8 }}>✓ Copiado!</div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={copiar}    variant="secondary" style={{ fontSize: 14 }}>Copiar link</Btn>
            <Btn onClick={enviarWpp} variant="wpp"       style={{ fontSize: 14 }}>WhatsApp</Btn>
          </div>
        </Card>

      </div>
    </Screen>
  );
}

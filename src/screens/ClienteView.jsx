import Screen from "../components/Screen";
import Btn from "../components/Button";
import Dot from "../components/Dot";
import ProgressBar from "../components/ProgressBar";
import ServiceHistory from "../components/ServiceHistory";

import { G } from "../constants/theme";
import { STATUSES } from "../constants/status";

function Card({ children, style }) {
  return (
    <div style={{
      background: G.surface,
      borderRadius: 14,
      border: `1.5px solid ${G.border}`,
      padding: 16,
      marginBottom: 12,
      boxShadow: G.boxShadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: G.muted,
      textTransform: "uppercase", letterSpacing: "0.07em",
      marginBottom: 12,
    }}>
      {children}
    </div>
  );
}

const MENSAGENS = {
  recebido: "Recebemos seu aparelho e em breve iniciaremos a análise.",
  analise:  "Estamos avaliando o problema do seu aparelho.",
  conserto: "Estamos trabalhando no seu aparelho.",
  pronto:   "Seu aparelho está pronto! Pode vir buscar.",
  entregue: "Aparelho entregue. Obrigado pela preferência!",
};

export default function ClienteView({ service, onBack }) {
  const s = STATUSES[service.status] || STATUSES.recebido;

  return (
    <Screen>
      {/* Header da loja */}
      <div style={{
        background: G.surface,
        borderBottom: `1px solid ${G.border}`,
        padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: G.green,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="white"/>
          </svg>
        </div>
        <span style={{ color: G.text, fontSize: 15, fontWeight: 600 }}>TechFix Assistência</span>
      </div>

      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>

        {/* Info do cliente */}
        <Card style={{ padding: "4px 16px" }}>
          {[["Cliente", service.nome], ["Aparelho", service.aparelho], ["Problema", service.problema || "—"]].map(([label, val], i, arr) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "11px 0",
              borderBottom: i < arr.length - 1 ? `1px solid ${G.border}` : "none",
            }}>
              <span style={{ fontSize: 13, color: G.muted }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: G.text }}>{val}</span>
            </div>
          ))}
        </Card>

        {/* Status atual + progresso */}
        <Card style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: s.bg,
              border: `1.5px solid ${s.dot}66`,
              padding: "10px 22px", borderRadius: 40,
            }}>
              <Dot statusId={service.status} size={10} />
              <span style={{ fontSize: 20, fontWeight: 700, color: s.dot }}>{s.label}</span>
            </div>
          </div>
          <ProgressBar statusId={service.status} />
        </Card>

        {/* Mensagem amigável */}
        <div style={{
          background: G.greenBg,
          border: `1px solid ${G.green}33`,
          borderRadius: 12, padding: "14px 16px",
          color: G.greenText, fontSize: 14,
          textAlign: "center", marginBottom: 12,
        }}>
          {MENSAGENS[service.status]}
        </div>

        {/* Histórico */}
        <Card>
          <SectionLabel>Histórico</SectionLabel>
          <ServiceHistory
            history={service.history || [{ status: service.status, at: null }]}
            currentStatus={service.status}
          />
        </Card>

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

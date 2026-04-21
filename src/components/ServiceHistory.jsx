import { G } from "../constants/theme";
import { STATUSES, STATUS_ORDER } from "../constants/status";
import Dot from "./Dot";

function formatDate(date) {
  if (!date) return null;
  const d         = new Date(date);
  const now       = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === now.toDateString())       return "hoje";
  if (d.toDateString() === yesterday.toDateString()) return "ontem";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function formatTime(date) {
  if (!date) return null;
  return new Date(date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default function ServiceHistory({ history, currentStatus }) {
  const reversed = [...history].reverse();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {reversed.map((entry, i) => {
        const st        = STATUSES[entry.status];
        const isCurrent = entry.status === currentStatus;
        const isLast    = i === reversed.length - 1;

        return (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", position: "relative" }}>
            {/* Linha vertical */}
            {!isLast && (
              <div style={{
                position: "absolute", left: 13, top: 28,
                width: 2, height: "calc(100% + 4px)",
                background: G.border, zIndex: 0,
              }} />
            )}

            {/* Ícone */}
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              background:  isCurrent ? st.bg      : G.surfaceAlt,
              border:      isCurrent
                ? `1.5px solid ${st.dot}`
                : `1.5px solid ${G.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", zIndex: 1,
              transition: "all 0.2s",
            }}>
              {isCurrent
                ? <Dot statusId={entry.status} size={8} />
                : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke={G.greenText} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              }
            </div>

            {/* Texto */}
            <div style={{ paddingTop: 4, paddingBottom: isLast ? 0 : 16, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 13, fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? G.text : G.muted,
                }}>
                  {st.label}
                </span>
                {isCurrent && (
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: st.bg, color: st.color,
                    border: `1px solid ${st.dot}66`,
                    padding: "1px 7px", borderRadius: 99,
                  }}>
                    atual
                  </span>
                )}
              </div>
              {entry.at && (
                <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>
                  {formatDate(entry.at)}{formatTime(entry.at) ? `, ${formatTime(entry.at)}` : ""}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { G } from "../constants/theme";
import { STATUSES, STATUS_ORDER, getStepState } from "../constants/status";

export default function ProgressBar({ statusId }) {
  const currentIdx = STATUS_ORDER.indexOf(statusId);

  return (
    <div style={{ width: "100%" }}>
      {/* Trilho com nós */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {STATUS_ORDER.map((id, i) => {
          const state  = getStepState(statusId, id);
          const isLast = i === STATUS_ORDER.length - 1;
          const dot    = STATUSES[id].dot;

          return (
            <div key={id} style={{ display: "flex", alignItems: "center", flex: isLast ? 0 : 1 }}>
              {/* Nó */}
              <div style={{
                width:        state === "current" ? 13 : 8,
                height:       state === "current" ? 13 : 8,
                borderRadius: "50%",
                flexShrink:   0,
                transition:   "all 0.25s ease",
                background:
                  state === "done"    ? G.green :
                  state === "current" ? dot      :
                  G.border,
                boxShadow:
                  state === "current" ? `0 0 0 3px ${dot}30` : "none",
              }} />

              {/* Conector */}
              {!isLast && (
                <div style={{
                  flex:       1,
                  height:     3,
                  borderRadius: 2,
                  background: i < currentIdx ? G.green : G.border,
                  transition: "background 0.3s ease",
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{ display: "flex", marginTop: 7 }}>
        {STATUS_ORDER.map((id, i) => {
          const state = getStepState(statusId, id);
          return (
            <div key={id} style={{
              flex:       1,
              textAlign:  i === 0 ? "left" : i === STATUS_ORDER.length - 1 ? "right" : "center",
              fontSize:   10,
              fontWeight: state === "current" ? 700 : 400,
              color:
                state === "done"    ? G.greenText :
                state === "current" ? G.text      :
                G.muted,
              transition: "color 0.2s",
            }}>
              {STATUSES[id].label.split(" ")[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

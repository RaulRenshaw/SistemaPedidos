import { G } from "../constants/theme";

export default function Screen({ children }) {
  return (
    <div style={{
      maxWidth: 390,
      margin: "0 auto",
      minHeight: "100dvh",
      background: G.bg,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {children}
    </div>
  );
}

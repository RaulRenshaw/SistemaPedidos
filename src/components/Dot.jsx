import { STATUSES } from "../constants/status";

export default function Dot({ statusId, size = 8 }) {
  const s = STATUSES[statusId] || STATUSES.recebido;
  return <div style={{ width: size, height: size, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />;
}
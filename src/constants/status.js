export const STATUSES = {
  recebido: {
    label:  "Recebido",
    dot:    "#2563EB",
    color:  "#1E40AF",
    bg:     "#EFF6FF",   // azul bem leve
    border: "#2563EB55",
  },
  analise: {
    label:  "Em análise",
    dot:    "#F59E0B",
    color:  "#92400E",
    bg:     "#FFFBEB",   // laranja/amarelo bem suave
    border: "#F59E0B55",
  },
  conserto: {
    label:  "Em conserto",
    dot:    "#E11D48",
    color:  "#881337",
    bg:     "#FFF1F2",   // rosa bem claro
    border: "#E11D4855",
  },
  pronto: {
    label:  "Pronto",
    dot:    "#22C55E",
    color:  "#14532D",
    bg:     "#F0FDF4",   // verde bem suave
    border: "#22C55E55",
  },
  entregue: {
    label:  "Entregue",
    dot:    "#4B5563",
    color:  "#1F2937",
    bg:     "#F9FAFB",   // cinza clarinho
    border: "#4B556355",
  },
};

export const STATUS_ORDER = [
  "recebido",
  "analise",
  "conserto",
  "pronto",
  "entregue",
];

// Dado um statusId, retorna quais etapas são: "done" | "current" | "future"
export function getStepState(statusId, stepId) {
  const current = STATUS_ORDER.indexOf(statusId);
  const step    = STATUS_ORDER.indexOf(stepId);
  if (step < current)  return "done";
  if (step === current) return "current";
  return "future";
}

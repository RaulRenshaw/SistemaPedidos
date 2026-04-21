import { useEffect, useState } from "react";
import * as api from "../api/servicesApi";
import { STATUS_ORDER } from "../constants/status";

/**
 * Monta o histórico inicial a partir do status atual.
 *
 * O backend não armazena histórico por etapa — só createdAt e updatedAt.
 * Estratégia:
 *   - Etapa 0 (recebido) → timestamp = createdAt  (quando o pedido foi criado)
 *   - Última etapa (status atual) → timestamp = updatedAt (última modificação)
 *   - Etapas intermediárias → sem timestamp (null)
 */
function buildInitialHistory(status, createdAt, updatedAt) {
  const currentIdx = STATUS_ORDER.indexOf(status);

  return STATUS_ORDER.slice(0, currentIdx + 1).map((s, i) => ({
    status: s,
    at:
      i === 0           ? new Date(createdAt)   // sempre temos o momento de criação
      : i === currentIdx ? new Date(updatedAt)   // última atualização = status atual
      : null,                                    // intermediários sem timestamp real
  }));
}

function mapService(s) {
  const status = s.status.toLowerCase();
  return {
    id:       s.id,
    nome:     s.customerName,
    aparelho: s.device,
    problema: s.problem,
    status,
    history:  buildInitialHistory(status, s.createdAt, s.updatedAt),
  };
}

export function useServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await api.getServices();
        setServices(data.map(mapService));
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
      }
    }
    carregar();
  }, []);

  async function criarServico(novo) {
    const criado = await api.createService(novo);
    const status = criado.status.toLowerCase();
    setServices(prev => [
      {
        id:       criado.id,
        nome:     criado.customerName,
        aparelho: criado.device,
        problema: criado.problem,
        status,
        history:  [{ status, at: new Date(criado.createdAt) }],
      },
      ...prev,
    ]);
  }

  async function atualizarStatus(id, novoStatus) {
    await api.updateStatus(id, novoStatus);

    setServices(prev =>
      prev.map(s => {
        if (s.id !== id) return s;

        const currentIdx = STATUS_ORDER.indexOf(s.status);
        const newIdx     = STATUS_ORDER.indexOf(novoStatus);
        const now        = new Date();

        let newHistory;
        if (newIdx > currentIdx) {
          // Avança: adiciona etapas intermediárias (sem timestamp) + nova com timestamp real
          const added = STATUS_ORDER.slice(currentIdx + 1, newIdx + 1).map((st, i, arr) => ({
            status: st,
            at: i === arr.length - 1 ? now : null,
          }));
          newHistory = [...s.history, ...added];
        } else {
          // Retroage: trunca até o novo índice e marca com timestamp agora
          newHistory = STATUS_ORDER.slice(0, newIdx + 1).map((st, i) => {
            const existing = s.history.find(h => h.status === st);
            return {
              status: st,
              at: i === newIdx ? now : existing?.at ?? null,
            };
          });
        }

        return { ...s, status: novoStatus, history: newHistory };
      })
    );
  }

  function getById(id) {
    return services.find(s => s.id === id);
  }

  return { services, criarServico, atualizarStatus, getById };
}

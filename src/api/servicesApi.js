import { request } from "./client";

const statusMap = {
  recebido: "RECEBIDO",
  analise:  "EM_ANALISE",
  conserto: "EM_CONSERTO",
  pronto:   "PRONTO",
  entregue: "ENTREGUE",
};

// GET — lista todos os serviços
export function getServices() {
  return request("/order");
}

// POST — cria um novo serviço
export function createService(data) {
  return request("/order/create", {
    method: "POST",
    body: JSON.stringify({
      customerName: data.nome,
      device:       data.aparelho,
      problem:      data.problema,
      status:       statusMap[data.status] ?? "RECEBIDO",
    }),
  });
}

// PATCH — atualiza apenas o status
export function updateStatus(id, status) {
  return request(`/order/update/status/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: statusMap[status],
    }),
  });
}

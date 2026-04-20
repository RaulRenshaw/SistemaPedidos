import { useState } from "react";
import { INITIAL_SERVICES } from "../data/services";

export function useServices() {
  const [services, setServices] = fetch.call.;

  function criarServico(novo) {
    setServices(prev => [novo, ...prev]);
  }

  function atualizarStatus(id, novoStatus) {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, status: novoStatus } : s))
    );
  }

  function getById(id) {
    return services.find(s => s.id === id);
  }

  return {
    services,
    criarServico,
    atualizarStatus,
    getById,
  };
}
import { useState } from "react";

export function useNavigation() {
  const [tela, setTela] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(null);

  function abrirServico(id) {
    setSelectedId(id);
    setTela("detalhe");
  }

  function irParaNova() {
    setTela("novo");
  }

  function voltarDashboard() {
    setTela("dashboard");
  }

  function abrirCliente() {
    setTela("cliente");
  }

  return {
    tela,
    selectedId,
    abrirServico,
    irParaNova,
    voltarDashboard,
    abrirCliente,
    setTela,
  };
}
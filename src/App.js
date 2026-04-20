import { useState } from "react";

// ─── App principal ────────────────────────────────────────────────────────────

export default function App() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [tela, setTela] = useState("dashboard");
  const [selected, setSelected] = useState(null);

  function handleCriar(novo) {
    setServices(prev => [novo, ...prev]);
  }

  function handleUpdateStatus(id, novoStatus) {
    setServices(prev => prev.map(s => s.id === id ? { ...s, status: novoStatus } : s));
  }

  function abrirServico(s) {
    setSelected(s);
    setTela("detalhe");
  }

  const liveSelected = selected ? (services.find(s => s.id === selected.id) || selected) : null;

  if (tela === "novo")    return <NovoServico onBack={() => setTela("dashboard")} onCreate={handleCriar} />;
  if (tela === "detalhe" && liveSelected) return (
    <DetalheServico
      service={liveSelected}
      onBack={() => setTela("dashboard")}
      onUpdateStatus={handleUpdateStatus}
    />
  );
  if (tela === "cliente" && liveSelected) return (
    <ClienteView service={liveSelected} onBack={() => setTela("detalhe")} />
  );

  return (
    <Dashboard
      services={services}
      onNovo={() => setTela("novo")}
      onOpen={abrirServico}
    />
  );
}

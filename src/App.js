import Dashboard from "./screens/Dashboard";
import NovoServico from "./screens/NovoServico";
import DetalheServico from "./screens/DetalheServico";
import ClienteView from "./screens/ClienteView";

import { useServices } from "./hooks/useServices";
import { useNavigation } from "./hooks/useNavigation";

export default function App() {
  const {
    services,
    criarServico,
    atualizarStatus,
    getById,
  } = useServices();

  const {
    tela,
    selectedId,
    abrirServico,
    irParaNova,
    voltarDashboard,
    abrirCliente,
  } = useNavigation();

  const selected = selectedId ? getById(selectedId) : null;

  if (tela === "novo") {
    return (
      <NovoServico
        onBack={voltarDashboard}
        onCreate={criarServico}
      />
    );
  }

  if (tela === "detalhe" && selected) {
    return (
      <DetalheServico
        service={selected}
        onBack={voltarDashboard}
        onUpdateStatus={atualizarStatus}
      />
    );
  }

  if (tela === "cliente" && selected) {
    return (
      <ClienteView
        service={selected}
        onBack={() => abrirServico(selected.id)}
      />
    );
  }

  return (
    <Dashboard
      services={services}
      onNovo={irParaNova}
      onOpen={(s) => abrirServico(s.id)}
    />
  );
}
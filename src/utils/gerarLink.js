
function gerarLink(nome) {
  const slug = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  return `assistech.com.br/s/${slug}-${Math.random().toString(36).slice(2, 6)}`;
}
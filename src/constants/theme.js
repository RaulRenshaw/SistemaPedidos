// ─── Paleta dark refinada ─────────────────────────────────────────────────────
//
// Hierarquia de profundidade (do mais escuro ao mais claro):
//   bg → surface → surfaceAlt
//
// Bordas são sempre sutis — apenas para separar camadas, não decorar.
// Texto principal tem contraste alto. Muted tem contraste mínimo WCAG AA.

export const G = {
  // Brand
  green:      "#1DB97A",      // verde principal — botões, ações
  greenBg:    "#0d2e1e",      // fundo de avisos/mensagens verdes
  greenText:  "#5edfaa",      // texto verde legível sobre fundo escuro
  wpp:        "#25D366",

  // Backgrounds — escalonados com diferença perceptível mas suave
  bg:         "#0d1117",      // fundo da tela (GitHub dark inspired)
  bgFilter:   "#161b22",      // fundo do seletor de tabs
  surface:    "#161b22",      // cards principais
  surfaceAlt: "#1c2330",      // cards internos, inputs, link box


  bgStatus: "#111827",        // fundo principal
  surfaceStatus: "#1E293B",   // cards
  borderStatus: "#334155",


  // Bordas — uma única espessura sutil, cor coerente com a profundidade
  border:     "#30363d",      // borda padrão (neutro, sem saturação azul)
  borderHi:   "#484f58",      // borda em hover / foco

  // Text
  text:       "#e6edf3",      // texto principal — alto contraste, levemente frio
  muted:      "#8b949e",      // texto secundário — WCAG AA sobre surface

  white:      "#FFFFFF",

  boxShadow: "0 10px 25px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05)"
};

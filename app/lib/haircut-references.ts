export type HaircutReference = {
  number: number;
  name: string;
  tone: string;
  description: string;
};

export const haircutReferences: HaircutReference[] = [
  {
    number: 1,
    name: "Fade Médio",
    tone: "castanho escuro",
    description:
      "O cabelo vai ficando mais curto do meio da cabeça para baixo, criando um efeito de degradê suave nas laterais e na nuca. O topo fica com mais comprimento e volume. É um dos cortes mais pedidos na barbearia e fica bem em quase todos os tipos de rosto.",
  },
  {
    number: 2,
    name: "Degradê Baixo",
    tone: "preto intenso",
    description:
      "As laterais são cortadas bem pertinho logo acima da orelha e o cabelo vai crescendo gradualmente em direção ao topo. O resultado é um visual limpo e bem acabado, ideal para quem quer algo arrumado sem ser muito ousado.",
  },
  {
    number: 3,
    name: "Social Clássico",
    tone: "loiro dourado",
    description:
      "Um corte tradicional e elegante, com o cabelo penteado para o lado ou para trás. As laterais ficam mais curtas e o topo um pouco maior. É ideal para ambientes de trabalho e ocasiões formais, sem perder praticidade no dia a dia.",
  },
  {
    number: 4,
    name: "Pompadour",
    tone: "castanho claro",
    description:
      "O topo é deixado mais longo e penteado para cima e para trás, criando volume característico. As laterais ficam mais curtas para destacar o topo. É um estilo com personalidade, que mistura o clássico com o moderno.",
  },
  {
    number: 5,
    name: "Militar",
    tone: "preto fosco",
    description:
      "Corte curto e uniforme por toda a cabeça, sem degradê. Passa uma imagem de organização e praticidade, é fácil de cuidar e não precisa de muito produto.",
  },
  {
    number: 6,
    name: "Undercut",
    tone: "castanho médio",
    description:
      "As laterais e a nuca são raspadas bem curtas, enquanto o topo fica mais longo. Essa diferença de comprimento define o estilo e permite variações de penteado.",
  },
  {
    number: 7,
    name: "Buzz Cut",
    tone: "grisalho",
    description:
      "O cabelo é cortado bem rente à cabeça por igual em todos os lados. É o corte mais prático: rápido de fazer e sem necessidade de produto ou penteado.",
  },
  {
    number: 8,
    name: "Caesar",
    tone: "preto natural",
    description:
      "Cabelo curto com franja reta na testa e laterais bem alinhadas. É um corte simples, jovem e fácil de manter, que funciona muito bem no dia a dia.",
  },
  {
    number: 9,
    name: "Low Fade",
    tone: "castanho escuro",
    description:
      "Parecido com o Fade Médio, mas com início mais baixo próximo à orelha e nuca. O efeito fica mais suave e natural para quem busca discrição.",
  },
  {
    number: 10,
    name: "High Fade",
    tone: "loiro platinado",
    description:
      "O degradê começa alto na cabeça, deixando laterais quase raspadas e criando contraste forte com o topo. É um visual moderno e mais ousado.",
  },
  {
    number: 11,
    name: "Crop Texturizado",
    tone: "castanho claro",
    description:
      "Topo curto com acabamento de textura e franja curtinha. É um corte atual, muito popular entre os jovens e versátil para diferentes tipos de cabelo.",
  },
  {
    number: 12,
    name: "Razor Fade",
    tone: "preto brilhante",
    description:
      "Degradê feito com navalha para transição mais precisa e acabamento extremamente limpo. É uma opção sofisticada para quem valoriza detalhe.",
  },
  {
    number: 13,
    name: "Slick Back",
    tone: "preto brilhante",
    description:
      "Todo o cabelo é penteado para trás com pomada, trazendo visual liso e elegante. Combina com ocasiões especiais e com quem gosta de um estilo mais sofisticado.",
  },
  {
    number: 14,
    name: "Side Part",
    tone: "castanho médio",
    description:
      "Corte com risca lateral marcada e laterais mais curtas. É um clássico refinado, que mantém visual arrumado sem exigir muito esforço.",
  },
  {
    number: 15,
    name: "Taper Fade",
    tone: "loiro natural",
    description:
      "O cabelo vai afinando de forma gradual nas laterais e na nuca, com transição discreta e natural. Versátil para contextos casuais e formais.",
  },
];

export function getHaircutReferenceByNumber(number: number) {
  return haircutReferences.find((item) => item.number === number) ?? null;
}
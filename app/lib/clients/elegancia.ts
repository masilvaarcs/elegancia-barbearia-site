import type { ClientProfileInput } from "../client-types";

export const eleganciaProfileInput: ClientProfileInput = {
  brand: {
    name: "Elegância Barbearia",
    tagline: "Tradição, estilo e precisão em cada corte.",
    instagramHandle: "@masilva_arcs",
    instagramUrl: "https://www.instagram.com/masilva_arcs/",
    secondaryInstagramHandle: "@masilva_arcs",
    secondaryInstagramUrl: "https://www.instagram.com/masilva_arcs/",
    defaultPhoneRaw: "5551984228067",
    addressLine: "R. Pereira Passos, 31 - COHAB B",
    city: "Gravataí - RS, 94040-230",
    mapsUrl: "https://maps.app.goo.gl/EnZVeotpmrneJbQK6",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.3830204130345!2d-51.03072148914596!3d-29.939659626320367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951974a37c2d4f71%3A0xe961a0c3f62e9b94!2sR.%20Pereira%20Passos%2C%2031%20-%20COHAB%20B%2C%20Gravata%C3%AD%20-%20RS%2C%2094040-230!5e0!3m2!1spt-BR!2sbr!4v1779665256839!5m2!1spt-BR!2sbr",
  },
  metadata: {
    siteUrl: "https://elegancia-barbearia-site.vercel.app",
  },
  // Plano comercial deste cliente.
  // Troque entre: "basic" | "normal" | "premium" | "superPremium".
  // Se quiser ajustar algum modulo ou limite sem mudar tier, use `modules` e `limits`.
  // Define se a galeria usa o rodízio animado (efeito Thanos snap).
  // false = fotos estáticas, sem troca automática.
  galleryAnimation: true,
  plan: {
    tier: "premium",
    // Exemplo de override:
    // modules: { whatsappCta: true },
    // limits: { galleryRealMaxItems: 4 },
  },
  // Comportamento das cores do tema:
  // - randomOnLoad: sorteia a variante a cada acesso
  // - fixed: trava a variante por `fixedVariantId` ou `fixedVariantIndex`
  theme: {
    mode: "randomOnLoad",
    // mode: "fixed",
    // fixedVariantId: "ember-bronze",
    // fixedVariantIndex: 0,
  },
  palette: {
    background: "#3B1A0E",
    surface: "#4A2414",
    surfaceSoft: "#5A2E1B",
    accent: "#C9922A",
    accentSoft: "#D4A94B",
    text: "#F5E6C8",
    textSoft: "#A07840",
  },
  hero: {
    eyebrow: "Barbearia clássica de alto padrão",
    title: "Estilo que faz você entrar numa sala e todo mundo notar",
    description:
      "Cortes masculinos e infantis com técnica apurada, acabamento impecável e um ambiente que respeita quem você é. Aqui, cada detalhe importa.",
    primaryCtaLabel: "Agendar no WhatsApp",
    secondaryCtaLabel: "Ver Instagram",
  },
  services: [
    {
      title: "Corte Clássico Premium",
      description:
        "Corte personalizado com degradê preciso, linha alinhada e finalização que dura dias. Ideal para o dia a dia ou aquela ocasião especial.",
      duration: "45 min",
      highlight: "Mais pedido da semana",
    },
    {
      title: "Corte Infantil com Cuidado",
      description:
        "Atendimento tranquilo e técnico para os pequenos. A gente sabe como deixar a criança à vontade e entregar um resultado que os pais adoram.",
      duration: "35 min",
      highlight: "Especialidade da casa",
    },
    {
      title: "Acabamento & Contorno",
      description:
        "Refino rápido para manter o visual em dia. Inclui contorno, nuca, lateral e ajuste geral para você sempre sair produzido.",
      duration: "20 min",
      highlight: "Ideal entre cortes",
    },
  ],
  differentiators: [
    "Profissional experiente com olho clínico para o seu estilo",
    "Ambiente sofisticado que mistura o clássico com o contemporâneo",
    "Atendimento exclusivo para público masculino e infantil",
    "Agendamento fácil pelo WhatsApp ou Instagram",
  ],
  workingHours: [
    "Segunda a sexta: 09:00 às 19:00",
    "Sábado: 09:00 às 18:00",
    "Domingo: atendimento sob consulta",
  ],
  gallery: [
    { src: "/images/elegancia/gallery-01.webp", alt: "Fade Médio" },
    { src: "/images/elegancia/gallery-02.webp", alt: "Degradê Baixo" },
    { src: "/images/elegancia/gallery-03.webp", alt: "Social Clássico" },
    { src: "/images/elegancia/gallery-04.webp", alt: "Pompadour" },
    { src: "/images/elegancia/gallery-05.webp", alt: "Militar" },
    { src: "/images/elegancia/gallery-06.webp", alt: "Undercut" },
    { src: "/images/elegancia/gallery-07.webp", alt: "Buzz Cut" },
    { src: "/images/elegancia/gallery-08.webp", alt: "Caesar" },
    { src: "/images/elegancia/gallery-09.webp", alt: "Low Fade" },
    { src: "/images/elegancia/gallery-10.webp", alt: "High Fade" },
    { src: "/images/elegancia/gallery-11.webp", alt: "Crop Texturizado" },
    { src: "/images/elegancia/gallery-12.webp", alt: "Razor Fade" },
    { src: "/images/elegancia/gallery-13.webp", alt: "Slick Back" },
    { src: "/images/elegancia/gallery-14.webp", alt: "Side Part" },
    { src: "/images/elegancia/gallery-15.webp", alt: "Taper Fade" },
  ],
  featuredImages: {
    hero: "/images/elegancia/gallery-01.webp",
    heroVariants: [
      "/images/elegancia/gallery-01.webp",
      "/images/elegancia/gallery-02.webp",
      "/images/elegancia/gallery-03.webp",
      "/images/elegancia/gallery-04.webp",
      "/images/elegancia/gallery-05.webp",
      "/images/elegancia/gallery-06.webp",
      "/images/elegancia/gallery-07.webp",
      "/images/elegancia/gallery-08.webp",
      "/images/elegancia/gallery-09.webp",
      "/images/elegancia/gallery-10.webp",
    ],
    heroThemeVariants: [
      {
        id: "ember-bronze",
        heroSrc: "/images/elegancia/gallery-01.webp",
        palette: {
          background: "#090709",
          surface: "#151015",
          surfaceSoft: "#1f1620",
          accent: "#D99B4F",
          accentSoft: "#EFC57C",
        },
        glowPrimary: "rgba(255,116,56,0.30)",
        glowSecondary: "rgba(239,197,124,0.18)",
      },
      {
        id: "royal-ink",
        heroSrc: "/images/elegancia/gallery-02.webp",
        palette: {
          background: "#070A10",
          surface: "#101825",
          surfaceSoft: "#152135",
          accent: "#71AFFF",
          accentSoft: "#BADAFF",
        },
        glowPrimary: "rgba(90,153,255,0.29)",
        glowSecondary: "rgba(186,218,255,0.17)",
      },
      {
        id: "crimson-smoke",
        heroSrc: "/images/elegancia/gallery-03.webp",
        palette: {
          background: "#0B0708",
          surface: "#1A1011",
          surfaceSoft: "#251517",
          accent: "#D47059",
          accentSoft: "#F0B39A",
        },
        glowPrimary: "rgba(214,112,89,0.28)",
        glowSecondary: "rgba(240,179,154,0.16)",
      },
      {
        id: "teal-night",
        heroSrc: "/images/elegancia/gallery-04.webp",
        palette: {
          background: "#060B0B",
          surface: "#0F1A19",
          surfaceSoft: "#162525",
          accent: "#53C5A8",
          accentSoft: "#9CE9D5",
        },
        glowPrimary: "rgba(83,197,168,0.29)",
        glowSecondary: "rgba(156,233,213,0.16)",
      },
      {
        id: "graphite-gold",
        heroSrc: "/images/elegancia/gallery-05.webp",
        palette: {
          background: "#080808",
          surface: "#131313",
          surfaceSoft: "#1D1D1F",
          accent: "#C99B46",
          accentSoft: "#E5C57E",
        },
        glowPrimary: "rgba(201,155,70,0.28)",
        glowSecondary: "rgba(229,197,126,0.16)",
      },
      {
        id: "copper-rose",
        heroSrc: "/images/elegancia/gallery-06.webp",
        palette: {
          background: "#0A070B",
          surface: "#17111B",
          surfaceSoft: "#221729",
          accent: "#CA89B0",
          accentSoft: "#E8B9D9",
        },
        glowPrimary: "rgba(202,137,176,0.29)",
        glowSecondary: "rgba(232,185,217,0.16)",
      },
      {
        id: "emerald-club",
        heroSrc: "/images/elegancia/gallery-07.webp",
        palette: {
          background: "#060A08",
          surface: "#101A14",
          surfaceSoft: "#18261D",
          accent: "#61C989",
          accentSoft: "#A8E9C1",
        },
        glowPrimary: "rgba(97,201,137,0.28)",
        glowSecondary: "rgba(168,233,193,0.16)",
      },
      {
        id: "steel-cyan",
        heroSrc: "/images/elegancia/gallery-08.webp",
        palette: {
          background: "#06090B",
          surface: "#111821",
          surfaceSoft: "#192430",
          accent: "#8ABBD9",
          accentSoft: "#C7E2F1",
        },
        glowPrimary: "rgba(138,187,217,0.29)",
        glowSecondary: "rgba(199,226,241,0.16)",
      },
      {
        id: "sunset-copper",
        heroSrc: "/images/elegancia/gallery-09.webp",
        palette: {
          background: "#0B0806",
          surface: "#1B120F",
          surfaceSoft: "#281C16",
          accent: "#DD8752",
          accentSoft: "#F2C09E",
        },
        glowPrimary: "rgba(221,135,82,0.30)",
        glowSecondary: "rgba(242,192,158,0.18)",
      },
      {
        id: "olive-noir",
        heroSrc: "/images/elegancia/gallery-10.webp",
        palette: {
          background: "#070906",
          surface: "#12170F",
          surfaceSoft: "#1D2418",
          accent: "#A8C050",
          accentSoft: "#D9E79D",
        },
        glowPrimary: "rgba(168,192,80,0.28)",
        glowSecondary: "rgba(217,231,157,0.16)",
      },
    ],
    logoCard: "/images/elegancia/brand-logo-elegancia.png",
    addressCard: "/images/elegancia/brand-contact-premium.webp",
    qrCode: "/images/elegancia/brand-contact-premium.webp",
  },
  nav: [
    { label: "Início", href: "/#inicio" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contato", href: "/#contato" },
  ],
  whatsappBookingTemplate:
    "Olá! Vim pelo site da Elegância Barbearia e quero agendar um horário.\n\nNome:\nTurno preferido (manhã/tarde/noite):\nHorário preferido:\nData sugerida (dd/mm/aaaa):\nServiço desejado (clássico premium/infantil/acabamento):\n\nSe tiver horário disponível, pode confirmar por aqui?",
};


import type { ClientProfileInput } from "../client-types";

export const augustusProfileInput: ClientProfileInput = {
  brand: {
    name: "Augustu's Barbearia",
    tagline: "Dedicação e estilo a cada corte.",
    instagramHandle: "@augustobarbeariaoficial",
    instagramUrl: "https://www.instagram.com/augustobarbeariaoficial/",
    secondaryInstagramHandle: "@espacooficial.patyeaugustus",
    secondaryInstagramUrl: "https://www.instagram.com/espacooficial.patyeaugustus/",
    defaultPhoneRaw: "5551981311911",
    addressLine: "Rua Lino Estacio dos Santos, 160 - Sala 2",
    city: "Centro, Gravataí - RS",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Lino+Estacio+dos+Santos,+160,+Gravatai,+RS",
  },
  metadata: {
    siteUrl: "https://augustus-barbearia.vercel.app",
  },
  // Plano comercial deste cliente.
  // Troque entre: "basic" | "normal" | "premium" | "superPremium".
  // Se quiser ajustar algum modulo ou limite sem mudar tier, use `modules` e `limits`.
  // Define se a galeria usa o rodízio animado (efeito Thanos snap).
  // false = fotos estáticas, sem troca automática.
  galleryAnimation: true,
  plan: {
    tier: "basic",
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
    background: "#060606",
    surface: "#101114",
    surfaceSoft: "#171920",
    accent: "#C6973A",
    accentSoft: "#E2BA6C",
    text: "#F5F0E5",
    textSoft: "#B8B6AE",
  },
  hero: {
    eyebrow: "Barbearia premium em Gravataí",
    title: "Visual impecável para quem quer chegar marcando presença",
    description:
      "Cortes masculinos e infantis com acabamento detalhado, atendimento próximo e ambiente preparado para você sair no melhor estilo.",
    primaryCtaLabel: "Agendar no WhatsApp",
    secondaryCtaLabel: "Ver Instagram",
  },
  services: [
    {
      title: "Corte Premium",
      description:
        "Corte personalizado com degradê limpo, alinhamento e finalização para o dia a dia ou evento.",
      duration: "40 min",
      highlight: "Mais pedido da semana",
    },
    {
      title: "Corte Infantil",
      description:
        "Atendimento paciente e técnico para crianças, com foco no conforto e no resultado.",
      duration: "35 min",
      highlight: "Especialidade da casa",
    },
    {
      title: "Acabamento e Detalhes",
      description:
        "Refino rápido para manter o corte em dia, incluindo contorno, nuca e ajuste de laterais.",
      duration: "20 min",
      highlight: "Ideal entre cortes",
    },
  ],
  differentiators: [
    "Atendimento direto com profissional experiente",
    "Padrão visual premium com foco em acabamento",
    "Espaço acolhedor para público masculino e infantil",
    "Facilidade para agendar por WhatsApp ou Instagram",
  ],
  workingHours: [
    "Segunda a sexta: 09:00 às 19:00",
    "Sábado: 09:00 às 18:00",
    "Domingo: atendimento sob consulta",
  ],
  gallery: [
    { src: "/images/augustus/gallery-01.webp", alt: "Corte infantil com degradê e topo texturizado" },
    { src: "/images/augustus/gallery-02.webp", alt: "Corte infantil com volume e acabamento natural" },
    { src: "/images/augustus/gallery-04.webp", alt: "Corte infantil com degradê baixo e topo alinhado" },
    { src: "/images/augustus/gallery-03.webp", alt: "Cliente e barbeiro em atendimento na barbearia" },
    { src: "/images/augustus/gallery-05.webp", alt: "Corte infantil clássico com textura lateral" },
  ],
  featuredImages: {
    hero: "/images/augustus/hero-principal.webp",
    heroVariants: [
      "/images/augustus/hero-variant-01.webp",
      "/images/augustus/hero-variant-02.webp",
      "/images/augustus/hero-variant-03.webp",
      "/images/augustus/hero-variant-04.webp",
      "/images/augustus/hero-variant-05.webp",
      "/images/augustus/hero-variant-06.webp",
      "/images/augustus/hero-variant-07.webp",
      "/images/augustus/hero-variant-08.webp",
      "/images/augustus/hero-variant-09.webp",
      "/images/augustus/hero-variant-10.webp",
    ],
    heroThemeVariants: [
      {
        id: "ember-bronze",
        heroSrc: "/images/augustus/hero-variant-01.webp",
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
        heroSrc: "/images/augustus/hero-variant-02.webp",
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
        heroSrc: "/images/augustus/hero-variant-03.webp",
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
        heroSrc: "/images/augustus/hero-variant-04.webp",
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
        heroSrc: "/images/augustus/hero-variant-05.webp",
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
        heroSrc: "/images/augustus/hero-variant-06.webp",
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
        heroSrc: "/images/augustus/hero-variant-07.webp",
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
        heroSrc: "/images/augustus/hero-variant-08.webp",
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
        heroSrc: "/images/augustus/hero-variant-09.webp",
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
        heroSrc: "/images/augustus/hero-variant-10.webp",
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
    logoCard: "/images/augustus/brand-logo-address-card.webp",
    addressCard: "/images/augustus/brand-campaign-card.webp",
    qrCode: "/images/augustus/instagram-qrcode.webp",
  },
  nav: [
    { label: "Início", href: "/#inicio" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contato", href: "/#contato" },
  ],
  whatsappBookingTemplate:
    "Olá! Vim pelo site e quero agendar um corte.\n\nNome:\nTurno preferido (manhã/tarde/noite):\nHorário preferido:\nData sugerida (dd/mm/aaaa):\nServiço desejado (premium/infantil/acabamento):\n\nSe tiver horário disponível, pode confirmar por aqui?",
};

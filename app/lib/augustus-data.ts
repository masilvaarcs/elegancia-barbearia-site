export type ServiceItem = {
  title: string;
  description: string;
  duration: string;
  highlight: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
};

const defaultClientPhoneRaw = "5551981311911";

function sanitizePhoneRaw(value: string | undefined) {
  return (value ?? "").replace(/\D/g, "");
}

function formatPhoneDisplay(phoneRaw: string) {
  if (phoneRaw.startsWith("55")) {
    const areaCode = phoneRaw.slice(2, 4);
    const localNumber = phoneRaw.slice(4);

    if (localNumber.length === 9) {
      return `(${areaCode}) ${localNumber.slice(0, 5)}-${localNumber.slice(5)}`;
    }

    if (localNumber.length === 8) {
      return `(${areaCode}) ${localNumber.slice(0, 4)}-${localNumber.slice(4)}`;
    }
  }

  return `+${phoneRaw}`;
}

function getWhatsappPhoneRaw() {
  const isProduction = process.env.NODE_ENV === "production";
  const devPhoneRaw = sanitizePhoneRaw(process.env.NEXT_PUBLIC_WHATSAPP_DEV_PHONE);
  const prodPhoneRaw = sanitizePhoneRaw(process.env.NEXT_PUBLIC_WHATSAPP_PROD_PHONE);
  const fallbackProdPhoneRaw = prodPhoneRaw || defaultClientPhoneRaw;

  if (isProduction) {
    return fallbackProdPhoneRaw;
  }

  if (devPhoneRaw) {
    return devPhoneRaw;
  }

  return fallbackProdPhoneRaw;
}

const whatsappPhoneRaw = getWhatsappPhoneRaw();

const whatsappBookingTemplate =
  "Ola! Vim pelo site e quero agendar um corte.\n\nNome:\nTurno preferido (manha/tarde/noite):\nHorario preferido:\nData sugerida:\nServico desejado (premium/infantil/acabamento):\n\nSe tiver horario disponivel, pode confirmar por aqui?";

export const augustusData = {
  brand: {
    name: "Augustu's Barbearia",
    tagline: "Dedicacao e estilo a cada corte.",
    instagramHandle: "@augustobarbeariaoficial",
    instagramUrl: "https://www.instagram.com/augustobarbeariaoficial/",
    secondaryInstagramHandle: "@espacooficial.patyeaugustus",
    secondaryInstagramUrl: "https://www.instagram.com/espacooficial.patyeaugustus/",
    phoneDisplay: formatPhoneDisplay(whatsappPhoneRaw),
    phoneRaw: whatsappPhoneRaw,
    whatsappUrl: `https://wa.me/${whatsappPhoneRaw}?text=${encodeURIComponent(whatsappBookingTemplate)}`,
    addressLine: "Rua Lino Estacio dos Santos, 160 - Sala 2",
    city: "Centro, Gravatai - RS",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Lino+Estacio+dos+Santos,+160,+Gravatai,+RS",
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
    eyebrow: "Barbearia premium em Gravatai",
    title: "Visual impecavel para quem quer chegar marcando presenca",
    description:
      "Cortes masculinos e infantis com acabamento detalhado, atendimento proximo e ambiente preparado para voce sair no melhor estilo.",
    primaryCtaLabel: "Agendar no WhatsApp",
    secondaryCtaLabel: "Ver Instagram",
  },
  services: [
    {
      title: "Corte Premium",
      description:
        "Corte personalizado com degradê limpo, alinhamento e finalizacao para o dia a dia ou evento.",
      duration: "40 min",
      highlight: "Mais pedido da semana",
    },
    {
      title: "Corte Infantil",
      description:
        "Atendimento paciente e tecnico para criancas, com foco no conforto e no resultado.",
      duration: "35 min",
      highlight: "Especialidade da casa",
    },
    {
      title: "Acabamento e Detalhes",
      description:
        "Refino rapido para manter o corte em dia, incluindo contorno, nuca e ajuste de laterais.",
      duration: "20 min",
      highlight: "Ideal entre cortes",
    },
  ] as ServiceItem[],
  differentiators: [
    "Atendimento direto com profissional experiente",
    "Padrao visual premium com foco em acabamento",
    "Espaco acolhedor para publico masculino e infantil",
    "Facilidade para agendar por WhatsApp ou Instagram",
  ],
  workingHours: [
    "Segunda a sexta: 09:00 as 19:00",
    "Sabado: 09:00 as 18:00",
    "Domingo: atendimento sob consulta",
  ],
  gallery: [
    { src: "/images/augustus/gallery-01.jpeg", alt: "Corte infantil com degradê e topo texturizado" },
    { src: "/images/augustus/gallery-02.jpeg", alt: "Corte infantil com volume e acabamento natural" },
    { src: "/images/augustus/gallery-03.jpeg", alt: "Cliente e barbeiro em atendimento na barbearia" },
    { src: "/images/augustus/gallery-04.jpeg", alt: "Corte infantil com degradê baixo e topo alinhado" },
    { src: "/images/augustus/gallery-05.jpeg", alt: "Corte infantil classico com textura lateral" },
  ] as GalleryItem[],
  featuredImages: {
    hero: "/images/augustus/hero-principal.jpg",
    logoCard: "/images/augustus/brand-logo-card.jpeg",
    addressCard: "/images/augustus/brand-address-card.jpeg",
    qrCode: "/images/augustus/instagram-qrcode.jpeg",
  },
  nav: [
    { label: "Inicio", href: "/#inicio" },
    { label: "Servicos", href: "/#servicos" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contato", href: "/#contato" },
  ],
};

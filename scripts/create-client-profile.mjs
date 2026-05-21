import fs from "node:fs";
import path from "node:path";

function toSafeClientId(raw) {
  return (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toPascalCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function ensureClientMapEntry(indexContent, clientId, constName) {
  const token = "export const clientProfiles: Record<string, ClientProfileInput> = {\n";
  const start = indexContent.indexOf(token);

  if (start < 0) {
    throw new Error("Nao foi possivel localizar clientProfiles em app/lib/clients/index.ts");
  }

  const mapStart = start + token.length;
  const mapEnd = indexContent.indexOf("};", mapStart);

  if (mapEnd < 0) {
    throw new Error("Nao foi possivel localizar o fim de clientProfiles em app/lib/clients/index.ts");
  }

  const mapBody = indexContent.slice(mapStart, mapEnd);

  if (mapBody.includes(`${clientId}:`)) {
    return indexContent;
  }

  const nextMapBody = `${mapBody}  ${clientId}: ${constName},\n`;
  return `${indexContent.slice(0, mapStart)}${nextMapBody}${indexContent.slice(mapEnd)}`;
}

const rawClientId = process.argv[2];
const clientId = toSafeClientId(rawClientId);

if (!clientId) {
  console.error("Uso: pnpm create:client <cliente-id>");
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(clientId)) {
  console.error("cliente-id invalido. Use letras minusculas, numeros e hifen, iniciando com letra.");
  process.exit(1);
}

const workspaceRoot = process.cwd();
const clientsDir = path.join(workspaceRoot, "app", "lib", "clients");
const profilePath = path.join(clientsDir, `${clientId}.ts`);
const imagesDir = path.join(workspaceRoot, "public", "images", clientId);
const gitkeepPath = path.join(imagesDir, ".gitkeep");
const indexPath = path.join(clientsDir, "index.ts");

if (fs.existsSync(profilePath)) {
  console.error(`Perfil ja existe: ${profilePath}`);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error("Nao foi encontrado app/lib/clients/index.ts");
  process.exit(1);
}

const pascalName = toPascalCase(clientId);
const constName = `${pascalName}ProfileInput`;
const profileContent = `import type { ClientProfileInput } from "../client-types";

export const ${constName}: ClientProfileInput = {
  brand: {
    name: "Cliente Exemplo",
    tagline: "Atendimento premium e objetivo.",
    instagramHandle: "@clienteexemplo",
    instagramUrl: "https://www.instagram.com/clienteexemplo/",
    secondaryInstagramHandle: "@parceiroexemplo",
    secondaryInstagramUrl: "https://www.instagram.com/parceiroexemplo/",
    defaultPhoneRaw: "5551999999999",
    addressLine: "Rua Exemplo, 100",
    city: "Centro, Cidade - UF",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Exemplo,+100",
  },
  metadata: {
    siteUrl: "https://${clientId}.exemplo.com",
  },
  plan: {
    tier: "basic",
    // tiers padrao: basic (entrada), normal (com WhatsApp), premium (Agendar + WhatsApp), superPremium
    // Exemplo de override por cliente:
    // modules: { premiumConcierge: false, bookingCta: false, whatsappCta: true },
    // limits: { galleryRealMaxItems: 3 },
  },
  theme: {
    mode: "randomOnLoad",
    // Para travar uma cor/variante para este cliente, use:
    // mode: "fixed",
    // fixedVariantId: "warm-gold",
    // fixedVariantIndex: 0,
  },
  palette: {
    background: "#0A0A0A",
    surface: "#121212",
    surfaceSoft: "#1A1A1A",
    accent: "#C6973A",
    accentSoft: "#E2BA6C",
    text: "#F5F0E5",
    textSoft: "#B8B6AE",
  },
  hero: {
    eyebrow: "Especialista em cortes premium",
    title: "Visual alinhado com atendimento rapido",
    description:
      "Cortes masculinos com acabamento de alto padrao e agendamento simples pelo WhatsApp.",
    primaryCtaLabel: "Agendar no WhatsApp",
    secondaryCtaLabel: "Ver Instagram",
  },
  services: [
    {
      title: "Corte Premium",
      description: "Corte completo com acabamento detalhado para dia a dia e eventos.",
      duration: "40 min",
      highlight: "Mais pedido",
    },
    {
      title: "Corte Infantil",
      description: "Atendimento paciente para criancas com foco em conforto.",
      duration: "35 min",
      highlight: "Especialidade",
    },
    {
      title: "Acabamento",
      description: "Refino rapido para manter o visual em dia entre cortes.",
      duration: "20 min",
      highlight: "Manutencao",
    },
  ],
  differentiators: [
    "Atendimento direto com profissional experiente",
    "Padrao visual premium em cada corte",
    "Fluxo de agendamento rapido no WhatsApp",
    "Comunicacao clara e objetiva",
  ],
  workingHours: [
    "Segunda a sexta: 09:00 as 19:00",
    "Sabado: 09:00 as 18:00",
    "Domingo: sob consulta",
  ],
  gallery: [
    { src: "/images/${clientId}/gallery-01.jpeg", alt: "Corte com acabamento detalhado" },
    { src: "/images/${clientId}/gallery-02.jpeg", alt: "Visual premium em cliente" },
    { src: "/images/${clientId}/gallery-03.jpeg", alt: "Atendimento em andamento" },
    { src: "/images/${clientId}/gallery-04.jpeg", alt: "Corte com estilo moderno" },
    { src: "/images/${clientId}/gallery-05.jpeg", alt: "Resultado final do corte" },
  ],
  featuredImages: {
    hero: "/images/${clientId}/hero-principal.jpg",
    heroVariants: [
      "/images/${clientId}/hero-variant-01.jpg",
      "/images/${clientId}/hero-variant-02.jpg",
      "/images/${clientId}/hero-variant-03.jpg",
      "/images/${clientId}/hero-variant-04.jpg",
      "/images/${clientId}/hero-variant-05.jpg",
      "/images/${clientId}/hero-variant-06.jpg",
      "/images/${clientId}/hero-variant-07.jpg",
      "/images/${clientId}/hero-variant-08.jpg",
      "/images/${clientId}/hero-variant-09.jpg",
      "/images/${clientId}/hero-variant-10.jpg",
    ],
    heroThemeVariants: [
      {
        id: "warm-gold",
        heroSrc: "/images/${clientId}/hero-variant-01.jpg",
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
    ],
    logoCard: "/images/${clientId}/brand-logo-card.jpeg",
    addressCard: "/images/${clientId}/brand-address-card.jpeg",
    qrCode: "/images/${clientId}/instagram-qrcode.jpeg",
  },
  nav: [
    { label: "Inicio", href: "/#inicio" },
    { label: "Servicos", href: "/#servicos" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contato", href: "/#contato" },
  ],
  whatsappBookingTemplate:
    "Ola! Vim pelo site e quero agendar um corte.\\n\\nNome:\\nTurno preferido (manha/tarde/noite):\\nHorario preferido:\\nData sugerida (dd/mm/aaaa):\\nServico desejado (premium/infantil/acabamento):\\n\\nSe tiver horario disponivel, pode confirmar por aqui?",
};
`;

fs.writeFileSync(profilePath, profileContent, "utf8");
fs.mkdirSync(imagesDir, { recursive: true });
fs.writeFileSync(gitkeepPath, "", "utf8");

let indexContent = fs.readFileSync(indexPath, "utf8");
const importLine = `import { ${constName} } from "./${clientId}";`;

if (!indexContent.includes(importLine)) {
  const anchorImport = 'import { augustusProfileInput } from "./augustus";';

  if (!indexContent.includes(anchorImport)) {
    throw new Error("Nao foi possivel localizar o import base em app/lib/clients/index.ts");
  }

  indexContent = indexContent.replace(anchorImport, `${anchorImport}\n${importLine}`);
}

indexContent = ensureClientMapEntry(indexContent, clientId, constName);
fs.writeFileSync(indexPath, indexContent, "utf8");

console.log(`Perfil criado com sucesso: app/lib/clients/${clientId}.ts`);
console.log(`Pasta de imagens criada: public/images/${clientId}`);
console.log(`Atualize .env com NEXT_PUBLIC_CLIENT_ID=${clientId}`);
console.log(`Gere 10 variacoes de hero com: pnpm hero:variants -- -ClientId ${clientId}`);
console.log("Ajuste heroThemeVariants no perfil para casar com a identidade visual do novo cliente.");

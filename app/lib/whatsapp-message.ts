export type WhatsAppShift = "manhã" | "tarde" | "noite";

export type WhatsAppHaircutReference = {
  number?: number | null;
  name?: string | null;
  tone?: string | null;
  description?: string | null;
};

export type WhatsAppBookingMessageInput = {
  name?: string;
  phone?: string;
  shift?: WhatsAppShift;
  preferredTime?: string;
  preferredDate?: string;
  service?: string;
  goal?: string;
  notes?: string;
  reference?: WhatsAppHaircutReference | null;
  now?: Date;
};

export function toWhatsAppUrl(phoneRaw: string, lines: string[]) {
  return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function formatWhatsAppDate(date = new Date()) {
  return date.toLocaleDateString("pt-BR");
}

export function getDefaultWhatsAppTime(shift: WhatsAppShift | string | undefined) {
  switch (shift) {
    case "manhã":
      return "09:00";
    case "tarde":
      return "14:00";
    case "noite":
      return "18:00";
    default:
      return "09:00";
  }
}

export function buildProfessionalWhatsAppPromptLines(options: WhatsAppBookingMessageInput = {}) {
  const now = options.now ?? new Date();
  const shift = options.shift ?? "manhã";
  const preferredTime = options.preferredTime?.trim() || getDefaultWhatsAppTime(shift);
  const preferredDate = options.preferredDate?.trim() || formatWhatsAppDate(now);
  const name = options.name?.trim() || "Amigo";
  const service = options.service?.trim() || "Corte Clássico Premium";
  const goal = options.goal?.trim() || "a definir com a equipe";
  const notes = options.notes?.trim() || "sem observações";
  const reference = options.reference ?? null;
  const referenceLabel = reference?.number != null && reference?.name
    ? `#${String(reference.number).padStart(2, "0")} - ${reference.name}`
    : "Escolher na hora com o barbeiro (padrão)";

  const lines = [
    "Olá! Vim pelo site da Elegância Barbearia.",
    "Para ter uma melhor experiência, informe seu nome para um atendimento especial e personalizado.",
    "",
    `Nome: ${name}`,
    `Turno preferido: ${shift}`,
    `Horário preferido: ${preferredTime}`,
    `Data sugerida: ${preferredDate}`,
    `Serviço desejado: ${service}`,
  ];

  if (reference) {
    lines.push(
      `Modelo de corte (referência): ${referenceLabel}`,
      `Tom da referência: ${reference.tone?.trim() || "a definir na hora"}`,
      `Descrição da referência: ${reference.description?.trim() || "cliente vai decidir junto com o barbeiro no atendimento"}`,
    );
  }

  lines.push(
    `Objetivo de estilo: ${goal}`,
    `Observações: ${notes}`,
    "",
    "Pode me confirmar a melhor disponibilidade?",
  );

  return lines;
}

export function buildProfessionalWhatsAppUrl(phoneRaw: string, options: WhatsAppBookingMessageInput = {}) {
  return toWhatsAppUrl(phoneRaw, buildProfessionalWhatsAppPromptLines(options));
}

export function buildQuickWhatsAppPromptLines(name?: string) {
  const visitorName = name?.trim() || "Amigo";

  return [
    "Olá! Vim pelo site da Elegância Barbearia.",
    visitorName === "Amigo"
      ? "Para ter uma melhor experiência, informe seu nome para um atendimento especial e personalizado."
      : `Meu nome é ${visitorName}.`,
    "Gostaria de falar com a equipe.",
  ];
}

export function buildQuickWhatsAppUrl(phoneRaw: string, name?: string) {
  return toWhatsAppUrl(phoneRaw, buildQuickWhatsAppPromptLines(name));
}
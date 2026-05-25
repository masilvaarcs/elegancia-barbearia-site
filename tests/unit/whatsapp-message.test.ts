import { describe, expect, it } from "vitest";
import {
  buildProfessionalWhatsAppPromptLines,
  buildProfessionalWhatsAppUrl,
  buildQuickWhatsAppPromptLines,
  buildQuickWhatsAppUrl,
  formatWhatsAppDate,
  getDefaultWhatsAppTime,
} from "../../app/lib/whatsapp-message";

describe("whatsapp-message", () => {
  it("should use conservative defaults when no data is provided", () => {
    const lines = buildProfessionalWhatsAppPromptLines({ now: new Date("2026-05-24T10:00:00.000Z") });

    expect(lines).toContain("Nome: Amigo");
    expect(lines).toContain("Turno preferido: manhã");
    expect(lines).toContain("Horário preferido: 09:00");
    expect(lines).toContain("Data sugerida: 24/05/2026");
    expect(lines).toContain("Serviço desejado: Corte Clássico Premium");
  });

  it("should respect provided data for shift and explicit values", () => {
    const lines = buildProfessionalWhatsAppPromptLines({
      name: "Marcos",
      shift: "tarde",
      preferredTime: "15:30",
      preferredDate: "25/05/2026",
      service: "Corte Infantil com Cuidado",
      goal: "visual discreto",
      notes: "sem observações",
    });

    expect(lines).toContain("Nome: Marcos");
    expect(lines).toContain("Turno preferido: tarde");
    expect(lines).toContain("Horário preferido: 15:30");
    expect(lines).toContain("Data sugerida: 25/05/2026");
    expect(lines).toContain("Serviço desejado: Corte Infantil com Cuidado");
    expect(lines).toContain("Objetivo de estilo: visual discreto");
  });

  it("should build a quick WhatsApp message with the saved name when available", () => {
    const lines = buildQuickWhatsAppPromptLines("João");

    expect(lines).toContain("Meu nome é João.");
    expect(lines).not.toContain("informe seu nome");
  });

  it("should keep the quick prompt professional when the name is unknown", () => {
    const lines = buildQuickWhatsAppPromptLines();

    expect(lines).toContain("Para ter uma melhor experiência, informe seu nome para um atendimento especial e personalizado.");
  });

  it("should generate valid WhatsApp URLs", () => {
    expect(buildProfessionalWhatsAppUrl("5551984228067", { name: "Cliente" })).toContain("wa.me/5551984228067");
    expect(buildQuickWhatsAppUrl("5551984228067", "Cliente")).toContain("wa.me/5551984228067");
  });

  it("should format defaults used by the helper", () => {
    expect(getDefaultWhatsAppTime("manhã")).toBe("09:00");
    expect(getDefaultWhatsAppTime("tarde")).toBe("14:00");
    expect(getDefaultWhatsAppTime("noite")).toBe("18:00");
    expect(formatWhatsAppDate(new Date(2026, 4, 24))).toBe("24/05/2026");
  });
});
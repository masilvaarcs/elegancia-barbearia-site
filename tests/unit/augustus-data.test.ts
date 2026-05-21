import { augustusData, resolveClientPlan } from "../../app/lib/augustus-data";

describe("augustusData", () => {
  it("should expose public business contact info", () => {
    expect(augustusData.brand.name).toBe("Augustu's Barbearia");
    expect(augustusData.brand.phoneRaw).toMatch(/^55\d{10,11}$/);
    expect(augustusData.brand.whatsappUrl).toContain(`wa.me/${augustusData.brand.phoneRaw}`);
    expect(augustusData.brand.instagramHandle).toContain("augustobarbeariaoficial");
  });

  it("should include at least five gallery images", () => {
    expect(augustusData.gallery.length).toBeGreaterThanOrEqual(5);
    const sources = augustusData.gallery.map((item) => item.src);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("should define complete navigation anchors", () => {
    const hrefs = augustusData.nav.map((item) => item.href);
    expect(hrefs).toContain("/#inicio");
    expect(hrefs).toContain("/#servicos");
    expect(hrefs).toContain("/#galeria");
    expect(hrefs).toContain("/#contato");
  });
});

describe("resolveClientPlan — plano Basic", () => {
  const plan = resolveClientPlan({ tier: "basic" });

  it("tier deve ser basic", () => {
    expect(plan.tier).toBe("basic");
  });

  it("sem Agendar (bookingCta = false)", () => {
    expect(plan.modules.bookingCta).toBe(false);
  });

  it("sem WhatsApp (whatsappCta = false)", () => {
    expect(plan.modules.whatsappCta).toBe(false);
  });

  it("sem Premium Concierge", () => {
    expect(plan.modules.premiumConcierge).toBe(false);
  });

  it("galeria limitada a 3 fotos", () => {
    expect(plan.limits.galleryRealMaxItems).toBe(3);
  });

  it("serviços e contato habilitados", () => {
    expect(plan.modules.services).toBe(true);
    expect(plan.modules.contact).toBe(true);
    expect(plan.modules.gallery).toBe(true);
  });
});

describe("resolveClientPlan — plano Normal", () => {
  const plan = resolveClientPlan({ tier: "normal" });

  it("tier deve ser normal", () => {
    expect(plan.tier).toBe("normal");
  });

  it("sem Agendar (bookingCta = false)", () => {
    expect(plan.modules.bookingCta).toBe(false);
  });

  it("com WhatsApp (whatsappCta = true)", () => {
    expect(plan.modules.whatsappCta).toBe(true);
  });

  it("sem Premium Concierge", () => {
    expect(plan.modules.premiumConcierge).toBe(false);
  });

  it("galeria limitada a 6 fotos", () => {
    expect(plan.limits.galleryRealMaxItems).toBe(6);
  });

  it("serviços e contato habilitados", () => {
    expect(plan.modules.services).toBe(true);
    expect(plan.modules.contact).toBe(true);
    expect(plan.modules.gallery).toBe(true);
  });
});

describe("resolveClientPlan — plano Premium", () => {
  const plan = resolveClientPlan({ tier: "premium" });

  it("tier deve ser premium", () => {
    expect(plan.tier).toBe("premium");
  });

  it("com Agendar (bookingCta = true)", () => {
    expect(plan.modules.bookingCta).toBe(true);
  });

  it("com WhatsApp (whatsappCta = true)", () => {
    expect(plan.modules.whatsappCta).toBe(true);
  });

  it("com Premium Concierge", () => {
    expect(plan.modules.premiumConcierge).toBe(true);
  });

  it("galeria limitada a 10 fotos", () => {
    expect(plan.limits.galleryRealMaxItems).toBe(10);
  });

  it("serviços e contato habilitados", () => {
    expect(plan.modules.services).toBe(true);
    expect(plan.modules.contact).toBe(true);
    expect(plan.modules.gallery).toBe(true);
  });
});

describe("resolveClientPlan — plano SuperPremium", () => {
  const plan = resolveClientPlan({ tier: "superPremium" });

  it("tier deve ser superPremium", () => {
    expect(plan.tier).toBe("superPremium");
  });

  it("com Agendar (bookingCta = true)", () => {
    expect(plan.modules.bookingCta).toBe(true);
  });

  it("com WhatsApp (whatsappCta = true)", () => {
    expect(plan.modules.whatsappCta).toBe(true);
  });

  it("com Premium Concierge", () => {
    expect(plan.modules.premiumConcierge).toBe(true);
  });

  it("galeria limitada a 14 fotos", () => {
    expect(plan.limits.galleryRealMaxItems).toBe(14);
  });

  it("serviços e contato habilitados", () => {
    expect(plan.modules.services).toBe(true);
    expect(plan.modules.contact).toBe(true);
    expect(plan.modules.gallery).toBe(true);
  });
});

describe("resolveClientPlan — fallback sem plano declarado", () => {
  it("cliente sem plano deve receber Basic por padrão", () => {
    const plan = resolveClientPlan(undefined);
    expect(plan.tier).toBe("basic");
    expect(plan.modules.bookingCta).toBe(false);
    expect(plan.modules.whatsappCta).toBe(false);
    expect(plan.limits.galleryRealMaxItems).toBe(3);
  });
});

describe("resolveClientPlan — sobrescrita seletiva de módulo", () => {
  it("Basic com whatsappCta=true por override de módulo", () => {
    const plan = resolveClientPlan({ tier: "basic", modules: { whatsappCta: true } });
    expect(plan.tier).toBe("basic");
    expect(plan.modules.whatsappCta).toBe(true);
    expect(plan.modules.bookingCta).toBe(false);
    expect(plan.limits.galleryRealMaxItems).toBe(3);
  });

  it("Normal com limite customizado de galeria", () => {
    const plan = resolveClientPlan({ tier: "normal", limits: { galleryRealMaxItems: 4 } });
    expect(plan.tier).toBe("normal");
    expect(plan.limits.galleryRealMaxItems).toBe(4);
    expect(plan.modules.whatsappCta).toBe(true);
  });
});

import { expect, test } from "@playwright/test";

function decodeWhatsAppMessage(href: string | null) {
  if (!href) {
    return "";
  }

  const url = new URL(href);
  const raw = url.searchParams.get("text") ?? "";
  return decodeURIComponent(raw);
}

test.describe("booking reference mapping", () => {
  test("should include haircut mapping details in signin WhatsApp message", async ({ page }) => {
    await page.goto("/signin");

    await page.getByRole("button", { name: /taper fade/i }).click();
    await page.getByLabel("Nome").fill("Cliente Teste");
    await page.getByLabel("Telefone").fill("51999999999");

    const whatsappHref = await page.getByRole("link", { name: /continuar no whatsapp/i }).getAttribute("href");
    const message = decodeWhatsAppMessage(whatsappHref);

    expect(message).toContain("Modelo de corte (referência): #15 - Taper Fade");
    expect(message).toContain("Tom da referência: loiro natural");
    expect(message).toContain("Descrição da referência: O cabelo vai afinando de forma gradual");
  });

  test("should include haircut mapping details in concierge WhatsApp message", async ({ page }) => {
    await page.goto("/#concierge");

    await page.getByRole("button", { name: /slick back/i }).click();
    await page.getByLabel("Nome").fill("Cliente Concierge");

    const whatsappHref = await page.getByRole("link", { name: /enviar dados no whatsapp/i }).getAttribute("href");
    const message = decodeWhatsAppMessage(whatsappHref);

    expect(message).toContain("Modelo de corte (referência): #13 - Slick Back");
    expect(message).toContain("Tom da referência: preto brilhante");
    expect(message).toContain("Descrição da referência: Todo o cabelo é penteado para trás");
  });
});
import { expect, test } from "@playwright/test";

test.describe("site navigation", () => {
  test("should navigate through all public pages on desktop", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop-only navigation coverage");

    await page.goto("/");

    await expect(page.getByRole("heading", { name: /visual impecável/i })).toBeVisible();

    await page.getByRole("link", { name: /agendar/i }).first().click();
    await expect(page).toHaveURL(/\/signin$/);
    await expect(page.getByRole("heading", { name: /reserve seu horário/i })).toBeVisible();

    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /cadastro de fidelidade/i })).toBeVisible();

    await page.goto("/reset-password");
    await expect(page.getByRole("heading", { name: /reabrir atendimento/i })).toBeVisible();

    await page.goto("/");
    const desktopNav = page.locator("nav").first();

    await desktopNav.getByRole("link", { name: "Serviços" }).click();
    await expect(page).toHaveURL(/#servicos$/);

    await desktopNav.getByRole("link", { name: "Galeria" }).click();
    await expect(page).toHaveURL(/#galeria$/);

    await desktopNav.getByRole("link", { name: "Contato" }).click();
    await expect(page).toHaveURL(/#contato$/);
  });

  test("should render critical CTAs on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only CTA coverage");

    await page.goto("/");

    await expect(page.getByRole("link", { name: /whatsapp/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /resultados reais da barbearia/i })).toBeVisible();

    await page.goto("/signin");
    await expect(page.getByRole("link", { name: /continuar no whatsapp/i })).toBeVisible();
  });
});

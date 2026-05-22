import { expect, test } from "@playwright/test";

test.describe("mobile responsive layout", () => {
  test("should render core sections without horizontal clipping", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.getByTestId("hero-section")).toBeVisible();
    await expect(page.getByRole("heading", { name: /visual impecável/i })).toBeVisible();

    const galleryGrid = page.getByTestId("gallery-grid");
    await galleryGrid.scrollIntoViewIfNeeded();
    await expect(galleryGrid).toBeVisible();

    const phoneCard = page.getByTestId("phone-copy-card");
    await phoneCard.scrollIntoViewIfNeeded();
    await expect(phoneCard).toBeVisible();

    const viewport = page.viewportSize();
    const box = await phoneCard.boundingBox();

    expect(viewport).not.toBeNull();
    expect(box).not.toBeNull();
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual((viewport?.width ?? 0) - 1);
  });

  test("should avoid top gap excess, keep phone card uncut, and adapt gallery in portrait/landscape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only responsive coverage");

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const header = page.locator("header").first();
    const eyebrow = page.getByText(/barbearia premium em gravataí/i).first();

    await expect(header).toBeVisible();
    await expect(eyebrow).toBeVisible();

    const headerBox = await header.boundingBox();
    const eyebrowBox = await eyebrow.boundingBox();

    expect(headerBox).not.toBeNull();
    expect(eyebrowBox).not.toBeNull();

    const topGap = (eyebrowBox?.y ?? 0) - ((headerBox?.y ?? 0) + (headerBox?.height ?? 0));
    expect(topGap).toBeLessThan(92);

    const galleryGrid = page.getByTestId("gallery-grid");
    await galleryGrid.scrollIntoViewIfNeeded();
    await expect(galleryGrid).toBeVisible();

    const portraitColumns = await galleryGrid.evaluate((el) => {
      return getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length;
    });
    expect(portraitColumns).toBe(2);

    const phoneCard = page.getByTestId("phone-copy-card");
    await phoneCard.scrollIntoViewIfNeeded();
    await expect(phoneCard).toBeVisible();

    const numberLine = page.getByTestId("phone-copy-number");
    await expect(numberLine).toBeVisible();

    const portraitOverflow = await numberLine.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(portraitOverflow).toBeLessThanOrEqual(1);

    const viewportPortrait = page.viewportSize();
    const phoneCardPortraitBox = await phoneCard.boundingBox();
    expect(phoneCardPortraitBox).not.toBeNull();
    expect((phoneCardPortraitBox?.x ?? 0) + (phoneCardPortraitBox?.width ?? 0)).toBeLessThanOrEqual((viewportPortrait?.width ?? 0) - 1);

    await page.setViewportSize({ width: 915, height: 412 });
    await page.reload();
    await page.waitForLoadState("networkidle");

    const galleryLandscape = page.getByTestId("gallery-grid");
    await galleryLandscape.scrollIntoViewIfNeeded();
    await expect(galleryLandscape).toBeVisible();

    const landscapeColumns = await galleryLandscape.evaluate((el) => {
      return getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length;
    });
    expect(landscapeColumns).toBeGreaterThanOrEqual(3);

    const landscapePhoneCard = page.getByTestId("phone-copy-card");
    await landscapePhoneCard.scrollIntoViewIfNeeded();

    const landscapeNumberLine = page.getByTestId("phone-copy-number");
    const landscapeOverflow = await landscapeNumberLine.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(landscapeOverflow).toBeLessThanOrEqual(1);
  });
});

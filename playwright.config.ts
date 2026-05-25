import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm build && pnpm start:out",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 300_000,
    env: {
      // Garante que o build de teste sobe com superPremium habilitado,
      // sem alterar o plano do cliente (elegancia.ts) nem o build de producao.
      NEXT_PUBLIC_E2E_PLAN_TIER: "superPremium",
    },
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});

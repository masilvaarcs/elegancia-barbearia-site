import { cache } from "react";
import { clientProfiles, getAvailableClientIds, resolveClientId } from "./clients";
import { buildProfessionalWhatsAppUrl } from "./whatsapp-message";
import type {
  ActiveClientData,
  ClientModulesAvailability,
  ClientPlanInput,
  ClientPlanLimits,
  ClientPlanResolved,
  ClientPlanTier,
  ClientThemeSettingsInput,
  ClientThemeSettingsResolved,
  GalleryItem,
  NavItem,
  ServiceItem,
} from "./client-types";

export type { GalleryItem, ServiceItem };

// Tabela de oferta padrao por plano. Ajuste aqui quando mudarem os pacotes comerciais.
const PLAN_MODULE_DEFAULTS: Record<ClientPlanTier, ClientModulesAvailability> = {
  basic: {
    services: true,
    gallery: true,
    premiumConcierge: false,
    contact: true,
    bookingCta: false,
    whatsappCta: false,
  },
  normal: {
    services: true,
    gallery: true,
    premiumConcierge: false,
    contact: true,
    bookingCta: false,
    whatsappCta: true,
  },
  premium: {
    services: true,
    gallery: true,
    premiumConcierge: true,
    contact: true,
    bookingCta: true,
    whatsappCta: true,
  },
  superPremium: {
    services: true,
    gallery: true,
    premiumConcierge: true,
    contact: true,
    bookingCta: true,
    whatsappCta: true,
  },
};

// Limites padrao por plano. Pode ser sobrescrito no perfil do cliente em `plan.limits`.
const PLAN_LIMIT_DEFAULTS: Record<ClientPlanTier, ClientPlanLimits> = {
  basic: {
    galleryRealMaxItems: 3,
  },
  normal: {
    galleryRealMaxItems: 6,
  },
  premium: {
    galleryRealMaxItems: 10,
  },
  superPremium: {
    galleryRealMaxItems: 14,
  },
};

const THEME_DEFAULTS: ClientThemeSettingsResolved = {
  mode: "randomOnLoad",
};

const PLAN_TIER_SET: ReadonlySet<ClientPlanTier> = new Set([
  "basic",
  "normal",
  "premium",
  "superPremium",
]);

function asClientPlanTier(value: string | undefined): ClientPlanTier | undefined {
  const normalized = (value ?? "").trim();

  if (!normalized) {
    return undefined;
  }

  if (PLAN_TIER_SET.has(normalized as ClientPlanTier)) {
    return normalized as ClientPlanTier;
  }

  return undefined;
}

function asThemeMode(value: string | undefined): ClientThemeSettingsResolved["mode"] | undefined {
  const normalized = (value ?? "").trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized === "randomOnLoad" || normalized === "fixed") {
    return normalized;
  }

  return undefined;
}

function sanitizeGalleryLimit(value: number | undefined) {
  if (value == null) {
    return undefined;
  }

  if (!Number.isFinite(value)) {
    return undefined;
  }

  return Math.max(0, Math.floor(value));
}

function resolveClientPlan(planInput: ClientPlanInput | undefined): ClientPlanResolved {
  // Fallback global: cliente sem configuracao de plano entra como Basic.
  const tier = planInput?.tier ?? "basic";
  const modules = {
    ...PLAN_MODULE_DEFAULTS[tier],
    ...(planInput?.modules ?? {}),
  };
  const limits = {
    ...PLAN_LIMIT_DEFAULTS[tier],
    ...(planInput?.limits ?? {}),
    galleryRealMaxItems: sanitizeGalleryLimit(planInput?.limits?.galleryRealMaxItems ?? PLAN_LIMIT_DEFAULTS[tier].galleryRealMaxItems),
  };

  return {
    tier,
    modules,
    limits,
  };
}

function sanitizeThemeFixedIndex(value: number | undefined) {
  if (value == null || !Number.isFinite(value)) {
    return undefined;
  }

  return Math.max(0, Math.floor(value));
}

function resolveClientTheme(themeInput: ClientThemeSettingsInput | undefined): ClientThemeSettingsResolved {
  return {
    mode: themeInput?.mode ?? THEME_DEFAULTS.mode,
    fixedVariantId: themeInput?.fixedVariantId,
    fixedVariantIndex: sanitizeThemeFixedIndex(themeInput?.fixedVariantIndex),
  };
}

function resolveDevPlanOverrideTier() {
  // Override exclusivo para testes E2E (injetado via playwright.config webServer.env).
  // Funciona em builds de producao para que o site de testes rode com plano completo.
  const e2eTier = asClientPlanTier(process.env.NEXT_PUBLIC_E2E_PLAN_TIER);
  if (e2eTier) return e2eTier;

  // Seguranca comercial: em producao qualquer override de DEV e ignorado.
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }

  return asClientPlanTier(process.env.NEXT_PUBLIC_DEV_PLAN_TIER);
}

function resolveDevThemeOverride() {
  // Seguranca comercial: em producao qualquer override de DEV e ignorado.
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }

  const mode = asThemeMode(process.env.NEXT_PUBLIC_DEV_THEME_MODE);
  const fixedVariantId = (process.env.NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_ID ?? "").trim() || undefined;
  const fixedVariantIndex = sanitizeThemeFixedIndex(
    process.env.NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_INDEX
      ? Number(process.env.NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_INDEX)
      : undefined,
  );

  if (!mode && !fixedVariantId && fixedVariantIndex == null) {
    return undefined;
  }

  return {
    mode,
    fixedVariantId,
    fixedVariantIndex,
  } satisfies ClientThemeSettingsInput;
}

function filterNavByPlan(nav: NavItem[], modules: ClientModulesAvailability) {
  return nav.filter((item) => {
    if (item.href.endsWith("#servicos")) {
      return modules.services;
    }

    if (item.href.endsWith("#galeria")) {
      return modules.gallery;
    }

    if (item.href.endsWith("#contato")) {
      return modules.contact;
    }

    return true;
  });
}

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

function getWhatsappPhoneRaw(defaultPhoneRaw: string) {
  const isProduction = process.env.NODE_ENV === "production";
  const devPhoneRaw = sanitizePhoneRaw(process.env.NEXT_PUBLIC_WHATSAPP_DEV_PHONE);
  const prodPhoneRaw = sanitizePhoneRaw(process.env.NEXT_PUBLIC_WHATSAPP_PROD_PHONE);
  const fallbackProdPhoneRaw = prodPhoneRaw || sanitizePhoneRaw(defaultPhoneRaw);

  if (isProduction) {
    return fallbackProdPhoneRaw;
  }

  if (devPhoneRaw) {
    return devPhoneRaw;
  }

  return fallbackProdPhoneRaw;
}

function buildActiveClientData(clientId: string, devCookieTier?: ClientPlanTier): ActiveClientData {
  const profile = clientProfiles[clientId];
  const whatsappPhoneRaw = getWhatsappPhoneRaw(profile.brand.defaultPhoneRaw);
  // Cookie override (per-request, DEV only) tem prioridade sobre a variável de ambiente.
  const devPlanTier = devCookieTier ?? resolveDevPlanOverrideTier();
  const devThemeOverride = resolveDevThemeOverride();

  const effectivePlanInput: ClientPlanInput | undefined = devPlanTier
    ? {
      ...(profile.plan ?? {}),
      tier: devPlanTier,
    }
    : profile.plan;

  const effectiveThemeInput: ClientThemeSettingsInput | undefined = devThemeOverride
    ? {
      ...(profile.theme ?? {}),
      ...devThemeOverride,
    }
    : profile.theme;

  const plan = resolveClientPlan(effectivePlanInput);
  const theme = resolveClientTheme(effectiveThemeInput);

  return {
    clientId,
    ...profile,
    nav: filterNavByPlan(profile.nav, plan.modules),
    plan,
    theme,
    brand: {
      ...profile.brand,
      phoneDisplay: formatPhoneDisplay(whatsappPhoneRaw),
      phoneRaw: whatsappPhoneRaw,
      whatsappUrl: buildProfessionalWhatsAppUrl(whatsappPhoneRaw),
    },
  };
}

export const activeClientId = resolveClientId(process.env.NEXT_PUBLIC_CLIENT_ID);
export const availableClientIds = getAvailableClientIds();
export const activeClientData = buildActiveClientData(activeClientId);

// Compatibility alias for static contexts (metadata, generateStaticParams).
export const eleganciaData = activeClientData;

// Lê o cookie de override de plano DEV (_dev_plan) de forma segura.
// Usa dynamic import para evitar que next/headers marque rotas como dinâmicas em produção.
async function readDevPlanCookieTier(): Promise<ClientPlanTier | undefined> {
  if (process.env.NODE_ENV !== "development") return undefined;
  try {
    const { cookies } = await import("next/headers");
    const store = await cookies();
    return asClientPlanTier(store.get("_dev_plan")?.value);
  } catch {
    return undefined;
  }
}

// Versão per-request com React.cache — usa cookie de override quando disponível.
// Use esta função em Server Components para obter dados sempre atualizados em DEV.
export const getEleganciaData = cache(async (): Promise<ActiveClientData> => {
  const cookieTier = await readDevPlanCookieTier();
  return buildActiveClientData(activeClientId, cookieTier);
});

// Exported for unit testing — allows verifying plan resolution logic for any tier.
export { resolveClientPlan };


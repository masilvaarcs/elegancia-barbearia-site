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

export type NavItem = {
  label: string;
  href: string;
};

export type ClientPalette = {
  background: string;
  surface: string;
  surfaceSoft: string;
  accent: string;
  accentSoft: string;
  text: string;
  textSoft: string;
};

export type ClientThemeVariant = {
  id: string;
  heroSrc: string;
  palette?: Partial<Pick<ClientPalette, "background" | "surface" | "surfaceSoft" | "accent" | "accentSoft">>;
  glowPrimary?: string;
  glowSecondary?: string;
};

export type ClientPlanTier = "basic" | "normal" | "premium" | "superPremium";

export type ClientModuleKey =
  | "services"
  | "gallery"
  | "premiumConcierge"
  | "contact"
  | "bookingCta"
  | "whatsappCta";

export type ClientModulesAvailability = Record<ClientModuleKey, boolean>;

export type ClientPlanLimits = {
  galleryRealMaxItems?: number;
};

export type ClientPlanInput = {
  tier: ClientPlanTier;
  modules?: Partial<ClientModulesAvailability>;
  limits?: ClientPlanLimits;
};

export type ClientPlanResolved = {
  tier: ClientPlanTier;
  modules: ClientModulesAvailability;
  limits: ClientPlanLimits;
};

export type ClientThemeMode = "randomOnLoad" | "fixed";

export type ClientThemeSettingsInput = {
  mode?: ClientThemeMode;
  fixedVariantId?: string;
  fixedVariantIndex?: number;
};

export type ClientThemeSettingsResolved = {
  mode: ClientThemeMode;
  fixedVariantId?: string;
  fixedVariantIndex?: number;
};

export type ClientProfileInput = {
  brand: {
    name: string;
    tagline: string;
    instagramHandle: string;
    instagramUrl: string;
    secondaryInstagramHandle: string;
    secondaryInstagramUrl: string;
    defaultPhoneRaw: string;
    addressLine: string;
    city: string;
    mapsUrl: string;
  };
  metadata: {
    siteUrl: string;
  };
  palette: ClientPalette;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  services: ServiceItem[];
  differentiators: string[];
  workingHours: string[];
  gallery: GalleryItem[];
  featuredImages: {
    hero: string;
    heroVariants?: string[];
    heroThemeVariants?: ClientThemeVariant[];
    logoCard: string;
    addressCard: string;
    qrCode: string;
  };
  nav: NavItem[];
  // Controles de tema por cliente:
  // - randomOnLoad: muda cor/variante a cada carregamento
  // - fixed: fixa uma variante por id ou indice
  theme?: ClientThemeSettingsInput;
  // Oferta comercial por cliente: tier + overrides opcionais.
  plan?: ClientPlanInput;
  whatsappBookingTemplate: string;
};

export type ClientBrandResolved = ClientProfileInput["brand"] & {
  phoneDisplay: string;
  phoneRaw: string;
  whatsappUrl: string;
};

export type ActiveClientData = Omit<ClientProfileInput, "brand"> & {
  clientId: string;
  brand: ClientBrandResolved;
  plan: ClientPlanResolved;
  theme: ClientThemeSettingsResolved;
};

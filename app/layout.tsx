import "./css/style.css";

import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { augustusData, getAugustusData } from "@/app/lib/augustus-data";
import ThemeVariantProvider from "@/components/theme-variant-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
  display: "swap",
});

const metadataBaseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim() || augustusData.metadata.siteUrl;

export const metadata: Metadata = {
  title: {
    default: `${augustusData.brand.name} | ${augustusData.brand.city}`,
    template: `%s | ${augustusData.brand.name}`,
  },
  description: augustusData.hero.description,
  metadataBase: new URL(metadataBaseUrl),
  openGraph: {
    title: augustusData.brand.name,
    description: augustusData.hero.description,
    images: [augustusData.featuredImages.logoCard],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const augustusData = await getAugustusData();
  const defaultGlowPrimary = "rgba(198,151,58,0.22)";
  const defaultGlowSecondary = "rgba(226,186,108,0.15)";

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        style={{
          ["--augustus-gold" as string]: augustusData.palette.accent,
          ["--augustus-gold-soft" as string]: augustusData.palette.accentSoft,
          ["--augustus-surface" as string]: augustusData.palette.surface,
          ["--augustus-surface-soft" as string]: augustusData.palette.surfaceSoft,
          ["--augustus-bg-base" as string]: augustusData.palette.background,
          ["--augustus-bg-soft" as string]: augustusData.palette.surfaceSoft,
          ["--augustus-glow-primary" as string]: defaultGlowPrimary,
          ["--augustus-glow-secondary" as string]: defaultGlowSecondary,
          ["--augustus-header-bg" as string]: "rgba(10,10,10,0.78)",
          ["--augustus-footer-bg" as string]: augustusData.palette.background,
          ["--augustus-text" as string]: augustusData.palette.text,
          ["--augustus-text-soft" as string]: augustusData.palette.textSoft,
          ["--augustus-text-muted" as string]: augustusData.palette.textSoft,
          ["--augustus-on-accent" as string]: "#000000",
        }}
        className={`${manrope.variable} ${cormorant.variable} bg-[var(--augustus-bg-base)] font-inter tracking-tight text-[var(--augustus-text)] antialiased`}
      >
        <ThemeVariantProvider
          clientId={augustusData.clientId}
          basePalette={augustusData.palette}
          fallbackHeroSrc={augustusData.featuredImages.hero}
          variants={augustusData.featuredImages.heroThemeVariants}
          // Controle central de cor por cliente/plano:
          // - randomOnLoad: troca a cada acesso
          // - fixed: fixa variante por id/indice
          themeMode={augustusData.theme.mode}
          fixedVariantId={augustusData.theme.fixedVariantId}
          fixedVariantIndex={augustusData.theme.fixedVariantIndex}
        >
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeVariantProvider>
      </body>
    </html>
  );
}

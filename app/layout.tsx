import "./css/style.css";

import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { eleganciaData, getEleganciaData } from "@/app/lib/elegancia-data";
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

const metadataBaseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim() || eleganciaData.metadata.siteUrl;
const metadataDescription = "Barbearia premium com estilo clássico e atendimento de alto padrão em Gravataí - RS, bairro COHAB B. Cortes masculinos e infantis.";

export const metadata: Metadata = {
  title: {
    default: eleganciaData.brand.name,
    template: `%s | ${eleganciaData.brand.name}`,
  },
  description: metadataDescription,
  metadataBase: new URL(metadataBaseUrl),
  openGraph: {
    title: eleganciaData.brand.name,
    description: "Tradição, estilo e precisão em cada corte. Venha viver a experiência da Elegância Barbearia.",
    images: [eleganciaData.featuredImages.logoCard],
  },
  twitter: {
    card: "summary_large_image",
    title: eleganciaData.brand.name,
    description: "Tradição, estilo e precisão em cada corte. Venha viver a experiência da Elegância Barbearia.",
    images: [eleganciaData.featuredImages.logoCard],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const eleganciaData = await getEleganciaData();
  const defaultGlowPrimary = "rgba(198,151,58,0.22)";
  const defaultGlowSecondary = "rgba(226,186,108,0.15)";

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        style={{
          ["--elegancia-gold" as string]: eleganciaData.palette.accent,
          ["--elegancia-gold-soft" as string]: eleganciaData.palette.accentSoft,
          ["--elegancia-surface" as string]: eleganciaData.palette.surface,
          ["--elegancia-surface-soft" as string]: eleganciaData.palette.surfaceSoft,
          ["--elegancia-bg-base" as string]: eleganciaData.palette.background,
          ["--elegancia-bg-soft" as string]: eleganciaData.palette.surfaceSoft,
          ["--elegancia-glow-primary" as string]: defaultGlowPrimary,
          ["--elegancia-glow-secondary" as string]: defaultGlowSecondary,
          ["--elegancia-header-bg" as string]: "rgba(10,10,10,0.78)",
          ["--elegancia-footer-bg" as string]: eleganciaData.palette.background,
          ["--elegancia-text" as string]: eleganciaData.palette.text,
          ["--elegancia-text-soft" as string]: eleganciaData.palette.textSoft,
          ["--elegancia-text-muted" as string]: eleganciaData.palette.textSoft,
          ["--elegancia-on-accent" as string]: "#000000",
        }}
        className={`${manrope.variable} ${cormorant.variable} bg-[var(--elegancia-bg-base)] font-inter tracking-tight text-[var(--elegancia-text)] antialiased`}
      >
        <ThemeVariantProvider
          clientId={eleganciaData.clientId}
          basePalette={eleganciaData.palette}
          fallbackHeroSrc={eleganciaData.featuredImages.hero}
          variants={eleganciaData.featuredImages.heroThemeVariants}
          // Controle central de cor por cliente/plano:
          // - randomOnLoad: troca a cada acesso
          // - fixed: fixa variante por id/indice
          themeMode={eleganciaData.theme.mode}
          fixedVariantId={eleganciaData.theme.fixedVariantId}
          fixedVariantIndex={eleganciaData.theme.fixedVariantIndex}
        >
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeVariantProvider>
      </body>
    </html>
  );
}


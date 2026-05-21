"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ClientPalette, ClientThemeVariant } from "@/app/lib/client-types";

type ThemeVariantResolved = {
  id: string;
  heroSrc: string;
  palette: ClientPalette;
  glowPrimary: string;
  glowSecondary: string;
};

type ThemeVariantContextValue = {
  activeVariant: ThemeVariantResolved;
  activeIndex: number;
  totalVariants: number;
};

type ThemeVariantProviderProps = {
  clientId: string;
  basePalette: ClientPalette;
  fallbackHeroSrc: string;
  variants?: ClientThemeVariant[];
  themeMode?: "randomOnLoad" | "fixed";
  fixedVariantId?: string;
  fixedVariantIndex?: number;
  children: React.ReactNode;
};

const FALLBACK_GLOW_PRIMARY = "rgba(198,151,58,0.22)";
const FALLBACK_GLOW_SECONDARY = "rgba(226,186,108,0.15)";
const DEFAULT_TEXT_STRONG = "#F5F0E5";
const DEFAULT_TEXT_SOFT = "#B8B6AE";
const MIN_TEXT_CONTRAST = 4.5;
const MIN_TEXT_STRONG_CONTRAST = 7;

function toHexPair(value: string) {
  return value.length === 1 ? `${value}${value}` : value;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "").trim();

  if (normalized.length !== 3 && normalized.length !== 6) {
    return `rgba(0,0,0,${alpha})`;
  }

  const expanded = normalized.length === 3
    ? `${toHexPair(normalized[0])}${toHexPair(normalized[1])}${toHexPair(normalized[2])}`
    : normalized;

  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
}

type Rgb = {
  r: number;
  g: number;
  b: number;
};

function clampByte(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex: string): Rgb | null {
  const normalized = hex.replace("#", "").trim();

  if (normalized.length !== 3 && normalized.length !== 6) {
    return null;
  }

  const expanded = normalized.length === 3
    ? `${toHexPair(normalized[0])}${toHexPair(normalized[1])}${toHexPair(normalized[2])}`
    : normalized;

  const r = Number.parseInt(expanded.slice(0, 2), 16);
  const g = Number.parseInt(expanded.slice(2, 4), 16);
  const b = Number.parseInt(expanded.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return null;
  }

  return { r, g, b };
}

function rgbToHex(rgb: Rgb) {
  const toHex = (value: number) => clampByte(value).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function mixHex(fromHex: string, toHex: string, toWeight: number) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);

  if (!from && !to) {
    return DEFAULT_TEXT_STRONG;
  }

  if (!from) {
    return toHex;
  }

  if (!to) {
    return fromHex;
  }

  const weight = Math.max(0, Math.min(1, toWeight));

  return rgbToHex({
    r: from.r * (1 - weight) + to.r * weight,
    g: from.g * (1 - weight) + to.g * weight,
    b: from.b * (1 - weight) + to.b * weight,
  });
}

function channelToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    return 0;
  }

  const r = channelToLinear(rgb.r);
  const g = channelToLinear(rgb.g);
  const b = channelToLinear(rgb.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string) {
  const fg = luminance(foreground);
  const bg = luminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function pickReadableTextColor(background: string, preferredLight = DEFAULT_TEXT_STRONG) {
  const white = "#FFFFFF";
  const black = "#000000";
  const whiteContrast = contrastRatio(white, background);
  const blackContrast = contrastRatio(black, background);

  if (whiteContrast >= blackContrast) {
    return whiteContrast >= MIN_TEXT_CONTRAST ? preferredLight : white;
  }

  return black;
}

function ensureContrast(foreground: string, background: string, minContrast: number) {
  if (contrastRatio(foreground, background) >= minContrast) {
    return foreground;
  }

  const target = pickReadableTextColor(background);

  for (let index = 1; index <= 12; index += 1) {
    const blended = mixHex(foreground, target, index / 12);

    if (contrastRatio(blended, background) >= minContrast) {
      return blended;
    }
  }

  return target;
}

function resolveOnAccent(accent: string, accentSoft: string) {
  const white = "#FFFFFF";
  const black = "#000000";

  const whiteScore = Math.min(contrastRatio(white, accent), contrastRatio(white, accentSoft));
  const blackScore = Math.min(contrastRatio(black, accent), contrastRatio(black, accentSoft));

  return blackScore >= whiteScore ? black : white;
}

function resolveVariant(
  variant: ClientThemeVariant,
  basePalette: ClientPalette,
  fallbackHeroSrc: string,
): ThemeVariantResolved {
  return {
    id: variant.id,
    heroSrc: variant.heroSrc || fallbackHeroSrc,
    palette: {
      ...basePalette,
      ...variant.palette,
    },
    glowPrimary: variant.glowPrimary ?? FALLBACK_GLOW_PRIMARY,
    glowSecondary: variant.glowSecondary ?? FALLBACK_GLOW_SECONDARY,
  };
}

const ThemeVariantContext = createContext<ThemeVariantContextValue | null>(null);

export function useThemeVariant() {
  const context = useContext(ThemeVariantContext);

  if (!context) {
    throw new Error("useThemeVariant must be used inside ThemeVariantProvider");
  }

  return context;
}

export default function ThemeVariantProvider({
  clientId,
  basePalette,
  fallbackHeroSrc,
  variants,
  themeMode = "randomOnLoad",
  fixedVariantId,
  fixedVariantIndex,
  children,
}: ThemeVariantProviderProps) {
  const resolvedVariants = useMemo(() => {
    const list = variants?.filter((item) => !!item.heroSrc) ?? [];

    if (list.length === 0) {
      return [
        resolveVariant(
          {
            id: "default",
            heroSrc: fallbackHeroSrc,
          },
          basePalette,
          fallbackHeroSrc,
        ),
      ];
    }

    return list.map((item) => resolveVariant(item, basePalette, fallbackHeroSrc));
  }, [basePalette, fallbackHeroSrc, variants]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // `randomOnLoad`: muda a cada refresh/acesso.
    // `fixed`: trava uma variante para manter cor visual fixa por cliente/plano.
    let nextIndex = 0;
    let didResolveById = false;

    if (themeMode === "fixed") {
      if (fixedVariantId) {
        const indexById = resolvedVariants.findIndex((item) => item.id === fixedVariantId);

        if (indexById >= 0) {
          nextIndex = indexById;
          didResolveById = true;
        }
      }

      if (!didResolveById && typeof fixedVariantIndex === "number") {
        const clampedIndex = Math.max(0, Math.min(resolvedVariants.length - 1, fixedVariantIndex));
        nextIndex = clampedIndex;
      }
    } else {
      nextIndex = Math.floor(Math.random() * resolvedVariants.length);
    }

    setActiveIndex(nextIndex);
  }, [clientId, fixedVariantId, fixedVariantIndex, resolvedVariants, themeMode]);

  const activeVariant = resolvedVariants[activeIndex] ?? resolvedVariants[0];

  useEffect(() => {
    const background = activeVariant.palette.background;
    const textStrongBase = activeVariant.palette.text || DEFAULT_TEXT_STRONG;
    const textSoftBase = activeVariant.palette.textSoft || DEFAULT_TEXT_SOFT;
    const themedTextStrong = mixHex(activeVariant.palette.accentSoft, textStrongBase, 0.78);
    const themedTextSoft = mixHex(activeVariant.palette.accentSoft, textSoftBase, 0.72);
    const resolvedTextStrong = ensureContrast(themedTextStrong, background, MIN_TEXT_STRONG_CONTRAST);
    const resolvedTextSoft = ensureContrast(themedTextSoft, background, MIN_TEXT_CONTRAST);
    const resolvedTextMuted = ensureContrast(
      mixHex(resolvedTextSoft, background, 0.24),
      background,
      MIN_TEXT_CONTRAST,
    );
    const onAccent = resolveOnAccent(activeVariant.palette.accent, activeVariant.palette.accentSoft);

    const targets = [document.documentElement, document.body].filter(
      (node): node is HTMLElement => !!node,
    );

    for (const target of targets) {
      target.style.setProperty("--augustus-gold", activeVariant.palette.accent);
      target.style.setProperty("--augustus-gold-soft", activeVariant.palette.accentSoft);
      target.style.setProperty("--augustus-surface", activeVariant.palette.surface);
      target.style.setProperty("--augustus-surface-soft", activeVariant.palette.surfaceSoft);
      target.style.setProperty("--augustus-bg-base", activeVariant.palette.background);
      target.style.setProperty("--augustus-bg-soft", activeVariant.palette.surfaceSoft);
      target.style.setProperty("--augustus-glow-primary", activeVariant.glowPrimary);
      target.style.setProperty("--augustus-glow-secondary", activeVariant.glowSecondary);
      target.style.setProperty("--augustus-header-bg", hexToRgba(activeVariant.palette.background, 0.78));
      target.style.setProperty("--augustus-footer-bg", activeVariant.palette.background);
      target.style.setProperty("--augustus-text", resolvedTextStrong);
      target.style.setProperty("--augustus-text-soft", resolvedTextSoft);
      target.style.setProperty("--augustus-text-muted", resolvedTextMuted);
      target.style.setProperty("--augustus-on-accent", onAccent);
    }
  }, [activeVariant]);

  const contextValue: ThemeVariantContextValue = {
    activeVariant,
    activeIndex,
    totalVariants: resolvedVariants.length,
  };

  return (
    <ThemeVariantContext.Provider value={contextValue}>
      {children}
    </ThemeVariantContext.Provider>
  );
}

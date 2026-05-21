"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { useThemeVariant } from "@/components/theme-variant-provider";

type RandomHeroImageProps = Omit<ImageProps, "src"> & {
  fallbackSrc: string;
};

export default function RandomHeroImage({ fallbackSrc, ...imageProps }: RandomHeroImageProps) {
  const { activeVariant } = useThemeVariant();
  const variantSrc = activeVariant.heroSrc || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(variantSrc);

  useEffect(() => {
    setCurrentSrc(variantSrc);
  }, [variantSrc]);

  return (
    <Image
      {...imageProps}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

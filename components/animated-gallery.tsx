"use client";

import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
}

const ScissorsIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const BREATHE_STAGGER_SECONDS = 0.28;
const SCISSORS_STAGGER_SECONDS = 0.42;
const DISSOLVE_STAGGER_SECONDS = 0.7;

export default function AnimatedGallery({ items, animated = true }: { items: GalleryItem[]; animated?: boolean }) {
  return (
    <div data-testid="gallery-grid" className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((item, i) => {
        const breatheDelay = `${(i * BREATHE_STAGGER_SECONDS).toFixed(2)}s`;
        const scissorsDelay = `${(i * SCISSORS_STAGGER_SECONDS + 0.35).toFixed(2)}s`;
        const dissolveDelay = `${(i * DISSOLVE_STAGGER_SECONDS).toFixed(2)}s`;

        return (
          <figure
            key={item.src}
            className={[
              "relative overflow-hidden rounded-2xl border border-white/10",
              "bg-[color-mix(in_oklab,var(--elegancia-bg-base)_55%,transparent)]",
              animated ? "gallery-card gallery-disintegration" : "",
            ].filter(Boolean).join(" ")}
            style={{
              animationDelay: animated ? breatheDelay : "0s",
              ["--disintegration-delay" as string]: dissolveDelay,
            }}
          >
            {/* Tesoura decorativa */}
            <div
              className="scissors-icon absolute right-2 top-2 z-20 text-[var(--elegancia-gold)]"
              style={{ animationDelay: scissorsDelay }}
            >
              <ScissorsIcon />
            </div>

            <div className="dust-layer pointer-events-none absolute inset-0 z-10" />

            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={900}
              className="aspect-[4/5] h-auto w-full bg-[var(--elegancia-bg-soft)] object-contain transition duration-500 hover:scale-105 sm:aspect-[3/4]"
            />
          </figure>
        );
      })}
    </div>
  );
}



"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
}

type CardPhase = "idle" | "snap-out" | "snap-in";

/** Garante ao menos 1 foto nova e 3 fotos sempre distintas entre si. */
function pickRandom3(all: GalleryItem[], current: GalleryItem[]): GalleryItem[] {
  if (all.length <= 3) return all;
  const currentSrcs = new Set(current.map((i) => i.src));
  let result: GalleryItem[] = [];
  let attempts = 0;
  do {
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    result = shuffled.slice(0, 3);
    attempts++;
  } while (attempts < 20 && result.every((i) => currentSrcs.has(i.src)));
  return result;
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

// Durações (ms)
const SNAP_OUT_MS  = 720;
const SNAP_IN_MS   = 580;
const STAGGER_MS   = 340; // intervalo entre cada card iniciar o snap
const INTERVAL_MS  = 5500;

const BREATHE_DELAYS  = ["0s", "1.2s", "2.4s"] as const;
const SCISSORS_DELAYS = ["0.5s", "2.0s", "3.5s"] as const;

export default function AnimatedGallery({ items, animated = true }: { items: GalleryItem[]; animated?: boolean }) {
  const [visible, setVisibleState] = useState<GalleryItem[]>(() => items.slice(0, 3));
  const [phases, setPhases]        = useState<CardPhase[]>(["idle", "idle", "idle"]);

  // Ref para pickRandom3 sempre usar os valores mais recentes sem re-criar o interval
  const visibleRef     = useRef(visible);
  const pendingTimers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  /** Atualiza estado visível e mantém a ref em sincronia. */
  const setVisible = (updater: (prev: GalleryItem[]) => GalleryItem[]) => {
    setVisibleState((prev) => {
      const next = updater(prev);
      visibleRef.current = next;
      return next;
    });
  };

  const setPhase = (i: number, phase: CardPhase) => {
    setPhases((prev) => {
      const next = [...prev] as CardPhase[];
      next[i] = phase;
      return next;
    });
  };

  useEffect(() => {
    if (!animated || items.length <= 3) return;

    const rotate = () => {
      const next3 = pickRandom3(items, visibleRef.current);

      // Cancela timers pendentes de ciclos anteriores
      pendingTimers.current.forEach(clearTimeout);
      pendingTimers.current = [];

      // Cada card inicia o snap com STAGGER_MS de diferença
      [0, 1, 2].forEach((i) => {
        const t1 = setTimeout(() => {
          setPhase(i, "snap-out");

          // Ao fim do snap-out: troca a foto e inicia snap-in
          const t2 = setTimeout(() => {
            setVisible((prev) => {
              const v = [...prev];
              v[i] = next3[i];
              return v;
            });
            setPhase(i, "snap-in");

            // Ao fim do snap-in: volta ao idle (retoma breathe)
            const t3 = setTimeout(() => setPhase(i, "idle"), SNAP_IN_MS);
            pendingTimers.current.push(t3);
          }, SNAP_OUT_MS);

          pendingTimers.current.push(t2);
        }, i * STAGGER_MS);

        pendingTimers.current.push(t1);
      });
    };

    const intervalId = setInterval(rotate, INTERVAL_MS);
    return () => {
      clearInterval(intervalId);
      pendingTimers.current.forEach(clearTimeout);
    };
  }, [items]); // items é estável — o effect roda uma vez

  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      {visible.map((item, i) => {
        const phase      = phases[i];
        const isSnapping = phase !== "idle";

        return (
          <figure
            key={`slot-${i}`}  // key por slot, não por src — mantém o DOM element
            className={[
              "relative overflow-hidden rounded-2xl border border-white/10",
              "bg-[color-mix(in_oklab,var(--augustus-bg-base)_55%,transparent)]",
              !isSnapping ? "gallery-card" : "",
              phase === "snap-out" ? "animate-[thanos-snap-out_720ms_ease-in_forwards]" : "",
              phase === "snap-in"  ? "animate-[thanos-snap-in_580ms_ease-out_forwards]" : "",
              isSnapping           ? "relative z-10" : "",
            ].filter(Boolean).join(" ")}
            style={{ animationDelay: isSnapping ? "0s" : BREATHE_DELAYS[i] }}
          >
            {/* Tesoura decorativa */}
            <div
              className="scissors-icon absolute right-2 top-2 z-20 text-[var(--augustus-gold)]"
              style={{ animationDelay: SCISSORS_DELAYS[i] }}
            >
              <ScissorsIcon />
            </div>

            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={900}
              className="h-52 w-full object-cover transition duration-500 hover:scale-105 sm:h-64 md:h-80"
            />
          </figure>
        );
      })}
    </div>
  );
}


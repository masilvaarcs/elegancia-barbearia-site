import Link from "next/link";
import { eleganciaData } from "@/app/lib/elegancia-data";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label={eleganciaData.brand.name}>
      <span className="inline-block h-2 w-2 rounded-full bg-[var(--elegancia-gold)]"></span>
      <span className="text-sm font-semibold tracking-[0.2em] text-[var(--elegancia-gold-soft)] md:text-base">
        {eleganciaData.brand.name.toUpperCase()}
      </span>
    </Link>
  );
}


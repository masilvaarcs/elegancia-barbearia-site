import Link from "next/link";
import { augustusData } from "@/app/lib/augustus-data";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label={augustusData.brand.name}>
      <span className="inline-block h-2 w-2 rounded-full bg-[var(--augustus-gold)]"></span>
      <span className="text-sm font-semibold tracking-[0.2em] text-[var(--augustus-gold-soft)] md:text-base">
        {augustusData.brand.name.toUpperCase()}
      </span>
    </Link>
  );
}

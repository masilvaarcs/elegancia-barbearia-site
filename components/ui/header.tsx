import Link from "next/link";
import Logo from "./logo";
import { augustusData } from "@/app/lib/augustus-data";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <nav aria-label="Navegacao principal" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {augustusData.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-zinc-300 transition hover:text-[var(--augustus-gold-soft)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/signin"
                className="btn-sm border border-[var(--augustus-gold)]/40 bg-transparent text-zinc-100 shadow-none hover:bg-[var(--augustus-gold)]/15"
              >
                Agendar
              </Link>
            </li>
            <li>
              <Link
                href={augustusData.brand.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-sm bg-[var(--augustus-gold)] text-black shadow-sm hover:bg-[var(--augustus-gold-soft)]"
              >
                WhatsApp
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

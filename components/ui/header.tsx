import Link from "next/link";
import Logo from "./logo";
import { getEleganciaData } from "@/app/lib/elegancia-data";

export default async function Header() {
  const eleganciaData = await getEleganciaData();
  const enabledModules = eleganciaData.plan.modules;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[var(--elegancia-header-bg)] backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {eleganciaData.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-[var(--elegancia-text-soft)] transition hover:text-[var(--elegancia-gold-soft)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-1 items-center justify-end gap-3">
            {enabledModules.bookingCta ? (
              <li>
                <Link
                  href="/signin"
                  className="btn-sm border border-[var(--elegancia-gold)]/40 bg-transparent text-[var(--elegancia-text)] shadow-none hover:bg-[var(--elegancia-gold)]/15"
                >
                  Agendar
                </Link>
              </li>
            ) : null}
            {enabledModules.whatsappCta ? (
              <li>
                <Link
                  href={eleganciaData.brand.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sm bg-[var(--elegancia-gold)] text-[var(--elegancia-on-accent)] shadow-sm hover:bg-[var(--elegancia-gold-soft)]"
                >
                  WhatsApp
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </header>
  );
}


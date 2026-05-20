import Link from "next/link";
import Logo from "./logo";
import { augustusData } from "@/app/lib/augustus-data";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-10 sm:grid-cols-12 md:py-14 ${border ? "border-t border-white/10" : ""}`}
        >
          <div className="space-y-3 sm:col-span-12 lg:col-span-5">
            <div>
              <Logo />
            </div>
            <p className="max-w-md text-sm text-zinc-300">
              {augustusData.hero.description}
            </p>
            <div className="text-sm text-zinc-400">
              © {new Date().getFullYear()} {augustusData.brand.name}. Todos os direitos reservados.
            </div>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">
              Navegacao
            </h3>
            <ul className="space-y-2 text-sm">
              {augustusData.nav.map((item) => (
                <li key={item.href}>
                  <Link className="text-zinc-300 transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-5 lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li>
                <a className="transition hover:text-white" href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp: {augustusData.brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href={augustusData.brand.instagramUrl} target="_blank" rel="noreferrer">
                  Instagram: {augustusData.brand.instagramHandle}
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href={augustusData.brand.mapsUrl} target="_blank" rel="noreferrer">
                  {augustusData.brand.addressLine}, {augustusData.brand.city}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

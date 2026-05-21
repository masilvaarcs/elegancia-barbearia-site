import Link from "next/link";
import Logo from "./logo";
import { getAugustusData } from "@/app/lib/augustus-data";
import { APP_VERSION } from "@/app/lib/version";

const PLAN_LABELS: Record<string, string> = {
  basic: "Basic",
  normal: "Normal",
  premium: "Premium",
  superPremium: "Super Premium",
};

export default async function Footer({ border = false }: { border?: boolean }) {
  const augustusData = await getAugustusData();
  const enabledModules = augustusData.plan.modules;
  const planLabel = PLAN_LABELS[augustusData.plan.tier] ?? augustusData.plan.tier;

  return (
    <footer className="bg-[var(--augustus-footer-bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-10 sm:grid-cols-12 md:py-14 ${border ? "border-t border-white/10" : ""}`}
        >
          <div className="space-y-3 sm:col-span-12 lg:col-span-5">
            <div>
              <Logo />
            </div>
            <p className="max-w-md text-sm text-[var(--augustus-text-soft)]">
              {augustusData.hero.description}
            </p>
            <div className="text-sm text-[var(--augustus-text-muted)]">
              © {new Date().getFullYear()} {augustusData.brand.name}. Todos os direitos reservados.
            </div>
            <div className="text-xs text-[var(--augustus-text-muted)] opacity-40">
              Plano: {planLabel} · v{APP_VERSION}
            </div>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              {augustusData.nav.map((item) => (
                <li key={item.href}>
                  <Link className="text-[var(--augustus-text-soft)] transition hover:text-white" href={item.href}>
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
            <ul className="space-y-3 text-sm text-[var(--augustus-text-soft)]">
              {enabledModules.whatsappCta ? (
                <li>
                  <a className="transition hover:text-white" href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer">
                    WhatsApp: {augustusData.brand.phoneDisplay}
                  </a>
                </li>
              ) : null}
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

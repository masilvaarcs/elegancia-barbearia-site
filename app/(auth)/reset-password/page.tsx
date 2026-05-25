export const metadata = {
  title: "Reabrir atendimento",
  description: "Retome seu contato com a Elegância Barbearia.",
};

import Link from "next/link";
import { eleganciaData } from "@/app/lib/elegancia-data";
import { ReactivationForm } from "@/components/forms/reactivation-form";

export default function ResetPassword() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--elegancia-surface)] p-6 shadow-xl shadow-black/30">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--elegancia-gold-soft)]">
          Suporte
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Reabrir atendimento</h1>
        <p className="mt-3 text-sm text-zinc-300">
          Informe e-mail e telefone, depois confirme em um clique no WhatsApp.
        </p>
      </div>

      <ReactivationForm />

      <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-zinc-300">
        Endereço: {eleganciaData.brand.addressLine}, {eleganciaData.brand.city}
        <br />
        Instagram: {eleganciaData.brand.instagramHandle}
        <br />
        Dados digitados aqui não são gravados em banco no site. A conclusão acontece no WhatsApp.
      </div>

      <div className="mt-6 text-center text-sm text-zinc-300">
        Preferir voltar para o início?{" "}
        <Link className="text-[var(--elegancia-gold-soft)] underline hover:no-underline" href="/">
          Ver página principal
        </Link>
      </div>
    </div>
  );
}


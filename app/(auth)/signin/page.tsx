export const metadata = {
  title: "Agendamento",
  description: "Agende seu horário na Elegância Barbearia.",
};

import Link from "next/link";
import { eleganciaData } from "@/app/lib/elegancia-data";
import { SchedulingForm } from "@/components/forms/scheduling-form";

export default function SignIn() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--elegancia-surface)] p-6 shadow-xl shadow-black/30">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--elegancia-gold-soft)]">
          Agendamento rápido
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Reserve seu horário</h1>
        <p className="mt-3 text-sm text-zinc-300">
          É simples: preencha nome e telefone, toque no botão e confirme seu horário no WhatsApp.
        </p>
      </div>

      <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        1) Preencha os campos. 2) Toque em continuar. 3) Finalize a confirmação no WhatsApp.
      </div>

      <SchedulingForm />

      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
        Instagram: {eleganciaData.brand.instagramHandle}
        <br />
        Endereço: {eleganciaData.brand.addressLine}, {eleganciaData.brand.city}
        <br />
        Dados digitados no site não ficam salvos em banco neste momento; eles seguem no link para o WhatsApp para concluir o atendimento.
      </div>

      <div className="mt-6 text-center">
        <Link className="text-sm text-[var(--elegancia-gold-soft)] underline hover:no-underline" href="/reset-password">
          Não conseguiu concluir? Reabrir atendimento
        </Link>
      </div>
    </div>
  );
}


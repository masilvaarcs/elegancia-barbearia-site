export const metadata = {
  title: "Cadastro",
  description: "Cadastro rápido via WhatsApp para benefícios da Elegância Barbearia.",
};

import Link from "next/link";
import { LoyaltyForm } from "@/components/forms/loyalty-form";

export default function SignUp() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--elegancia-surface)] p-6 shadow-xl shadow-black/30">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--elegancia-gold-soft)]">
          Comunidade
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Cadastro de fidelidade</h1>
        <p className="mt-3 text-sm text-zinc-300">
          Preencha em poucos passos e finalize no WhatsApp para entrar no Clube Elegância.
        </p>
      </div>

      <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        O site prepara seus dados e abre o WhatsApp para validação final com a equipe.
      </div>

      <LoyaltyForm />

      <p className="mt-4 text-xs text-zinc-400">
        Neste fluxo, os dados não são persistidos automaticamente no site. O cadastro é concluído na conversa do WhatsApp.
      </p>

      <div className="mt-6 text-center text-sm text-zinc-300">
        Já tem contato salvo?{" "}
        <Link className="text-[var(--elegancia-gold-soft)] underline hover:no-underline" href="/signin">
          Voltar para agendamento
        </Link>
      </div>
    </div>
  );
}


export const metadata = {
  title: "Cadastro",
  description: "Cadastro rapido para campanhas e avisos da Augustu's Barbearia.",
};

import Link from "next/link";
import { augustusData } from "@/app/lib/augustus-data";

export default function SignUp() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--augustus-surface)] p-6 shadow-xl shadow-black/30">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">
          Comunidade
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Cadastro de fidelidade</h1>
        <p className="mt-3 text-sm text-zinc-300">
          Receba novidades, campanhas como "Complete e ganhe um corte" e horarios especiais.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="name">Nome completo</label>
            <input
              id="name"
              className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
              type="text"
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="email">Email</label>
            <input
              id="email"
              className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
              type="email"
              placeholder="voce@email.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="phone">Telefone</label>
            <input
              id="phone"
              className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
              type="text"
              placeholder="(51) 98131-1911"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="instagram">Instagram (opcional)</label>
            <input
              id="instagram"
              className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
              type="text"
              placeholder="@seuusuario"
            />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <button className="btn w-full bg-[var(--augustus-gold)] text-black hover:bg-[var(--augustus-gold-soft)]">
            Enviar cadastro
          </button>
          <a href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer" className="btn w-full border border-[var(--augustus-gold)]/40 bg-transparent text-center text-zinc-100 shadow-none hover:bg-[var(--augustus-gold)]/15">
            Finalizar via WhatsApp
          </a>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-300">
        Ja tem contato salvo?{" "}
        <Link className="text-[var(--augustus-gold-soft)] underline hover:no-underline" href="/signin">
          Voltar para agendamento
        </Link>
      </div>
    </div>
  );
}

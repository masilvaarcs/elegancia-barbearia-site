export const metadata = {
  title: "Agendamento",
  description: "Agende seu horario na Augustu's Barbearia.",
};

import Link from "next/link";
import { augustusData } from "@/app/lib/augustus-data";

export default function SignIn() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--augustus-surface)] p-6 shadow-xl shadow-black/30">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">
          Agendamento rapido
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Reserve seu horario</h1>
        <p className="mt-3 text-sm text-zinc-300">
          Preencha os dados e finalize o agendamento no WhatsApp em poucos cliques.
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="name">
            Nome
          </label>
          <input id="name" className="form-input w-full border-white/20 bg-black/40 text-zinc-100" type="text" placeholder="Seu nome" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="phone">
            WhatsApp
          </label>
          <input id="phone" className="form-input w-full border-white/20 bg-black/40 text-zinc-100" type="tel" placeholder="(51) 98131-1911" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="service">
            Servico desejado
          </label>
          <input id="service" className="form-input w-full border-white/20 bg-black/40 text-zinc-100" type="text" placeholder="Corte premium, infantil ou acabamento" required />
        </div>
        <a
          href={augustusData.brand.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn mt-2 w-full bg-[var(--augustus-gold)] text-center text-black hover:bg-[var(--augustus-gold-soft)]"
        >
          Continuar no WhatsApp
        </a>
      </form>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
        Instagram: {augustusData.brand.instagramHandle}
        <br />
        Endereco: {augustusData.brand.addressLine}
      </div>

      <div className="mt-6 text-center">
        <Link className="text-sm text-[var(--augustus-gold-soft)] underline hover:no-underline" href="/reset-password">
          Nao conseguiu concluir? Reabrir atendimento
        </Link>
      </div>
    </div>
  );
}

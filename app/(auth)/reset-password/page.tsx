export const metadata = {
  title: "Reabrir atendimento",
  description: "Retome seu contato com a Augustu's Barbearia.",
};

import Link from "next/link";
import { augustusData } from "@/app/lib/augustus-data";

export default function ResetPassword() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--augustus-surface)] p-6 shadow-xl shadow-black/30">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">
          Suporte
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Reabrir atendimento</h1>
        <p className="mt-3 text-sm text-zinc-300">
          Informe seu contato e siga para o WhatsApp para concluir o atendimento rapidamente.
        </p>
      </div>

      <form>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
              type="email"
              placeholder="voce@email.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300" htmlFor="phone">
              WhatsApp
            </label>
            <input
              id="phone"
              className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
              type="tel"
              placeholder="(51) 98131-1911"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <a href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer" className="btn w-full bg-[var(--augustus-gold)] text-center text-black hover:bg-[var(--augustus-gold-soft)]">
            Continuar no WhatsApp
          </a>
        </div>
      </form>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-zinc-300">
        Endereco: {augustusData.brand.addressLine}
        <br />
        Instagram: {augustusData.brand.instagramHandle}
      </div>

      <div className="mt-6 text-center text-sm text-zinc-300">
        Preferir voltar para o inicio?{" "}
        <Link className="text-[var(--augustus-gold-soft)] underline hover:no-underline" href="/">
          Ver pagina principal
        </Link>
      </div>
    </div>
  );
}

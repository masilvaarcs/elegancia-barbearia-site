"use client";

import { FormEvent, useMemo, useState } from "react";
import { eleganciaData } from "@/app/lib/elegancia-data";
import { toWhatsAppUrl } from "./whatsapp";

export function ReactivationForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");

  const whatsappUrl = useMemo(() => {
    const messageLines = [
      "Olá! Quero retomar meu atendimento com a Elegância Barbearia.",
      "",
      "Dados para reativação:",
      `E-mail: ${email.trim() || "-"}`,
      `Telefone: ${phone.trim() || "-"}`,
    ];

    return toWhatsAppUrl(eleganciaData.brand.phoneRaw, messageLines);
  }, [email, phone]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || phone.trim().length < 8) {
      setFeedback("Informe e-mail e telefone para continuar.");
      return;
    }

    setFeedback("Abrindo WhatsApp para recuperar seu histórico de atendimento.");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="reativacao-email">
          E-mail cadastrado
        </label>
        <input
          id="reativacao-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setFeedback("");
          }}
          placeholder="voce@email.com"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="reativacao-telefone">
          Telefone
        </label>
        <input
          id="reativacao-telefone"
          type="tel"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            setFeedback("");
          }}
          placeholder="(51) 99999-9999"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D6B25E] to-[#A9873D] px-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#0E121C] transition hover:brightness-110"
      >
        Continuar no WhatsApp
      </button>

      <p className="text-xs text-white/50">
        Confirmamos seus dados e retomamos seu histórico para manter o atendimento contínuo.
      </p>

      {feedback ? <p className="text-xs text-[#D6B25E]">{feedback}</p> : null}
    </form>
  );
}


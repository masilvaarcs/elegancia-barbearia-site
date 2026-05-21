"use client";

import { FormEvent, useMemo, useState } from "react";
import { augustusData } from "@/app/lib/augustus-data";
import { toWhatsAppUrl } from "./whatsapp";

export function LoyaltyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [feedback, setFeedback] = useState("");

  const whatsappUrl = useMemo(() => {
    const messageLines = [
      "Olá! Quero entrar no Clube Augustus.",
      "",
      "Dados de cadastro:",
      `Nome: ${name.trim() || "-"}`,
      `E-mail: ${email.trim() || "-"}`,
      `Telefone: ${phone.trim() || "-"}`,
      `Instagram: ${instagram.trim() || "-"}`,
    ];

    return toWhatsAppUrl(augustusData.brand.phoneRaw, messageLines);
  }, [name, email, phone, instagram]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < 3 || !email.trim() || phone.trim().length < 8) {
      setFeedback("Preencha nome, e-mail e telefone para concluir o cadastro.");
      return;
    }

    setFeedback("Abrindo WhatsApp para finalizar seu cadastro.");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="cadastro-nome">
          Nome completo
        </label>
        <input
          id="cadastro-nome"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setFeedback("");
          }}
          placeholder="Seu nome"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="cadastro-email">
          E-mail
        </label>
        <input
          id="cadastro-email"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="cadastro-telefone">
            Telefone
          </label>
          <input
            id="cadastro-telefone"
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

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="cadastro-instagram">
            Instagram (opcional)
          </label>
          <input
            id="cadastro-instagram"
            type="text"
            value={instagram}
            onChange={(event) => {
              setInstagram(event.target.value);
              setFeedback("");
            }}
            placeholder="@seuusuario"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D6B25E] to-[#A9873D] px-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#0E121C] transition hover:brightness-110"
      >
        Enviar cadastro
      </button>

      <p className="text-xs text-white/50">
        Seu cadastro é confirmado no WhatsApp e já entra no fluxo de benefícios do Clube Augustus.
      </p>

      {feedback ? <p className="text-xs text-[#D6B25E]">{feedback}</p> : null}
    </form>
  );
}

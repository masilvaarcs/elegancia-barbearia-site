"use client";

import { useMemo, useState } from "react";
import { augustusData } from "@/app/lib/augustus-data";
import { toWhatsAppUrl } from "./whatsapp";

const AVAILABLE_SERVICES = [
  "Corte premium",
  "Corte infantil",
  "Acabamento e detalhes",
] as const;

type AvailableService = (typeof AVAILABLE_SERVICES)[number];

export function SchedulingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<AvailableService>(AVAILABLE_SERVICES[0]);
  const [validationMessage, setValidationMessage] = useState("");

  const canContinue = name.trim().length >= 3 && phone.trim().length >= 8;

  const whatsappUrl = useMemo(() => {
    const messageLines = [
      augustusData.whatsappBookingTemplate,
      "",
      "Cliente já identificado no site:",
      `Nome: ${name.trim() || "-"}`,
      `Telefone: ${phone.trim() || "-"}`,
      `Serviço desejado: ${service}`,
    ];

    return toWhatsAppUrl(augustusData.brand.phoneRaw, messageLines);
  }, [name, phone, service]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="agendamento-nome">
          Nome
        </label>
        <input
          id="agendamento-nome"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setValidationMessage("");
          }}
          placeholder="Seu nome"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="agendamento-telefone">
          Telefone
        </label>
        <input
          id="agendamento-telefone"
          type="tel"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            setValidationMessage("");
          }}
          placeholder="(51) 99999-9999"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50" htmlFor="agendamento-servico">
          Serviço de interesse
        </label>
        <select
          id="agendamento-servico"
          value={service}
          onChange={(event) => setService(event.target.value as AvailableService)}
          className="h-12 w-full rounded-xl border border-white/10 bg-[#070B14] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
        >
          {AVAILABLE_SERVICES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <a
        href={canContinue ? whatsappUrl : "#"}
        onClick={(event) => {
          if (!canContinue) {
            event.preventDefault();
            setValidationMessage("Preencha nome e telefone para continuar.");
          }
        }}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D6B25E] to-[#A9873D] px-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#0E121C] transition hover:brightness-110"
      >
        Continuar no WhatsApp
      </a>

      <p className="text-xs text-white/50">
        Atendimento em horário comercial. Você já chega com o briefing preenchido para confirmação mais rápida.
      </p>

      {validationMessage ? <p className="text-xs text-[#D6B25E]">{validationMessage}</p> : null}
    </div>
  );
}

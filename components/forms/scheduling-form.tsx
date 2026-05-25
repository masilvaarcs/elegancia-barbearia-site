"use client";

import { useMemo, useState } from "react";
import { eleganciaData } from "@/app/lib/elegancia-data";
import { getHaircutReferenceByNumber } from "@/app/lib/haircut-references";
import { buildProfessionalWhatsAppUrl } from "./whatsapp";
import { useVisitorName } from "../use-visitor-name";

export function SchedulingForm() {
  const [name, setName] = useVisitorName();
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(eleganciaData.services[0]?.title ?? "Corte Clássico Premium");
  const [selectedModelNumber, setSelectedModelNumber] = useState<number | null>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const selectedReference = selectedModelNumber != null ? getHaircutReferenceByNumber(selectedModelNumber) : null;

  const canContinue = name.trim().length >= 3 && phone.trim().length >= 8;

  const whatsappUrl = useMemo(() => {
    const reference = selectedModelNumber != null ? getHaircutReferenceByNumber(selectedModelNumber) : null;

    return buildProfessionalWhatsAppUrl(eleganciaData.brand.phoneRaw, {
      name: name.trim() || undefined,
      phone: phone.trim(),
      shift: "manhã",
      service,
      reference,
    });
  }, [name, phone, service, selectedModelNumber]);

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
          onChange={(event) => setService(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-[#070B14] px-4 text-sm text-white outline-none transition focus:border-[#D6B25E]"
        >
          {eleganciaData.services.map((item) => (
            <option key={item.title} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <legend className="px-1 text-xs uppercase tracking-[0.2em] text-[var(--elegancia-gold-soft)]">
          Referência visual do corte
        </legend>
        <p className="text-xs text-white/60">
          Escolha uma única imagem da galeria para servir de referência no atendimento ou mantenha o padrão para decidir na hora.
        </p>

        <button
          type="button"
          onClick={() => setSelectedModelNumber(null)}
          className={`w-full rounded-xl border px-4 py-3 text-left transition ${
            selectedModelNumber == null
              ? "border-[var(--elegancia-gold)] bg-[var(--elegancia-gold)]/12 text-white"
              : "border-white/15 bg-white/[0.03] text-white/80 hover:border-[var(--elegancia-gold)]/45"
          }`}
        >
          <p className="text-sm font-semibold">Escolher na hora com o barbeiro</p>
          <p className="mt-1 text-xs text-white/60">Opção padrão recomendada para quem prefere orientação na cadeira.</p>
        </button>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {eleganciaData.gallery.map((item, index) => {
            const number = index + 1;
            const isSelected = selectedModelNumber === number;
            const reference = getHaircutReferenceByNumber(number);

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setSelectedModelNumber(number)}
                className={`group overflow-hidden rounded-xl border text-left transition ${
                  isSelected
                    ? "border-[var(--elegancia-gold)] bg-[var(--elegancia-gold)]/10"
                    : "border-white/15 bg-white/[0.02] hover:border-[var(--elegancia-gold)]/45"
                }`}
                aria-pressed={isSelected}
              >
                <div className="relative">
                  <img src={item.src} alt={item.alt} className="h-24 w-full object-cover" loading="lazy" />
                  <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                    #{String(number).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-2 py-2">
                  <p className="truncate text-xs font-medium text-white">{reference?.name ?? item.alt}</p>
                </div>
              </button>
            );
          })}
        </div>

        {selectedReference ? (
          <div className="rounded-xl border border-[var(--elegancia-gold)]/35 bg-[var(--elegancia-gold)]/10 px-3 py-2">
            <p className="text-xs font-semibold text-white">#{String(selectedReference.number).padStart(2, "0")} - {selectedReference.name}</p>
            <p className="mt-1 text-xs text-white/70">Tom: {selectedReference.tone}</p>
          </div>
        ) : null}
      </fieldset>

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
        Atendimento em horário comercial. Você já chega com seus dados preenchidos para confirmação mais rápida.
      </p>

      {validationMessage ? <p className="text-xs text-[#D6B25E]">{validationMessage}</p> : null}
    </div>
  );
}


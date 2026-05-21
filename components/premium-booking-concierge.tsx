"use client";

import { useMemo, useState } from "react";
import { augustusData } from "@/app/lib/augustus-data";

const shifts = ["manhã", "tarde", "noite"] as const;

const styleGoals = [
  "social discreto",
  "executivo premium",
  "degradê marcante",
  "infantil prático",
] as const;

const BR_DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/;

function normalizeBrDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function PremiumBookingConcierge() {
  const [name, setName] = useState("");
  const [service, setService] = useState(augustusData.services[0]?.title ?? "Corte Premium");
  const [shift, setShift] = useState<(typeof shifts)[number]>("tarde");
  const [goal, setGoal] = useState<(typeof styleGoals)[number]>("executivo premium");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");

  const whatsappHref = useMemo(() => {
    const messageLines = [
      "Olá, Augusto! Vim pelo site e quero agendar um horário.",
      "",
      `Nome: ${name || "[informar nome]"}`,
      `Serviço: ${service}`,
      `Turno: ${shift}`,
      `Horário preferido: ${preferredTime || "[informar horário]"}`,
      `Data preferida: ${BR_DATE_PATTERN.test(preferredDate) ? preferredDate : "[informar data no formato dd/mm/aaaa]"}`,
      `Objetivo de estilo: ${goal}`,
      `Observações: ${notes || "sem observações"}`,
      "",
      "Pode me confirmar a melhor disponibilidade?",
    ];

    return `https://wa.me/${augustusData.brand.phoneRaw}?text=${encodeURIComponent(messageLines.join("\n"))}`;
  }, [goal, name, notes, preferredDate, preferredTime, service, shift]);

  return (
    <section id="concierge" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--augustus-gold)]/25 bg-[linear-gradient(145deg,var(--augustus-bg-soft)_0%,var(--augustus-surface)_40%,var(--augustus-bg-base)_100%)] p-6 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--augustus-glow-primary),transparent_72%)]" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--augustus-glow-secondary),transparent_72%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--augustus-gold-soft)]">
              agendamento objetivo
            </p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl">Agende em poucos passos</h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--augustus-text-soft)] md:text-base">
              Preencha o briefing, toque no botão e já abra o WhatsApp com a mensagem pronta para confirmar seu horário.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-[var(--augustus-text)] sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_70%,transparent)] px-4 py-3">3 passos: preencher, enviar e confirmar no WhatsApp</div>
              <div className="rounded-xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_70%,transparent)] px-4 py-3">Pedido com serviço, turno, data e objetivo de estilo</div>
              <div className="rounded-xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_70%,transparent)] px-4 py-3">Atendimento mais rápido no primeiro contato</div>
              <div className="rounded-xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_70%,transparent)] px-4 py-3">Dados deste formulário não ficam salvos no site</div>
            </div>
          </article>

          <form className="space-y-4 rounded-2xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_55%,transparent)] p-4 md:p-5">
            <div>
              <label htmlFor="concierge-name" className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">
                Nome
              </label>
              <input
                id="concierge-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-input w-full border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_60%,transparent)] text-[var(--augustus-text)]"
                type="text"
                placeholder="Seu nome"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="concierge-service" className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">
                  Serviço
                </label>
                <select
                  id="concierge-service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="form-select w-full border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_60%,transparent)] text-[var(--augustus-text)]"
                >
                  {augustusData.services.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">Turno</span>
                <div className="flex flex-wrap gap-2">
                  {shifts.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setShift(item)}
                      className={`rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.15em] transition ${
                        shift === item
                          ? "border-[var(--augustus-gold)] bg-[var(--augustus-gold)]/20 text-[var(--augustus-gold-soft)]"
                          : "border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_68%,transparent)] text-[var(--augustus-text-soft)] hover:border-[var(--augustus-gold)]/45"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="concierge-date" className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">
                  Data preferida (dd/mm/aaaa)
                </label>
                <input
                  id="concierge-date"
                  value={preferredDate}
                  onChange={(event) => setPreferredDate(normalizeBrDate(event.target.value))}
                  className="form-input w-full border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_60%,transparent)] text-[var(--augustus-text)]"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="dd/mm/aaaa"
                  pattern="\d{2}/\d{2}/\d{4}"
                  title="Use o formato dd/mm/aaaa"
                />
              </div>

              <div>
                <label htmlFor="concierge-time" className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">
                  Horário preferido
                </label>
                <input
                  id="concierge-time"
                  value={preferredTime}
                  onChange={(event) => setPreferredTime(event.target.value)}
                  className="form-input w-full border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_60%,transparent)] text-[var(--augustus-text)]"
                  type="time"
                />
              </div>
            </div>

            <div>
              <span className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">Objetivo de estilo</span>
              <div className="flex flex-wrap gap-2">
                {styleGoals.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGoal(item)}
                    className={`rounded-lg border px-3 py-2 text-xs tracking-[0.03em] transition ${
                      goal === item
                        ? "border-[var(--augustus-gold)] bg-[var(--augustus-gold)]/20 text-[var(--augustus-gold-soft)]"
                        : "border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_68%,transparent)] text-[var(--augustus-text-soft)] hover:border-[var(--augustus-gold)]/45"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="concierge-notes" className="mb-1 block text-sm font-medium text-[var(--augustus-text)]">
                Observações
              </label>
              <textarea
                id="concierge-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="form-textarea w-full border-white/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_60%,transparent)] text-[var(--augustus-text)]"
                placeholder="Ex.: prefiro máquina baixa nas laterais"
              />
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn w-full bg-[var(--augustus-gold)] text-center text-[var(--augustus-on-accent)] hover:bg-[var(--augustus-gold-soft)]"
            >
              Enviar briefing no WhatsApp
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { augustusData } from "@/app/lib/augustus-data";

const shifts = ["manha", "tarde", "noite"] as const;

const styleGoals = [
  "social discreto",
  "executivo premium",
  "degrade marcante",
  "infantil pratico",
] as const;

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
      "Ola, Augusto! Vim pelo site e quero agendar um horario.",
      "",
      `Nome: ${name || "[informar nome]"}`,
      `Servico: ${service}`,
      `Turno: ${shift}`,
      `Horario preferido: ${preferredTime || "[informar horario]"}`,
      `Data preferida: ${preferredDate || "[informar data]"}`,
      `Objetivo de estilo: ${goal}`,
      `Observacoes: ${notes || "sem observacoes"}`,
      "",
      "Pode me confirmar a melhor disponibilidade?",
    ];

    return `https://wa.me/${augustusData.brand.phoneRaw}?text=${encodeURIComponent(messageLines.join("\n"))}`;
  }, [goal, name, notes, preferredDate, preferredTime, service, shift]);

  return (
    <section id="concierge" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--augustus-gold)]/25 bg-[linear-gradient(145deg,#0e0e10_0%,#121316_40%,#0b0b0d_100%)] p-6 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(198,151,58,0.22),transparent_72%)]" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(226,186,108,0.15),transparent_72%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--augustus-gold-soft)]">
              diferencial premium
            </p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl">Concierge de agendamento em 30 segundos</h2>
            <p className="mt-4 max-w-2xl text-sm text-zinc-300 md:text-base">
              Em vez de enviar mensagem solta, o cliente ja abre o WhatsApp com um briefing completo para acelerar o atendimento e facilitar a confirmacao do horario.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-zinc-200 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">Resposta mais rapida no primeiro contato</div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">Pedido com turno, horario e objetivo de estilo</div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">Experiencia premium e objetiva para o cliente</div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">Mensagem pronta para conversao imediata</div>
            </div>
          </article>

          <form className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
            <div>
              <label htmlFor="concierge-name" className="mb-1 block text-sm font-medium text-zinc-200">
                Nome
              </label>
              <input
                id="concierge-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
                type="text"
                placeholder="Seu nome"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="concierge-service" className="mb-1 block text-sm font-medium text-zinc-200">
                  Servico
                </label>
                <select
                  id="concierge-service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="form-select w-full border-white/20 bg-black/40 text-zinc-100"
                >
                  {augustusData.services.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-zinc-200">Turno</span>
                <div className="flex flex-wrap gap-2">
                  {shifts.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setShift(item)}
                      className={`rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.15em] transition ${
                        shift === item
                          ? "border-[var(--augustus-gold)] bg-[var(--augustus-gold)]/20 text-[var(--augustus-gold-soft)]"
                          : "border-white/20 bg-black/25 text-zinc-300 hover:border-[var(--augustus-gold)]/45"
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
                <label htmlFor="concierge-date" className="mb-1 block text-sm font-medium text-zinc-200">
                  Data preferida
                </label>
                <input
                  id="concierge-date"
                  value={preferredDate}
                  onChange={(event) => setPreferredDate(event.target.value)}
                  className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
                  type="date"
                />
              </div>

              <div>
                <label htmlFor="concierge-time" className="mb-1 block text-sm font-medium text-zinc-200">
                  Horario preferido
                </label>
                <input
                  id="concierge-time"
                  value={preferredTime}
                  onChange={(event) => setPreferredTime(event.target.value)}
                  className="form-input w-full border-white/20 bg-black/40 text-zinc-100"
                  type="time"
                />
              </div>
            </div>

            <div>
              <span className="mb-1 block text-sm font-medium text-zinc-200">Objetivo de estilo</span>
              <div className="flex flex-wrap gap-2">
                {styleGoals.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGoal(item)}
                    className={`rounded-lg border px-3 py-2 text-xs tracking-[0.03em] transition ${
                      goal === item
                        ? "border-[var(--augustus-gold)] bg-[var(--augustus-gold)]/20 text-[var(--augustus-gold-soft)]"
                        : "border-white/20 bg-black/25 text-zinc-300 hover:border-[var(--augustus-gold)]/45"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="concierge-notes" className="mb-1 block text-sm font-medium text-zinc-200">
                Observacoes
              </label>
              <textarea
                id="concierge-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="form-textarea w-full border-white/20 bg-black/40 text-zinc-100"
                placeholder="Ex.: prefiro maquina baixa nas laterais"
              />
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn w-full bg-[var(--augustus-gold)] text-center text-black hover:bg-[var(--augustus-gold-soft)]"
            >
              Enviar briefing no WhatsApp
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

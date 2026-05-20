export const metadata = {
  title: "Inicio",
  description: "Barbearia premium em Gravatai com atendimento masculino e infantil.",
};

import Image from "next/image";
import Link from "next/link";
import { augustusData } from "@/app/lib/augustus-data";
import PremiumBookingConcierge from "@/components/premium-booking-concierge";

export default function Home() {
  return (
    <div className="bg-black text-zinc-100" id="inicio">
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(198,151,58,0.22),transparent_40%),radial-gradient(circle_at_75%_0%,rgba(226,186,108,0.15),transparent_42%),linear-gradient(180deg,#0a0a0a_0%,#060606_100%)]"></div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div data-aos="fade-right">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--augustus-gold-soft)]">
              {augustusData.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl leading-tight text-white md:text-6xl">
              {augustusData.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-zinc-300 md:text-lg">
              {augustusData.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={augustusData.brand.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn bg-[var(--augustus-gold)] text-black hover:bg-[var(--augustus-gold-soft)]"
              >
                {augustusData.hero.primaryCtaLabel}
              </a>
              <a
                href={augustusData.brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn border border-[var(--augustus-gold)]/40 bg-white/5 text-zinc-100 shadow-none hover:bg-white/10"
              >
                {augustusData.hero.secondaryCtaLabel}
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-zinc-200 sm:grid-cols-2">
              <a href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-[var(--augustus-surface)] px-4 py-3 transition hover:border-[var(--augustus-gold)]/40">
                WhatsApp: {augustusData.brand.phoneDisplay}
              </a>
              <a href={augustusData.brand.mapsUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-[var(--augustus-surface)] px-4 py-3 transition hover:border-[var(--augustus-gold)]/40">
                {augustusData.brand.city}
              </a>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle,rgba(198,151,58,.28),transparent_70%)] blur-2xl"></div>
            <Image
              src={augustusData.featuredImages.hero}
              alt="Cliente em atendimento na Augustu's Barbearia"
              width={720}
              height={900}
              className="mx-auto w-full max-w-md rounded-[1.75rem] border border-white/10 object-cover shadow-2xl shadow-black/40"
              priority
            />
          </div>
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--augustus-gold-soft)]">
              Servicos
            </p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl">Atendimento de alto padrao para todas as idades</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {augustusData.services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-white/10 bg-[var(--augustus-surface)] p-6"
              data-aos="fade-up"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--augustus-gold-soft)]">{service.highlight}</p>
              <h3 className="mt-3 text-2xl text-white">{service.title}</h3>
              <p className="mt-3 text-sm text-zinc-300">{service.description}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--augustus-gold)]">Duracao media: {service.duration}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[var(--augustus-surfaceSoft)] p-6">
          <h3 className="text-2xl text-white">Por que escolher a Augustu's</h3>
          <ul className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
            {augustusData.differentiators.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="galeria" className="border-y border-white/10 bg-[#0b0b0c] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--augustus-gold-soft)]">
            Galeria real
          </p>
          <h2 className="mt-3 text-3xl text-white md:text-4xl">Resultados reais da barbearia</h2>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {augustusData.gallery.map((item) => (
              <figure key={item.src} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={900}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <PremiumBookingConcierge />

      <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[var(--augustus-surface)] p-6">
            <h2 className="text-3xl text-white">Contato e agendamento</h2>
            <p className="mt-3 text-zinc-300">
              Atendimento rapido pelo WhatsApp e Instagram. Localizacao central em Gravatai para facilitar seu acesso.
            </p>

            <div className="mt-6 space-y-3 text-sm text-zinc-200">
              <a href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 bg-black/25 px-4 py-3 transition hover:border-[var(--augustus-gold)]/50">
                WhatsApp: {augustusData.brand.phoneDisplay}
              </a>
              <a href={augustusData.brand.instagramUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 bg-black/25 px-4 py-3 transition hover:border-[var(--augustus-gold)]/50">
                Instagram: {augustusData.brand.instagramHandle}
              </a>
              <a href={augustusData.brand.secondaryInstagramUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 bg-black/25 px-4 py-3 transition hover:border-[var(--augustus-gold)]/50">
                Perfil parceiro: {augustusData.brand.secondaryInstagramHandle}
              </a>
              <a href={augustusData.brand.mapsUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/10 bg-black/25 px-4 py-3 transition hover:border-[var(--augustus-gold)]/50">
                {augustusData.brand.addressLine}, {augustusData.brand.city}
              </a>
            </div>

            <div className="mt-6">
              <h3 className="text-xl text-white">Horarios</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {augustusData.workingHours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signin" className="btn border border-[var(--augustus-gold)]/40 bg-transparent text-zinc-100 shadow-none hover:bg-[var(--augustus-gold)]/15">
                Abrir pagina de agendamento
              </Link>
              <Link href="/signup" className="btn bg-[var(--augustus-gold)] text-black hover:bg-[var(--augustus-gold-soft)]">
                Cadastro rapido
              </Link>
            </div>
          </article>

          <article className="grid gap-3 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:col-span-2">
              <Image
                src={augustusData.featuredImages.addressCard}
                alt="Arte da marca com endereco e campanha de fidelidade"
                width={1080}
                height={1228}
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image
                src={augustusData.featuredImages.logoCard}
                alt="Identidade visual da Augustu's Barbearia"
                width={1080}
                height={1080}
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image
                src={augustusData.featuredImages.qrCode}
                alt="QR Code do Instagram para agendamento"
                width={736}
                height={920}
                className="h-full w-full object-cover"
              />
            </figure>
          </article>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "Início",
  description: "Barbearia premium em Gravataí com atendimento masculino e infantil.",
};

import Image from "next/image";
import Link from "next/link";
import { getAugustusData } from "@/app/lib/augustus-data";
import PremiumBookingConcierge from "@/components/premium-booking-concierge";
import RandomHeroImage from "@/components/random-hero-image";
import AnimatedGallery from "@/components/animated-gallery";
import PhoneCopyCard from "@/components/phone-copy-card";

export default async function Home() {
  const augustusData = await getAugustusData();
  const enabledModules = augustusData.plan.modules;
  const hasWhatsappCta = enabledModules.whatsappCta;

  return (
    <div className="bg-[var(--augustus-bg-base)] text-[var(--augustus-text)]" id="inicio">
      <section data-testid="hero-section" className="relative overflow-hidden border-b border-white/10 pb-10 pt-10 sm:pt-14 md:pb-12 md:pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,var(--augustus-glow-primary),transparent_40%),radial-gradient(circle_at_75%_0%,var(--augustus-glow-secondary),transparent_42%),linear-gradient(180deg,var(--augustus-bg-soft)_0%,var(--augustus-bg-base)_100%)]"></div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div data-aos="fade-right">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--augustus-gold-soft)]">
              {augustusData.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl leading-tight text-white md:text-6xl">
              {augustusData.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--augustus-text-soft)] md:text-lg">
              {augustusData.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {hasWhatsappCta ? (
                <a
                  href={augustusData.brand.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[var(--augustus-gold)] text-[var(--augustus-on-accent)] hover:bg-[var(--augustus-gold-soft)]"
                >
                  {augustusData.hero.primaryCtaLabel}
                </a>
              ) : null}
              <a
                href={augustusData.brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn flex items-center gap-2 border border-white/20 bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/15 to-[#fcb045]/20 text-white shadow-none hover:from-[#833ab4]/35 hover:via-[#fd1d1d]/25 hover:to-[#fcb045]/35 transition-all"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {augustusData.hero.secondaryCtaLabel}
              </a>
            </div>

            <div className={`mt-8 grid gap-3 text-sm text-[var(--augustus-text)] ${hasWhatsappCta ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
              {hasWhatsappCta ? (
                <a href={augustusData.brand.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-[var(--augustus-surface)] px-4 py-3 transition hover:border-[var(--augustus-gold)]/40 whitespace-nowrap">
                  WhatsApp: {augustusData.brand.phoneDisplay}
                </a>
              ) : null}
              <a href={augustusData.brand.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-[var(--augustus-surface)] px-4 py-3 transition hover:border-[var(--augustus-gold)]/40">
                <svg className="h-4 w-4 shrink-0 text-[var(--augustus-gold)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{augustusData.brand.city}</span>
              </a>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle,var(--augustus-glow-primary),transparent_70%)] blur-2xl"></div>
            <RandomHeroImage
              fallbackSrc={augustusData.featuredImages.hero}
              alt="Cliente em atendimento na Augustu's Barbearia"
              width={720}
              height={900}
              className="mx-auto w-full max-w-md rounded-[1.75rem] border border-white/10 object-cover shadow-2xl shadow-black/40"
              priority
            />
          </div>
        </div>
      </section>

      {enabledModules.services ? (
        <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--augustus-gold-soft)]">
              Serviços
            </p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl">Atendimento de alto padrão para todas as idades</h2>
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
              <p className="mt-3 text-sm text-[var(--augustus-text-soft)]">{service.description}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--augustus-gold)]">Duração média: {service.duration}</p>
            </article>
          ))}
        </div>

        <div
          className="relative mt-10 overflow-hidden rounded-3xl border border-[var(--augustus-gold)]/25 bg-gradient-to-br from-[var(--augustus-surface)] to-[color-mix(in_oklab,var(--augustus-bg-base)_85%,transparent)] p-8 sm:p-10"
          data-aos="fade-up"
        >
          {/* glows decorativos */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[var(--augustus-glow-primary)] blur-3xl opacity-70" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[var(--augustus-glow-secondary)] blur-3xl opacity-40" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--augustus-gold)]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--augustus-gold-soft)]">Nossos diferenciais</p>
            </div>
            <h3 className="mt-3 text-3xl text-white md:text-4xl">Por que escolher a Augustu's</h3>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {augustusData.differentiators.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-stretch overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] transition duration-300 hover:border-[var(--augustus-gold)]/40 hover:bg-white/[0.06]"
                >
                  {/* Coluna numerada */}
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-[var(--augustus-gold)]/10 bg-[var(--augustus-gold)]/[0.04] transition duration-300 group-hover:bg-[var(--augustus-gold)]/[0.10]">
                    <span className="select-none text-xl font-black text-[var(--augustus-gold)]/40 transition duration-300 group-hover:text-[var(--augustus-gold)]/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Conteúdo */}
                  <div className="flex items-center gap-4 px-5 py-5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--augustus-gold)] shadow-[0_0_8px_2px_var(--augustus-gold)] transition duration-300 group-hover:shadow-[0_0_14px_5px_var(--augustus-gold)]" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-[var(--augustus-text-soft)] transition duration-300 group-hover:text-white">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </section>
      ) : null}

      {/* Destaque: ambiente da barbearia — antes da galeria de cortes */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-stretch" data-aos="fade-up">

            {/* Imagem em proporção natural (retrato), sem corte */}
            <div className="w-full shrink-0 md:w-64 lg:w-80">
              <Image
                src="/images/augustus/gallery-03.webp"
                alt="Cliente e barbeiro em atendimento na Augustu's Barbearia"
                width={828}
                height={1104}
                className="h-auto w-full rounded-3xl border border-white/10 object-contain"
              />
            </div>

            {/* Card de texto */}
            <div className="flex flex-1 flex-col justify-center rounded-3xl border border-white/10 bg-[var(--augustus-surface)] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--augustus-gold-soft)]">Ambiente</p>
              <h3 className="mt-3 text-2xl text-white sm:text-3xl md:text-4xl">Cada detalhe pensado para você</h3>
              <p className="mt-4 text-[var(--augustus-text-soft)]">
                Um espaço onde o atendimento personalizado e o ambiente premium fazem parte da experiência desde o momento em que você entra.
              </p>
              <a
                href={augustusData.brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--augustus-gold)] hover:text-[var(--augustus-gold-soft)]"
              >
                Ver mais no Instagram
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {enabledModules.gallery && augustusData.gallery.length > 0 ? (
        <section id="galeria" className="border-y border-white/10 bg-[var(--augustus-bg-soft)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--augustus-gold-soft)]">
            Galeria real
          </p>
          <h2 className="mt-3 text-3xl text-white md:text-4xl">Resultados reais da barbearia</h2>

          <AnimatedGallery items={augustusData.gallery} animated={augustusData.galleryAnimation ?? true} />
        </div>
        </section>
      ) : null}

      {enabledModules.premiumConcierge ? <PremiumBookingConcierge /> : null}

      {enabledModules.contact ? (
        <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[var(--augustus-surface)] p-6">
            <h2 className="text-3xl text-white">
              {enabledModules.bookingCta ? "Contato e agendamento" : "Contato"}
            </h2>
            <p className="mt-3 text-[var(--augustus-text-soft)]">
              {hasWhatsappCta
                ? "Atendimento rápido pelo WhatsApp e Instagram. Localização central em Gravataí para facilitar seu acesso."
                : "Atendimento rápido pelo Instagram. Localização central em Gravataí para facilitar seu acesso."}
            </p>

            <div className="mt-6 space-y-3 text-sm">
              {/* Telefone com copiar — sempre visível */}
              <PhoneCopyCard
                phoneDisplay={augustusData.brand.phoneDisplay}
                whatsappUrl={augustusData.brand.whatsappUrl}
                showWhatsappButton={hasWhatsappCta}
              />

              {hasWhatsappCta ? (
                <a
                  href={augustusData.brand.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/10 px-4 py-4 transition hover:bg-[#25d366]/20"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366]/20">
                    <svg className="h-5 w-5 text-[#25d366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.103 1.508 5.83L.057 23.082a.75.75 0 0 0 .921.921l5.255-1.451A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.518-5.188-1.42l-.371-.22-3.844 1.061 1.024-3.741-.241-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#25d366]">WhatsApp</p>
                    <p className="whitespace-nowrap text-[var(--augustus-text-soft)]">{augustusData.brand.phoneDisplay}</p>
                  </div>
                  <svg className="ml-auto h-4 w-4 shrink-0 text-[var(--augustus-text-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </a>
              ) : null}

              {/* Instagram principal */}
              <a
                href={augustusData.brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/10 to-[#fcb045]/15 px-4 py-4 transition hover:from-[#833ab4]/25 hover:via-[#fd1d1d]/18 hover:to-[#fcb045]/25"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-white">{augustusData.brand.instagramHandle}</p>
                  <p className="text-[var(--augustus-text-soft)]">Perfil principal da barbearia</p>
                </div>
                <svg className="ml-auto h-4 w-4 shrink-0 text-[var(--augustus-text-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>

              {/* Instagram parceiro */}
              <a
                href={augustusData.brand.secondaryInstagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/8 to-[#fcb045]/10 px-4 py-4 transition hover:from-[#833ab4]/20 hover:via-[#fd1d1d]/15 hover:to-[#fcb045]/20"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#833ab4]/60 via-[#fd1d1d]/60 to-[#fcb045]/60">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-white">{augustusData.brand.secondaryInstagramHandle}</p>
                  <p className="text-[var(--augustus-text-soft)]">Espaço parceiro</p>
                </div>
                <svg className="ml-auto h-4 w-4 shrink-0 text-[var(--augustus-text-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>

              {/* Maps */}
              <a
                href={augustusData.brand.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[var(--augustus-gold)]/20 bg-[color-mix(in_oklab,var(--augustus-bg-base)_60%,transparent)] px-4 py-4 transition hover:border-[var(--augustus-gold)]/40 hover:bg-[color-mix(in_oklab,var(--augustus-bg-base)_50%,transparent)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--augustus-gold)]/15">
                  <svg className="h-5 w-5 text-[var(--augustus-gold)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-[var(--augustus-gold)]">{augustusData.brand.city}</p>
                  <p className="text-[var(--augustus-text-soft)]">{augustusData.brand.addressLine}</p>
                  <p className="mt-1 text-xs text-[var(--augustus-text-soft)]/70">Abrir no Google Maps ↗</p>
                </div>
              </a>
            </div>

            <div className="mt-6">
              <h3 className="text-xl text-white">Horários</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--augustus-text-soft)]">
                {augustusData.workingHours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            </div>

            {enabledModules.bookingCta ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signin" className="btn border border-[var(--augustus-gold)]/40 bg-transparent text-[var(--augustus-text)] shadow-none hover:bg-[var(--augustus-gold)]/15">
                  Abrir página de agendamento
                </Link>
                <Link href="/signup" className="btn bg-[var(--augustus-gold)] text-[var(--augustus-on-accent)] hover:bg-[var(--augustus-gold-soft)]">
                  Cadastro rápido
                </Link>
              </div>
            ) : null}
          </article>

          <article className="flex flex-col gap-3">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_55%,transparent)]">
              <Image
                src={augustusData.featuredImages.addressCard}
                alt="Promoção de fidelidade: complete e ganhe um corte"
                width={1060}
                height={584}
                className="w-full h-auto"
              />
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_55%,transparent)]">
              <Image
                src={augustusData.featuredImages.logoCard}
                alt="Cartão da Augustu's Barbearia com logo e endereço"
                width={1062}
                height={588}
                className="w-full h-auto"
              />
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_oklab,var(--augustus-bg-base)_55%,transparent)] flex justify-center">
              <Image
                src={augustusData.featuredImages.qrCode}
                alt="QR Code do Instagram para agendamento"
                width={736}
                height={920}
                className="w-full max-w-xs h-auto"
              />
            </figure>
          </article>
        </div>
        </section>
      ) : null}
    </div>
  );
}

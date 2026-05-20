import Image from "next/image";
import Logo from "@/components/ui/logo";
import { augustusData } from "@/app/lib/augustus-data";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="absolute z-30 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="mr-4 shrink-0">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex grow bg-[#070708]">
        <div
          className="pointer-events-none absolute bottom-0 left-0 -translate-x-1/3"
          aria-hidden="true"
        >
          <div className="h-80 w-80 rounded-full bg-linear-to-tr from-[var(--augustus-gold)] to-transparent opacity-30 blur-[160px]"></div>
        </div>

        <div className="w-full">
          <div className="flex h-full flex-col justify-center before:min-h-[4rem] before:flex-1 after:flex-1 md:before:min-h-[5rem]">
            <div className="px-4 sm:px-6">
              <div className="mx-auto w-full max-w-md">
                <div className="py-16 md:py-20">{children}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative my-6 mr-6 hidden w-[560px] shrink-0 overflow-hidden rounded-2xl border border-[var(--augustus-gold)]/20 lg:block">
          <Image
            src={augustusData.featuredImages.hero}
            className="h-full w-full object-cover"
            width={640}
            height={640}
            alt="Ambiente da Augustu's Barbearia"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 p-8">
            <h2 className="text-3xl font-semibold text-[var(--augustus-gold-soft)]">
              {augustusData.brand.name}
            </h2>
            <p className="mt-2 text-zinc-100">{augustusData.brand.tagline}</p>
            <p className="mt-5 text-sm text-zinc-300">
              {augustusData.brand.addressLine}
              <br />
              {augustusData.brand.city}
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              WhatsApp: {augustusData.brand.phoneDisplay}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

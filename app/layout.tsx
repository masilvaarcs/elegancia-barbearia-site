import "./css/style.css";

import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Augustu's Barbearia | Gravatai",
    template: "%s | Augustu's Barbearia",
  },
  description:
    "Barbearia premium em Gravatai com cortes masculinos e infantis, atendimento personalizado e agendamento via WhatsApp.",
  metadataBase: new URL("https://augustus-barbearia.vercel.app"),
  openGraph: {
    title: "Augustu's Barbearia",
    description:
      "Dedicacao e estilo a cada corte. Agende seu horario pelo WhatsApp.",
    images: ["/images/augustus/brand-logo-card.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${cormorant.variable} bg-gray-950 font-inter tracking-tight text-gray-100 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}

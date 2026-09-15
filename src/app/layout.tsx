import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";
import "./globals.css";

/* Two typefaces only: a grotesque for reading, a mono for every label,
   coordinate and date. Loaded through next/font so there is no layout shift
   and no external stylesheet request. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Performance Brand Experience Atlas",
    template: "%s — PBE Atlas",
  },
  description:
    "A research atlas mapping how performance brands use retail, events, pop-ups, launches and activations to build performance credibility and cultural meaning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

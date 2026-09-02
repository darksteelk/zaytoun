import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import { siteConfig } from "@/lib/navigation";
import { ogImage } from "@/lib/images";

/* ---------------------------------------------------------------
   ZAYTOUN — Grundgerüst
   Schriften, globale Metadaten, Warenkorb-Kontext, Kopf und Fuss.
   --------------------------------------------------------------- */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ZAYTOUN — Bio Olivenöl aus Tunesien",
    template: "%s | ZAYTOUN",
  },
  description: siteConfig.description,
  keywords: [
    "Bio Olivenöl",
    "natives Olivenöl extra",
    "Olivenöl Tunesien",
    "kaltgepresst",
    "handverlesen",
    "Zaytoun",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "ZAYTOUN — Bio Olivenöl aus Tunesien",
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAYTOUN — Bio Olivenöl aus Tunesien",
    description: siteConfig.description,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="flex min-h-dvh flex-col bg-cream text-olive antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

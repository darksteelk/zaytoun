import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import ClearCartOnMount from "@/components/cart/ClearCartOnMount";
import { OliveBranchIcon } from "@/components/icons";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Bestellung erfolgreich
   Ziel der success_url von Stripe Checkout.
   --------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Bestellung",
  description: "Ihre Bestellung bei Zaytoun ist eingegangen.",
  robots: { index: false, follow: false },
};

export default function ErfolgPage() {
  return (
    <>
      <ClearCartOnMount />

      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <OliveBranchIcon className="h-10 w-24 text-sage" />

        <h1 className="mt-8 text-4xl leading-tight text-olive sm:text-5xl">
          Vielen Dank für Ihre Bestellung
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-olive/80 sm:text-base">
          Ihre Zahlung war erfolgreich. Sie erhalten in Kürze eine
          Bestellbestätigung per E-Mail. Sobald Ihr Öl unterwegs ist, melden wir
          uns noch einmal mit den Sendungsdaten.
        </p>

        <p className="mt-4 text-xs text-olive/55">
          Fragen zur Bestellung? Schreiben Sie uns an{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="underline underline-offset-4 hover:text-sage"
          >
            {siteConfig.email}
          </a>
          .
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop">Weiter einkaufen</ButtonLink>
          <ButtonLink href="/" variant="ghost">
            Zur Startseite
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

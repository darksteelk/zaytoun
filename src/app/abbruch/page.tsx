import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { OliveBranchIcon } from "@/components/icons";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Zahlung abgebrochen
   Ziel der cancel_url von Stripe Checkout. Der Warenkorb bleibt
   absichtlich erhalten.
   --------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Bezahlvorgang abgebrochen",
  description: "Der Bezahlvorgang wurde abgebrochen. Ihr Warenkorb bleibt erhalten.",
  robots: { index: false, follow: false },
};

export default function AbbruchPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <OliveBranchIcon className="h-10 w-24 text-sage" />

      <h1 className="mt-8 text-4xl leading-tight text-olive sm:text-5xl">
        Bezahlvorgang abgebrochen
      </h1>

      <p className="mt-6 text-sm leading-relaxed text-olive/80 sm:text-base">
        Es wurde nichts abgebucht. Ihr Warenkorb ist unverändert — Sie können
        den Kauf jederzeit fortsetzen.
      </p>

      <p className="mt-4 text-xs text-olive/55">
        Hat etwas nicht funktioniert? Wir helfen gerne weiter:{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="underline underline-offset-4 hover:text-sage"
        >
          {siteConfig.email}
        </a>
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/shop">Zurück zum Shop</ButtonLink>
        <ButtonLink href="/kontakt" variant="ghost">
          Kontakt aufnehmen
        </ButtonLink>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import { HandIcon, PinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Kontakt
   Formular links, Kontaktdaten und Hinweis zum Grosshandel rechts.
   Die Adressdaten sind Platzhalter — bitte ersetzen.
   --------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Kontakt — Anfragen, Grosshandel und Wiederverkauf",
  description:
    "Fragen zu unserem Bio Olivenöl aus Tunesien? Schreiben Sie uns. Anfragen für Grosshandel und Wiederverkauf sind ausdrücklich willkommen.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | ZAYTOUN",
    description:
      "Allgemeine Anfragen, Grosshandel und Wiederverkauf — wir freuen uns auf Ihre Nachricht.",
    url: "/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Schreiben Sie uns"
        intro="Ob Frage zum Öl, zur Ernte oder zu grösseren Mengen — wir antworten in der Regel innerhalb von zwei Werktagen."
      />

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <h2 className="sr-only">Kontaktformular</h2>
          <ContactForm />
        </div>

        <aside className="flex flex-col gap-10">
          <div className="rounded-lg border border-olive/10 bg-cream-light p-8">
            <h2 className="text-[0.65rem] uppercase tracking-brand text-brown">
              Direkt erreichen
            </h2>
            <dl className="mt-6 space-y-5 text-sm text-olive/85">
              <div>
                <dt className="text-xs text-olive/55">E-Mail</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-sage"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-olive/55">Telefon</dt>
                <dd className="mt-1">{siteConfig.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-olive/55">Anschrift</dt>
                <dd className="mt-1 leading-relaxed">
                  Zaytoun
                  <br />
                  Musterstrasse 1<br />
                  00000 Musterstadt
                  <br />
                  Deutschland
                </dd>
              </div>
              <div>
                <dt className="text-xs text-olive/55">Erreichbarkeit</dt>
                <dd className="mt-1">Montag bis Freitag, 9 – 17 Uhr</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-olive/50">
              Diese Angaben sind Platzhalter und werden vor dem Start ersetzt.
            </p>
          </div>

          <div className="rounded-lg bg-sage-light/40 p-8">
            <HandIcon className="h-7 w-7 text-olive" />
            <h2 className="mt-4 text-xl text-olive">
              Grosshandel und Wiederverkauf
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-olive/80">
              Sie führen einen Feinkostladen, ein Restaurant oder einen
              Onlineshop? Wir liefern gerne grössere Mengen und erstellen ein
              Angebot auf Ihre Abnahmemenge. Wählen Sie im Formular einfach
              „Grosshandel“ oder „Wiederverkauf“ und nennen Sie uns Ihre
              ungefähre Bestellmenge.
            </p>
          </div>

          <div className="flex items-start gap-4 text-sm leading-relaxed text-olive/70">
            <PinIcon className="mt-0.5 h-6 w-6 shrink-0 text-sage" />
            <p>
              Unser Öl wird in Nordtunesien angebaut, gepresst und abgefüllt und
              von dort direkt zu uns geliefert.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

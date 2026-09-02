# ZAYTOUN

Onlineshop für **Zaytoun** — Bio natives Olivenöl extra aus Tunesien.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Stripe Checkout.
Alle Inhalte auf Deutsch.

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte eintragen
npm run dev                  # http://localhost:3000
```

## Seiten

| Route | Inhalt |
| --- | --- |
| `/` | Startseite: Hero, Versprechen, Produkte, Geschichte-Teaser |
| `/shop` | Alle Produkte |
| `/shop/[slug]` | Produktdetail mit Grössenwahl und Nährwerten |
| `/geschichte` | Markengeschichte in vier Abschnitten |
| `/kontakt` | Kontaktformular (allgemein / Grosshandel / Wiederverkauf) |
| `/erfolg`, `/abbruch` | Rückleitungen von Stripe Checkout |
| `/api/checkout` | Erstellt die Stripe-Checkout-Session |
| `/api/kontakt` | Nimmt Kontaktanfragen entgegen (derzeit nur Log) |

## Wo was angepasst wird

| Datei | Inhalt |
| --- | --- |
| `src/lib/products.ts` | **Produkte, Grössen, Preise, Nährwerte** |
| `src/lib/images.ts` | Bildregister; leerer Pfad = Platzhalter-Verlauf |
| `src/lib/navigation.ts` | Navigation, Kontaktdaten, Claim, Basis-URL |
| `src/lib/contact.ts` | Anfragearten des Kontaktformulars |
| `src/app/globals.css` | Markenfarben und Schriften als Theme-Tokens |
| `src/components/brand/Logo.tsx` | Inline-Logo (später gegen echte Datei tauschen) |
| `public/images` | Fotos ablegen |

## Umgebungsvariablen

Siehe `.env.example`. `.env.local` wird nicht eingecheckt.
Ohne `STRIPE_SECRET_KEY` meldet die Kasse verständlich, dass sie noch nicht
eingerichtet ist — der Rest der Seite funktioniert normal.

## Prüfen vor dem Deployen

```bash
npm run lint
npm run build
```

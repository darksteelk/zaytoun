# ZAYTOUN

Onlineshop für **Zaytoun** — Bio natives Olivenöl extra aus Tunesien.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Stripe Checkout.

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte eintragen
npm run dev                  # http://localhost:3000
```

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/app` | Seiten (App Router) und API-Routen |
| `src/components` | UI-Bausteine (brand, layout, home, product, cart, trust, ui, icons) |
| `src/lib/products.ts` | **Produkte, Grössen und Preise — hier Preise ändern** |
| `src/lib/images.ts` | Bildregister; leerer Pfad = Platzhalter-Verlauf |
| `src/lib/navigation.ts` | Navigation, Kontaktdaten, Claim |
| `public/images` | Fotos ablegen |

## Umgebungsvariablen

Siehe `.env.example`. `.env.local` wird nicht eingecheckt.

## Build

```bash
npm run build
```

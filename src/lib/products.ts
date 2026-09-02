/* ---------------------------------------------------------------
   ZAYTOUN — Produktdaten
   Einzige Quelle der Wahrheit für Produkte, Preise und Texte.
   Preise in Cent (Ganzzahl), damit Stripe sie direkt übernehmen kann.
   --------------------------------------------------------------- */

export type ProductSlug =
  | "natives-olivenoel-extra-250ml"
  | "natives-olivenoel-extra-500ml"
  | "natives-olivenoel-extra-1l";

export interface Product {
  slug: ProductSlug;
  /** Produktname ohne Grössenangabe */
  name: string;
  /** Grösse, z. B. "500 ml" */
  size: string;
  /** Füllmenge in Millilitern — für Sortierung und Grundpreis */
  volumeMl: number;
  /** Preis in Cent, z. B. 990 = 9,90 € */
  priceCents: number;
  /** Kurztext für Karten und Listen */
  shortDescription: string;
  /** Fliesstext für die Produktdetailseite */
  description: string[];
  /**
   * Pfad zum Produktfoto in /public/images.
   * Leer lassen -> es wird ein Platzhalter-Verlauf angezeigt.
   */
  image: string;
  imageAlt: string;
}

export const CURRENCY = "eur";

export const products: Product[] = [
  {
    slug: "natives-olivenoel-extra-250ml",
    name: "Natives Olivenöl Extra — Bio",
    size: "250 ml",
    volumeMl: 250,
    priceCents: 990,
    shortDescription:
      "Die kleine Flasche zum Kennenlernen — frisch, grasig, mit feiner Schärfe im Abgang.",
    description: [
      "Unser natives Olivenöl extra stammt aus biologisch bewirtschafteten Hainen im Norden Tunesiens. Die Oliven werden von Hand gelesen und noch am selben Tag kalt gepresst — so bleiben Aroma, Polyphenole und Vitamin E erhalten.",
      "Die 250-ml-Flasche ist ideal, um Zaytoun zum ersten Mal zu probieren, oder als Geschenk für alle, die gutes Öl zu schätzen wissen.",
    ],
    image: "/images/product-250ml.svg",
    imageAlt: "Zaytoun Bio Olivenöl in der 250-ml-Flasche",
  },
  {
    slug: "natives-olivenoel-extra-500ml",
    name: "Natives Olivenöl Extra — Bio",
    size: "500 ml",
    volumeMl: 500,
    priceCents: 1690,
    shortDescription:
      "Unsere beliebteste Grösse — für die tägliche Küche, für Salate, Gemüse und Brot.",
    description: [
      "Unser natives Olivenöl extra stammt aus biologisch bewirtschafteten Hainen im Norden Tunesiens. Die Oliven werden von Hand gelesen und noch am selben Tag kalt gepresst — so bleiben Aroma, Polyphenole und Vitamin E erhalten.",
      "Die 500-ml-Flasche ist unsere meistgekaufte Grösse: genug für mehrere Wochen in einer Küche, in der jeden Tag frisch gekocht wird.",
    ],
    image: "/images/product-500ml.svg",
    imageAlt: "Zaytoun Bio Olivenöl in der 500-ml-Flasche",
  },
  {
    slug: "natives-olivenoel-extra-1l",
    name: "Natives Olivenöl Extra — Bio",
    size: "1 Liter",
    volumeMl: 1000,
    priceCents: 2990,
    shortDescription:
      "Die Vorratsflasche für alle, die täglich mit gutem Olivenöl kochen.",
    description: [
      "Unser natives Olivenöl extra stammt aus biologisch bewirtschafteten Hainen im Norden Tunesiens. Die Oliven werden von Hand gelesen und noch am selben Tag kalt gepresst — so bleiben Aroma, Polyphenole und Vitamin E erhalten.",
      "Der Liter ist die günstigste Variante pro Milliliter — für Familien, Vielköche und alle, die Zaytoun bereits kennen.",
    ],
    image: "/images/product-1l.svg",
    imageAlt: "Zaytoun Bio Olivenöl in der 1-Liter-Flasche",
  },
];

/** Nährwerte pro 100 ml — Platzhalterwerte, bitte vor dem Verkauf prüfen. */
export const nutritionPer100ml: { label: string; value: string }[] = [
  { label: "Energie", value: "3404 kJ / 828 kcal" },
  { label: "Fett", value: "92 g" },
  { label: "davon gesättigte Fettsäuren", value: "13 g" },
  { label: "Kohlenhydrate", value: "0 g" },
  { label: "davon Zucker", value: "0 g" },
  { label: "Eiweiss", value: "0 g" },
  { label: "Salz", value: "0 g" },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** 1690 -> "16,90 €" */
export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}

/** Grundpreis, z. B. "33,80 € / Liter" */
export function formatUnitPrice(product: Product): string {
  const perLitre = (product.priceCents / product.volumeMl) * 1000;
  return `${formatPrice(perLitre)} / Liter`;
}

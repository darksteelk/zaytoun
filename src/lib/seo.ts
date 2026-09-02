import type { Metadata } from "next";
import { ogImage } from "@/lib/images";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Open Graph
   Next ersetzt ein openGraph-Objekt einer Seite vollständig durch
   das der Seite; es wird nicht mit dem Layout verschmolzen. Ohne
   diesen Helfer verlören Unterseiten Bild, Seitenname, Sprache und
   Typ. Daher bauen alle Seiten ihr openGraph hierüber.
   --------------------------------------------------------------- */

interface OpenGraphInput {
  title: string;
  description: string;
  /** Pfad relativ zur Basis-URL, z. B. "/shop". */
  url: string;
}

export function buildOpenGraph({
  title,
  description,
  url,
}: OpenGraphInput): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "de_DE",
    siteName: siteConfig.name,
    title,
    description,
    url,
    images: [ogImage],
  };
}

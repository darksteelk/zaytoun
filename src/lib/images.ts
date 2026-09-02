/* ---------------------------------------------------------------
   ZAYTOUN — Bildregister
   Zentrale Stelle für alle Fotos der Website. Derzeit zeigen alle
   Slots die SVG-Platzhalter aus /public/images.

   Echtes Foto einsetzen: Datei nach /public/images legen und hier
   den Pfad ändern, z. B. heroGrove: "/images/olivenhain.jpg".
   Einzelne Slots können nacheinander getauscht werden — der Rest
   bleibt unverändert. Ein leerer Pfad ("") zeigt den eingebauten
   Verlauf mit Olivenzweig.

   Empfohlene Seitenverhältnisse (wie die Platzhalter):
     Hero            16:9    (1600 × 900)
     Geschichte      3:2     (1200 × 800)
     Produkt         4:5     (800 × 1000)
     Teilen-Bild     1.91:1  (1200 × 630)
   --------------------------------------------------------------- */

export const images = {
  /** Startseite — Hero, weiter Blick über den Olivenhain */
  heroGrove: "/images/hero-home.svg",
  /** Startseite — Teaser zur Markengeschichte */
  storyTeaser: "/images/story-grove.svg",
  /** Geschichte — Bio & Natürlich */
  storyOrganic: "/images/story-grove.svg",
  /** Geschichte — Sonnengereift */
  storySun: "/images/hero-home.svg",
  /** Geschichte — Handverlesen, Ernte von Hand */
  storyHarvest: "/images/story-harvest.svg",
  /** Geschichte — Produkt aus Tunesien */
  storyTunisia: "/images/story-bottling.svg",
  /** Shop — stimmungsvolles Kopfbild (derzeit ungenutzt) */
  shopHeader: "/images/story-bottling.svg",
} as const;

/**
 * Vorschaubild beim Teilen in sozialen Netzwerken (Open Graph).
 * Zeigt das Logo auf cremefarbenem Grund. PNG, weil Facebook,
 * LinkedIn und X keine SVG-Dateien anzeigen.
 */
export const ogImage = {
  url: "/images/og-share-image.png",
  width: 1200,
  height: 630,
  alt: "ZAYTOUN — Extra Virgin Olive Oil, Tunisia",
} as const;

export type ImageSlot = keyof typeof images;

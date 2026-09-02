/* ---------------------------------------------------------------
   ZAYTOUN — Bildregister
   Zentrale Stelle für alle Fotos der Website. Solange ein Pfad
   leer ist ("") zeigt <Photo> einen Platzhalter-Verlauf in den
   Markenfarben. Zum Einsetzen echter Fotos: Datei nach
   /public/images legen und hier den Pfad eintragen, z. B.
   heroGrove: "/images/olivenhain.jpg".
   --------------------------------------------------------------- */

export const images = {
  /** Startseite — Hero, weiter Blick über den Olivenhain */
  heroGrove: "",
  /** Startseite — Teaser zur Markengeschichte */
  storyTeaser: "",
  /** Geschichte — Bio & Natürlich */
  storyOrganic: "",
  /** Geschichte — Sonnengereift */
  storySun: "",
  /** Geschichte — Handverlesen, Ernte von Hand */
  storyHarvest: "",
  /** Geschichte — Produkt aus Tunesien */
  storyTunisia: "",
  /** Shop — stimmungsvolles Kopfbild */
  shopHeader: "",
} as const;

export type ImageSlot = keyof typeof images;

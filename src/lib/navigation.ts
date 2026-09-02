/* ---------------------------------------------------------------
   ZAYTOUN — Navigation
   Zentrale Liste der Hauptnavigation, genutzt in Header und Footer.
   --------------------------------------------------------------- */

export interface NavLink {
  href: string;
  label: string;
}

export const mainNav: NavLink[] = [
  { href: "/shop", label: "Shop" },
  { href: "/geschichte", label: "Unsere Geschichte" },
  { href: "/kontakt", label: "Kontakt" },
];

/**
 * Basis-URL der Seite — für canonical-Links, Open Graph und sitemap.xml.
 * Solange es noch keine eigene Domain gibt, greift automatisch die von
 * Vercel vergebene Adresse; lokal bleibt es localhost. Sobald die Domain
 * steht: NEXT_PUBLIC_SITE_URL in den Vercel-Projekteinstellungen setzen.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "ZAYTOUN",
  tagline: "Rein. Authentisch. Tunesisch.",
  taglineEn: "Pure. Authentic. Tunisian.",
  description:
    "Bio natives Olivenöl extra aus Tunesien — handverlesen, kaltgepresst und in kleinen Chargen abgefüllt.",
  url: resolveSiteUrl(),
  /* Platzhalter — vor dem Start durch die echten Kontaktdaten ersetzen. */
  email: "hallo@zaytoun.de",
  phone: "+49 (0) 000 000 000",
} as const;

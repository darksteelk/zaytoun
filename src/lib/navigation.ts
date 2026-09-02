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

export const siteConfig = {
  name: "ZAYTOUN",
  tagline: "Rein. Authentisch. Tunesisch.",
  taglineEn: "Pure. Authentic. Tunisian.",
  description:
    "Bio natives Olivenöl extra aus Tunesien — handverlesen, kaltgepresst und in kleinen Chargen abgefüllt.",
  /** Für Open-Graph-URLs; in Vercel als NEXT_PUBLIC_SITE_URL setzen. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaytoun.example",
  email: "hallo@zaytoun.de",
  phone: "+49 (0) 000 000 000",
} as const;

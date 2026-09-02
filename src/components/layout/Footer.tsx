import Link from "next/link";
import Logo from "@/components/brand/Logo";
import TrustBar from "@/components/trust/TrustBar";
import { mainNav, siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Fussbereich
   Logo, Navigation, Social-Platzhalter und die schmale
   Versprechen-Leiste am unteren Rand.
   --------------------------------------------------------------- */

/* Platzhalter für Social-Media-Profile — echte URLs später eintragen. */
const socials = [
  {
    label: "Instagram",
    href: "#",
    path: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5.2-1.4v.01",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5H17.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8.5v3h2.7V21",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M14.5 3v10.8a3.2 3.2 0 1 1-2.6-3.1M14.5 5.4A4.6 4.6 0 0 0 19 8.6",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-olive text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="full" tone="light" size="sm" className="items-start" />
          <p className="mt-6 max-w-xs text-xs leading-relaxed text-cream/70">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="text-[0.65rem] uppercase tracking-brand text-cream/60">
            Entdecken
          </h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/"
                className="text-sm text-cream/85 transition-colors hover:text-sage-light"
              >
                Startseite
              </Link>
            </li>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/85 transition-colors hover:text-sage-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.65rem] uppercase tracking-brand text-cream/60">
            Kontakt
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/85">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-sage-light"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.phone}</li>
            <li className="text-cream/60">
              Anfragen für Grosshandel und Wiederverkauf sind willkommen.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[0.65rem] uppercase tracking-brand text-cream/60">
            Folgen
          </h3>
          <ul className="mt-5 flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-sage-light hover:text-sage-light"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-cream/50">
            Social-Profile folgen in Kürze.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-cream/15 px-6 py-6 text-[0.65rem] text-cream/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
          vorbehalten.
        </p>
        <p className="uppercase tracking-brand">{siteConfig.tagline}</p>
      </div>

      <TrustBar />
    </footer>
  );
}

import Link from "next/link";

/* ---------------------------------------------------------------
   ZAYTOUN — Wortmarke
   Vorläufiges Inline-Logo: stilisierter Olivenbaum über der
   Wortmarke, darunter die Zeile "EXTRA VIRGIN OLIVE OIL — TUNISIA".
   Sobald die echte Logodatei vorliegt, kann der <OliveTreeMark>
   durch ein <Image src="/images/logo.svg" ... /> ersetzt werden —
   alles Übrige bleibt unverändert.
   --------------------------------------------------------------- */

/** Stilisierter Olivenbaum — Krone aus Blattgruppen über einem Stamm. */
export function OliveTreeMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Stamm und Wurzelansatz */}
      <path d="M32 56V33" />
      <path d="M32 45c-3.5-2.4-5.6-5-6.6-8M32 41c3.3-2.2 5.3-4.7 6.3-7.6" />
      <path d="M25 56c3-2.4 5-3.6 7-3.6s4 1.2 7 3.6" />
      {/* Krone */}
      <path d="M32 33c-9.4 0-17-5.8-17-13S22.6 8 32 8s17 4.8 17 12-7.6 13-17 13Z" />
      <path d="M18.5 15.5c4-3 8.7-4.5 13.5-4.5s9.5 1.5 13.5 4.5" />
      <path d="M20.5 25c3.6 2.4 7.5 3.6 11.5 3.6S39.9 27.4 43.5 25" />
      {/* Oliven */}
      <circle cx="24" cy="20.5" r="1.7" />
      <circle cx="40" cy="20.5" r="1.7" />
      <circle cx="32" cy="17" r="1.7" />
    </svg>
  );
}

interface LogoProps {
  /** Ohne href wird nur die Marke gerendert (z. B. im Hero). */
  href?: string;
  /** "sm" für Header/Footer, "lg" für den Hero. */
  size?: "sm" | "md" | "lg";
  /** Untertitel ausblenden, wenn wenig Platz ist. */
  showTagline?: boolean;
  className?: string;
}

export default function Logo({
  href = "/",
  size = "sm",
  showTagline = true,
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { mark: "h-8 w-8", word: "text-xl", tag: "text-[0.5rem]" },
    md: { mark: "h-14 w-14", word: "text-3xl sm:text-4xl", tag: "text-[0.6rem]" },
    lg: { mark: "h-20 w-20 sm:h-24 sm:w-24", word: "text-5xl sm:text-7xl", tag: "text-[0.65rem] sm:text-xs" },
  }[size];

  const mark = (
    <span className={`flex flex-col items-center ${className}`}>
      <OliveTreeMark className={sizes.mark} />
      <span
        className={`font-display ${sizes.word} tracking-brand leading-none mt-2 pl-[0.28em]`}
      >
        ZAYTOUN
      </span>
      {showTagline && (
        <span
          className={`${sizes.tag} tracking-brand uppercase mt-2 pl-[0.28em] opacity-80`}
        >
          Extra Virgin Olive Oil — Tunisia
        </span>
      )}
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="ZAYTOUN — zur Startseite" className="inline-flex">
      {mark}
    </Link>
  );
}

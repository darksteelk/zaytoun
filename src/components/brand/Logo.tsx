import Image from "next/image";
import Link from "next/link";

/* ---------------------------------------------------------------
   ZAYTOUN — Marke
   Zwei Ausprägungen des Logos:
     "full" — die komplette Bildmarke (Olivenbaum, Wortmarke, BIO)
     "mark" — nur der Olivenbaum, darunter die Wortmarke als Text
   Für dunkle Flächen (Footer, Hero über Foto) gibt es von beiden
   eine cremefarbene Negativfassung: tone="light".

   Die Dateien in /public/images sind aus zaytoun_logo.png
   abgeleitet (freigestellt, beschnitten). Wird das Logo erneuert,
   müssen die vier Dateien zusammen ausgetauscht werden.
   --------------------------------------------------------------- */

const assets = {
  full: {
    dark: "/images/zaytoun-logo.png",
    light: "/images/zaytoun-logo-light.png",
    width: 900,
    height: 924,
  },
  mark: {
    dark: "/images/zaytoun-mark.png",
    light: "/images/zaytoun-mark-light.png",
    width: 640,
    height: 514,
  },
} as const;

/* Darstellungsgrössen je Ausprägung. "sizes" muss zur Breite passen,
   damit der Bildoptimierer nicht unnötig grosse Dateien ausliefert. */
const scales = {
  full: {
    sm: { image: "w-[150px]", sizes: "150px", word: "", tag: "text-[0.5rem]" },
    md: { image: "w-[220px]", sizes: "220px", word: "", tag: "text-[0.6rem]" },
    lg: {
      image: "w-[220px] sm:w-[300px]",
      sizes: "(min-width: 640px) 300px, 220px",
      word: "",
      tag: "text-[0.65rem] sm:text-xs",
    },
  },
  mark: {
    sm: { image: "h-9", sizes: "45px", word: "text-xl", tag: "text-[0.5rem]" },
    md: { image: "h-14", sizes: "70px", word: "text-3xl sm:text-4xl", tag: "text-[0.6rem]" },
    lg: {
      image: "h-20 sm:h-24",
      sizes: "(min-width: 640px) 120px, 100px",
      word: "text-5xl sm:text-7xl",
      tag: "text-[0.65rem] sm:text-xs",
    },
  },
} as const;

interface LogoProps {
  /** Ohne href wird nur die Marke gerendert (z. B. im Hero). */
  href?: string;
  /** Komplette Bildmarke oder nur der Baum über der Wortmarke. */
  variant?: "full" | "mark";
  /** "light" für die Negativfassung auf dunklem Grund. */
  tone?: "dark" | "light";
  /** "sm" für Header/Footer, "lg" für den Hero. */
  size?: "sm" | "md" | "lg";
  /** Untertitel unter der Wortmarke — nur bei variant="mark". */
  showTagline?: boolean;
  /** Für sichtbare Bereiche ohne Scrollen (Hero): sofort laden. */
  eager?: boolean;
  className?: string;
}

export default function Logo({
  href = "/",
  variant = "full",
  tone = "dark",
  size = "sm",
  showTagline = false,
  eager = false,
  className = "",
}: LogoProps) {
  const asset = assets[variant];
  const scale = scales[variant][size];
  const isFull = variant === "full";

  const mark = (
    <span className={`flex flex-col items-center ${className}`}>
      <Image
        src={asset[tone]}
        alt={isFull ? "ZAYTOUN — Bio Olivenöl aus Tunesien" : ""}
        width={asset.width}
        height={asset.height}
        sizes={scale.sizes}
        loading={eager ? "eager" : "lazy"}
        className={`${scale.image} ${isFull ? "h-auto" : "w-auto"}`}
      />

      {!isFull && (
        <span
          className={`font-display ${scale.word} tracking-brand leading-none mt-2 pl-[0.28em]`}
        >
          ZAYTOUN
        </span>
      )}

      {!isFull && showTagline && (
        <span
          className={`${scale.tag} tracking-brand uppercase mt-2 pl-[0.28em] opacity-80`}
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

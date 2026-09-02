import Image from "next/image";
import { OliveBranchIcon } from "@/components/icons";

/* ---------------------------------------------------------------
   ZAYTOUN — Bildkomponente mit Platzhalter
   Gibt es (noch) kein Foto, wird ein weicher Verlauf in Oliv- und
   Cremetönen mit Olivenzweig-Motiv gezeigt. Sobald in
   lib/images.ts oder in den Produktdaten ein Pfad hinterlegt ist,
   erscheint automatisch das echte Bild — ohne Layoutwechsel.
   --------------------------------------------------------------- */

type Tone = "olive" | "sage" | "cream";

const tones: Record<Tone, string> = {
  olive: "from-olive via-olive-700 to-sage text-cream/35",
  sage: "from-sage via-sage-light to-cream text-olive/25",
  cream: "from-cream-light via-cream to-sage-light text-olive/20",
};

interface PhotoProps {
  /** Bildpfad; leer lassen für den Platzhalter. */
  src?: string;
  alt: string;
  /** Klassen für Grösse/Seitenverhältnis des Rahmens. */
  className?: string;
  /** Farbstimmung des Platzhalters. */
  tone?: Tone;
  /** Für das Hero-Bild: früh laden. */
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}

export default function Photo({
  src,
  alt,
  className = "",
  tone = "sage",
  priority = false,
  sizes = "100vw",
  children,
}: PhotoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`}
        >
          {/* Dezentes Olivenzweig-Muster als Platzhaltermotiv */}
          <OliveBranchIcon className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}
      {children}
    </div>
  );
}

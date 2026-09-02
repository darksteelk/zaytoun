import { trustBadges } from "@/components/trust/badges";

/* ---------------------------------------------------------------
   ZAYTOUN — Badge-Reihe mit Icons (Startseite)
   --------------------------------------------------------------- */

export default function TrustBadges() {
  return (
    <section
      aria-label="Unsere Qualitätsversprechen"
      className="border-y border-olive/10 bg-cream-light"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:py-14 lg:grid-cols-4">
        {trustBadges.map((badge) => (
          <li
            key={badge.id}
            className="flex flex-col items-center gap-3 text-center"
          >
            <badge.Icon className="h-8 w-8 text-sage" />
            <span className="text-[0.7rem] uppercase tracking-brand text-olive">
              {badge.title}
            </span>
            <span className="max-w-[22ch] text-xs leading-relaxed text-olive/60">
              {badge.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

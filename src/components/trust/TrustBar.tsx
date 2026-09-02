import { trustBadges } from "@/components/trust/badges";

/* ---------------------------------------------------------------
   ZAYTOUN — schmale Leiste ganz unten im Footer
   100 % BIO | KALTGEPRESST | HANDVERLESEN | AUS TUNESIEN
   --------------------------------------------------------------- */

export default function TrustBar() {
  return (
    <div className="border-t border-cream/15 bg-olive-800">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 text-[0.6rem] uppercase tracking-brand text-cream/80">
        {trustBadges.map((badge, index) => (
          <li key={badge.id} className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <badge.Icon className="h-3.5 w-3.5" />
              {badge.short}
            </span>
            {index < trustBadges.length - 1 && (
              <span aria-hidden className="text-cream/30">
                |
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

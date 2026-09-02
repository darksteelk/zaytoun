import Photo from "@/components/ui/Photo";
import Logo from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Hero
   Vollflächiges Bild eines Olivenhains (Platzhalter), darüber
   Wortmarke, Claim und der Weg in den Shop.
   --------------------------------------------------------------- */

export default function Hero() {
  return (
    <section className="relative isolate">
      <Photo
        src={images.heroGrove}
        alt="Sonnendurchfluteter Olivenhain in Tunesien"
        tone="olive"
        priority
        sizes="100vw"
        className="h-[78vh] min-h-[520px] w-full"
      >
        {/* Abdunklung für lesbare Schrift auf echtem Foto */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-olive/70 via-olive/45 to-olive/75"
        />
      </Photo>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex max-w-2xl flex-col items-center text-center text-cream">
          <Logo href="" variant="full" tone="light" size="lg" eager />

          <p className="mt-8 text-xs uppercase tracking-brand text-cream/85 sm:text-sm">
            {siteConfig.tagline}
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
            Bio natives Olivenöl extra aus den Hainen Nordtunesiens —
            handverlesen, am Tag der Ernte kaltgepresst und in kleinen Chargen
            abgefüllt.
          </p>

          <ButtonLink href="/shop" variant="light" size="lg" className="mt-10">
            Jetzt entdecken
            <ArrowRightIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

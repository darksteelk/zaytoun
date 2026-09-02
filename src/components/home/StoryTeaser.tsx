import Photo from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { OliveBranchIcon } from "@/components/icons";
import { images } from "@/lib/images";

/* ---------------------------------------------------------------
   ZAYTOUN — Teaser zur Markengeschichte
   --------------------------------------------------------------- */

export default function StoryTeaser() {
  return (
    <section className="bg-sage-light/35">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
        <Photo
          src={images.storyTeaser}
          alt="Olivenbäume in einem tunesischen Hain am frühen Morgen"
          tone="sage"
          sizes="(min-width: 1024px) 50vw, 90vw"
          className="aspect-4/3 w-full rounded-lg"
        />

        <div className="flex flex-col items-start">
          <span className="text-[0.65rem] uppercase tracking-brand text-brown">
            Unsere Geschichte
          </span>
          <h2 className="mt-3 text-3xl leading-tight text-olive sm:text-4xl">
            Zaytoun ist mehr als nur Olivenöl
          </h2>
          <OliveBranchIcon className="mt-4 h-5 w-16 text-sage" />

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-olive/80 sm:text-base">
            <p>
              Es ist die Geschichte eines Landes, in dem seit über zweitausend
              Jahren Oliven wachsen. Von Familien, die ihre Bäume kennen wie
              alte Nachbarn. Von einer Ernte, die im Herbst beginnt, wenn die
              Sonne noch warm und die Nächte schon kühl sind.
            </p>
            <p>
              Wir arbeiten mit kleinen Produzenten in Nordtunesien zusammen,
              ernten von Hand und pressen noch am selben Tag. Was in die
              Flasche kommt, ist nichts als Olive — nichts wird zugesetzt,
              nichts geschönt.
            </p>
          </div>

          <ButtonLink href="/geschichte" variant="secondary" className="mt-8">
            Mehr erfahren
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

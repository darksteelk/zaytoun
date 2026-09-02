import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Photo from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { DropletIcon, HandIcon, type IconProps, LeafIcon, PinIcon, SunIcon } from "@/components/icons";
import { images } from "@/lib/images";

/* ---------------------------------------------------------------
   ZAYTOUN — Unsere Geschichte
   Vier Abschnitte, die den vier Versprechen auf der Startseite
   entsprechen, jeweils im Wechsel Bild/Text.
   --------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Unsere Geschichte — Olivenöl aus Tunesien",
  description:
    "Wie Zaytoun entsteht: biologischer Anbau, tunesische Sonne, Ernte von Hand und schonende Kaltpressung — erzählt von den Hainen im Norden Tunesiens.",
  alternates: { canonical: "/geschichte" },
  openGraph: {
    title: "Unsere Geschichte | ZAYTOUN",
    description:
      "Biologischer Anbau, tunesische Sonne, Ernte von Hand: die Geschichte hinter unserem nativen Olivenöl extra.",
    url: "/geschichte",
  },
};

interface StorySection {
  id: string;
  Icon: (props: IconProps) => React.ReactElement;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

const sections: StorySection[] = [
  {
    id: "bio",
    Icon: LeafIcon,
    eyebrow: "Bio & Natürlich",
    title: "Böden, die man in Ruhe lässt",
    paragraphs: [
      "Unsere Haine werden zertifiziert biologisch bewirtschaftet: keine synthetischen Pestizide, kein Kunstdünger, keine Herbizide. Zwischen den Bäumen wächst, was wachsen will — Wildkräuter, Klee, Gräser. Das hält den Boden lebendig und speichert Feuchtigkeit in einem Land, in dem Wasser kostbar ist.",
      "Gepflegt wird mit der Hand und mit Geduld. Ein Olivenbaum, der gut behandelt wird, trägt über Generationen. Manche unserer Bäume standen schon hier, als das Land noch anders hiess.",
    ],
    image: images.storyOrganic,
    imageAlt: "Wildkräuter zwischen den Reihen eines biologischen Olivenhains",
  },
  {
    id: "sonnengereift",
    Icon: SunIcon,
    eyebrow: "Sonnengereift",
    title: "Mehr als dreitausend Stunden Licht",
    paragraphs: [
      "Der Norden Tunesiens bekommt im Jahr über 3 000 Sonnenstunden. Heisse, trockene Sommer und milde Winter mit Regen aus dem Mittelmeer — genau das Klima, in dem Oliven langsam und vollständig ausreifen.",
      "Diese lange Reife schmeckt man: grasige Frische im Antrunk, eine Note von grüner Mandel, und am Ende die feine Schärfe im Hals, die von den Polyphenolen kommt. Sie ist kein Fehler, sondern das Kennzeichen eines frischen, gesunden Öls.",
    ],
    image: images.storySun,
    imageAlt: "Abendsonne über den Kronen eines tunesischen Olivenhains",
  },
  {
    id: "handverlesen",
    Icon: HandIcon,
    eyebrow: "Handverlesen",
    title: "Die Ernte beginnt im Herbst",
    paragraphs: [
      "Wenn die Oliven von Grün ins Violette kippen, beginnt die Ernte. Netze werden unter den Bäumen ausgelegt, die Zweige von Hand abgestreift. Keine Maschine, die den Baum schüttelt und dabei Holz und Frucht verletzt.",
      "Was am Morgen gepflückt wird, ist am selben Tag in der Mühle. Zwischen Ernte und Pressung liegen selten mehr als ein paar Stunden — je kürzer diese Spanne, desto niedriger der Säuregehalt und desto klarer das Aroma.",
    ],
    image: images.storyHarvest,
    imageAlt: "Hände, die reife Oliven von einem Zweig in ein Netz streifen",
  },
  {
    id: "tunesien",
    Icon: PinIcon,
    eyebrow: "Produkt aus Tunesien",
    title: "Vom Hain bis in die Flasche im Land",
    paragraphs: [
      "Tunesien gehört zu den grössten Olivenölproduzenten der Welt — nur wird das meiste davon in Tanks ausgeführt und anderswo abgefüllt. Wir machen es anders: Anbau, Pressung und Abfüllung finden vor Ort statt.",
      "Wir arbeiten mit kleinen Familienbetrieben zusammen, die wir persönlich kennen, und zahlen Preise, von denen sich eine Ernte auch im nächsten Jahr noch lohnt. Auf der Flasche steht deshalb nicht nur ein Herkunftsland, sondern eine Herkunft.",
    ],
    image: images.storyTunisia,
    imageAlt: "Traditionelle Ölmühle in Nordtunesien",
  },
];

export default function GeschichtePage() {
  return (
    <>
      <PageHeader
        eyebrow="Unsere Geschichte"
        title="Zaytoun ist mehr als nur Olivenöl"
        intro="Zaytoun heisst auf Arabisch schlicht Olive. Hinter dem Wort steht ein Land, in dem seit über zweitausend Jahren Olivenbäume stehen — und die Arbeit der Familien, die sie bis heute pflegen."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <p className="text-base leading-relaxed text-olive/80 sm:text-lg">
          Es gibt viele Olivenöle. Wenige erzählen, woher sie kommen. Wir haben
          Zaytoun gegründet, weil wir fanden, dass ein Öl aus tunesischen Hainen
          auch als tunesisches Öl in die Küche kommen sollte — mit Namen,
          Herkunft und einem Geschmack, der nach der Landschaft schmeckt, in der
          es gewachsen ist.
        </p>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index % 2 === 1 ? "bg-cream-light" : undefined}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <Photo
              src={section.image}
              alt={section.imageAlt}
              tone={index % 2 === 1 ? "cream" : "sage"}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className={`aspect-4/3 w-full rounded-lg ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            />

            <div>
              <span className="inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-brand text-brown">
                <section.Icon className="h-5 w-5 text-sage" />
                {section.eyebrow}
              </span>
              <h2 className="mt-4 text-3xl leading-tight text-olive sm:text-4xl">
                {section.title}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-olive/80 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-olive text-cream">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-24">
          <DropletIcon className="h-8 w-8 text-sage-light" />
          <h2 className="mt-6 text-3xl leading-tight sm:text-4xl">
            Kaltgepresst, und sonst nichts
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-cream/80 sm:text-base">
            In der Mühle wird die Olive mit Kern vermahlen und die Paste unter
            27 °C mechanisch getrennt. Keine Wärme, keine Lösungsmittel, keine
            Raffination. Was herauskommt, ist Saft — nur eben aus einer Frucht,
            die man nicht isst.
          </p>
          <ButtonLink href="/shop" variant="light" size="lg" className="mt-10">
            Unser Öl probieren
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

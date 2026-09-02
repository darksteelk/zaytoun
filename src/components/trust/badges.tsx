import {
  DropletIcon,
  HandIcon,
  type IconProps,
  LeafIcon,
  PinIcon,
  SunIcon,
} from "@/components/icons";

/* ---------------------------------------------------------------
   ZAYTOUN — Markenversprechen
   Die vier Badges erscheinen auf der Startseite, im Footer und
   als Abschnitte auf der Geschichte-Seite.
   --------------------------------------------------------------- */

export interface TrustBadge {
  id: string;
  Icon: (props: IconProps) => React.ReactElement;
  title: string;
  short: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  {
    id: "bio",
    Icon: LeafIcon,
    title: "100 % Bio",
    short: "100 % BIO",
    description:
      "Zertifiziert biologischer Anbau — ohne synthetische Pestizide oder Kunstdünger.",
  },
  {
    id: "kaltgepresst",
    Icon: DropletIcon,
    title: "Kaltgepresst",
    short: "KALTGEPRESST",
    description:
      "Schonend unter 27 °C gepresst, damit Aroma und wertvolle Inhaltsstoffe erhalten bleiben.",
  },
  {
    id: "handverlesen",
    Icon: HandIcon,
    title: "Handverlesen",
    short: "HANDVERLESEN",
    description:
      "Jede Olive wird von Hand geerntet und noch am selben Tag verarbeitet.",
  },
  {
    id: "tunesien",
    Icon: PinIcon,
    title: "Aus Tunesien",
    short: "AUS TUNESIEN",
    description:
      "Angebaut, gepresst und abgefüllt in den Olivenhainen Nordtunesiens.",
  },
];

/** Zusätzliches Versprechen für die Geschichte-Seite. */
export const sunBadge: TrustBadge = {
  id: "sonnengereift",
  Icon: SunIcon,
  title: "Sonnengereift",
  short: "SONNENGEREIFT",
  description:
    "Über 3 000 Sonnenstunden im Jahr geben unseren Oliven ihr volles, rundes Aroma.",
};

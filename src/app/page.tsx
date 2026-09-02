import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/trust/TrustBadges";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoryTeaser from "@/components/home/StoryTeaser";

export const metadata: Metadata = {
  title: "ZAYTOUN — Bio Olivenöl aus Tunesien",
  description:
    "Handverlesen, kaltgepresst, aus Tunesien: Bio natives Olivenöl extra von Zaytoun. In 250 ml, 500 ml und 1 Liter direkt online bestellen.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ZAYTOUN — Bio Olivenöl aus Tunesien",
    description:
      "Handverlesen, kaltgepresst, aus Tunesien: Bio natives Olivenöl extra von Zaytoun.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedProducts />
      <StoryTeaser />
    </>
  );
}

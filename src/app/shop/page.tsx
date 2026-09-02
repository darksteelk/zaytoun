import { buildOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/product/ProductCard";
import TrustBadges from "@/components/trust/TrustBadges";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Bio Olivenöl in 250 ml, 500 ml und 1 Liter",
  description:
    "Bestellen Sie Zaytoun Bio natives Olivenöl extra aus Tunesien: 250 ml, 500 ml oder 1 Liter. Handverlesen, kaltgepresst, in kleinen Chargen abgefüllt.",
  alternates: { canonical: "/shop" },
  openGraph: buildOpenGraph({
    title: "Shop — Bio Olivenöl aus Tunesien | ZAYTOUN",
    description:
      "Bio natives Olivenöl extra in 250 ml, 500 ml und 1 Liter. Handverlesen und kaltgepresst in Tunesien.",
    url: "/shop",
  }),
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Unser Olivenöl"
        intro="Ein Öl, drei Grössen. Alle Flaschen stammen aus derselben Ernte und werden nach der Pressung dunkel und kühl gelagert, damit sie so frisch bei Ihnen ankommen, wie sie den Hain verlassen haben."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-xs leading-relaxed text-olive/60">
          Alle Preise inklusive gesetzlicher Mehrwertsteuer, zuzüglich Versand.
          Sie möchten grössere Mengen beziehen? Schreiben Sie uns — Anfragen für
          Grosshandel und Wiederverkauf sind ausdrücklich willkommen.
        </p>
      </section>

      <TrustBadges />
    </>
  );
}

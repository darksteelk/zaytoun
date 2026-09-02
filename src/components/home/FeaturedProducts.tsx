import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Produktauswahl auf der Startseite
   --------------------------------------------------------------- */

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <SectionHeading
        eyebrow="Unser Öl"
        title="Eine Ernte, drei Grössen"
        description="Dasselbe native Olivenöl extra — zum Probieren, für die tägliche Küche oder als Vorrat. Frisch gepresst, ungefiltert im Charakter, ehrlich im Geschmack."
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <ButtonLink href="/shop" variant="ghost">
          Alle Produkte ansehen
        </ButtonLink>
      </div>
    </section>
  );
}

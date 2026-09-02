import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/ui/Photo";
import ProductPurchase from "@/components/product/ProductPurchase";
import { trustBadges } from "@/components/trust/badges";
import {
  formatPrice,
  formatUnitPrice,
  getProduct,
  nutritionPer100ml,
  products,
} from "@/lib/products";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Produktdetailseite
   Alle drei Grössen sind eigene Produkte; die Grössenwahl
   verlinkt daher auf die jeweils andere Seite.
   --------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produkt nicht gefunden" };

  const title = `${product.name}, ${product.size}`;
  const description = `${product.shortDescription} Bio natives Olivenöl extra aus Tunesien — ${formatPrice(product.priceCents)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ZAYTOUN`,
      description,
      url: `/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.size}`,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: siteConfig.name },
    countryOfOrigin: "TN",
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/shop/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <nav
          aria-label="Brotkrumen"
          className="text-[0.65rem] uppercase tracking-brand text-olive/50"
        >
          <Link href="/shop" className="transition-colors hover:text-sage">
            Shop
          </Link>
          <span className="px-2" aria-hidden>
            /
          </span>
          <span className="text-olive/80">{product.size}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo
            src={product.image}
            alt={product.imageAlt}
            tone="cream"
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="aspect-4/5 w-full rounded-lg"
          />

          <div className="flex flex-col">
            <span className="text-[0.65rem] uppercase tracking-brand text-brown">
              Natives Olivenöl extra — Bio
            </span>
            <h1 className="mt-3 text-3xl leading-tight text-olive sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-6 font-display text-3xl text-olive">
              {formatPrice(product.priceCents)}
            </p>
            <p className="mt-1 text-xs text-olive/55">
              {formatUnitPrice(product)} · inkl. MwSt., zzgl. Versand
            </p>

            <div className="mt-8">
              <h2 className="text-[0.65rem] uppercase tracking-brand text-olive/60">
                Grösse wählen
              </h2>
              <ul className="mt-3 flex flex-wrap gap-3">
                {products.map((option) => {
                  const isActive = option.slug === product.slug;
                  return (
                    <li key={option.slug}>
                      <Link
                        href={`/shop/${option.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex rounded-full border px-5 py-2.5 text-xs uppercase tracking-widest transition-colors ${
                          isActive
                            ? "border-olive bg-olive text-cream"
                            : "border-olive/30 text-olive hover:border-olive"
                        }`}
                      >
                        {option.size}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ProductPurchase slug={product.slug} />

            <div className="mt-10 space-y-4 border-t border-olive/10 pt-8 text-sm leading-relaxed text-olive/80">
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4">
              {trustBadges.map((badge) => (
                <li
                  key={badge.id}
                  className="flex items-center gap-3 text-xs text-olive/75"
                >
                  <badge.Icon className="h-5 w-5 shrink-0 text-sage" />
                  {badge.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl text-olive">Nährwerte</h2>
            <p className="mt-2 text-xs text-olive/55">
              Durchschnittliche Werte pro 100 ml.
            </p>
            <table className="mt-6 w-full border-collapse text-sm">
              <caption className="sr-only">
                Nährwerttabelle pro 100 Milliliter
              </caption>
              <tbody>
                {nutritionPer100ml.map((row) => (
                  <tr key={row.label} className="border-b border-olive/10">
                    <th
                      scope="row"
                      className="py-3 pr-4 text-left font-normal text-olive/75"
                    >
                      {row.label}
                    </th>
                    <td className="py-3 text-right text-olive">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-sm leading-relaxed text-olive/80">
            <h2 className="text-2xl text-olive">Herkunft und Lagerung</h2>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-brand text-brown">
                  Herkunft
                </dt>
                <dd className="mt-1">
                  Angebaut, gepresst und abgefüllt in Nordtunesien.
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-brand text-brown">
                  Zutaten
                </dt>
                <dd className="mt-1">
                  100 % natives Olivenöl extra aus biologischem Anbau.
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-brand text-brown">
                  Lagerung
                </dt>
                <dd className="mt-1">
                  Kühl, trocken und vor Licht geschützt aufbewahren. Nach dem
                  Öffnen innerhalb weniger Monate verbrauchen.
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-brand text-brown">
                  Füllmenge
                </dt>
                <dd className="mt-1">{product.size}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";
import Photo from "@/components/ui/Photo";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice, formatUnitPrice, type Product } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Produktkarte für Startseite und Shop
   --------------------------------------------------------------- */

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-olive/10 bg-cream-light transition-shadow duration-300 hover:shadow-lg hover:shadow-olive/10">
      <Link
        href={`/shop/${product.slug}`}
        className="block"
        aria-label={`${product.name}, ${product.size} — Details ansehen`}
      >
        <Photo
          src={product.image}
          alt={product.imageAlt}
          tone="cream"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="aspect-4/5 w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6 text-center">
        <span className="text-[0.65rem] uppercase tracking-brand text-brown">
          {product.size}
        </span>
        <h3 className="mt-2 font-display text-xl leading-snug text-olive">
          <Link href={`/shop/${product.slug}`} className="hover:text-sage">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 text-xs leading-relaxed text-olive/65">
          {product.shortDescription}
        </p>

        <div className="mt-5">
          <p className="font-display text-2xl text-olive">
            {formatPrice(product.priceCents)}
          </p>
          <p className="mt-1 text-[0.65rem] text-olive/50">
            {formatUnitPrice(product)}
          </p>
        </div>

        <AddToCartButton
          slug={product.slug}
          className="mt-6 w-full"
          size="sm"
        />
      </div>
    </article>
  );
}

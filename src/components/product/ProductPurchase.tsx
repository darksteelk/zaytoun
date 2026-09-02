"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import type { ProductSlug } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Mengenwahl und Kauf auf der Produktseite
   --------------------------------------------------------------- */

export default function ProductPurchase({ slug }: { slug: ProductSlug }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center justify-between rounded-full border border-olive/25 px-2 py-1 sm:justify-start">
        <button
          type="button"
          aria-label="Menge verringern"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          className="px-4 py-2 text-olive transition-colors hover:text-sage"
        >
          −
        </button>
        <span aria-live="polite" className="min-w-8 text-center text-sm">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Menge erhöhen"
          onClick={() => setQuantity((value) => Math.min(99, value + 1))}
          className="px-4 py-2 text-olive transition-colors hover:text-sage"
        >
          +
        </button>
      </div>

      <Button
        type="button"
        size="lg"
        className="flex-1"
        onClick={() => addItem(slug, quantity)}
      >
        In den Warenkorb
      </Button>
    </div>
  );
}

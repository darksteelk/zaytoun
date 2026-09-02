"use client";

import { CartIcon } from "@/components/icons";
import { useCart } from "@/components/cart/CartProvider";

/* ---------------------------------------------------------------
   ZAYTOUN — Warenkorb-Icon im Header mit Artikelzähler
   --------------------------------------------------------------- */

export default function CartButton({ className = "" }: { className?: string }) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Warenkorb öffnen (${itemCount} Artikel)`}
      className={`relative inline-flex items-center justify-center p-2 text-olive transition-colors hover:text-sage ${className}`}
    >
      <CartIcon className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-olive px-1 text-[0.65rem] font-medium text-cream">
          {itemCount}
        </span>
      )}
    </button>
  );
}

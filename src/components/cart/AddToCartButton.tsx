"use client";

import Button from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import type { ProductSlug } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — "In den Warenkorb"
   --------------------------------------------------------------- */

interface AddToCartButtonProps {
  slug: ProductSlug;
  quantity?: number;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function AddToCartButton({
  slug,
  quantity = 1,
  variant = "primary",
  size = "md",
  className = "",
  label = "In den Warenkorb",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => addItem(slug, quantity)}
    >
      {label}
    </Button>
  );
}

"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";

/* ---------------------------------------------------------------
   ZAYTOUN — Warenkorb nach erfolgreicher Zahlung leeren
   Wird auf /erfolg eingebunden und rendert nichts.
   --------------------------------------------------------------- */

export default function ClearCartOnMount() {
  const { clearCart, closeCart } = useCart();

  useEffect(() => {
    clearCart();
    closeCart();
  }, [clearCart, closeCart]);

  return null;
}

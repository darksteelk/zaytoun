"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import * as cartStore from "@/lib/cart-store";
import type { CartLine } from "@/lib/cart-store";
import { getProduct, type Product, type ProductSlug } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Warenkorb-Kontext
   Der Inhalt liegt im externen Store (lib/cart-store.ts); hier
   kommen nur die abgeleiteten Werte und der Zustand der Schublade
   dazu.
   --------------------------------------------------------------- */

export interface CartLineWithProduct extends CartLine {
  product: Product;
  lineTotalCents: number;
}

interface CartContextValue {
  lines: CartLineWithProduct[];
  itemCount: number;
  subtotalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: ProductSlug, quantity?: number) => void;
  setQuantity: (slug: ProductSlug, quantity: number) => void;
  removeItem: (slug: ProductSlug) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const rawLines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // Beim Hinzufügen öffnet sich die Schublade, damit sichtbar ist,
  // dass etwas im Warenkorb gelandet ist.
  const addItem = useCallback(
    (slug: ProductSlug, quantity = 1) => {
      cartStore.addItem(slug, quantity);
      setIsOpen(true);
    },
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const lines = rawLines.flatMap<CartLineWithProduct>((line) => {
      const product = getProduct(line.slug);
      if (!product) return [];
      return [
        {
          ...line,
          product,
          lineTotalCents: product.priceCents * line.quantity,
        },
      ];
    });

    return {
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotalCents: lines.reduce((sum, line) => sum + line.lineTotalCents, 0),
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity: cartStore.setQuantity,
      removeItem: cartStore.removeItem,
      clearCart: cartStore.clearCart,
    };
  }, [rawLines, isOpen, openCart, closeCart, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart muss innerhalb von <CartProvider> genutzt werden.");
  }
  return context;
}

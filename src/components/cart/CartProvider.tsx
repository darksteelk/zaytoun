"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, type Product, type ProductSlug } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Warenkorb (Client-State)
   Der Warenkorb hält nur Slug + Menge. Preise und Namen kommen
   immer aus lib/products.ts, damit Preisänderungen sofort greifen.
   Der Inhalt wird im localStorage gesichert, damit er einen
   Seitenwechsel oder Reload übersteht.
   --------------------------------------------------------------- */

const STORAGE_KEY = "zaytoun.cart.v1";

export interface CartLine {
  slug: ProductSlug;
  quantity: number;
}

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

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is CartLine =>
          typeof line === "object" &&
          line !== null &&
          typeof (line as CartLine).slug === "string" &&
          Number.isFinite((line as CartLine).quantity),
      )
      .filter((line) => Boolean(getProduct(line.slug)) && line.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Nach dem ersten Render aus dem localStorage laden (vermeidet
  // eine Abweichung zwischen Server- und Client-Markup).
  useEffect(() => {
    setRawLines(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      // Privater Modus o. Ä. — der Warenkorb bleibt dann nur für die Sitzung erhalten.
    }
  }, [rawLines, hydrated]);

  const addItem = useCallback((slug: ProductSlug, quantity = 1) => {
    setRawLines((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) =>
          line.slug === slug
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...current, { slug, quantity }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((slug: ProductSlug, quantity: number) => {
    setRawLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const removeItem = useCallback((slug: ProductSlug) => {
    setRawLines((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setRawLines([]), []);

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
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [rawLines, isOpen, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart muss innerhalb von <CartProvider> genutzt werden.");
  }
  return context;
}

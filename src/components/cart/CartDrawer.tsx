"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { CloseIcon } from "@/components/icons";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Warenkorb-Schublade
   Schiebt von rechts ein, listet die Positionen mit Mengen und
   führt über /api/checkout zu Stripe Checkout.
   --------------------------------------------------------------- */

export default function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeItem, subtotalCents } =
    useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mit Escape schliessen und Hintergrund-Scrollen unterbinden.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  async function handleCheckout() {
    setIsRedirecting(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({
            slug: line.slug,
            quantity: line.quantity,
          })),
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Kasse derzeit nicht verfügbar.");
      }
      window.location.href = data.url;
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Die Kasse konnte nicht geöffnet werden.",
      );
      setIsRedirecting(false);
    }
  }

  return (
    <>
      {/* Abdunklung */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-40 bg-olive/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Warenkorb"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-cream-light shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-olive/10 px-6 py-5">
          <h2 className="text-lg uppercase tracking-brand text-olive">
            Warenkorb
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Warenkorb schliessen"
            className="p-1 text-olive transition-colors hover:text-sage"
            tabIndex={isOpen ? 0 : -1}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="text-sm text-olive/70">
              Ihr Warenkorb ist noch leer.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="text-xs uppercase tracking-brand text-sage underline underline-offset-8 hover:text-olive"
            >
              Zum Shop
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-olive/10 overflow-y-auto px-6">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-4 py-5">
                <Photo
                  src={line.product.image}
                  alt={line.product.imageAlt}
                  tone="cream"
                  sizes="80px"
                  className="h-24 w-20 shrink-0 rounded-md"
                />
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-base leading-snug text-olive">
                    {line.product.name}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-brown">
                    {line.product.size}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-olive/25">
                      <button
                        type="button"
                        aria-label="Menge verringern"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() =>
                          setQuantity(line.slug, line.quantity - 1)
                        }
                        className="px-3 py-1 text-olive transition-colors hover:text-sage"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Menge erhöhen"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() =>
                          setQuantity(line.slug, line.quantity + 1)
                        }
                        className="px-3 py-1 text-olive transition-colors hover:text-sage"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-olive">
                      {formatPrice(line.lineTotalCents)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(line.slug)}
                    tabIndex={isOpen ? 0 : -1}
                    className="mt-2 self-start text-[0.65rem] uppercase tracking-widest text-brown/70 underline underline-offset-4 hover:text-olive"
                  >
                    Entfernen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <footer className="border-t border-olive/10 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-widest text-olive/70">
                Zwischensumme
              </span>
              <span className="font-display text-xl text-olive">
                {formatPrice(subtotalCents)}
              </span>
            </div>
            <p className="mt-1 text-xs text-olive/60">
              Versandkosten werden an der Kasse berechnet.
            </p>
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-brown/30 bg-sage-light/25 px-4 py-3 text-xs leading-relaxed text-olive"
              >
                {error}
              </p>
            )}
            <Button
              type="button"
              onClick={handleCheckout}
              disabled={isRedirecting}
              tabIndex={isOpen ? 0 : -1}
              className="mt-4 w-full"
            >
              {isRedirecting ? "Einen Moment …" : "Zur Kasse"}
            </Button>
          </footer>
        )}
      </aside>
    </>
  );
}

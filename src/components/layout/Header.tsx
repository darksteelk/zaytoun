"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import CartButton from "@/components/cart/CartButton";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { mainNav } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Kopfbereich
   Mobil: Burger-Menü; ab md: horizontale Navigation.
   --------------------------------------------------------------- */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-olive/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Logo variant="mark" size="sm" className="items-start" />

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[0.7rem] uppercase tracking-brand transition-colors hover:text-sage ${
                      isActive ? "text-sage" : "text-olive"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <CartButton />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Menü schliessen" : "Menü öffnen"}
            className="p-2 text-olive md:hidden"
          >
            {isMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-olive/10 bg-cream md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-xs uppercase tracking-brand text-olive"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

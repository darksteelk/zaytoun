import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { CURRENCY, getProduct } from "@/lib/products";
import { siteConfig } from "@/lib/navigation";

/* ---------------------------------------------------------------
   ZAYTOUN — Stripe Checkout Session
   Nimmt den Warenkorb entgegen, prüft jede Position gegen
   lib/products.ts (Preise kommen nie aus dem Browser) und liefert
   die URL der gehosteten Stripe-Kassenseite zurück.
   --------------------------------------------------------------- */

interface CheckoutItem {
  slug: string;
  quantity: number;
}

export async function POST(request: Request) {
  // Solange kein STRIPE_SECRET_KEY hinterlegt ist, bleibt die Kasse zu.
  // Kundinnen und Kunden bekommen dann einen freundlichen Hinweis statt
  // einer technischen Fehlermeldung.
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        error: `Der Onlinekauf ist noch nicht freigeschaltet. Schreiben Sie uns an ${siteConfig.email} — wir nehmen Ihre Bestellung gerne persönlich auf.`,
      },
      { status: 503 },
    );
  }

  let items: CheckoutItem[] = [];
  try {
    const body = (await request.json()) as { items?: CheckoutItem[] };
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const lineItems = items.flatMap((item) => {
    const product = getProduct(item.slug);
    const quantity = Math.floor(Number(item.quantity));
    if (!product || !Number.isFinite(quantity) || quantity < 1) return [];
    return [
      {
        quantity: Math.min(quantity, 99),
        price_data: {
          currency: CURRENCY,
          unit_amount: product.priceCents,
          product_data: {
            name: `${product.name} — ${product.size}`,
            description: product.shortDescription,
          },
        },
      },
    ];
  });

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: "Der Warenkorb ist leer." },
      { status: 400 },
    );
  }

  const origin = request.headers.get("origin") ?? siteConfig.url;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/abbruch`,
      locale: "de",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["DE", "AT", "CH"] },
    });

    if (!session.url) throw new Error("Stripe lieferte keine Kassen-URL.");
    return NextResponse.json({ url: session.url });
  } catch (cause) {
    console.error("[checkout] Stripe-Session fehlgeschlagen:", cause);
    return NextResponse.json(
      { error: "Die Kasse konnte nicht geöffnet werden." },
      { status: 500 },
    );
  }
}

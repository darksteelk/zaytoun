import Stripe from "stripe";

/* ---------------------------------------------------------------
   ZAYTOUN — Stripe-Client
   Wird nur auf dem Server verwendet. Der Schlüssel kommt aus
   STRIPE_SECRET_KEY (.env.local lokal, Vercel-Projekteinstellungen
   in der Produktion). Fehlt er, liefert getStripe() null — die
   Kasse meldet dann einen verständlichen Fehler, statt den Build
   zu brechen.
   --------------------------------------------------------------- */

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!cached) {
    cached = new Stripe(secretKey, { typescript: true });
  }
  return cached;
}

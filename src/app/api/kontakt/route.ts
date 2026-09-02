import { NextResponse } from "next/server";
import { validateSubmission } from "@/lib/contact";

/* ---------------------------------------------------------------
   ZAYTOUN — Kontaktanfragen
   Nimmt das Formular entgegen, prüft die Felder und protokolliert
   die Anfrage. Der Versand per E-Mail wird später hier ergänzt —
   siehe Kommentar unten.
   --------------------------------------------------------------- */

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honigtopf: ein für Menschen unsichtbares Feld. Ist es gefüllt,
  // war ein Bot am Werk — wir antworten freundlich und tun nichts.
  const honeypot = (payload as { website?: unknown })?.website;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateSubmission(payload);
  if (!data) {
    return NextResponse.json(
      { error: "Bitte prüfen Sie Ihre Eingaben.", errors },
      { status: 400 },
    );
  }

  // Vorläufige "Ablage": strukturierte Zeile im Server-Log. In Vercel
  // unter Deployments -> Functions -> Logs einsehbar.
  //
  // Für echten Versand hier einen Anbieter ergänzen, z. B.:
  //   await resend.emails.send({
  //     from: "shop@zaytoun.de",
  //     to: "hallo@zaytoun.de",
  //     subject: `Neue Anfrage (${data.inquiryType}) von ${data.name}`,
  //     text: data.message,
  //   });
  console.log(
    "[kontakt] Neue Anfrage:",
    JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
  );

  return NextResponse.json({ ok: true });
}

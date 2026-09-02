"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { inquiryTypes, type ValidationErrors } from "@/lib/contact";

/* ---------------------------------------------------------------
   ZAYTOUN — Kontaktformular
   Sendet an /api/kontakt und zeigt Erfolg bzw. Fehler direkt an.
   --------------------------------------------------------------- */

type Status = "idle" | "sending" | "sent" | "error";

const fieldClasses =
  "mt-2 w-full rounded-md border border-olive/25 bg-cream-light px-4 py-3 text-sm text-olive placeholder:text-olive/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage";

const labelClasses =
  "block text-[0.65rem] uppercase tracking-brand text-olive/70";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setErrors({});
    setMessage(null);

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          inquiryType: formData.get("inquiryType"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: ValidationErrors;
      };

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setMessage(data.error ?? "Das hat leider nicht geklappt.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage(
        "Vielen Dank für Ihre Nachricht — wir melden uns in der Regel innerhalb von zwei Werktagen.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Ihr Name"
          aria-invalid={Boolean(errors.name)}
          className={fieldClasses}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-700">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@beispiel.de"
          aria-invalid={Boolean(errors.email)}
          className={fieldClasses}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-red-700">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="inquiryType" className={labelClasses}>
          Anfrageart
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          defaultValue="allgemein"
          aria-invalid={Boolean(errors.inquiryType)}
          className={fieldClasses}
        >
          {inquiryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.inquiryType && (
          <p className="mt-2 text-xs text-red-700">{errors.inquiryType}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Wie können wir helfen?"
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClasses} resize-y`}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-red-700">{errors.message}</p>
        )}
      </div>

      {/* Honigtopf gegen Bots — für Menschen unsichtbar. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Bitte leer lassen</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
        </Button>

        {message && (
          <p
            role="status"
            className={`text-xs leading-relaxed ${
              status === "sent" ? "text-sage" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

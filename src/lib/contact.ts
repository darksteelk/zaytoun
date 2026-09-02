/* ---------------------------------------------------------------
   ZAYTOUN — Kontaktformular
   Gemeinsame Definitionen für Formular (Client) und API-Route
   (Server), damit die Anfragearten nur an einer Stelle stehen.
   --------------------------------------------------------------- */

export const inquiryTypes = [
  { value: "allgemein", label: "Allgemeine Anfrage" },
  { value: "grosshandel", label: "Grosshandel" },
  { value: "wiederverkauf", label: "Wiederverkauf" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export interface ContactSubmission {
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
}

export type ValidationErrors = Partial<Record<keyof ContactSubmission, string>>;

/**
 * Prüft eine Einsendung. Wird auf dem Server verwendet; der Client
 * verlässt sich zusätzlich auf die HTML-Validierung.
 */
export function validateSubmission(input: unknown): {
  data?: ContactSubmission;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};
  const raw = (input ?? {}) as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const inquiryType =
    typeof raw.inquiryType === "string" ? raw.inquiryType : "";

  if (name.length < 2) errors.name = "Bitte geben Sie Ihren Namen an.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  if (message.length < 10) {
    errors.message = "Bitte schreiben Sie uns ein paar Sätze mehr.";
  }
  if (!inquiryTypes.some((type) => type.value === inquiryType)) {
    errors.inquiryType = "Bitte wählen Sie eine Anfrageart.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    data: {
      name,
      email,
      message,
      inquiryType: inquiryType as InquiryType,
    },
    errors: {},
  };
}

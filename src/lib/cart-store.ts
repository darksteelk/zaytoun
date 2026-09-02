import { getProduct, type ProductSlug } from "@/lib/products";

/* ---------------------------------------------------------------
   ZAYTOUN — Warenkorb-Speicher
   Ein kleiner externer Store ausserhalb von React, an den sich
   Komponenten über useSyncExternalStore hängen. Vorteile:
   - kein setState im Effekt beim Laden aus dem localStorage
   - offene Tabs bleiben automatisch synchron
   Gespeichert werden nur Slug und Menge; Preise und Namen kommen
   immer frisch aus lib/products.ts.
   --------------------------------------------------------------- */

const STORAGE_KEY = "zaytoun.cart.v1";

export interface CartLine {
  slug: ProductSlug;
  quantity: number;
}

/** Leerer Warenkorb — stabile Referenz für das Server-Rendering. */
const EMPTY: CartLine[] = [];

let state: CartLine[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const lines = parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).slug === "string" &&
        Number.isFinite((line as CartLine).quantity) &&
        (line as CartLine).quantity > 0 &&
        Boolean(getProduct((line as CartLine).slug)),
    );
    return lines.length > 0 ? lines : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    return parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return EMPTY;
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Privater Modus o. Ä.: der Warenkorb gilt dann nur für diese Sitzung.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

/** Reagiert auf Änderungen in einem anderen Tab. */
function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  state = readStorage();
  emit();
}

export function subscribe(listener: () => void): () => void {
  // Beim ersten Abonnenten den gespeicherten Stand übernehmen. React
  // vergleicht direkt nach subscribe() erneut den Snapshot und rendert
  // bei Bedarf nach — ganz ohne setState im Effekt.
  if (!initialized) {
    initialized = true;
    state = readStorage();
    window.addEventListener("storage", onStorage);
  }

  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartLine[] {
  return state;
}

/** Beim Server-Rendering ist der Warenkorb immer leer. */
export function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function update(next: CartLine[]) {
  if (next === state) return;
  state = next;
  persist();
  emit();
}

export function addItem(slug: ProductSlug, quantity = 1) {
  const existing = state.find((line) => line.slug === slug);
  update(
    existing
      ? state.map((line) =>
          line.slug === slug
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        )
      : [...state, { slug, quantity }],
  );
}

export function setQuantity(slug: ProductSlug, quantity: number) {
  update(
    quantity <= 0
      ? state.filter((line) => line.slug !== slug)
      : state.map((line) => (line.slug === slug ? { ...line, quantity } : line)),
  );
}

export function removeItem(slug: ProductSlug) {
  update(state.filter((line) => line.slug !== slug));
}

export function clearCart() {
  if (state.length === 0) return;
  update(EMPTY);
}

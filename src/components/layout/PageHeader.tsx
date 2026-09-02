import { OliveBranchIcon } from "@/components/icons";

/* ---------------------------------------------------------------
   ZAYTOUN — Kopfbereich der Unterseiten
   Ruhiger Auftakt in Creme mit Eyebrow, Titel und Einleitung.
   --------------------------------------------------------------- */

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: PageHeaderProps) {
  return (
    <section className="border-b border-olive/10 bg-cream-light">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20">
        <span className="text-[0.65rem] uppercase tracking-brand text-brown">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl leading-tight text-olive sm:text-5xl">
          {title}
        </h1>
        <OliveBranchIcon className="mt-5 h-5 w-16 text-sage" />
        {intro && (
          <p className="mt-6 text-sm leading-relaxed text-olive/75 sm:text-base">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

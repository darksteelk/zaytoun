import { ButtonLink } from "@/components/ui/Button";
import { OliveBranchIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <OliveBranchIcon className="h-10 w-24 text-sage" />
      <h1 className="mt-8 text-4xl leading-tight text-olive sm:text-5xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-olive/80">
        Diese Seite gibt es nicht (mehr). Vielleicht finden Sie im Shop, wonach
        Sie gesucht haben.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/shop">Zum Shop</ButtonLink>
        <ButtonLink href="/" variant="ghost">
          Zur Startseite
        </ButtonLink>
      </div>
    </section>
  );
}

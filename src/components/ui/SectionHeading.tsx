import { OliveBranchIcon } from "@/components/icons";

/* ---------------------------------------------------------------
   ZAYTOUN — Sektionsüberschrift mit Olivenzweig-Trenner
   --------------------------------------------------------------- */

interface SectionHeadingProps {
  /** Kleine Zeile über der Überschrift, z. B. "Unser Öl" */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-[0.65rem] uppercase tracking-brand text-brown">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl sm:text-4xl font-normal text-olive">
        {title}
      </h2>
      <OliveBranchIcon className="mt-4 h-5 w-16 text-sage" />
      {description && (
        <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-olive/75">
          {description}
        </p>
      )}
    </div>
  );
}

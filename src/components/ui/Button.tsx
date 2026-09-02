import Link from "next/link";

/* ---------------------------------------------------------------
   ZAYTOUN — Button
   Ein Satz Stile für Links und Buttons, damit Aktionen überall
   gleich aussehen.
   --------------------------------------------------------------- */

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-cream hover:bg-olive-800",
  secondary: "bg-sage text-cream hover:bg-olive",
  ghost: "border border-olive/40 text-olive hover:bg-olive hover:text-cream",
  light: "bg-cream text-olive hover:bg-cream-light",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full uppercase",
    "tracking-[0.18em] font-medium transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
  ].join(" ");
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant,
  size,
  className = "",
  children,
  ...props
}: CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={`${buttonClasses(variant, size)} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Button({
  variant,
  size,
  className = "",
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${buttonClasses(variant, size)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

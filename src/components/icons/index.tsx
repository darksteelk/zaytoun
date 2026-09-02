/* ---------------------------------------------------------------
   ZAYTOUN — Icon-Set
   Schlichte Inline-SVGs, die die Markenwerte tragen. Alle Icons
   erben die Textfarbe (currentColor) und die per className
   gesetzte Grösse.
   --------------------------------------------------------------- */

export type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Blatt — "100 % Bio / Natürlich" */
export function LeafIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 20c0-7.2 4.8-12 15-12 0 10.2-4.8 15-12 15H4v-3Z" />
      <path d="M4.5 19.5C9 15 12.5 12.8 17 11" />
    </svg>
  );
}

/** Sonne — "Sonnengereift" */
export function SunIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
    </svg>
  );
}

/** Hand — "Handverlesen" */
export function HandIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M9 11V4.6a1.6 1.6 0 0 1 3.2 0V11" />
      <path d="M12.2 11V6.1a1.6 1.6 0 0 1 3.2 0V11" />
      <path d="M15.4 11.4V8.6a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.7a5.4 5.4 0 0 1-4.2-2l-3-3.8a1.6 1.6 0 0 1 2.4-2.1L9 15.2V11" />
    </svg>
  );
}

/** Standort-Pin — "Aus Tunesien" */
export function PinIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </svg>
  );
}

/** Tropfen — "Kaltgepresst" */
export function DropletIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 2.8c3.6 4.2 6 7.4 6 10.2a6 6 0 0 1-12 0c0-2.8 2.4-6 6-10.2Z" />
      <path d="M9.2 13.6a2.9 2.9 0 0 0 2.9 2.9" />
    </svg>
  );
}

/** Olivenzweig — dekoratives Motiv für Trennlinien und Sektionen */
export function OliveBranchIcon({
  className = "h-6 w-6",
  ...props
}: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M2 18c6.5 0 12-4 16-12" />
      <path d="M9.5 15.4c-.6-1.7.2-3.4 2-4 .5 1.8-.3 3.5-2 4Z" />
      <path d="M13.8 11.2c-.9-1.6-.4-3.4 1.2-4.4 1 1.6.5 3.5-1.2 4.4Z" />
      <path d="M7.6 16.4c-1.6-.9-2.2-2.7-1.4-4.4 1.7.8 2.3 2.7 1.4 4.4Z" />
      <circle cx="18.6" cy="4.9" r="1.6" />
    </svg>
  );
}

/** Warenkorb */
export function CartIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M2.5 3h2.2l2.3 11.2a1.8 1.8 0 0 0 1.8 1.4h8.4a1.8 1.8 0 0 0 1.8-1.4L20.5 7H6" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  );
}

/** Schliessen */
export function CloseIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Menü (mobile Navigation) */
export function MenuIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

/** Pfeil nach rechts */
export function ArrowRightIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

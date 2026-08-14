/**
 * Clover Downs mark, rebuilt as vector so it stays sharp at every size and
 * can be recoloured by CSS. Geometry follows the badge artwork: four-leaf
 * clover over a car profile, inside a ring.
 *
 * Layout inside the 200x200 canvas:
 *   clover  centred (100, 68), radius ~28  → occupies y 40–96
 *   stem    y 94–108
 *   car     centred (100, 140)             → occupies y 117–159
 *   ring    r 90                           → y 10–190
 * Keep those bands from touching when adjusting anything.
 */

type MarkProps = {
  className?: string;
  /** Draw the enclosing ring. Off for tight spots like the header. */
  ring?: boolean;
  title?: string;
};

// One heart-shaped leaf with its point at the origin, lobes facing out.
// Rotated four times to build the clover.
const LEAF =
  "M0,0 C-13,-9 -21,-22 -12,-30 C-6.5,-34.5 -0.5,-31.5 0,-26 C0.5,-31.5 6.5,-34.5 12,-30 C21,-22 13,-9 0,0 Z";

export function CloverMark({ className, ring = true, title }: MarkProps) {
  return (
    <svg
      // Without the ring, crop tight to the artwork so the mark fills its box.
      viewBox={ring ? "0 0 200 200" : "32 34 136 136"}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cd-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-leaf-bright, #a6dda0)" />
          <stop offset="100%" stopColor="var(--color-leaf, #7cc576)" />
        </linearGradient>
        <linearGradient id="cd-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2f3f1" />
          <stop offset="55%" stopColor="#a8aea6" />
          <stop offset="100%" stopColor="#5d645b" />
        </linearGradient>
      </defs>

      {ring && (
        <>
          <circle cx="100" cy="100" r="98" fill="#0b0c0b" />
          <circle cx="100" cy="100" r="90" stroke="url(#cd-chrome)" strokeWidth="3" opacity="0.7" />
          <circle cx="100" cy="100" r="82" stroke="var(--color-leaf, #7cc576)" strokeWidth="1" opacity="0.3" />
        </>
      )}

      {/* Clover — four heart leaves around a point, stem dropping below */}
      <g transform="translate(100 68) scale(0.82)" fill="url(#cd-leaf)">
        <path d={LEAF} transform="rotate(45)" />
        <path d={LEAF} transform="rotate(135)" />
        <path d={LEAF} transform="rotate(225)" />
        <path d={LEAF} transform="rotate(315)" />
      </g>
      <path
        d="M100 92 C101.5 98 101.5 103 99.5 108"
        stroke="var(--color-leaf, #7cc576)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Car profile */}
      <g transform="translate(100 140) scale(0.88)">
        <path
          d="M-62 10 L-56 -1 C-53 -6 -47 -9 -41 -9 L-31 -9 C-23 -20 -11 -26 3 -26 C17 -26 29 -21 37 -10 L47 -8 C55 -6.5 60 -1 60 6 L60 10 Z"
          fill="url(#cd-chrome)"
        />
        {/* Window glass, knocked out of the body */}
        <path d="M-25 -10 C-18 -18 -8 -22 2 -22 L2 -10 Z" fill="#0b0c0b" opacity="0.9" />
        <path d="M8 -22 C18 -21.5 26 -17 32 -10 L8 -10 Z" fill="#0b0c0b" opacity="0.9" />
        {/* Wheels */}
        <circle cx="-36" cy="10" r="12" fill="#0b0c0b" />
        <circle cx="-36" cy="10" r="7" stroke="url(#cd-chrome)" strokeWidth="2.5" />
        <circle cx="34" cy="10" r="12" fill="#0b0c0b" />
        <circle cx="34" cy="10" r="7" stroke="url(#cd-chrome)" strokeWidth="2.5" />
        {/* Speed underline */}
        <path d="M-68 21 L60 21" stroke="var(--color-leaf, #7cc576)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Mark + wordmark, horizontal. Used in the header. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <CloverMark className="h-10 w-10 shrink-0" ring={false} />
      <span className="flex flex-col leading-none">
        <span className="text-[0.8125rem] font-semibold tracking-[0.3em] text-bone">CLOVER DOWNS</span>
        <span className="mt-1 text-[0.5625rem] tracking-[0.34em] text-dim">DETAILING</span>
      </span>
    </span>
  );
}

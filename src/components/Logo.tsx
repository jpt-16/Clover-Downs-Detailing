/**
 * Clover Downs mark — revision v4.
 *
 * Geometry is the supplied artwork verbatim: four overlapping leaves joined by
 * a centre circle, on a straight stem, inside a thin ring. The circular join
 * is what leaves the notch between the two upper leaves, so it is doing shape
 * work rather than just filling a gap — do not swap it back for a square.
 *
 * v4 dropped the gloss streak and the faint inner ring that v2 carried. That
 * also removed the reason for a `detail` prop: nothing in the mark is
 * sub-pixel at favicon sizes any more, so every size draws the same artwork.
 *
 * Only the colours are remapped onto the site's own tokens. The bundle ships
 * #57d98a on a #2f8a52 ring; the site's accent is #7cc576, and the mark sits
 * directly beside buttons painted in it.
 */

/** Shared clover geometry, reused by every variant below. */
const CLOVER_TRANSFORM = "translate(50 50) scale(0.92) translate(-50 -50.5)";

function CloverBody() {
  return (
    <>
      <circle cx="35" cy="29" r="16" />
      <circle cx="65" cy="29" r="16" />
      <circle cx="35" cy="59" r="16" />
      <circle cx="65" cy="59" r="16" />
      {/* Joins the four leaves and cuts the notch at the top centre. */}
      <circle cx="50" cy="44" r="10" />
      <rect x="47.5" y="55" width="5" height="33" rx="2.5" />
    </>
  );
}

/** Bare clover, no ring or plate. Inherits `color`. */
export function Clover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <g transform={CLOVER_TRANSFORM}>
        <CloverBody />
      </g>
    </svg>
  );
}

/**
 * The badge mark.
 *
 * `plate` draws the dark disc behind the mark. Needed anywhere the mark can
 * land on an unknown background (favicon, share card); unnecessary on the
 * site itself, where the page is already near-black.
 */
export function BadgeMark({
  className,
  plate = false,
  title,
}: {
  className?: string;
  plate?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {plate && <circle cx="50" cy="50" r="50" fill="var(--color-ink, #0b0c0b)" />}
      <circle cx="50" cy="50" r="47.2" fill="none" stroke="var(--color-leaf-rim, #4f9154)" strokeWidth="1.6" />
      <g fill="var(--color-leaf, #7cc576)" transform={CLOVER_TRANSFORM}>
        <CloverBody />
      </g>
    </svg>
  );
}

/**
 * Header lockup: small mark, wordmark on one line, DETAILING beneath, with
 * the divider rule from the full lockup keeping the halves apart.
 */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-4 ${className ?? ""}`}>
      <BadgeMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col border-l border-rule-strong pl-4 leading-none">
        <span className="text-[0.8125rem] font-extrabold tracking-[0.16em] text-bone">CLOVER DOWNS</span>
        <span className="mt-1.5 font-mono text-[0.5rem] tracking-[0.3em] text-leaf">DETAILING</span>
      </span>
    </span>
  );
}

/** Stacked lockup for the footer, matching the supplied artwork. */
export function LogoStacked({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-5 ${className ?? ""}`}>
      <BadgeMark className="h-16 w-16 shrink-0" />
      <span className="flex flex-col border-l border-rule-strong pl-5">
        <span className="text-[1.375rem] leading-[1.02] font-extrabold tracking-[0.05em] text-bone">
          CLOVER
          <br />
          DOWNS
        </span>
        <span className="mt-2.5 font-mono text-[0.5625rem] tracking-[0.3em] text-leaf">DETAILING</span>
      </span>
    </span>
  );
}

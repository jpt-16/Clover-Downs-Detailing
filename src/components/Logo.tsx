/**
 * Clover Downs mark — revision 2a: the clover sits as a hubcap inside a
 * wheel. Geometry is the supplied artwork verbatim; only the greens were
 * remapped onto the site's own tokens, which the artwork notes asked for.
 *
 * The clover is four overlapping circles plus a stem, so it unions into one
 * silhouette and survives being shrunk to favicon size.
 */

/** Bare clover, no wheel. Inherits `color`. */
export function Clover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="38" cy="32" r="18" />
      <circle cx="62" cy="32" r="18" />
      <circle cx="38" cy="56" r="18" />
      <circle cx="62" cy="56" r="18" />
      <rect x="46" y="62" width="8" height="32" rx="4" transform="rotate(7 50 62)" />
    </svg>
  );
}

/**
 * The wheel mark. Below roughly 28px the inner rim ring closes up into a
 * smudge, so `detail={false}` drops it and thickens the tire to compensate.
 */
export function WheelMark({
  className,
  detail = true,
  title,
}: {
  className?: string;
  detail?: boolean;
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
      {/* Tire */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="var(--color-bone, #f2f3f1)"
        strokeWidth={detail ? 9 : 11}
      />
      {/* Inner rim */}
      {detail && (
        <circle cx="50" cy="50" r="33" fill="none" stroke="var(--color-leaf-rim, #4f9154)" strokeWidth="3" />
      )}
      {/* Clover hubcap */}
      <g fill="var(--color-leaf, #7cc576)" transform="translate(50 50) scale(0.62) translate(-50 -50)">
        <circle cx="38" cy="32" r="18" />
        <circle cx="62" cy="32" r="18" />
        <circle cx="38" cy="56" r="18" />
        <circle cx="62" cy="56" r="18" />
        <rect x="46" y="62" width="8" height="32" rx="4" transform="rotate(7 50 62)" />
      </g>
    </svg>
  );
}

/**
 * Header lockup. Follows the artwork notes for nav use: a small mark, the
 * wordmark on one line, DETAILING beneath it — with the divider rule from
 * the full lockup keeping the two halves apart.
 */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-4 ${className ?? ""}`}>
      <WheelMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
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
      <WheelMark className="h-16 w-16 shrink-0" />
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

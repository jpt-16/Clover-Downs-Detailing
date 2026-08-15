/**
 * Clover Downs mark — revision v2 (the "badge").
 *
 * Geometry is the supplied artwork verbatim: a solid clover (four circles
 * plus a centre square that fills the join, so it unions into one shape) with
 * a gloss highlight, sitting inside a thin green ring.
 *
 * Only the colours are remapped onto the site's own tokens. The bundle ships
 * #57d98a, a mint that sits noticeably cooler than this site's established
 * accent — using it literally would leave the logo a different green from
 * every button next to it.
 */

/** Shared clover geometry, reused by every variant below. */
const CLOVER_TRANSFORM = "translate(50 47) scale(0.86) translate(-50 -55.5)";

function CloverBody() {
  return (
    <>
      <circle cx="36" cy="30" r="15" />
      <circle cx="64" cy="30" r="15" />
      <circle cx="36" cy="58" r="15" />
      <circle cx="64" cy="58" r="15" />
      {/* Fills the gap where the four leaves meet. */}
      <rect x="36" y="30" width="28" height="28" rx="12" />
      <rect x="46" y="64" width="8" height="30" rx="4" transform="rotate(7 50 64)" />
    </>
  );
}

/** The gloss streak on the upper-left leaf — the "polished" cue. */
function Shine() {
  return (
    <g transform={CLOVER_TRANSFORM}>
      <g transform="rotate(-32 36 30)" fill="var(--color-bone, #f2f3f1)" fillOpacity="0.5">
        <rect x="30.6" y="21" width="4.6" height="17" rx="2.3" />
        <rect x="37.4" y="24" width="2.2" height="11" rx="1.1" />
      </g>
    </g>
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
 * `detail={false}` drops the gloss streak and the faint inner ring, matching
 * the artwork's own one-colour variant. Both are sub-pixel below roughly
 * 28px and turn into noise rather than detail.
 *
 * `plate` draws the dark disc behind the mark. Needed anywhere the mark can
 * land on an unknown background (favicon, share card); unnecessary on the
 * site itself, where the page is already near-black.
 */
export function BadgeMark({
  className,
  detail = true,
  plate = false,
  title,
}: {
  className?: string;
  detail?: boolean;
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
      {plate && <circle cx="50" cy="50" r="50" fill="var(--color-ink-raised, #101210)" />}
      <circle cx="50" cy="50" r="47.2" fill="none" stroke="var(--color-leaf-rim, #4f9154)" strokeWidth="1.6" />
      {detail && (
        <circle
          cx="50"
          cy="50"
          r="44.4"
          fill="none"
          stroke="var(--color-bone, #f2f3f1)"
          strokeOpacity="0.14"
          strokeWidth="0.7"
        />
      )}
      <g fill="var(--color-leaf, #7cc576)" transform={CLOVER_TRANSFORM}>
        <CloverBody />
      </g>
      {detail && <Shine />}
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

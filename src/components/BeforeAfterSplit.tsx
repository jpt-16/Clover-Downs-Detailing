import { PhotoSlot } from "./PhotoSlot";
import type { BeforeAfterPair } from "@/lib/photos";

/**
 * Side-by-side before and after. Use this when the two frames were not shot
 * from the same spot — the comparison slider needs matched framing, this
 * does not. No JavaScript involved.
 */
export function BeforeAfterSplit({ pair }: { pair: BeforeAfterPair }) {
  return (
    <figure className="m-0">
      <div className="grid grid-cols-2">
        <div className="relative aspect-3/4 overflow-hidden border-r border-rule">
          <PhotoSlot photo={pair.before} sizes="(max-width: 1024px) 50vw, 25vw" />
          <span className="pointer-events-none absolute top-3 left-3 bg-ink px-2.5 py-1.5 text-[0.625rem] tracking-[0.2em] text-dim uppercase">
            Before
          </span>
        </div>
        <div className="relative aspect-3/4 overflow-hidden">
          <PhotoSlot photo={pair.after} sizes="(max-width: 1024px) 50vw, 25vw" />
          <span className="pointer-events-none absolute top-3 right-3 bg-leaf px-2.5 py-1.5 text-[0.625rem] tracking-[0.2em] text-leaf-deep uppercase">
            After
          </span>
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-rule px-1 pt-4">
        <span className="text-[0.9375rem] font-medium text-bone">{pair.label}</span>
        <span className="label">Same car · same day</span>
      </figcaption>
    </figure>
  );
}

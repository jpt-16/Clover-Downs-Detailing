"use client";

import { useId, useState } from "react";
import { PhotoSlot } from "./PhotoSlot";
import type { BeforeAfterPair } from "@/lib/photos";

/**
 * Drag-to-compare slider. The "after" frame sits underneath and the
 * "before" frame is clipped to the handle position.
 *
 * Accessibility: a full-bleed transparent range input drives the position,
 * so the control works with touch, mouse, arrow keys, and screen readers
 * without any custom key handling.
 */
export function BeforeAfter({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure className="group relative m-0">
      <div className="relative aspect-4/3 w-full overflow-hidden select-none sm:aspect-3/2">
        {/* After — full frame underneath */}
        <PhotoSlot photo={pair.after} sizes="(max-width: 1024px) 100vw, 50vw" />

        {/* Before — clipped to the handle */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <PhotoSlot photo={pair.before} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>

        {/* Corner labels */}
        <span className="pointer-events-none absolute top-4 left-4 bg-ink px-2.5 py-1.5 text-[0.625rem] tracking-[0.2em] text-dim uppercase">
          Before
        </span>
        <span className="pointer-events-none absolute top-4 right-4 bg-leaf px-2.5 py-1.5 text-[0.625rem] tracking-[0.2em] text-leaf-deep uppercase">
          After
        </span>

        {/* Divider + grip */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-leaf"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-leaf bg-ink/80 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="var(--color-leaf)" strokeWidth="1.5">
              <path d="M9.5 7 5 12l4.5 5M14.5 7l4.5 5-4.5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Reveal the before and after of the {pair.label.toLowerCase()} — drag or use the arrow keys
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>

      <figcaption className="flex items-center justify-between gap-4 border-t border-rule px-1 pt-4">
        <span className="text-[0.9375rem] font-medium text-bone">{pair.label}</span>
        <span className="label">Same car · same day</span>
      </figcaption>
    </figure>
  );
}

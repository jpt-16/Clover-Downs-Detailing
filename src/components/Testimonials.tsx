"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "./Icons";
import { Reveal } from "./Reveal";

export type Testimonial = {
  quote: string;
  who: string;
  /** Out of five. Omit and no stars are drawn. */
  rating?: number;
  /** Where the review was left, e.g. "Google". Shown next to the name. */
  source?: string;
};

const NAV =
  "flex h-11 w-11 items-center justify-center border border-edge text-bone transition-colors hover:border-leaf hover:text-leaf";

/**
 * Review carousel. One quote at a time, arrows to step through.
 *
 * The controls only render when there is more than one review — a pair of
 * arrows that cycle back to the same quote reads as broken. They appear on
 * their own as soon as a second review is added.
 *
 * Stepping wraps rather than disabling at the ends: with a handful of reviews
 * a dead button is more confusing than looping.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const many = items.length > 1;
  const current = items[index];
  const step = (delta: number) => setIndex((n) => (n + delta + items.length) % items.length);

  return (
    <Reveal className="mt-16 border-t border-rule pt-14">
      <div className="mb-8 flex items-center justify-between gap-6">
        <span className="eyebrow">What customers say</span>
        {many && (
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-dim" aria-hidden>
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => step(-1)} aria-label="Previous review" className={NAV}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next review" className={NAV}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Announces the new quote when the arrows change it, rather than
          leaving a screen reader on a silently swapped page. */}
      <div aria-live="polite">
        <blockquote key={index} className="quote-in m-0 flex max-w-[60ch] flex-col gap-5">
          {current.rating !== undefined && (
            <span className="flex gap-1 text-leaf" role="img" aria-label={`${current.rating} out of 5 stars`}>
              {Array.from({ length: current.rating }, (_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
          )}
          <p className="text-[1.25rem] leading-[1.5] font-light sm:text-[1.375rem]">&ldquo;{current.quote}&rdquo;</p>
          <footer className="text-[0.6875rem] tracking-[0.2em] text-dim uppercase">
            {current.who}
            {current.source && (
              <>
                <span aria-hidden className="px-2 text-rule-strong">
                  /
                </span>
                {current.source}
              </>
            )}
          </footer>
        </blockquote>
      </div>
    </Reveal>
  );
}

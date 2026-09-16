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

/** Reviews are out of five, so the row always draws five and dims the rest. */
const MAX_RATING = 5;

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
  const step = (delta: number) => setIndex((n) => (n + delta + items.length) % items.length);

  return (
    <Reveal className="mt-16 border-t border-rule pt-14">
      {/* Held to a column rather than the full section width: one short quote
          stretched across 1400px reads as a gap in the page, and it keeps the
          arrows sitting on the card's own right edge. */}
      <div className="max-w-[46rem]">
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
        {/* All reviews are rendered, stacked in one grid cell, with only the
            current one visible. The container then sizes to the tallest quote,
            so stepping from a long review to a short one does not collapse the
            card and yank the page up under the button just clicked. A fixed
            min-height would do the same until someone leaves a longer review
            than it was tuned for. */}
        <div aria-live="polite" className="grid">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <blockquote
                key={`${item.who}-${i}`}
                aria-hidden={!active}
                className={`col-start-1 row-start-1 m-0 flex flex-col gap-6 border border-rule-strong bg-ink-raised px-7 py-8 sm:px-10 sm:py-10 ${
                  active ? "quote-in" : "invisible"
                }`}
              >
                {item.rating !== undefined && (
                  <span
                    className="flex gap-1.5 text-leaf"
                    role="img"
                    aria-label={`${item.rating} out of ${MAX_RATING} stars`}
                  >
                    {Array.from({ length: MAX_RATING }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-[1.125rem] w-[1.125rem] ${starIndex < item.rating! ? "" : "text-rule-strong"}`}
                      />
                    ))}
                  </span>
                )}
                <p className="max-w-[46ch] text-[1.25rem] leading-[1.45] font-light text-bone sm:text-[1.4375rem]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-5 text-[0.6875rem] tracking-[0.2em] text-dim uppercase">
                  <span className="text-leaf">{item.who}</span>
                  {item.source && (
                    <>
                      <span aria-hidden className="text-rule-strong">
                        /
                      </span>
                      <span>{item.source} review</span>
                    </>
                  )}
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

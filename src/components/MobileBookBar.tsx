"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { smsHref } from "@/lib/site";

/**
 * Persistent booking bar for small screens.
 *
 * Two rules keep it from being an annoyance rather than a conversion aid:
 *
 * 1. On a page that carries its own call to action above the fold — the
 *    homepage, the town pages, the service pages — it stays out of the way
 *    until that has scrolled by, rather than covering it with a duplicate.
 *    On a page that does not, a blog post being the case that prompted this,
 *    there is nothing to duplicate and nothing to cover, so it shows from the
 *    start. Measured rather than hardcoded by route, so a new page type gets
 *    the right behaviour without anyone remembering to update this.
 * 2. It hides again once the quote form is on screen. At that point the bar
 *    would be pointing at something the visitor is already looking at, while
 *    physically covering the fields they are trying to fill in — the exact
 *    moment a sticky bar does damage.
 *
 * Rendered after the footer in the layout, alongside a spacer, so the fixed
 * bar never sits on top of footer content at the bottom of the page.
 */
export function MobileBookBar() {
  const [revealed, setRevealed] = useState(false);
  const [atForm, setAtForm] = useState(false);
  // A ref, not state: it is read by the scroll handler and never needs to
  // cause a render of its own. Starts true so the bar cannot flash over a
  // hero before the first measurement.
  const hasOwnCta = useRef(true);

  useEffect(() => {
    // Scoped to <main>: excludes this bar's own link, and the header's, which
    // on small screens sits inside the collapsed menu and so has no layout
    // box to measure.
    const measure = () => {
      const ctas = Array.from(document.querySelectorAll<HTMLElement>('main a[href$="#quote"]'));
      hasOwnCta.current = ctas.some((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.top < window.innerHeight * 0.9;
      });
    };

    const onScroll = () => setRevealed(!hasOwnCta.current || window.scrollY > window.innerHeight * 0.6);

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const quote = document.getElementById("quote");
    if (!quote) return;
    const io = new IntersectionObserver(([entry]) => setAtForm(entry.isIntersecting), {
      // Any meaningful part of the form on screen counts as "they're here".
      rootMargin: "-15% 0px -15% 0px",
    });
    io.observe(quote);
    return () => io.disconnect();
  }, []);

  const shown = revealed && !atForm;

  return (
    <nav
      aria-label="Book"
      // aria-hidden while off-screen so the links leave the tab order too,
      // rather than being invisible but still focusable.
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule-strong bg-ink/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-3 px-4 py-3">
        <a
          href="#quote"
          tabIndex={shown ? undefined : -1}
          className="btn-primary flex-1 px-6 py-4 text-sm"
        >
          BOOK NOW
        </a>
        <a
          href={smsHref}
          tabIndex={shown ? undefined : -1}
          onClick={() => track("text_tapped", { from: "mobile_bar" })}
          className="btn-secondary px-6 py-4 text-sm"
        >
          TEXT
        </a>
      </div>
    </nav>
  );
}

/**
 * Reserves the bar's height at the end of the document. Without it the fixed
 * bar covers the last rows of the footer once the page is scrolled to the
 * bottom.
 */
export function MobileBookBarSpacer() {
  return <div aria-hidden className="h-[72px] lg:hidden" />;
}

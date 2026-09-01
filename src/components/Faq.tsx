import { Reveal } from "./Reveal";

export type FaqItem = { q: string; a: string };

/**
 * Question-and-answer block.
 *
 * Answers render open rather than behind an accordion: there are only ever a
 * handful, they are short, and the questions here are the ones that decide
 * whether someone books — hiding them behind a click is the wrong trade. It
 * also keeps the section working with no JavaScript, like the rest of the
 * site.
 *
 * Layout follows the "conditions" and "groundwork" rows used elsewhere: a
 * sticky heading in the left column, hairline-separated rows on the right.
 */
export function Faq({
  items,
  heading = "Questions people ask",
  intro,
}: {
  items: FaqItem[];
  heading?: string;
  intro?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section
      id="faq"
      className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-14 lg:py-24"
    >
      <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
        <span aria-hidden className="block h-14 w-px bg-leaf" />
        <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">{heading}</h2>
        {intro && <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-dim">{intro}</p>}
      </Reveal>

      <dl className="flex flex-col">
        {items.map((item, i) => (
          <Reveal
            key={item.q}
            delay={i * 70}
            className={`border-t border-rule py-8 ${i === items.length - 1 ? "border-b" : ""}`}
          >
            <dt className="text-lg font-normal tracking-[-0.02em] sm:text-xl">{item.q}</dt>
            <dd className="mt-3 max-w-[60ch] text-[1rem] leading-relaxed text-muted">{item.a}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

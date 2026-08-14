import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/PhotoSlot";
import { BeforeAfter } from "@/components/BeforeAfter";
import { QuoteForm } from "@/components/QuoteForm";
import { site, services, telHref, smsHref } from "@/lib/site";
import { heroPhoto, beforeAfterPairs } from "@/lib/photos";

const FACTS = [
  { label: "Service", value: "Fully mobile — our water, our power" },
  { label: "Area", value: "Beverly and the towns around it" },
  { label: "Quotes", value: "Free, by phone, text, or form" },
];

// Replace these with real reviews as they come in — name and town underneath.
const TESTIMONIALS = [
  { quote: "Paste a real review here and I'll set it in place — name and town underneath.", who: "Customer — Beverly" },
  { quote: "A second one goes here. Two is plenty until the reviews build up.", who: "Customer — Danvers" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="grain relative -mt-[73px] flex min-h-[640px] items-end overflow-hidden border-b border-rule pt-[73px] lg:min-h-[88vh]">
        <div className="absolute inset-0">
          <PhotoSlot photo={heroPhoto} priority sizes="100vw" />
        </div>
        {/* Two-axis scrim: keeps the headline legible over any photo. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/10"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink to-transparent" />

        <div className="relative w-full px-6 pt-24 pb-16 sm:px-10 lg:px-14 lg:pb-20">
          <div className="flex max-w-[760px] flex-col gap-6 lg:gap-7">
            <Reveal as="span" className="eyebrow">
              We come to you
            </Reveal>
            <Reveal as="h1" delay={100}>
              <span className="block text-[clamp(3rem,9vw,6.75rem)] leading-[0.92] font-light tracking-[-0.045em]">
                Detailing,
                <br />
                delivered.
              </span>
            </Reveal>
            <Reveal as="p" delay={200} className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-soft sm:text-[1.1875rem]">
              Interior and exterior detailing done in your driveway, on the North Shore. No drop-off, no waiting room,
              no half job.
            </Reveal>
            <Reveal delay={300} className="flex flex-wrap gap-4 pt-1">
              <a href="#quote" className="btn-primary px-7 py-5 text-sm sm:px-8">
                GET A FREE QUOTE
              </a>
              <a href={smsHref} className="btn-secondary px-7 py-5 text-sm sm:px-8">
                TEXT A PHOTO OF YOUR CAR
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Facts strip ──────────────────────────────────────────────── */}
      <section className="grid border-b border-rule sm:grid-cols-3">
        {FACTS.map((fact, i) => (
          <div
            key={fact.label}
            className={`px-6 py-9 sm:px-8 lg:px-10 ${
              i > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""
            } ${i === 0 ? "lg:pl-14" : ""} ${i === FACTS.length - 1 ? "lg:pr-14" : ""}`}
          >
            <span className="label mb-2.5 block">{fact.label}</span>
            <span className="text-[1.0625rem] font-medium">{fact.value}</span>
          </div>
        ))}
      </section>

      {/* ── Services ─────────────────────────────────────────────────── */}
      <section id="services" className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden className="block h-14 w-px bg-leaf" />
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            Two services,
            <br />
            done properly.
          </h2>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-dim">
            Book either one, or both in a single visit. Price depends on the car and its condition, so we quote it
            rather than guess.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              as="article"
              delay={i * 90}
              className={`group grid grid-cols-[auto_1fr] gap-6 border-t border-rule py-9 transition-colors duration-200 hover:bg-leaf/[0.05] sm:gap-9 ${
                i === services.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="w-6 pt-2.5 text-[0.8125rem] font-medium tracking-[0.18em] text-leaf">
                {service.numeral}
              </span>
              <div>
                <h3 className="text-2xl font-normal tracking-[-0.02em] sm:text-[1.75rem]">{service.title}</h3>
                <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-muted">{service.copy}</p>
                {service.chips.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                      <span key={chip} className="chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      <section id="work" className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.03em]">The before and after</h2>
          <span className="label">Drag the handle</span>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {beforeAfterPairs.map((pair, i) => (
            <Reveal key={pair.id} delay={i * 120}>
              <BeforeAfter pair={pair} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-rule pt-14 lg:grid-cols-2 lg:gap-14">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.who} as="blockquote" delay={i * 120} className="m-0">
              <p className="text-[1.25rem] leading-[1.5] font-light sm:text-[1.375rem]">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 text-[0.6875rem] tracking-[0.2em] text-dim uppercase">{t.who}</footer>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────────────────── */}
      <section id="quote" className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[0.95] font-light tracking-[-0.045em]">
            Tell us where
            <br />
            you&rsquo;re parked.
          </h2>
          <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted">
            Send the car and your town and you&rsquo;ll get a price and a time back — usually the same day. Prefer to
            skip the form? Call or text.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={telHref} className="btn-primary px-8 py-5 text-base">
              CALL {site.phone.display}
            </a>
            <a href={smsHref} className="btn-secondary px-8 py-5 text-base">
              TEXT US
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </section>

      {/* ── Area ─────────────────────────────────────────────────────── */}
      <section id="area" className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <Reveal className="flex flex-col gap-6">
          <span className="label">Where we work</span>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[1.0625rem] text-muted">
            {site.towns.map((town) => (
              <span key={town}>{town}</span>
            ))}
          </div>
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-dim">
            Not on the list? Ask anyway — if you&rsquo;re near the North Shore we can usually make it work.
          </p>
        </Reveal>
      </section>
    </>
  );
}

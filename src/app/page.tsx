import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/PhotoSlot";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BeforeAfterSplit } from "@/components/BeforeAfterSplit";
import { QuoteForm } from "@/components/QuoteForm";
import { ArrowRight, InstagramGlyph } from "@/components/Icons";
import { site, services, telHref, smsHref } from "@/lib/site";
import { heroPhoto, beforeAfterPairs } from "@/lib/photos";

/**
 * Trust bar. Every line here is a promise the business can actually keep —
 * no reviews, no guarantees, no "insured" or "certified" claims that haven't
 * been verified. Each one answers an objection rather than stating a feature:
 * what it costs to ask, what happens to my day, what if I don't have cash,
 * who is actually turning up.
 */
const TRUST = [
  { label: "Free quotes", value: "Ask for a price and a time. No obligation, no deposit to book." },
  { label: "You stay put", value: "We detail it in your driveway. No drop-off, no waiting room." },
  { label: "Pay how you like", value: site.payments.join(", ") + " — on the day, once it's done." },
  { label: "One person, start to finish", value: "Whoever quotes your car is the one who details it." },
];

/**
 * The three steps between "interested" and "booked". Spelling them out
 * removes the main reason a first-time visitor bounces: not knowing how
 * much hassle they're signing up for.
 */
const STEPS = [
  {
    n: "01",
    title: "Send us the car",
    copy: "Text a photo or fill in the form. The messier it is, the more useful the photo — we'd rather see it than guess.",
  },
  {
    n: "02",
    title: "Get a price and a time",
    copy: "Usually the same day. The price we quote is the price you pay unless you add something to the job.",
  },
  {
    n: "03",
    title: "We come to you",
    copy: "We detail it at your place, off your outdoor tap and a power outlet. You get it back finished — pay when you're happy with it.",
  },
];

// How the business prepared before taking on customer cars. These answer the
// objection a new detailer has to answer, so keep them concrete.
const GROUNDWORK = [
  {
    label: "Equipment first",
    copy: "We bought the right tools and products before the first job, not after — extractor, proper mitts and towels, and products chosen for the surface.",
  },
  {
    label: "Technique researched",
    copy: "The process was worked out in advance, so nothing gets improvised on your paint.",
  },
  {
    label: "Owner-operated",
    copy: "The person who quotes your car is the person who details it. Nobody gets subcontracted your keys.",
  },
];

/**
 * Real reviews only. The block below renders nothing while this is empty, so
 * the page never shows invented or placeholder testimonials.
 *
 * To switch it on, add entries in this shape:
 *   { quote: "They got the dog hair out of my back seat.", who: "Sarah M. — Beverly" }
 * Two is plenty to start.
 */
const TESTIMONIALS: { quote: string; who: string }[] = [];

/** Undefined until a profile is added to site.social, so the blocks that use
 *  it drop out rather than rendering a dead link. */
const instagram = site.social.find((s) => s.label === "Instagram");

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
          className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/55 sm:via-ink/80 sm:to-ink/10"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink to-transparent" />

        <div className="relative w-full px-6 pt-24 pb-16 sm:px-10 lg:px-14 lg:pb-20">
          <div className="flex max-w-[760px] flex-col gap-6 lg:gap-7">
            <Reveal as="span" className="eyebrow">
              Mobile detailing — {site.areaLabel}
            </Reveal>
            <Reveal as="h1" delay={100}>
              {/* States the offer plainly rather than leading with a brand
                  line. A first-time visitor should know what is being sold
                  and where before they scroll. */}
              <span className="block max-w-[15ch] text-[clamp(2.5rem,7vw,5.25rem)] leading-[0.95] font-light tracking-[-0.04em]">
                Your car, detailed in your driveway.
              </span>
            </Reveal>
            <Reveal as="p" delay={200} className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-soft sm:text-[1.1875rem]">
              Interior and exterior detailing that comes to you. Send a photo, get a price back the same day, and keep
              your afternoon.
            </Reveal>
            <Reveal delay={300} className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#quote" className="btn-primary w-full px-7 py-5 text-sm sm:w-auto sm:px-8">
                GET MY FREE QUOTE
              </a>
              <a href={smsHref} className="btn-secondary w-full px-7 py-5 text-sm sm:w-auto sm:px-8">
                TEXT A PHOTO
              </a>
            </Reveal>
            {/* Answers "what does asking cost me?" right at the button. */}
            <Reveal
              as="p"
              delay={380}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.75rem] tracking-[0.14em] text-dim uppercase"
            >
              <span>Free quotes</span>
              <span aria-hidden className="text-rule-strong">
                /
              </span>
              <span>No deposit</span>
              <span aria-hidden className="text-rule-strong">
                /
              </span>
              <span>Owner-operated</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────── */}
      {/* Two-up on tablet, four across on desktop — four in a row at 768px
          squeezed these to two words per line. */}
      <section className="grid border-b border-rule sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((item, i) => (
          <div
            key={item.label}
            className={`border-rule px-6 py-8 sm:px-10 lg:px-8 lg:py-9 ${
              i > 0 ? "border-t sm:border-t-0" : ""
            } ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${
              i % 2 === 1 ? "sm:border-l" : ""
            } lg:border-l ${i === 0 ? "lg:border-l-0 lg:pl-14" : ""} ${
              i === TRUST.length - 1 ? "lg:pr-14" : ""
            }`}
          >
            <span className="label mb-2.5 block text-leaf">{item.label}</span>
            <span className="block max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted">{item.value}</span>
          </div>
        ))}
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section id="how" className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="mb-12 flex flex-col gap-4">
          <span className="eyebrow">How it works</span>
          <h2 className="max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            Three steps, and none of them are your problem.
          </h2>
        </Reveal>

        <ol className="grid gap-px bg-rule sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} as="li" delay={i * 100} className="flex flex-col gap-3 bg-ink p-6 sm:p-8">
              <span className="font-mono text-[0.75rem] tracking-[0.2em] text-leaf">{step.n}</span>
              <h3 className="text-[1.25rem] font-normal tracking-[-0.015em]">{step.title}</h3>
              <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
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
                <p className="mt-3 max-w-[52ch] text-[0.875rem] leading-relaxed text-dim">
                  <span className="text-leaf">Best for</span> {service.bestFor}
                </p>
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

          {/* Catches the visitor who has read all three and still isn't sure
              — the point where a service list usually loses people. */}
          <Reveal delay={270} className="flex flex-col gap-4 pt-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
              Not sure which one your car needs? Send a photo and we&rsquo;ll tell you straight.
            </p>
            <a href={smsHref} className="btn-secondary w-full px-7 py-4 text-sm sm:w-auto">
              TEXT A PHOTO
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      <section id="work" className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="mb-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.03em]">The before and after</h2>
            <span className="label">
              {beforeAfterPairs.some((p) => p.mode === "slider") ? "Drag the handle" : "Real customer cars"}
            </span>
          </div>
          {/* The strongest honest proof available to a business this new: the
              photos are the actual work, not a stock library. */}
          <p className="max-w-[54ch] text-[0.9375rem] leading-relaxed text-muted">
            Every photo on this page is a car we detailed, shot on the day. No stock images, no borrowed portfolio.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {beforeAfterPairs.map((pair, i) => (
            <Reveal key={pair.id} delay={i * 120}>
              {pair.mode === "slider" ? <BeforeAfter pair={pair} /> : <BeforeAfterSplit pair={pair} />}
            </Reveal>
          ))}
        </div>

        {instagram && (
          <Reveal delay={240} className="mt-12 flex flex-col gap-4 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
              We post every car we finish. Have a look at the most recent ones before you book.
            </p>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full px-7 py-4 text-sm sm:w-auto"
            >
              <InstagramGlyph className="h-[1.125rem] w-[1.125rem]" />
              {instagram.handle}
            </a>
          </Reveal>
        )}

        {TESTIMONIALS.length > 0 && (
          <div className="mt-16 grid gap-10 border-t border-rule pt-14 lg:grid-cols-2 lg:gap-14">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.who} as="blockquote" delay={i * 120} className="m-0">
                <p className="text-[1.25rem] leading-[1.5] font-light sm:text-[1.375rem]">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-5 text-[0.6875rem] tracking-[0.2em] text-dim uppercase">{t.who}</footer>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-14 lg:py-24"
      >
        {/* Heading sits in its own sticky column, matching Services. There is
            no owner portrait to show, and a placeholder tile here read as a
            missing image rather than a deliberate space. */}
        <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Who&rsquo;s doing the work</span>
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            Cars have always
            <br />
            been the thing.
          </h2>
        </Reveal>

        <div className="flex flex-col">
          <Reveal>
            <div className="flex max-w-[58ch] flex-col gap-6">
              <p className="text-[1.0625rem] leading-[1.7] text-bone">
                Meet {site.owner.name}, {site.owner.role} of {site.name}.
              </p>
              {/* Paul's own words, so the voice switches to first person here.
                  The rule down the side carries the quotation across all three
                  paragraphs — opening marks on every one would read as three
                  separate quotes. */}
              <blockquote className="flex flex-col gap-5 border-l border-leaf/40 pl-6 text-[1.0625rem] leading-[1.7] text-muted sm:pl-7">
                <p>
                  &ldquo;I&rsquo;ve had a thing for cars as long as I can remember. Growing up I was the one out in the
                  driveway helping my parents clean theirs, and somewhere in all that the idea for Clover Downs took
                  shape.
                </p>
                <p>
                  I&rsquo;ve been detailing for a few months now. I say that plainly, because it&rsquo;s exactly why
                  I&rsquo;ve been so deliberate about how I started — researching products, working out technique, and
                  buying proper equipment before I touched a single customer&rsquo;s car.{" "}
                  <span className="text-bone">I&rsquo;m not learning on your paint.</span>
                </p>
                <p>
                  What you get is a job done properly and without wasted time: the same care I&rsquo;d give a car
                  sitting in my own driveway.&rdquo;
                </p>
              </blockquote>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col">
            {GROUNDWORK.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 90}
                className={`grid gap-2 border-t border-rule py-6 sm:grid-cols-[13rem_1fr] sm:gap-8 ${
                  i === GROUNDWORK.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="label pt-1">{item.label}</span>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">{item.copy}</p>
              </Reveal>
            ))}
          </div>
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
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <a href={telHref} className="btn-primary w-full px-8 py-5 text-base sm:w-auto">
              CALL {site.phone.display}
            </a>
            <a href={smsHref} className="btn-secondary w-full px-8 py-5 text-base sm:w-auto">
              TEXT US
            </a>
          </div>
          {/* Stated before booking, not on arrival — a customer who can't
              reach an outdoor tap needs to know that while they're choosing,
              not once the van is parked. */}
          <p className="max-w-[44ch] border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-dim">
            <span className="text-bone">What we need on site.</span> We work at your home, off your outdoor water tap
            and a power outlet, so we need those to reach the car. If yours won&rsquo;t, or you park on the street or in
            a shared lot, mention it and we&rsquo;ll sort it out beforehand.
          </p>
          <p className="max-w-[44ch] border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-dim">
            <span className="text-bone">Payment on the day.</span> We take {site.payments.slice(0, -1).join(", ")}, or{" "}
            {site.payments.at(-1)}. No deposit to book.
          </p>
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

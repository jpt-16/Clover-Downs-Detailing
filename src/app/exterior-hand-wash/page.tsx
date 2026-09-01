import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { Faq, type FaqItem } from "@/components/Faq";
import { ArrowRight } from "@/components/Icons";
import { site, smsHref } from "@/lib/site";
import { towns } from "@/lib/towns";

export const metadata: Metadata = {
  // Matches the town-page pattern and keeps the whole thing inside the ~60
  // characters Google shows before truncating.
  title: { absolute: `Exterior Hand Wash in ${site.city}, ${site.region} — ${site.name}` },
  description:
    "Mobile car wash across Beverly and the North Shore. Two-bucket hand wash, wheels and wells first, hand-dried. Optional hand wax. No deposit.",
  alternates: { canonical: "/exterior-hand-wash" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Exterior Hand Wash — ${site.areaLabel}`,
    description:
      "Two buckets, clean mitts, wheels and wells first, tar and bugs off, hand-dried. Optional hand wax. Free quote by text.",
    url: `${site.url}/exterior-hand-wash`,
    locale: "en_US",
  },
};

const INCLUDED = [
  {
    label: "Two buckets, clean mitts",
    copy: "One bucket of soap, one of plain water for rinsing the mitt. The grit that comes off the car goes into the rinse bucket instead of back onto the paint on the next pass. It is a different process to a tunnel wash, not a slower one.",
  },
  {
    label: "Wheels and wells first, separate tools",
    copy: "Brake dust is metallic, and it is the last thing that should touch paintwork. Wheels, wheel wells and tires get done first with their own tools, before anything goes near a panel.",
  },
  {
    label: "Tar and bugs as their own step",
    copy: "Both are bonded to the paint rather than sitting on it, so they come off chemically before anything is dragged across them. Dragging a mitt over bug residue is how you put fine scratches in a clear coat.",
  },
  {
    label: "Hand-dried, tires dressed",
    copy: "Dried by hand with clean towels rather than left to air-dry. That matters more here than inland — salt air marks a panel as it dries, so a car left dripping ends up spotted.",
  },
  {
    label: "Hand wax, if you want it",
    copy: "Optional, and worth most before winter. Wax gives road salt and airborne salt something to sit on that is not your clear coat, and makes the next wash pull it off far more easily. On the water it is the single most worthwhile thing you can do to the paint.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How is this different from a $20 tunnel wash?",
    a: "A tunnel gets loose dirt off the paint and nothing else. It does not touch tar, bugs, sap, the wheel wells or the door shuts. Most tunnels also run hundreds of cars a day on the same brushes, so whatever the car in front brought in is what touches yours — that is where the fine circular scratches on older cars come from.",
  },
  {
    q: "Do you do ceramic coating or paint correction?",
    a: "No. This is a hand wash, with an optional hand wax. If a car needs paint correction it needs a shop with the right equipment, and there are good ones locally — we will say so rather than sell you something else.",
  },
  {
    q: "Can you wash a car in winter?",
    a: "Yes, given a day above freezing and a working outdoor tap. A lot of North Shore houses shut the spigot off in November, so mention it when you ask. Washing through the winter is worth more than waiting for spring — the January wash does more good than the April one.",
  },
  {
    q: "How long does it take?",
    a: "About an hour for the exterior on its own, longer with a wax or on a larger vehicle. Booked together with an interior detail it is most of a session.",
  },
  {
    q: "What do you need on site?",
    a: "An outdoor tap and a power outlet within reach of the car. Almost every driveway on the North Shore has both. If yours will not reach, or the car sits on the street or in a shared lot, say so when you ask for a quote.",
  },
  {
    q: "How often should I have it done?",
    a: "For most cars here, a wash every few weeks through winter to keep salt off, and a wax in late autumn before the salt starts. Under trees in Wenham or Hamilton, sap season tends to set the schedule instead.",
  },
];

export default function ExteriorHandWashPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-rule px-6 pt-28 pb-16 sm:px-10 lg:px-14 lg:pt-32 lg:pb-20">
        <div className="flex max-w-[760px] flex-col gap-6 lg:gap-7">
          <Reveal className="flex flex-col gap-6 lg:gap-7">
            <span className="eyebrow text-balance">Exterior hand wash — {site.areaLabel}</span>
            <Reveal
              as="h1"
              delay={100}
              className="block max-w-[17ch] text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.98] font-light tracking-[-0.04em]"
            >
              Exterior hand wash, at your house.
            </Reveal>
          </Reveal>

          <Reveal as="p" delay={200} className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-soft">
            Washed by hand in your driveway — two buckets, clean mitts, wheels and wells before anything touches the
            paint. Nothing abrasive goes near the car. Add a hand wax and the shine holds through the season.
          </Reveal>

          <Reveal delay={280} className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <a href="#quote" className="btn-primary px-8 py-4 text-sm">
              GET A FREE QUOTE
            </a>
            <a href={smsHref} className="btn-secondary px-8 py-4 text-sm">
              TEXT A PHOTO
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={340}>
            <p className="text-[0.875rem] text-dim">Free quotes · No deposit · Pay on the day, once you have seen it</p>
          </Reveal>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────────────── */}
      <section className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden className="block h-14 w-px bg-leaf" />
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            What&rsquo;s
            <br />
            included.
          </h2>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-dim">
            The process is the point. Every step below exists to keep grit away from your paint.
          </p>
        </Reveal>

        <ul className="flex flex-col">
          {INCLUDED.map((item, i) => (
            <Reveal
              key={item.label}
              as="li"
              delay={i * 80}
              className={`border-t border-rule py-9 ${i === INCLUDED.length - 1 ? "border-b" : ""}`}
            >
              <h3 className="text-xl font-normal tracking-[-0.02em] sm:text-2xl">{item.label}</h3>
              <p className="mt-3 max-w-[58ch] text-[1rem] leading-relaxed text-muted">{item.copy}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────── */}
      <section className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="flex max-w-[62ch] flex-col gap-6">
          <span className="label">Who books this</span>
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            Road salt, pollen, bug season, or a quick refresh.
          </h2>
          <div className="flex flex-col gap-4 text-[1.0625rem] leading-[1.7] text-muted">
            <p>
              Winter is the main one. Brine coats the lower panels, sills and wheel wells and holds moisture against
              bare metal at the seams — that is a bodyshop problem, and it costs a great deal more than a wash. Commuter
              miles on 1 and 128 through{" "}
              <Link href="/mobile-detailing/danvers" className="text-leaf underline underline-offset-4">
                Danvers
              </Link>{" "}
              and{" "}
              <Link href="/mobile-detailing/peabody" className="text-leaf underline underline-offset-4">
                Peabody
              </Link>{" "}
              put highway film and brake dust on top of it.
            </p>
            <p>
              Nearer the water —{" "}
              <Link href="/mobile-detailing/beverly-farms" className="text-leaf underline underline-offset-4">
                Beverly Farms
              </Link>{" "}
              and{" "}
              <Link href="/mobile-detailing/manchester-by-the-sea" className="text-leaf underline underline-offset-4">
                Manchester-by-the-Sea
              </Link>{" "}
              — there is salt in the air year-round, not just when the roads are treated. That is where a wax earns its
              money.
            </p>
            <p>
              Under the trees in{" "}
              <Link href="/mobile-detailing/wenham" className="text-leaf underline underline-offset-4">
                Wenham
              </Link>{" "}
              and{" "}
              <Link href="/mobile-detailing/hamilton" className="text-leaf underline underline-offset-4">
                Hamilton
              </Link>
              , sap is the one that catches people out — it needs taking off properly, not smearing into a wider film.
            </p>
          </div>
        </Reveal>
      </section>

      <Faq items={FAQS} intro="Including what this service is not, which is usually the more useful half." />

      {/* ── Quote ────────────────────────────────────────────────────── */}
      <section id="quote" className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-5">
          <span aria-hidden className="block h-14 w-px bg-leaf" />
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            Send a photo,
            <br />
            get a price.
          </h2>
          <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-dim">
            Outside shot is enough. Tell us if there is sap, tar or a winter&rsquo;s worth of salt on it.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </section>

      {/* ── Where ────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <Reveal className="flex flex-col gap-6">
          <span className="label">Washing cars across</span>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[1.0625rem]">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/mobile-detailing/${town.slug}`}
                className="text-muted underline underline-offset-4 transition-colors hover:text-leaf"
              >
                {town.name}
              </Link>
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

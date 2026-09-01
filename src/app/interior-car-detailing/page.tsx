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
  title: { absolute: `Interior Car Detailing in ${site.city}, ${site.region} — ${site.name}` },
  description:
    "Interior car detailing across Beverly and the North Shore, done in your driveway. Carpets and seats extracted, pet hair included, no deposit.",
  alternates: { canonical: "/interior-car-detailing" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Interior Car Detailing — ${site.areaLabel}`,
    description:
      "Vacuumed throughout, carpets and seats extracted, odors treated at the source. Pet hair is part of the job. Free quote by text.",
    url: `${site.url}/interior-car-detailing`,
    locale: "en_US",
  },
};

/** What the job actually covers. Drawn from the service copy on the homepage
 *  — nothing here is a new claim. */
const INCLUDED = [
  {
    label: "Vacuumed throughout",
    copy: "Mats out first, seats moved, the trunk emptied. Under the seats and along the rails is where most of the debris in any car actually sits, and it is the part a quick clean never reaches.",
  },
  {
    label: "Carpets and seats extracted",
    copy: "Clean solution pushed into the pile and pulled straight back out, so what comes up leaves with the water instead of drying back in. This is the step with no home equivalent — it works at the backing rather than the surface, which is where beach sand, road salt and old spills end up.",
  },
  {
    label: "Every hard surface cleaned",
    copy: "Dash, console, door cards, cupholders and vents. Glass inside and out, left streak-free — the film on the inside of a windshield after a closed-up winter is what you notice driving at night.",
  },
  {
    label: "Pet hair, at no extra charge",
    copy: "Lifted out of the fabric with rubber before anything is vacuumed, because suction alone pulls straight up on a hair that is wedged in point-first. Most detailers locally charge $25 to $75 on top for this. It is part of the job here.",
  },
  {
    label: "Odors treated at the source",
    copy: "Smell lives in the carpet and the padding, not in the air. It gets dealt with where it is, then a light scent to finish — not a scent sprayed over the top of it.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How long does a full interior detail take?",
    a: "Three to five hours, depending on the size of the car and what is in it. A realistic time is a good sign — a proper interior detail cannot be done in forty-five minutes.",
  },
  {
    q: "Does the car come back wet?",
    a: "Damp, not wet. Properly extracted carpet dries in a few hours with the windows cracked. Genuinely soaked seats mean shampoo went in and did not come back out, which is the opposite of extraction.",
  },
  {
    q: "Do you charge extra for pet hair?",
    a: "No. It is part of the full interior detail. Most places locally add $25 to $75 for it. The price quoted is the price paid unless you add something to the job.",
  },
  {
    q: "What should I take out of the car first?",
    a: "Anything you care about — change in the cupholder, sunglasses, the garage remote, paperwork in the door pockets, the kids' things off the seat backs. A cleared-out car gets a better job, because the seats can be moved and the corners reached.",
  },
  {
    q: "Do I need to be there while you work?",
    a: "No. Leave the keys somewhere sensible and get on with your day. You pay once it is done and you have seen it.",
  },
  {
    q: "What do you need on site?",
    a: "An outdoor tap and a power outlet within reach of the car. Almost every driveway on the North Shore has both. If yours will not reach, or the car sits on the street or in a shared lot, say so when you ask for a quote and it gets sorted beforehand.",
  },
];

export default function InteriorDetailingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-rule px-6 pt-28 pb-16 sm:px-10 lg:px-14 lg:pt-32 lg:pb-20">
        <div className="flex max-w-[760px] flex-col gap-6 lg:gap-7">
          <Reveal className="flex flex-col gap-6 lg:gap-7">
            <span className="eyebrow text-balance">Interior detailing — {site.areaLabel}</span>
            <Reveal
              as="h1"
              delay={100}
              className="block max-w-[17ch] text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.98] font-light tracking-[-0.04em]"
            >
              Interior car detailing, in your driveway.
            </Reveal>
          </Reveal>

          <Reveal as="p" delay={200} className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-soft">
            The full inside of the car, done properly, at your house. Carpets and seats extracted rather than wiped,
            pet hair and set-in spills part of the job rather than an upcharge, and the smell dealt with at the source.
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
            One interior service, not three tiers with the good bits held back for the expensive one.
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
            Kids, pets, coffee, or a car you&rsquo;re about to sell.
          </h2>
          <div className="flex flex-col gap-4 text-[1.0625rem] leading-[1.7] text-muted">
            <p>
              Most cars that get booked in have one of four things going on. There is sand in the carpet from the
              beach — Lynch Park and Dane Street in{" "}
              <Link href="/mobile-detailing/beverly" className="text-leaf underline underline-offset-4">
                Beverly
              </Link>
              , Singing Beach in{" "}
              <Link href="/mobile-detailing/manchester-by-the-sea" className="text-leaf underline underline-offset-4">
                Manchester-by-the-Sea
              </Link>
              . There is road salt worked into the mats from December to March. There is a dog. Or there are children,
              and everything that comes with them.
            </p>
            <p>
              The other reason is a sale. A clean interior changes what a buyer or an inspector assumes about how the
              car has been treated, for a fraction of what they would knock off the price.
            </p>
            <p>
              <span className="text-bone">Not worth it</span> if you had one done two months ago and the car has been
              dry and empty since. We will tell you that rather than take the booking.
            </p>
          </div>
        </Reveal>
      </section>

      <Faq
        items={FAQS}
        intro="The things worth knowing before you book, including the ones nobody usually puts in writing."
      />

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
            The worst corner you have got. The messier it is, the more useful the photo — we would rather see it than
            guess.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </section>

      {/* ── Where ────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <Reveal className="flex flex-col gap-6">
          <span className="label">Interior detailing across</span>
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

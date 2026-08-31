import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { ArrowRight } from "@/components/Icons";
import { site, services, telHref, smsHref } from "@/lib/site";
import { towns, townBySlug } from "@/lib/towns";

/** Every town is known at build time, so all of these are static pages. */
export function generateStaticParams() {
  return towns.map((town) => ({ town: town.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town: slug } = await params;
  const town = townBySlug.get(slug);
  if (!town) return {};

  // Title skips the layout's "— Clover Downs Detailing" template and states
  // the whole thing itself, so the town and the service both sit near the
  // front where they are read.
  return {
    title: {
      absolute: `Mobile Detailing in ${town.name}, ${site.region} — ${site.name}`,
    },
    description: town.metaDescription,
    alternates: { canonical: `/mobile-detailing/${town.slug}` },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `Mobile Detailing in ${town.name}, ${site.region}`,
      description: `Interior details and exterior hand washes, done at your place in ${town.name}. Free quotes by phone or text.`,
      url: `${site.url}/mobile-detailing/${town.slug}`,
      locale: "en_US",
    },
  };
}

/**
 * Service schema scoped to this one town, which is the part that makes a
 * location page legible to Google as a location page rather than a copy of
 * the homepage. The business itself is already described by the
 * LocalBusiness block in the root layout, so this only adds the offer and
 * the place — `provider` points back at the same business by name.
 */
function TownSchema({ townName }: { townName: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile auto detailing",
    name: `Mobile Auto Detailing in ${townName}, ${site.region}`,
    description: `Interior detailing and exterior hand washing carried out at the customer's home in ${townName}, ${site.regionName}.`,
    provider: {
      "@type": "AutoDetailing",
      name: site.name,
      url: site.url,
      telephone: site.phone.e164,
      ...(site.googleBusinessProfile ? { sameAs: site.googleBusinessProfile } : {}),
    },
    areaServed: {
      "@type": "City",
      name: townName,
      containedInPlace: { "@type": "State", name: site.regionName },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Detailing services in ${townName}`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title },
      })),
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default async function TownPage({ params }: { params: Promise<{ town: string }> }) {
  const { town: slug } = await params;
  const town = townBySlug.get(slug);
  if (!town) notFound();

  const others = towns.filter((t) => t.slug !== town.slug);

  return (
    <>
      <TownSchema townName={town.name} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-rule px-6 pt-28 pb-16 sm:px-10 lg:px-14 lg:pt-32 lg:pb-20">
        <div className="flex max-w-[760px] flex-col gap-6 lg:gap-7">
          {/* The eyebrow used to sit inside the h1, so the heading read
              "Beverly & the North Shore — Beverly Mobile detailing in Beverly."
              It is a sibling now: one clean h1, same layout. The wrapper keeps
              the flex column and gap the h1 used to provide, so nothing moves. */}
          <Reveal className="flex flex-col gap-6 lg:gap-7">
            {/* text-balance was inherited from the h1 this used to sit inside.
                Kept explicitly so the line break lands where it always did on
                narrow screens — scoped here rather than on .eyebrow, which
                would change every other eyebrow on the site. */}
            <span className="eyebrow text-balance">
              {site.areaLabel} — {town.name}
            </span>
            <Reveal
              as="h1"
              delay={100}
              className="block max-w-[16ch] text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.98] font-light tracking-[-0.04em]"
            >
              Mobile detailing in {town.name}.
            </Reveal>
          </Reveal>

          <Reveal as="p" delay={200} className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-soft">
            {town.intro}
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
            <p className="text-[0.875rem] text-dim">{town.proximity}</p>
          </Reveal>
        </div>
      </section>

      {/* ── What this town does to cars ───────────────────────────────── */}
      <section className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden className="block h-14 w-px bg-leaf" />
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            What {town.name}
            <br />
            does to a car.
          </h2>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-dim">
            Every town on the North Shore wears a car differently. This is what we plan for here.
          </p>
        </Reveal>

        <ul className="flex flex-col">
          {town.conditions.map((condition, i) => (
            <Reveal
              key={condition.label}
              as="li"
              delay={i * 90}
              className={`border-t border-rule py-9 ${i === town.conditions.length - 1 ? "border-b" : ""}`}
            >
              <h3 className="text-xl font-normal tracking-[-0.02em] sm:text-2xl">{condition.label}</h3>
              <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-muted">{condition.copy}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Services, linked back to the detail on the homepage ───────── */}
      <section className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-6">
          <span className="label">What you can book</span>
          <div className="grid gap-6 sm:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="border-t border-rule pt-5">
                <span className="text-[0.8125rem] font-medium tracking-[0.18em] text-leaf">{service.numeral}</span>
                <h3 className="mt-2 text-lg font-normal tracking-[-0.02em]">{service.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-dim">{service.bestFor}</p>
              </div>
            ))}
          </div>
          <p className="max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
            Price depends on the car and its condition, so every job is quoted individually rather than guessed from a
            list.{" "}
            <Link href="/#services" className="text-leaf underline underline-offset-4">
              Full detail on what each service includes
            </Link>
            .
          </p>
        </Reveal>
      </section>

      {/* ── Logistics: the practical answer to "how does this work here" ─ */}
      <section className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-5">
          <span className="label">Getting it done in {town.name}</span>
          <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">{town.logistics}</p>
          <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-dim">
            We work off an outdoor tap and a power outlet, and we come to you — there is no drop-off and no waiting
            room. Call or text{" "}
            <a href={telHref} className="text-leaf underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            if you would rather just ask.
          </p>
        </Reveal>
      </section>

      {/* ── Quote ────────────────────────────────────────────────────── */}
      <section id="quote" className="grid gap-12 border-b border-rule px-6 py-20 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden className="block h-14 w-px bg-leaf" />
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-light tracking-[-0.03em]">
            Tell us where
            <br />
            you&rsquo;re parked.
          </h2>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-dim">
            Send the car and your street, and you&rsquo;ll get a price and a time back — usually the same day.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </section>

      {/* ── The rest of the service area ─────────────────────────────── */}
      <section className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <Reveal className="flex flex-col gap-6">
          <span className="label">Also serving</span>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[1.0625rem]">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/mobile-detailing/${other.slug}`}
                className="text-muted underline underline-offset-4 transition-colors hover:text-leaf"
              >
                {other.name}
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

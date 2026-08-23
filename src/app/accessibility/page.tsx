import type { Metadata } from "next";
import Link from "next/link";
import { site, telHref, smsHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `How ${site.name} works to keep this site usable for everyone, and how to tell us when it doesn't.`,
  alternates: { canonical: "/accessibility" },
  robots: { index: true, follow: true },
};

/** Bump this whenever the site is re-audited. A statement dated two years ago
 *  is worse than no statement — it reads as something nobody maintains. */
const REVIEWED = "August 23, 2026";

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-rule py-10 sm:grid-cols-[auto_1fr] sm:gap-9">
      <span className="pt-1.5 text-[0.75rem] tracking-[0.2em] text-leaf">
        {n}
      </span>
      <div>
        <h2 className="text-[1.375rem] font-normal tracking-[-0.02em] sm:text-2xl">
          {title}
        </h2>
        <div className="mt-4 flex flex-col gap-4 text-[1rem] leading-[1.7] text-muted">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function AccessibilityPage() {
  const phoneLink = (
    <a href={telHref} className="text-leaf underline underline-offset-4">
      {site.phone.display}
    </a>
  );
  const emailLink = (
    <a
      href={`mailto:${site.email}`}
      className="break-all text-leaf underline underline-offset-4"
    >
      {site.email}
    </a>
  );

  return (
    <article className="px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <header className="mx-auto max-w-[70ch]">
        <Link href="/" className="label transition-colors hover:text-leaf">
          ← Back to {site.shortName}
        </Link>
        <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.98] font-light tracking-[-0.04em]">
          Accessibility
        </h1>
        <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-soft">
          Short version: this site is built to be usable with a keyboard, a
          screen reader, or a magnified screen. If something here gets in your
          way, tell us and we&rsquo;ll fix it — and we&rsquo;ll book your car in
          the meantime.
        </p>
        <p className="mt-6 text-[0.6875rem] tracking-[0.2em] text-dim uppercase">
          Last reviewed {REVIEWED}
        </p>
      </header>

      <div className="mx-auto mt-14 max-w-[70ch]">
        <Section n="I" title="What we aim for">
          <p>
            We build against the{" "}
            <strong className="font-normal text-bone">
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </strong>
            . That is the standard the U.S. Department of Justice points to for
            the Americans with Disabilities Act, and it is the one this site is
            measured against.
          </p>
          <p>
            We are a two-page business run by one person, not a company with an
            accessibility department. What we can promise is that this is taken
            seriously, checked rather than assumed, and fixed when someone tells
            us it is wrong.
          </p>
        </Section>

        <Section n="II" title="Where it stands">
          <p>
            Every page on this site has been tested, most recently on {REVIEWED}
            . As of that date:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-rule-strong">
            <li>
              Automated testing against WCAG 2.1 A and AA reports no violations
              on any page.
            </li>
            <li>
              Everything you can click, you can also reach and operate with a
              keyboard alone, and whatever you are focused on is visibly
              outlined.
            </li>
            <li>
              Text and controls stay readable and usable when the page is zoomed
              to 400%.
            </li>
            <li>Every photo has a written description for screen readers.</li>
            <li>
              Animation is switched off automatically if your device asks for
              reduced motion.
            </li>
            <li>The whole site works with JavaScript turned off.</li>
          </ul>
        </Section>

        <Section n="III" title="What we know is not perfect">
          <p>
            Automated testing catches roughly a third of accessibility problems.
            The rest need a person, and we have not had this site tested by
            someone who uses a screen reader daily. Until we have, we would
            rather say so than claim a clean bill of health.
          </p>
          <p>
            We also know some links and menu items are small targets on a phone,
            which can be awkward if you have limited dexterity. Every one of
            them has a larger equivalent — the buttons at the top and bottom of
            every page, and the call and text links below.
          </p>
        </Section>

        <Section n="IV" title="Tell us if something is wrong">
          <p>
            If any part of this site stops you doing what you came to do, we
            want to hear about it. That includes problems with a screen reader,
            a keyboard, a magnifier, voice control, or anything else.
          </p>
          <p>
            Call or text {phoneLink}, or email {emailLink}. It helps if you can
            tell us which page, what you were trying to do, and what device or
            software you were using — but a one-line message is fine too.
          </p>
          <p>
            <strong className="font-normal text-bone">
              We aim to reply within two business days
            </strong>{" "}
            and to fix anything that is genuinely blocking as quickly as we can.
          </p>
        </Section>

        <Section n="V" title="You can always skip the website">
          <p>
            Nothing here has to go through the form. Everything the site does —
            asking for a price, describing your car, booking a time — can be
            done by phone or text, and you will get the same quote either way.
          </p>
          <p className="flex flex-wrap gap-3 pt-2">
            <a href={telHref} className="btn-primary px-7 py-4 text-sm">
              CALL {site.phone.display}
            </a>
            <a href={smsHref} className="btn-secondary px-7 py-4 text-sm">
              TEXT US
            </a>
          </p>
        </Section>

        <Section n="VI" title="About accessibility overlays">
          <p>
            This site does not use an accessibility overlay or toolbar widget —
            the kind that adds a floating accessibility button to a page. Many
            people who rely on screen readers report that these tools interfere
            with the software they already use and have set up the way they like
            it.
          </p>
          <p>
            We would rather build the page correctly underneath than add a
            widget on top of it. If that decision ever makes something harder
            for you, section IV is how to tell us.
          </p>
        </Section>
      </div>
    </article>
  );
}

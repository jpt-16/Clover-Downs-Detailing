import type { Metadata } from "next";
import Link from "next/link";
import { site, telHref, smsHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you send when you ask for a quote.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE = "August 14, 2026";

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-rule py-10 sm:grid-cols-[auto_1fr] sm:gap-9">
      <span className="pt-1.5 text-[0.75rem] tracking-[0.2em] text-leaf">{n}</span>
      <div>
        <h2 className="text-[1.375rem] font-normal tracking-[-0.02em] sm:text-2xl">{title}</h2>
        <div className="mt-4 flex flex-col gap-4 text-[1rem] leading-[1.7] text-muted">{children}</div>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  const phoneLink = (
    <a href={telHref} className="text-leaf underline-offset-4 hover:underline">
      {site.phone.display}
    </a>
  );

  return (
    <article className="px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <header className="mx-auto max-w-[70ch]">
        <Link href="/" className="label transition-colors hover:text-leaf">
          ← Back to {site.shortName}
        </Link>
        <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.98] font-light tracking-[-0.04em]">
          Privacy policy
        </h1>
        <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-soft">
          Short version: we collect what you send us to quote your car, we use it to quote your car, and we don&rsquo;t
          sell it or share it with anyone who isn&rsquo;t helping us run the business.
        </p>
        <p className="mt-6 text-[0.6875rem] tracking-[0.2em] text-dim uppercase">Effective {EFFECTIVE}</p>
      </header>

      <div className="mx-auto mt-14 max-w-[70ch]">
        <Section n="I" title="Who we are">
          <p>
            {site.name} is a sole proprietorship offering mobile auto detailing in {site.city}, {site.regionName} and
            the surrounding North Shore towns. Because the business is mobile and run from home, we don&rsquo;t publish
            a street address. We&rsquo;re responsible for the information described in this policy, and you can reach us
            any time using the details in section VIII.
          </p>
        </Section>

        <Section n="II" title="What we collect">
          <p>
            <strong className="font-medium text-bone">When you use the quote form.</strong> Your name, email address,
            phone number, town, a description of your vehicle, the service you&rsquo;re after, and anything you write in
            the notes field. All of it is information you choose to type in — we don&rsquo;t pull it from anywhere else.
          </p>
          <p>
            <strong className="font-medium text-bone">When you call, text, or email.</strong> Your phone number or
            email address, and whatever you tell us about the car and where it&rsquo;s parked. If you send us photos of
            your vehicle, we keep those photos while we&rsquo;re quoting and scheduling the work.
          </p>
          <p>
            <strong className="font-medium text-bone">When you simply visit the site.</strong> Our host records standard
            server logs — IP address, browser type, the page requested, and the time of the request. These are generated
            automatically by the hosting platform and used to keep the site running and to spot abuse.
          </p>
          <p>
            <strong className="font-medium text-bone">What we don&rsquo;t collect.</strong> We don&rsquo;t ask for
            payment card numbers on this website, we don&rsquo;t run advertising trackers, and we don&rsquo;t build
            profiles of visitors. We have no interest in any information beyond what it takes to quote and complete a
            detail.
          </p>
        </Section>

        <Section n="III" title="Cookies and tracking">
          <p>
            This site sets no cookies of its own, and we don&rsquo;t use Google Analytics, advertising pixels, or
            cross-site trackers. Our typeface is served from our own domain rather than a font network, so loading a
            page doesn&rsquo;t report your visit to a third party.
          </p>
          <p>
            If we ever add privacy-respecting analytics, we&rsquo;ll say so here before turning it on, and it will not
            involve selling or sharing your data.
          </p>
        </Section>

        <Section n="IV" title="How we use it">
          <p>We use what you send us to:</p>
          <ul className="flex list-none flex-col gap-2.5 pl-0">
            {[
              "Work out an accurate price for your vehicle.",
              "Get back to you with that price and a time we can come out.",
              "Show up at the right place, and do the work you asked for.",
              "Follow up about a job we've done, or a question you've raised.",
              "Keep basic records of jobs completed, as any small business does.",
            ].map((item) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-3">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            We won&rsquo;t add you to a marketing list from a quote request. If we ever start sending promotions,
            it&rsquo;ll be because you asked to receive them, and every message will have a way out.
          </p>
        </Section>

        <Section n="V" title="Who else touches your information">
          <p>
            We don&rsquo;t sell your personal information, and we don&rsquo;t share it for anyone else&rsquo;s
            marketing. A small number of service providers handle it on our behalf, strictly so the site and the
            business can function:
          </p>
          <ul className="flex list-none flex-col gap-4 pl-0">
            <li className="grid grid-cols-[auto_1fr] gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-leaf" />
              <span>
                <strong className="font-medium text-bone">Web3Forms</strong> — delivers quote-form submissions to our
                inbox. Your form details pass through their service on the way to us.
              </span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-leaf" />
              <span>
                <strong className="font-medium text-bone">Vercel</strong> — hosts this website and keeps the server logs
                described above.
              </span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-leaf" />
              <span>
                <strong className="font-medium text-bone">Our email and phone providers</strong> — carry the messages
                between you and us, the same way they would for any business.
              </span>
            </li>
          </ul>
          <p>
            Beyond that, we&rsquo;d only disclose information if the law required it, or if it were genuinely necessary
            to protect someone&rsquo;s safety or our legal rights.
          </p>
        </Section>

        <Section n="VI" title="How long we keep it">
          <p>
            Quote requests that don&rsquo;t turn into work are deleted within about twelve months. Records tied to a job
            we actually performed — what we did, when, and for whom — we keep for up to seven years, because ordinary
            business and tax record-keeping calls for it. Photos you send us are deleted once the job is finished,
            unless you&rsquo;ve told us we can use them as before-and-after examples.
          </p>
          <p>
            We&rsquo;ll never use a photo of your vehicle publicly without asking you first, and we&rsquo;ll take it
            down if you change your mind.
          </p>
        </Section>

        <Section n="VII" title="Your choices">
          <p>
            You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Just get in touch and
            we&rsquo;ll take care of it — normally within thirty days, and at no cost. If deleting something would leave
            us unable to meet a legal record-keeping obligation, we&rsquo;ll tell you what we have to keep and why.
          </p>
          <p>
            To stop hearing from us entirely, say so in a reply or a text and we&rsquo;ll close the thread out.
          </p>
          <p>
            This site is meant for customers in the United States and isn&rsquo;t directed at children under 13. We
            don&rsquo;t knowingly collect information from children; if you believe a child has sent us something, tell
            us and we&rsquo;ll remove it.
          </p>
        </Section>

        <Section n="VIII" title="Contact us">
          {site.email ? (
            <p>
              Questions about this policy, or about anything we hold on you? Email{" "}
              <a href={`mailto:${site.email}`} className="break-all text-leaf underline-offset-4 hover:underline">
                {site.email}
              </a>
              , or call {phoneLink}. A{" "}
              <a href={smsHref} className="text-leaf underline-offset-4 hover:underline">
                text
              </a>{" "}
              is fine too — you&rsquo;ll reach the owner either way.
            </p>
          ) : (
            <p>
              Questions about this policy, or about anything we hold on you? Call {phoneLink}. A{" "}
              <a href={smsHref} className="text-leaf underline-offset-4 hover:underline">
                text
              </a>{" "}
              is fine — you&rsquo;ll reach the owner either way.
            </p>
          )}
        </Section>

        <Section n="IX" title="Changes to this policy">
          <p>
            If we change how we handle information, we&rsquo;ll update this page and move the effective date at the top.
            Material changes will be obvious rather than buried. The version posted here is always the one in force.
          </p>
        </Section>

        <div className="border-t border-rule pt-10">
          <p className="text-[0.8125rem] leading-relaxed text-dim">
            This policy describes our actual practices in plain language. It isn&rsquo;t legal advice, and it
            isn&rsquo;t a substitute for review by an attorney if your obligations change — for instance if you begin
            taking payments through the site, serving customers outside the United States, or adding analytics.
          </p>
          <Link
            href="/#quote"
            className="btn-primary mt-8 px-7 py-4 text-sm"
          >
            GET A FREE QUOTE
          </Link>
        </div>
      </div>
    </article>
  );
}

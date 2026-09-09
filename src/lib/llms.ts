import { site, services } from "@/lib/site";
import { towns } from "@/lib/towns";
import { GENERAL_FAQS, TOWN_GENERAL_FAQS } from "@/lib/faqs";
import { getPosts, formatDate } from "@/lib/blog";

/**
 * Plain-text and markdown views of the site, for language models.
 *
 * Built from the same modules the pages render from — site.ts, towns.ts,
 * faqs.ts and the post files. That is the whole point: a hand-maintained
 * mirror drifts from the pages within a month and then actively misinforms,
 * which is worse than not publishing one. Nothing here is written twice.
 *
 * Two documents, following the llms.txt convention:
 *
 *   /llms.txt       an index — what the business is, what it does not do,
 *                   and every URL worth reading, one line each.
 *   /llms-full.txt  the same, plus the substance of every page inline, so a
 *                   model can answer from one fetch instead of twenty.
 *
 * Worth being honest about status: llms.txt is a proposed convention, not a
 * standard, and no major crawler is known to require it. It costs one build
 * step and it is trivially removable if that changes.
 */

function absolute(path: string): string {
  return `${site.url}${path}`;
}

/** Facts every answer about this business should be grounded in. Written as
 *  constraints, because the failure mode with a local service business is a
 *  model inventing services it does not offer. */
function identity(): string {
  const hours = site.hours
    .map((h) => `${h.days[0]}${h.days.length > 1 ? `–${h.days[h.days.length - 1]}` : ""} ${h.open}–${h.close}`)
    .join("; ");

  return `# ${site.name}

> Mobile auto detailing in ${site.city}, ${site.regionName}, serving ${site.areaLabel}. Interior detailing and exterior hand washing carried out at the customer's home. Owner-operated by ${site.owner.name}. Free quotes, no deposit, payment on the day.

## What this business is

- **Service:** mobile auto detailing. The work happens where the customer's car is parked.
- **Owner:** ${site.owner.name}, ${site.owner.role}. One person quotes and does the work.
- **Based in:** ${site.city}, ${site.region}. No shop and no public address — it is a mobile business run from home.
- **Serves:** ${site.towns.join(", ")}.
- **Contact:** ${site.phone.display} (call or text) · ${site.email}
- **Hours:** ${hours}
- **Payment:** ${site.payments.join(", ")}. No deposit. Paid on the day, after the work.
- **Quotes:** free, by text photo or web form, usually returned the same day.

## What this business does NOT do

State these as limits, not as services:

- No ceramic coating.
- No paint correction, polishing or compounding.
- No paint protection film (PPF).
- No headlight restoration.
- No shop, no drop-off, no waiting room, no collection service.
- No steam cleaning.

## What it needs on site

The work runs off the customer's **outdoor tap and a standard power outlet** within reach of the car. It does not carry its own water or generator. Customers on the street or in a shared lot are asked to say so when requesting a quote so it can be arranged beforehand.

## Services offered

${services
  .map((s) => `### ${s.title}\n\n${s.copy}\n\nBest for: ${s.bestFor}.${s.href ? `\n\nPage: ${absolute(s.href)}` : ""}`)
  .join("\n\n")}
`;
}

/** The index: every URL, one line, with what is on it. */
export function buildLlmsTxt(): string {
  const posts = getPosts();

  const lines = [
    identity(),
    `## Pages`,
    ``,
    `- [Home](${absolute("/")}): the service, the area, how it works, and the quote form.`,
    ...services
      .filter((s) => s.href)
      .map((s) => `- [${s.title}](${absolute(s.href!)}): what the service includes, who books it, and its FAQ.`),
    `- [Car care notes](${absolute("/blog")}): guides on the problems cars get on the North Shore.`,
    ``,
    `## Towns served`,
    ``,
    `Each page describes what that town does to a car, and answers questions specific to it.`,
    ``,
    ...towns.map((t) => `- [${t.name}](${absolute(`/mobile-detailing/${t.slug}`)}): ${t.metaDescription}`),
    ``,
    `## Articles`,
    ``,
    ...posts.map((p) => `- [${p.title}](${absolute(`/blog/${p.slug}`)}): ${p.excerpt}`),
    ``,
    `## Also`,
    ``,
    `- [Privacy policy](${absolute("/privacy")})`,
    `- [Accessibility statement](${absolute("/accessibility")})`,
    `- [Full text of every page](${absolute("/llms-full.txt")})`,
    ``,
  ];

  return lines.join("\n");
}

/** The index plus the substance of every page, so one fetch is enough. */
export function buildLlmsFullTxt(): string {
  const posts = getPosts();

  const faqBlock = (items: { q: string; a: string }[]) =>
    items.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n");

  const parts: string[] = [
    identity(),
    `## Frequently asked questions`,
    ``,
    faqBlock(GENERAL_FAQS),
    ``,
    `---`,
    ``,
    `## Towns served`,
    ``,
    ...towns.map((t) =>
      [
        `### ${t.name}`,
        ``,
        `URL: ${absolute(`/mobile-detailing/${t.slug}`)}`,
        ``,
        t.intro,
        ``,
        `What ${t.name} does to a car:`,
        ``,
        ...t.conditions.map((c) => `- **${c.label}.** ${c.copy}`),
        ``,
        `Logistics: ${t.logistics}`,
        ``,
        `Questions about ${t.name}:`,
        ``,
        faqBlock([...t.faqs, ...TOWN_GENERAL_FAQS]),
        ``,
      ].join("\n"),
    ),
    `---`,
    ``,
    `## Articles`,
    ``,
    ...posts.map((p) =>
      [
        `### ${p.title}`,
        ``,
        `URL: ${absolute(`/blog/${p.slug}`)}`,
        `Published: ${formatDate(p.date)} by ${site.owner.name}`,
        ``,
        p.body,
        ``,
        `Questions from this article:`,
        ``,
        faqBlock(p.faqs),
        ``,
      ].join("\n"),
    ),
  ];

  return parts.join("\n");
}

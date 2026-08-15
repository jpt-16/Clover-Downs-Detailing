/**
 * Single source of truth for every business fact on the site.
 * Change it here, it changes on the page, in the footer, in the privacy
 * policy, and in the structured data Google reads.
 */

/**
 * Canonical origin, resolved at build time in this order:
 *
 *  1. SITE_URL — set this once a real domain is connected. It wins over
 *     everything, so the canonical tags keep pointing at the domain you own
 *     rather than the vercel.app address that also serves the site.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel on every deployment
 *     and always the *production* domain, even when read from a preview
 *     build. That is what canonical tags and the sitemap want; pointing them
 *     at a preview URL would have Google index throwaway deployments.
 *  3. localhost, for `next dev`.
 *
 * Only ever read on the server (metadata, sitemap, robots, structured data),
 * so none of these names need a NEXT_PUBLIC_ prefix.
 */
function resolveUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const site = {
  name: "Clover Downs Detailing",
  shortName: "Clover Downs",
  tagline: "Cleaner. Shinier. Better.",
  description:
    "Mobile auto detailing in Beverly, MA and the North Shore. Interior details and exterior hand washes done in your driveway — free quotes by phone, text, or online.",

  /** See resolveUrl above. Set SITE_URL in Vercel when a domain is connected. */
  url: resolveUrl(),

  phone: {
    display: "(585) 623-0256",
    // E.164, used for tel:/sms: links and structured data
    e164: "+15856230256",
  },

  // Used for privacy requests, the footer, structured data, and as the
  // FormSubmit delivery address — quote requests land in this inbox.
  email: "cloverdownsdetail@gmail.com",

  city: "Beverly",
  region: "MA",
  regionName: "Massachusetts",
  areaLabel: "Beverly & the North Shore",

  towns: [
    "Beverly",
    "Beverly Farms",
    "Danvers",
    "Salem",
    "Peabody",
    "Wenham",
    "Hamilton",
    "Manchester-by-the-Sea",
  ],

  // Approximate centre of the service area, for LocalBusiness structured data.
  geo: { lat: 42.5584, lng: -70.88 },
  serviceRadiusMeters: 24000, // ~15 miles

  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "08:00", close: "18:00" },
    { days: ["Saturday"], open: "08:00", close: "16:00" },
  ],

  // No card processing — everything here settles person to person on the day.
  payments: ["Cash", "Check", "Zelle", "Venmo", "Cash App"],

  // Add profile URLs as you create them; the footer renders whatever is here.
  social: [] as { label: string; href: string }[],

  /** Build credit shown in the footer. */
  credit: { label: "JT Builds Co", href: "https://jtbuildsco.com" },
} as const;

export const telHref = `tel:${site.phone.e164}`;
export const smsHref = `sms:${site.phone.e164}`;

/**
 * FormSubmit target. Works with no setup at all — posting to the business
 * email address is enough, and FormSubmit emails a one-time activation link
 * on the first submission.
 *
 * Once activated, FormSubmit issues a random alias for that address. Put it
 * in NEXT_PUBLIC_FORMSUBMIT_ALIAS and it is used instead, which keeps the
 * inbox address out of the JavaScript bundle where scrapers can read it.
 */
const FORMSUBMIT_ALIAS = process.env.NEXT_PUBLIC_FORMSUBMIT_ALIAS ?? "";

export const FORMSUBMIT_TARGET = (FORMSUBMIT_ALIAS || site.email).trim();

// Interpolated rather than encodeURIComponent'd on purpose: "@" is legal in a
// URL path segment, and FormSubmit's documented endpoint uses it literally.
// Percent-encoding it to %40 risks their routing not matching.
export const FORMSUBMIT_ENDPOINT = FORMSUBMIT_TARGET
  ? `https://formsubmit.co/ajax/${FORMSUBMIT_TARGET}`
  : "";

export const services = [
  {
    numeral: "I",
    id: "interior",
    title: "Full interior detail",
    copy: "Seats and carpets extracted, hard surfaces cleaned down, vents and jambs cleaned out, glass finished streak-free. Pet hair and set-in spills are normal work, not an upcharge surprise.",
    chips: ["Carpet extraction", "Interior surfaces", "Pet hair", "Odor"],
  },
  {
    numeral: "II",
    id: "exterior",
    title: "Exterior hand wash",
    copy: "Two buckets, clean mitts, wheels and wells first, bugs and tar off, then dried with plush towels and dressed tires. Nothing abrasive ever touches the paint.",
    chips: ["Hand wash", "Wheels", "Tar + bugs", "Towel dry"],
  },
  {
    numeral: "III",
    id: "both",
    title: "Both, one visit",
    copy: "The full reset. Most customers book this once or twice a season and keep it topped up with washes in between.",
    chips: [],
  },
] as const;

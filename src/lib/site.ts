/**
 * Single source of truth for every business fact on the site.
 * Change it here, it changes on the page, in the footer, in the privacy
 * policy, and in the structured data Google reads.
 */

export const site = {
  name: "Clover Downs Detailing",
  shortName: "Clover Downs",
  tagline: "Cleaner. Shinier. Better.",
  description:
    "Mobile auto detailing in Beverly, MA and the North Shore. Interior details and exterior hand washes done in your driveway — we bring our own water and power.",

  // TODO: swap to the real domain once it is connected in Vercel.
  url: "https://clover-downs-detailing.vercel.app",

  phone: {
    display: "(585) 623-0256",
    // E.164, used for tel:/sms: links and structured data
    e164: "+15856230256",
  },

  // Used for privacy requests, the footer, and structured data. This should
  // also be the address the Web3Forms access key is registered to, so quote
  // requests land in the same inbox.
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
} as const;

export const telHref = `tel:${site.phone.e164}`;
export const smsHref = `sms:${site.phone.e164}`;

/** Web3Forms access key. Public by design — it only permits posting to your form. */
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export const services = [
  {
    numeral: "I",
    id: "interior",
    title: "Full interior detail",
    copy: "Seats and carpets extracted, hard surfaces steamed, vents and jambs cleaned out, glass finished streak-free. Pet hair and set-in spills are normal work, not an upcharge surprise.",
    chips: ["Carpet extraction", "Steam", "Pet hair", "Odor"],
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

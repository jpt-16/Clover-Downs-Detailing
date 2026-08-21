import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { towns } from "@/lib/towns";

/**
 * When each page's content last actually changed — bumped by hand, on the
 * commit that changes it.
 *
 * These were `new Date()`, which meant every deploy told Google that both
 * pages had just changed, including deploys that touched neither. A lastmod
 * that is always "now" carries no information, and a crawler that learns to
 * distrust it stops using it to schedule recrawls at all.
 */
const LAST_MODIFIED = {
  home: new Date("2026-08-20"),
  privacy: new Date("2026-08-14"),
  towns: new Date("2026-08-21"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: LAST_MODIFIED.home, changeFrequency: "monthly", priority: 1 },
    // Below the homepage but well above the privacy policy: these are the
    // pages meant to rank for "mobile detailing <town>" searches.
    ...towns.map((town) => ({
      url: `${site.url}/mobile-detailing/${town.slug}`,
      lastModified: LAST_MODIFIED.towns,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/privacy`,
      lastModified: LAST_MODIFIED.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

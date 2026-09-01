import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { towns } from "@/lib/towns";
import { getPosts } from "@/lib/blog";

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
  accessibility: new Date("2026-08-23"),
  towns: new Date("2026-08-21"),
  services: new Date("2026-08-31"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    { url: site.url, lastModified: LAST_MODIFIED.home, changeFrequency: "monthly", priority: 1 },
    // Below the homepage but well above the privacy policy: these are the
    // pages meant to rank for "mobile detailing <town>" searches.
    // Service pages sit with the town pages in priority: together they are
    // the two axes people actually search on — what, and where.
    ...(["interior-car-detailing", "exterior-hand-wash"] as const).map((slug) => ({
      url: `${site.url}/${slug}`,
      lastModified: LAST_MODIFIED.services,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...towns.map((town) => ({
      url: `${site.url}/mobile-detailing/${town.slug}`,
      lastModified: LAST_MODIFIED.towns,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Blog index, then each post at its own lastmod. Both come from the files
    // in content/blog, so publishing a post updates the sitemap with no edit
    // here.
    ...(posts.length > 0
      ? [
          {
            url: `${site.url}/blog`,
            lastModified: new Date(posts[0].updated),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}/privacy`,
      lastModified: LAST_MODIFIED.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/accessibility`,
      lastModified: LAST_MODIFIED.accessibility,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

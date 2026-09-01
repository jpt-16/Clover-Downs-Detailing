import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog content, read from disk at build time.
 *
 * Publishing a post is dropping a file into content/blog. Nothing else — no
 * index to update, no route to add, no sitemap edit. `generateStaticParams`
 * below reads this directory, so the new URL, the index card, the sitemap
 * entry and the schema all follow from the file itself.
 *
 * This module touches the filesystem, so it is server-only by construction:
 * importing it from a Client Component is a build error rather than a silent
 * bundle bloat.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/** One question and answer. Lives in frontmatter, not in the body prose, so
 *  the rendered FAQ block and the FAQPage markup read the same source and
 *  cannot drift apart. */
export type PostFaq = { q: string; a: string };

export type Post = {
  slug: string;
  /** Page H1, and the card title on the index. */
  title: string;
  /** <title>. Falls back to `title` when frontmatter omits it. */
  seoTitle: string;
  metaDescription: string;
  /** ISO date, used for the byline, ordering, and datePublished. */
  date: string;
  /** Last substantive edit. Defaults to `date`. */
  updated: string;
  /** Card copy on the index. */
  excerpt: string;
  /** Card image. `null` renders the same labelled placeholder the gallery
   *  uses, rather than a broken or borrowed image. */
  image: string | null;
  imageAlt: string;
  /** Shown in the placeholder tile while `image` is null, so an unshot card
   *  says what belongs there rather than looking broken. */
  imageHint: string;
  faqs: PostFaq[];
  /** Markdown body, frontmatter stripped. */
  body: string;
};

/**
 * YAML parses an unquoted `2026-08-31` into a Date, not a string, so this
 * normalises both forms back to `YYYY-MM-DD`. Without it the value reaching
 * datePublished is a JS date string, which is not what schema.org expects.
 */
function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").trim().slice(0, 10);
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const title = String(data.title ?? "").trim();
  if (!title) throw new Error(`content/blog/${fileName}: frontmatter is missing "title"`);

  const date = isoDate(data.date);
  if (!date) throw new Error(`content/blog/${fileName}: frontmatter is missing "date"`);

  const faqs: PostFaq[] = Array.isArray(data.faqs)
    ? data.faqs.map((f: { q?: string; a?: string }) => ({ q: String(f.q ?? ""), a: String(f.a ?? "") }))
    : [];

  return {
    slug: String(data.slug ?? slug),
    title,
    seoTitle: String(data.seo_title ?? title),
    metaDescription: String(data.meta_description ?? ""),
    date,
    updated: data.updated ? isoDate(data.updated) : date,
    excerpt: String(data.excerpt ?? ""),
    image: data.image ? String(data.image) : null,
    imageAlt: String(data.image_alt ?? ""),
    imageHint: String(data.image_hint ?? "Card image"),
    faqs,
    body: content.trim(),
  };
}

/** Newest first. */
export function getPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** "31 August 2026" — spelled out, to match the site's plain register. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

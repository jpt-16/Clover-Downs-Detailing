import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Markdown } from "@/components/Markdown";
import { Faq } from "@/components/Faq";
import { ArrowRight } from "@/components/Icons";
import { site, smsHref } from "@/lib/site";
import { getPost, getPosts, formatDate, type Post } from "@/lib/blog";

/** Every post is a file on disk, so all of them are static. */
export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    // The drafts' seo_title values are already complete and keyword-targeted
    // ("... | North Shore MA"). Appending the brand on top pushed these to
    // 72-81 characters, past what Google shows, so they are used as authored.
    title: { absolute: post.seoTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: post.title,
      description: post.metaDescription,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated,
      locale: "en_US",
    },
  };
}

/**
 * Article, FAQPage and BreadcrumbList for one post.
 *
 * `publisher` and the author's `worksFor` point at the business by @id rather
 * than repeating it, so there is one business entity across the site instead
 * of a second copy per page.
 *
 * The FAQ entries come from the same frontmatter array the visible block
 * renders, which is what stops the markup and the page saying different
 * things — the failure mode Google penalises.
 */
function PostSchema({ post }: { post: Post }) {
  const url = `${site.url}/blog/${post.slug}`;
  const businessId = `${site.url}/#business`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      inLanguage: "en-US",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: {
        "@type": "Person",
        name: site.owner.name,
        jobTitle: "Owner and Operator",
        worksFor: { "@id": businessId },
      },
      publisher: { "@id": businessId },
      datePublished: post.date,
      dateModified: post.updated,
      spatialCoverage: { "@type": "Place", name: "North Shore, Massachusetts" },
      ...(post.image ? { image: `${site.url}${post.image}` } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getPosts().filter((p) => p.slug !== post.slug);

  return (
    <>
      <PostSchema post={post} />

      {/* ── Header ───────────────────────────────────────────────────── */}
      <article className="border-b border-rule px-6 pt-28 pb-16 sm:px-10 lg:px-14 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal className="flex flex-col gap-6">
            <Link href="/blog" className="label transition-colors hover:text-leaf">
              ← All posts
            </Link>
            <h1 className="max-w-[20ch] text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.0] font-light tracking-[-0.04em]">
              {post.title}
            </h1>
            <p className="text-[0.6875rem] tracking-[0.2em] text-dim uppercase">
              {formatDate(post.date)} · {site.owner.name}, {site.shortName}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <Markdown>{post.body}</Markdown>
          </Reveal>
        </div>
      </article>

      <Faq items={post.faqs} heading="Questions people ask" />

      {/* ── Next steps ───────────────────────────────────────────────── */}
      <section className="border-b border-rule px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="flex flex-col gap-6">
          <span className="label">What we do</span>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/interior-car-detailing" className="group border-t border-rule pt-5">
              <h2 className="text-lg font-normal tracking-[-0.02em] underline underline-offset-4 transition-colors group-hover:text-leaf">
                Full interior detail
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-dim">
                Extraction, pet hair, odor at the source. Done in your driveway.
              </p>
            </Link>
            <Link href="/exterior-hand-wash" className="group border-t border-rule pt-5">
              <h2 className="text-lg font-normal tracking-[-0.02em] underline underline-offset-4 transition-colors group-hover:text-leaf">
                Exterior hand wash
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-dim">
                Two buckets, wheels first, hand-dried. Optional hand wax.
              </p>
            </Link>
          </div>
          <div className="flex flex-col items-stretch gap-3 pt-4 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/#quote" className="btn-primary px-8 py-4 text-sm">
              GET A FREE QUOTE
            </Link>
            <a href={smsHref} className="btn-secondary px-8 py-4 text-sm">
              TEXT A PHOTO
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── More posts ───────────────────────────────────────────────── */}
      {others.length > 0 && (
        <section className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
          <Reveal className="flex flex-col gap-6">
            <span className="label">Read next</span>
            <ul className="flex flex-col">
              {others.map((other, i) => (
                <li key={other.slug} className={`border-t border-rule py-6 ${i === others.length - 1 ? "border-b" : ""}`}>
                  <Link href={`/blog/${other.slug}`} className="group flex flex-col gap-2">
                    <span className="max-w-[46ch] text-xl font-normal tracking-[-0.02em] underline underline-offset-4 transition-colors group-hover:text-leaf">
                      {other.title}
                    </span>
                    <span className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-dim">{other.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/PhotoSlot";
import { site } from "@/lib/site";
import { getPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: `Car Care Notes — ${site.areaLabel} | ${site.name}` },
  description:
    "Straight answers on keeping a car clean on the North Shore — dog hair, road salt, beach sand, and what detailing actually gets you.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Car Care Notes — ${site.areaLabel}`,
    description: "Dog hair, road salt, beach sand, and what detailing actually gets you.",
    url: `${site.url}/blog`,
    locale: "en_US",
  },
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <section className="border-b border-rule px-6 pt-28 pb-16 sm:px-10 lg:px-14 lg:pt-32 lg:pb-20">
        <div className="flex max-w-[760px] flex-col gap-6 lg:gap-7">
          <Reveal className="flex flex-col gap-6 lg:gap-7">
            <span className="eyebrow text-balance">Notes — {site.areaLabel}</span>
            <Reveal
              as="h1"
              delay={100}
              className="block max-w-[16ch] text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.98] font-light tracking-[-0.04em]"
            >
              Car care, written down.
            </Reveal>
          </Reveal>
          <Reveal as="p" delay={200} className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-soft">
            What actually works on the problems cars get around here — dog hair, road salt, beach sand — including the
            parts you can do yourself without paying anyone.
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        {posts.length === 0 ? (
          <p className="text-[1rem] text-dim">Nothing published yet.</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Bordered cards rather than the gap-px/bg-rule trick used
                elsewhere: that fills unused grid cells with the rule colour, so
                any post count that is not an exact multiple of the column count
                leaves a large block of it on the last row. */}
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 90} className="border border-rule bg-ink">
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col gap-5 p-6 sm:p-8">
                  <div className="relative aspect-[3/2] w-full overflow-hidden border border-rule">
                    <PhotoSlot
                      photo={{ src: post.image, alt: post.imageAlt, hint: post.imageHint }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <span className="text-[0.6875rem] tracking-[0.2em] text-dim uppercase">{formatDate(post.date)}</span>
                  <h2 className="max-w-[24ch] text-xl font-normal tracking-[-0.02em] transition-colors group-hover:text-leaf sm:text-[1.375rem]">
                    {post.title}
                  </h2>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

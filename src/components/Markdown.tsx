import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders a post body.
 *
 * This is a Server Component with no "use client" anywhere in its import
 * chain, so react-markdown and the remark stack run during the build and the
 * output is plain HTML. None of it reaches the browser.
 *
 * Every element is mapped explicitly rather than styled through a prose
 * plugin, so post typography uses the same tokens as the rest of the site.
 */

/** Images become next/image. A raw <img> from markdown would skip resizing,
 *  modern formats and lazy loading on every post. Markdown gives no
 *  dimensions, so these use fill inside a fixed-ratio figure. */
function MarkdownImage({ src, alt }: { src?: string | Blob; alt?: string }) {
  if (typeof src !== "string" || !src) return null;
  return (
    <figure className="my-10">
      <div className="relative aspect-[3/2] w-full overflow-hidden border border-rule">
        <Image src={src} alt={alt ?? ""} fill sizes="(max-width: 768px) 100vw, 760px" className="object-cover" />
      </div>
      {alt && <figcaption className="mt-3 text-[0.8125rem] text-dim">{alt}</figcaption>}
    </figure>
  );
}

/** Internal links route through next/link; external ones get rel guards. */
function MarkdownLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  const target = href ?? "#";
  const internal = target.startsWith("/") || target.startsWith("#");
  const className = "text-leaf underline underline-offset-4";

  if (internal) {
    return (
      <Link href={target} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={target} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="flex flex-col text-[1.0625rem] leading-[1.75] text-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: MarkdownImage,
          a: MarkdownLink,
          h2: ({ children }) => (
            <h2 className="mt-14 mb-4 max-w-[24ch] text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] font-light tracking-[-0.03em] text-bone">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 mb-3 text-xl font-normal tracking-[-0.02em] text-bone sm:text-[1.375rem]">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-5 max-w-[68ch]">{children}</p>,
          strong: ({ children }) => <strong className="font-normal text-bone">{children}</strong>,
          ul: ({ children }) => (
            <ul className="mb-6 flex max-w-[68ch] list-disc flex-col gap-2 pl-5 marker:text-rule-strong">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 flex max-w-[68ch] list-decimal flex-col gap-2 pl-5 marker:text-dim">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mb-6 border-l border-leaf/40 pl-6 text-bone">{children}</blockquote>
          ),
          hr: () => <hr className="my-12 border-0 border-t border-rule" />,
          /* Tables scroll inside their own container rather than pushing the
             page sideways on a phone. */
          table: ({ children }) => (
            <div className="mb-8 overflow-x-auto border border-rule">
              <table className="w-full border-collapse text-left text-[0.9375rem]">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-rule-strong">{children}</thead>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-[0.6875rem] font-medium tracking-[0.14em] text-leaf uppercase">{children}</th>
          ),
          td: ({ children }) => <td className="border-t border-rule px-4 py-3 align-top">{children}</td>,
          code: ({ children }) => (
            <code className="border border-rule-strong bg-ink-raised px-1.5 py-0.5 text-[0.875rem] text-bone">
              {children}
            </code>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

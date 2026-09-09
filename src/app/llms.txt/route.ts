import { buildLlmsTxt } from "@/lib/llms";

/** Generated at build time from the same data the pages render from. */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      // text/plain so it opens in a browser rather than downloading; the
      // body is markdown, which is what the convention asks for.
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

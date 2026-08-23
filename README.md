# Clover Downs Detailing

Marketing site for Clover Downs Detailing — mobile auto detailing in Beverly, MA
and the North Shore.

Built from the **1B "Minimal Dark"** landing concept: near-black ground
(`#0b0c0b`), leaf-green accent (`#7cc576`), light-weight Archivo, hairline
rules, no rounded corners anywhere.

- **Framework** — Next.js 16 (App Router) + TypeScript
- **Styling** — Tailwind CSS v4, tokens defined in `src/app/globals.css`
- **Forms** — FormSubmit (no account, no API key)
- **Host** — Vercel

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## The three things you need to finish

### 1. Activate the quote form

The form posts to [FormSubmit](https://formsubmit.co), which needs **no
account and no API key** — it delivers to the address in `site.email`
(`cloverdownsdetail@gmail.com`). There is nothing to configure in Vercel.

There is exactly one step, and it only happens once:

1. Submit the form on the live site.
2. FormSubmit emails `cloverdownsdetail@gmail.com` a confirmation link. Click
   it.
3. Submit once more. That one arrives as a normal lead, and every submission
   after it does too.

**Until that link is clicked, submissions are not delivered.** The form still
reports success on the site — FormSubmit accepts the post either way — so do
the activation before sending anyone to the page. Check spam for the
confirmation.

#### Optional: hide the inbox address

The email address is currently visible in the page's JavaScript, where
address scrapers can read it. It is already published in the footer and the
privacy policy, so this is a small exposure, but FormSubmit can remove it:
after activating, they give you a random alias for the address. Put it in
Vercel under **Settings → Environment Variables**:

```
NEXT_PUBLIC_FORMSUBMIT_ALIAS = your-alias-here
```

then **redeploy** — `NEXT_PUBLIC_` variables are baked into the JavaScript at
build time, not read on page load, so an existing deployment will not pick it
up. The code prefers the alias whenever one is set and falls back to the
plain address otherwise, so nothing breaks if you skip this.

Locally, the same line goes in `.env.local` (see `.env.example`); restart
`npm run dev` afterwards.

### 2. Fill the remaining photo slots

Two real before/after pairs and the hero are in. Still open: a **landscape**
hero shot and an exterior before/after.
See [`public/photos/README.md`](public/photos/README.md) — it also explains
when a pair can use the drag-to-compare slider instead of side by side.

### 3. Add reviews as they come in

`TESTIMONIALS` at the top of `src/app/page.tsx` holds the real ones. Add new
entries to the front of the list so the newest shows first:

```ts
{ quote: "…", who: "Nathan", rating: 5, source: "Google" }
```

`rating` and `source` are both optional. The carousel's arrows appear on their
own once there is more than one review, and the whole block disappears if the
list is emptied — so the site never shows invented social proof.

Use the reviewer's first name rather than their full name, and only quote
reviews the customer left publicly.

## Deploying

A Vercel project named **clover-downs-detailing** is created and linked to this
repository, with `claude/clover-downs-detailing-site-emgvag` set as the
production branch (it was the only branch at the time). Pushing to that branch
builds and deploys it.

When you merge this into a `main` branch, change the production branch in
**Project → Settings → Git** so `main` becomes production.

Check build status at
[vercel.com/jacob-twohig-s-projects/clover-downs-detailing](https://vercel.com/jacob-twohig-s-projects/clover-downs-detailing).

## Where things live

| I want to change… | Edit |
| --- | --- |
| Phone, towns, hours, business facts | `src/lib/site.ts` |
| Service names and descriptions | `src/lib/site.ts` (`services`) |
| Colours, type scale, spacing tokens | `src/app/globals.css` |
| Photos | `src/lib/photos.ts` |
| Reviews | `src/app/page.tsx` (`TESTIMONIALS`) |
| Review carousel behaviour | `src/components/Testimonials.tsx` |
| Instagram / social links | `src/lib/site.ts` (`social`) |
| Trust bar, How it works steps | `src/app/page.tsx` (`TRUST`, `STEPS`) |
| Privacy policy wording | `src/app/privacy/page.tsx` |
| Logo artwork | `src/components/Logo.tsx` |
| Favicons | `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` |
| Sticky mobile Book Now bar | `src/components/MobileBookBar.tsx` |
| Social share card | `src/app/opengraph-image.tsx` |

The three favicon files are generated from `src/app/icon.svg` — if the mark
changes, re-export `favicon.ico` (32px) and `apple-icon.png` (180px) from it
rather than editing them by hand.

Adding a profile to `social` lights it up in four places at once: the header
glyph, the mobile menu, the footer, and the Instagram call-to-action under the
before/after gallery. Remove the entry and all four disappear cleanly rather
than leaving dead links.

`src/lib/site.ts` is the single source of truth — the phone number, towns, and
hours you set there flow into the page copy, the footer, the privacy policy,
and the `AutoDetailing` structured data Google reads.

## The domain

The site is live at **https://www.cloverdownsdetailing.com**. The bare
`cloverdownsdetailing.com` redirects to the `www` version, so `www` is the
canonical origin — that is the address to use in Search Console, in ads, and
anywhere the URL is written down.

Nothing had to change in the code for this. The canonical origin resolves
itself at build time:

1. **`SITE_URL`** if set — an explicit override.
2. Otherwise **`VERCEL_PROJECT_PRODUCTION_URL`**, which Vercel injects into
   every build automatically.
3. Otherwise `http://localhost:3000`, for `npm run dev`.

Step 2 is what is running today. Once a custom domain is assigned as the
project's production domain, Vercel's variable *becomes* that domain — so the
canonical tags, sitemap, and share links all switched from the `.vercel.app`
address to `www.cloverdownsdetailing.com` on their own, with no variable set
and no code change. Verified live: the canonical tag and both sitemap entries
read `https://www.cloverdownsdetailing.com`.

**So leave `SITE_URL` unset.** It exists for the case where the canonical
origin must differ from Vercel's production domain — a reverse proxy, or a
migration in progress. Setting it to a wrong or stale value is the main way
this breaks, since it silently overrides a correct answer.

Note that step 2 always resolves to the *production* domain even when read
from a preview build — preview URLs must never end up in canonical tags or the
sitemap, or throwaway deployments get indexed.


## Google Search Console

Search Console is what tells you whether Google has actually indexed the site,
and which searches are finding it.

**The site is already verified**, so none of the setup below needs doing again
— it is kept as a record of how, and for the day a second property is needed.

Two things are worth knowing about the property that exists:

- **It must cover `www.cloverdownsdetailing.com`.** That is where everything
  canonicalises, since the bare domain redirects to `www`. A **Domain**
  property (the DNS method) covers `www`, the bare domain, and every
  subdomain at once, so it is the one that cannot go wrong. A **URL prefix**
  property covers one exact origin only — a URL-prefix property for
  `https://cloverdownsdetailing.com` is a *different* property from the `www`
  one, and would report almost nothing, because traffic all redirects away
  from it.
- **Whatever proved ownership has to stay in place**, or Google un-verifies
  the site. A DNS TXT record is safe as long as nobody prunes it while tidying
  up records. Verification by Google Analytics or Tag Manager breaks the day
  that tag is removed.

### After verifying

Submit the sitemap: in Search Console go to **Sitemaps** and enter
`sitemap.xml`. It is generated by `src/app/sitemap.ts` and already listed in
`robots.txt`, so there is nothing to build — it just needs pointing at. Expect
empty reports for a few days; Search Console starts blank and backfills slowly
even when everything is correct.

### Verifying another property later

Two methods work with this codebase, and you only need one.

#### Option A — the HTML file

1. In Search Console, add a **URL prefix** property for the site's address.
2. Choose **HTML file** verification. Google gives you a file named something
   like `google1a2b3c4d5e6f.html`.
3. Drop that file, unrenamed, into **`public/`**. Anything in `public/` is
   served from the site root, so it lands at `/google1a2b3c4d5e6f.html` —
   exactly where Google looks.
4. Commit, push, wait for the deploy to finish, then click **Verify**.

#### Option B — the meta tag

Choose **HTML tag** verification instead and Google shows you a `<meta>` tag.
Copy only the `content="..."` value, not the whole tag, and set it in Vercel
under **Settings → Environment Variables**:

```
GOOGLE_SITE_VERIFICATION = the-long-string-google-gave-you
```

Then **redeploy** — metadata is generated at build time, so an existing
deployment will not pick it up. Leave the variable unset and no tag is emitted,
which is the current state.

## Accessibility notes

Worth preserving if you edit the design:

- Body and label colours were picked to clear WCAG AA on `#0b0c0b`. `--color-dim`
  (`#8e948b`) is the dimmest text used — it lands at 6.3:1. Do not go dimmer for
  anything a customer needs to read.
- The before/after sliders are `<input type="range">` under the artwork, so they
  work with touch, mouse, arrow keys, and screen readers.
- Scroll-reveal hides elements only when JavaScript is present, and is disabled
  entirely under `prefers-reduced-motion`. The page is fully readable with
  JavaScript off.
- Every interactive element gets the same green focus ring. **Never add
  `focus:outline-none`** — a border colour change on its own is a 1px cue and
  weaker than the ring everything else gets.
- **Inline links in body text stay underlined**, not `hover:underline`. Green
  on grey is only 1.49:1 against the surrounding text, well under the 3:1
  WCAG needs, so colour alone cannot be what marks a link.
- New photos need real alt text describing *what the picture shows*, in the
  style of the existing ones in `src/lib/photos.ts`.

### Audit status

Audited with axe-core (WCAG 2.0/2.1 A + AA + best-practice) across the home,
privacy, and town pages at desktop and mobile widths: **0 violations**. Also
checked by hand: keyboard reachability of all 45 focus stops, a visible focus
ring on every one, heading order (single `h1`, no skipped levels), no
horizontal overflow at 200% zoom or 400% reflow, and reduced-motion honoured.

Automated tools catch roughly a third of WCAG issues, so this is a floor, not
a certificate. Re-run the audit after any change to the form, the carousel, or
the before/after components.

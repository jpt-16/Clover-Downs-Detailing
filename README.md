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
hero shot, a portrait for the About section, and an exterior before/after.
See [`public/photos/README.md`](public/photos/README.md) — it also explains
when a pair can use the drag-to-compare slider instead of side by side.

### 3. Add reviews when they exist

`TESTIMONIALS` at the top of `src/app/page.tsx` is deliberately empty, and the
whole testimonials block renders nothing while it stays that way — the site
shows no invented social proof. Add two real entries and the section returns
on its own.

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
| Privacy policy wording | `src/app/privacy/page.tsx` |
| Logo artwork | `src/components/Logo.tsx`, `src/app/icon.svg` |
| Social share card | `src/app/opengraph-image.tsx` |

`src/lib/site.ts` is the single source of truth — the phone number, towns, and
hours you set there flow into the page copy, the footer, the privacy policy,
and the `AutoDetailing` structured data Google reads.

## Connecting a real domain

Nothing to change in the code. The site's canonical origin resolves itself at
build time:

1. **`SITE_URL`** if set — use this once a domain is connected.
2. Otherwise **`VERCEL_PROJECT_PRODUCTION_URL`**, which Vercel injects into
   every build automatically. This is why the deployed site already has
   correct canonical tags, sitemap, and share-card links with no setup.
3. Otherwise `http://localhost:3000`, for `npm run dev`.

So when you point a domain at the project, add one variable in Vercel under
**Settings → Environment Variables** and redeploy:

```
SITE_URL = https://yourdomain.com
```

Setting it explicitly matters because step 2 would otherwise keep advertising
the `.vercel.app` address as canonical, and Google would index that instead of
the domain you own.

Note that step 2 always resolves to the *production* domain even when read
from a preview build — preview URLs must never end up in canonical tags or the
sitemap, or throwaway deployments get indexed.


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
- Every interactive element gets the same green focus ring.

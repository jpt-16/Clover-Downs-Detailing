# Clover Downs Detailing

Marketing site for Clover Downs Detailing — mobile auto detailing in Beverly, MA
and the North Shore.

Built from the **1B "Minimal Dark"** landing concept: near-black ground
(`#0b0c0b`), leaf-green accent (`#7cc576`), light-weight Archivo, hairline
rules, no rounded corners anywhere.

- **Framework** — Next.js 16 (App Router) + TypeScript
- **Styling** — Tailwind CSS v4, tokens defined in `src/app/globals.css`
- **Forms** — Web3Forms
- **Host** — Vercel

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## The three things you need to finish

### 1. Turn the quote form on

The form is built and tested but needs an access key before it can deliver.

1. Go to [web3forms.com](https://web3forms.com), enter the email address where
   you want leads to land, and copy the access key they send you.
2. In Vercel: **Project → Settings → Environment Variables**, add

   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = your-key-here
   ```

   for Production, Preview, and Development.
3. Redeploy.

Locally, put the same line in `.env.local` (see `.env.example`).

The key is public by design — it only permits posting to your own form, so it
is safe in client-side code. Until it is set, the form shows a notice and the
call/text buttons still work.

### 2. Add your photos

See [`public/photos/README.md`](public/photos/README.md). Short version: drop
files in `public/photos/`, then point `src/lib/photos.ts` at them and write a
real `alt` for each. Empty slots render a labelled placeholder, so the layout
never breaks while you are still shooting.

### 3. Replace the placeholder reviews

`TESTIMONIALS` at the top of `src/app/page.tsx`. Two real ones beat six
invented ones.

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

## One `TODO` left in `src/lib/site.ts`

- `url` — set to the real domain once one is connected, so canonical URLs,
  the sitemap, and the share card point at the right place.

Register the Web3Forms access key to `cloverdownsdetail@gmail.com`, the same
address in `site.email`, so quote requests and direct emails land together.

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

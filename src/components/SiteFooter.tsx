import Link from "next/link";
import { CloverMark } from "./Logo";
import { site, telHref, smsHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-16 lg:px-14">
        <div className="flex items-start gap-4">
          <CloverMark className="h-14 w-14 shrink-0" />
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.28em] text-bone">CLOVER DOWNS</p>
            <p className="mt-1.5 text-[0.5625rem] tracking-[0.34em] text-dim uppercase">Detailing</p>
            <p className="mt-4 text-[0.6875rem] tracking-[0.2em] text-leaf uppercase">{site.tagline}</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="label mb-4">Service area</p>
            <p className="max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">{site.towns.join(" · ")}</p>
          </div>
          <div>
            <p className="label mb-4">Payment</p>
            <p className="max-w-[30ch] text-[0.875rem] leading-relaxed text-muted">{site.payments.join(" · ")}</p>
            <p className="label mt-8 mb-4">Site</p>
            <ul className="flex flex-col gap-2.5 text-[0.875rem] text-muted">
              <li>
                <Link href="/#services" className="transition-colors hover:text-leaf">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#work" className="transition-colors hover:text-leaf">
                  Before &amp; after
                </Link>
              </li>
              <li>
                <Link href="/#quote" className="transition-colors hover:text-leaf">
                  Get a quote
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-leaf">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="label mb-1">Get in touch</p>
          <a href={telHref} className="text-xl font-light tracking-[-0.01em] text-bone transition-colors hover:text-leaf">
            {site.phone.display}
          </a>
          <a href={smsHref} className="text-[0.875rem] text-muted transition-colors hover:text-leaf">
            Text us a photo of your car
          </a>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="text-[0.875rem] break-all text-muted transition-colors hover:text-leaf"
            >
              {site.email}
            </a>
          )}
          {site.social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-[0.875rem] text-muted transition-colors hover:text-leaf"
              rel="noopener noreferrer"
              target="_blank"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule px-6 py-7 text-[0.6875rem] tracking-[0.2em] text-dim uppercase sm:px-10 lg:px-14">
        <span>
          &copy; {new Date().getFullYear()} {site.name}
        </span>
        <span>
          Mobile detailing — {site.city}, {site.region}
        </span>
        <Link href="/privacy" className="transition-colors hover:text-leaf">
          Privacy
        </Link>
      </div>
    </footer>
  );
}

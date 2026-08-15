"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { InstagramGlyph } from "./Icons";
import { site, telHref } from "@/lib/site";

// "Get a quote" is deliberately absent — it is the CTA button beside the nav,
// not a link buried in a row of six identical ones.
const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#how", label: "How it works" },
  { href: "/#about", label: "About" },
  { href: "/#area", label: "Area" },
];

const instagram = site.social.find((s) => s.label === "Instagram");

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-rule bg-ink/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-14">
        <Link href="/" aria-label={`${site.name} — home`}>
          <LogoLockup />
        </Link>

        {/* 2xl, not xl: at 1280 the nav now also carries a glyph, the phone
            number, and the CTA button, and this tagline was the thing pushing
            that row into a second line. */}
        <span className="label hidden 2xl:block">
          Mobile Detailing — {site.city}, {site.region}
        </span>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.75rem] font-medium tracking-[0.16em] text-soft uppercase transition-colors hover:text-leaf"
            >
              {item.label}
            </Link>
          ))}
          {instagram && (
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.shortName} on Instagram`}
              className="text-soft transition-colors hover:text-leaf"
            >
              <InstagramGlyph className="h-[1.125rem] w-[1.125rem]" />
            </a>
          )}
          <a
            href={telHref}
            className="hidden text-[0.75rem] font-semibold tracking-[0.18em] text-bone transition-colors hover:text-leaf xl:block"
          >
            {site.phone.display}
          </a>
          <Link href="/#quote" className="btn-primary px-5 py-3 text-[0.75rem] tracking-[0.16em]">
            GET A QUOTE
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span
            aria-hidden
            className={`h-px w-6 bg-bone transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span aria-hidden className={`h-px w-6 bg-bone transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span
            aria-hidden
            className={`h-px w-6 bg-bone transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-rule bg-ink lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-sm tracking-[0.14em] text-bone uppercase sm:px-10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {instagram && (
              <li className="border-b border-rule">
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-6 py-4 text-sm tracking-[0.14em] text-bone uppercase sm:px-10"
                >
                  <InstagramGlyph className="h-[1.125rem] w-[1.125rem] text-leaf" />
                  {instagram.handle}
                </a>
              </li>
            )}
            <li className="border-b border-rule">
              <a href={telHref} className="block px-6 py-4 text-sm font-semibold tracking-[0.14em] text-leaf sm:px-10">
                Call {site.phone.display}
              </a>
            </li>
            <li className="p-4 sm:px-10">
              <Link
                href="/#quote"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full px-6 py-4 text-sm"
              >
                GET A FREE QUOTE
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

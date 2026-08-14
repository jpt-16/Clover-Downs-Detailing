"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { site, telHref } from "@/lib/site";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#area", label: "Area" },
  { href: "/#quote", label: "Get a quote" },
];

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

        <span className="label hidden xl:block">
          Mobile Detailing — {site.city}, {site.region}
        </span>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.75rem] font-medium tracking-[0.16em] text-soft uppercase transition-colors hover:text-leaf"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={telHref}
            className="border-b border-leaf pb-[3px] text-[0.75rem] font-semibold tracking-[0.18em] text-bone transition-colors hover:text-leaf"
          >
            {site.phone.display}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
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
            <li>
              <a href={telHref} className="block px-6 py-4 text-sm font-semibold tracking-[0.14em] text-leaf sm:px-10">
                Call {site.phone.display}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

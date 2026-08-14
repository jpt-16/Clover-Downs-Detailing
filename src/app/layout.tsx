import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Mobile Auto Detailing in ${site.city}, ${site.region}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "mobile detailing",
    "auto detailing",
    `car detailing ${site.city} MA`,
    "interior detailing North Shore",
    "mobile car wash Beverly MA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b0c0b",
  colorScheme: "dark" as const,
};

/** LocalBusiness structured data so Google can show hours, area, and phone. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    priceRange: "$$",
    paymentAccepted: site.payments.join(", "),
    currenciesAccepted: "USD",
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.towns.map((town) => ({
      "@type": "City",
      name: town,
      containedInPlace: { "@type": "State", name: site.regionName },
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
      geoRadius: site.serviceRadiusMeters,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Detailing services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full interior detail" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior hand wash" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior and exterior, one visit" } },
      ],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Marks the document as scripted before paint, so scroll-reveal
            elements start hidden without a flash — and stay visible if JS
            never runs. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <StructuredData />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-leaf focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-leaf-deep"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

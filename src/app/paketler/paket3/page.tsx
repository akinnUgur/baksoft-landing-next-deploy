// app/paketler/paket3/page.tsx
import type { Metadata } from "next";
import Paket3CozyCafeClient from "./Client";

const SITE_URL = "https://www.baksoftarge.com";
const PATH = "/paketler/paket3";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket3.jpg`; // yoksa /og/default.jpg kullan

// JSON-LD: Breadcrumb
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Paketler", item: `${SITE_URL}/paketler` },
    { "@type": "ListItem", position: 3, name: "Paket 3 — Kafe Web Sitesi", item: CANONICAL },
  ],
};

// JSON-LD: Product (web hizmet paketi)
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Paket 3 — Kafe Tanıtım & Menü Web Sitesi",
  image: OG_IMAGE,
  description:
    "Kafeler için hızlı, mobil ve SEO uyumlu web sitesi paketi. Chalkboard menü, etiket/filtre, 'bugünün kahvesi', yorumlar ve rezervasyon CTA.",
  brand: { "@type": "Organization", name: "BaksoftARGE", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
  offers: {
    "@type": "Offer",
    url: CANONICAL,
    priceCurrency: "TRY",
    price: "3500.00", // başlangıç fiyatı — ihtiyacına göre güncelle
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title: "Paket 3 — Kafe Tanıtım & Menü Web Sitesi | BaksoftARGE",
  description:
    "Kafeler için modern, hızlı ve SEO uyumlu web sitesi. Chalkboard menü, etiket/filtre, 'bugünün kahvesi', ziyaretçi notları ve rezervasyon formu.",
  keywords: [
    "kafe web sitesi",
    "kafe menü sayfası",
    "kahve dükkanı sitesi",
    "restoran kafe rezervasyon",
    "baksoft arge paketler",
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Paket 3 — Kafe Tanıtım & Menü Web Sitesi | BaksoftARGE",
    description:
      "Friends/Mackbear esintili tema, chalkboard menü ve dönüşüm odaklı CTA’lar ile kafe web paketi.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paket 3 — Kafe Web Sitesi" }],
    siteName: "Baksoft",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paket 3 — Kafe Tanıtım & Menü Web Sitesi | BaksoftARGE",
    description: "Kafeler için hızlı, mobil ve SEO uyumlu web sitesi paketi.",
    images: [OG_IMAGE],
  },
  metadataBase: new URL(SITE_URL),
};

export default function Page() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Paket3CozyCafeClient />
    </>
  );
}

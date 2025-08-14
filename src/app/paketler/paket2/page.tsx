// app/paketler/paket2/page.tsx
import type { Metadata } from "next";
import Paket2BistroClient from "./Client";

const SITE_URL = "https://www.baksoftarge.com";
const PATH = "/paketler/paket2";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket2.jpg`; // yoksa /og/default.jpg kullan

// JSON-LD: Breadcrumb
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Paketler", item: `${SITE_URL}/paketler` },
    { "@type": "ListItem", position: 3, name: "Paket 2 — Restoran Web Sitesi", item: CANONICAL },
  ],
};

// JSON-LD: Product (web hizmet paketi)
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Paket 2 — Restoran Tanıtım & Menü Web Sitesi",
  image: OG_IMAGE,
  description:
    "Restoranlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Menü, etiket/filtre, şefin önerileri ve rezervasyon CTA ile dönüşüm odaklı.",
  brand: { "@type": "Organization", name: "BaksoftARGE", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
  offers: {
    "@type": "Offer",
    url: CANONICAL,
    priceCurrency: "TRY",
    price: "4000.00", // başlangıç fiyatı — projene göre güncelle
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title: "Paket 2 — Restoran Tanıtım & Menü Web Sitesi | BaksoftARGE",
  description:
    "Restoranlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Menü segmentasyonu, şef önerileri ve rezervasyon CTA ile dönüşüm odaklı tasarım.",
  keywords: [
    "restoran web sitesi",
    "menü web sayfası",
    "rezervasyon sitesi",
    "restoran tanıtım sayfası",
    "baksoft arge paketler",
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Paket 2 — Restoran Tanıtım & Menü Web Sitesi | BaksoftARGE",
    description:
      "Menü filtreleme, şef önerileri ve rezervasyon çağrısı ile modern restoran web paketi.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paket 2 — Restoran Web Sitesi" }],
    siteName: "Baksoft",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paket 2 — Restoran Tanıtım & Menü Web Sitesi | BaksoftARGE",
    description:
      "Restoranlara özel hızlı, mobil ve SEO uyumlu web sitesi paketi.",
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
      <Paket2BistroClient />
    </>
  );
}

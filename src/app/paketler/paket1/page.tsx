// app/paketler/paket1/page.tsx
import type { Metadata } from "next";
import Paket1InteriorClient from "./Client";

const SITE_URL = "https://www.baksoftarge.com";
const PATH = "/paketler/paket1";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket1.jpg`; // yoksa /og/default.jpg kullan

// JSON-LD (Breadcrumb + Product)
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: SITE_URL
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Paketler",
      item: `${SITE_URL}/paketler`
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Paket 1 — İç Mimarlık Web Sitesi",
      item: CANONICAL
    }
  ]
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Paket 1 — İç Mimarlık Web Sitesi",
  image: OG_IMAGE,
  description:
    "İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Proje mozaiği, malzeme kütüphanesi, önce/sonra slider ve bütçe hesaplayıcı ile portföyünüzü etkili sergileyin.",
  brand: {
    "@type": "Organization",
    name: "BaksoftARGE",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`
  },
  offers: {
    "@type": "Offer",
    url: CANONICAL,
    priceCurrency: "TRY",
    price: "5000.00", // tahmini başlangıç fiyatı, gerçeğe göre değiştir
    availability: "https://schema.org/InStock"
  }
};

export const metadata: Metadata = {
  title: "Paket 1 — İç Mimarlık Web Sitesi | Hızlı, Portföy Odaklı | BaksoftARGE",
  description:
    "İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Proje mozaiği, malzeme kütüphanesi, önce/sonra slider ve bütçe hesaplayıcı ile portföyünüzü etkili sergileyin.",
  keywords: [
    "iç mimarlık web sitesi",
    "mimar portföy",
    "mimarlık kurumsal site",
    "web tasarım paketleri",
    "baksoft arge paketler",
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Paket 1 — İç Mimarlık Web Sitesi | BaksoftARGE",
    description:
      "İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Proje mozaiği, malzeme kütüphanesi, önce/sonra ve bütçe modülü.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paket 1" }],
    siteName: "Baksoft",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paket 1 — İç Mimarlık Web Sitesi | BaksoftARGE",
    description: "İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi.",
    images: [OG_IMAGE],
  },
  metadataBase: new URL(SITE_URL),
};

export default function Page() {
  return (
    <>
      {/* JSON-LD Scriptleri */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Paket1InteriorClient />
    </>
  );
}

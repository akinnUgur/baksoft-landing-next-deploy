import type { Metadata } from "next";
import Paket9RestaurantColorful from "./Client";

const SITE_URL = "https://www.baksoftarge.com";
const PATH = "/paketler/paket5";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket5.jpg`;

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Paketler", item: `${SITE_URL}/paketler` },
    { "@type": "ListItem", position: 3, name: "Paket 5 — Restoran", item: CANONICAL }
  ]
};

// LocalBusiness JSON-LD
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Paket 5 — Restoran Tasarım",
  image: OG_IMAGE,
  "@id": CANONICAL,
  url: CANONICAL,
  telephone: "+90-242-000-0000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kaleiçi",
    addressLocality: "Antalya",
    addressCountry: "TR"
  },
  servesCuisine: ["İtalyan", "Akdeniz", "Vejetaryen"],
  priceRange: "₺₺",
  openingHours: ["Mo-Sa 17:30-23:30", "Su 13:00-22:00"],
  menu: `${CANONICAL}#menu`,
  acceptsReservations: true
};

export const metadata: Metadata = {
  title: "Paket 5 — Restoran Web Sitesi | Menü, Rezervasyon ve Galeri | BaksoftARGE",
  description:
    "Renkli, iştah açıcı restoran web sitesi paketi. Menü yönetimi, rezervasyon formu, şefin seçkileri ve galeri modülüyle modern tasarım.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Paket 5 — Restoran Web Sitesi | BaksoftARGE",
    description:
      "Menü, rezervasyon, şefin seçkileri ve galeri bölümleri ile restoranınızı etkili tanıtın.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paket 5 Restoran" }],
    siteName: "BaksoftARGE",
    locale: "tr_TR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Paket 5 — Restoran Web Sitesi | BaksoftARGE",
    description: "Modern, renkli restoran web sitesi tasarım paketi.",
    images: [OG_IMAGE]
  },
  metadataBase: new URL(SITE_URL)
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      <Paket9RestaurantColorful />
    </>
  );
}

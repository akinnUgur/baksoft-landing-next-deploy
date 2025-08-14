// app/paketler/paket17/page.tsx
import type { Metadata } from "next";
import Paket17BeautyClient from "./Client";

const SITE_URL = "https://www.baksoftarge.com";
const PATH = "/paketler/paket4";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket4.jpg`; // yoksa /og/default.jpg kullan

// JSON-LD: Breadcrumb
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Paketler", item: `${SITE_URL}/paketler` },
    { "@type": "ListItem", position: 3, name: "Paket 4 — Beauty/Aesthetics", item: CANONICAL },
  ],
};

// JSON-LD: Service (güzellik/estetik hizmet paketi)
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Paket 4 — Beauty/Aesthetics Web Sitesi",
  description:
    "Editoryal hero, ritüeller & paketler filtreleri, inline detay, before/after ve Glow Club üyeliği içeren estetik/beauty web sitesi paketi.",
  provider: {
    "@type": "Organization",
    name: "BaksoftARGE",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  areaServed: { "@type": "Country", name: "Türkiye" },
  offers: {
    "@type": "Offer",
    url: CANONICAL,
    priceCurrency: "TRY",
    price: "4500.00", // projenize göre düzenleyin
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title: "Paket 4 — Beauty/Aesthetics Web Sitesi | BaksoftARGE",
  description:
    "Editoryal hero, Glow/Botanical/Noir tema switcher, ritüel filtreleri, inline detay, before/after slider ve Glow Club üyeliği ile estetik/beauty odaklı web paketi.",
  keywords: [
    "güzellik merkezi web sitesi",
    "estetik kliniği sitesi",
    "ritüel paketleri",
    "before after slider",
    "üyelik planı",
    "baksoft arge paketler",
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Paket 4 — Beauty/Aesthetics Web Sitesi | BaksoftARGE",
    description:
      "Editoryal hero + ritüeller & paketler + before/after + Glow Club üyeliği.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paket 4 — Beauty/Aesthetics" }],
    siteName: "Baksoft",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paket 4 — Beauty/Aesthetics Web Sitesi | BaksoftARGE",
    description:
      "Tema switcher, ritüel filtreleri ve Glow Club üyeliği ile dönüşüm odaklı paket.",
    images: [OG_IMAGE],
  },
  metadataBase: new URL(SITE_URL),
};

export default function Page() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Paket17BeautyClient />
    </>
  );
}

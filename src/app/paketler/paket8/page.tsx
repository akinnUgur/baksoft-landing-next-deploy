import type { Metadata } from 'next';
import Paket12TrendyEcomClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/paketler/paket8';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket8.jpg`;

export const metadata: Metadata = {
  title: 'Paket 8 — Trendy E-Commerce Şablonu | BaksoftARGE',
  description:
    'Modern e-ticaret vitrini: arama, kategori/marka filtreleri, fiyat slider’ı, sıralama, favori ve sepet çekmecesi.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Paket 8 — Trendy E-Commerce Şablonu | BaksoftARGE',
    description:
      'Ürün grid’i, indirim rozetleri, ücretsiz kargo/hızlı teslim etiketleri ve “drawer” sepet deneyimi.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Paket 8 — E-Commerce' }],
    siteName: 'BaksoftARGE',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket 8 — Trendy E-Commerce Şablonu',
    description:
      'Arama + filtre + sıralama + favori + sepet çekmecesi ile hazır e-ticaret sayfası.',
    images: [OG_IMAGE],
  },
  keywords: [
    'e-ticaret teması',
    'next.js e-commerce',
    'ürün grid',
    'alışveriş sepeti',
  ],
};

export default function Page() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Paketler', item: `${SITE_URL}/paketler` },
      { '@type': 'ListItem', position: 3, name: 'Paket 8', item: CANONICAL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Paket12TrendyEcomClient />
    </>
  );
}

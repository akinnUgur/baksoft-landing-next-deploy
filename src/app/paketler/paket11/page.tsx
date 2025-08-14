import type { Metadata } from 'next';
import AntalyaHotelsClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/paketler/paket11';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket11.jpg`;

export const metadata: Metadata = {
  title: 'Paket 11 — Antalya Otel & Tatil Arama | BaksoftARGE',
  description:
    'Antalya otellerinde tarih, misafir ve bölge filtreleri; yıldız, konsept, etiket ve fiyata göre sıralama. Hızlı rezervasyon özeti.',
  alternates: { canonical: CANONICAL },
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    siteName: 'BaksoftARGE',
    title: 'Paket 11 — Antalya Otel & Tatil Arama',
    description:
      'Denize sıfır resortlardan Kaleiçi butiklerine — filtrele, sırala, hemen fiyatları gör.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Antalya otelleri' }],
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket 11 — Antalya Otel & Tatil Arama',
    description: 'Şeffaf fiyatlar, esnek iptal, hızlı rezervasyon özeti.',
    images: [OG_IMAGE],
  },
  keywords: [
    'antalya otel',
    'tatil paketi',
    'all inclusive',
    'ultra her şey dahil',
    'konyaaltı lara belek',
  ],
};

export default function Page() {
  // Breadcrumb + SearchAction schema (zengin sonuç şansı)
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Paketler', item: `${SITE_URL}/paketler` },
          { '@type': 'ListItem', position: 3, name: 'Paket 11', item: CANONICAL },
        ],
      },
      {
        '@type': 'WebSite',
        url: CANONICAL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${CANONICAL}?q={query}`,
          'query-input': 'required name=query',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <AntalyaHotelsClient />
    </>
  );
}

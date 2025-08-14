import type { Metadata } from 'next';
import Paket14RentACarClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/paketler/paket7';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket7.jpg`;

export const metadata: Metadata = {
  title: 'Paket 7 — Rent a Car Şablonu | BaksoftARGE',
  description:
    'Araç kiralama teması: rezervasyon arama, araç filtreleme, ekstralar, karşılaştırma ve hızlı rezervasyon çekmeceleri.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Paket 7 — Rent a Car Şablonu | BaksoftARGE',
    description:
      'Rezervasyon arama, sürücü yaşı, filtreler, karşılaştırma ve “drawer” rezervasyon akışı.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Paket 7 — Rent a Car' }],
    siteName: 'BaksoftARGE',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket 7 — Rent a Car Şablonu',
    description:
      'Filtrelenebilir araç grid’i, ekstralar ve çekmecede rezervasyon akışı.',
    images: [OG_IMAGE],
  },
  keywords: [
    'rent a car web sitesi',
    'araç kiralama teması',
    'araba kiralama rezervasyon',
    'otomobil kirala',
  ],
};

export default function Page() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Paketler', item: `${SITE_URL}/paketler` },
      { '@type': 'ListItem', position: 3, name: 'Paket 7', item: CANONICAL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
       
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Paket14RentACarClient />
    </>
  );
}

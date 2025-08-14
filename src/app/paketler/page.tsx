import type { Metadata } from 'next';

import HomeClient from './Client';

const SITE_URL = 'https://baksoftarge.com/paketler';
const PAGE_PATH = '/'; // gerekirse bulunduğu path'i yaz
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/baksoft-prime.jpg`;


export const metadata: Metadata = {
  title: 'Baksoft · Prime Paketler ve Canlı Demolar',
  description:
    'Özelleştirilebilir paketler: hero, carousel, story scroller, fiyatlandırma ve hızlı önizleme. Canlı demo ve esnek entegrasyon.',
  alternates: { canonical: CANONICAL },
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    siteName: 'BaksoftARGE',
    title: 'Baksoft · Prime Paketler ve Canlı Demolar',
    description:
      'Sektör bağımsız, kolay ölçeklenen Next.js + Tailwind şablonları.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Baksoft Prime' }],
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baksoft · Prime Paketler',
    description: 'Özelleştirilebilir paketler ve canlı demolar.',
    images: [OG_IMAGE],
  },
  keywords: [
    'next.js paket',
    'baksoft tasarım',
    'landing page',
    'carousel',
    'pricing',
    'preview overlay',
  ],
};

export default function Page() {
  // Structured Data (ItemList + Organization)
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'BaksoftARGE',
        url: SITE_URL,
        logo: `${SITE_URL}/baksoftLogo.png`,
      },
      {
        '@type': 'WebPage',
        url: CANONICAL,
        name: 'Baksoft · Prime Paketler',
        isPartOf: { '@id': `${SITE_URL}/paketler` },
      },
      {
        '@type': 'ItemList',
        name: 'Paketler',
        itemListOrder: 'http://schema.org/ItemListOrderAscending',
        numberOfItems: 6, // data’ya göre güncelleyebilirsin
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HeroPrime' },
          { '@type': 'ListItem', position: 2, name: 'PackageCarousel' },
          { '@type': 'ListItem', position: 3, name: 'StoryScrollerPro' },
          { '@type': 'ListItem', position: 4, name: 'Pricing' },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <HomeClient />
    </>
  );
}

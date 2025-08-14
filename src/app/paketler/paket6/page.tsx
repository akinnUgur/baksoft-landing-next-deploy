import type { Metadata } from 'next';
import Paket10CoffeeHouseClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/paketler/paket6';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket6.jpg`; // yoksa sonra ekleyebilirsin

export const metadata: Metadata = {
  title: 'Paket 6 — Coffee House Şablonu | BaksoftARGE',
  description:
    'Koyu yeşil/kahve paletiyle specialty coffee teması: hero, öne çıkanlar, menü, sipariş, galeri ve iletişim bölümleri.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Paket 6 — Coffee House Şablonu | BaksoftARGE',
    description:
      'Specialty coffee odaklı modern tema: hero, öne çıkanlar, menü ve sipariş formları.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Paket 6 — Coffee House' }],
    locale: 'tr_TR',
    siteName: 'BaksoftARGE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket 6 — Coffee House Şablonu | BaksoftARGE',
    description:
      'Koyu yeşil/kahve paletiyle specialty coffee teması. Menü, sipariş, galeri, iletişim.',
    images: [OG_IMAGE],
  },
  keywords: [
    'coffee shop web sitesi',
    'kafe teması',
    'third wave',
    'menü sayfası',
    'online sipariş',
  ],
};

export default function Page() {
  // JSON-LD Breadcrumb
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Paketler', item: `${SITE_URL}/paketler` },
      { '@type': 'ListItem', position: 3, name: 'Paket 6', item: CANONICAL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Paket10CoffeeHouseClient />
    </>
  );
}

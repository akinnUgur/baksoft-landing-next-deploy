import type { Metadata } from 'next';
import Paket13GymClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/paketler/paket9';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket9.jpg`;

export const metadata: Metadata = {
  title: 'Paket 9 — Gym / Fitness Studio Şablonu | BaksoftARGE',
  description:
    'Üyelik planları, akıllı program oluşturucu, ders takvimi ve antrenör rezervasyonu ile fitness stüdyo arayüzü.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Paket 9 — Gym / Fitness Studio',
    description:
      'Plan seç, indirimi uygula; hedefe/ekipmana göre otomatik antrenman planı üret; ders/koç rezervasyonu yap.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Paket 9 — Gym' }],
    siteName: 'BaksoftARGE',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket 9 — Gym / Fitness Studio',
    description:
      'Üyelik + program oluşturucu + ders takvimi + koç rezervasyonu — hepsi tek sayfada.',
    images: [OG_IMAGE],
  },
  keywords: [
    'spor salonu şablonu',
    'fitness next.js',
    'üyelik planları',
    'ders takvimi',
    'koç rezervasyonu',
  ],
};

export default function Page() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Paketler', item: `${SITE_URL}/paketler` },
      { '@type': 'ListItem', position: 3, name: 'Paket 9', item: CANONICAL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Paket13GymClient />
    </>
  );
}

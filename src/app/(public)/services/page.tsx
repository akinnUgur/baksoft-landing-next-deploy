import type { Metadata } from 'next';
import ServicesClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/services';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/services.jpg`;

export const metadata: Metadata = {
  title: 'Hizmetler · Baksoft',
  description:
    'Web, mobil, özel yazılım, yapay zekâ & veri, danışmanlık ve teknik destek hizmetleri — tek akışta.',
  alternates: { canonical: CANONICAL },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Baksoft Hizmetler',
    description:
      'Ürünleşmiş çözümler: web, mobil, özel yazılım, yapay zekâ ve danışmanlık.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Baksoft Hizmetler' }],
    siteName: 'Baksoft',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmetler · Baksoft',
    description:
      'Web, mobil, özel yazılım, yapay zekâ & veri, danışmanlık.',
    images: [OG_IMAGE],
  },
};

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Baksoft Hizmetler',
    url: CANONICAL,
    hasPart: [
      { '@type': 'Service', name: 'Web Geliştirme', areaServed: 'Global' },
      { '@type': 'Service', name: 'Mobil Uygulama Geliştirme', areaServed: 'Global' },
      { '@type': 'Service', name: 'Özel Yazılım Geliştirme', areaServed: 'Global' },
      { '@type': 'Service', name: 'Yapay Zekâ ve Veri Bilimi', areaServed: 'Global' },
      { '@type': 'Service', name: 'Danışmanlık ve Teknik Destek', areaServed: 'Global' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <ServicesClient />
    </>
  );
}

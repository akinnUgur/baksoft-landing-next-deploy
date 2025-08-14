import type { Metadata } from 'next';
import Paket15ClinicClient from './Client';

const SITE_URL = 'https://baksoftarge.com';
const PAGE_PATH = '/paketler/paket10';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket10.jpg`;

export const metadata: Metadata = {
  title: 'Paket 10 — Diş Kliniği Randevu Şablonu | BaksoftARGE',
  description:
    'Şube/bölüm/doktor seçimi, hizmet & fiyat aralıkları, doktor takvimi, sigorta, yorumlar ve SSS ile eksiksiz klinik randevu akışı.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Paket 10 — Diş Kliniği Randevu',
    description:
      'Hızlı randevu, hizmet filtreleri, doktor programı ve sigorta bilgileri — Next.js + Tailwind.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Paket 10 — Klinik' }],
    siteName: 'BaksoftARGE',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paket 10 — Diş Kliniği Randevu',
    description:
      'Şeffaf fiyat aralıkları, esnek randevu ve doktor takvimleri bir arada.',
    images: [OG_IMAGE],
  },
  keywords: [
    'diş kliniği şablonu',
    'randevu sistemi',
    'doktor takvimi',
    'klinik next.js',
    'hizmet fiyat aralıkları',
  ],
};

export default function Page() {
  // Schema.org: MedicalClinic + Breadcrumb
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        name: 'Nova Klinik',
        url: CANONICAL,
        medicalSpecialty: ['Dentistry', 'Orthodontics', 'OralSurgery'],
        address: [{ '@type': 'PostalAddress', addressLocality: 'İstanbul' }],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Paketler', item: `${SITE_URL}/paketler` },
          { '@type': 'ListItem', position: 3, name: 'Paket 10', item: CANONICAL },
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
      <Paket15ClinicClient />
    </>
  );
}

import { Metadata } from 'next'
import { Dictionary, Locale } from './i18n'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  path?: string
  locale: Locale
  alternateLocales?: Locale[]
  images?: string[]
}

const baseUrl = 'https://www.baksoftarge.com'
const defaultImage = '/og-image.jpg'

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    path = '',
    locale,
    alternateLocales = [],
    images = [defaultImage]
  } = config

  // Canonical URL
  const canonicalUrl = `${baseUrl}${locale === 'tr' ? '' : `/${locale}`}${path}`
  
  // Alternate URLs
  const alternates: { [key: string]: string } = {}
  alternateLocales.forEach(altLocale => {
    alternates[altLocale] = `${baseUrl}${altLocale === 'tr' ? '' : `/${altLocale}`}${path}`
  })

  // Keywords for Turkish and English
  const localizedKeywords = locale === 'tr' ? [
    'Antalya yazılım',
    'yazılım geliştirme',
    'web tasarım',
    'mobil uygulama',
    'yapay zeka',
    'baksoft arge',
    'yazılım şirketi',
    'frontend geliştirme',
    'backend geliştirme',
    'fullstack geliştirme',
    ...keywords
  ] : [
    'Antalya software',
    'software development',
    'web design',
    'mobile app',
    'artificial intelligence',
    'baksoft arge',
    'software company',
    'frontend development',
    'backend development',
    'fullstack development',
    ...keywords
  ]

  return {
    title,
    description,
    keywords: localizedKeywords,
    
    // Basic metadata
    metadataBase: new URL(baseUrl),
    
    // Canonical and alternates
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    
    // OpenGraph
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Baksoft Arge',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images,
    },
    
    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Structured data will be added separately
    other: {
      'geo.region': 'TR-07',
      'geo.placename': 'Antalya',
      'geo.position': '36.8841;30.7056',
      'ICBM': '36.8841, 30.7056',
    },
  }
}

// Generate structured data (JSON-LD)
export function generateStructuredData(locale: Locale) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Baksoft Arge Yazılım Çözümleri Sanayi ve Ticaret Anonim Şirketi',
    alternateName: 'Baksoft Arge',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: locale === 'tr' 
      ? 'Antalya merkezli yazılım çözümleri sunan teknoloji şirketi'
      : 'Antalya-based technology company providing software solutions',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adres bilgisi eklenecek',
      addressLocality: 'Antalya',
      addressRegion: 'Antalya',
      postalCode: '07000',
      addressCountry: 'TR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English'],
    },
    sameAs: [
      // Social media links will be added
    ],
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Founder Name', // Will be updated
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'AI Solutions',
      'Software Consulting',
    ],
  }

  return JSON.stringify(organizationData)
}

// Page-specific SEO helpers
export function getPageSEO(page: keyof Dictionary['meta'], dict: Dictionary, locale: Locale) {
  return generateSEO({
    title: dict.meta[page].title,
    description: dict.meta[page].description,
    locale,
    alternateLocales: ['tr', 'en'],
  })
}
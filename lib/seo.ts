import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { SITE_URL, company, social, areas } from './site';

const OG_LOCALE: Record<Locale, string> = { pl: 'pl_PL', uk: 'uk_UA', ru: 'ru_RU' };

/** Absolute URL of a page for a given locale; `path` is locale-relative, e.g. '' or '/polityka-prywatnosci'. */
export const pageUrl = (locale: Locale, path = '') => `${SITE_URL}/${locale}${path}`;

export function languageAlternates(path = '') {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, path)])),
    'x-default': pageUrl(routing.defaultLocale, path),
  };
}

export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  keywords,
  ogAlt,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  ogAlt?: string;
}): Metadata {
  const url = pageUrl(locale, path);
  const image = { url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: ogAlt ?? company.legalName };
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    applicationName: company.name,
    authors: [{ name: company.owner }],
    creator: company.name,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      url,
      siteName: company.legalName,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    formatDetection: { telephone: true, email: true, address: true },
    category: 'construction',
  };
}

export function businessJsonLd(locale: Locale, description: string, services: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': ['GeneralContractor', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: company.legalName,
    alternateName: ['M2 Maksymyk', 'M2 Remonty i Wykończenia', 'm2 Firma budowlana'],
    description,
    url: pageUrl(locale),
    logo: `${SITE_URL}/brand/logo.svg`,
    image: `${SITE_URL}/og.jpg`,
    telephone: company.phone,
    email: company.email,
    taxID: company.nip,
    vatID: `PL${company.nip}`,
    founder: { '@type': 'Person', name: company.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    areaServed: areas.map((name) => ({ '@type': 'City', name })),
    priceRange: '$$',
    currenciesAccepted: 'PLN',
    knowsLanguage: ['pl', 'uk', 'ru'],
    sameAs: [social.tiktok, social.facebook, social.fixly],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi remontowo-budowlane',
      itemListElement: services.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      email: company.email,
      contactType: 'customer service',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'Ukrainian', 'Russian'],
    },
  };
}

export function websiteJsonLd(locale: Locale, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: pageUrl(locale),
    name,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function videosJsonLd(videos: { id: string; name: string }[]) {
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: `${v.name} — ${company.legalName}`,
    thumbnailUrl: `${SITE_URL}/portfolio/${v.id}.webp`,
    contentUrl: `${social.tiktok}/video/${v.id}`,
    embedUrl: `https://www.tiktok.com/embed/v2/${v.id}`,
    uploadDate: tiktokUploadDate(v.id),
    publisher: { '@id': `${SITE_URL}/#business` },
  }));
}

/** TikTok video IDs encode the upload timestamp in their upper 32 bits. */
function tiktokUploadDate(id: string) {
  return new Date(Number(BigInt(id) >> 32n) * 1000).toISOString();
}

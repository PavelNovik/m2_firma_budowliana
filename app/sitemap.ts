import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { languageAlternates, pageUrl } from '@/lib/seo';

const PAGES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/polityka-prywatnosci', priority: 0.2, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency,
      priority: locale === routing.defaultLocale ? priority : priority * 0.9,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { portfolio } from '@/lib/site';
import { buildMetadata, businessJsonLd, faqJsonLd, videosJsonLd, websiteJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Services, { SERVICE_KEYS } from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Portfolio from '@/components/sections/Portfolio';
import Why from '@/components/sections/Why';
import Area from '@/components/sections/Area';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    ogAlt: t('ogAlt'),
  });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const services = SERVICE_KEYS.map((k) => t(`services.items.${k}.title`));
  const faq = t.raw('faq.items') as { q: string; a: string }[];
  const videos = portfolio.map((p) => ({ id: p.id, name: t(`portfolio.items.${p.key}`) }));

  return (
    <>
      <JsonLd
        data={[
          businessJsonLd(locale, t('meta.description'), services),
          websiteJsonLd(locale, t('meta.title')),
          faqJsonLd(faq),
          ...videosJsonLd(videos),
        ]}
      />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <Why />
      <Area />
      <Faq />
      <Contact />
    </>
  );
}

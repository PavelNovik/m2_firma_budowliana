import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { company } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

const PATH = '/polityka-prywatnosci';

export async function generateMetadata({ params }: PageProps<'/[locale]/polityka-prywatnosci'>): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return buildMetadata({ locale, path: PATH, title: `${t('title')} | ${company.name}`, description: t('description') });
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/polityka-prywatnosci'>) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const sections = t.raw('sections') as { h: string; p: string }[];

  return (
    <>
      <section className="bg-blueprint bg-ink pt-36 pb-16 text-white">
        <div className="container-x">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">{t('title')}</h1>
        </div>
      </section>
      <article className="container-x max-w-3xl py-16">
        {sections.map((s) => (
          <section key={s.h} className="mb-10">
            <h2 className="font-display text-xl font-bold">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
        <Link href="/" className="btn-dark mt-4">
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </Link>
      </article>
    </>
  );
}

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { portfolio, social } from '@/lib/site';
import { TikTokIcon } from '../icons';
import PortfolioGrid from '../PortfolioGrid';

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const items = portfolio.map((p) => ({ id: p.id, title: t(`items.${p.key}`) }));

  return (
    <section id="portfolio" className="bg-concrete py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="h2 mt-4">{t('title')}</h2>
            <p className="mt-5 text-lg text-muted">{t('subtitle')}</p>
          </div>
          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="btn-dark shrink-0 self-start lg:self-auto">
            <TikTokIcon className="h-5 w-5" />
            {t('follow', { handle: social.tiktokHandle })}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <PortfolioGrid
          items={items}
          labels={{ play: t('play'), watch: t('watch'), note: t('embedNote') }}
          profileUrl={social.tiktok}
        />
      </div>
    </section>
  );
}

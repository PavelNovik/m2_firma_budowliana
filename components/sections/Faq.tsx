import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

export default function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="h2 mt-4">{t('title')}</h2>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {items.map((item, i) => (
            <details key={item.q} className="reveal group py-1" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold transition hover:text-brand [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-concrete text-brand transition group-open:rotate-45 group-open:bg-brand group-open:text-white">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="pr-14 pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

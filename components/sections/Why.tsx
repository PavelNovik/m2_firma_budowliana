import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BadgeCheck, CalendarCheck, FileText, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { company } from '@/lib/site';

const ICONS = [CalendarCheck, Sparkles, ShieldCheck, Users, FileText, BadgeCheck];

export default function Why() {
  const t = useTranslations('why');
  const items = t.raw('items') as { title: string; text: string }[];

  return (
    <section id="why" className="py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="reveal relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
            <Image
              src="/portfolio/7698223437503892769.webp"
              alt={company.legalName}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>
          <div className="absolute -right-3 -bottom-8 w-56 bg-white p-5 shadow-2xl ring-1 ring-line sm:-right-8 sm:w-64">
            <Image src="/brand/logo.svg" alt="" width={640} height={400} className="h-auto w-full" />
          </div>
          <span className="absolute -top-4 -left-4 -z-10 h-32 w-32 bg-brand" aria-hidden="true" />
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <div className="reveal">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="h2 mt-4">{t('title')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t('text')}</p>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <li key={item.title} className="reveal flex gap-4" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-concrete text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold">{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text.replace('{nip}', company.nip)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

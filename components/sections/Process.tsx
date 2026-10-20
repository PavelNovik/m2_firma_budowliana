import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ClipboardList, Hammer, KeyRound, PhoneCall } from 'lucide-react';

const ICONS = [PhoneCall, ClipboardList, Hammer, KeyRound];

export default function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as { title: string; text: string }[];

  return (
    <section id="process" className="bg-blueprint relative overflow-hidden bg-graphite py-24 text-white sm:py-32">
      <Image src="/images/process.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.14] grayscale" />
      <div className="container-x relative">
        <div className="reveal max-w-2xl">
          <p className="eyebrow !text-brand-light before:!bg-brand-light">{t('eyebrow')}</p>
          <h2 className="h2 mt-4">{t('title')}</h2>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="absolute top-8 right-0 left-0 hidden h-px bg-white/15 lg:block" aria-hidden="true" />
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={step.title} className="reveal relative" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="relative flex h-16 w-16 items-center justify-center bg-brand shadow-lg shadow-brand/30">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                  <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center bg-white font-display text-xs font-extrabold text-ink">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

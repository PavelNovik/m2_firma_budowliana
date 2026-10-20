import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, BadgeCheck, Phone } from 'lucide-react';
import { company, social } from '@/lib/site';
import { TikTokIcon } from '../icons';

export default function Hero() {
  const t = useTranslations('hero');
  const trust = [t('trust1'), t('trust2'), t('trust3')];

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-white">
      <Image
        src="/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="bg-blueprint absolute inset-0 -z-10" />
      {/* Roof line motif */}
      <svg
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 hidden w-[58rem] text-white/[0.06] lg:block"
        viewBox="0 0 640 260"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 250 L320 40 L620 250" stroke="currentColor" strokeWidth="26" />
        <path d="M340 90 L560 244" stroke="#a8232b" strokeOpacity="0.5" strokeWidth="6" />
      </svg>

      <div className="container-x relative pt-28 pb-20 sm:pt-32">
        <div className="max-w-3xl">
          <p className="animate-fade-up inline-flex items-center gap-2 border-l-2 border-brand bg-white/5 px-4 py-2 font-display text-xs font-bold tracking-[0.2em] text-white/90 uppercase backdrop-blur">
            {t('badge')}
          </p>
          <h1 className="animate-fade-up mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            {t('title')} <span className="text-brand-light">{t('titleAccent')}</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/75 [animation-delay:160ms] sm:text-xl">
            {t('subtitle')}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <a href={`tel:${company.phone}`} className="btn-primary !py-4 text-base">
              <Phone className="h-5 w-5" />
              {t('ctaCall', { phone: company.phoneDisplay })}
            </a>
            <a href="#contact" className="btn-outline-light !py-4 text-base">
              {t('ctaQuote')}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <ul className="animate-fade-up mt-10 flex flex-col gap-3 text-sm text-white/80 [animation-delay:320ms] sm:flex-row sm:flex-wrap sm:gap-x-8">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-brand-light" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href={social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-fade-up group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition [animation-delay:400ms] hover:text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition group-hover:scale-110">
              <TikTokIcon className="h-5 w-5" />
            </span>
            <span>
              {t('tiktok')}
              <span className="block text-xs font-normal text-white/50">
                {social.tiktokHandle} · {social.tiktokFollowers} · ♥ {social.tiktokLikes}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

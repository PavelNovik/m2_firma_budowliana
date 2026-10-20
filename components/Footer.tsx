import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NAV, company, social } from '@/lib/site';
import { FacebookIcon, TikTokIcon } from './icons';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-brand bg-ink pb-24 text-white/70 md:pb-0">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image src="/brand/logo-white.svg" alt={company.legalName} width={640} height={400} className="h-24 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{t('tagline')}</p>
        </div>

        <nav aria-label={t('navTitle')}>
          <p className="font-display text-sm font-bold tracking-widest text-white uppercase">{t('navTitle')}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((key) => (
              <li key={key}>
                <Link href={`/#${key}`} className="transition hover:text-white">
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold tracking-widest text-white uppercase">{t('contactTitle')}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={`tel:${company.phone}`} className="font-semibold text-white transition hover:text-brand-light">
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="transition hover:text-white">
                {company.email}
              </a>
            </li>
            <li>
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
            </li>
            <li>NIP: {company.nip}</li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold tracking-widest text-white uppercase">{t('followTitle')}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-brand"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-brand"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm transition hover:text-white">
            {social.tiktokHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. {t('rights')}
          </p>
          <Link href="/polityka-prywatnosci" className="transition hover:text-white">
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

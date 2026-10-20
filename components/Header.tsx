'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, Phone, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { NAV, company, social } from '@/lib/site';
import { TikTokIcon } from './icons';
import LangSwitcher from './LangSwitcher';



export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-ink/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className={`container-x flex items-center justify-between gap-4 transition-all ${solid ? 'h-16' : 'h-20'}`}>
        <Link href="/" className="flex shrink-0 items-center" aria-label={company.legalName} onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-white.svg"
            alt={company.legalName}
            width={640}
            height={400}
            priority
            className={`w-auto transition-all ${solid ? 'h-11' : 'h-14'}`}
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {NAV.map((key) => (
            <Link
              key={key}
              href={`/#${key}`}
              className="font-display text-[13px] font-semibold tracking-wider whitespace-nowrap text-white/80 uppercase transition hover:text-white"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white hover:text-ink sm:flex"
          >
            <TikTokIcon className="h-4.5 w-4.5" />
          </a>
          <LangSwitcher />
          <a href={`tel:${company.phone}`} className="btn-primary hidden !px-4 !py-2.5 whitespace-nowrap md:inline-flex">
            <Phone className="h-4 w-4" />
            {company.phoneDisplay}
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-white xl:hidden"
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink xl:hidden" aria-label="Mobile">
          <ul className="container-x flex flex-col py-6">
            {NAV.map((key) => (
              <li key={key}>
                <Link
                  href={`/#${key}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 font-display text-lg font-bold tracking-wide text-white uppercase"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-x flex flex-col gap-3 pb-10">
            <a href={`tel:${company.phone}`} className="btn-primary">
              <Phone className="h-4 w-4" /> {company.phoneDisplay}
            </a>
            <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              <TikTokIcon className="h-4 w-4" /> {social.tiktokHandle}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

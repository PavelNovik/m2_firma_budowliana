'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, Globe } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const SHORT = { pl: 'PL', uk: 'UA', ru: 'RU' } as const;

export default function LangSwitcher() {
  const locale = useLocale() as keyof typeof SHORT;
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-3 font-display text-xs font-bold text-white transition hover:border-white"
      >
        <Globe className="h-4 w-4" />
        {SHORT[locale]}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 mt-2 w-44 overflow-hidden bg-white py-1 shadow-xl ring-1 ring-black/5">
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-concrete ${
                  l === locale ? 'font-bold text-brand' : 'text-graphite'
                }`}
              >
                {t(`languages.${l}`)}
                <span className="font-display text-xs text-muted">{SHORT[l]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

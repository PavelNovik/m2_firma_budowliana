import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import { company, social } from '@/lib/site';
import { WhatsAppIcon } from './icons';

/** Sticky call bar on mobile, round WhatsApp button on desktop. */
export default function FloatingContact() {
  const t = useTranslations('floating');

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 shadow-[0_-8px_24px_rgba(0,0,0,0.15)] md:hidden">
        <a href={`tel:${company.phone}`} className="flex items-center justify-center gap-2 bg-brand py-4 font-display text-sm font-bold text-white uppercase">
          <Phone className="h-5 w-5" /> {t('call')}
        </a>
        <a
          href={social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] py-4 font-display text-sm font-bold text-ink uppercase"
        >
          <WhatsAppIcon className="h-5 w-5" /> {t('whatsapp')}
        </a>
      </div>
      <a
        href={social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp')}
        className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-xl transition hover:scale-110 md:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}

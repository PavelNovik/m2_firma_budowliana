import { useTranslations } from 'next-intl';
import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import { company, social } from '@/lib/site';
import { FacebookIcon, TikTokIcon, ViberIcon, WhatsAppIcon } from '../icons';
import ContactForm from '../ContactForm';

export default function Contact() {
  const t = useTranslations('contact');
  const f = useTranslations('contact.form');

  const rows = [
    { icon: Phone, label: t('phone'), value: company.phoneDisplay, href: `tel:${company.phone}` },
    { icon: Mail, label: t('email'), value: company.email, href: `mailto:${company.email}` },
    {
      icon: MapPin,
      label: t('address'),
      value: `${company.address.street}, ${company.address.postalCode} ${company.address.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.address.street}, ${company.address.postalCode} ${company.address.city}`)}`,
    },
    { icon: Building2, label: t('company'), value: `${company.legalName} · ${t('nip')} ${company.nip}` },
  ];

  return (
    <section id="contact" className="bg-blueprint relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow !text-brand-light before:!bg-brand-light">{t('eyebrow')}</p>
          <h2 className="h2 mt-4">{t('title')}</h2>
          <p className="mt-5 max-w-lg text-lg text-white/65">{t('subtitle')}</p>

          <address className="mt-10 space-y-5 not-italic">
            {rows.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/5 text-brand-light ring-1 ring-white/10 transition group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-widest text-white/45 uppercase">{label}</span>
                    <span className="mt-0.5 block text-lg font-semibold break-words">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="group flex items-center gap-4" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {body}
                </a>
              ) : (
                <div key={label} className="group flex items-center gap-4">
                  {body}
                </div>
              );
            })}
          </address>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-ink hover:brightness-95">
              <WhatsAppIcon className="h-5 w-5" /> {t('whatsapp')}
            </a>
            <a href={social.viber} className="btn bg-[#7360F2] text-white hover:brightness-110">
              <ViberIcon className="h-5 w-5" /> {t('viber')}
            </a>
          </div>

          <p className="mt-10 text-xs font-semibold tracking-widest text-white/45 uppercase">{t('socials')}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="btn-outline-light !py-3">
              <TikTokIcon className="h-4 w-4" /> TikTok
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="btn-outline-light !py-3">
              <FacebookIcon className="h-4 w-4" /> Facebook
            </a>
            <a href={social.fixly} target="_blank" rel="noopener noreferrer" className="btn-outline-light !py-3">
              Fixly
            </a>
          </div>
        </div>

        <div className="reveal">
          <ContactForm
            phone={company.phone.replace('+', '')}
            email={company.email}
            labels={{
              title: f('title'),
              name: f('name'),
              phone: f('phone'),
              type: f('type'),
              types: f.raw('types') as string[],
              message: f('message'),
              sendWhatsapp: f('sendWhatsapp'),
              sendEmail: f('sendEmail'),
              note: f('note'),
              greeting: f('greeting'),
              subject: f('subject'),
            }}
          />
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { areas, company } from '@/lib/site';

export default function Area() {
  const t = useTranslations('area');
  const query = encodeURIComponent(`${company.address.street}, ${company.address.postalCode} ${company.address.city}`);

  return (
    <section id="area" className="bg-concrete">
      <div className="grid lg:grid-cols-2">
        <div className="container-x py-24 sm:py-28 lg:mr-0 lg:max-w-2xl lg:pr-16">
          <div className="reveal">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="h2 mt-4">{t('title')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t('text')}</p>
          </div>
          <ul className="reveal mt-10 flex flex-wrap gap-2.5">
            {areas.map((city, i) => (
              <li
                key={city}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold ${
                  i === 0 ? 'bg-brand text-white' : 'bg-white text-graphite ring-1 ring-line'
                }`}
              >
                <MapPin className="h-3.5 w-3.5" />
                {city}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[380px] bg-line lg:min-h-full">
          <iframe
            title={t('mapTitle')}
            src={`https://www.google.com/maps?q=${query}&z=11&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[60%]"
          />
        </div>
      </div>
    </section>
  );
}

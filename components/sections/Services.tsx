import { useTranslations } from 'next-intl';
import { Bath, Building2, DoorOpen, House, Layers, PaintRoller, Ruler, Zap, type LucideIcon } from 'lucide-react';

export const SERVICE_KEYS = ['turnkey', 'bathroom', 'painting', 'plaster', 'drywall', 'floors', 'installations', 'renovation'] as const;

const ICONS: Record<(typeof SERVICE_KEYS)[number], LucideIcon> = {
  turnkey: House,
  bathroom: Bath,
  painting: PaintRoller,
  plaster: Ruler,
  drywall: Layers,
  floors: DoorOpen,
  installations: Zap,
  renovation: Building2,
};

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="bg-blueprint-light py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="h2 mt-4">{t('title')}</h2>
          </div>
          <p className="max-w-xl text-lg text-muted lg:justify-self-end">{t('subtitle')}</p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[key];
            return (
              <li
                key={key}
                className="reveal group relative bg-white p-7 transition-colors duration-300 hover:bg-graphite sm:p-8"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <span className="font-display text-xs font-bold text-muted/60 transition group-hover:text-white/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mt-5 flex h-14 w-14 items-center justify-center bg-concrete text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-lg leading-snug font-bold transition group-hover:text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted transition group-hover:text-white/70">
                  {t(`items.${key}.text`)}
                </p>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-300 group-hover:w-full" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

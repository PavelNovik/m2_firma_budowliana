import Image from 'next/image';
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
                className="reveal group relative bg-white transition-colors duration-300 hover:bg-graphite"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-graphite">
                  <Image
                    src={`/images/${key}.webp`}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <span className="absolute top-4 left-4 font-display text-xs font-bold text-white/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative px-7 pb-8 sm:px-8">
                <div className="-mt-7 flex h-14 w-14 items-center justify-center bg-brand text-white shadow-lg shadow-brand/30 transition">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-lg leading-snug font-bold transition group-hover:text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted transition group-hover:text-white/70">
                  {t(`items.${key}.text`)}
                </p>
                </div>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-300 group-hover:w-full" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

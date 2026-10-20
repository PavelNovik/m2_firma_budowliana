import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations();
  const stats = t.raw('stats') as { value: string; label: string }[];

  return (
    <section className="relative z-10 -mt-14 sm:-mt-16">
      <div className="container-x">
        <dl className="grid grid-cols-2 bg-white shadow-2xl shadow-black/10 ring-1 ring-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal relative flex flex-col-reverse px-5 py-7 sm:px-8 sm:py-9 ${i % 2 ? 'border-l border-line' : ''} ${
                i > 1 ? 'border-t border-line lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="mt-2 text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-graphite sm:text-5xl">
                {s.value}
              </dd>
              <span className="absolute top-0 left-5 h-1 w-10 bg-brand sm:left-8" aria-hidden="true" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

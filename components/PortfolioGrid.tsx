'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { TikTokIcon } from './icons';

type Item = { id: string; title: string };

export default function PortfolioGrid({
  items,
  labels,
  profileUrl,
}: {
  items: Item[];
  labels: { play: string; watch: string; note: string };
  profileUrl: string;
}) {
  const [active, setActive] = useState<Item | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  const videoUrl = (id: string) => `${profileUrl}/video/${id}`;

  return (
    <>
      <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.id}
            className={`reveal ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            style={{ transitionDelay: `${(i % 4) * 60}ms` }}
          >
            <a
              href={videoUrl(item.id)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                setActive(item);
              }}
              className="group relative block aspect-[3/4] h-full w-full overflow-hidden bg-graphite text-left focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label={`${labels.play}: ${item.title}`}
            >
              <Image
                src={`/portfolio/${item.id}.webp`}
                alt={item.title}
                fill
                sizes={i === 0 ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 25vw, 50vw'}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
                <TikTokIcon className="h-4 w-4" />
              </span>
              <span
                className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-xl transition group-hover:scale-110 ${
                  i === 0 ? 'h-20 w-20' : 'h-12 w-12 sm:h-14 sm:w-14'
                }`}
              >
                <Play className={`${i === 0 ? 'h-8 w-8' : 'h-5 w-5'} translate-x-0.5 fill-current`} />
              </span>
              <span
                className={`absolute inset-x-0 bottom-0 p-3 font-display font-bold text-white sm:p-5 ${
                  i === 0 ? 'text-lg sm:text-2xl' : 'text-xs sm:text-sm'
                }`}
              >
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative flex max-h-full w-full max-w-sm flex-col" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[9/16] max-h-[calc(100dvh-10rem)] w-full overflow-hidden bg-ink">
              <iframe
                src={`https://www.tiktok.com/player/v1/${active.id}?autoplay=1&rel=0&description=0&music_info=0`}
                title={active.title}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <p className="mt-3 font-display text-sm font-bold text-white">{active.title}</p>
            <a href={videoUrl(active.id)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 !py-3">
              <TikTokIcon className="h-4 w-4" /> {labels.watch} <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-2 text-xs text-white/40">{labels.note}</p>
          </div>
        </div>
      )}
    </>
  );
}

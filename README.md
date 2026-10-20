# M2 Maksymyk Group — Firma Budowlana

Сайт строительной компании M2 Maksymyk Group (Poznań). Next.js 16 (App Router, SSG), Tailwind CSS 4, next-intl (PL / UA / RU).

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000 → редирект на /pl
npm run build && npm start
```

## Структура

| Путь | Что там |
| --- | --- |
| `lib/site.ts` | **Все данные компании**: телефон, e-mail, адрес, NIP, соцсети, города, список видео TikTok |
| `messages/{pl,uk,ru}.json` | Все тексты сайта на трёх языках |
| `components/sections/*` | Секции главной страницы |
| `lib/seo.ts` | Метаданные, hreflang, JSON-LD (GeneralContractor, FAQPage, VideoObject) |
| `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` | sitemap.xml, robots.txt, web manifest |
| `public/brand/` | Логотип в SVG (`logo.svg`, `logo-white.svg`, `logo-mark.svg`) |
| `assets-src/` | Исходники: фото вывески и обложки TikTok |

## Ассеты

- `node scripts/generate-logo.mjs` — пересобрать SVG-логотип (текст переводится в кривые).
- `npm run assets` — пересобрать webp-обложки портфолио, hero, иконки и OG-картинку.

### Добавить видео TikTok в портфолио

1. Сохранить обложку в `assets-src/covers/<videoId>.jpg` и запустить `npm run assets`.
2. Добавить `{ id, key }` в `portfolio` в `lib/site.ts`.
3. Добавить подпись `portfolio.items.<key>` во все три файла `messages/*.json`.

## Деплой на Vercel

1. Запушить репозиторий на GitHub и импортировать его в Vercel (фреймворк определится автоматически).
2. В Environment Variables задать `NEXT_PUBLIC_SITE_URL` — итоговый домен (например `https://m2maksymyk.pl`). От него строятся canonical, sitemap и Open Graph.
3. После деплоя добавить сайт в Google Search Console и отправить `/sitemap.xml`. Рекомендуется также создать профиль компании в Google Business Profile.

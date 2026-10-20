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

## Фото для оформления

Стоковые фото с [Unsplash](https://unsplash.com/license): бесплатны для коммерческого использования, указывать автора не обязательно.
Они используются **только для оформления** (главный экран, карточки услуг, фоны). В портфолио — только реальные работы фирмы из TikTok.
Исходники лежат в `assets-src/stock/`, после замены запустите `npm run assets`.

| Файл | Источник |
| --- | --- |
| hero | https://unsplash.com/photos/modern-stylish-living-room-with-open-concept-kitchen-43vHzsfrmxk |
| turnkey | https://unsplash.com/photos/a-living-room-with-a-large-window-AgK_XAqSbfk |
| bathroom | https://unsplash.com/photos/modern-bathroom-with-shower-and-vanity-g51F6-WYzyU |
| painting | https://unsplash.com/photos/person-painting-wall-with-roller-Azz07JvM-EA |
| plaster | https://unsplash.com/photos/hands-applying-plaster-to-a-wall-with-trowels-Re1O5byZ8bY |
| drywall | https://unsplash.com/photos/interior-construction-with-metal-framing-and-drywall-panels-0Pd_qKGIZ5k |
| floors | https://unsplash.com/photos/brown-wooden-parquet-floor-and-white-wall-aeTexYQKsuk |
| installations | https://unsplash.com/photos/electrician-installing-wiring-with-yellow-hardhat-_2AlIm-F6pw |
| renovation | https://unsplash.com/photos/kitchen-renovation-with-white-cabinets-UqNEbyRQ660 |
| process | https://unsplash.com/photos/man-climbing-on-ladder-inside-room-Te48TPzdcU8 |
| workshop | https://unsplash.com/photos/man-standing-infront-of-miter-saw-WEWTGkPUVT0 |

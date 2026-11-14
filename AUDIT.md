# AUDIT.md — Аудит лендинга NOVA PROJECT (Фаза 0)

Формат: статус `ok` (норма) / `fix` (ломает качество, обязано к исправлению) / `improve` (улучшение), приоритет P0 / P1 / P2, конкретное действие.

Контекст: одностраничный лендинг (SPA без роутинга), React 18 + Vite 5 + TypeScript strict, CSS Modules, деплой на GitHub Pages (`base: "/Nova_project_site/"`, `publicDir: "Public"`). Визуальная концепция (монохром, Inter, hairlines, ч/б-фото с цветным hover, зерно, бегущие строки) **не меняется** — всё усиление идёт строго внутри неё.

Проверки: только ручное чтение кода (запусков тестов/линтеров/сборок не было).

---

## 1. Структура и стек

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| Стек: React 18, Vite 5, TS strict, CSS Modules, Zustand, pnpm; единый живой конфиг `vite.config.ts` (`.js` отсутствует, workflow проверяет) | ok | — | не трогать |
| Навигация якорями `scrollIntoView` + `scroll-padding-top` в `index.css` (не удалён) | ok | — | сохранить |
| Секции 01–08 + hero, нумерация совпадает с `VerticalSidebar` | ok | — | сохранить |
| `test.jpeg` (2,48 МБ, 2000×2736) в корне, git-трекается, нигде не используется | fix | P1 | удалить из репозитория (мусор, раздувает репозиторий) |
| `avantgarde-site/` — легаси-папка, git-трекается | improve | P2 | оставить (вне лендинга, AGENTS не запрещает; зафиксировать в DECISIONS) |
| `package.json`: имя `avantgarde-artists-agency` — устаревшее | fix | P2 | переименовать в `nova-project-site` |
| `src/App.css`: 3 мёртвых @keyframes (fadeIn/pulse/slideIn), дубль `scroll-behavior` | improve | P2 | оставить как легаси (AGENTS), не трогать; зафиксировать в DECISIONS |
| `src/pages/{About,Artists,Booking,Contacts}.tsx`, `Home.module.css`, `LottieAnimation.tsx`, gsap/lottie-зависимости — orphaned по AGENTS §9 | ok | — | не трогать, не импортировать |
| `store/store.ts` (scrollPosition) фактически не используется (состояние живёт в `useScrollProgress`) | improve | P2 | оставить по AGENTS §11 |
| README (28 КБ) описывает легаси-многостраничную версию | improve | P2 | не трогать (вне лендинга) |
| `.github/workflows/deploy.yml`: проверка единственного конфигa, npm install (без lock-файла), upload dist | ok | — | не трогать (запуск CI запрещён) |

## 2. SEO

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| `lang="ru"` | ok | — | — |
| `<title>` с ключами (NOVA PROJECT, джаз-квинтет, мероприятия) | ok | — | усилить формулировку: «название, жанр, город, живые выступления» |
| `meta description` с ключами (джаз, Липецк, живые выступления) | ok | — | — |
| `og:type/title/description/locale` | ok | — | — |
| `og:image` = относительный `/1.jpg` — crawlers (VK, Telegram, WhatsApp) резолвят плохо; нет `og:url`, `og:image:width/height/alt` | ok (исправлено) | P0 | исправлено: абсолютный og:image на `Public/og-cover.jpg` + width/height/alt + og:url + og:site_name |
| Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) — отсутствуют | ok (исправлено) | P0 | добавлены в `index.html` (summary_large_image, абсолютный image) |
| `rel="canonical"` — отсутствует | ok (исправлено) | P0 | `<link rel="canonical" href="https://…/Nova_project_site/">` |
| `meta robots` — отсутствует | ok (исправлено) | P0 | `<meta name="robots" content="index, follow">` |
| `robots.txt` — отсутствует в `Public/` | ok (исправлено) | P0 | `Public/robots.txt` со sitemap и Allow |
| `sitemap.xml` — отсутствует | ok (исправлено) | P0 | `Public/sitemap.xml` (абсолютный URL, lastmod) |
| JSON-LD `MusicGroup` — отсутствует | ok (исправлено) | P0 | в `index.html`: name, genre (Jazz/Neoclassical/Fusion), address Липецк, image, sameAs (VK), url, inLanguage ru |
| Один `h1` (в hero), h2 по одному на секцию, h3 в карточках | ok | — | — |
| Alt-тексты: есть, но обобщённые («по смыслу»), без ключей | ok (исправлено) | P1 | alt переписаны в реестре с ключами (джаз-квинтет, живые выступления, Липецк) |
| Навигация — `<button>` (для SPA-скролла), поисковик не видит ссылок | improve | P1 | footer-навигация: `footerSectionLinks` — `<a href="#id">` с сохранением скролла (обёртка `onSubmit`), чтобы появились crawlable-якоря; header оставить кнопками (не ломать UX) |
| `rel="noopener noreferrer"` на внешних (VK в Footer/Booking/Contact) | ok | — | — |
| Favicon = `/1.jpg` (1,1 МБ) — абсурдно тяжёлый, relative (404 на Pages без base) | ok (исправлено) | P0 | `Public/favicon.svg` (монограмма N, палитра), путь `./favicon.svg` под base |

## 3. Производительность

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| Фото: 27 raw-JPEG по 0,38–2,7 МБ (всего ~28 МБ), без WebP, без srcset/sizes — страница грузит мегабайты | ok (исправлено) | P0 | 78 WebP-дериватов в `Public/img/` (Pillow, 3 ступени по ориентации); `Photo.tsx` — `<picture>`/srcset+sizes, реестр отдаёт `sources` |
| `Photo` без `width`/`height` → CLS при загрузке | ok (исправлено) | P1 | width/height из реестра на `<img>` — прокинуто во все секции |
| Hero-подложка (LCP-изображение, eager) — нет `fetchpriority="high"`, нет width/height, грузит 1,1 МБ JPEG | ok (исправлено) | P0 | srcset + sizes=100vw + width/height + eager + fetchpriority=high + decoding=async (и контакт-подложка) |
| Google Fonts: дубль — `@import` в `index.css` (render-blocking CSS) + `<link>` в `index.html` — двойная загрузка | fix | P1 | убрать `@import` из CSS (в HTML уже есть preconnect + `display=swap`), добавить `preload` для stylesheet |
| `loading=lazy`/`decoding=async` в Photo, hero eager | ok | — | сохранить |
| Бандл: gsap/lottie не импортируются в код → в бандл не попадают (tree-shaking по факту использования) | ok | — | не трогать |
| Зерно — инлайн-SVG (data URI), Marquee на CSS-анимации, параллакс на rAF | ok | — | — |
| Кэширование артефактов Vite (хэши в именах) | ok | — | — |

## 4. Доступность (WCAG 2.1 AA)

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| `:focus-visible` (1px white, offset 3) глобально | ok | — | — |
| `prefers-reduced-motion`: глобальный блок в `index.css` + AnimatedSection + Marquee | ok | — | — |
| Typewriter печатает/стирает текст под reduced-motion (JS-таймер) | fix | P1 | остановить печатание при `prefers-reduced-motion`, показать финальную строку |
| Формы: `<label>` без `htmlFor`/`id` — поля не связаны со screen reader; нет `aria-required` | ok (исправлено) | P0 | id + htmlFor, `aria-required`, звёздка обязательных полей; радиогруппа — `fieldset`+`legend` |
| Телефон: нет `inputmode="tel"`, email без `autocomplete` | ok (исправлено) | P1 | tel→inputmode=tel+autocomplete=tel, email→autocomplete=email |
| Skip-link («К основному содержимому») — отсутствует | ok (исправлено) | P0 | первая ссылка App → `#main`, видна на фокусе |
| `<main>` без имени; нет landmark-структуры «main с label» | ok (исправлено) | P2 | `id="main"` + `aria-label="Лендинг NOVA PROJECT"` |
| Контраст палитры на #0a0a0a: #ffffff (19:1), #cccccc (12:1), #888888 (≈6,3:1), #666666 (≈4,2:1) — сервисные 11–12px метки #666666 ниже 4,5 | fix | P1 | точечно: тексты ≥4,5:1 (крупные ≥3:1); #555/#444 только декоративно; manual-проверка каждого модуля |
| Тач-таргеты ≥44×44 (маркеры sidebar, кнопки header, radio-карточки) | fix | P1 | измерить по CSS, при необходимости min-height/min-width |
| Формы: обязательные поля `required` есть, сводка `role="status"` есть | ok | — | — |
| Кнопки audio: `aria-pressed` + aria-label | ok | — | — |
| Marquee, зерно, watermark, hero-подложка: aria-hidden | ok | — | — |

## 5. UI/UX и джазовая атмосфера

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| Редакционная система (index→hairline→eyebrow→h2→lead), зерно, бегущие строки, swing-typing — атмосфера сильна | ok | — | сохранить |
| Секция «Звук»: кнопки «играть», аудио нет (визуальное превью) — обещание без выполнения | improve | P1 | честная ремарка в рамках концепции (курсивная строка о записи), кнопки остаются визуальным превью |
| Booking: сводка «Заявка готова / Изменить данные / Позвонить» — честное состояние без фейковой отправки | ok | — | — |
| Галерея: show-more, count, CTA | ok | — | — |
| Адаптив: 1024/768/480 везде + точечные (≤1280, ≤1100, ≤900, 1025–1200, ≤860, ≤640, max-height 780) | ok | — | ручная проверка 320/375/768/1024/1440 |
| Hover/focus/active/pressed/ready-состояния карточек и кнопок | ok | — | — |
| `@media print` — только в AnimatedSection | improve | P2 | добавить print-блоки там, где анимация (Hero, Marquee, grain) |
| Анимации: ease-out-expo, --transition-image, --delay | ok | — | сохранить |

## 6. Код и безопасность

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| Стиль: camelCase CSS-классы, barrel-экспорты, functional components, no any, TS strict | ok | — | — |
| Динамика только через CSS-переменные (`--delay`, `--progress`, `--speed`); waveform inline-height — существующий паттерн, не трогать | ok | — | — |
| Внешние ссылки: rel noopener | ok | — | — |
| XSS: React text-nodes, dangerouslySetInnerHTML нет | ok | — | — |
| `FormSelect` placeholder `<option value="">` (required) — валидация native | ok | — | — |
| Ручная проверка: все `styles.*` существуют в своих `.module.css`; CSS парсится esbuild-парсером (не запуск, а синтаксический разбор); специфичность `.animatedSection.animated` сохранена | ok (контрол) | P2 | повторять контроль после каждой правки |
| VK-ссылка `https://vk.ru/novaprojekt` — `vk.ru` не является доменом VK (vk.com); реальная страница не подтверждена | fix | P1 | поправить домен на `vk.com` (формат реестра), запись в DECISIONS |

## Итог приоритетов
- **P0:** og:image/og:url/width/height, Twitter Cards, canonical, robots meta, robots.txt, sitemap.xml, JSON-LD, favicon, WebP-дериваты + LCP hero, формы (labels/aria-required), skip-link.
- **P1:** width/height Photo, шрифты (убрать @import-дубль), alt-тексты, Typewriter reduced-motion, inputmode/autocomplete, Escape+aria-controls, тач-таргеты, контраст сервисных текстов, VK-домен, crawlable footer-якоря, LCP-геро srcset, test.jpeg удалить.
- **P2:** package.json имя, print-блоки, честная ремарка аудио, aria-label main, ручные проверки адаптива/специфичности, фиксация легаси-решений.

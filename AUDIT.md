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
| `test.jpeg` (2,48 МБ, 2000×2736) в корне, git-трекается, нигде не используется | ok (исправлено) | P1 | git rm test.jpeg — удалён из репозитория |
| `avantgarde-site/` — легаси-папка, git-трекается | improve | P2 | оставить (вне лендинга, AGENTS не запрещает; зафиксировать в DECISIONS) |
| `package.json`: имя `avantgarde-artists-agency` — устаревшее | ok (исправлено) | P2 | переименовано в `nova-project-site` |
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
| Alt-тексты: есть, но обобщённые («по смыслу»), без ключей | ok (исправлено) | P1 | alt переписаны в реестре с ключами; затем уточнены по просмотру всех 26 кадров (подписи по фактическим ролям) |
| Навигация — `<button>` (для SPA-скролла), поисковик не видит ссылок | ok (исправлено) | P1 | footer-навигация — `<a href="#id">` (crawlable-якоря), smooth-scroll через html+scroll-padding-top; header оставлен кнопками |
| `rel="noopener noreferrer"` на внешних (VK в Footer/Booking/Contact) | ok | — | — |
| Favicon = `/1.jpg` (1,1 МБ) — абсурдно тяжёлый, relative (404 на Pages без base) | ok (исправлено) | P0 | `Public/favicon.svg` (монограмма N, палитра), путь `./favicon.svg` под base |

## 3. Производительность

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| Фото: 27 raw-JPEG по 0,38–2,7 МБ (всего ~28 МБ), без WebP, без srcset/sizes — страница грузит мегабайты | ok (исправлено) | P0 | 78 WebP-дериватов в `Public/img/` (Pillow, 3 ступени по ориентации); `Photo.tsx` — `<picture>`/srcset+sizes, реестр отдаёт `sources` |
| srcSet в `<source type="image/webp">` собирался из одних ширины («640w, 900w…») без адресов ступеней — кандидат без адреса читается как относительная ссылка, WebP-ветка никогда не выбиралась, каждый снимок качал JPEG-оригинал (до 1,1 МБ) | ok (исправлено) | P0 | srcSet = «адрес + дескриптор» (`url + ' ' + width + 'w'`), тот же паттерн, что в hero и Contact; комментарий в компоненте |
| `Photo` без `width`/`height` → CLS при загрузке | ok (исправлено) | P1 | width/height из реестра на `<img>` — прокинуто во все секции |
| `sizes` по shape завышают слот (fill 33vw при ~25vw, wide 48vw при ~43vw, portrait 46vw при ~39vw, tall 40vw при ~32vw) → на вьюпортах 1920+ выбирается тяжёлая ступень (900w / 2160-height) вместо достаточной 640w / 666w | ok (исправлено) | P1 | `Photo` принимает `sizes`, секции передают ширину своего грида по брейкпоинтам; дефолт `SHAPE_SIZES` сохранён |
| у `<section>` нет вычисляемого имени — скринридер читает секции как безымянные регионы, нет навигации landmark-за-landmark | ok (исправлено) | P1 | `SectionHeading` ставит id на единственный `<h2>`, секция ссылается через `aria-labelledby`, hero получил `aria-label` |
| штрихи волны плеера задавались inline-стилем (`height`, `animationDelay`) — нарушение AGENTS §9 | ok (исправлено) | P2 | высота и задержка через CSS-переменные `--h`/`--delay`, значения из данных |
| смена играющего фрагмента не объявлялась скринридеру | ok (исправлено) | P2 | статус плеера (`playerState`) в `aria-live="polite"` |
| телефон и VK в блоке «Или сразу» — цели меньше 24×24, разнесены на 10px (WCAG 2.5.8) | ok (исправлено) | P2 | `.quick { gap: 24px }`, `line-height: 1.5` у телефона — цель 30px по высоте |
| аудио- и hero-секции содержат `@keyframes`, но локального `prefers-reduced-motion`-блока нет (§5 требует его там, где есть анимация) | ok (исправлено) | P2 | пульс, волна-эквалайзер, дрейф подложки и стрелка прокрутки гасятся явно; глобальный блок index.css сохранён |
| рельс секций — `<div>` без роли: девять маркеров не образуют навигационного landmark | ok (исправлено) | P1 | корень — `<nav aria-label="Секции страницы">` |
| боковая колонка секции «Заявка» — `<aside>` без имени (complementary без имени) | ok (исправлено) | P1 | `aria-label="Путь от заявки до вечера"` |
| skip-link не переносит фокус: `<main>` без `tabIndex` не фокусируется | ok (исправлено) | P1 | `tabIndex={-1}` на `main` |
| без JavaScript страница полностью пуста (React-SPA), посетитель ничего не узнаёт | ok (исправлено) | P1 | noscript-заглушка в `index.html`: заголовок, телефон, VK; глобальный класс `.noscript` на существующих токенах |
| документация отставала от фактического состояния (webp-ступени, скрипты, `utils/scroll.ts`, ассеты шапки) | ok (исправлено) | P2 | README: дерево проекта, раздел «Веб-форматы», `utils/scroll.ts` в структуре, строка «Сделано», оговорка про PWA-манифест |
| печатная версия секций с декором и интерактивом не покрыта (звук, хроника, заявка, контакты); в глобальном print-блоке мёртвые селекторы `main .rail` и `.marquee` (классы CSS-модулей хешируются, глобальный селектор до них не достает) | ok (исправлено) | P1 | print-блоки в четырёх модулях секций; мёртвые селекторы убраны; адреса tel/https-ссылок дописываются текстом; печатная пара `#cccccc`/`#333333` |
| Hero-подложка (LCP-изображение, eager) — нет `fetchpriority="high"`, нет width/height, грузит 1,1 МБ JPEG | ok (исправлено) | P0 | srcset + sizes=100vw + width/height + eager + fetchpriority=high + decoding=async (и контакт-подложка) |
| Google Fonts: дубль — `@import` в `index.css` (render-blocking CSS) + `<link>` в `index.html` — двойная загрузка | ok (исправлено) | P1 | @import удалён, preload stylesheet в HTML (один источник), swap сохранён |
| `loading=lazy`/`decoding=async` в Photo, hero eager | ok | — | сохранить |
| Бандл: gsap/lottie не импортируются в код → в бандл не попадают (tree-shaking по факту использования) | ok | — | не трогать |
| Зерно — инлайн-SVG (data URI), Marquee на CSS-анимации, параллакс на rAF | ok | — | — |
| Кэширование артефактов Vite (хэши в именах) | ok | — | — |

## 4. Доступность (WCAG 2.1 AA)

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| `:focus-visible` (1px white, offset 3) глобально | ok | — | — |
| `prefers-reduced-motion`: глобальный блок в `index.css` + AnimatedSection + Marquee | ok | — | — |
| Typewriter печатает/стирает текст под reduced-motion (JS-таймер) | ok (исправлено) | P1 | печатание не запускается, показан полный первый жанр; курсор гасится reduced-блоком |
| Формы: `<label>` без `htmlFor`/`id` — поля не связаны со screen reader; нет `aria-required` | ok (исправлено) | P0 | id + htmlFor, `aria-required`, звёздка обязательных полей; радиогруппа — `fieldset`+`legend` |
| Телефон: нет `inputmode="tel"`, email без `autocomplete` | ok (исправлено) | P1 | tel→inputmode=tel+autocomplete=tel, email→autocomplete=email |
| Skip-link («К основному содержимому») — отсутствует | ok (исправлено) | P0 | первая ссылка App → `#main`, видна на фокусе |
| `<main>` без имени; нет landmark-структуры «main с label» | ok (исправлено) | P2 | `id="main"` + `aria-label="Лендинг NOVA PROJECT"` |
| Контраст палитры на #0a0a0a: #ffffff (19:1), #cccccc (12:1), #888888 (≈6,3:1), #666666 (≈4,2:1) — сервисные 11–12px метки #666666 ниже 4,5 | ok (исправлено) | P1 | посчитано: #666 = 3,45:1 → сервисные тексты и placeholders подняты к #888 (5,58:1) через токен `--text-tertiary`; #444 только декоративно (bullets, wave, counter) |
| Мобильное меню: nav без id/имени, toggle без aria-controls, Escape не закрывает | ok (исправлено) | P1 | `nav#mobile-nav` + aria-label, toggle: aria-expanded + aria-controls + ref, Escape закрывает и возвращает фокус |
| Тач-таргеты ≥44×44 (маркеры sidebar, кнопки header, radio-карточки) | ok (исправлено) | P1 | бургер 44×44 (полоски прежние), .cta/.navLink min-height 44, маркеры sidebar min-height 44 (gap 14→6), radio-карточки 44, аудио-кнопки 44 |
| Формы: обязательные поля `required` есть, сводка `role="status"` есть | ok | — | — |
| Кнопки audio: `aria-pressed` + aria-label | ok | — | — |
| Marquee, зерно, watermark, hero-подложка: aria-hidden | ok | — | — |

## 5. UI/UX и джазовая атмосфера

| Пункт | Статус | Приоритет | Действие |
|---|---|---|---|
| Редакционная система (index→hairline→eyebrow→h2→lead), зерно, бегущие строки, swing-typing — атмосфера сильна | ok | — | сохранить |
| Секция «Звук»: кнопки «играть», аудио нет (визуальное превью) — обещание без выполнения | ok (исправлено) | P1 | честная ремарка в рамках концепции (курсивная строка о записи), кнопки остаются визуальным превью |
| Booking: сводка «Заявка готова / Изменить данные / Позвонить» — честное состояние без фейковой отправки | ok | — | — |
| Галерея: show-more, count, CTA | ok | — | — |
| Адаптив: 1024/768/480 везде + точечные (≤1280, ≤1100, ≤900, 1025–1200, ≤860, ≤640, max-height 780) | ok | — | ручная проверка 320/375/768/1024/1440 |
| Hover/focus/active/pressed/ready-состояния карточек и кнопок | ok | — | — |
| `@media print` — только в AnimatedSection | ok (исправлено) | P2 | добавить print-блоки там, где анимация (Hero, Marquee, grain) |
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
| VK-ссылка `https://vk.ru/novaprojekt` — `vk.ru` не является доменом VK (vk.com); реальная страница не подтверждена | ok (исправлено) | P1 | поправить домен на `vk.com` (формат реестра), запись в DECISIONS |
| Хардкодные `#ffffff`/`#cccccc`/`#111111` внутри классов CSS-модулей перекрывали глобальный print-блок: белый текст печатался невидимым на белой бумаге | ok (исправлено) | P1 | печатная палитра из существующих токенов (`#111111`, `#333333`, `#cccccc`), print-блоки во всех 12 модулях |

## Итог приоритетов
- **P0:** og:image/og:url/width/height, Twitter Cards, canonical, robots meta, robots.txt, sitemap.xml, JSON-LD, favicon, WebP-дериваты + LCP hero, формы (labels/aria-required), skip-link.
- **P1:** width/height Photo, шрифты (убрать @import-дубль), alt-тексты, Typewriter reduced-motion, inputmode/autocomplete, Escape+aria-controls, тач-таргеты, контраст сервисных текстов, VK-домен, crawlable footer-якоря, LCP-геро srcset, test.jpeg удалить.
- **P2:** package.json имя, print-блоки, честная ремарка аудио, aria-label main, ручные проверки адаптива/специфичности, фиксация легаси-решений.

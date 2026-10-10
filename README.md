# NOVA PROJECT — Джаз-квинтет Лендинг

Одностраничный лендинг для джаз-квинтета **NOVA PROJECT** (Липецк), играющего живую музыку на мероприятиях: корпоративы, свадьбы, приёмы, фестивали.

---

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (Vite HMR)
npm run dev

# Сборка для production (= tsc && vite build)
npm run build

# Предпросмотр production-сборки
npm run preview
```

Dev-сервер: [http://localhost:5173](http://localhost:5173) (стандартный порт Vite; если занят — Vite возьмёт следующий и напишет его в консоли).

> ⚠️ `npm run lint` **не работает**: скрипт есть в `package.json`, но eslint не установлен и конфига нет. Запуск упадёт.

---

## Стек и архитектура

| Компонент       | Выбор                                     |
|-----------------|-------------------------------------------|
| Язык            | TypeScript (строгий режим)                |
| Бандлер         | Vite 5                                    |
| Фреймворк       | React 18 (функциональные компоненты)      |
| Состояние       | Zustand (минимальное хранилище)           |
| Стили           | CSS Modules + токены в `variables.css`    |
| Шрифт           | Inter (Google Fonts), веса 300–900        |
| Анимации        | Intersection Observer + CSS transitions   |
| Фото            | Пул в `Public/`, отдаётся по `/N.jpg`     |

### Архитектурные решения

1. **Одностраничный лендинг** — все секции в `src/pages/Home.tsx`, навигация через `scrollIntoView`.
2. **CSS Modules** — изолированные стили для каждого компонента, без конфликтов.
3. **Тёмная тема** — единая палитра: фон `#0a0a0a`, текст `#ffffff`, серые ступени.
4. **Data-first подход** — весь контент вынесен в `src/data/`, компоненты работают с данными.
5. **Редакционная система** — каждая секция собирается из общих примитивов: `SectionHeading`, `Photo`, `Marquee`. Ни одна секция не рисует свою шапку.
6. **Адаптивность** — базовые breakpoints 480 / 768 / 1024 px + точечные (см. ниже).

---

## Структура проекта

```
Public/                          # Пул фотографий: 1.jpg … 28.jpg (publicDir)
├── 1.jpg                        # hero-подложка и favicon
└── … 28.jpg

src/
├── main.tsx                     # Точка входа (ReactDOM + StrictMode)
├── App.tsx                      # Header + VerticalSidebar + Home + Footer
├── App.css                      # Легаси-@keyframes (fadeIn, pulse, slideIn) — не используются
├── index.css                    # Сброс, шрифты, скроллбар, зерно, @keyframes
│
├── styles/
│   └── variables.css            # Все дизайн-токены (импортируется в main.tsx)
│
├── components/
│   ├── Header.tsx               # Навигация: прозрачная → блюр при скролле, полоса прогресса
│   ├── Footer.tsx               # 3 колонки + водяной знак NOVA PROJECT
│   ├── VerticalSidebar.tsx      # Рельс прогресса с маркерами секций (скрыт ≤1280px)
│   ├── AnimatedSection.tsx      # Обёртка scroll-triggered анимаций
│   ├── SectionHeading.tsx       # Заголовок секции: индекс → линия → надзаголовок → h2 → лид
│   ├── Photo.tsx                # Единая подача фото: ч/б → цвет на hover
│   ├── Marquee.tsx              # Бегущая строка-разделитель
│   ├── Typewriter.tsx           # Печатающаяся строка (hero)
│   ├── LottieAnimation.tsx      # НЕ используется
│   │
│   ├── form/                    # Переиспользуемые элементы форм
│   │   ├── FormInput.tsx
│   │   ├── FormSelect.tsx
│   │   ├── FormTextarea.tsx
│   │   ├── FormRadioCard.tsx
│   │   └── index.ts
│   │
│   └── home-sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── RepertoireSection.tsx
│       ├── AudioSection.tsx
│       ├── GallerySection.tsx
│       ├── FormatSection.tsx
│       ├── PricingSection.tsx
│       ├── BookingSection.tsx
│       ├── ContactSection.tsx
│       └── index.ts             # Barrel-экспорты
│
├── hooks/
│   ├── useScrollProgress.ts     # ✅ используется (прогресс скролла + активная секция)
│   ├── useIntersectionObserver.ts  # ⚠️ определён, но нигде не подключён
│   └── useScrollAnimation.ts    # ⚠️ gsap, не используется
│
├── pages/
│   ├── Home.tsx                 # Единственная подключённая страница — лендинг
│   ├── About.tsx / Artists.tsx / Booking.tsx / Contacts.tsx   # orphaned, не подключены
│   └── Home.module.css          # dead-код со светлой темой — НЕ импортировать
│
├── data/                        # Весь контент
│   ├── index.ts                 # Barrel-экспорты
│   ├── photos.ts                # Реестр фотографий
│   ├── audio.ts                 # Треки и формы волн
│   ├── content.ts               # Бегущие строки, метрики hero, шаги заявки
│   ├── bandMembers.ts           # Состав группы
│   ├── repertoire.ts            # 6 программ репертуара
│   ├── contacts.ts              # Телефон, VK
│   ├── format.ts                # Форматы выступления
│   ├── pricing.ts               # Стоимость и включённые услуги
│   ├── about.ts                 # Текст «О нас»
│   ├── booking.ts               # Конфиг формы бронирования
│   └── navigation.ts            # Якоря, навигация
│
└── store/
    └── store.ts                 # Zustand (scrollPosition)
```

---

## Секции лендинга

Сквозная нумерация `01`–`08` — часть дизайна: номер показывается в шапке секции и совпадает с порядком в `VerticalSidebar`.

| № | Секция | ID | Компонент | Что внутри |
|---|--------|----|-----------|------------|
| — | Первый экран | `hero` | `HeroSection` | Заголовок NOVA PROJECT, параллакс-подложка, печатающиеся жанры, 2 CTA, строка метрик |
| 01 | О коллективе | `about` | `AboutSection` | Две колонки: фото-блок + текст, пул-цитата, состав `01`–`05` |
| 02 | Репертуар | `repertoire` | `RepertoireSection` | Мозаика 3×3 на хайрлайнах: 6 программ + 2 фото-плитки |
| 03 | Звук | `audio` | `AudioSection` | Фото + плеер: 5 треков, анимированный эквалайзер активного |
| 04 | Хроника | `gallery` | `GallerySection` | Мозаика из 11 кадров + «Показать ещё 4», подписи |
| 05 | Формат вечера | `format` | `FormatSection` | Чередующиеся блоки фото/текст, длительность, детали |
| 06 | Стоимость | `pricing` | `PricingSection` | Крупная цена, что входит, примечание про райдер |
| 07 | Заявка | `booking` | `BookingSection` | Фото, 3 шага, контакты + форма заявки |
| 08 | Контакты | `contact` | `ContactSection` | Фото-подложка + 3 карточки связи |

Между блоками — бегущие строки (`Marquee`): после hero и после «Хроники».

Все секции, кроме hero, обёрнуты в `<AnimatedSection>`; hero виден сразу.

---

## Единая стилистика

### `SectionHeading` — шапка каждой секции

```tsx
<SectionHeading
  index="01"
  eyebrow="О коллективе"
  title="Музыка — это диалог между эпохами"
  lead="Пять музыкантов, живой звук и программа, собранная под ваш вечер."
  align="left"      // 'left' | 'center'
  size="default"    // 'default' | 'display'
/>
```

### `Photo` — единственный способ вставки снимка

```tsx
<Photo
  src={aboutPhotos.primary.src}
  alt={aboutPhotos.primary.alt}
  shape="portrait"        // 'portrait' | 'wide' | 'square' | 'tall' | 'fill'
  caption={aboutPhotos.primary.caption}
  meta={aboutPhotos.primary.meta}
  priority={false}        // true только для первого экрана
/>
```

Сам делает ч/б-фильтр, зум и проявление подписи при наведении, `loading="lazy"`. Прямые `<img>` в секциях не используются (кроме hero-подложки с параллаксом).

### `Marquee` — разделитель

```tsx
<Marquee items={marqueeItems} speed={52} />
```

Декоративный, `aria-hidden`, останавливается при наведении.

### Правила оформления

- Хайрлайны (`--hairline*`) вместо тяжёлых рамок
- `--border-radius: 0` — скруглений нет
- Эмодзи в UI не используются (ломают монохром)
- Динамические значения — только через CSS-переменные (`--delay`, `--progress`, `--speed`), не через inline-стили

---

## Фотографии

27 снимков лежат в `Public/` и отдаются как `/1.jpg` … `/28.jpg`. Нумерация не сплошная: есть `1.jpg` … `23.jpg` и `25.jpg` … `28.jpg`, **файла `24.jpg` не существует**. За это отвечает `publicDir: 'Public'` в `vite.config.js` — **без этой строки Vite ищет `public/`, и картинки начинают отдавать `index.html`**.

Подключение — только через реестр `src/data/photos.ts` строками, без `import`:

```ts
export const heroPhoto = asset(1, 'NOVA PROJECT — джаз-квинтет на сцене', LANDSCAPE);
export const galleryPhotos: PhotoAsset[] = [asset(7, '…', LANDSCAPE, 'Полный зал', 'Live')];
```

| Экспорт | Снимок | Где |
|---------|--------|-----|
| `heroPhoto` | `1.jpg` | подложка первого экрана |
| `aboutPhotos.primary` / `.secondary` | `13.jpg` / `3.jpg` | О коллективе |
| `repertoirePhotos.tall` / `.square` | `14.jpg` / `9.jpg` | мозаика репертуара |
| `audioPhoto` | `19.jpg` | Звук |
| `formatPhotos.concert` / `.ambient` | `4.jpg` / `6.jpg` | Формат вечера |
| `pricingPhoto` | `17.jpg` | Стоимость |
| `bookingPhoto` | `12.jpg` | Заявка |
| `contactPhoto` | `11.jpg` | Контакты |
| `galleryPhotos` | 15 снимков | Хроника (11 показываются сразу, `GALLERY_INITIAL_COUNT`) |

**Замена снимка = замена файла с тем же номером**, код менять не нужно. У каждого снимка есть `orientation` (`landscape` / `portrait`) — она должна соответствовать реальному кадру, иначе `object-fit: cover` обрежет его неудачно.

Из 27 файлов задействованы 26 — свободен только `28.jpg`, его можно использовать в новом блоке.

**Подача:** `--photo-filter: grayscale(1) contrast(1.06) brightness(0.82)` → `--photo-filter-active: grayscale(0) contrast(1.02) brightness(0.98)` при наведении. Снимки тёмные и насыщенные, поэтому ч/б держит монохром палитры, а цвет на hover становится наградой за взаимодействие. Hero-подложка остаётся ч/б всегда.

> Подписи и `alt` написаны «по смыслу», без просмотра кадров — их стоит уточнить под конкретные снимки.

---

## Данные

Все контентные данные вынесены в `src/data/` — редактируйте соответствующий файл для обновления контента.

| Файл | Экспорты | Что содержит |
|------|----------|--------------|
| `photos.ts` | `heroPhoto`, `aboutPhotos`, `repertoirePhotos`, `audioPhoto`, `formatPhotos`, `pricingPhoto`, `bookingPhoto`, `contactPhoto`, `galleryPhotos`, `GALLERY_INITIAL_COUNT`, `PhotoAsset` | Реестр фотографий |
| `audio.ts` | `tracks`, `Track` | 5 треков: название, артист, длительность, форма волны |
| `content.ts` | `marqueeItems`, `heroMeta`, `heroGenres`, `bookingSteps` | Бегущие строки, метрики hero, слова печатающейся строки, шаги заявки |
| `bandMembers.ts` | `bandMembers`, `homeBandMembers`, `BandMember` | Состав (5 музыкантов) |
| `repertoire.ts` | `repertoire`, `RepertoireItem` | 6 программ |
| `contacts.ts` | `contactInfo` | Телефон, VK |
| `format.ts` | `homeFormatOptions`, `HomeFormatOption` | Форматы: длительность + список деталей |
| `pricing.ts` | `pricing`, `includedItems`, `riderNote` | Цена, что входит, райдер |
| `about.ts` | `aboutText`, `teamNote` | Текст «О нас» |
| `booking.ts` | `eventTypes`, `bookingFormatOptions`, `initialBookingForm`, `BookingFormFields` | Конфиг формы |
| `navigation.ts` | `sectionNavItems`, `footerSectionLinks`, `SectionNavItem` + легаси `headerNavItems`, `footerNavItems`, `PageKey` | Якоря навигации |

### Быстрое обновление

| Что изменить | Файл |
|--------------|------|
| Текст «О нас» | `src/data/about.ts` |
| Репертуар | `src/data/repertoire.ts` |
| Форматы выступления | `src/data/format.ts` |
| Цена и включённые услуги | `src/data/pricing.ts` |
| Контакты | `src/data/contacts.ts` |
| Типы мероприятий | `src/data/booking.ts` |
| Состав группы | `src/data/bandMembers.ts` |
| Фотографии | `Public/` + `src/data/photos.ts` |
| Треки | `src/data/audio.ts` |
| Бегущие строки и метрики | `src/data/content.ts` |
| Пункты навигации | `src/data/navigation.ts` |

---

## Стили

Все токены — в `src/styles/variables.css`, который импортируется в `main.tsx`.

### Цветовая палитра (тёмная тема)

| Роль | Токен | Цвет |
|------|-------|------|
| Основной фон | `--bg` | `#0a0a0a` |
| Самый глубокий фон | `--bg-deep` | `#050505` |
| Карточки | `--card-bg` | `#111111` |
| Карточка под курсором | `--card-bg-hover` | `#1a1a1a` |
| Границы | `--border` | `#222222` |
| Активные границы | `--border-hover` | `#333333` |
| Заголовки | `--text-primary` | `#ffffff` |
| Вторичный текст | `--text-secondary` | `#cccccc` |
| Подзаголовки | `--text-tertiary` | `#888888` |
| Третичный текст | `--text-muted` | `#666666` |

Палитра зафиксирована концепцией. Дополнительно в обороте только серые ступени `#444444`, `#555555`, `#e0e0e0`, `#eeeeee`, `#f5f5f5` и полупрозрачный белый/чёрный — **новых цветов быть не должно**.

### Хайрлайны

| Токен | Значение | Использование |
|-------|----------|---------------|
| `--hairline` | `rgba(255,255,255,.08)` | сетки мозаик, разделители |
| `--hairline-soft` | `rgba(255,255,255,.05)` | внутренние линии карточек |
| `--hairline-strong` | `rgba(255,255,255,.18)` | акценты, рамки под курсором |

### Тайминги и слои

| Токен | Значение |
|-------|----------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-soft` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-image` | `1.1s var(--ease-out-expo)` |
| `--z-sidebar` / `--z-header` / `--z-mobile-nav` / `--z-grain` | `90` / `100` / `150` / `9999` |

### Адаптивность

Базовые breakpoints (обязательны для каждой секции):

| Breakpoint | Устройство | Изменения |
|-----------|------------|-----------|
| `> 1024px` | Десктоп | Полная раскладка (2 колонки, мозаики 3×3) |
| `768–1024px` | Планшет | 1 колонка, мозаики 2×2, скрывается рельс |
| `480–768px` | Мобильный | Мобильное меню, вертикальные сетки, снимки 21/9 |
| `< 480px` | Малый мобильный | Уменьшенные отступы и шрифты |

Точечные (там, где действительно нужно):

| Breakpoint | Где | Зачем |
|-----------|-----|-------|
| `≤1280px` | `Header`, `VerticalSidebar` | скрыть рельс, уплотнить навигацию |
| `≤1100px`, `≤900px` | `Header` | промежуточные состояния навигации |
| `1025–1200px` | `AudioSection` | перебалансировать волну, чтобы не обрезалось название трека |
| `≤860px` | `FormatSection` | блоки фото/текст в одну колонку |
| `≤640px` | `GallerySection`, `RepertoireSection` | 2 колонки вместо 3 |
| `max-height: 780px` | `HeroSection` | низкие ноутбуки: уменьшить заголовок |

Плюс `@media (prefers-reduced-motion: reduce)` — отключает зерно, параллакс и анимации появления, и `@media print` — секции всегда видимы.

### Анимации

| Анимация | Где | Описание |
|----------|-----|----------|
| `fade-up` (по умолчанию), `fade-in`, `slide-left`, `slide-right`, `reveal`, `zoom` | `AnimatedSection` | Появление секции при попадании во вьюпорт; задержка через `--delay` |
| `fadeInUp`, `reveal`, `parallax`, `lineGrow`, `blink` | `index.css` | Глобальные кейфреймы |
| `heroIn`, `heroDrift`, `scrollBounce` | `HeroSection` | Появление контента, медленный дрейф подложки, индикатор скролла |
| `equalize` | `AudioSection` | Столбики эквалайзера активного трека |
| `marqueeScroll` | `Marquee` | Бегущая строка |
| `fadeIn`, `pulse`, `slideIn` | `App.css` | Легаси — не используются |

### Типографика

- Inter (Google Fonts), веса 300–900, `display=swap`
- Заголовки секций: `clamp(36px, 5vw, 64px)`
- Hero: `clamp(60px, 40vh, 180px)` для NOVA, `clamp(30px, 20vh, 90px)` для PROJECT
- Body: 14–18px, `line-height: 1.6–1.8`
- Служебные метки: 11–12px с `--tracking-eyebrow: 0.22em`
- Fallback-стек: `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`

---

## Хуки

### `useScrollProgress` / `useActiveSection` — используются

```ts
const { progress, scrolled } = useScrollProgress();  // progress: 0…1, scrolled: scrollY > 40
const active = useActiveSection(SECTION_IDS);        // id секции в средней полосе экрана
```

Нативные события + `requestAnimationFrame`, без gsap. Потребители: `Header` (полоса прогресса и состояние «прокручено») и `VerticalSidebar` (заливка рельса, активный маркер).

`useActiveSection` требует **стабильную ссылку** на массив id — выносите его в модульную константу, иначе подписка будет пересоздаваться на каждом рендере.

### `useIntersectionObserver` — не подключён

Определён в `src/hooks/useIntersectionObserver.ts`, но ни один компонент его не импортирует. `AnimatedSection` использует `IntersectionObserver` напрямую.

### `useScrollAnimation` — не используется

Построен на gsap. Не применять: gsap в проекте заморожен.

---

## Хранилище (Zustand)

Минимальное хранилище `useAppStore`:

```ts
interface AppState {
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
}
```

**Примечание:** роутинг (`currentPage`, `setCurrentPage`) удалён — лендинг работает без роутинга. Фактически состояние скролла живёт в `useScrollProgress`, а не в store.

---

## Зависимости

### Производственные

| Пакет | Назначение | Статус |
|-------|-----------|--------|
| `react` ^18.2.0 | UI-библиотека | ✅ используется |
| `react-dom` ^18.2.0 | Рендеринг | ✅ используется |
| `zustand` ^4.5.0 | Минимальное состояние | ✅ `scrollPosition` |
| `gsap` ^3.15.0 | Анимации | ⚠️ не используется (заморожен) |
| `@lottiefiles/react-lottie-player` ^3.6.0 | Lottie | ⚠️ не используется |
| `lottie-web` ^5.13.0 | Lottie runtime | ⚠️ не используется |

### Разработка

| Пакет | Назначение |
|-------|-----------|
| `typescript` ^5.3.3 | Статическая типизация |
| `vite` ^5.0.8 | Бандлер и dev-сервер |
| `@vitejs/plugin-react` ^4.2.1 | React-плагин для Vite |
| `esbuild` ^0.28.2 | Быстрая JS/CSS-компиляция (используется и для проверки CSS) |
| `@types/react` ^18.2.43 | Типы React |
| `@types/react-dom` ^18.2.25 | Типы ReactDOM |

### Размер сборки (ориентир)

```
dist/index.html                   1.44 kB │ gzip:  0.81 kB
dist/assets/index-*.css          55.44 kB │ gzip: 10.82 kB
dist/assets/index-*.js          186.37 kB │ gzip: 60.91 kB
```

Фотографии копируются в корень `dist/` как есть (`/1.jpg` … `/28.jpg`) — они не проходят через бандлер и не инлайнятся.

---

## Проверка перед коммитом

```bash
# 1. Типы
npx tsc --noEmit

# 2. CSS парсится
Get-ChildItem -Recurse src -Filter *.css | ForEach-Object { npx esbuild $_.FullName --loader:.css=css }

# 3. Сборка
npm run build
```

Дополнительно стоит убедиться, что `document.documentElement.scrollWidth - clientWidth === 0` (нет горизонтального оверфлоу) в диапазоне 360–1600 px.

---

## Известные особенности и ограничения

- **Форма заявки не отправляется.** Бэкенда нет, поэтому submit не имитирует успех: панель переходит в состояние проверки данных и показывает сводку «Заявка готова / Проверьте данные» со ссылками «Позвонить» и «Изменить данные».
- **Аудио — визуальное превью.** Файлов нет, плеер показывает треки и эквалайзер; для реального воспроизведения добавьте поле с URL в `src/data/audio.ts`.
- **Alt и подписи фото обобщённые** — уточните под конкретные кадры.
- **`vite.config.js` перекрывает `vite.config.ts`.** Vite загружает `.js` первым, изменения в `.ts` молча не применяются — правьте `.js`.
- **Orphaned-файлы** `src/pages/About.tsx`, `Artists.tsx`, `Booking.tsx`, `Contacts.tsx` и `src/pages/Home.module.css` не подключены. `Home.module.css` содержит светлую тему — не импортировать.
- **`position: sticky` в колонках секций не работает** и намеренно не используется: колонка сама задаёт высоту строки грида, поэтому у липкого элемента нет хода.

---

## TODO

- [ ] Подключить реальную отправку формы бронирования (API) + состояния загрузки/ошибки
- [ ] Добавить аудиофайлы и реальное воспроизведение в секции «Звук»
- [ ] Уточнить alt-тексты и подписи под конкретные снимки
- [ ] Добавить Intersection Observer для отдельных элементов внутри секций
- [ ] Добавить видео-фон в HeroSection
- [ ] Аналитика (GA4, Яндекс.Метрика)
- [ ] PWA-манифест
- [ ] Аудит и удаление неиспользуемых зависимостей (gsap, lottie-web, lottie-player)
- [ ] Настроить ESLint (скрипт `npm run lint` сейчас не работает)
- [ ] Задействовать оставшиеся снимки из `Public/` в новых блоках

**Сделано:** фотографии группы (27 снимков), SEO-мета-теги и OG, favicon, `lang="ru"`, fallback-шрифты, доступность (`:focus-visible`, `aria-*`, `prefers-reduced-motion`), доступ к скроллу через `rAF` + `passive`-листенеры, `scroll-padding-top` для якорей.

---

## Контактная информация

| Канал | Данные |
|-------|--------|
| Телефон | +7 920 529-10-10 (Дмитрий) |
| VK | novaprojekt |

---

## Референс

**Сайт:** https://nova-speaker.webflow.io/

Заимствованные паттерны:
- Масштаб типографики (`clamp`-based responsive)
- Hero-раскладка (большой заголовок, подзаголовок, CTA)
- Чувство анимаций (fade-in, clip-path reveal, scroll-индикатор)
- Монохромная схема `#0a0a0a` без акцентного цвета

---

## Документация для агентов

Правила и конвенции для AI-агентов (структура, дизайн-система, запреты, чек-лист проверки) — в [`AGENTS.md`](./AGENTS.md).

---

## Лицензия

Приватный проект. Все права защищены.

# AGENTS.md — Инструкции для AI-агентов

Этот файл содержит правила и конвенции для AI-агентов, работающих над проектом **NOVA PROJECT**.

---

## 1. Общие правила

- **Язык:** Код — TypeScript. Комментарии и строки — русский или английский в зависимости от контекста.
- **Компоненты:** Только функциональные компоненты (React 18). Хуки вместо class-компонентов.
- **CSS Modules:** Все стили — в `.module.css` файлах рядом с компонентом. Импорт через `import styles from './Component.module.css'`.
- **Именование классов:** camelCase в CSS Modules (`.heroTitle`, `.memberCard`).
- **Экспорт:** `export default function ComponentName()` для компонентов. Named exports для данных и хуков.
- **Barrel-экспорты:** Используйте `index.ts` для группировки экспортов (`src/data/index.ts`, `src/components/form/index.ts`, `src/components/home-sections/index.ts`).
- **Не копируйте разметку между секциями.** Если блок повторяется в двух и более секциях — выносите его в общий компонент (см. §3). Секции должны собираться из общих примитивов, а не дублировать вёрстку.

---

## 2. Архитектура проекта

### Тип проекта
Одностраничный лендинг (SPA без роутинга). Все секции — в `src/pages/Home.tsx`. Навигация через `scrollIntoView` к секциям по ID.

### Ключевые файлы
| Файл | Назначение |
|------|-----------|
| `src/main.tsx` | Точка входа (ReactDOM + StrictMode). **Импортирует `styles/variables.css` перед `index.css`** — без этого все токены будут неопределены |
| `src/App.tsx` | Корневой компонент (`<Header>` + `<VerticalSidebar>` + `<Home>` + `<Footer>`) |
| `src/pages/Home.tsx` | Лендинг (все секции, обернуты в `<AnimatedSection>`) |
| `src/styles/variables.css` | **Все дизайн-токены** (цвета, хайрлайны, типографика, отступы, z-index) |
| `src/index.css` | Глобальные стили (сброс, шрифты, скроллбар, зерно, @keyframes) |
| `src/App.css` | Легаси-@keyframes (`fadeIn`, `pulse`, `slideIn`) — **не используются** |

### Структура компонентов
```
src/components/
├── Header.tsx              # Навигация (прозрачный над hero → блюр при скролле, полоса прогресса)
├── Footer.tsx              # Футер (3 колонки + водяной знак NOVA PROJECT)
├── VerticalSidebar.tsx     # Рельс прогресса слева с маркерами секций (скрыт ≤1280px)
├── AnimatedSection.tsx     # Scroll-triggered анимации появления
├── SectionHeading.tsx      # Единый заголовок секции (индекс → линия → надзаголовок → h2 → лид)
├── Photo.tsx               # Единая подача фотографии (ч/б → цвет на hover)
├── Marquee.tsx             # Бегущая строка-разделитель
├── Typewriter.tsx          # Печатающаяся строка (используется в hero)
├── LottieAnimation.tsx     # НЕ используется (см. §9)
├── form/                   # Переиспользуемые элементы форм
│   ├── FormInput.tsx
│   ├── FormSelect.tsx
│   ├── FormTextarea.tsx
│   ├── FormRadioCard.tsx
│   └── index.ts
└── home-sections/          # Секции лендинга
    ├── HeroSection.tsx
    ├── AboutSection.tsx
    ├── RepertoireSection.tsx
    ├── AudioSection.tsx
    ├── GallerySection.tsx
    ├── FormatSection.tsx
    ├── PricingSection.tsx
    ├── BookingSection.tsx
    ├── ContactSection.tsx
    └── index.ts
```

### Данные
Все контентные данные — в `src/data/`. Компоненты импортируют данные из `../../data` (barrel), а не из конкретных файлов.

---

## 3. Единая стилистика (главное правило проекта)

Лендинг держится на **редакционной** системе: номер секции, тонкая линия, надзаголовок, крупный заголовок, лид. Любая новая секция обязана собираться из этих примитивов, а не изобретать свою шапку.

### 3.1. `SectionHeading` — заголовок каждой секции

```tsx
<SectionHeading
  index="09"                 // «01»…«08» — сквозная нумерация секций
  eyebrow="Название"         // надзаголовок в верхнем регистре
  title="Заголовок секции"
  lead="Одно-два предложения под заголовком."
  align="left"               // 'left' | 'center'
  size="default"             // 'default' | 'display' (display — для финальных секций)
/>
```

Рендерит ровно один `<h2>` — **не добавляйте в секцию второй `<h2>`**.

### 3.2. Сквозная нумерация секций

Номер из `index` — часть дизайна, он совпадает с порядком секций на странице и с порядком в `VerticalSidebar`:

| № | Секция | ID | Компонент |
|---|--------|----|-----------|
| — | Первый экран | `hero` | `HeroSection` (без `SectionHeading`, внутри `<h1>`) |
| 01 | О коллективе | `about` | `AboutSection` |
| 02 | Репертуар | `repertoire` | `RepertoireSection` |
| 03 | Звук | `audio` | `AudioSection` |
| 04 | Хроника | `gallery` | `GallerySection` |
| 05 | Формат вечера | `format` | `FormatSection` |
| 06 | Стоимость | `pricing` | `PricingSection` |
| 07 | Заявка | `booking` | `BookingSection` |
| 08 | Контакты | `contact` | `ContactSection` |

**При вставке новой секции в середину** пересчитайте номера у последующих секций, в `SECTIONS` внутри `VerticalSidebar.tsx` и при необходимости в `footerSectionLinks`.

### 3.3. `Photo` — единственный способ вставки фотографии

```tsx
<Photo
  src={aboutPhotos.primary.src}
  alt={aboutPhotos.primary.alt}
  shape="portrait"           // 'portrait' | 'wide' | 'square' | 'tall' | 'fill'
  caption={aboutPhotos.primary.caption}
  meta={aboutPhotos.primary.meta}
  priority={false}           // true только для первого экрана
/>
```

Компонент сам делает: ч/б по умолчанию, цвет и лёгкий зум при наведении, подпись поверх снимка, `loading="lazy"`.

- **Прямые `<img>` в секциях запрещены** — кроме hero-подложки, у которой своя логика параллакса.
- `shape="fill"` требует, чтобы у родителя была **определённая высота** (фиксированная строка грида или `position: absolute; inset: 0`). Иначе `height: 100%` не разрешается и снимок растянет секцию по своим натуральным пропорциям — это уже ломалось в мозаике репертуара.

### 3.4. `Marquee` — разделитель между смысловыми блоками

```tsx
<Marquee items={marqueeItems} speed={52} />
```

Декоративный (`aria-hidden`), останавливается при наведении. Используется в `Home.tsx` между крупными блоками. Список строк — `marqueeItems` в `src/data/content.ts`.

### 3.5. Обязательные правила оформления

- **Хайрлайны вместо тяжёлых рамок:** `--hairline`, `--hairline-soft`, `--hairline-strong`.
- **Числа и индексы** (`01`, `4:23`, `70 000 ₽`) — с широким трекингом через `--tracking-*`, а не произвольными размерами.
- **Наклонный курсив** — только для ремарок и примечаний (`.note`).
- **Скруглений нет:** `--border-radius: 0`. Не добавляйте `border-radius` к карточкам и кнопкам.
- **Ховер-физика общая:** `--ease-out-expo`, `--transition-image` для снимков, `--transition-normal` для цвета.
- **Эмодзи в UI не используются** — они ломают монохромную палитру. Данные могут содержать поле `icon`, но оно не рендерится.

---

## 4. Фотографии

### Где лежат
Пул снимков — в **`Public/`**: 27 файлов, `1.jpg` … `23.jpg` и `25.jpg` … `28.jpg` (**номера `24` в пуле нет**). Отдаются по URL `/1.jpg` … `/28.jpg`.

Это работает благодаря `publicDir: 'Public'` в `vite.config.js`. **Без этой строки Vite ищет `public/` и картинки отдают `index.html`** — это уже случалось.

### Как подключаются
Только через реестр `src/data/photos.ts` — **строкой**, без `import`:

```ts
export const heroPhoto = asset(1, 'NOVA PROJECT — джаз-квинтет на сцене', LANDSCAPE);
export const galleryPhotos: PhotoAsset[] = [asset(7, '…', LANDSCAPE, 'Полный зал', 'Live')];
```

```ts
interface PhotoAsset {
  src: string;                 // '/13.jpg'
  alt: string;
  orientation: 'landscape' | 'portrait';
  caption?: string;            // подпись в figcaption
  meta?: string;               // служебная метка справа
}
```

Правила:
- **Не импортируйте снимки из `Public/`** — это константные данные, а не объекты сборки.
- **Замена снимка = замена файла с тем же номером.** Код менять не нужно.
- **`orientation` должна соответствовать реальному кадру:** landscape → широкие слоты, portrait → высокие. Ошибка даёт обрезку по `object-fit: cover`.
- **Один снимок не должен использоваться дважды** на странице.
- **Alt и подписи сейчас написаны «по смыслу», без просмотра кадров** (у агента может не быть доступа к изображениям). Уточняйте их, если видите снимок.

### Подача
`--photo-filter: grayscale(1) contrast(1.06) brightness(0.82)` → `--photo-filter-active: grayscale(0) contrast(1.02) brightness(0.98)` при наведении. Это осознанное решение: снимки тёмные и насыщенные, ч/б держит монохром палитры, а цвет на hover становится «наградой» за взаимодействие. **Не отключайте фильтр** и не делайте цветных фото по умолчанию.

Исключение: hero-подложка остаётся ч/б всегда (у неё нет ховера).

---

## 5. Стилизация

### Цветовая палитра
```css
/* Тёмная тема — использовать во ВСЕХ секциях. Менять палитру нельзя. */
--bg:            #0a0a0a;   /* Основной фон */
--bg-deep:       #050505;   /* Самый глубокий фон */
--card-bg:       #111111;   /* Фон карточек */
--card-bg-hover: #1a1a1a;   /* Карточка под курсором */
--border:        #222222;   /* Границы карточек */
--border-hover:  #333333;   /* Активные границы */
--text-primary:  #ffffff;   /* Заголовки */
--text-secondary:#cccccc;   /* Вторичный текст */
--text-tertiary: #888888;   /* Подзаголовки */
--text-muted:    #666666;   /* Третичный текст */
```

Дополнительно в обороте только «серые» ступени без нового цвета: `#444444`, `#555555`, `#e0e0e0`, `#eeeeee`, `#f5f5f5` и полупрозрачный белый/чёрный. **Новый цвет = нарушение концепции.**

### Хайрлайны и подача фото
```css
--hairline:        rgba(255, 255, 255, 0.08);
--hairline-soft:   rgba(255, 255, 255, 0.05);
--hairline-strong: rgba(255, 255, 255, 0.18);
--photo-filter:        grayscale(1) contrast(1.06) brightness(0.82);
--photo-filter-active: grayscale(0) contrast(1.02) brightness(0.98);
```

### Тайминги и слои
```css
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-soft:        cubic-bezier(0.4, 0, 0.2, 1);
--transition-image: 1.1s var(--ease-out-expo);   /* для снимков */
--z-sidebar: 90;  --z-header: 100;  --z-mobile-nav: 150;  --z-grain: 9999;
```

### Адаптивные breakpoints

Базовые (обязательные для каждой секции):

```css
/* Десктоп: > 1024px (по умолчанию) */
@media (max-width: 1024px) { /* планшет */ }
@media (max-width: 768px)  { /* мобильный */ }
@media (max-width: 480px)  { /* малый мобильный */ }
```

Точечные (только там, где нужно; не дублируйте их в новых секциях без причины):

| Breakpoint | Где | Зачем |
|-----------|-----|-------|
| `≤1280px` | `Header`, `VerticalSidebar` | скрыть рельс, уплотнить навигацию |
| `≤1100px`, `≤900px` | `Header` | промежуточные состояния навигации |
| `1025–1200px` | `AudioSection` | плеер в узкой колонке: перебалансировать волну, чтобы не обрезалось название |
| `≤860px` | `FormatSection` | блоки фото/текст в одну колонку |
| `≤640px` | `GallerySection`, `RepertoireSection` | 2 колонки вместо 3 |
| `max-height: 780px` | `HeroSection` | низкие ноутбуки: уменьшить заголовок |

Плюс обязательные `@media (prefers-reduced-motion: reduce)` и `@media print` там, где есть анимация.

### Типографика
- Шрифт: Inter (Google Fonts), веса 300–900
- Заголовки секций: `clamp(36px, 5vw, 64px)`
- Hero: `clamp(60px, 40vh, 180px)` для NOVA, `clamp(30px, 20vh, 90px)` для PROJECT
- Body: 14–18px с `line-height: 1.6–1.8`
- Служебные метки: `11–12px` + `--tracking-eyebrow: 0.22em`

---

## 6. Хуки и утилиты

### `src/hooks/useScrollProgress.ts` — используется

```ts
const { progress, scrolled } = useScrollProgress();   // progress: 0…1, scrolled: scrollY > 40
const active = useActiveSection(SECTION_IDS);         // id секции в средней полосе экрана
```

- Оба хука на нативных событиях + `requestAnimationFrame` (без gsap).
- `useActiveSection` принимает **стабильную ссылку** на массив id: выносите его в модульную константу (`const SECTION_IDS = SECTIONS.map(...)`), иначе подписка будет пересоздаваться на каждом рендере.
- Потребители: `Header` (полоса прогресса, `scrolled`) и `VerticalSidebar` (заливка рельса, активный маркер).

### `src/hooks/useIntersectionObserver.ts` — **не используется**
Определён, но ни один компонент его не импортирует. Если нужен — используйте, иначе не трогайте.

### `src/hooks/useScrollAnimation.ts` — **не используется**
Построен на gsap. **Не применять** (см. §9).

### `AnimatedSection`
Обёртка секций с анимацией появления при скролле:

```tsx
<AnimatedSection animation="fade-up" delay={0}>
  <AboutSection id="about" />
</AnimatedSection>
```

Поддерживаемые значения `animation`: `fade-up` (по умолчанию), `fade-in`, `slide-left`, `slide-right`, `reveal`, `zoom`. Задержка — через `delay` (мс), внутри прокидывается в `--delay`.

**Критично:** «показанное» состояние описано селектором из двух классов — `.animatedSection.animated`. При равной специфичности победил бы `.fade-up`/`.zoom`/`.reveal`, объявленный ниже в файле, и секция навсегда осталась бы смещённой на 48px, уменьшенной или обрезанной (эта ошибка уже была в проекте: она обрезала верх галереи на 12%, а шесть секций держала со сдвигом 48px). **Не понижайте специфичность этого селектора и не переносите его выше классов анимаций.**

Если `IntersectionObserver` недоступен, компонент сразу помечает секцию показанной — контент не должен «застревать» в `opacity: 0`.

### Осторожно: `position: sticky` внутри секций
Колонки секций — это элементы грида, поэтому их содержащий блок (grid area) равен высоте строки, то есть их собственной высоте. **Липкий элемент в такой колонке не имеет хода и `sticky` не сработает.** Чтобы липкость заработала, липким должен быть внутренний элемент обёртки, растянутой на всю высоту строки, а не сама колонка.

---

## 7. Правила навигации

- **Header:** навигация из `sectionNavItems` — `about`, `repertoire`, `audio`, `gallery`, `contact`
- **Footer:** полный список из `footerSectionLinks` — все 8 секций + «Наверх»
- **VerticalSidebar:** 9 маркеров (включая `hero`), список `SECTIONS` внутри компонента
- **Лого (Header):** клик → `window.scrollTo({ top: 0, behavior: 'smooth' })`
- **Hero CTA:** клик → скролл к `#booking`
- Мобильное меню закрывается при клике на пункт
- Якоря не прячутся под шапкой благодаря `scroll-padding-top: calc(var(--header-height) + 24px)` в `index.css` — **не удаляйте это свойство** при добавлении новых якорей

---

## 8. Формы

BookingSection использует `Form*` компоненты из `src/components/form/`:
- `FormInput` — text, email, tel, date inputs
- `FormSelect` — select с опциями
- `FormTextarea` — textarea
- `FormRadioCard` — radio-кнопки в виде карточек

Формы тёмные: прозрачный фон, `#333333` границы, `#ffffff` текст.

**Отправки нет.** Бэкенда у проекта нет, поэтому submit не делает вид, что заявка ушла: он переводит панель в состояние проверки данных (`isReady`) и показывает сводку «Заявка готова / Проверьте данные» со ссылками «Позвонить» и «Изменить данные».

**Если подключаете API:** не возвращайте текст вида «Заявка отправлена», пока не появится реальный ответ сервера, и обработайте состояния загрузки и ошибки.

---

## 9. Запреты и ограничения

- **НЕ** используйте роутинг (`react-router`) — проект лендинг
- **НЕ** смешивайте light и dark темы — все секции тёмные (`#0a0a0a`)
- **НЕ** добавляйте inline-стили там, где есть CSS Modules (динамика — только через CSS-переменные на `style`: `--delay`, `--progress`, `--speed`)
- **НЕ** меняйте структуру данных без необходимости — редактируйте файлы в `src/data/`
- **НЕ** удаляйте orphaned файлы (`src/pages/About.tsx`, `src/pages/Artists.tsx`, `src/pages/Booking.tsx`, `src/pages/Contacts.tsx`, `src/pages/Home.module.css`) — они могут понадобиться. `Home.module.css` содержит светлую тему и не подключён: **не импортируйте его**
- **НЕ** трогайте `gsap`, `lottie-web`, `@lottiefiles/react-lottie-player` и `src/components/LottieAnimation.tsx` — установлены, но не используются
- **НЕ** добавляйте эмодзи в UI и не вводите новые цвета
- **НЕ** правьте `vite.config.ts` вместо `vite.config.js`: Vite загружает `.js` первым, изменения в `.ts` молча не применяются

---

## 10. Проверка кода

Перед завершением работы:

1. **Типы:**
   ```bash
   npx tsc --noEmit
   ```

2. **CSS парсится** (быстро, без запуска сервера):
   ```bash
   Get-ChildItem -Recurse src -Filter *.css | ForEach-Object { npx esbuild $_.FullName --loader:.css=css }
   ```

3. **Все `styles.*` реально существуют в своём `.module.css`** — этот чек уже находил потерянные классы (`.nav`, `.meta` в футере):
   ```powershell
   Get-ChildItem -Recurse src -Filter *.tsx | ForEach-Object {
     $css = [IO.Path]::ChangeExtension($_.FullName, '.module.css')
     if (-not (Test-Path $css)) { return }
     $defined = @{}
     [regex]::Matches((Get-Content -Raw $css), '\.([A-Za-z][A-Za-z0-9_\-]*)') | ForEach-Object { $defined[$_.Groups[1].Value] = $true }
     $refs = [regex]::Matches((Get-Content -Raw $_.FullName), 'styles\.([A-Za-z0-9_]+)') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
     $miss = $refs | Where-Object { -not $defined.ContainsKey($_) }
     if ($miss) { "MISSING in $($_.Name): $($miss -join ', ')" }
   }
   ```

4. **Адаптивность:** breakpoints 1024 / 768 / 480 px обязательны; проверяйте, что `document.documentElement.scrollWidth - clientWidth === 0` (горизонтального оверфлоу быть не должно) в диапазоне 360–1600 px.

5. **Что «показанное» состояние реально применяется** — проверьте computed-стили обёрток `AnimatedSection`: после прокрутки `transform` должен быть единичным, `clip-path: inset(0px)`, `opacity: 1`. Это ловит ошибку специфичности из §6.

6. **Сборка:**
   ```bash
   npm run build     # = tsc && vite build
   ```

7. **Barrel-экспорты** в `index.ts` обновлены.

> `npm run lint` в проекте **не работает**: eslint не установлен и конфига нет. Не полагайтесь на него.

---

## 11. Заметки

- Референс для анимаций и типографики: https://nova-speaker.webflow.io/
- Проект использует **строгий режим TypeScript** — избегайте `any`
- Zustand store минимален (`scrollPosition` только) — НЕ добавляйте роутинг в store. Фактически состояние скролла живёт в `useScrollProgress`, а не в store
- Зерно плёнки — фиксированный SVG-шум на `body::after` (`--z-grain`), отключается при `prefers-reduced-motion`
- `Public/` содержит 27 снимков, из них 26 задействованы в реестре: свободен только `28.jpg`, а номера `24` в пуле нет. **Не ссылайтесь на `/24.jpg`** — файла не существует
- Известный технический долг: нет отправки формы (нет бэкенда), alt-тексты фото обобщённые, аудио — визуальное превью без файлов, `App.css`-кейфреймы мертвы

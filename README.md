# NOVA PROJECT — Джаз-квинтет Лендинг

Одностраничный лендинг для джаз-квинтета **NOVA PROJECT**, предоставляющего живую музыку на мероприятиях.

---

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (Vite HMR)
npm run dev

# Сборка для production
npm run build

# Предпросмотр production-сборки
npm run preview

# Лinting (ESLint)
npm run lint
```

Dev-сервер: [http://localhost:5173](http://localhost:5173)

---

## Стек и архитектура

| Компонент       | Выбор                                     |
|-----------------|-------------------------------------------|
| Язык            | TypeScript (строгий режим)                |
| Бандлер         | Vite 5                                    |
| Фреймворк       | React 18 (функциональные компоненты)      |
| Состояние       | Zustand (минимальное хранилище)           |
| Стили           | CSS Modules + глобальный `index.css`      |
| Шрифт           | Inter (Google Fonts)                      |
| Анимации        | Intersection Observer + CSS transitions   |

### Архитектурные решения

1. **Одностраничный лендинг** — все секции в `src/pages/Home.tsx`, навигация через `scrollIntoView`.
2. **CSS Modules** — изолированные стили для каждого компонента, без конфликтов.
3. **Тёмная тема** — единая палитра `#0a0a0a` фон, `#ffffff` текст.
4. **Data-first подход** — контент вынесен в `src/data/`, компоненты работают с данными.
5. **Адаптивность** — breakpoints: 480px / 768px / 1024px.

---

## Структура проекта

```
src/
├── main.tsx                    # Точка входа (ReactDOM + StrictMode)
├── App.tsx                     # Корневой компонент (Header + Home + Footer)
├── App.css                     # Глобальные анимации (@keyframes fadeIn, pulse, slideIn)
├── index.css                   # Сброс, шрифты, скроллбар, @keyframes (fadeInUp, reveal, parallax)
│
├── components/
│   ├── Header.tsx              # Навигация (якоря к секциям, мобильное меню)
│   ├── Header.module.css       # Стили хедера (фиксированный, backdrop-blur)
│   ├── Footer.tsx              # Футер (якоря к секциям + копирайт + "Наверх")
│   ├── Footer.module.css       # Стили футера
│   ├── AnimatedSection.tsx     # Обёртка для scroll-triggered анимаций
│   ├── AnimatedSection.module.css  # CSS для fade-up / fade-in / slide-left / slide-right
│   │
│   ├── form/                   # Переиспользуемые элементы форм
│   │   ├── FormInput.tsx       # Текстовые, email, tel, date inputs
│   │   ├── FormInput.module.css
│   │   ├── FormSelect.tsx      # Select с кастомным стилем
│   │   ├── FormSelect.module.css
│   │   ├── FormTextarea.tsx    # Textarea
│   │   ├── FormTextarea.module.css
│   │   ├── FormRadioCard.tsx   # Radio-кнопки в виде карточек
│   │   ├── FormRadioCard.module.css
│   │   └── index.ts            # Barrel-экспорты
│   │
│   └── home-sections/          # Секции лендинга
│       ├── HeroSection.tsx     # Главный экран (NOVA PROJECT, CTA)
│       ├── HeroSection.module.css
│       ├── AboutSection.tsx    # О коллективе (5 участников)
│       ├── AboutSection.module.css
│       ├── RepertoireSection.tsx   # Репертуар (6 жанров)
│       ├── RepertoireSection.module.css
│       ├── FormatSection.tsx   # Формат выступления (2 карточки)
│       ├── FormatSection.module.css
│       ├── PricingSection.tsx  # Стоимость и что входит
│       ├── PricingSection.module.css
│       ├── BookingSection.tsx  # Форма бронирования
│       ├── BookingSection.module.css
│       ├── ContactSection.tsx  # Контакты (телефон, VK)
│       ├── ContactSection.module.css
│       └── index.ts            # Barrel-экспорты
│
├── hooks/
│   └── useIntersectionObserver.ts   # Hook для scroll-triggered анимаций
│
├── pages/
│   └── Home.tsx               # Единственная страница — лендинг
│
├── data/                      # Динамические данные
│   ├── index.ts               # Barrel-экспорты
│   ├── bandMembers.ts         # Состав группы
│   ├── repertoire.ts          # Репертуар
│   ├── contacts.ts            # Контактная информация
│   ├── format.ts              # Форматы выступления
│   ├── pricing.ts             # Стоимость и включённые услуги
│   ├── about.ts               # Текст "О нас"
│   ├── booking.ts             # Конфиг формы бронирования
│   └── navigation.ts          # Конфиг навигации
│
└── store/
    └── store.ts               # Zustand-хранилище (scrollPosition)
```

---

## Секции лендинга (сверху вниз)

| # | Секция       | ID         | Описание                                              |
|---|-------------|------------|-------------------------------------------------------|
| 1 | Hero        | `hero`     | Заголовок NOVA PROJECT, подзаголовок, CTA → бронирование |
| 2 | О нас       | `about`    | Описание группы, 5 участников-иконок                  |
| 3 | Репертуар   | `repertoire` | 6 карточек жанров                                   |
| 4 | Формат      | `format`   | Основная программа / Фоновый сет                      |
| 5 | Стоимость   | `pricing`  | Цена, что входит в стоимость                          |
| 6 | Бронирование| `booking`  | Форма заявки (тип, дата, формат, контакты)            |
| 7 | Контакты    | `contact`  | Телефон, VK                                          |

Все секции обернуты в `<AnimatedSection>` для fade-up анимации при скролле.

---

## Компоненты

### Header

- **Тип:** Fixed навигация с `backdrop-filter: blur(10px)`
- **Десктоп:** горизонтальная навигация с якорями (О нас, Репертуар, Бронирование, Контакты)
- **Мобильный (< 768px):** гамбургер-меню с полноэкранным оверлеем
- **Прокрутка:** `scrollIntoView({ behavior: 'smooth' })` к секциям по ID
- **Лого:** клик → `scrollTo(0, 0)` (верх страницы)

### Footer

- Якорные ссылки на все секции
- Кнопка "Наверх" → `scrollTo(0, 0)`
- Копирайт с автообновляемым годом (`new Date().getFullYear()`)

### HeroSection

Заголовок с двумя строками:
- **NOVA** — `clamp(60px, 40vh, 180px)` — 40% высоты экрана
- **PROJECT** — `clamp(30px, 20vh, 90px)` — 50% от NOVA
- CTA-кнопка прокручивает к `#booking`
- Scroll-индикатор с bounce-анимацией

### AnimatedSection

Обёртка для секций с scroll-triggered анимациями:
- **Анимации:** `fade-up`, `fade-in`, `slide-left`, `slide-right`
- **Реализация:** Intersection Observer (threshold 0.1, rootMargin -50px снизу)
- **Продолжительность:** 0.8s с cubic-bezier easing
- **Задержка:** настраиваемая через `--delay` CSS-переменную

### BookingSection

Полная форма бронирования с `Form*` компонентами:
1. Тип мероприятия (select)
2. Дата (date input)
3. Город / площадка (text)
4. Формат выступления (radio cards)
5. Email (email input)
6. Телефон (tel input)
7. Дополнительная информация (textarea)

**Отправка:** `console.log(formData)` — для production замените на API-интеграцию.

---

## Данные

Все контентные данные вынесены в `src/data/` — редактируйте соответствующий файл для обновления контента.

### Файлы данных

| Файл             | Экспорты                                          | Что содержит                          |
|------------------|---------------------------------------------------|---------------------------------------|
| `bandMembers.ts` | `bandMembers`, `homeBandMembers`, `BandMember`    | Состав группы (для страницы артистов и home) |
| `repertoire.ts`  | `repertoire`, `RepertoireItem`                    | 6 жанров репертуара                   |
| `contacts.ts`    | `contactInfo`                                     | Телефон, VK, ссылки                   |
| `format.ts`      | `homeFormatOptions`, `HomeFormatOption`           | Форматы выступления                   |
| `pricing.ts`     | `pricing`, `includedItems`, `riderNote`           | Цена, что входит, rider note         |
| `about.ts`       | `aboutText`, `teamNote`                           | Текст "О нас"                         |
| `booking.ts`     | `eventTypes`, `bookingFormatOptions`, `initialBookingForm`, `BookingFormFields` | Конфиг формы бронирования |
| `navigation.ts`  | `headerNavItems`, `footerNavItems`, `PageKey`, `NavItem`, `FooterNavItem` | Конфиг навигации |

### Быстрое обновление

| Что изменить              | Файл                          |
|---------------------------|-------------------------------|
| Текст "О нас"             | `src/data/about.ts`           |
| Репертуар                 | `src/data/repertoire.ts`      |
| Форматы выступления       | `src/data/format.ts`          |
| Цена и включённые услуги  | `src/data/pricing.ts`         |
| Контакты                  | `src/data/contacts.ts`        |
| Типы мероприятий          | `src/data/booking.ts`         |
| Состав группы             | `src/data/bandMembers.ts`     |
| Навигация                 | `src/data/navigation.ts`      |

---

## Стили

### Цветовая палитра (тёмная тема)

| Роль               | Цвет         | Использование                    |
|--------------------|--------------|----------------------------------|
| Фон                | `#0a0a0a`    | Основной фон всех секций         |
| Карточки           | `#111111`    | Фон карточек (repertoire, format) |
| Границы            | `#222222`    | Границы карточек                 |
| Активные границы   | `#333333`    | Focus, hover состояния           |
| Заголовки          | `#ffffff`    | h1, h2, h3                       |
| Основной текст     | `#cccccc`    | Вторичный текст                  |
| Терциарный текст   | `#888888`    | Подзаголовки, подписи            |
| Описания           | `#666666`    | Третичный текст                  |

### Адаптивность

| Breakpoint   | Устройство       | Изменения                          |
|-------------|------------------|-----------------------------------|
| `> 1024px`  | Десктоп          | Полная раскладка                  |
| `768–1024px`| Планшет          | 2-колоночные сетки → 1 колонка    |
| `480–768px` | Мобильный        | Гамбургер-меню, вертикальные сетки |
| `< 480px`   | Малый мобильный  | Уменьшенные отступы и шрифты      |

### Анимации

| Анимация     | Описание                                    | Где используется              |
|-------------|---------------------------------------------|-------------------------------|
| `fadeInUp`  | Плавное появление снизу                     | Глобальная (index.css)        |
| `fadeIn`    | Fade-in при загрузке                        | Глобальная (App.css)          |
| `reveal`    | Clip-path раскрытие                         | Глобальная (index.css)        |
| `parallax`  | Параллакс-сдвиг                             | Глобальная (index.css)        |
| `bounce`    | Индикатор скролла                           | HeroSection                   |
| `fade-up`   | Появление снизу при скролле                 | AnimatedSection               |
| `fade-in`   | Простое появление                           | AnimatedSection               |
| `slide-left`| Появление слева                            | AnimatedSection               |
| `slide-right`| Появление справа                           | AnimatedSection               |

### Шрифты

- **Шрифт:** Inter (Google Fonts)
- **Вес:** 300–900
- **Fallback:** `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`

---

## Хуки

### useIntersectionObserver

Hook для scroll-triggered анимаций:

```ts
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function MyComponent() {
  const ref = useIntersectionObserver({
    threshold: 0.1,      // Порог видимости (0–1)
    rootMargin: '0px',   // Дополнительная область видимости
    className: 'animate', // CSS-класс при появлении
    triggerOnce: true,   // Анимируем только один раз
  });

  return <div ref={ref}>Анимированный контент</div>;
}
```

---

## Хранилище (Zustand)

Минимальное хранилище `useAppStore`:

```ts
interface AppState {
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
}
```

**Примечание:** Роутинг (`currentPage`, `setCurrentPage`) удалён — лендинг работает без роутинга.

---

## Зависимости

### Производственные

| Пакет | Назначение | Статус |
|-------|-----------|--------|
| `react` ^18.2.0 | UI-библиотека | ✅ Активно используется |
| `zustand` ^4.5.0 | Минимальное состояние | ✅ scrollPosition |
| `gsap` ^3.15.0 | Анимации | ⚠️ Не используется (оставлен для будущего использования) |
| `@lottiefiles/react-lottie-player` ^3.6.0 | Lottie-анимации | ⚠️ Не используется (оставлен для будущего использования) |
| `lottie-web` ^5.13.0 | Lottie runtime | ⚠️ Не используется (оставлен для будущего использования) |

### Разработка

| Пакет | Назначение |
|-------|-----------|
| `typescript` ^5.3.3 | Статическая типизация |
| `vite` ^5.0.8 | Бандлер и dev-сервер |
| `@vitejs/plugin-react` ^4.2.1 | React-плагин для Vite |
| `esbuild` ^0.28.2 | Быстрая JS-компиляция |
| `@types/react` ^18.2.43 | Типы React |
| `@types/react-dom` ^18.2.25 | Типы ReactDOM |

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
- Чувство анимаций (fade-in, clip-path reveal, bounce scroll)
- Цветовая схема (монохром `#0a0a0a` с контрастным акцентом)

---

## TODO

- [ ] Подключить реальную отправку формы бронирования (API)
- [ ] Добавить Intersection Observer для отдельных элементов внутри секций
- [ ] Добавить изображения/фотографии группы
- [ ] Добавить видео-фон в HeroSection
- [ ] Оптимизировать производительность анимаций
- [ ] Добавить аналитику (GA4, Яндекс.Метрика)
- [ ] Добавить SEO-мета-теги
- [ ] Добавить PWA-манифест
- [ ] Добавить fallback-шрифты
- [ ] Добавить доступность (ARIA, keyboard navigation)
- [ ] Аудит unused зависимостей (gsap, lottie-web)

---

## Лицензия

Приватный проект. Все права защищены.

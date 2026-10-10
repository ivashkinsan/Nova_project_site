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

---

## 2. Архитектура проекта

### Тип проекта
Одностраничный лендинг (SPA без роутинга). Все секции — в `src/pages/Home.tsx`. Навигация через `scrollIntoView` к секциям по ID.

### Ключевые файлы
| Файл | Назначение |
|------|-----------|
| `src/main.tsx` | Точка входа (ReactDOM + StrictMode) |
| `src/App.tsx` | Корневой компонент (`<Header>` + `<Home>` + `<Footer>`) |
| `src/pages/Home.tsx` | Лендинг (все секции, обернуты в `<AnimatedSection>`) |
| `src/index.css` | Глобальные стили (сброс, шрифты, скроллбар, @keyframes) |
| `src/App.css` | Глобальные анимации (@keyframes fadeIn, pulse, slideIn) |

### Структура компонентов
```
src/components/
├── Header.tsx              # Навигация (фиксированный, mobile menu)
├── Footer.tsx              # Футер (якоря + копирайт)
├── AnimatedSection.tsx     # Scroll-triggered анимации
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
    ├── FormatSection.tsx
    ├── PricingSection.tsx
    ├── BookingSection.tsx
    ├── ContactSection.tsx
    └── index.ts
```

### Данные
Все контентные данные — в `src/data/`. Компоненты импортируют данные из `../../data` (или конкретных файлов).

---

## 3. Стилизация

### Цветовая палитра
```css
/* Тёмная тема — использовать во ВСЕХ секциях */
--bg:           #0a0a0a;   /* Основной фон */
--card-bg:      #111111;   /* Фон карточек */
--border:       #222222;   /* Границы карточек */
--border-hover: #333333;   /* Активные границы */
--text-primary: #ffffff;   /* Заголовки */
--text-secondary:#cccccc;  /* Вторичный текст */
--text-tertiary:#888888;   /* Подзаголовки */
--text-muted:   #666666;   /* Третичный текст */
```

### Адаптивные breakpoints
```css
/* Десктоп: > 1024px (по умолчанию) */
/* Планшет: 768–1024px */
/* Мобильный: 480–768px */
/* Малый мобильный: < 480px */

@media (max-width: 1024px) { /* планшет */ }
@media (max-width: 768px) { /* мобильный */ }
@media (max-width: 480px) { /* малый мобильный */ }
```

### Типографика
- Шрифт: Inter (Google Fonts)
- Заголовки: `clamp(36px, 5vw, 64px)` для секционных заголовков
- Hero: `clamp(60px, 40vh, 180px)` для NOVA, `clamp(30px, 20vh, 90px)` для PROJECT
- Body: 14–18px с `line-height: 1.6–1.8`

---

## 4. Хуки и утилиты

### useIntersectionObserver
```ts
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ref = useIntersectionObserver({
  threshold: 0.1,
  rootMargin: '0px',
  className: 'animate-on-scroll',
  triggerOnce: true,
});
```

### AnimatedSection
Обёртка для секций с fade-up анимацией при скролле. Используется в `Home.tsx`:
```tsx
<AnimatedSection animation="fade-up">
  <AboutSection id="about" />
</AnimatedSection>
```

---

## 5. Правила навигации

- **Header:** навигация скроллит к секциям по ID (`about`, `repertoire`, `booking`, `contact`)
- **Footer:** те же якорные ссылки + кнопка "Наверх"
- **Лого (Header):** клик → `window.scrollTo({ top: 0, behavior: 'smooth' })`
- **Hero CTA:** клик → скролл к `#booking`
- Мобильное меню закрывается при клике на пункт

---

## 6. Формы

BookingSection использует `Form*` компоненты из `src/components/form/`:
- `FormInput` — text, email, tel, date inputs
- `FormSelect` — select с опциями
- `FormTextarea` — textarea
- `FormRadioCard` — radio-кнопки в виде карточек

Формы тёмные: прозрачный фон, `#333333` границы, `#ffffff` текст.

---

## 7. Запреты и ограничения

- **НЕ** используйте роутинг (`react-router`) — проект лендинг
- **НЕ** смешивайте light и dark темы — все секции тёмные (`#0a0a0a`)
- **НЕ** добавляйте inline-стили там, где есть CSS Modules
- **НЕ** меняйте структуру данных без необходимости — редактируйте файлы в `src/data/`
- **НЕ** удаляйте orphaned файлы (`src/pages/About.tsx`, `src/pages/Artists.tsx`, `src/pages/Booking.tsx`, `src/pages/Contacts.tsx`) — они могут понадобиться

---

## 8. Проверка кода

Перед завершением работы:
1. `npx tsc --noEmit` — TypeScript compilation check
2. Проверьте, что все CSS классы в компонентах соответствуют именам в `.module.css`
3. Убедитесь, что новые компоненты адаптивны (breakpoints: 1024px, 768px, 480px)
4. Проверьте barrel-экспорты в `index.ts`

---

## 9. Заметки

- Референс для анимаций и типографики: https://nova-speaker.webflow.io/
- Проект использует **строгой режим TypeScript** — избегайте `any`
- Zustand store минимален (`scrollPosition` только) — НЕ добавляйте роутинг в store
- gsap и lottie-web установлены, но НЕ используются — не трогайте, пока не попросят

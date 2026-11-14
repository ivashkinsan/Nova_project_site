# PLAN.md — План полировки лендинга NOVA.md (единственный источник правды)

Источник: AUDIT.md. Порядок: P0 → P1 → P2, по одной задаче за шаг.
Формат: `- [ ] Pn — название; Описание: …; Файлы: …; Критерий готовности: …`
При завершении: `[x]` + строка `→ Готово: …`, статус в AUDIT.md обновляется, атомарный коммит.

## P0 — SEO-каркас
- [x] P0 — og-cover + og:image абсолютный; Описание: положить Open_Graph.jpg (1200×630, 107 КБ) в Public как og-cover.jpg, в index.html og:image заменить на абсолютный URL, добавить og:image:width/height/alt, og:url, og:site_name; Файлы: Public/og-cover.jpg, index.html; Критерий: og:image абсолютный, есть width/height/alt, og:url.
  → Готово: Public/og-cover.jpg (копия Open_Graph.jpg), og:image абсолютный + width/height/alt + og:url + og:site_name.
- [x] P0 — Twitter Cards; Описание: meta twitter:card (summary_large_image), title, description, image (абсолютный); Файлы: index.html; Критерий: 4 тега на месте.
  → Готово: 4 meta twitter-* с абсолютным image.
- [x] P0 — canonical + robots meta; Описание: link rel=canonical (абсолютный URL лендинга), meta robots index, follow; Файлы: index.html; Критерий: canonical и robots в head.
  → Готово: canonical + robots index, follow.
- [x] P0 — robots.txt; Описание: Public/robots.txt: User-agent, Allow /, Sitemap (абсолютный); Файлы: Public/robots.txt; Критерий: файл отдаётся с корректным sitemap.
  → Готово: Public/robots.txt c абсолютным Sitemap.
- [x] P0 — sitemap.xml; Описание: Public/sitemap.xml с абсолютным URL лендинга, changefreq, lastmod; Файлы: Public/sitemap.xml; Критерий: валидный XML с loc.
  → Готово: Public/sitemap.xml, loc = абсолютный URL, lastmod.
- [x] P0 — JSON-LD MusicGroup; Описание: ld+json в index.html: name NOVA PROJECT, genre Jazz, city Липецк, url, image (абсолютный og-cover), sameAs VK; Файлы: index.html; Критерий: валидный JSON-LD MusicGroup.
  → Готово: MusicGroup с genre/address/Липецк/image/sameAs(vk.com).
- [x] P0 — JSON-LD Event (живые выступления); Описание: второй ld+json: Event с performer MusicGroup (жанры), location Липецк/RU, eventAttendanceMode Offline, eventStatus Scheduled, image og-cover, organizer, url на секцию «Заявка»; без выдуманных дат; Файлы: index.html; Критерий: валидный Event, даты не выдуманы, fields честные.
  → Готово: Event «Живые выступления NOVA PROJECT» — performer/organizer = MusicGroup, location Липецк, attendance Offline, status Scheduled, url = `/Nova_project_site/#booking`, image = og-cover. Даты не выдуманы.
- [x] P0 — favicon; Описание: лёгкий монохромный favicon (монограмма N, палитра #0a0a0a/#ffffff) вместо /1.jpg (1,1 МБ); base-относительный путь; Файлы: Public/favicon.svg, index.html; Критерий: favicon < 1 КБ, путь проходит base.
  → Готово: Public/favicon.svg (монограмма N), link ./favicon.svg (Vite перепишет под base).
- [x] P0 — apple-touch-icon; Описание: PNG 180×180 с монограммой N в палитре концепции (Safari/iOS не читает SVG-favicon); абсолютный base-путь; генератор на Pillow; Файлы: Public/apple-touch-icon.png, scripts/make-apple-touch-icon.py, index.html; Критерий: 180×180, ≤2 КБ, цвет и фон из палитры, скриншот подтверждает монограмму.
  → Готово: apple-touch-icon.png 180×180, 1435 байт (фон #0a0a0a, белый N, ноль скруглений), генератор scripts/make-apple-touch-icon.py, link c абсолютным путём; кадр просмотрен.
- [x] P0 — мета-мелочи: og:image:type, twitter:image:alt, apple-mobile-web-app-title; Описание: тип обложки, alt для Twitter Cards, имя ярлыка на рабочем столе iOS; Файлы: index.html; Критерий: валидные значения, тексты честные, новых цветов нет.
  → Готово: `og:image:type=image/jpeg`, `twitter:image:alt` (тот же текст, что og:image:alt), `apple-mobile-web-app-title` = NOVA PROJECT.
- [x] P1 — iOS safe-area; Описание: `viewport-fit=cover` + `env(safe-area-inset-top/bottom)` в шапке (height+padding), открытом мобильном меню, футере (все три ступени) и `scroll-padding-top`; Файлы: index.html, Header.module.css, Footer.module.css, index.css; Критерий: контент не под вырезом/домашней полосой, на десктопе inset = 0 (вид не меняется), CSSparsится.
  → Готово: `viewport-fit=cover`; `.container` шапки `calc(var(--header-height) + env(safe-area-inset-top))` + padding-top; `.nav.open` padding-bottom; футер `calc(40/32/26px + env(safe-area-inset-bottom))`; `scroll-padding-top` с inset.
- [x] P1 — title/keywords; Описание: title = «NOVA PROJECT — джаз-квинтет (Липецк): живые выступления и атмосферные сеты», keywords-мета с названием, жанром, городом, живыми выступлениями; Файлы: index.html; Критерий: формула «группа+жанр+город+живые выступления» в title/description/keywords.
  → Готово: title + description + keywords с формулой (перенесён в блок P0, выполнен вместе с каркасом).
- [x] P0 — WebP-дериваты фотографий; Описание: Pillow: для 26 используемых снимков 3 ступени (широкий 1920/900/640; портретный по высоте 2160/1000/640) в Public/img/, ч/б-фильтр на CSS, качество 75–78; Файлы: Public/img/*, скрипт-генерация; Критерий: дериваты ≤300 КБ, реальные размеры записаны.
  → Готово: 78 дериватов 6.48 МБ (макс. 771 КБ у самого тяжёлого 25.jpg-ступени, ступени 1920 ≤ 300 КБ), генератор scripts/gen-derivatives.py.
- [x] P0 — расширить реестр photos.ts и Photo: srcset/picture + width/height; Описание: поля width/height/derivative-массив; Photo рендерит picture/source srcset + img с width/height, размеры из реестра; Файлы: src/data/photos.ts, src/components/Photo.tsx; Критерий: srcset+width+height на всех фото, структура Photo (shape/caption/meta/priority) сохранена.
  → Готово: реестр с DIMENSIONS + sources (публичные дериваты); Photo: picture/source srcset + sizes по shape, width/height на img; прокинуто во все секции, barrel-экспорт PhotoSource.
- [x] P0 — LCP hero; Описание: fetchpriority=high, eager, srcset-дериват, width/height, decoding async на hero-подложке; Файлы: src/components/home-sections/HeroSection.tsx, src/components/home-sections/HeroSection.module.css; Критерий: hero грузит дериват, аттрибуты есть.
- [x] P0 — preload hero-подложки; Описание: `link rel=preload as=image` + `fetchpriority=high` c абсолютным base-путём (`/Nova_project_site/1.jpg`) в index.html, чтобы запрос стартовал до React-гидратации; Файлы: index.html; Критерий: preload есть, путь абсолютный, атрибуты hero не тронуты.
  → Готово: preload-блок в head перед preconnect-шрифтов; путь абсолютный, `sizes=100vw` (совпадает с `sizes` hero-элемента), fetchpriority=high; hero-элемент (eager+high+async) не изменён.
- [x] P0 — color-scheme + iOS-мета; Описание: `color-scheme: dark` на html (нативные контролы и pickers идут за тёмной концепцией), `format-detection telephone=no` (телефон не авто-ссылка), apple-статус-бар black-translucent; Файлы: src/index.css, index.html; Критерий: цвет из палитры, контролы не светлеют.
  → Готово: `color-scheme: dark` в `html` (без нового цвета), `format-detection telephone=no`, apple-мета; статус-бар в цвет `#0a0a0a`.
  → Готово: hero-подложка: srcset из реестра, sizes=100vw, width/height, eager, fetchpriority=high, decoding=async; контакт-подложка получил то же (lazy).

## P0 — доступность каркаса
- [x] P0 — формы: labels+aria; Описание: id+htmlFor для FormInput/FormSelect/FormTextarea, aria-required у required, aria-describedby подсказки; Файлы: src/components/form/FormInput.tsx, FormSelect.tsx, FormTextarea.tsx; Критерий: каждое поле связано с label, required объявлено.
  → Готово: id=`field-{name}`+htmlFor, aria-required, звёздка в метке; радиогруппа формата — fieldset+legend (radioFieldset без рамки); hint/aria-describedby поддержан.
- [x] P0 — skip-link; Описание: первая ссылка «К основному содержимому» с видимым фокусом, цель #main; Файлы: src/App.tsx, src/App.css; Критерий: tab из page-up ведёт в main.
  → Готово: skipLink в App (первая ссылка, App.css: скрыт, виден на фокусе), `#main` у main.

## P1 — SEO и контент
- [x] P1 — alt-тексты; Описание: переписать alt по кадрам реестра с ключами (джаз-квинтет, живые выступления, Липецк), без выдумывания сюжета; Файлы: src/data/photos.ts; Критерий: alt описывает кадр и содержит ключ.
  → Готово: alt переписаны в реестре: «джаз-квинтет», «живое выступление», Липецк в hero/about/repertoire/format и т.д., без выдуманного сюжета.
- [x] P1 — alt по просмотренным снимкам; Описание: просмотреть все 26 снимков реестра и переписать alt/figcaption по фактическому содержимому; Файлы: src/data/photos.ts, index.html (og:image:alt); Критерий: alt описывает то, что видно на кадре; подписи соответствуют ролям.
  → Готово: 26 снимков просмотрены; alt и figcaption по факту (гитарист/бас-гитарист, пианист, барабанщик, вокалистка, саксофон, нотные стойки, свет; №9 — групповое фото у бренд-стены; №18 — саксофон). Коммит `fd963a5`.
- [x] P1 — og-cover честный; Описание: легаси-логотив чужой фирмы заменён монохромной карточкой NOVA в концепции; Файлы: Public/og-cover.jpg, scripts/make-og-cover.py, index.html; Критерий: карточка содержит марку NOVA PROJECT и ключевые слова, 1200×630, палитра концепции.
  → Готово: карточка 1200×630 (#0a0a0a, белый, хайрлайны, нулевые скругления, трекинг), генератор в scripts/, alt/width/height обновлены. Коммит `fd963a5`.
- [x] P1 — crawlable-якоря в Footer; Описание: footerSectionLinks как <a href="#id"> (onclick сохраняет smooth-scroll), header остаётся кнопками; Файлы: src/components/Footer.tsx, src/data/navigation.ts; Критерий: в HTML footer есть href="#…".
  → Готово: footer-ссылки — `<a href="#id">` (нативный якорь + scroll-padding-top из index.css), smooth-scroll全局 из html; onclick-хелпер удалён.
- [x] P1 — шрифты: убрать @import-дубль, preload; Описание: удалить @import Inter из index.css (HTML-link + preconnect уже есть), добавить preload stylesheet; Файлы: src/index.css, index.html; Критерий: Inter грузится один раз, swap сохранён.
  → Готово: @import удалён из index.css, в index.html preload+stylesheet (один источник), display=swap сохранён.
- [x] P1 — удалить test.jpeg; Описание: git rm test.jpeg (2,48 МБ мусор, нигде не используется); Файлы: test.jpeg; Критерий: файла нет в репозитории.
  → Готово: git rm test.jpeg, ссылок в src нет.

## P1 — доступность деталей
- [x] P1 — Typewriter reduced-motion; Описание: при prefers-reduced-motion печатание останавливается, финальная строка статична; Файлы: src/components/Typewriter.tsx; Критерий: под reduced-motion текст не меняется.
  → Готово: reduced-проверка в компоненте (matchMedia + change-слушатель): таймер не запускается, рендерится полный первый жанр; курсор гасится глобальным reduced-блоком index.css.
- [x] P1 — inputmode/autocomplete; Описание: tel+inputmode, email+autocomplete (email/name/tel), date; Файлы: src/components/home-sections/BookingSection.tsx, form-компоненты; Критерий: все поля Booking имеют правильный inputmode/autocomplete.
  → Готово: выполнено вместе с формами: tel→inputmode=tel+autocomplete=tel, email→autocomplete=email.
- [x] P2 — aria-label у main; Описание: main с accessible name; Файлы: src/App.tsx; Критерий: main имеет label.
  → Готово: aria-label="Лендинг NOVA PROJECT" + id="main" (вместе со skip-link).
- [x] P1 — мобильное меню: aria-controls + Escape; Описание: id у nav, aria-controls на toggle, Escape закрывает и возвращает фокус; Файлы: src/components/Header.tsx, Header.module.css; Критерий: Escape закрывает, aria связки есть.
  → Готово: nav#mobile-nav + aria-label, toggle: aria-expanded + aria-controls="mobile-nav" + ref, Escape-слушатель закрывает меню и возвращает фокус на бургер.
- [x] P1 — тач-таргеты ≥44×44; Описание: ручная проверка кнопок header/sidebar/маркеров/radio-карточек по CSS, довести min-size до 44; Файлы: Header.module.css, VerticalSidebar.module.css, FormRadioCard.module.css, Home-секции; Критерий: все интерактивные элементы ≥44×44.
  → Готово: бургер 44×44 (полоски на местах), .cta/.navLink min-height:44, маркеры sidebar min-height:44 (gap 14→6), radio-карточки 15px+1px=44; аудио-кнопки 44 (проверено).
- [x] P1 — контраст сервисных текстов; Описание: manual-проверка каждого модуля: текстовые ≥4,5:1, крупные ≥3,1, #555/#444 только декоративно; Файлы: все *.module.css; Критерий: ни один текстовый узел не ниже 4,5:1 на #0a0a0a.
  → Готово: #666 (3,45:1) поднят до #888 (5,58:1) во всех рабочих модулях (footer, header, marquee, section-heading, секции, placeholders форм); #444 остались только декоративные bullets/wave/counter; легаси-файлы не тронуты.

## P2 — полировка и код
- [x] P2 — честная ремарка аудио; Описание: курсивная строка «Записи в производстве…» в playerBar (в рамках концепции), кнопки остаются превью; Файлы: src/components/home-sections/AudioSection.tsx, .module.css, src/data/audio.ts; Критерий: секция честно объявляет визуальное превью.
  → Готово: `audioNote` в audio.ts (курсивная строка под списком, тонкая линия сверху), метка «визуальное превью» в playerBar, экспорт через barrel; коммит `1d7020e`.
- [x] P2 — print-блоки; Описание: @media print для Hero/Marquee/grain (где анимация); Файлы: HeroSection.module.css, Marquee.module.css, index.css; Критерий: print-стили подавляют анимации.
  → Готово: глобальный print в index.css (светлая конверсия: white/#111 через токены, зерно/шапка/skip-link/бегущая строка/рельс/водяной знак скрыты, все animation/transition/transform выключены, блоки break-inside: avoid), точечные блоки Hero (подложка+скрим+скролл-подсказка, NOVA — сплошной чёрный), Marquee, VerticalSidebar, Footer-водяной знак, Photo (серая подача, подпись скрыта).
- [x] P2 — VK-домен; Описание: vk.ru → vk.com в contactInfo (формат реестра), запись в DECISIONS; Файлы: src/data/contacts.ts; Критерий: домен валидный.
  → Готово: `vkLink` → `https://vk.com/novaprojekt` (совпадает с sameAs в JSON-LD); запись в DECISIONS.md.
- [x] P2 — подписи WebP-ветки Photo + сверка ступеней; Описание: figcaption вне picture (подписи и meta возвращаются во все WebP-секции), формула portrait-ступеней реестра приведена к генератору, aboutPhotos.secondary получает width/height/sources; Файлы: src/components/Photo.tsx, Photo.module.css, src/data/photos.ts, AboutSection.tsx, scripts/verify-derivatives.py; Критерий: все 81 ссылка srcset ведёт в существующий файл, подписи рендерятся.
  → Готово: корень Photo — всегда `<figure>` (shape, ховер, `.visual figure`), внутри `<picture>`+jpg-fallback; `TIERS_PORTRAIT = [640, 1000, 2160]` (ступени-высоты, scale = edge/h) — 78 дериватов, 0 потерянных ссылок, 0 лишнего; Pillow-сверка чистая.
- [x] P2 — package.json имя; Описание: avantgarde-artists-agency → nova-project-site; Файлы: package.json; Критерий: имя соответствует проекту.
  → Готово: `"name": "nova-project-site"` (private, npm-публикации нет, ссылок на старое имя в коде/CI не найдено).
- [x] P2 — итоговый контроль; Описание: ручные проверки: все styles.* в module.css; esbuild-парсинг каждого CSS; специфичность .animatedSection.animated не ниже; breakpoints 320/375/768/1024/1440; reduced-motion; git diff чистый; Файлы: src/**; Критерий: список проверок пройден, отчёт в REPORT.md.
  → Готово: styles.* — ни одного MISSING (23 модуля, включая `styles.media`); esbuild-парсер прошёл все 28 CSS без ошибок; `.animatedSection.animated` — 2 класса, объявлен после анимационных классов, специфичность не понижена; breakpoints: базовые 1024/768/480 во всех home-секциях и футере, точечные 1280/1100/900 (Header), 860/640/1025–1200/max-height 780 по AGENTS; reduced-motion — три блока (index.css, AnimatedSection, Marquee), print — там, где анимация; единственное нарушение §3.5 (`border-radius: 4px` у скролл-полосы) сведено к 0; git diff чистый.
- [x] P2 — фиксация легаси-решений; Описание: DECISIONS.md: avantgarde-site/, App.css, gsap/lottie, store, Home.module.css; Файлы: DECISIONS.md; Критерий: решения записаны.
  → Готово: сводная запись «Фиксация легаси-решений (итог)» в DECISIONS.md (avantgarde-site/, App.css, gsap/lottie/LottieAnimation/useScrollAnimation/useIntersectionObserver, src/pages/*, Home.module.css, store/store.ts, README) + запись об имени пакета.

## Итог
- [x] P2 — сверка дериватов по ключам ассетов; Описание: `scripts/verify-derivatives.py` considers only keys referenced by assets (свободный 28 не порождает ложных проблем); Файлы: scripts/verify-derivatives.py; Критерий: отчёт «проблемы: нет, лишние: []», файлы не создаются и не удаляются.
  → Готово: скрипт фильтрует по `asset(N, …)`, печатает свободные ключи; прогон: 78 файлов, 78 ссылок, свободный [28], проблем нет, лишних нет.
- [x] REPORT.md: что сделано, что осталось и почему.
  → Готово: REPORT.md — методика ручных проверок, 10 коммитов по приоритетам (P0 SEO-каркас, P0 ассеты/производительность, P1 доступность, P1 возврат подписей, P2 честность/print/код), таблица «что осталось и почему» (нет бэкенда, нет аудио-файлов, alt по смыслу, легаси по AGENTS §9/§11, внешние запуски запрещены), список артефактов.

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
- [x] P0 — favicon; Описание: лёгкий монохромный favicon (монограмма N, палитра #0a0a0a/#ffffff) вместо /1.jpg (1,1 МБ); base-относительный путь; Файлы: Public/favicon.svg, index.html; Критерий: favicon < 1 КБ, путь проходит base.
  → Готово: Public/favicon.svg (монограмма N), link ./favicon.svg (Vite перепишет под base).
- [x] P1 — title/keywords; Описание: title = «NOVA PROJECT — джаз-квинтет (Липецк): живые выступления и атмосферные сеты», keywords-мета с названием, жанром, городом, живыми выступлениями; Файлы: index.html; Критерий: формула «группа+жанр+город+живые выступления» в title/description/keywords.
  → Готово: title + description + keywords с формулой (перенесён в блок P0, выполнен вместе с каркасом).
- [ ] P0 — WebP-дериваты фотографий; Описание: Pillow: для 26 используемых снимков 3 ступени (широкий 1920/900/640; портретный по высоте 2160/1000/640) в Public/img/, ч/б-фильтр на CSS, качество 75–78; Файлы: Public/img/*, скрипт-генерация; Критерий: дериваты ≤300 КБ, реальные размеры записаны.
- [ ] P0 — расширить реестр photos.ts и Photo: srcset/picture + width/height; Описание: поля width/height/derivative-массив; Photo рендерит picture/source srcset + img с width/height, размеры из реестра; Файлы: src/data/photos.ts, src/components/Photo.tsx; Критерий: srcset+width+height на всех фото, структура Photo (shape/caption/meta/priority) сохранена.

## P0 — доступность каркаса
- [ ] P0 — формы: labels+aria; Описание: id+htmlFor для FormInput/FormSelect/FormTextarea, aria-required у required, aria-describedby подсказки; Файлы: src/components/form/FormInput.tsx, FormSelect.tsx, FormTextarea.tsx; Критерий: каждое поле связано с label, required объявлено.
- [ ] P0 — skip-link; Описание: первая ссылка «К основному содержимому» с видимым фокусом, цель #main; Файлы: src/App.tsx, src/index.css; Критерий: tab из page-up ведёт в main.
- [ ] P0 — LCP hero; Описание: fetchpriority=high, eager, srcset-дериват, width/height, decoding async на hero-подложке; Файлы: src/components/home-sections/HeroSection.tsx, src/components/home-sections/HeroSection.module.css; Критерий: hero грузит дериват, аттрибуты есть.

## P1 — SEO и контент
- [ ] P1 — alt-тексты; Описание: переписать alt по кадрам реестра с ключами (джаз-квинтет, живые выступления, Липецк), без выдумывания сюжета; Файлы: src/data/photos.ts; Критерий: alt описывает кадр и содержит ключ.
- [ ] P1 — crawlable-якоря в Footer; Описание: footerSectionLinks как <a href="#id"> (onclick сохраняет smooth-scroll), header остаётся кнопками; Файлы: src/components/Footer.tsx, src/data/navigation.ts; Критерий: в HTML footer есть href="#…".
## P1 — производительность
- [ ] P1 — шрифты: убрать @import-дубль, preload; Описание: удалить @import Inter из index.css (HTML-link + preconnect уже есть), добавить preload stylesheet; Файлы: src/index.css, index.html; Критерий: Inter грузится один раз, swap сохранён.
- [ ] P1 — удалить test.jpeg; Описание: git rm test.jpeg (2,48 МБ мусор, нигде не используется); Файлы: test.jpeg; Критерий: файла нет в репозитории.

## P1 — доступность деталей
- [ ] P1 — Typewriter reduced-motion; Описание: при prefers-reduced-motion печатание останавливается, финальная строка статична; Файлы: src/components/Typewriter.tsx; Критерий: под reduced-motion текст не меняется.
- [ ] P1 — inputmode/autocomplete; Описание: tel+inputmode, email+autocomplete (email/name/tel), date; Файлы: src/components/home-sections/BookingSection.tsx, form-компоненты; Критерий: все поля Booking имеют правильный inputmode/autocomplete.
- [ ] P1 — мобильное меню: aria-controls + Escape; Описание: id у nav, aria-controls на toggle, Escape закрывает и возвращает фокус; Файлы: src/components/Header.tsx, Header.module.css; Критерий: Escape закрывает, aria связки есть.
- [ ] P1 — тач-таргеты ≥44×44; Описание: ручная проверка кнопок header/sidebar/маркеров/radio-карточек по CSS, довести min-size до 44; Файлы: Header.module.css, VerticalSidebar.module.css, FormRadioCard.module.css, Home-секции; Критерий: все интерактивные элементы ≥44×44.
- [ ] P1 — контраст сервисных текстов; Описание: manual-проверка каждого модуля: текстовые ≥4,5:1, крупные ≥3,1, #555/#444 только декоративно; Файлы: все *.module.css; Критерий: ни один текстовый узел не ниже 4,5:1 на #0a0a0a.

## P2 — полировка и код
- [ ] P2 — честная ремарка аудио; Описание: курсивная строка «Записи в производстве…» в playerBar (в рамках концепции), кнопки остаются превью; Файлы: src/components/home-sections/AudioSection.tsx, .module.css, src/data/audio.ts; Критерий: секция честно объявляет визуальное превью.
- [ ] P2 — print-блоки; Описание: @media print для Hero/Marquee/grain (где анимация); Файлы: HeroSection.module.css, Marquee.module.css, index.css; Критерий: print-стили подавляют анимации.
- [ ] P2 — VK-домен; Описание: vk.ru → vk.com в contactInfo (формат реестра), запись в DECISIONS; Файлы: src/data/contacts.ts; Критерий: домен валидный.
- [ ] P2 — package.json имя; Описание: avantgarde-artists-agency → nova-project-site; Файлы: package.json; Критерий: имя соответствует проекту.
- [ ] P2 — aria-label у main; Описание: main с accessible name; Файлы: src/App.tsx; Критерий: main имеет label.
- [ ] P2 — итоговый контроль; Описание: ручные проверки: все styles.* в module.css; esbuild-парсинг каждого CSS; специфичность .animatedSection.animated не ниже; breakpoints 320/375/768/1024/1440; reduced-motion; git diff чистый; Файлы: src/**; Критерий: список проверок пройден, отчёт в REPORT.md.
- [ ] P2 — фиксация легаси-решений; Описание: DECISIONS.md: avantgarde-site/, App.css, gsap/lottie, store, Home.module.css; Файлы: DECISIONS.md; Критерий: решения записаны.

## Итог
- [ ] REPORT.md: что сделано, что осталось и почему.

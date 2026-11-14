/**
 * Реестр фотографий проекта.
 *
 * Файлы лежат в папке Public/ (см. publicDir в vite.config.ts) и отдаются
 * по базовому пути сборки: `${BASE}N.jpg`, то есть `/1.jpg` при base = "/"
 * и `/Nova_project_site/1.jpg` на GitHub Pages. Чтобы заменить снимок —
 * просто положите новую версию с тем же номером, код менять не нужно.
 *
 * `src` — строка, а не импорт: это константные данные, а не объект сборки.
 * Дериваты — WebP-ступени в Public/img/ (генератор: scripts/gen-derivatives.py),
 * widths — их ширины в пикселях для srcset. width/height — натуральные размеры
 * оригинала: они нужны для srcset-дескрипторов и для CLS (атрибуты на <img>).
 * Подписи и alt описывают сцену в общем виде — уточните под конкретный кадр.
 */

export interface PhotoSource {
  url: string;
  width: number;
  height: number;
}

export interface PhotoAsset {
  src: string;
  alt: string;
  orientation: 'landscape' | 'portrait';
  /** Натуральные размеры оригинала */
  width: number;
  height: number;
  /** WebP-дериваты (по возрастанию) */
  sources: PhotoSource[];
  /** Короткая подпись для figcaption */
  caption?: string;
  /** Служебная метка справа от подписи */
  meta?: string;
}

const LANDSCAPE: PhotoAsset['orientation'] = 'landscape';
const PORTRAIT: PhotoAsset['orientation'] = 'portrait';

/**
 * Базовый путь приложения — всегда с завершающим слэшем ("/" или "/Nova_project_site/").
 * Абсолютные `/N.jpg` без этого префикса уходят мимо `base`: dev-сервер отвечает
 * 404 (baseMiddleware в Vite), а на GitHub Pages снимок ищется в корне домена.
 */
const BASE = import.meta.env.BASE_URL;

/** Натуральные размеры пула Public/ (замерено по файлам) */
const DIMENSIONS: Record<number, [number, number]> = {
  1: [1920, 1080], 2: [1920, 1080], 3: [1920, 1080], 4: [1920, 1080],
  5: [1920, 1080], 6: [1920, 1080], 7: [2560, 1706], 8: [1440, 1920],
  9: [1182, 886], 10: [1440, 1920], 11: [1440, 960], 12: [1440, 2190],
  13: [1440, 2160], 14: [1440, 2160], 15: [1440, 2160], 16: [1440, 2160],
  17: [1440, 2160], 18: [1440, 2179], 19: [1440, 2160], 20: [1440, 2160],
  21: [1440, 2160], 22: [1440, 2160], 23: [1440, 2160], 25: [1440, 2160],
  26: [1440, 2160], 27: [1440, 2154], 28: [1703, 2560],
};

/** Ступени дериватов: landscape — по ширине (1920/900/640), portrait — по
 * высоте (2160/1000/640), как в scripts/gen-derivatives.py. Имя файла =
 * результирующая ширина, поэтому для portrait scale = edge / h. */
const TIERS_LANDSCAPE = [640, 900, 1920];
const TIERS_PORTRAIT = [640, 1000, 2160];

const derivatives = (index: number, w: number, h: number, portrait: boolean): PhotoSource[] => {
  const tiers = portrait ? TIERS_PORTRAIT : TIERS_LANDSCAPE;
  return tiers
    .map((edge) => {
      const scale = Math.min(1, edge / (portrait ? h : w));
      const dw = Math.round(w * scale);
      const dh = Math.round(h * scale);
      return { url: `${BASE}img/${index}-w${dw}.webp`, width: dw, height: dh };
    })
    .sort((a, b) => a.width - b.width);
};

const asset = (
  index: number,
  alt: string,
  orientation: PhotoAsset['orientation'],
  caption?: string,
  meta?: string
): PhotoAsset => {
  const [w, h] = DIMENSIONS[index];
  return {
    src: `${BASE}${index}.jpg`,
    alt,
    orientation,
    width: w,
    height: h,
    sources: derivatives(index, w, h, orientation === PORTRAIT),
    caption,
    meta,
  };
};

/* ── Первый экран ───────────────────────────────────────────── */
export const heroPhoto = asset(1, 'NOVA PROJECT на сцене концертного зала: саксофонист впереди, струнная группа и контрабас, дирижёр за путом', LANDSCAPE);

/* ── О коллективе ───────────────────────────────────────────── */
export const aboutPhotos = {
  primary: asset(13, 'Гитарист NOVA PROJECT в сцене синего света: бас-гитара, дым, гирлянда и световой экран за спиной (Липецк)', PORTRAIT, 'Гитарист', 'Live'),
  secondary: asset(3, 'NOVA PROJECT на сцене: художественный ракурс — силуэты музыкантов, нотные стенки, тёплый свет', LANDSCAPE, 'Свет и ноты', 'Live'),
};

/* ── Репертуар ──────────────────────────────────────────────── */
export const repertoirePhotos = {
  tall: asset(14, 'Гитарист NOVA PROJECT с бас-гитарой у светового экрана в красном свете', PORTRAIT, 'Гитарист', 'Live'),
  square: asset(9, 'NOVA PROJECT: групповое фото пяти музыкантов у брендированной стены корпоративного вечера', LANDSCAPE, 'Квинтет', 'Live'),
};

/* ── Звук ───────────────────────────────────────────────────── */
export const audioPhoto = asset(19, 'Пианист NOVA PROJECT за клавишами: руки на клавиатуре, тёплые огни в темноте', PORTRAIT, 'Пианист', 'Live');

/* ── Формат вечера ──────────────────────────────────────────── */
export const formatPhotos = {
  concert: asset(4, 'Барабанщик NOVA PROJECT подаёт взмахом палочки сигнал ансамблю, музыканты у нотных стоек за прозрачной преградой', LANDSCAPE, 'Сигнал ансамблю', 'Live'),
  ambient: asset(6, 'Руки пианиста на белых клавишах — крупный план живого джаза', LANDSCAPE, 'Клавиши', 'Live'),
};

/* ── Стоимость ──────────────────────────────────────────────── */
export const pricingPhoto = asset(17, 'Вокалистка NOVA PROJECT у микрофона в чёрном платье, гитарист за плечом, искры светового экрана', PORTRAIT, 'Вокалистка', 'Live');

/* ── Заявка ─────────────────────────────────────────────────── */
export const bookingPhoto = asset(12, 'Барабанщик NOVA PROJECT за установкой под вечерними огнями, гитарист на переднем плане', PORTRAIT, 'Установки', 'Live');

/* ── Контакты ───────────────────────────────────────────────── */
export const contactPhoto = asset(11, 'Пианист NOVA PROJECT за синтезатором: руки на клавишах, планшет с нотами, синий свет вечера', LANDSCAPE, 'Полуфинал', 'Live');

/* ── Хроника (галерея) ──────────────────────────────────────── */
export const galleryPhotos: PhotoAsset[] = [
  asset(7, 'NOVA PROJECT: пять музыкантов в тёмных костюмах, саксофонист с золотым саксофоном, сценическая поза после сета', LANDSCAPE, 'После сета', 'Live'),
  asset(15, 'Саксофонист NOVA PROJECT в профиль: золотый саксофон, певец у микрофона за плечом', PORTRAIT, 'Саксофон', 'Live'),
  asset(5, 'Бас-гитарист и саксофонист NOVA PROJECT играют на сцене, струнная группа за ними', LANDSCAPE, 'Сцена', 'Live'),
  asset(2, 'Саксофонист NOVA PROJECT крупным планом, гитарист и струнные за спиной', LANDSCAPE, 'Квинтет', 'Live'),
  asset(20, 'Пианист NOVA PROJECT за клавишами: крупные буквы экранного текста вечера за спиной, синий свет', PORTRAIT, 'Экран', 'Live'),
  asset(18, 'Золотой саксофон в руках музыканта — деталь, тёплые огни, силуэт платья в глубине', PORTRAIT, 'Саксофон', 'Live'),
  asset(21, 'Гитарист NOVA PROJECT в синем свете, пианист за клавишами и тарелки установки на переднем плане', PORTRAIT, 'Бас и клавиши', 'Live'),
  asset(16, 'Гитарист NOVA PROJECT в свете софитов: бас-гитара, нотная стойка, гирлянда', PORTRAIT, 'Софиты', 'Live'),
  asset(22, 'NOVA PROJECT на вечерней сцене: вокалистка у микрофона, барабанщик, саксофонист, зрители за столами', PORTRAIT, 'Вечер', 'Live'),
  asset(26, 'Вокалистка NOVA PROJECT поёт в профиль: золотой саксофон в расфокусе на переднем плане, гирлянда', PORTRAIT, 'Вокалистка', 'Live'),
  asset(8, 'NOVA PROJECT на летнем фестивальном вечере: пять музыкантов у белосводого шатра на поле', PORTRAIT, 'Шатёр', 'Live'),
  asset(10, 'Золотой саксофон крупным планом: клавиши, гравировка и раструб на тёмном бархате', PORTRAIT, 'Саксофон', 'Live'),
  asset(23, 'Барабанщик NOVA PROJECT с палочками в фиолетовом свете, гитарист и световой экран за ним', PORTRAIT, 'Барабан', 'Live'),
  asset(25, 'Гитарист NOVA PROJECT с белой бас-гитарой, вокалистка у микрофона слева, золотое поле огоньков', PORTRAIT, 'Бас-гитара', 'Live'),
  asset(27, 'NOVA PROJECT на сцене вечером: музыканты в тёмных костюмах, саксофонист, огни шатра, ноутбук с нотным плейлистом', PORTRAIT, 'Семь на сцене', 'Live'),
];

/** Сколько снимков показываем сразу, остальные — по кнопке «Показать ещё» */
export const GALLERY_INITIAL_COUNT = 11;

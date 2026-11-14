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
export const heroPhoto = asset(1, 'NOVA PROJECT — джаз-квинтет на сцене: живое выступление', LANDSCAPE);

/* ── О коллективе ───────────────────────────────────────────── */
export const aboutPhotos = {
  primary: asset(13, 'Музыкант NOVA PROJECT во время живого выступления (джаз-квинтет, Липецк)', PORTRAIT, 'NOVA PROJECT', 'Live'),
  secondary: asset(3, 'Фрагмент концерта джаз-квинтета: сцена и свет', LANDSCAPE, 'Сцена', 'Live'),
};

/* ── Репертуар ──────────────────────────────────────────────── */
export const repertoirePhotos = {
  tall: asset(14, 'Саксофонист NOVA PROJECT в свете софитов — живое выступление', PORTRAIT, 'Солист', 'Live'),
  square: asset(9, 'Ритм-секция джаз-квинтета NOVA PROJECT на сцене', LANDSCAPE, 'Ритм-секция', 'Live'),
};

/* ── Звук ───────────────────────────────────────────────────── */
export const audioPhoto = asset(19, 'Импровизация джаз-квинтета: музыкант крупным планом', PORTRAIT, 'Запись', 'Live');

/* ── Формат вечера ──────────────────────────────────────────── */
export const formatPhotos = {
  concert: asset(4, 'Концертная программа джаз-квинтета NOVA PROJECT', LANDSCAPE, 'Концерт', 'Live'),
  ambient: asset(6, 'Атмосферный сет: живая музыка вечера', LANDSCAPE, 'Фоновый сет', 'Live'),
};

/* ── Стоимость ──────────────────────────────────────────────── */
export const pricingPhoto = asset(17, 'Музыканты NOVA PROJECT перед живым выступлением', PORTRAIT, 'Перед выходом', 'Live');

/* ── Заявка ─────────────────────────────────────────────────── */
export const bookingPhoto = asset(12, 'Саундчек перед живым выступлением NOVA PROJECT', PORTRAIT, 'Саундчек', 'Live');

/* ── Контакты ───────────────────────────────────────────────── */
export const contactPhoto = asset(11, 'NOVA PROJECT: финальный аккорд вечера живого джаза', LANDSCAPE, 'Финал вечера', 'Live');

/* ── Хроника (галерея) ──────────────────────────────────────── */
export const galleryPhotos: PhotoAsset[] = [
  asset(7, 'Выступление NOVA PROJECT перед полным залом', LANDSCAPE, 'Полный зал', 'Live'),
  asset(15, 'Музыкант за инструментом (джаз-квинтет)', PORTRAIT, 'Солист', 'Live'),
  asset(5, 'Концертный свет над сценой живого джаза', LANDSCAPE, 'Свет сцены', 'Live'),
  asset(2, 'Джаз-квинтет NOVA PROJECT в полном составе', LANDSCAPE, 'Квинтет', 'Live'),
  asset(20, 'Вечер живого джаза NOVA PROJECT', PORTRAIT, 'Вечер джаза', 'Live'),
  asset(18, 'Деталь: руки на клавишах', PORTRAIT, 'Клавиши', 'Live'),
  asset(21, 'Импровизация в тёмном зале', PORTRAIT, 'Импровизация', 'Live'),
  asset(16, 'Портрет музыканта квинтета', PORTRAIT, 'Портрет', 'Live'),
  asset(22, 'Репетиция перед вечером', PORTRAIT, 'Репетиция', 'Live'),
  asset(26, 'Сцена перед началом сета', PORTRAIT, 'Перед сетом', 'Live'),
  asset(8, 'Атмосфера зала на концерте', PORTRAIT, 'Атмосфера', 'Live'),
  asset(10, 'Труба в контражуре', PORTRAIT, 'Труба', 'Live'),
  asset(23, 'Ритм и движение', PORTRAIT, 'Ритм', 'Live'),
  asset(25, 'Контрабас и свет', PORTRAIT, 'Контрабас', 'Live'),
  asset(27, 'Финальный поклон квинтета', PORTRAIT, 'Финал', 'Live'),
];

/** Сколько снимков показываем сразу, остальные — по кнопке «Показать ещё» */
export const GALLERY_INITIAL_COUNT = 11;

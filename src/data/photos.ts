/**
 * Реестр фотографий проекта.
 *
 * Файлы лежат в папке Public/ и отдаются как /1.jpg … /28.jpg
 * (см. publicDir в vite.config.js). Чтобы заменить снимок — просто
 * положите новую версию с тем же номером, код менять не нужно.
 *
 * `src` — строка, а не импорт: это константные данные, а не объект сборки.
 * Подписи и alt описывают сцену в общем виде — уточните под конкретный кадр.
 */

export interface PhotoAsset {
  src: string;
  alt: string;
  orientation: 'landscape' | 'portrait';
  /** Короткая подпись для figcaption */
  caption?: string;
  /** Служебная метка справа от подписи */
  meta?: string;
}

const LANDSCAPE: PhotoAsset['orientation'] = 'landscape';
const PORTRAIT: PhotoAsset['orientation'] = 'portrait';

const asset = (
  index: number,
  alt: string,
  orientation: PhotoAsset['orientation'],
  caption?: string,
  meta?: string
): PhotoAsset => ({
  src: `/${index}.jpg`,
  alt,
  orientation,
  caption,
  meta,
});

/* ── Первый экран ───────────────────────────────────────────── */
export const heroPhoto = asset(1, 'NOVA PROJECT — джаз-квинтет на сцене', LANDSCAPE);

/* ── О коллективе ───────────────────────────────────────────── */
export const aboutPhotos = {
  primary: asset(13, 'Музыкант NOVA PROJECT во время живого выступления', PORTRAIT, 'NOVA PROJECT', 'Live'),
  secondary: asset(3, 'Фрагмент концерта: сцена и свет', LANDSCAPE, 'Сцена', 'Live'),
};

/* ── Репертуар ──────────────────────────────────────────────── */
export const repertoirePhotos = {
  tall: asset(14, 'Саксофонист NOVA PROJECT в свете софитов', PORTRAIT, 'Солист', 'Live'),
  square: asset(9, 'Ритм-секция коллектива на сцене', LANDSCAPE, 'Ритм-секция', 'Live'),
};

/* ── Звук ───────────────────────────────────────────────────── */
export const audioPhoto = asset(19, 'Импровизация: музыкант крупным планом', PORTRAIT, 'Запись', 'Live');

/* ── Формат вечера ──────────────────────────────────────────── */
export const formatPhotos = {
  concert: asset(4, 'Концертная программа NOVA PROJECT', LANDSCAPE, 'Концерт', 'Live'),
  ambient: asset(6, 'Атмосферный сет: инструментальная музыка вечера', LANDSCAPE, 'Фоновый сет', 'Live'),
};

/* ── Стоимость ──────────────────────────────────────────────── */
export const pricingPhoto = asset(17, 'Музыканты NOVA PROJECT перед выступлением', PORTRAIT, 'Перед выходом', 'Live');

/* ── Заявка ─────────────────────────────────────────────────── */
export const bookingPhoto = asset(12, 'Подготовка к выступлению', PORTRAIT, 'Саундчек', 'Live');

/* ── Контакты ───────────────────────────────────────────────── */
export const contactPhoto = asset(11, 'NOVA PROJECT: финальный аккорд вечера', LANDSCAPE, 'Финал вечера', 'Live');

/* ── Хроника (галерея) ──────────────────────────────────────── */
export const galleryPhotos: PhotoAsset[] = [
  asset(7, 'Выступление NOVA PROJECT перед полным залом', LANDSCAPE, 'Полный зал', 'Live'),
  asset(15, 'Музыкант за инструментом', PORTRAIT, 'Солист', 'Live'),
  asset(5, 'Концертный свет над сценой', LANDSCAPE, 'Свет сцены', 'Live'),
  asset(2, 'Квинтет в полном составе', LANDSCAPE, 'Квинтет', 'Live'),
  asset(20, 'Вечер живого джаза', PORTRAIT, 'Вечер джаза', 'Live'),
  asset(18, 'Деталь: руки на клавишах', PORTRAIT, 'Клавиши', 'Live'),
  asset(21, 'Импровизация в тёмном зале', PORTRAIT, 'Импровизация', 'Live'),
  asset(16, 'Портрет музыканта', PORTRAIT, 'Портрет', 'Live'),
  asset(22, 'Репетиция перед вечером', PORTRAIT, 'Репетиция', 'Live'),
  asset(26, 'Сцена перед началом сета', PORTRAIT, 'Перед сетом', 'Live'),
  asset(8, 'Атмосфера зала', PORTRAIT, 'Атмосфера', 'Live'),
  asset(10, 'Труба в контражуре', PORTRAIT, 'Труба', 'Live'),
  asset(23, 'Ритм и движение', PORTRAIT, 'Ритм', 'Live'),
  asset(25, 'Контрабас и свет', PORTRAIT, 'Контрабас', 'Live'),
  asset(27, 'Финальный поклон', PORTRAIT, 'Финал', 'Live'),
];

/** Сколько снимков показываем сразу, остальные — по кнопке «Показать ещё» */
export const GALLERY_INITIAL_COUNT = 11;

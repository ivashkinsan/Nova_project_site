/** Navigation configuration — used by Header and Footer */

export type PageKey = "home" | "artists" | "booking" | "about" | "contacts";

export interface NavItem {
  label: string;
  page: PageKey;
}

export interface FooterNavItem {
  label: string;
  page: PageKey | null;
}

export const headerNavItems: NavItem[] = [
  { label: "О нас", page: "home" },
  { label: "Репертуар", page: "artists" },
  { label: "Бронирование", page: "booking" },
  { label: "Контакты", page: "contacts" },
];

export const footerNavItems: FooterNavItem[] = [
  { label: "Главная", page: "home" },
  { label: "О нас", page: "about" },
  { label: "Коллектив", page: "artists" },
  { label: "Бронирование", page: "booking" },
  { label: "Контакты", page: "contacts" },
];

/** Секции лендинга — навигация Header и Footer по якорям */
export interface SectionNavItem {
  label: string;
  sectionId: string;
}

export const sectionNavItems: SectionNavItem[] = [
  { label: "О нас", sectionId: "about" },
  { label: "Репертуар", sectionId: "repertoire" },
  { label: "Аудио", sectionId: "audio" },
  { label: "Хроника", sectionId: "gallery" },
  { label: "Контакты", sectionId: "contact" },
];

export const footerSectionLinks: SectionNavItem[] = [
  { label: "О коллективе", sectionId: "about" },
  { label: "Репертуар", sectionId: "repertoire" },
  { label: "Аудио", sectionId: "audio" },
  { label: "Хроника", sectionId: "gallery" },
  { label: "Формат вечера", sectionId: "format" },
  { label: "Стоимость", sectionId: "pricing" },
  { label: "Оставить заявку", sectionId: "booking" },
  { label: "Контакты", sectionId: "contact" },
];

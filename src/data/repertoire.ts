/** Repertoire data — used by Home.tsx */

export interface RepertoireItem {
  title: string;
  description: string;
}

export const repertoire: RepertoireItem[] = [
  { title: 'Традиционный джаз', description: 'Стандарты, свинг, мейнстрим' },
  { title: 'Мировые хиты', description: 'Узнаваемые мелодии в джазовых аранжировках' },
  { title: 'Авторские композиции', description: 'Оригинальный материал коллектива' },
  { title: 'Русская программа', description: 'Джазовые обработки русских мелодий' },
  { title: 'Фоновая музыка', description: 'Инструментальная музыка для мероприятий' },
  { title: 'Фьюжн', description: 'Современные джазовые направления' },
];

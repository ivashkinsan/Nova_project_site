/** Performance format data — used by Home.tsx */

export interface FormatOption {
  title: string;
  description: string;
  note: string;
  /** Длительность формата */
  duration: string;
  /** Что входит в формат */
  details: string[];
}

export const formatOptions: FormatOption[] = [
  {
    title: 'Концертная программа',
    description: 'Полноценное выступление в двух отделениях',
    duration: '2 × 30 минут',
    note: 'Выстраиваем программу под ритм вашего вечера',
    details: [
      'Полный состав квинтета',
      'Репертуар под событие и зал',
      'Саундчек и настройка до начала',
    ],
  },
  {
    title: 'Атмосферный сет',
    description: 'Инструментальное сопровождение до 60 минут',
    duration: 'до 60 минут',
    note: 'Для церемоний, ужинов или welcome-зоны',
    details: [
      'Фоновая музыка без длинных пауз',
      'Мягкая динамика, комфортная для разговора',
      'Встраиваемся в тайминг вечера',
    ],
  },
];

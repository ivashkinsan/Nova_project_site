/** Performance format data — used by Home.tsx */

export interface FormatOption {
  title: string;
  description: string;
  note: string;
}

export const formatOptions: FormatOption[] = [
  {
    title: 'Основная программа',
    description: '2 отделения по 30 минут',
    note: '(возможны вариации по договорённости)',
  },
  {
    title: 'Фоновый сет',
    description: 'До 60 минут инструментальной музыки',
    note: 'Для welcome / ужина',
  },
];

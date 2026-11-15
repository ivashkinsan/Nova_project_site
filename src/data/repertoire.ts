/** Repertoire data — used by Home.tsx */

export interface RepertoireItem {
  title: string;
  description: string;
  /** Язык заголовка, если он не русский — читалка произнесёт его правильно (WCAG 3.1.2) */
  lang?: string;
}

export const repertoire: RepertoireItem[] = [
  { title: 'Классика джаза', description: 'Стандарты и традиции 1930–50-х: Элла, Бени, Колтрейн' },
  { title: 'Авторские интерпретации', description: 'Знакомые мелодии в новой джазовой перспективе' },
  { title: 'Original Sound', description: 'Композиции коллектива — от неоклассики до фьюжна', lang: 'en' },
  { title: 'Русский джаз', description: 'Обработки мелодий из советской и классической традиции' },
  { title: 'Атмосферные сеты', description: 'Инструментальные программы для особенных моментов' },
  { title: 'Современный фьюжн', description: 'Поиск новых звуков на стыке жанров и эпох' },
];

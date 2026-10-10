/** Band member data — used by Home.tsx and Artists.tsx */

export interface BandMember {
  name: string;
  role: string;
  icon?: string;
  description: string;
}

export const bandMembers: BandMember[] = [
  {
    name: 'Музыкант 1',
    role: 'КЛАРНЕТ / ФЛЕЙТА',
    icon: '♫',
    description: 'Хранитель звуковых пространств: от прозрачных флейтовых линий до глубоких кларнетных соло.',
  },
  {
    name: 'Музыкант 2',
    role: 'АЛЬТ-САКСОФОН / ТЕНОР-САКСОФОН',
    icon: '♫',
    description: 'Голос коллектива в импровизационных пассажах — от нежных лирических фраз до мощных брейков.',
  },
  {
    name: 'Музыкант 3',
    role: 'ТРУБА / ФЛЮГЕЛЬГОРН',
    icon: '♫',
    description: 'Мелодический проводник: яркие соло и тёплые аккордовые блоки в джазовой традиции.',
  },
  {
    name: 'Музыкант 4',
    role: 'ФОРТЕПИАНО',
    icon: '♫',
    description: 'Архитектор гармоний: от билингвальной игры до пьедестальных солирующих партитур.',
  },
  {
    name: 'Музыкант 5',
    role: 'КОНТРАБАС',
    icon: '♫',
    description: 'Основа ритмического фундамента: глубина, тембр и невидимый пульс ансамбля.',
  },
];

/** Simplified band members for Home page hero section */
export const homeBandMembers = [
  { icon: '🎤', name: 'Вокал', description: 'Голос, передающий глубину эмоциональной палитры' },
  { icon: '🎷', name: 'Саксофон', description: 'Проводник между структурой и импровизацией' },
  { icon: '🎹', name: 'Фортепиано', description: 'Гармонический ландшафт и аккомпанемент' },
  { icon: '🎸', name: 'Бас гитара', description: 'Ритмический скелет и контрабасная линия' },
  { icon: '🥁', name: 'Ударные', description: 'Сердцебиение ансамбля и временная архитектура' },
];

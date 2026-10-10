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
    description: 'Основной духовой инструмент коллектива, создающий характерное звучание NOVA PROJECT.',
  },
  {
    name: 'Музыкант 2',
    role: 'АЛЬТ-САКСОФОН / ТЕНОР-САКСОФОН',
    icon: '♫',
    description: 'Соло-инструменты для импровизационных партий и соло-прогрессий.',
  },
  {
    name: 'Музыкант 3',
    role: 'ТРУБА / ФЛЮГЕЛЬГОРН',
    icon: '♫',
    description: 'Мелодическая линия и брэйк-соло в джазовой традиции.',
  },
  {
    name: 'Музыкант 4',
    role: 'ФОРТЕПИАНО',
    icon: '♫',
    description: 'Гармонический фундамент коллектива, аккомпанемент и соло.',
  },
  {
    name: 'Музыкант 5',
    role: 'КОНТРАБАС',
    icon: '♫',
    description: 'Ритм-секция: поддерживает грув и басовую линию ансамбля.',
  },
];

/** Simplified band members for Home page hero section */
export const homeBandMembers = [
  { icon: '🎤', name: 'Вокал', description: 'Мощный вокал в джазовой манере' },
  { icon: '🎷', name: 'Саксофон', description: 'Мелодия и импровизация' },
  { icon: '🎹', name: 'Фортепиано', description: 'Гармоническая основа' },
  { icon: '🎸', name: 'Бас гитара', description: 'Ритмический фундамент' },
  { icon: '🥁', name: 'Ударные', description: 'Двигатель ансамбля' },
];

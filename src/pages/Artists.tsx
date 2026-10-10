import styles from './Artists.module.css';

const bandMembers = [
  {
    name: 'Музыкант 1',
    role: 'Кларнет / Флейта',
    description: 'Основной духовой инструмент коллектива, создающий характерное звучание NOVA PROJECT.',
  },
  {
    name: 'Музыкант 2',
    role: 'Альт-саксофон / Тенор-саксофон',
    description: 'Соло-инструменты для импровизационных партий и соло-прогрессий.',
  },
  {
    name: 'Музыкант 3',
    role: 'Труба / Флюгельгорн',
    description: 'Мелодическая линия и брэйк-соло в джазовой традиции.',
  },
  {
    name: 'Музыкант 4',
    role: 'Фортепиано',
    description: 'Гармонический фундамент коллектива, аккомпанемент и соло.',
  },
  {
    name: 'Музыкант 5',
    role: 'Контрабас',
    description: 'Ритм-секция: поддерживает грув и басовую линию ансамбля.',
  },
];

export default function Artists() {
  return (
    <section className={styles.artistsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Наш коллектив</h1>
        <p className={styles.subtitle}>
          Пять музыкантов — единый звук NOVA PROJECT
        </p>
        <div className={styles.membersGrid}>
          {bandMembers.map((member, index) => (
            <div className={styles.memberCard} key={index}>
              <div className={styles.memberIcon}>♫</div>
              <h2 className={styles.memberName}>{member.name}</h2>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberDescription}>{member.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.teamNote}>
          <h3 className={styles.teamNoteTitle}>О коллективе</h3>
          <p>
            NOVA PROJECT — джаз-квинтет из Липецка, специализирующийся на джазовой музыке 1930–1940-х годов.
            Коллектив выступает в формате концертных программ, фоновых сетов или гибрид-шоу.
            Все музыканты — профессиональные исполнители с опытом живых выступлений.
          </p>
        </div>
      </div>
    </section>
  );
}
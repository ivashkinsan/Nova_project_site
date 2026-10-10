/**
 * Вертикальный рельс слева: прогресс прокрутки и маркеры секций.
 * Служит и навигацией, и индикатором «сколько уже прочитано».
 */
import styles from "./VerticalSidebar.module.css";
import {
  useActiveSection,
  useScrollProgress,
} from "../hooks/useScrollProgress";

const SECTIONS = [
  { id: "hero", label: "Начало" },
  { id: "about", label: "О нас" },
  { id: "repertoire", label: "Репертуар" },
  { id: "audio", label: "Аудио" },
  { id: "gallery", label: "Хроника" },
  { id: "format", label: "Формат" },
  { id: "pricing", label: "Стоимость" },
  { id: "booking", label: "Заявка" },
  { id: "contact", label: "Контакты" },
] as const;

/* Стабильная ссылка для подписки в useActiveSection */
const SECTION_IDS = SECTIONS.map((section) => section.id);

export default function VerticalSidebar() {
  const { progress } = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.rail}>
      <span className={styles.track} aria-hidden="true">
        <span
          className={styles.fill}
          style={{ "--progress": progress } as React.CSSProperties}
        />
      </span>

      <ul className={styles.markers}>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={`${styles.marker} ${active === section.id ? styles.active : ""}`}
              onClick={() => scrollToSection(section.id)}
              aria-label={section.label}
              aria-current={active === section.id ? "true" : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{section.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <span className={styles.counter} aria-hidden="true">
        {String(Math.round(progress * 100)).padStart(2, "0")}
      </span>
    </div>
  );
}

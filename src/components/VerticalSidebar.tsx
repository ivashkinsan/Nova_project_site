/**
 * Вертикальный рельс слева: прогресс прокрутки и маркеры секций.
 * Служит и навигацией, и индикатором «сколько уже прочитано».
 */
import styles from "./VerticalSidebar.module.css";
import {
  useActiveSection,
  useScrollProgress,
} from "../hooks/useScrollProgress";
import { scrollToSection } from "../utils/scroll";

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

  return (
    /* Рельс — навигация: landmark <nav> с именем, чтобы маркеры секций
       были отдельной зоной обхода, а не разбросаны по странице. */
    <nav className={styles.rail} aria-label="Секции страницы">
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
    </nav>
  );
}

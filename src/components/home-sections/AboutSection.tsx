import { homeBandMembers, aboutPhotos } from "../../data";
import SectionHeading from "../SectionHeading";
import Photo from "../Photo";
import styles from "./AboutSection.module.css";

export default function AboutSection({ id = "about" }: { id?: string }) {
  return (
    <section className={styles.about} id={id}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Левая колонка — фотографии */}
          <div className={styles.visual}>
            <Photo
              src={aboutPhotos.primary.src}
              alt={aboutPhotos.primary.alt}
              shape="tall"
              caption={aboutPhotos.primary.caption}
              meta={aboutPhotos.primary.meta}
            />
            <Photo
              src={aboutPhotos.secondary.src}
              alt={aboutPhotos.secondary.alt}
              shape="wide"
              caption={aboutPhotos.secondary.caption}
              meta={aboutPhotos.secondary.meta}
            />
          </div>

          {/* Правая колонка — текст и состав */}
          <div className={styles.body}>
            <SectionHeading
              index="01"
              eyebrow="О коллективе"
              title="Пять музыкантов. Один путь."
            />

            <div className={styles.text}>
              <p className={styles.paragraph}>
                NOVA PROJECT — это не просто группа. Это пространство, где
                встречаются традиции джазовой музыки и современный
                художественный поиск. Каждая интерпретация — новая.
              </p>
              <p className={styles.paragraph}>
                Наш репертуар — не набор хитов, а тщательно выстроенная
                программа, где классика джаза соседствует с авторскими
                композициями, а знакомые мелодии обретают новое звучание.
              </p>
            </div>

            <blockquote className={styles.quote}>
              Мы верим, что музыка способна трансформировать пространство и
              время. Наша задача — создавать атмосферу, в которой каждая нота
              становится частью истории.
            </blockquote>

            {/* Состав: типографический список вместо иконок */}
            <ul className={styles.roster}>
              {homeBandMembers.map((member, i) => (
                <li key={member.name} className={styles.rosterItem}>
                  <span className={styles.rosterIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rosterName}>{member.name}</span>
                  <span className={styles.rosterDesc}>
                    {member.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

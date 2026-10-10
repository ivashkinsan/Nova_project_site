import { useState } from "react";
import { galleryPhotos, GALLERY_INITIAL_COUNT } from "../../data";
import SectionHeading from "../SectionHeading";
import Photo from "../Photo";
import styles from "./GallerySection.module.css";

export default function GallerySection({ id = "gallery" }: { id?: string }) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? galleryPhotos
    : galleryPhotos.slice(0, GALLERY_INITIAL_COUNT);
  const hiddenCount = galleryPhotos.length - GALLERY_INITIAL_COUNT;

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.gallery} id={id}>
      <div className={styles.container}>
        <div className={styles.head}>
          <SectionHeading
            index="04"
            eyebrow="Хроника"
            title="Как это было"
            lead="Кадры с выступлений: сцена, свет, зал и музыка."
          />
          <p className={styles.count}>
            {String(galleryPhotos.length).padStart(2, "0")} кадров
          </p>
        </div>

        <div className={styles.grid}>
          {visible.map((photo, i) => {
            const tileClass = styles[`tile${i + 1}`];

            return (
              <Photo
                key={photo.src}
                className={[styles.tile, tileClass].filter(Boolean).join(" ")}
                src={photo.src}
                alt={photo.alt}
                shape="fill"
                caption={photo.caption}
                meta={photo.meta}
              />
            );
          })}
        </div>

        <div className={styles.foot}>
          <p className={styles.note}>
            Хотите увидеть больше или обсудить съёмку вашего вечера — напишите
            нам.
          </p>
          <div className={styles.footActions}>
            {hiddenCount > 0 && (
              <button
                type="button"
                className={styles.more}
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
              >
                {expanded ? "Свернуть" : `Показать ещё ${hiddenCount}`}
                <span className={styles.moreArrow} aria-hidden="true">
                  {expanded ? "↑" : "↓"}
                </span>
              </button>
            )}
            <button
              type="button"
              className={styles.cta}
              onClick={scrollToBooking}
            >
              Обсудить вечер
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

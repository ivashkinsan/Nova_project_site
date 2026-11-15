import { useState } from "react";
import { tracks, audioNote, audioPhoto } from "../../data";
import SectionHeading from "../SectionHeading";
import Photo from "../Photo";
import styles from "./AudioSection.module.css";

export default function AudioSection({ id = "audio" }: { id?: string }) {
  const headingId = `${id}-title`;
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeTrack = tracks.find((track) => track.id === playingId) ?? null;

  const handlePlay = (trackId: string) => {
    setPlayingId((current) => (current === trackId ? null : trackId));
  };

  return (
    <section className={styles.audio} id={id} aria-labelledby={headingId}>
      <div className={styles.container}>
        <SectionHeading
          index="03"
          eyebrow="Аудио"
          title="Живой звук"
          titleId={headingId}
          lead="Пять фрагментов, которые дают представление о характере программы — от свинга до неоклассики."
        />

        <div className={styles.grid}>
          <div className={styles.visual}>
            <Photo
              src={audioPhoto.src}
              alt={audioPhoto.alt}
              width={audioPhoto.width}
              height={audioPhoto.height}
              sources={audioPhoto.sources}
              shape="tall"
              /* Фото-колонка 0.7fr из грида с отступом 64: при 1024px колонка
                 ≈ 90vw (944px контента), берём 90vw — tier не выбирается с запасом. */
              sizes="(max-width: 1024px) 90vw, 32vw"
              caption={audioPhoto.caption}
              meta={audioPhoto.meta}
            />
          </div>

          <div className={styles.player}>
            <div className={styles.playerBar}>
              <span className={styles.playerState} aria-live="polite">
                {activeTrack ? (
                  <>
                    <span className={styles.pulse} aria-hidden="true" />
                    Сейчас:{' '}
                    {/* Название трека — латиница: язык задаём явно (WCAG 3.1.2),
                        чтобы программа чтения читала его по английским правилам. */}
                    <span lang="en">{activeTrack.title}</span>
                  </>
                ) : (
                  "Выберите фрагмент"
                )}
              </span>
              <span className={styles.playerMode}>визуальное превью</span>
              <span className={styles.playerCount}>
                {String(tracks.length).padStart(2, "0")} фрагмента
              </span>
            </div>

            {/* Список треков: list-style: none снимает семантику списка в WebKit,
                поэтому роль списка возвращаем явно (WCAG — программа чтения
                объявит список из пяти строк). */}
            <ul className={styles.trackList} role="list">
              {tracks.map((track, i) => {
                const isActive = playingId === track.id;

                return (
                  <li key={track.id} role="listitem">
                    <button
                      type="button"
                      className={`${styles.track} ${isActive ? styles.trackActive : ""}`}
                      onClick={() => handlePlay(track.id)}
                      aria-pressed={isActive}
                      /* aria-label замещает весь текст кнопки (индекс, название,
                         артист, длительность), поэтому длительность кладём в
                         имя: читатель программы чтения получает и название, и время. */
                      aria-label={`${isActive ? "Остановить" : "Включить"} фрагмент ${track.title}, ${track.duration}`}
                    >
                      <span className={styles.trackIndex}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className={styles.trackIcon} aria-hidden="true">
                        {isActive ? (
                          <>
                            <span className={styles.pauseBar} />
                            <span className={styles.pauseBar} />
                          </>
                        ) : (
                          <span className={styles.playArrow} />
                        )}
                      </span>

                      {/* Названия треков и исполнитель — латиница: язык задаём
                          явно, чтобы программа чтения не читала их по русским
                          правилам (WCAG 3.1.2). */}
                      <span className={styles.trackInfo}>
                        <span className={styles.trackTitle} lang="en">
                          {track.title}
                        </span>
                        <span className={styles.trackArtist} lang="en">
                          {track.artist}
                        </span>
                      </span>

                      <span className={styles.waveform} aria-hidden="true">
                        {track.waveform.map((height, index) => (
                          <span
                            key={index}
                            className={`${styles.waveBar} ${isActive ? styles.waveBarActive : ""}`}
                            style={
                              {
                                "--h": `${height}%`,
                                "--delay": `${(index % 14) * 0.07}s`,
                              } as React.CSSProperties
                            }
                          />
                        ))}
                      </span>

                      <span className={styles.trackDuration}>
                        {track.duration}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className={styles.playerNote}>{audioNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

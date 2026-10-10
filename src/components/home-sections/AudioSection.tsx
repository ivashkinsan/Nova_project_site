import { useState } from "react";
import { tracks, audioPhoto } from "../../data";
import SectionHeading from "../SectionHeading";
import Photo from "../Photo";
import styles from "./AudioSection.module.css";

export default function AudioSection({ id = "audio" }: { id?: string }) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeTrack = tracks.find((track) => track.id === playingId) ?? null;

  const handlePlay = (trackId: string) => {
    setPlayingId((current) => (current === trackId ? null : trackId));
  };

  return (
    <section className={styles.audio} id={id}>
      <div className={styles.container}>
        <SectionHeading
          index="03"
          eyebrow="Аудио"
          title="Живой звук"
          lead="Пять фрагментов, которые дают представление о характере программы — от свинга до неоклассики."
        />

        <div className={styles.grid}>
          <div className={styles.visual}>
            <Photo
              src={audioPhoto.src}
              alt={audioPhoto.alt}
              shape="tall"
              caption={audioPhoto.caption}
              meta={audioPhoto.meta}
            />
          </div>

          <div className={styles.player}>
            <div className={styles.playerBar}>
              <span className={styles.playerState}>
                {activeTrack ? (
                  <>
                    <span className={styles.pulse} aria-hidden="true" />
                    Сейчас: {activeTrack.title}
                  </>
                ) : (
                  "Выберите фрагмент"
                )}
              </span>
              <span className={styles.playerCount}>
                {String(tracks.length).padStart(2, "0")} фрагмента
              </span>
            </div>

            <ul className={styles.trackList}>
              {tracks.map((track, i) => {
                const isActive = playingId === track.id;

                return (
                  <li key={track.id}>
                    <button
                      type="button"
                      className={`${styles.track} ${isActive ? styles.trackActive : ""}`}
                      onClick={() => handlePlay(track.id)}
                      aria-pressed={isActive}
                      aria-label={`${isActive ? "Остановить" : "Включить"} фрагмент ${track.title}`}
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

                      <span className={styles.trackInfo}>
                        <span className={styles.trackTitle}>{track.title}</span>
                        <span className={styles.trackArtist}>
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
                                height: `${height}%`,
                                animationDelay: `${(index % 14) * 0.07}s`,
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
          </div>
        </div>
      </div>
    </section>
  );
}

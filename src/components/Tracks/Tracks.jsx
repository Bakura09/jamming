import { useCallback } from "react";

import styles from "./Tracks.module.css";

function Tracks({ track, onAdd, onRemove, isRemoval }) {
  const addTrack = useCallback(() => {
    onAdd(track);
  }, [onAdd, track]);

  const removeTrack = useCallback(() => {
    onRemove(track);
  }, [onRemove, track]);

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button type="button" className={styles.trackButton} onClick={addTrack}>
          +
        </button>
      );
    }

    return (
      <button type="button" className={styles.trackButton} onClick={removeTrack}>
        -
      </button>
    );
  };

  return (
    <div className={styles.trackCard}>
      <div className={styles.trackInfo}>
        <h3 className={styles.trackName}>{track.name}</h3>
        <p className={styles.trackMeta}>
          <strong>Artists:</strong>{" "}
          {track.artists.map((artist) => artist.name).join(" ")} | {track.album}
        </p>
        <p className={styles.trackMeta}>
          <a className={styles.trackLink} href={track.external_urls} target="_blank">
            Track Link
          </a>
        </p>
      </div>
      {renderAction()}
    </div>
  );
}

export default Tracks;

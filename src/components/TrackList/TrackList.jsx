import Tracks from "../Tracks/Tracks";

import styles from "./TrackList.module.css";

function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div className={styles.trackList}>
      {tracks.map((track) => {
        return (
          <Tracks
            track={track}
            key={track.id}
            isRemoval={isRemoval}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

export default TrackList;

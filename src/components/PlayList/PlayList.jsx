import { useCallback } from "react";

import TrackList from "../TrackList/TrackList";

import styles from "./PlayList.module.css";

function PlayList({
  playListName,
  playlistTracks,
  onRemove,
  onSave,
  onNameChange,
}) {
  const handleNameChange = useCallback(
    ({ target }) => {
      onNameChange(target.value);
    },
    [onNameChange],
  );

  return (
    <div className={styles.playlistPanel}>
      <input
        className={styles.playlistInput}
        onChange={handleNameChange}
        defaultValue={playListName}
      />
      <div className={styles.playlistBody}>
        <TrackList
          tracks={playlistTracks}
          onRemove={onRemove}
          isRemoval={false}
        />
        <button type="button" className={styles.saveButton} onClick={onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    </div>
  );
}

export default PlayList;

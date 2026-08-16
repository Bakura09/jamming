import { useCallback } from "react";

import TrackList from "../TrackList/TrackList";

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
    <div>
      <input onChange={handleNameChange} defaultValue={playListName} />
      <div>
        <TrackList
          tracks={playlistTracks}
          onRemove={onRemove}
          isRemoval={false}
        />
        <button onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>
    </div>
  );
}

export default PlayList;

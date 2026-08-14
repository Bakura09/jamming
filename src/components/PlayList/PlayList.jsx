import { useState } from "react";

import TrackList from "../TrackList/TrackList";

function PlayList({ playlistTracks, onRemove, onSave }) {
  const [playListName, setPlayListName] = useState("New Playlist");

  const handleChange = ({ target }) => {
    setPlayListName(target.value);
  };

  return (
    <div>
      <input onChange={handleChange} defaultValue={playListName} />
      <div>
        <TrackList
          tracks={playlistTracks}
          isRemoval={false}
          onRemove={onRemove}
        />
        <button onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>
    </div>
  );
}

export default PlayList;

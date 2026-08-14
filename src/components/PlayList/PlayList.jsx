import { useState } from "react";

import TrackList from "../TrackList/TrackList";

function PlayList({ playlistTracks, onRemove, onSave }) {
  const [playListName, setPlayListName] = useState("");

  const handleChange = ({ target }) => {
    setPlayListName(target.value);
  };

  return (
    <div>
      <input onChange={handleChange} defaultValue={"New PlayList"} />
      <h3>{playListName}</h3>
      <TrackList tracks={playlistTracks} isRemoval={true} onRemove={onRemove} />
      <button onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default PlayList;

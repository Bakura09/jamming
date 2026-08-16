import { useCallback, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import PlayList from "./components/PlayList/PlayList.jsx";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");

  const search = useCallback((term) => {
    // trigger spotify search
  }, []);

  const updatePlayListName = useCallback((newName) => {
    setPlayListName(newName);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playListTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlayListTracks((prevTracks) => [...prevTracks, track]);
    },
    [playListTracks],
  );

  const removeTrack = useCallback((track) => {
    setPlayListTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id),
    );
  }, []);

  return (
    <>
      <h2>
        Ja<span className="title">mmm</span>ing
      </h2>
      <p>Enter a track name</p>
      <SearchBar onSearch={search} />
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <PlayList
        playListName={playListName}
        playlistTracks={playListTracks}
        onNameChange={updatePlayListName}
        onRemove={removeTrack}
      />
    </>
  );
}

export default App;

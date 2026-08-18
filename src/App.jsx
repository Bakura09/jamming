import { useCallback, useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import PlayList from "./components/PlayList/PlayList.jsx";
import Spotify from "./util/spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const updatePlayListName = useCallback((newName) => {
    setPlayListName(newName);
  }, []);

  const savePlayList = useCallback(() => {
    const trackUris = playListTracks.map((track) => track.uri);
    Spotify.savePlaylist(playListName, trackUris).then(() => {
      setPlayListName("New Playlist");
      setPlayListTracks([]);
    });
  }, [playListName, playListTracks]);

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
        onSave={savePlayList}
      />
    </>
  );
}

export default App;

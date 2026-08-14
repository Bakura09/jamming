import { useCallback, useState } from "react";
import "./App.css";

import results from "./util/tracksMockObj.js";
import playListResult from "./util/playListTracks.js";

import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import PlayList from "./components/PlayList/PlayList.jsx";

function App() {
  const tracks = results.tracks.items;
  const tracksResults = playListResult.tracks.items;

  const [searchResults, setSearchResults] = useState(tracks);
  const [playListTracks, setPlayListTracks] = useState([]);

  const search = useCallback((term) => {
    // trigger spotify search
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
      <PlayList playlistTracks={playListTracks} onRemove={removeTrack} />
    </>
  );
}

export default App;

import { useCallback, useEffect, useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import PlayList from "./components/PlayList/PlayList.jsx";
import Spotify from "./util/Spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");
  const [isAuthorized, setIsAuthorized] = useState(
    Boolean(localStorage.getItem("access_token")),
  );

  // Step 1: Get user's spotify account authorization
  const getUserAuthorization = useCallback(() => {
    Spotify.authorize();
  }, []);

  // Step 2: Generate an access_token to use with API calls
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (!authorizationCode) {
      return;
    }

    window.history.replaceState({}, document.title, "/");

    Spotify.getToken(authorizationCode)
      .then(() => setIsAuthorized(true))
      .catch((error) => console.log(error));
  }, []);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const updatePlayListName = useCallback((newName) => {
    setPlayListName(newName);
  }, []);

  const savePlayList = useCallback(() => {
    const trackUris = playListTracks.map((track) => track.uri);
    Spotify.createPlaylist(playListName, trackUris).then(() => {
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
    <div>
      <button
        type="button"
        onClick={getUserAuthorization}
        disabled={isAuthorized ? true : false}
      >
        {isAuthorized ? "CONNECTED" : "Connect Spotify"}
      </button>
      <h1>
        Ja<span className="title">mmm</span>ing
      </h1>
      <h4>Enter a track name</h4>
      <SearchBar onSearch={search} />
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <PlayList
        playListName={playListName}
        playlistTracks={playListTracks}
        onNameChange={updatePlayListName}
        onRemove={removeTrack}
        onSave={savePlayList}
      />
    </div>
  );
}

export default App;

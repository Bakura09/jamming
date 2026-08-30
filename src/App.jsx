import { useCallback, useEffect, useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import PlayList from "./components/PlayList/PlayList.jsx";
import Spotify from "./util/Spotify.js";

const RESULTS_PER_PAGE = 10;

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const search = useCallback((term, page = 1) => {
    const offset = (page - 1) * RESULTS_PER_PAGE;
    setSearchTerm(term);

    Spotify.search(term, offset, RESULTS_PER_PAGE).then((result) => {
      const nextPage = Math.floor((result.offset || 0) / RESULTS_PER_PAGE) + 1;

      setSearchResults(result.items || []);
      setCurrentPage(nextPage);
      setTotalPages(
        Math.max(1, Math.ceil((result.total || 0) / RESULTS_PER_PAGE)),
      );
    });
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
    <div className="appShell">
      <header className="appHeader">
        <button
          type="button"
          className="connectButton"
          onClick={getUserAuthorization}
          disabled={isAuthorized}
        >
          {isAuthorized ? "CONNECTED" : "Connect Spotify"}
        </button>
        <h1 className="appTitle">
          Ja<span className="titleAccent">mmm</span>ing
        </h1>
        <h4 className="appSubtitle">Enter a track name</h4>
      </header>

      <main className="contentGrid">
        <section className="panel">
          <SearchBar onSearch={search} />
          <SearchResults
            searchResults={searchResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => search(searchTerm, page)}
            onAdd={addTrack}
          />
        </section>

        <aside className="panel playlistColumn">
          <PlayList
            playListName={playListName}
            playlistTracks={playListTracks}
            onNameChange={updatePlayListName}
            onRemove={removeTrack}
            onSave={savePlayList}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;

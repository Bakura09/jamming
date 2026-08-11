import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import results from "./util/tracksMockObj.js";

function App() {
  const tracks = results.tracks.items;

  return (
    <>
      <h2>
        Ja<span className="title">mmm</span>ing
      </h2>
      <p>Enter a track name</p>
      <SearchBar />
      <SearchResults searchResults={tracks} />
    </>
  );
}

export default App;

import TrackList from "../TrackList/TrackList";

function SearchResults({ searchResults, onAdd }) {
  return (
    <div>
      <h2>Results</h2>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={true} />
    </div>
  );
}

export default SearchResults;

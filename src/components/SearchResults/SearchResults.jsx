import TrackList from "../TrackList/TrackList";

function SearchResults({ searchResults }) {
  return (
    <div>
      <h2>Results</h2>
      <TrackList songs={searchResults} />
    </div>
  );
}

export default SearchResults;

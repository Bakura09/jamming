import TrackList from "../TrackList/TrackList";

import styles from "./SearchResults.module.css";

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className={styles.resultsPanel}>
      <h2 className={styles.sectionTitle}>Results</h2>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={true} />
    </div>
  );
}

export default SearchResults;

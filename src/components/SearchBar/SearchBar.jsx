import { useCallback, useState } from "react";

import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = ({ target }) => {
    setTerm(target.value);
  };

  const search = useCallback(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchInput}
        placeholder="Enter a Song Title"
        onChange={handleChange}
      />
      <button type="button" className={styles.searchButton} onClick={search}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;

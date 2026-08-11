import { useCallback, useState } from "react";

function SearchBar({ onSearch }) {
  const [passTerm, setPassTerm] = useState("");

  const handleChange = ({ target }) => {
    setPassTerm(target.value);
  };

  const search = useCallback(() => {
    onSearch(passTerm);
  }, [onSearch, passTerm]);

  return (
    <div className="searchbar">
      <input
        type="search"
        placeholder="Enter a Song Title"
        onChange={handleChange}
        value={passTerm}
      />
      <button type="button" onClick={search}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;

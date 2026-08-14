import { useCallback, useState } from "react";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = ({ target }) => {
    setTerm(target.value);
  };

  const search = useCallback(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <div className="searchbar">
      <input placeholder="Enter a Song Title" onChange={handleChange} />
      <button type="button" onClick={search}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;

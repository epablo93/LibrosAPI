import React, { useState, useCallback, memo } from 'react';
import { useDebounce } from '../utils/debounce';

const SearchBox = memo(({ onSearch, placeholder = "Buscar...", delay = 500 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  // Trigger search when debounced value changes
  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {searchTerm && (
        <button 
          type="button" 
          onClick={handleClear}
          className="clear-button"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
});

export default SearchBox;

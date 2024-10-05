import React, { useState, useEffect } from "react";
import { herbloreProducts } from "../../data/herblore-product-list";
import "./SearchOverlay.css";

function SearchOverlay({ isVisible, onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      // Remove duplicates based on the 'key' property
      const uniqueProducts = Array.from(
        new Set(herbloreProducts.map((p) => p.key))
      ).map((key) => herbloreProducts.find((p) => p.key === key));

      const results = uniqueProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  if (!isVisible) return null;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-overlay">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for herblore products..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        <ul className="search-results">
          {searchResults.map((product) => (
            <li
              key={product.key}
              className="search-result-item"
              onClick={() => {
                onSelect(product);
                setSearchTerm("");
              }}
            >
              {product.name} (Herb: {product.herb}, XP: {product.xp})
            </li>
          ))}
        </ul>
        {searchResults.length === 0 && searchTerm.trim() !== "" && (
          <p>No results found</p>
        )}
        <button
          onClick={() => {
            onClose();
            setSearchTerm("");
          }}
          className="close-button"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SearchOverlay;

// src/components/SearchOverlay/SearchOverlay.jsx

import React from "react";
import "./SearchOverlay.css";
import ItemIcon from "../ItemIcon/ItemIcon";
import { useHerbloreSearch } from "../../hooks/useHerbloreSearch";

function SearchOverlay({ isVisible, onClose, onSelect }) {
  const { searchTerm, setSearchTerm, searchResults } = useHerbloreSearch();

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
              <div className="search-result-icon">
                {product.hasSprite ? (
                  <ItemIcon itemKey={product.spriteKey} />
                ) : (
                  <div className="placeholder-icon"></div>
                )}
              </div>
              <div className="search-result-info">
                <span className="search-result-name">{product.name}</span>
                <span className="search-result-details">
                  Herb: {product.herb} | XP: {product.xp}
                </span>
              </div>
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

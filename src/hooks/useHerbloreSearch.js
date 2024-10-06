// src/hooks/useHerbloreSearch.js

import { useState, useEffect, useMemo } from "react";
import { herbloreProducts } from "../data/herblore-product-list";
import { spriteMap } from "../utils/spriteMap";

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

const keyToSpriteKey = (key) => {
  const camelCaseKey = toCamelCase(key);
  return spriteMap.hasOwnProperty(camelCaseKey) ? camelCaseKey : null;
};

export const useHerbloreSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const results = herbloreProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const processedResults = useMemo(
    () =>
      searchResults.map((product) => {
        const spriteKey = keyToSpriteKey(product.key);
        return {
          ...product,
          spriteKey,
          hasSprite: spriteKey !== null,
        };
      }),
    [searchResults]
  );

  return {
    searchTerm,
    setSearchTerm,
    searchResults: processedResults,
  };
};

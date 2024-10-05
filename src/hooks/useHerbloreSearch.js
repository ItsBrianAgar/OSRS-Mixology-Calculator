import { useState, useEffect, useMemo } from "react";
import { herbloreProducts } from "../data/herblore-product-list";
import { spriteMap } from "../utils/spriteMap";

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

const specialCases = {
  serum_207: "serum207",
  super_attack_potion: "superAttack",
  super_energy_potion: "superEnergy",
  super_strength_potion: "superStrength",
  super_restore: "superRestore",
  super_defence: "superDefence",
  weapon_poison: "superantipoison",
  defence_potion: "superDefence",
};

const keyToSpriteKey = (key) => specialCases[key] || toCamelCase(key);

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
      searchResults.map((product) => ({
        ...product,
        spriteKey: keyToSpriteKey(product.key),
        hasSprite: !!spriteMap[keyToSpriteKey(product.key)],
      })),
    [searchResults]
  );

  return {
    searchTerm,
    setSearchTerm,
    searchResults: processedResults,
  };
};

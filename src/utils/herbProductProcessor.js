export function processHerbProducts(selectedHerbs, herbsData) {
  return Object.entries(selectedHerbs)
    .map(([herbKey, quantity]) => {
      const herb = herbsData.find((h) => h.key === herbKey);
      if (!herb) return null;

      return {
        herbName: herb.name,
        quantity,
        pasteType: herb.pasteType,
        pasteYield: herb.pasteYield * quantity,
        herbloreXP: herb.herbloreXP * quantity,
        availableProducts: herb.products.map((product) => ({
          ...product,
          totalXP: product.xp * quantity,
        })),
      };
    })
    .filter(Boolean);
}

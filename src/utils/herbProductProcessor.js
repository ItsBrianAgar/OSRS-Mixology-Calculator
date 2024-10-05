export function processHerbProducts(
  selectedHerbs,
  herbsData,
  blacklistedProducts,
  preferredProducts
) {
  return Object.entries(selectedHerbs)
    .map(([herbKey, quantity]) => {
      const herb = herbsData.find((h) => h.key === herbKey);
      if (!herb) return null;

      // Filter out blacklisted products
      let availableProducts = herb.products.filter(
        (product) => !blacklistedProducts.some((bp) => bp.name === product.name)
      );

      // If there are preferred products, filter to only show those
      const preferredAvailableProducts = availableProducts.filter((product) =>
        preferredProducts.some((pp) => pp.name === product.name)
      );

      if (preferredAvailableProducts.length > 0) {
        availableProducts = preferredAvailableProducts;
      }

      return {
        herbName: herb.name,
        quantity,
        pasteType: herb.pasteType,
        pasteYield: herb.pasteYield * quantity,
        herbloreXP: herb.herbloreXP * quantity,
        availableProducts: availableProducts.map((product) => ({
          ...product,
          totalXP: product.xp * quantity,
        })),
      };
    })
    .filter(Boolean);
}

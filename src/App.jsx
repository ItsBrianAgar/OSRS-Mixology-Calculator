import React, { useState, useEffect, useCallback } from "react";
import useDocumentMeta from "./hooks/useDocumentMeta.js";
import favicon from "./images/favicons/huasca.png";
import "./App.scss";
import RewardSelection from "./components/RewardSelection/RewardSelection.jsx";
import { rewards } from "./data/helper-data.js";
import HerbloreConfiguration from "./components/HerbloreConfiguration/HerbloreConfiguration.jsx";
import ResourceCalculation from "./components/ResourceCalculation/ResourceCalculation.jsx";
import { ProductProvider } from "./context/ProductContext.js";
import spriteSheetImage from "../src/images/sprite-sheet.png";
import { extractColors } from "./utils/colorUtils.js";

function App() {
  const [herbTotals, setHerbTotals] = useState({
    totalMox: 0,
    totalAga: 0,
    totalLye: 0,
  });

  const [itemTotals, setItemTotals] = useState({
    totalMox: 0,
    totalAga: 0,
    totalLye: 0,
    totalResin: 0,
  });

  const [selectedItems, setSelectedItems] = useState({});
  const [colorsLoaded, setColorsLoaded] = useState(false);

  useDocumentMeta("OSRS | Mixology Calculator", favicon);

  useEffect(() => {
    async function loadColors() {
      try {
        await extractColors(spriteSheetImage);
        setColorsLoaded(true);
      } catch (error) {
        setColorsLoaded(true); // Set to true even on error to allow app to render
      }
    }
    loadColors();
  }, []);

  const handleItemSelect = useCallback((itemKey, quantity) => {
    setSelectedItems((prevItems) => {
      if (quantity > 0) {
        return { ...prevItems, [itemKey]: quantity };
      } else {
        const { [itemKey]: _, ...rest } = prevItems;
        return rest;
      }
    });
  }, []);

  const updateHerbTotals = useCallback((newTotals) => {
    setHerbTotals(newTotals);
  }, []);

  const updateItemTotals = useCallback((newTotals) => {
    setItemTotals(newTotals);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedItems({});
    setHerbTotals({ totalMox: 0, totalAga: 0, totalLye: 0 });
    setItemTotals({ totalMox: 0, totalAga: 0, totalLye: 0, totalResin: 0 });
  }, []);

  const hasSelectedRewards = Object.keys(selectedItems).length > 0;

  if (!colorsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Mixology Calculator</h1>
      <section className="itemsUserWants">
        <h2>What items do you want?</h2>
        <p>
          Select the items that you want and the quantity from the options
          below.
        </p>
        <RewardSelection
          onItemSelect={handleItemSelect}
          selectedItems={selectedItems}
          rewardsData={rewards}
          updateItemTotals={updateItemTotals}
          colorsLoaded={colorsLoaded}
        />
      </section>
      <section className="herbloreConfiguration">
        <ProductProvider>
          <HerbloreConfiguration
            updateHerbTotals={updateHerbTotals}
            colorsLoaded={colorsLoaded}
          />
        </ProductProvider>
      </section>
      <section className="calculation-results">
        <ResourceCalculation
          herbTotals={herbTotals}
          itemTotals={itemTotals}
          hasSelectedRewards={hasSelectedRewards}
        />
      </section>
    </div>
  );
}

export default App;

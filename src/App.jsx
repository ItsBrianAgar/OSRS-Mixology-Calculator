import React, { useState, useEffect, useCallback } from "react";
import useDocumentMeta from "./hooks/useDocumentMeta.js";
import favicon from "./images/favicons/huasca.png";
import "./App.css";
import RewardSelection from "./components/RewardSelection/RewardSelection.jsx";
import { rewards } from "./data/helper-data.js";
import HerbloreConfiguration from "./components/HerbloreConfiguration/HerbloreConfiguration.jsx";
import ResourceCalculation from "./components/ResourceCalculation/ResourceCalculation.jsx";
import { ProductProvider } from "./context/ProductContext.js";

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

  useDocumentMeta("OSRS | Mixology Calculator", favicon);

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

  const handleReset = () => {
    setSelectedItems({});
    setHerbTotals({ totalMox: 0, totalAga: 0, totalLye: 0 });
    setItemTotals({ totalMox: 0, totalAga: 0, totalLye: 0, totalResin: 0 });
  };

  const hasSelectedRewards = Object.keys(selectedItems).length > 0;

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
        />
        <hr />
      </section>
      <section className="herbloreConfiguration">
        <ProductProvider>
          <HerbloreConfiguration updateHerbTotals={updateHerbTotals} />
        </ProductProvider>
      </section>
      <section className="calculation-results">
        <ResourceCalculation
          herbTotals={herbTotals}
          itemTotals={itemTotals}
          hasSelectedRewards={hasSelectedRewards}
        />
      </section>
      <button onClick={handleReset}>Reset All Data</button>
    </div>
  );
}

export default App;

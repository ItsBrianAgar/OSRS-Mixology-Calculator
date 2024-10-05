import React, { useState } from "react";
import useDocumentMeta from "./hooks/useDocumentMeta.js";
import favicon from "./images/favicons/huasca.png";
import "./App.css";
import RewardSelection from "./components/RewardSelection/RewardSelection.jsx";
import { rewards } from "./data/helper-data.js";
import HerbloreConfiguration from "./components/HerbloreConfiguration/HerbloreConfiguration.jsx";
import ResourceComparison from "./components/ResourceComparison/ResourceComparison.jsx";

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
  });

  useDocumentMeta("OSRS | Mixology Calculator", favicon);

  const [selectedItems, setSelectedItems] = useState({});

  const handleItemSelect = (itemKey, quantity) => {
    setSelectedItems((prevItems) => {
      if (quantity > 0) {
        return { ...prevItems, [itemKey]: quantity };
      } else {
        const { [itemKey]: _, ...rest } = prevItems;
        return rest;
      }
    });
  };

  const updateHerbTotals = (newTotals) => {
    setHerbTotals(newTotals);
  };

  const updateItemTotals = (newTotals) => {
    setItemTotals(newTotals);
  };

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
        <hr></hr>
      </section>
      <section className="herbloreConfiguration">
        <HerbloreConfiguration updateHerbTotals={updateHerbTotals} />
      </section>
      <section className="calculation-results">
        <ResourceComparison herbTotals={herbTotals} itemTotals={itemTotals} />
      </section>
    </div>
  );
}

export default App;

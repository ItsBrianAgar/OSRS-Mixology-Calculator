import React, { useState } from "react";
import useDocumentMeta from "./hooks/useDocumentMeta.js";
import favicon from "./images/favicons/huasca.png";
import "./App.css";
import RewardSelection from "./components/RewardSelection/RewardSelection.jsx";
import { rewards } from "./data/helper-data.js";
import HerbloreConfiguration from "./components/HerbloreConfiguration/HerbloreConfiguration.jsx";

function App() {
  // Set document metadata
  useDocumentMeta("OSRS | Mixology Calculator", favicon);

  // State to keep track of selected items
  const [selectedItems, setSelectedItems] = useState({});

  // Handler for selecting/deselecting items
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

  return (
    <div className="App">
      <h1>Mixology Calculator</h1>
      <section className="itemsUserWants">
        <h2>What items do you want?</h2>
        <p>
          Select the items that you want and the quantity from the options
          below.
        </p>
        {/* Render the main Rewards Selection Section */}
        <RewardSelection
          onItemSelect={handleItemSelect}
          selectedItems={selectedItems}
          rewardsData={rewards}
        />
        <hr></hr>
      </section>
      <section className="herbloreConfiguration">
        <HerbloreConfiguration />
      </section>
    </div>
  );
}

export default App;

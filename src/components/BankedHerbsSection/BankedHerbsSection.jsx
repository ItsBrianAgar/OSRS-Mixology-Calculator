import React, { useState } from "react";
import HerbCardList from "../HerbCardList/HerbCardList";
import BankedHerbsSummary from "../BankedHerbsSummary/BankedHerbsSummary";
import { herbs } from "../../data/helper-data";

function BankedHerbsSection({ updateHerbTotals, colorsLoaded }) {
  const [selectedHerbs, setSelectedHerbs] = useState({});

  const handleHerbSelect = (herbKey, quantity) => {
    setSelectedHerbs((prevHerbs) => {
      if (quantity > 0) {
        return { ...prevHerbs, [herbKey]: quantity };
      } else {
        const { [herbKey]: _, ...rest } = prevHerbs;
        return rest;
      }
    });
  };

  return (
    <div className="banked-herbs-section">
      <h2>What herbs do you have?</h2>
      <p>Log the herbs you have banked</p>
      <HerbCardList
        onHerbSelect={handleHerbSelect}
        herbsData={herbs}
        colorsLoaded={colorsLoaded}
      />
      <BankedHerbsSummary
        selectedHerbs={selectedHerbs}
        herbsData={herbs}
        updateHerbTotals={updateHerbTotals}
      />
    </div>
  );
}

export default BankedHerbsSection;

import React, { useState } from "react";
import HerbCardList from "../HerbCardList/HerbCardList";
import BankedHerbsSummary from "../BankedHerbsSummary/BankedHerbsSummary";
import { herbs } from "../../data/helper-data";

function BankedHerbsSection() {
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
      <h2>Banked Herbs</h2>
      <p>Log the herbs you have banked</p>
      <HerbCardList onHerbSelect={handleHerbSelect} herbsData={herbs} />
      <BankedHerbsSummary selectedHerbs={selectedHerbs} herbsData={herbs} />
    </div>
  );
}

export default BankedHerbsSection;
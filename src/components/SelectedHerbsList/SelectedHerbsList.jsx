import React from "react";
import SelectedHerb from "../SelectedHerb/SelectedHerb";
import "./SelectedHerbsList.css";

function SelectedHerbsList({ selectedHerbs, herbsData }) {
  return (
    <ul className="selected-herbs-list">
      {Object.entries(selectedHerbs).map(([herbKey, quantity]) => {
        const herb = herbsData.find((h) => h.key === herbKey);
        if (!herb) return null; // Skip if herb is not found
        return <SelectedHerb key={herbKey} herb={herb} quantity={quantity} />;
      })}
    </ul>
  );
}

export default SelectedHerbsList;

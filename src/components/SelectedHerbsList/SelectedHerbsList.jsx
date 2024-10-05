import React from "react";
import SelectedHerb from "../SelectedHerb/SelectedHerb";
import { processHerbProducts } from "../../utils/herbProductProcessor";
import "./SelectedHerbsList.css";

function SelectedHerbsList({ selectedHerbs, herbsData }) {
  const processedHerbs = processHerbProducts(
    selectedHerbs,
    herbsData,
    [], // No blacklisted products
    [] // No preferred products
  );

  return (
    <ul className="selected-herbs-list">
      {processedHerbs.map((herbData) => (
        <SelectedHerb key={herbData.herbName} herbData={herbData} />
      ))}
    </ul>
  );
}

export default SelectedHerbsList;

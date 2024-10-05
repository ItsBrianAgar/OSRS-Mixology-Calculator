import React from "react";
import SelectedHerb from "../SelectedHerb/SelectedHerb";
import { processHerbProducts } from "../../utils/herbProductProcessor";
import "./SelectedHerbsList.css";

function SelectedHerbsList({
  selectedHerbs,
  herbsData,
  preferredProducts,
  blacklistedProducts,
}) {
  const processedHerbs = processHerbProducts(
    selectedHerbs,
    herbsData,
    blacklistedProducts,
    preferredProducts
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

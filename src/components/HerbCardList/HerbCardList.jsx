import React from "react";
import HerbCard from "../HerbCard/HerbCard";
import "./HerbCardList.css";

function HerbCardList({ onHerbSelect, herbsData, colorsLoaded }) {
  return (
    <div className="herb-card-list">
      {herbsData.map((herb) => (
        <HerbCard
          key={herb.key}
          herb={herb}
          onSelect={onHerbSelect}
          colorsLoaded={colorsLoaded}
        />
      ))}
    </div>
  );
}

export default HerbCardList;

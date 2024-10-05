import React from "react";
import HerbCard from "../HerbCard/HerbCard";
import "./HerbCardList.css";

function HerbCardList({ onHerbSelect, herbsData }) {
  return (
    <div className="herb-card-list">
      {herbsData.map((herb) => (
        <HerbCard key={herb.key} herb={herb} onSelect={onHerbSelect} />
      ))}
    </div>
  );
}

export default HerbCardList;

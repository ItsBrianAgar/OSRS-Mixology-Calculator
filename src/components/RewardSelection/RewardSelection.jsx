import React from "react";
import ItemCardList from "../ItemCardList/ItemCardList";
import ChosenItemsSummary from "../ChosenItemsSummary/ChosenItemsSummary";
import "./RewardSelection.css";

function RewardSelection({ onItemSelect, selectedItems, rewardsData }) {
  return (
    <div className="reward-selection">
      {/* Render the list of all available reward items */}
      <div className="item-card-list-wrapper">
        <ItemCardList onItemSelect={onItemSelect} rewardsData={rewardsData} />
      </div>
      {/* Render the summary of chosen items */}
      <div className="chosen-items-summary-wrapper">
        <ChosenItemsSummary
          selectedItems={selectedItems}
          rewardsData={rewardsData}
        />
      </div>
    </div>
  );
}

export default RewardSelection;

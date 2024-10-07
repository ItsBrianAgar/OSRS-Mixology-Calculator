import React from "react";
import ItemCardList from "../ItemCardList/ItemCardList";
import ChosenItemsSummary from "../ChosenItemsSummary/ChosenItemsSummary";
import "./RewardSelection.css";

function RewardSelection({
  onItemSelect,
  selectedItems,
  rewardsData,
  updateItemTotals,
  colorsLoaded,
}) {
  return (
    <div className="reward-selection">
      <div className="item-card-list-wrapper">
        <ItemCardList
          onItemSelect={onItemSelect}
          rewardsData={rewardsData}
          colorsLoaded={colorsLoaded}
        />
      </div>
      <div className="chosen-items-summary-wrapper">
        <ChosenItemsSummary
          selectedItems={selectedItems}
          rewardsData={rewardsData}
          updateItemTotals={updateItemTotals}
        />
      </div>
    </div>
  );
}

export default RewardSelection;

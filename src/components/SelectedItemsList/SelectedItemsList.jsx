import React from "react";
import SelectedItem from "../SelectedItem/SelectedItem.jsx";
import "./SelectedItemsList.css";

function SelectedItemsList({ selectedItems, rewardsData }) {
  return (
    <ul className="selected-items-list">
      {Object.entries(selectedItems).map(([itemKey, quantity]) => {
        const item = rewardsData.find((reward) => reward.key === itemKey);
        if (!item) return null; // Skip if item is not found
        return <SelectedItem key={itemKey} item={item} quantity={quantity} />;
      })}
    </ul>
  );
}

export default SelectedItemsList;

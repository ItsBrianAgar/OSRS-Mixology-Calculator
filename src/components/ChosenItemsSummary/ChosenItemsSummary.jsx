import React from "react";
import "./ChosenItemsSummary.css";
import SelectedItemsList from "../SelectedItemsList/SelectedItemsList";
import SelectedItemTotals from "../SelectedItemTotals/SelectedItemTotals";

export default function ChosenItemsSummary({ selectedItems, rewardsData }) {
  const calculateTotals = () => {
    let totalMox = 0;
    let totalAga = 0;
    let totalLye = 0;
    let totalResin = 0;

    Object.entries(selectedItems).forEach(([itemKey, quantity]) => {
      const item = rewardsData.find((reward) => reward.key === itemKey);
      if (item) {
        totalMox += item.mox * quantity;
        totalAga += item.aga * quantity;
        totalLye += item.lye * quantity;
        totalResin += item.totalResin * quantity;
      }
    });

    return { totalMox, totalAga, totalLye, totalResin };
  };

  const totals = calculateTotals();

  return (
    <div className="chosen-items-summary">
      <h3>Selected Items:</h3>
      {Object.keys(selectedItems).length === 0 ? (
        <p>No items selected yet.</p>
      ) : (
        <>
          <SelectedItemsList
            selectedItems={selectedItems}
            rewardsData={rewardsData}
          />
          <SelectedItemTotals totals={totals} />
        </>
      )}
    </div>
  );
}

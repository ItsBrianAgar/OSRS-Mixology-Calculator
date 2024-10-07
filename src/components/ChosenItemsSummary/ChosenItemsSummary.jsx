import React, { useEffect, useMemo, useCallback } from "react";
import "./ChosenItemsSummary.css";
import SelectedItemsList from "../SelectedItemsList/SelectedItemsList";
import SelectedItemTotals from "../SelectedItemTotals/SelectedItemTotals";

function ChosenItemsSummary({ selectedItems, rewardsData, updateItemTotals }) {
  const calculateTotals = useCallback(() => {
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
  }, [selectedItems, rewardsData]);

  const totals = useMemo(() => calculateTotals(), [calculateTotals]);

  useEffect(() => {
    updateItemTotals(totals);
  }, [totals, updateItemTotals]);

  return (
    <div className="chosen-items-summary">
      <h3>Selected Items:</h3>
      {Object.keys(selectedItems).length === 0 ? (
        <p className="grey-text">No items selected yet.</p>
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

export default React.memo(ChosenItemsSummary);

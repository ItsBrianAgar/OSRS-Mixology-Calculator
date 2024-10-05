// SelectedItemTotals.jsx
import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./SelectedItemTotals.css";

function SelectedItemTotals({ totals }) {
  return (
    <div className="selected-item-totals">
      <h4 className="selected-item-totals--title">Totals:</h4>
      <p className="selected-item-totals--detail-item">
        Total Mox: {formatNumber(totals.totalMox)}
      </p>
      <p className="selected-item-totals--detail-item">
        Total Aga: {formatNumber(totals.totalAga)}
      </p>
      <p className="selected-item-totals--detail-item">
        Total Lye: {formatNumber(totals.totalLye)}
      </p>
      <p className="selected-item-totals--detail-item">
        Total Resin: {formatNumber(totals.totalResin)}
      </p>
    </div>
  );
}

export default SelectedItemTotals;

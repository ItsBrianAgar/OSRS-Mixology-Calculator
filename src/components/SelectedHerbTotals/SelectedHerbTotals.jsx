import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./SelectedHerbTotals.css";

function SelectedHerbTotals({ totals }) {
  return (
    <div className="selected-herb-totals">
      <h4 className="selected-herb-totals--title">Totals:</h4>
      <p className="selected-herb-totals--detail-item">
        Total Herbs: {formatNumber(totals.totalHerbs)}
      </p>
      <p className="selected-herb-totals--detail-item">
        Total Mox: {formatNumber(totals.totalMox)}
      </p>
      <p className="selected-herb-totals--detail-item">
        Total Aga: {formatNumber(totals.totalAga)}
      </p>
      <p className="selected-herb-totals--detail-item">
        Total Lye: {formatNumber(totals.totalLye)}
      </p>
      <p className="selected-herb-totals--detail-item">
        Total Herblore XP: {formatNumber(totals.totalHerbloreXP)}
      </p>
    </div>
  );
}

export default SelectedHerbTotals;

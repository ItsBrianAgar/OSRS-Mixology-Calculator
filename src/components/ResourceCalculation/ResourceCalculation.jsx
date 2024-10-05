import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./ResourceCalculation.css";

function ResourceCalculation({ herbTotals, itemTotals, hasSelectedRewards }) {
  if (!hasSelectedRewards) {
    return (
      <div className="resource-calculation">
        <p>Select at least one reward to see the resource calculation.</p>
      </div>
    );
  }

  const moxDifference = herbTotals.totalMox - itemTotals.totalMox;
  const agaDifference = herbTotals.totalAga - itemTotals.totalAga;
  const lyeDifference = herbTotals.totalLye - itemTotals.totalLye;

  const getStatusMessage = (difference) => {
    if (difference > 0) {
      return `Surplus: ${formatNumber(difference)}`;
    } else if (difference < 0) {
      return `Needed: ${formatNumber(Math.abs(difference))}`;
    } else {
      return "Exact amount";
    }
  };

  const getStatusClass = (difference) => {
    if (difference > 0) return "sufficient";
    if (difference < 0) return "insufficient";
    return "exact";
  };

  return (
    <div className="resource-calculation">
      <h4 className="resource-calculation--title">Resource Calculation:</h4>
      <p
        className={`resource-calculation--detail-item ${getStatusClass(
          moxDifference
        )}`}
      >
        Mox: {formatNumber(herbTotals.totalMox)} (Required:{" "}
        {formatNumber(itemTotals.totalMox)})
        <br />
        <span className="status-message">
          {getStatusMessage(moxDifference)}
        </span>
      </p>
      <p
        className={`resource-calculation--detail-item ${getStatusClass(
          agaDifference
        )}`}
      >
        Aga: {formatNumber(herbTotals.totalAga)} (Required:{" "}
        {formatNumber(itemTotals.totalAga)})
        <br />
        <span className="status-message">
          {getStatusMessage(agaDifference)}
        </span>
      </p>
      <p
        className={`resource-calculation--detail-item ${getStatusClass(
          lyeDifference
        )}`}
      >
        Lye: {formatNumber(herbTotals.totalLye)} (Required:{" "}
        {formatNumber(itemTotals.totalLye)})
        <br />
        <span className="status-message">
          {getStatusMessage(lyeDifference)}
        </span>
      </p>
    </div>
  );
}

export default ResourceCalculation;

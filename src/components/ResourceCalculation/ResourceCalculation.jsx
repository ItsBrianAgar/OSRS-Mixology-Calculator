import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./ResourceCalculation.css";

function ResourceCalculation({
  herbTotals,
  pasteTotals,
  itemTotals,
  hasSelectedRewards,
}) {
  if (!hasSelectedRewards) {
    return (
      <div className="resource-calculation">
        <p>Select at least one reward to see the resource calculation.</p>
      </div>
    );
  }

  const moxDifference =
    herbTotals.totalMox + pasteTotals.totalMox - itemTotals.totalMox;
  const agaDifference =
    herbTotals.totalAga + pasteTotals.totalAga - itemTotals.totalAga;
  const lyeDifference =
    herbTotals.totalLye + pasteTotals.totalLye - itemTotals.totalLye;

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

  const isAllPasteCovered =
    moxDifference >= 0 && agaDifference >= 0 && lyeDifference >= 0;

  return (
    <div className="resource-calculation">
      <h4 className="resource-calculation--title">Resource Calculation:</h4>
      <p
        className={`resource-calculation--detail-item ${getStatusClass(
          moxDifference
        )}`}
      >
        Mox: {formatNumber(herbTotals.totalMox + pasteTotals.totalMox)}{" "}
        (Required: {formatNumber(itemTotals.totalMox)})
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
        Aga: {formatNumber(herbTotals.totalAga + pasteTotals.totalAga)}{" "}
        (Required: {formatNumber(itemTotals.totalAga)})
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
        Lye: {formatNumber(herbTotals.totalLye + pasteTotals.totalLye)}{" "}
        (Required: {formatNumber(itemTotals.totalLye)})
        <br />
        <span className="status-message">
          {getStatusMessage(lyeDifference)}
        </span>
      </p>
      {isAllPasteCovered && (
        <p className="resource-calculation--success-message">
          All paste costs for rewards are covered!
        </p>
      )}
    </div>
  );
}

export default ResourceCalculation;

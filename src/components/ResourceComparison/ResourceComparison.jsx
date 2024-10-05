import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./ResourceComparison.css";

function ResourceComparison({ herbTotals, itemTotals }) {
  const moxDifference = herbTotals.totalMox - itemTotals.totalMox;
  const agaDifference = herbTotals.totalAga - itemTotals.totalAga;
  const lyeDifference = herbTotals.totalLye - itemTotals.totalLye;

  const getStatusMessage = (difference) => {
    if (difference >= 0) {
      return `Surplus: ${formatNumber(difference)}`;
    } else {
      return `Needed: ${formatNumber(Math.abs(difference))}`;
    }
  };

  return (
    <div className="resource-comparison">
      <h4 className="resource-comparison--title">Resource Comparison:</h4>
      <p
        className={`resource-comparison--detail-item ${
          moxDifference >= 0 ? "sufficient" : "insufficient"
        }`}
      >
        Mox: {formatNumber(moxDifference)}(
        {moxDifference >= 0 ? "Sufficient" : "Insufficient"})
        <br />
        <span className="status-message">
          {getStatusMessage(moxDifference)}
        </span>
      </p>
      <p
        className={`resource-comparison--detail-item ${
          agaDifference >= 0 ? "sufficient" : "insufficient"
        }`}
      >
        Aga: {formatNumber(agaDifference)}(
        {agaDifference >= 0 ? "Sufficient" : "Insufficient"})
        <br />
        <span className="status-message">
          {getStatusMessage(agaDifference)}
        </span>
      </p>
      <p
        className={`resource-comparison--detail-item ${
          lyeDifference >= 0 ? "sufficient" : "insufficient"
        }`}
      >
        Lye: {formatNumber(lyeDifference)}(
        {lyeDifference >= 0 ? "Sufficient" : "Insufficient"})
        <br />
        <span className="status-message">
          {getStatusMessage(lyeDifference)}
        </span>
      </p>
    </div>
  );
}

export default ResourceComparison;

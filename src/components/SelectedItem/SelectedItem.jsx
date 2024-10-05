import React from "react";
import "./SelectedItem.css";
import { formatNumber } from "../../utils/numberFormatter";

function SelectedItem({ item, quantity }) {
  return (
    <li className="selected-item">
      <p className="selected-item--item-title">
        <span className="selected-item--item-name">{item.name}</span>:{" "}
        {formatNumber(quantity)}
      </p>
      <ul className="selected-item--detail-list">
        <li className="selected-item--detail-item">
          Mox: {formatNumber(item.mox * quantity)}
        </li>
        <li className="selected-item--detail-item">
          Aga: {formatNumber(item.aga * quantity)}
        </li>
        <li className="selected-item--detail-item">
          Lye: {formatNumber(item.lye * quantity)}
        </li>
        {/* <li>Total Resin: {formatNumber(item.totalResin * quantity)}</li> */}
      </ul>
    </li>
  );
}

export default SelectedItem;

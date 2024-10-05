import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./SelectedHerb.css";

function SelectedHerb({ herb, quantity }) {
  return (
    <li className="selected-herb">
      <p className="selected-herb--title">
        <span className="selected-herb--name">{herb.name}</span>:{" "}
        {formatNumber(quantity)}
      </p>
      <ul className="selected-herb--detail-list">
        <li className="selected-herb--detail-item">
          Paste Type: {herb.pasteType}
        </li>
        <li className="selected-herb--detail-item">
          Paste Yield: {formatNumber(herb.pasteYield * quantity)}
        </li>
        <li className="selected-herb--detail-item">
          Herblore XP: {formatNumber(herb.herbloreXP * quantity)}
        </li>
      </ul>
    </li>
  );
}

export default SelectedHerb;

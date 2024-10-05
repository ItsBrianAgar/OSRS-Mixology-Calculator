import React from "react";
import { formatNumber } from "../../utils/numberFormatter";
import "./SelectedHerb.css";

function SelectedHerb({ herbData }) {
  return (
    <li className="selected-herb">
      <p className="selected-herb--title">
        <span className="selected-herb--name">{herbData.herbName}</span>:{" "}
        {formatNumber(herbData.quantity)}
      </p>
      <ul className="selected-herb--detail-list">
        <li className="selected-herb--detail-item">
          Paste Type: {herbData.pasteType}
        </li>
        <li className="selected-herb--detail-item">
          Paste Yield: {formatNumber(herbData.pasteYield)}
        </li>
        <li className="selected-herb--detail-item">
          Herblore XP: {formatNumber(herbData.herbloreXP)}
        </li>
      </ul>
      <div className="selected-herb--forfeited-products">
        <p>Forfeited Products:</p>
        <ul className="selected-herb--forfeited-list">
          {herbData.availableProducts.map((product, index) => (
            <li key={index} className="selected-herb--forfeited-item">
              <p className="selected-herb--forfeited-name">
                {product.name} (3)
              </p>
              <p className="selected-herb--forfeited-quantity">
                Quantity: {formatNumber(herbData.quantity)}
              </p>
              <p className="selected-herb--forfeited-xp">
                XP: {formatNumber(product.totalXP)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default SelectedHerb;

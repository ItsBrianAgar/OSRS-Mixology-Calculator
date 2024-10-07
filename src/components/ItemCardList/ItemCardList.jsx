import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function ItemCardList({ onItemSelect, rewardsData, colorsLoaded }) {
  return (
    <div className="item-card-list">
      {rewardsData.map((item) => (
        <ItemCard
          key={item.key}
          item={item}
          onSelect={onItemSelect}
          colorsLoaded={colorsLoaded}
        />
      ))}
    </div>
  );
}

export default ItemCardList;

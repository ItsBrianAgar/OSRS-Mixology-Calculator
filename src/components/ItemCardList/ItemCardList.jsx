import React from "react";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemCardList({ onItemSelect, rewardsData }) {
  return (
    <div className="item-card-list">
      {/* Map through rewardsData to create an ItemCard for each reward item */}
      {rewardsData.map((item) => (
        <ItemCard key={item.key} item={item} onSelect={onItemSelect} />
      ))}
    </div>
  );
}

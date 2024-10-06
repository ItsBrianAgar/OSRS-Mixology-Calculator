import React, { useState, useEffect } from "react";
import "./HerbCard.css";
import ItemIcon from "../ItemIcon/ItemIcon";
import { getItemColor } from "../../utils/colorUtils";

function HerbCard({ herb, onSelect, colorsLoaded }) {
  const [isChecked, setIsChecked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (colorsLoaded) {
      const color = getItemColor(herb.key);
      console.log(herb.key, color);
      setBackgroundColor(color);
    }
  }, [colorsLoaded, herb.key]);

  const handleCardClick = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    const newQuantity = newIsChecked ? 1 : 0;
    setQuantity(newQuantity);
    onSelect(herb.key, newQuantity);
  };

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
    setIsChecked(newQuantity > 0);
    onSelect(herb.key, newQuantity);
  };

  return (
    <div
      className={`herb-card ${isChecked ? "selected" : ""}`}
      onClick={handleCardClick}
      style={{ backgroundColor }}
    >
      <input
        className="selectionBox"
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
        onClick={(e) => e.stopPropagation()}
      />
      <ItemIcon itemKey={herb.key} />
      <p>{herb.name}</p>
      <p className="herb-paste-type">{herb.pasteType} paste</p>{" "}
      {/* Paste type displayed here */}
      <input
        className="inputField"
        type="number"
        value={isChecked ? quantity : ""}
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
        min="0"
        placeholder="0"
      />
    </div>
  );
}

export default HerbCard;

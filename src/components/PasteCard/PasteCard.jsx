import React, { useState, useEffect } from "react";
import "./PasteCard.css";
import ItemIcon from "../ItemIcon/ItemIcon";
import { getItemColor, getItemVibrantColor } from "../../utils/colorUtils";

function PasteCard({ paste, onSelect, colorsLoaded }) {
  const [isChecked, setIsChecked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#eee");
  const [titleColor, setTitleColor] = useState("black");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (colorsLoaded) {
      const cardBackgroundColor = getItemColor(paste.key);
      const cardTitleColor = getItemVibrantColor(paste.key);
      setBackgroundColor(cardBackgroundColor);
      setTitleColor(cardTitleColor);
    }
  }, [colorsLoaded, paste.key]);

  const handleCardClick = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    const newQuantity = newIsChecked ? 1 : 0;
    setQuantity(newQuantity);
    onSelect(paste.key, newQuantity);
  };

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
    setIsChecked(newQuantity > 0);
    onSelect(paste.key, newQuantity);
  };

  const cardStyle = {
    backgroundColor: isChecked ? backgroundColor : "#eee",
  };

  const titleStyle = {
    color: isChecked ? titleColor : "black",
  };

  return (
    <div
      className={`paste-card ${isChecked ? "selected" : ""}`}
      onClick={handleCardClick}
      style={cardStyle}
    >
      <input
        className="selectionBox"
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
        onClick={(e) => e.stopPropagation()}
      />
      <ItemIcon itemKey={paste.key} />
      <p className="paste-card--title" style={titleStyle}>
        {paste.name}
      </p>
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

export default PasteCard;

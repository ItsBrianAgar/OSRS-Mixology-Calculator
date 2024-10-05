import React, { useState, useRef } from "react";
import "./ItemCard.css";
import ItemIcon from "../ItemIcon/ItemIcon";

export default function ItemCard({ item, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef(null);

  const handleCardClick = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    const newQuantity = newIsChecked ? 1 : 0;
    setQuantity(newQuantity);
    onSelect(item.key, newQuantity);
  };

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
    setIsChecked(newQuantity > 0);
    onSelect(item.key, newQuantity);
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
    if (!isChecked) {
      setIsChecked(true);
      setQuantity(1);
      onSelect(item.key, 1);
    }
  };

  const handleInputBlur = () => {
    setIsInputActive(false);
    if (quantity === 0) {
      setIsChecked(false);
      onSelect(item.key, 0);
    }
  };

  return (
    <div
      className={`rewardItemCard ${
        isChecked || isInputActive ? "selected" : ""
      }`}
      onClick={handleCardClick}
    >
      <input
        type="checkbox"
        className="selectionBox"
        checked={isChecked}
        onChange={() => {}}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="itemIconWrapper">
        <ItemIcon itemKey={item.key} />
      </div>
      <p className="itemName">{item.name}</p>
      <input
        ref={inputRef}
        type="number"
        value={isChecked ? quantity : ""}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="inputField"
        onClick={(e) => e.stopPropagation()}
        min="1"
        placeholder="0"
      />
    </div>
  );
}

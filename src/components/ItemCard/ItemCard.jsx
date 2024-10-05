import React, { useState, useRef } from "react";
import "./ItemCard.css";

export default function ItemCard({ item, onSelect }) {
  // State variables for managing the item's selection and quantity
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef(null);

  // Handler for when the card is clicked
  const handleCardClick = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    const newQuantity = newIsChecked ? 1 : 0;
    setQuantity(newQuantity);
    onSelect(item.key, newQuantity);
  };

  // Handler for changes in the quantity input field
  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
    setIsChecked(newQuantity > 0);
    onSelect(item.key, newQuantity);
  };

  // Handler for when the input field gains focus
  const handleInputFocus = () => {
    setIsInputActive(true);
    if (!isChecked) {
      setIsChecked(true);
      setQuantity(1);
      onSelect(item.key, 1);
    }
  };

  // Handler for when the input field loses focus
  const handleInputBlur = () => {
    setIsInputActive(false);
    if (quantity === 0) {
      setIsChecked(false);
      onSelect(item.key, 0);
    }
  };

  // Render the ItemCard component
  return (
    <div
      className={`rewardItemCard ${
        isChecked || isInputActive ? "selected" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Checkbox for item selection */}
      <input
        type="checkbox"
        className="selectionBox"
        checked={isChecked}
        onChange={() => {}}
        onClick={(e) => e.stopPropagation()}
      />
      {/* Display item name */}
      <p>{item.name}</p>
      {/* Input field for quantity selection */}
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

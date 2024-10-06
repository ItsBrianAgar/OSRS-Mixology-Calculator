import React, { useState, useRef, useEffect } from "react";
import "./ItemCard.css";
import ItemIcon from "../ItemIcon/ItemIcon";
import { getItemColor } from "../../utils/colorUtils";

export default function ItemCard({
  item,
  onSelect,
  quantity = 0,
  colorsLoaded,
}) {
  const [isChecked, setIsChecked] = useState(quantity > 0);
  const [isInputActive, setIsInputActive] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [inputValue, setInputValue] = useState(quantity.toString());
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (colorsLoaded) {
      const color = getItemColor(item.key);
      setBackgroundColor(color);
    }
  }, [colorsLoaded, item.key]);

  useEffect(() => {
    setIsChecked(quantity > 0);
    setInputValue(quantity > 0 ? quantity.toString() : "");
  }, [quantity]);

  const handleCardClick = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    const newQuantity = newIsChecked ? 1 : 0;
    setInputValue(newQuantity.toString());
    onSelect(item.key, newQuantity);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const newQuantity = parseInt(newValue) || 0;
    setIsChecked(newQuantity > 0);
    onSelect(item.key, newQuantity);
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
    if (!isChecked) {
      setIsChecked(true);
      setInputValue("1");
      onSelect(item.key, 1);
    }
  };

  const handleInputBlur = () => {
    setIsInputActive(false);
    const newQuantity = parseInt(inputValue) || 0;
    if (newQuantity === 0) {
      setIsChecked(false);
      setInputValue("");
      onSelect(item.key, 0);
    } else {
      setInputValue(newQuantity.toString());
    }
  };

  return (
    <div
      ref={cardRef}
      className={`rewardItemCard ${
        isChecked || isInputActive ? "selected" : ""
      }`}
      onClick={handleCardClick}
      style={{ backgroundColor }}
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
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="inputField"
        onClick={(e) => e.stopPropagation()}
        min="0"
        placeholder="0"
      />
    </div>
  );
}

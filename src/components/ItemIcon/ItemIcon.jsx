import React from "react";
import SpriteImage from "../SpriteImage/SpriteImage";
import spriteSheetImage from "../../images/sprite-sheet.png";
import { spriteMap } from "../../utils/spriteMap";

const ItemIcon = ({ itemKey }) => {
  if (!spriteMap[itemKey]) {
    console.warn(`No sprite position found for item key: ${itemKey}`);
    return (
      <div
        style={{ width: "40px", height: "40px", backgroundColor: "lightgrey" }}
      ></div>
    );
  }

  const position = spriteMap[itemKey];

  return (
    <SpriteImage
      spriteSheet={spriteSheetImage}
      x={position.x}
      y={position.y}
      width={40}
      height={40}
      alt={itemKey}
    />
  );
};

export default ItemIcon;

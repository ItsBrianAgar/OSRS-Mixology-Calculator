import React from "react";

const SpriteImage = ({ spriteSheet, x, y, width, height, alt }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `url(${spriteSheet}) -${x}px -${y}px no-repeat`,
        display: "inline-block",
      }}
      role="img"
      aria-label={alt}
    />
  );
};

export default SpriteImage;

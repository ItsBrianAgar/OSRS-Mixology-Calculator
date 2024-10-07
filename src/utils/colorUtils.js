import ColorThief from "color-thief-browser";
import { spriteMap } from "./spriteMap";

const colorCache = new Map();
const vibrantColorCache = new Map();

const createDarkerShade = (color, darkenFactor = 0.4) => {
  const r = Math.round(color[0] * (1 + darkenFactor));
  const g = Math.round(color[1] * (1 + darkenFactor));
  const b = Math.round(color[2] * (1 + darkenFactor));

  return [r, g, b];
};

const createVibrantColor = (color) => {
  const [h, s, l] = rgbToHsl(...color);

  // Increase saturation
  const newSaturation = Math.min(s * 4, 1);

  // Increase lightness, but keep it in a reasonable range
  const newLightness = Math.min(Math.max(l * 0.8, 0.1), 0.25);

  return hslToRgb(h, newSaturation, newLightness);
};

export const extractColors = async (spriteSheetImage) => {
  const colorThief = new ColorThief();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 40;
  canvas.height = 40;

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = spriteSheetImage;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      try {
        Object.entries(spriteMap).forEach(([key, position]) => {
          ctx.clearRect(0, 0, 40, 40);
          ctx.drawImage(img, position.x, position.y, 40, 40, 0, 0, 40, 40);

          const colorPalette = colorThief.getPalette(canvas, 5);
          const vibrantColor = colorPalette.reduce((mostVibrant, color) => {
            const [, s1] = rgbToHsl(...color);
            const [, s2] = rgbToHsl(...mostVibrant);
            return s1 > s2 ? color : mostVibrant;
          });

          const darkerShade = createDarkerShade(vibrantColor);
          const moreVibrantColor = createVibrantColor(vibrantColor);

          const colorString = `rgba(${darkerShade[0]}, ${darkerShade[1]}, ${darkerShade[2]}, 0.15)`;
          const vibrantColorString = `rgb(${moreVibrantColor[0]}, ${moreVibrantColor[1]}, ${moreVibrantColor[2]})`;

          colorCache.set(key, colorString);
          vibrantColorCache.set(key, vibrantColorString);
        });
        resolve();
      } catch (error) {
        console.error("Color extraction error:", error);
        reject(error);
      }
    };
    img.onerror = reject;
  });
};

export const getItemColor = (itemKey) => {
  const color = colorCache.get(itemKey);
  return color || "transparent";
};

export const getItemVibrantColor = (itemKey) => {
  const vibrantColor = vibrantColorCache.get(itemKey);
  return vibrantColor || "rgb(82, 6, 57)"; // Fallback color
};

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// src/utils/numberParser.js

/**
 * Parses a string input that may contain shorthand notations (k, m, b) for numbers
 * and returns the corresponding numeric value.
 *
 * @param {string} input - The input string to parse
 * @returns {number|null} The parsed number or null if input is invalid
 */
export function parseNumberInput(input) {
  if (typeof input !== "string") {
    return null;
  }

  // Remove any commas and trim whitespace
  input = input.replace(/,/g, "").trim().toLowerCase();

  // Check if the input is already a valid number
  if (!isNaN(input)) {
    return Number(input);
  }

  const multipliers = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
  };

  const regex = /^(\d+(\.\d+)?)\s*([kmb])$/;
  const match = input.match(regex);

  if (match) {
    const [, number, , multiplier] = match;
    return Number(number) * multipliers[multiplier];
  }

  return null;
}

/**
 * Formats a number to a string with appropriate suffix (k, m, b)
 *
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export function formatNumberWithSuffix(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

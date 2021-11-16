/* resistor.js */

/*
  elctronic resistors have colored bands where each color represents a numerical number
  Electrical engineers can read the colors and
  determine the resitance value in Ohms

  see this resistor calculator for help
   http://bit.ly/2NjS274
*/

function getColorValue(color) {
  const colorCodes = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
  };
  return colorCodes[color];
}

/**
 * Returns the number of the multiplier
 * @param {string} color - the color of the multiplier bands
 * @returns {number} - the multiplier number
 */
function getMultiplierValue(color) {
  const multiplierCodes = {
    black: 1,
    brown: 10,
    red: 100,
    orange: 1000,
    yellow: 10000,
    green: 100000,
    blue: 1000000,
    violet: 10000000,
    grey: 100000000,
    white: 1000000000,
    gold: 0.1,
    silver: 0.01,
  };
  return multiplierCodes[color];
}

/**
 * Returns the value of the first 3 bands of the resistor colors
 * @param {object} bands - an object with 2 keys
 * @param {string} bands.color1 - the first color
 * @param {string} bands.color2 - the second color
 * @param {string} bands.multiplier - the multiplier color
 * @returns {number} - representing the value of the first 3 bands of the resistor
 */
function getThreeBandValue(bands) {
  const first = getColorValue(bands.color1).toString();
  const second = getColorValue(bands.color2).toString();
  const together = +(first + second);
  const total = together * getMultiplierValue(bands.multiplier);
  if (bands.multiplier === "gold") {
    return +total.toFixed(1);
  }
  if (bands.multiplier === "silver") {
    return +total.toFixed(2);
  }
  return total;
}

/**
 * Returns a string representation of the value with metric notation
 * @param {number} val - number representing the value of the resistor
 * @returns {string} - a string representation of the numeric value with metric notation
 */
function formatNumber(val) {
  const valString = val.toString();
  const valLength = valString.length;

  if (valLength <= 3) {
    return valString;
  }
  if (valLength > 3 && valLength <= 6) {
    return `${(val / 1000).toString()}k`;
  }
  if (valLength > 6 && valLength <= 9) {
    return `${(val / 1000000).toString()}M`;
  }
  if (valLength > 9 && valLength <= 12) {
    return `${(val / 1000000000).toString()}G`;
  }
  return undefined;
}

/**
 * Returns the tolerance of the resistor according to its color value
 * @param {string} color - the color of the tolerance band to
 * @returns {string} - the tolerance value in percent using the ± symbol
 */
function getTolerance(color) {
  const colorTolerance = {
    brown: "±1%",
    red: "±2%",
    green: "±0.5%",
    blue: "±0.25%",
    violet: "±0.1%",
    grey: "±0.05%",
    gold: "±5%",
    silver: "±10%",
  };
  return colorTolerance[color];
}

/**
 *
 * @param {object} bands - the object with the 4 bands
 * @param {string} bands.color1 - the first color
 * @param {string} bands.color2 - the second color
 * @param {string} bands.multiplier - the multiplier color
 * @param {string} bands.tolerance - the tolerance color
 * @returns {string} - a string representation of the resistor value according to
 */
function getResistorOhms(bands) {
  const resistorValue = formatNumber(getThreeBandValue(bands));
  return `Resistor value: ${resistorValue} Ohms ${getTolerance(
    bands.tolerance
  )}`;
}

export { getResistorOhms };

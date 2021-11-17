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

  if (valLength <= 3 || valString.includes(".")) {
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
 * Get the color of the band according to its value
 * @param {number} val - band value
 * @returns {string} color
 */
function getBandColor(val) {
  const bandColors = {
    0: "black",
    1: "brown",
    2: "red",
    3: "orange",
    4: "yellow",
    5: "green",
    6: "blue",
    7: "violet",
    8: "grey",
    9: "white",
  };
  return bandColors[val];
}

/**
 * Get color of the multiplier band from value
 * @param {number} val - multiplier value
 * @returns {string} color
 */
function getMultiplierColor(val) {
  const multiplierColors = {
    1: "black",
    10: "brown",
    100: "red",
    1000: "orange",
    10000: "yellow",
    100000: "green",
    1000000: "blue",
    10000000: "violet",
    100000000: "grey",
    1000000000: "white",
    0.1: "gold",
    0.01: "silver",
  };
  return multiplierColors[val];
}

/**
 * Get color of tolerance band from value
 * @param {string} val - tolerance value
 * @returns {string} color
 */
function getToleranceColor(val) {
  const toleranceColor = {
    "±1%": "brown",
    "±2%": "red",
    "±0.5%": "green",
    "±0.25%": "blue",
    "±0.1%": "violet",
    "±0.05%": "grey",
    "±5%": "gold",
    "±10%": "silver",
  };
  return toleranceColor[val];
}

/**
 * Returns the value of the first two bands and multiplier
 * @param {string} val - resistor value
 * @returns {object} val - values
 */
function getValues(val) {
  //initiate band values
  let band1;
  let band2;
  let multiplier;

  //initiate variables
  let num;
  let longVal;
  let tag = false;

  //if there's a tag...
  if (val.includes("k")) {
    num = val.slice(0, val.length - 1);
    longVal = `${num * 1000}`;
    tag = true;
  } else if (val.includes("M")) {
    num = val.slice(0, val.length - 1);
    longVal = `${num * 1000000}`;
    tag = true;
  } else if (val.includes("G")) {
    num = val.slice(0, val.length - 1);
    longVal = `${num * 1000000000}`;
    tag = true;
    //handle decimals...(without tag)
  } else if (val.includes(".")) {
    num = val;
    if (val[0] === "0") {
      longVal = `${num * 100}`;
      multiplier = 0.01;
    } else {
      longVal = `${num * 10}`;
      multiplier = 0.1;
    }
    //no tag, no decimal
  } else {
    num = val;
  }
  //get bare num for band values
  let parsedVal = longVal.slice(0, 2);

  //band values
  band1 = parsedVal[0];
  if (!parsedVal[1]) {
    band1 = "0";
    band2 = parsedVal[0];
  } else {
    band2 = parsedVal[1];
  }

  //if it doesn't have a decimal, or for decimals w/ a tag
  if (!num.includes(".") || tag) {
    multiplier = longVal / parsedVal;
  }

  return { band1: band1, band2: band2, multiplier: multiplier };
}

/**
 * Returns an object of band colors
 * @param {string} val - resistor value in Ohms
 * @param {string} val - tolerance value
 * @returns {object} - an object with the color of the 4 bands
 */
function getBandColors(resistorValue, toleranceValue) {
  let values = getValues(resistorValue);
  console.log(values);
  let color1 = getBandColor(values.band1);
  let color2 = getBandColor(values.band2);
  let multiplier = getMultiplierColor(values.multiplier);
  let tolerance = getToleranceColor(toleranceValue);
  return {
    color1: color1,
    color2: color2,
    multiplier: multiplier,
    tolerance: tolerance,
  };
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

export { getResistorOhms, getBandColors };

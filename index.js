import { getResistorOhms } from "./resistor.js";

//buttons
const allButtons = document.querySelectorAll(".box");
const firstBandColor = document.querySelector("#b0");
const secondBandColor = document.querySelector("#b1");
const multiplierBandColor = document.querySelector("#b2");
const toleranceBandColor = document.querySelector("#b3");

allButtons.forEach((button) => {
  button.addEventListener("click", changeColor);
  button.addEventListener("click", calculateValue);
});

function changeColor(e) {
  const selectedColor = e.target.innerText.toLowerCase();
  const currentBand = e.target.parentElement.id;

  if (currentBand === "color0") {
    firstBandColor.className = `band ${selectedColor}`;
  } else if (currentBand === "color1") {
    secondBandColor.className = `band ${selectedColor}`;
  } else if (currentBand === "color2") {
    multiplierBandColor.className = `band ${selectedColor}`;
  } else if (currentBand === "color3") {
    toleranceBandColor.className = `band ${selectedColor}`;
  }
}

function calculateValue(e) {
  const resistorValue = document.querySelector(".answer");

  const text = getResistorOhms({
    color1: `${firstBandColor.classList[1]}`,
    color2: `${secondBandColor.classList[1]}`,
    multiplier: `${multiplierBandColor.classList[1]}`,
    tolerance: `${toleranceBandColor.classList[1]}`,
  });

  resistorValue.innerText = text;
}

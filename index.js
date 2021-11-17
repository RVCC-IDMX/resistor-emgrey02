import { getResistorOhms, getBandColors } from "./resistor.js";

//buttons
const allButtons = document.querySelectorAll(".box");
const firstBandColor = document.querySelector("#b0");
const secondBandColor = document.querySelector("#b1");
const multiplierBandColor = document.querySelector("#b2");
const toleranceBandColor = document.querySelector("#b3");
const enter = document.querySelector("#enter");

//form
const form = document.querySelector("form");

enter.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkRequiredFields()) {
    checkOhmValue(form.elements[1].value, form.elements[2].value);
    calculateValue(e);
    changeColor(e);
    setTimeout(clearForm, 2000);
  }
});

allButtons.forEach((button) => {
  button.addEventListener("click", changeColor);
  button.addEventListener("click", calculateValue);
});

function clearForm() {
  for (let i = 1; i < form.elements.length; i += 1) {
    form.elements[i].value = "";
  }
}

function checkRequiredFields() {
  let alert = document.querySelector("#alert");
  if (form.elements[1].value === "") {
    alert.innerText = "You must enter a resistor value.";
    setTimeout(() => {
      alert.innerText = "";
    }, 3000);
    return false;
  } else if (form.elements[3].value === "") {
    alert.innerText = "You must select a tolerance value";
    setTimeout(() => {
      alert.innerText = "";
    }, 3000);
    return false;
  }
  return true;
}

function checkOhmValue(val = 0, tag = "") {
  //if it's a decimal
  if (val.toString().includes(".")) {
    let sides = val.toString().split(".");
    //1.3   if 1.45 then 1.5
    if (sides[0] !== "0") {
      if (+sides[1] > 9) {
        let roundedVal = Math.round(sides[1] / 10);
        sides[1] = roundedVal;
        form.elements[1].value = +`${sides[0]}.${sides[1]}`;
      }
    } else {
      //if it's a decimal like this(0.34), force no tag
      if (tag !== "") {
        form.elements[2].value = "";
      }
    }
    //if the number is more then 2 digits + not a decimal
  } else if (val.toString().length > 2 && !val.toString().includes(".")) {
    let roundedVal;

    //if ex)5609, 5439, 3301
    if (val.toString().length === 4) {
      val = roundedVal ? roundedVal : val;
      roundedVal = Math.round(val / 10);
      checkOhmValue(roundedVal, tag);
    }
    //if ex)324
    if (val[2] !== "0" && val[1] !== "0") {
      val = roundedVal ? roundedVal : val;
      roundedVal = Math.round(val / 10) * 10;
      form.elements[1].value = roundedVal;
    }
    //if ex)305
    else if (val.toString()[1] === "0" && val.toString()[2] !== undefined) {
      val = roundedVal ? roundedVal : val;
      roundedVal = Math.floor(val / 10) * 10;
      form.elements[1].value = roundedVal;
    }
    //can't be length of 3 if it has 'G' tag
    if (tag === "G") {
      if (val.toString()[2] !== undefined) {
        val = roundedVal ? roundedVal : val;
        roundedVal = Math.round(val / 10);
        form.elements[1].value = roundedVal;
      }
    }
  }
}

function changeColor(e) {
  //if user entered values
  if (e.target.id === "enter") {
    const bandColors = getBandColors(
      `${form.elements[1].value}${form.elements[2].value}`,
      `±${form.elements[3].value}`
    );
    firstBandColor.className = `band ${bandColors.color1}`;
    secondBandColor.className = `band ${bandColors.color2}`;
    multiplierBandColor.className = `band ${bandColors.multiplier}`;
    toleranceBandColor.className = `band ${bandColors.tolerance}`;

    //if user selected colors
  } else {
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
}

function calculateValue(e) {
  const resistorValue = document.querySelector(".answer");

  //if user selected a box
  if (e.target.classList[0] === "box") {
    const text = getResistorOhms({
      color1: `${firstBandColor.classList[1]}`,
      color2: `${secondBandColor.classList[1]}`,
      multiplier: `${multiplierBandColor.classList[1]}`,
      tolerance: `${toleranceBandColor.classList[1]}`,
    });

    resistorValue.innerText = text;
  }

  // if user input values
  if (e.target.id === "enter") {
    const bandColors = getBandColors(
      `${form.elements[1].value}${form.elements[2].value}`,
      `±${form.elements[3].value}`
    );

    const inputText = getResistorOhms({
      color1: bandColors.color1,
      color2: bandColors.color2,
      multiplier: bandColors.multiplier,
      tolerance: bandColors.tolerance,
    });

    resistorValue.innerText = inputText;
  }
}

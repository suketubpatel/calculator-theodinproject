// Global variables
const btnContainer = document.querySelectorAll(".buttons");
const display = document.querySelector(".display");

let num1 = null,
  num2 = null,
  operator = null,
  sum = null;

let displayLength = 0;
let fontSize = readDisplayFontSize();
let newFontSize = fontSize;
let periodIsUsed = false;

// const fontSize = readDisplayFontSize();

// let btnArray = [];
// window.addEventListener("load", (event) => {
//   btnContainer.forEach((btn) => {
//     let id = btn.id;
//     let value = btn.textContent;

//     switch (id) {
//       case "btn-clear":
//         value = "ac";
//         break;
//       case "btn-delete":
//         value = "delete";
//         break;
//       case "btn-plus-minus":
//         value = "plus-minus";
//         break;
//       case "btn-divide":
//         value = "/";
//         break;
//     }

//     btnArray.push({
//       id: id,
//       value: value,
//     });
//   });
// });
// console.log(btnArray);

btnContainer.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    clickPopulateDisplay(btn); // populate display
    readNums(btn); // read nums
  });
});

function dititPressed(btn) {
  // if digit pressed
  display.textContent += btn.textContent;
  displayLength++; // increase display digit numbers
  updateDisplayFontSize("+");
}

function periodPressed() {
  // if period pressed
  periodIsUsed = true; // set period used to true
  if (display.textContent === "") {
    display.textContent = "0.";
  } else {
    display.textContent += ".";
  }
  displayLength++; // increase display digit numbers
  updateDisplayFontSize("+");
}

function deleteLastDigit() {
  if (display.textContent !== "") {
    let str = display.textContent;
    display.textContent = str.substring(0, str.length - 1);

    updateDisplayFontSize("-");
    displayLength--; // increase display digit numbers
  }
}

// Populate display when user click buttons
function clickPopulateDisplay(btn) {
  if (btn.classList.contains("digit")) {
    // if digit pressed
    dititPressed(btn);
  } else if (btn.classList.contains("btn-period") && !periodIsUsed) {
    // if period pressed
    periodPressed();
  } else if (btn.classList.contains("btn-delete")) {
    // delete last digit
    deleteLastDigit();
  }
}

function readNums(btn) {}

// read display font size while load
function readDisplayFontSize() {
  let getFontSize = window
    .getComputedStyle(display, null)
    .getPropertyValue("font-size");
  let fontSize = parseFloat(getFontSize);
  return fontSize;
}

// Reduce display font size as needed.
function updateDisplayFontSize(sign) {
  let sizeToUpdate = fontSize * 0.07;

  if (displayLength > 10) {
    if (sign === "+") {
      // decrise font size
      newFontSize = newFontSize - sizeToUpdate;
      display.style.fontSize = newFontSize + "px";
    } else if (sign === "-") {
      // increase font size
      newFontSize = newFontSize + sizeToUpdate;
      display.style.fontSize = newFontSize + "px";
    }
  }
}

// Function to calculate numbers
function operate(num1, num2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
  }
  return result;
}

// Common function for calculation add, subtract, multiply and divide
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  try {
    if (num2 === 0) {
      throw error;
    } else {
      return num1 / num2;
    }
  } catch (error) {
    return "Error: Can't divide by ZERO!";
  }
}

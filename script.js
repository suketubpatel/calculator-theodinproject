// Global variables
const btnContainer = document.querySelectorAll(".buttons");
const display = document.querySelector(".display");

let num1 = 0,
  num2 = 0,
  temp = 0,
  operator = null,
  sum = 0;

let displayLength = 0;
let fontSize = readDisplayFontSize();
let newFontSize = fontSize;
let periodIsUsed = false;
let isFirstTime = true;

let devideErrorMessage = "Error: Can't divide by ZERO!";

function clearAll() {
  // Clear display and reset variables
  (num1 = 0), (num2 = 0), (temp = 0), (operator = null), (sum = 0);

  displayLength = 0;
  newFontSize = fontSize;
  periodIsUsed = false;
  isFirstTime = true;
}

btnContainer.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    clickPopulateDisplay(btn); // populate display
    readSign(btn);

    console.log("Operator: " + operator);
    console.log("temp: " + temp);
    console.log("num1: " + num1);
    console.log("num2: " + num2);
    console.log("sum: " + sum);
  });
});

function digitPressed(btn) {
  // if digit pressed
  let str = display.textContent;

  if (str == "/" || str == "*" || str == "+" || str == "-") {
    display.textContent = btn.textContent;
  } else {
    display.textContent += btn.textContent;
    displayLength++; // increase display digit numbers
    updateDisplayFontSize("+");
  }
}

function periodPressed() {
  // if period pressed
  let str = display.textContent;

  periodIsUsed = true; // set period used to true
  if (str === "" || str == "/" || str == "*" || str == "+" || str == "-") {
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
    digitPressed(btn);
  } else if (btn.classList.contains("btn-period") && !periodIsUsed) {
    // if period pressed
    periodPressed();
  } else if (btn.classList.contains("btn-delete")) {
    // delete last digit
    deleteLastDigit();
  } else if (btn.classList.contains("btn-clear")) {
    // clear all
    clearAll();
    display.textContent = "";
  }

  temp = parseFloat(display.textContent);
  isNaN(temp) ? (temp = 0) : (temp = temp);

  console.log("temp original: " + temp);
}

function readSign(btn) {
  if (btn.classList.contains("btn-sign")) {
    if (isFirstTime) {
      num1 = temp;
      isFirstTime = false;
    } else {
      if (operator === null) {
        display.textContent = temp;
        isFirstTime = true;
      } else {
        num2 = temp;
        sum = operate(num1, num2, operator);
      }
    }

    let id = btn.id;
    switch (id) {
      case "btn-divide":
        operator = "/";
        break;
      case "btn-multi":
        operator = "*";
        break;
      case "btn-minus":
        operator = "-";
        break;
      case "btn-plus":
        operator = "+";
        break;
    }

    periodIsUsed = false;

    display.textContent = operator;
    displayLength = 1;
  }

  if (btn.classList.contains("btn-equals")) {
    console.log("= clicked");
    if (isFirstTime) {
      num1 = temp;
      isFirstTime = false;
    } else {
      if (operator === null) {
        display.textContent = temp;
        isFirstTime = true;
      } else {
        num2 = temp;
        sum = operate(num1, num2, operator);
        display.textContent = sum;
        clearAll();
      }
    }
  }
}
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
      console.log("devide by zero");
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
function operate(num01, num02, operator) {
  let result;
  console.log("num01: " + num01);
  console.log("num02: " + num02);
  switch (operator) {
    case "+":
      result = add(num01, num02);
      break;
    case "-":
      result = subtract(num01, num02);
      break;
    case "*":
      result = multiply(num01, num02);
      break;
    case "/":
      result = divide(num01, num02);
      break;
    default:
  }

  num1 = result;

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
    alert(devideErrorMessage);
    clearAll();
  }
}

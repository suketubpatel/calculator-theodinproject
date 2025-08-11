// Global variables
let num1, num2, operator;

console.log("Add: " + operate(2, 3, "+"));
console.log("Sub: " + operate(2, 3, "-"));
console.log("Mul: " + operate(2, 3, "*"));
console.log("Div: " + operate(12, 4, "/"));

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

// Common function for calculation
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

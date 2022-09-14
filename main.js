// main variables
let operator = "";
let isOutput = false;
let A = null;
let B = null;
const io = document.querySelector("#io");
const process = document.querySelector("#process");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// If number clicked
const numbers = document.querySelector(".numbers");
numbers.addEventListener("click", (event) => {
  const number = event.target.textContent;
  if (isOutput) {
    isOutput = false;
    io.textContent = number;
  }
  io.textContent += number;
});

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
    case "×":
      return multiply(a, b);
    case "÷":
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
    return;
  }
  io.textContent += number;
});

function getOldOperator(text) {
  return text.match(/[+\-×÷]/)[0];
}

function convertOperatorToSign(text) {
  switch (text) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "×";
    case "divide":
      return "÷";
    default:
      return undefined;
  }
}

// If operator clicked
const operators = document.querySelector(".operators");
operators.addEventListener("click", (event) => {
  operator = convertOperatorToSign(event.target.closest("button").id);
  if (!io.textContent || io.textContent === "ERROR") {
    if (A) {
      process.textContent = A + " " + operator;
      return;
    }
    return;
  }

  if (isOutput) {
    process.textContent = A + " " + operator;
    return;
  }

  if (!A) {
    A = io.textContent;
    isOutput = true;
    console.log(A);
    process.textContent = A + " " + operator;
    return;
  }

  B = io.textContent;
  const result = operate(getOldOperator(process.textContent), +A, +B);

  if (typeof result === "string") {
    console.log("result is string");
    io.textContent = result;
    A = null;
    B = null;
    process.textContent = "";
    isOutput = true;
    return;
  }

  A = result;
  B = null;
  io.textContent = result;
  isOutput = true;
  process.textContent = A + " " + operator;
});

// If equal clicked
const equal = document.querySelector("#equal");
equal.addEventListener("click", (event) => {
  if (!A) {
    return;
  }

  if (isOutput) {
    return;
  }
  B = io.textContent;
  process.textContent += ` ${B}`;
  const result = operate(getOldOperator(process.textContent), +A, +B);
  A = result;
  B = null;
  io.textContent = result;
  isOutput = true;
});

// main variables
let operator = "";
let isOutput = false;
let isDotLocked = false;
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
  if (!b) {
    return "Infinity";
  }
  return a / b;
}

function roundDecimal(num) {
  return Math.round(num * 1000) / 1000;
}

function operate(operator, a, b) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "×":
      result = multiply(a, b);
      break;
    case "÷":
      result = divide(a, b);
      break;
    default:
      return null;
  }
  if (Number.isInteger(result)) {
    return result;
  }
  return roundDecimal(result);
}

// If number clicked
const numbers = document.querySelector(".numbers");
function clickNumber(number) {
  if (isOutput) {
    isOutput = false;
    io.textContent = number;
    return;
  }
  io.textContent += number;
}

numbers.addEventListener("click", (e) => {
  clickNumber(e.target.textContent);
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
    case "*":
    case "multiply":
      return "×";
    case "/":
    case "divide":
      return "÷";
    default:
      return text;
  }
}

// If operator clicked
const operators = document.querySelector(".operators");

function clickOperator(operator) {
  operator = convertOperatorToSign(operator);
  if (!io.textContent || io.textContent === "Infinity") {
    console.log("button");
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
    isDotLocked = false;
    console.log(A);
    process.textContent = A + " " + operator;
    return;
  }

  B = io.textContent;
  isDotLocked = false;
  const result = operate(getOldOperator(process.textContent), +A, +B);

  if (result === Infinity) {
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
}

operators.addEventListener("click", (e) => {
  clickOperator(e.target.closest("button").id);
});

// If equal clicked
const equal = document.querySelector("#equal");
function clickEqual() {
  if (!A) {
    return;
  }

  if (isOutput) {
    return;
  }
  B = io.textContent;
  isDotLocked = false;
  process.textContent += ` ${B}`;
  const result = operate(getOldOperator(process.textContent), +A, +B);
  if (result === Infinity) {
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
}
equal.addEventListener("click", clickEqual);

// If clear clicked
const clear = document.querySelector("#clear");
clear.addEventListener("click", (event) => {
  A = null;
  B = null;
  process.textContent = "";
  io.textContent = "";
  operator = "";
  isOutput = false;
});

// If delete clicked
function clickDelete() {
  if (isOutput) {
    return;
  }
  io.textContent = io.textContent.slice(0, io.textContent.length - 1);
}
const del = document.querySelector("#del");
del.addEventListener("click", clickDelete);

// If dot clicked
function clickDot() {
  if (isOutput) {
    return;
  }

  if (isDotLocked) {
    return;
  }

  io.textContent += ".";
  isDotLocked = true;
}
const dot = document.querySelector("#dot");
dot.addEventListener("click", clickDot);

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (+e.key >= 0) {
    clickNumber(e.key);
  }

  if (/[+\-*\/]/.test(e.key)) {
    clickOperator(e.key);
  }

  if (e.key === "=") {
    clickEqual();
  }

  if (e.key === "Backspace") {
    clickDelete();
  }

  if (e.key === ".") {
    clickDot();
  }

  if (e.key === "Enter") {
    clickEqual();
  }
});

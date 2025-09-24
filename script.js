const display = document.querySelector("input");
const container = document.querySelector("#container");
let total = 0;
let clearDisplay = false;
let lastOperation = null;
let lastOperand = null;

function appendCharacter(char) {
  if (clearDisplay) {
    display.value = "";
    clearDisplay = false;
  }
  displayValue = display.value;
  display.value = displayValue.startsWith("0") ? char : displayValue + char;
}

function processArithmetic(operator, rightHandOperand = null) {
  if (operator === "=") {
    processArithmetic(lastOperation, lastOperand);
    return;
  }

  // let displayVal = 0;
  // if (operator !== lastOperation && lastOperation !== null) {
  //   displayVal = 0;
  // } else {
  //   displayVal = rightHandOperand ?? Number(display.value);
  // }

  if (lastOperation === null) {
    lastOperation = operator;
  }

  const displayVal = rightHandOperand ?? Number(display.value);

  switch (lastOperation) {
    case "+":
      total += displayVal;
      break;
    case "-":
      total -= displayVal;
      break;
    case "*":
      total *= displayVal;
      break;
    case "/":
      total /= displayVal;
      break;
  }
  lastOperand = displayVal;
  lastOperation = operator;
  display.value = total.toString();
  clearDisplay = true;
}

container.addEventListener("click", (event) => {
  const btnRef = event.target;
  const buttonTypes = {
    number: appendCharacter,
    arithmetic: processArithmetic,
    fn: null,
  };

  const buttonType = Object.keys(buttonTypes).find((type) =>
    btnRef.classList.contains(type)
  );

  buttonTypes[buttonType](btnRef.textContent);
});
